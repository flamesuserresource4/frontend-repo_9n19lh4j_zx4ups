import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ACCENT = '#2C5F4D';

function useCountUp(end = 0, duration = 1500, startWhen = true) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    if (!startWhen) return;
    function step(ts) {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(end * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, startWhen]);

  return value;
}

function FeaturedMetrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const roi = useCountUp(890, 1500, inView);
  const ctr = useCountUp(10, 1500, inView);
  const eng = useCountUp(2, 1500, inView);

  return (
    <div ref={ref} className="mx-auto mb-10 mt-6 flex max-w-6xl flex-wrap items-baseline justify-center gap-x-12 gap-y-4 px-6">
      <div className="flex items-baseline gap-2">
        <span className="font-serif" style={{ color: ACCENT, fontSize: '48pt', lineHeight: 1 }}>
          {roi}%
        </span>
        <span className="text-gray-800">Avg ROI</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-serif" style={{ color: ACCENT, fontSize: '48pt', lineHeight: 1 }}>
          {ctr.toFixed(1)}%
        </span>
        <span className="text-gray-800">CTR</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-serif" style={{ color: ACCENT, fontSize: '48pt', lineHeight: 1 }}>
          {eng.toFixed(1)}x
        </span>
        <span className="text-gray-800">Engagement</span>
      </div>
    </div>
  );
}

const CASES = [
  {
    id: 'alpha',
    client: 'AlphaPay',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Leica_Camera_logo.svg',
    image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Reduce friction in onboarding while maintaining perceived security.',
    metricValue: '890%',
    metricLabel: 'ROI Increase',
  },
  {
    id: 'delta',
    client: 'Delta Commerce',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Lift add-to-cart rate by clarifying value and reducing cognitive load.',
    metricValue: '10.4%',
    metricLabel: 'CTR',
  },
  {
    id: 'nova',
    client: 'Nova SaaS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Increase trial-to-paid conversion via commitment and reciprocity loops.',
    metricValue: '2.5x',
    metricLabel: 'Engagement',
  },
];

function CaseCard({ data, index }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.4 });
  const [scrollY, setScrollY] = useState(0);

  // Parallax within card: track scroll of the container via event passed down
  function onScroll(e) {
    const el = e.currentTarget;
    setScrollY(el.scrollTop || 0);
  }

  return (
    <div className="shrink-0 snap-center" style={{ width: '80vw' }}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, transform: 'translateZ(-100px)' }}
        whileInView={{ opacity: 1, transform: 'translateZ(0px)' }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: index * 0.06 }}
        className="relative grid h-[70vh] w-full grid-cols-1 overflow-hidden rounded-[28px] border border-gray-200 bg-black text-white md:grid-cols-2"
        style={{ perspective: '1000px' }}
        onScroll={onScroll}
      >
        {/* Left: image with parallax (moves slower) */}
        <div className="relative h-full w-full overflow-hidden">
          <motion.img
            src={data.image}
            alt={`${data.client} project`}
            className="absolute inset-0 h-[120%] w-full object-cover"
            style={{ y: -scrollY * 0.5 }}
          />
        </div>

        {/* Right: content with dark overlay gradient */}
        <div className="relative flex h-full flex-col justify-between p-10">
          <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.6) 100%)' }} />

          <div className="relative z-10">
            <img src={data.logo} alt={`${data.client} logo`} className="h-10 invert" />
            <p className="mt-6 max-w-md text-[18px] leading-7 text-white/95">
              {data.challenge}
            </p>
          </div>

          <div className="relative z-10 mt-8">
            <div className="flex items-baseline gap-3">
              <span className="font-serif font-semibold" style={{ color: ACCENT, fontSize: '72pt', lineHeight: 1 }}>
                {data.metricValue}
              </span>
            </div>
            <div className="-mt-1 text-sm text-white/90">{data.metricLabel}</div>
            <a href="#" className="mt-6 inline-flex items-center text-white/95 transition-colors hover:text-white">
              <span>View Case Study</span>
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CaseStudiesSection() {
  const scrollerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    function onScroll() {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setProgress(p);
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const headlineStyle = useMemo(() => ({ letterSpacing: '0.02em', fontSize: '48pt' }), []);

  return (
    <section className="relative bg-white py-20">
      {/* Headline with 120px left margin on large screens */}
      <h2 className="font-serif" style={{ ...headlineStyle, marginLeft: 120 }}>
        Results That Speak
      </h2>

      {/* Featured metrics */}
      <FeaturedMetrics />

      {/* Horizontal gallery (desktop), vertical stack (mobile) */}
      <div className="mt-10">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-10 overflow-x-auto px-6 md:px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {CASES.map((c, i) => (
            <CaseCard key={c.id} data={c} index={i} />
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mx-6 mt-6 h-0.5 bg-gray-200 md:mx-10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
          <div className="h-full" style={{ width: `${progress * 100}%`, backgroundColor: ACCENT }} />
        </div>
      </div>

      {/* Mobile vertical stack duplication for better UX */}
      <div className="mt-10 space-y-10 px-6 md:hidden">
        {CASES.map((c, i) => (
          <motion.div
            key={`m-${c.id}`}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="overflow-hidden rounded-2xl border border-gray-200"
          >
            <img src={c.image} alt="case" className="h-56 w-full object-cover" />
            <div className="bg-black p-6 text-white">
              <img src={c.logo} alt="logo" className="h-8 invert" />
              <p className="mt-4 text-[16px] leading-7 text-white/95">{c.challenge}</p>
              <div className="mt-4 text-white">
                <div className="font-serif font-semibold" style={{ color: ACCENT, fontSize: '48pt', lineHeight: 1 }}>{c.metricValue}</div>
                <div className="text-sm text-white/90">{c.metricLabel}</div>
                <a href="#" className="mt-3 inline-flex items-center text-white/95">
                  View Case Study <ArrowRight size={18} className="ml-2" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
