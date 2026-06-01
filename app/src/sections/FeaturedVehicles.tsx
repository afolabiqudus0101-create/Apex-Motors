import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const vehicles = [
  {
    name: 'Porsche 911 GT3',
    price: '$234,900',
    specs: '2024 · 3,200 mi · Manual',
    image: '/images/img-car-porsche.jpg',
  },
  {
    name: 'BMW M4 Competition',
    price: '$89,500',
    specs: '2023 · 8,100 mi · Auto',
    image: '/images/img-car-bmw.jpg',
  },
  {
    name: 'Mercedes-AMG GT',
    price: '$127,800',
    specs: '2024 · 1,500 mi · Auto',
    image: '/images/img-car-mercedes.jpg',
  },
  {
    name: 'Audi R8 V10',
    price: '$169,000',
    specs: '2023 · 5,400 mi · Auto',
    image: '/images/img-car-audi.jpg',
  },
  {
    name: 'Lexus LC 500',
    price: '$98,700',
    specs: '2024 · 2,800 mi · Auto',
    image: '/images/img-car-lexus.jpg',
  },
  {
    name: 'Aston Martin Vantage',
    price: '$152,400',
    specs: '2023 · 3,900 mi · Auto',
    image: '/images/img-car-aston.jpg',
  },
];

export default function FeaturedVehicles() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.vehicle-card');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const cardWidth = 344; // 320 + 24 gap
    const newPos =
      direction === 'left'
        ? Math.max(0, scrollPos - cardWidth)
        : Math.min(
            carouselRef.current.scrollWidth - carouselRef.current.clientWidth,
            scrollPos + cardWidth
          );
    setScrollPos(newPos);
    carouselRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="inventory"
      className="content-section"
      style={{
        background: '#0a0a0a',
        padding: '120px 5vw',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Section header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <span
              className="font-heading block"
              style={{
                fontSize: 12,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#c9a94e',
                marginBottom: 16,
              }}
            >
              CURATED COLLECTION
            </span>
            <h2
              className="font-heading"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: '#f5f5f0' }}
            >
              Featured Vehicles
            </h2>
          </div>

          {/* Carousel arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollCarousel('left')}
              className="flex items-center justify-center transition-colors hover:border-apex-white/40"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1px solid rgba(245, 245, 240, 0.2)',
                color: '#f5f5f0',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="flex items-center justify-center transition-colors hover:border-apex-white/40"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1px solid rgba(245, 245, 240, 0.2)',
                color: '#f5f5f0',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="vehicle-card flex-shrink-0 group"
              style={{
                width: 320,
                cursor: 'pointer',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {/* Image */}
              <div
                className="overflow-hidden"
                style={{
                  height: 264,
                  borderRadius: 4,
                  marginBottom: 16,
                }}
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <h3
                className="font-heading"
                style={{ fontSize: 20, fontWeight: 500, color: '#f5f5f0', marginBottom: 6 }}
              >
                {vehicle.name}
              </h3>
              <p
                className="font-heading"
                style={{ fontSize: 16, fontWeight: 400, color: '#c9a94e', marginBottom: 4 }}
              >
                {vehicle.price}
              </p>
              <p
                className="font-body"
                style={{ fontSize: 13, fontWeight: 400, color: 'rgba(245, 245, 240, 0.5)' }}
              >
                {vehicle.specs}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
