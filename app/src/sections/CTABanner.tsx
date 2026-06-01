import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const heading = sectionRef.current.querySelector('.cta-heading');
    const subtext = sectionRef.current.querySelector('.cta-subtext');
    const btn = sectionRef.current.querySelector('.cta-button');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    if (heading) {
      tl.from(heading, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    if (subtext) {
      tl.from(
        subtext,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.65'
      );
    }

    if (btn) {
      tl.from(
        btn,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="content-section"
      style={{
        background: '#0a0a0a',
        padding: '100px 5vw',
        position: 'relative',
        zIndex: 3,
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: 'url(/images/img-showroom-interior.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        className="relative flex flex-col items-center text-center mx-auto"
        style={{ maxWidth: 700 }}
      >
        <h2
          className="cta-heading font-display"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            color: '#f5f5f0',
          }}
        >
          Your Next Chapter Begins Here
        </h2>

        <p
          className="cta-subtext font-body"
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: 'rgba(245, 245, 240, 0.6)',
            marginTop: 20,
            maxWidth: 520,
            lineHeight: 1.65,
          }}
        >
          Schedule a private consultation with our team and experience the Apex difference.
        </p>

        <button
          className="cta-button font-heading"
          style={{
            marginTop: 40,
            background: '#c9a94e',
            color: '#1a1a1a',
            borderRadius: 100,
            padding: '16px 40px',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0.05em',
            border: 'none',
            cursor: 'pointer',
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
          Book an Appointment
        </button>
      </div>
    </section>
  );
}
