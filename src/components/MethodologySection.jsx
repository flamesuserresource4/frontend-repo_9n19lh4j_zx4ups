import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Search, Grid, PenTool, TrendingUp } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const HUNTER_GREEN = '#2C5F4D';

function Step({ icon: Icon, title, text, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, delay: 0.2 * index, ease: 'easeOut' },
      });
    }
  }, [inView, controls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50, filter: 'blur(6px)' }}
      animate={controls}
      className="relative z-0"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-[#111111] shadow-sm" style={{ color: HUNTER_GREEN }}>
          <Icon size={22} strokeWidth={2} />
        </div>
        <div>
          <h4 className="font-semibold text-white tracking-tight">{title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">{text}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MethodologySection() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Progress fill based on scroll within the timeline area
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const start = Math.max(0, viewport - Math.max(0, rect.top));
      const total = rect.height + viewport;
      const p = Math.min(1, Math.max(0, start / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Gentle 3D tilt for the Spline container (non-blocking of drag)
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (x - 0.5) * 6; // rotateY
    const rx = (0.5 - y) * 6; // rotateX
    setTilt({ rx, ry });
  };
  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  const steps = useMemo(
    () => [
      {
        icon: Search,
        title: 'Research',
        text:
          'Deep-dive into audience psychology, competitive landscape, behavioral triggers',
      },
      {
        icon: Grid,
        title: 'Strategic Framework',
        text:
          'Custom trigger matrix aligning business goals with psychological drivers',
      },
      {
        icon: PenTool,
        title: 'Creative Execution',
        text:
          'Design that makes them feel before they think — every pixel serves purpose',
      },
      {
        icon: TrendingUp,
        title: 'Optimize & Scale',
        text:
          'A/B testing, data analysis, continuous refinement for 400%+ ROI',
      },
    ],
    []
  );

  return (
    <section id="methodology" className="relative bg-[#1A1A1A] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-[52px] leading-[1.1] tracking-[0.02em] text-white">Science Meets Craft</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400">Integrating data and psychology with creative excellence. Strategic restraint, emotional impact.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          {/* Left: WebGL / Spline 55% width on desktop */}
          <div className="md:col-span-7 rounded-xl border border-gray-800 bg-[#111111] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
            <div
              className="relative h-[420px] w-full overflow-hidden rounded-lg bg-[#1A1A1A] will-change-transform"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 200ms ease-out',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
            >
              <Spline
                scene="https://prod.spline.design/kow0cKDK6Tap7xO9/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
              {/* Non-blocking decorative gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: HUNTER_GREEN }} />
                Data & Psychology ↔ Creative Execution
              </span>
              <span>Drag or rotate slightly</span>
            </div>
          </div>

          {/* Right: Timeline 40% width on desktop */}
          <div className="md:col-span-5">
            <div ref={containerRef} className="relative">
              {/* Vertical line with progress fill */}
              <div className="absolute left-[19px] top-0 h-full w-[3px] bg-gray-800" />
              <div
                ref={lineRef}
                className="absolute left-[19px] top-0 w-[3px]"
                style={{ height: `${Math.max(0, Math.min(100, progress * 100))}%`, backgroundColor: HUNTER_GREEN }}
              />

              <div className="flex flex-col gap-8 pl-10">
                {steps.map((s, i) => (
                  <div key={s.title} className="relative">
                    {/* Connector node */}
                    <div
                      className="absolute left-0 top-2 h-4 w-4 -translate-x-[9px] rounded-full border border-gray-700 bg-[#141414]"
                      style={{ boxShadow: `0 0 0 2px #0b0b0b, 0 0 0 6px rgba(44,95,77,0.15)` }}
                    />
                    <Step icon={s.icon} title={s.title} text={s.text} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
