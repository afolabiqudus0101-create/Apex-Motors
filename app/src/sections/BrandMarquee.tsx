import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  'PORSCHE',
  'BMW',
  'MERCEDES-BENZ',
  'AUDI',
  'LEXUS',
  'ASTON MARTIN',
  'BENTLEY',
  'LAMBORGHINI',
  'MCLAREN',
  'ROLLS-ROYCE',
];

export default function BrandMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(sectionRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Duplicate brands for seamless loop
  const allBrands = [...brands, ...brands];

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="content-section overflow-hidden"
      style={{
        background: '#111111',
        padding: '48px 0',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
        {allBrands.map((brand, index) => (
          <span
            key={index}
            className="font-heading flex-shrink-0"
            style={{
              fontSize: 24,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(245, 245, 240, 0.15)',
            }}
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
