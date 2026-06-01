import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!barRef.current || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            setVisible(false);
            onComplete();
          },
        });
      },
    });

    tl.fromTo(
      barRef.current,
      { width: '0%' },
      { width: '100%', duration: 1.5, ease: 'power2.inOut' }
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: '#0a0a0a', zIndex: 9999 }}
    >
      <span
        className="font-heading text-apex-white"
        style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 24 }}
      >
        APEX MOTORS
      </span>
      <div
        style={{
          width: 120,
          height: 2,
          background: 'rgba(245, 245, 240, 0.1)',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            background: '#c9a94e',
            borderRadius: 1,
            width: '0%',
          }}
        />
      </div>
    </div>
  );
}
