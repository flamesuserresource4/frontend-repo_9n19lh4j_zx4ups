import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const ACCENT = '#2C5F4D';

// Simple particle constellation background on canvas
function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(0);
  const lastTimeRef = useRef(0);
  const scrollParallaxRef = useRef(0);

  // Recompute on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function init() {
      const dpr = window.devicePixelRatio || 1;
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Particle count scales with area but capped
      const count = Math.min(120, Math.floor((w * h) / 13000));
      particlesRef.current = Array.from({ length: count }).map(() => {
        const speed = 0.08 + Math.random() * 0.22; // 0.08–0.3 px per frame
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1.2 + Math.random() * 1.6,
        };
      });
    }

    function draw(time) {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const ctx = canvas.getContext('2d');
      const t = time || 0;
      const dt = Math.min(32, t - (lastTimeRef.current || t));
      lastTimeRef.current = t;

      // soft clear
      ctx.clearRect(0, 0, w, h);

      // Parallax based on scroll
      const parallaxY = scrollParallaxRef.current * 0.3; // 0.3x speed

      // Update and draw particles
      const parts = particlesRef.current;
      ctx.fillStyle = `${ACCENT}33`; // 20% opacity
      for (let p of parts) {
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        // gentle reconnection cycles: bounce at edges
        if (p.x < -20 || p.x > w + 20) p.vx *= -1;
        if (p.y < -20 || p.y > h + 20) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y + parallaxY, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connect close particles
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const dx = parts[i].x - parts[j].x;
          const dy = parts[i].y - parts[j].y;
          const dist2 = dx * dx + dy * dy;
          const maxDist = 140; // link distance
          if (dist2 < maxDist * maxDist) {
            const alpha = 0.18 * (1 - Math.sqrt(dist2) / maxDist);
            const yShift = parallaxY;
            const x1 = parts[i].x;
            const y1 = parts[i].y + yShift;
            const x2 = parts[j].x;
            const y2 = parts[j].y + yShift;
            const grad = ctx.createLinearGradient(x1, y1, x2, y2);
            grad.addColorStop(0, `${ACCENT}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`);
            grad.addColorStop(1, `${ACCENT}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    function onScroll() {
      scrollParallaxRef.current = window.scrollY;
    }

    init();
    animationRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', init);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', init);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />;
}

export default function HeroSection() {
  // Scroll-driven transforms for headline
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 400], [0, 1]);
  const headlineScale = useTransform(progress, [0, 1], [1, 0.9]);
  const headlineOpacity = useTransform(progress, [0, 1], [1, 0.92]);

  // Simple timed focus indicator dot color cycling (very subtle)
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => (v + 1) % 2), 2500);
    return () => clearInterval(t);
  }, []);

  const subText = useMemo(
    () =>
      'Psychology-driven design for SaaS | DTC | Fintech brands that demand measurable results',
    []
  );

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#FAFAFA] text-black">
      {/* Full-width Spline cover background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Soft gradient veil to ensure text contrast without blocking interaction */}
        <div className="pointer-events-none absolute inset-0" style={{
          background:
            'linear-gradient(180deg, rgba(250,250,250,0.85) 0%, rgba(250,250,250,0.65) 35%, rgba(250,250,250,0.35) 60%, rgba(250,250,250,0.15) 100%)'
        }} />
      </div>

      {/* Background canvas constellation above Spline for subtle depth */}
      <ParticleBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-12">
        {/* Left: Headline, subhead, CTA (approx 40%) */}
        <div className="md:col-span-6 lg:col-span-6 xl:col-span-6">
          <motion.h1
            style={{ scale: headlineScale, opacity: headlineOpacity, letterSpacing: '0.02em' }}
            className="font-serif text-5xl leading-tight sm:text-6xl md:text-7xl"
          >
            We Engineer Attention, Emotion, Action
          </motion.h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#333333] sm:text-lg">
            {subText}
          </p>
          <div className="mt-8">
            <a
              href="#framework"
              className="inline-flex items-center rounded-full px-6 py-3 text-white shadow-sm transition-all duration-300"
              style={{ backgroundColor: ACCENT, boxShadow: tick ? '0 8px 24px rgba(44,95,77,0.22)' : '0 6px 18px rgba(44,95,77,0.18)' }}
            >
              See Our Framework
            </a>
          </div>
        </div>

        {/* Right column left empty to preserve Z-pattern focal priority while allowing background Spline to show */}
        <div className="md:col-span-6" />
      </div>
    </section>
  );
}
