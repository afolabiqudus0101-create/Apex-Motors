import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    composer: EffectComposer;
    bokehPass: BokehPass;
    sceneGroup: THREE.Group;
    carObject: THREE.Group | null;
    particles: THREE.Points | null;
    controls: OrbitControls;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    time: number;
    animId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 25000);
    camera.position.set(8, 4, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minPolarAngle = Math.PI / 4;
    controls.target.set(0, 1, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Scene group for scroll animation
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.0);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe6eeff, 0.8);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xc9a94e, 1.5, 30);
    rimLight.position.set(-3, 3, 8);
    scene.add(rimLight);

    // Floor reflector
    const floorGeom = new THREE.PlaneGeometry(2000, 2000);
    const floor = new Reflector(floorGeom, {
      textureWidth: window.innerWidth < 768 ? 512 : 1024,
      textureHeight: window.innerWidth < 768 ? 512 : 1024,
      color: 0x888888,
    });
    floor.rotation.x = Math.PI * -0.5;
    floor.position.y = -1.0;
    sceneGroup.add(floor);

    // City generation
    function createCity(): THREE.InstancedMesh {
      const mapSize = 16;
      const blockSize = 16;
      const blockOffset = blockSize / mapSize;
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x222222 });
      const cityMesh = new THREE.InstancedMesh(geometry, material, mapSize * mapSize);

      let i = 0;
      const dummy = new THREE.Object3D();

      for (let x = 0; x < mapSize; x++) {
        for (let z = 0; z < mapSize; z++) {
          const positionX = (x - mapSize / 2) * blockOffset;
          const positionZ = (z - mapSize / 2) * blockOffset;
          const scaleY = Math.random() < 0.1 ? 10 : 1;

          dummy.position.set(positionX, scaleY / 2, positionZ - 40);
          dummy.scale.set(0.98, scaleY, 0.98);
          dummy.updateMatrix();
          cityMesh.setMatrixAt(i++, dummy.matrix);
        }
      }

      return cityMesh;
    }

    const cityMesh = createCity();
    sceneGroup.add(cityMesh);

    // Procedural car
    const carObject = new THREE.Group();

    // Body
    const bodyGeom = new THREE.BoxGeometry(4, 1, 1.8);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b0000,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.y = 0.5;
    carObject.add(body);

    // Cabin
    const cabinGeom = new THREE.BoxGeometry(2, 0.7, 1.6);
    const cabinMat = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.1,
      roughness: 0.0,
      transparent: true,
      opacity: 0.7,
    });
    const cabin = new THREE.Mesh(cabinGeom, cabinMat);
    cabin.position.set(-0.3, 1.2, 0);
    carObject.add(cabin);

    // Wheels
    const wheelGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const wheelPositions: [number, number, number][] = [
      [1.2, -0.3, 0.9],
      [1.2, -0.3, -0.9],
      [-1.2, -0.3, 0.9],
      [-1.2, -0.3, -0.9],
    ];
    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeom, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(...pos);
      carObject.add(wheel);
    });

    // Headlights
    const headlightGeom = new THREE.CircleGeometry(0.15, 16);
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffee });
    const hlLeft = new THREE.Mesh(headlightGeom, headlightMat);
    hlLeft.position.set(2.01, 0.6, 0.5);
    hlLeft.rotation.y = Math.PI / 2;
    carObject.add(hlLeft);
    const hlRight = new THREE.Mesh(headlightGeom, headlightMat);
    hlRight.position.set(2.01, 0.6, -0.5);
    hlRight.rotation.y = Math.PI / 2;
    carObject.add(hlRight);

    // Taillights
    const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const tlLeft = new THREE.Mesh(headlightGeom, tailLightMat);
    tlLeft.position.set(-2.01, 0.6, 0.5);
    tlLeft.rotation.y = -Math.PI / 2;
    carObject.add(tlLeft);
    const tlRight = new THREE.Mesh(headlightGeom, tailLightMat);
    tlRight.position.set(-2.01, 0.6, -0.5);
    tlRight.rotation.y = -Math.PI / 2;
    carObject.add(tlRight);

    carObject.position.y = -0.5;
    sceneGroup.add(carObject);

    // Particles
    const particleCount = 300;
    const pGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = Math.random() * 50;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeom, pMat);
    sceneGroup.add(particles);

    // Post-processing
    const renderPass = new RenderPass(scene, camera);
    const bokehPass = new BokehPass(scene, camera, {
      focus: 1.0,
      aperture: 0.005,
      maxblur: 0.01,
    });

    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bokehPass);

    // Store refs
    sceneRef.current = {
      renderer,
      composer,
      bokehPass,
      sceneGroup,
      carObject,
      particles,
      controls,
      camera,
      scene,
      time: 0,
      animId: 0,
    };

    // Entrance animation
    gsap.from(camera.position, {
      z: 30,
      y: 10,
      duration: 3,
      ease: 'power3.out',
    });

    // Scroll-driven focus animation
    const scrollTarget = document.getElementById('scrollTarget');
    if (scrollTarget) {
      ScrollTrigger.create({
        trigger: scrollTarget,
        start: 'top top',
        end: 'bottom top',
        scrub: 2.5,
        onUpdate: (self) => {
          const focusValue = gsap.utils.interpolate(0.8, 0.0002, self.progress);
          (bokehPass.uniforms as Record<string, { value: number }>).focus.value = focusValue;
          sceneGroup.position.z = gsap.utils.interpolate(0, -120, self.progress);
        },
      });
    }

    // Animation loop
    let time = 0;
    let animId = 0;

    function tick() {
      animId = requestAnimationFrame(tick);
      controls.update();
      time += 0.001;

      if (carObject) {
        carObject.rotation.y = time;
      }

      if (particles) {
        particles.rotation.y += 0.0001;
        particles.rotation.x += 0.00005;
      }

      composer.render();
    }

    tick();

    if (sceneRef.current) {
      sceneRef.current.animId = animId;
    }

    // Resize handler
    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      composer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="webgl"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    />
  );
}
