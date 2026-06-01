import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'The team at Apex made finding my dream car effortless. Their attention to detail and genuine passion for automobiles set them apart from every other dealership I\'ve visited.',
    name: 'Marcus Chen',
    vehicle: 'Porsche 911 GT3',
  },
  {
    quote:
      'From the first call to driving off the lot, the experience was impeccable. No pressure, pure professionalism. I\'ll never buy a car anywhere else.',
    name: 'Sarah Williams',
    vehicle: 'BMW M4 Competition',
  },
  {
    quote:
      'They found the exact specification I was looking for — color, interior, every option. The concierge delivery to my home was the cherry on top.',
    name: 'David Park',
    vehicle: 'Mercedes-AMG GT',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.from('.testimonial-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  return (
    <section
      ref={sectionRef}
      className="content-section"
      style={{
        background: '#1a1a1a',
        padding: '120px 5vw',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <div
        className="testimonial-content mx-auto text-center"
        style={{ maxWidth: 800, position: 'relative' }}
      >
        {/* Section label */}
        <span
          className="font-heading block"
          style={{
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#c9a94e',
            marginBottom: 48,
          }}
        >
          CLIENT STORIES
        </span>

        {/* Large quotation mark */}
        <span
          className="font-display absolute"
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: 'rgba(201, 169, 78, 0.2)',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            lineHeight: 1,
            pointerEvents: 'none',
          }}
        >
          &ldquo;
        </span>

        {/* Quote */}
        <div style={{ minHeight: 160, position: 'relative' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                position: i === activeIndex ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: i === activeIndex ? 1 : 0,
                transition: 'opacity 0.6s ease',
                pointerEvents: i === activeIndex ? 'auto' : 'none',
              }}
            >
              <p
                className="font-display"
                style={{
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#f5f5f0',
                  lineHeight: 1.5,
                }}
              >
                {t.quote}
              </p>
            </div>
          ))}
        </div>

        {/* Author */}
        <div style={{ marginTop: 40 }}>
          <p
            className="font-heading"
            style={{ fontSize: 14, fontWeight: 600, color: '#f5f5f0' }}
          >
            {testimonials[activeIndex].name}
          </p>
          <p
            className="font-body"
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: 'rgba(245, 245, 240, 0.5)',
              marginTop: 4,
            }}
          >
            {testimonials[activeIndex].vehicle}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4" style={{ marginTop: 40 }}>
          <button
            onClick={() => goTo((activeIndex - 1 + testimonials.length) % testimonials.length)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid rgba(245, 245, 240, 0.2)',
              color: '#f5f5f0',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: i === activeIndex ? '#c9a94e' : 'rgba(245, 245, 240, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goTo((activeIndex + 1) % testimonials.length)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid rgba(245, 245, 240, 0.2)',
              color: '#f5f5f0',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
