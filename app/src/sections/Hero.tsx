import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline({ delay: 2.0 });

    tl.from('.hero-label', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from(
        '.hero-headline-line',
        {
          opacity: 0,
          y: 40,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.12,
        },
        '-=0.4'
      )
      .from(
        '.hero-subtitle',
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .from(
        '.hero-cta',
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .from(
        '.hero-scroll-indicator',
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToInventory = () => {
    const el = document.getElementById('inventory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll target for the 3D focus animation */}
      <div id="scrollTarget" style={{ height: '200vh', position: 'relative', zIndex: 1 }} />

      {/* Fixed hero content overlay */}
      <div
        ref={contentRef}
        className="hero-content"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {/* Pre-headline label */}
        <div
          className="hero-label"
          style={{
            position: 'absolute',
            top: '28%',
            left: '5vw',
          }}
        >
          <span
            className="font-heading"
            style={{
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(201, 169, 78, 0.9)',
            }}
          >
            EST. 2019 — PREMIUM AUTOMOTIVE
          </span>
        </div>

        {/* Centered headline group */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '90%',
            maxWidth: 700,
          }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(48px, 7vw, 80px)',
              fontWeight: 700,
              color: '#f5f5f0',
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
              lineHeight: 1.05,
            }}
          >
            <span className="hero-headline-line block">Driven by</span>
            <span className="hero-headline-line block">Excellence</span>
          </h1>

          <p
            className="hero-subtitle font-body"
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: 'rgba(245, 245, 240, 0.7)',
              maxWidth: 460,
              margin: '24px auto 0',
              lineHeight: 1.65,
            }}
          >
            Where precision engineering meets uncompromising service
          </p>

          <button
            onClick={scrollToInventory}
            className="hero-cta interactive font-heading"
            style={{
              marginTop: 40,
              background: '#c9a94e',
              color: '#1a1a1a',
              borderRadius: 100,
              padding: '14px 36px',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer',
              pointerEvents: 'auto',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(201, 169, 78, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Explore Inventory
          </button>
        </div>

        {/* Bottom-left scroll indicator */}
        <div
          className="hero-scroll-indicator"
          style={{
            position: 'absolute',
            bottom: 40,
            left: '5vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 60,
              height: 1,
              background: 'rgba(245, 245, 240, 0.4)',
            }}
          />
          <span
            className="font-heading"
            style={{
              fontSize: 10,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(245, 245, 240, 0.5)',
            }}
          >
            Scroll to explore
          </span>
        </div>
      </div>
    </>
  );
}
