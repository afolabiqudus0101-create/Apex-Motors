import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedVideo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const video = sectionRef.current.querySelector('.video-element');
    const text = sectionRef.current.querySelector('.text-content');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    if (video) {
      tl.from(video, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }

    if (text) {
      tl.from(
        text,
        {
          x: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '<'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="content-section"
      style={{
        background: '#f5f5f0',
        padding: '120px 5vw',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <div
        className="flex flex-col lg:flex-row items-center"
        style={{ maxWidth: 1280, margin: '0 auto', gap: 0 }}
      >
        {/* Video - Left 55% */}
        <div className="video-element w-full lg:w-[55%]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full object-cover"
            style={{ aspectRatio: '16/9', borderRadius: 4 }}
          >
            <source src="/videos/vid-showroom.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Text - Right 45% */}
        <div
          className="text-content w-full lg:w-[45%] flex flex-col justify-center"
          style={{ paddingLeft: 'clamp(0px, 5vw, 80px)', paddingTop: 'clamp(40px, 5vw, 0px)' }}
        >
          <span
            className="font-heading block"
            style={{
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#c9a94e',
            }}
          >
            THE EXPERIENCE
          </span>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 500,
              color: '#1a1a1a',
              marginTop: 16,
            }}
          >
            More Than a Purchase
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: '#6b6b6b',
              lineHeight: 1.65,
              marginTop: 24,
            }}
          >
            At Apex Motors, we believe acquiring a vehicle should be as extraordinary as the
            vehicle itself. Our showroom is designed to immerse you in automotive excellence — from
            the moment you step through our doors to the moment you turn the key.
          </p>
          <button
            className="font-heading self-start"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: '#1a1a1a',
              borderBottom: '1px solid #c9a94e',
              paddingBottom: 4,
              marginTop: 32,
              background: 'none',
              border: 'none',
              borderBottomWidth: 1,
              borderBottomStyle: 'solid',
              borderBottomColor: '#c9a94e',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#c9a94e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#1a1a1a';
            }}
          >
            Book a Private Viewing
          </button>
        </div>
      </div>
    </section>
  );
}
