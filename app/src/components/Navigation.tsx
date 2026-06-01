import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full transition-all duration-500"
      style={{
        height: 72,
        zIndex: 1000,
        background: scrolled ? 'rgba(10, 10, 10, 0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between h-full mx-auto" style={{ maxWidth: 1280, padding: '0 5vw' }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading text-apex-white hover:opacity-80 transition-opacity"
          style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.12em' }}
        >
          APEX MOTORS
        </button>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'INVENTORY', id: 'inventory' },
            { label: 'BRANDS', id: 'brands' },
            { label: 'FINANCING', id: 'financing' },
            { label: 'ABOUT', id: 'about' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-heading text-apex-white/70 hover:text-apex-white transition-colors"
              style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollToSection('cta')}
          className="font-heading text-apex-gold transition-all hover:bg-apex-gold/10"
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.05em',
            border: '1px solid rgba(201, 169, 78, 0.4)',
            borderRadius: 100,
            padding: '10px 24px',
          }}
        >
          SCHEDULE TEST DRIVE
        </button>
      </div>
    </nav>
  );
}
