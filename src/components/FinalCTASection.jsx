import { useEffect, useMemo, useRef, useState } from 'react';

const HUNTER = '#2C5F4D';

function nextQuarterEnd(now = new Date()) {
  const month = now.getUTCMonth();
  const year = now.getUTCFullYear();
  const quarter = Math.floor(month / 3); // 0..3
  const endMonth = quarter * 3 + 2; // 2,5,8,11
  const endDate = new Date(Date.UTC(year, endMonth + 1, 0, 23, 59, 59)); // last day of endMonth at 23:59:59
  return endDate;
}

function useCountdown(targetDate) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, targetDate.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

// Subtle animated grain using canvas (shader-like effect)
function GrainOverlay() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth: w, clientHeight: h } = canvas.parentElement;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t) {
      const { width, height } = canvas;
      const w = width / (window.devicePixelRatio || 1);
      const h = height / (window.devicePixelRatio || 1);
      // 10s cycle subtle evolution
      const phase = ((t || 0) / 10000) % 1;
      // Clear with transparent
      ctx.clearRect(0, 0, w, h);
      // Draw sparse noise
      const density = 0.12; // low-density points
      const count = Math.floor(w * h * density * 0.02);
      ctx.globalAlpha = 0.06 + 0.02 * Math.sin(phase * Math.PI * 2);
      ctx.fillStyle = '#000000';
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const s = Math.random() * 1.2; // sub-pixel grain size
        ctx.fillRect(x, y, s, s);
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden />;
}

export default function FinalCTASection() {
  const target = useMemo(() => nextQuarterEnd(new Date()), []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <section className="relative isolate w-full py-24 sm:py-28" style={{ backgroundColor: HUNTER }}>
      <GrainOverlay />

      <style>{`
        @keyframes ctaPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
        .cta-pulse { animation: ctaPulse 2s ease-in-out infinite; }
        .link-underline { position: relative; }
        .link-underline:after { content: ''; position: absolute; left: 0; bottom: -2px; height: 1px; width: 0%; background: rgba(255,255,255,0.9); transition: width 300ms ease; }
        .link-underline:hover:after { width: 100%; }
      `}</style>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <h2 className="font-serif text-white" style={{ fontSize: '56px', marginTop: '80px', lineHeight: 1.1 }}>
          Ready to Engineer Results?
        </h2>

        <div className="mt-8 rounded-md px-5 py-3" style={{ background: 'rgba(255,255,255,0.4)' }}>
          <p className="text-white/90">Limited availability: 2 spots remaining this quarter</p>
          <p className="mt-2 font-mono text-xl text-white">
            {String(days).padStart(2, '0')}d : {String(hours).padStart(2, '0')}h : {String(minutes).padStart(2, '0')}m : {String(seconds).padStart(2, '0')}s
          </p>
        </div>

        <div className="mt-10" />
        <a
          href="#contact"
          className="cta-pulse inline-flex transform items-center justify-center rounded-full font-medium shadow transition-all duration-300"
          style={{ background: '#FFFFFF', color: HUNTER, padding: '20px 28px', minWidth: '220px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = HUNTER;
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 14px 28px rgba(0,0,0,0.18)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.color = HUNTER;
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 8px 18px rgba(0,0,0,0.12)';
          }}
        >
          Book Strategy Call
        </a>

        <div className="mt-10" />
        <a href="#framework" className="link-underline text-[16px] text-white/70">
          Or download our 12 Triggers Framework
        </a>

        <p className="mt-12 text-sm text-white/60">
          No hard sell. No 47-page proposals. Just honest conversation about fit.
        </p>
      </div>
    </section>
  );
}
