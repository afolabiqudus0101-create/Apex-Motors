import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Handshake, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Shield,
    title: 'Rigorous Inspection',
    description:
      'Every vehicle undergoes a 172-point inspection by certified technicians before reaching our showroom floor.',
  },
  {
    icon: Handshake,
    title: 'Transparent Pricing',
    description:
      'No hidden fees. No surprises. The price you see is the price you pay, backed by our market analysis guarantee.',
  },
  {
    icon: Star,
    title: 'Concierge Service',
    description:
      'From financing to delivery, your dedicated advisor handles every detail so you can focus on the drive.',
  },
];

export default function WhyApex() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const pillars = sectionRef.current.querySelectorAll('.pillar-item');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(pillars, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="content-section"
      style={{
        background: '#ffffff',
        padding: '120px 5vw',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Section header */}
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
          WHY APEX
        </span>
        <h2
          className="font-heading"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 500,
            color: '#1a1a1a',
            marginBottom: 80,
          }}
        >
          The Apex Standard
        </h2>

        {/* Three pillars grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 48 }}
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={index} className="pillar-item">
                <Icon
                  size={48}
                  strokeWidth={1.5}
                  style={{
                    color: '#c9a94e',
                    marginBottom: 24,
                  }}
                />
                <h3
                  className="font-heading"
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    color: '#1a1a1a',
                    marginBottom: 12,
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#6b6b6b',
                    lineHeight: 1.65,
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
