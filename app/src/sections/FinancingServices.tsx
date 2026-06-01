import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'Factory-Trained Technicians',
  'Genuine OEM Parts',
  'Loaner Vehicles Available',
];

export default function FinancingServices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const leftCol = sectionRef.current.querySelector('.financing-col');
    const rightCol = sectionRef.current.querySelector('.service-col');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    if (leftCol) {
      tl.from(leftCol, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    if (rightCol) {
      tl.from(
        rightCol,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="financing"
      className="content-section"
      style={{
        background: '#ffffff',
        padding: '120px 5vw',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 mx-auto"
        style={{ maxWidth: 1280, gap: 64 }}
      >
        {/* Left — Financing */}
        <div className="financing-col">
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
            FINANCING
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
            Flexible Solutions
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
            We partner with leading financial institutions to offer competitive rates and terms
            tailored to your needs. Whether you prefer to lease or purchase, our finance team secures
            the optimal arrangement.
          </p>

          {/* Rate highlight */}
          <div
            style={{
              marginTop: 32,
              borderTop: '2px solid #c9a94e',
              paddingTop: 16,
              width: 60,
            }}
          />
          <p
            className="font-display"
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#1a1a1a',
              marginTop: 8,
            }}
          >
            Rates from 4.49% APR
          </p>

          <button
            className="font-heading"
            style={{
              marginTop: 32,
              border: '1px solid #1a1a1a',
              borderRadius: 100,
              padding: '12px 28px',
              fontSize: 14,
              fontWeight: 500,
              color: '#1a1a1a',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a1a1a';
              e.currentTarget.style.color = '#f5f5f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#1a1a1a';
            }}
          >
            Get Pre-Qualified
          </button>
        </div>

        {/* Right — Service */}
        <div className="service-col">
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
            SERVICE
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
            Expert Care
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
            Our state-of-the-art service center is staffed by factory-trained technicians using
            genuine parts and diagnostic equipment. From routine maintenance to complex repairs, your
            vehicle receives the care it deserves.
          </p>

          {/* Service list */}
          <ul style={{ marginTop: 32, listStyle: 'none', padding: 0 }}>
            {services.map((service, index) => (
              <li
                key={index}
                className="flex items-center gap-3"
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: '#1a1a1a',
                  marginBottom: 16,
                }}
              >
                <Check size={18} style={{ color: '#c9a94e', flexShrink: 0 }} />
                <span className="font-body">{service}</span>
              </li>
            ))}
          </ul>

          <button
            className="font-heading"
            style={{
              marginTop: 16,
              border: '1px solid #1a1a1a',
              borderRadius: 100,
              padding: '12px 28px',
              fontSize: 14,
              fontWeight: 500,
              color: '#1a1a1a',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a1a1a';
              e.currentTarget.style.color = '#f5f5f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#1a1a1a';
            }}
          >
            Schedule Service
          </button>
        </div>
      </div>
    </section>
  );
}
