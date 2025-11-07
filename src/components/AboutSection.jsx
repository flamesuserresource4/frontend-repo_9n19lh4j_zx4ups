import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ACCENT = '#2C5F4D';

function OrbitingTriggers() {
  const triggers = useMemo(
    () => [
      'Attention', 'Novelty', 'Social Proof', 'Authority', 'Scarcity', 'Reciprocity',
      'Loss Aversion', 'Commitment', 'Clarity', 'Framing', 'Simplicity', 'Trust'
    ],
    []
  );

  // Scroll-linked subtle rotation
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 800], [0, 12]);

  return (
    <motion.div
      style={{ rotate }}
      className="relative mx-auto mt-6 h-[320px] w-full max-w-md"
      aria-label="12 psychological triggers orbit"
    >
      {/* Center symbol / logo placeholder */}
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ borderColor: ACCENT, boxShadow: '0 0 24px rgba(44,95,77,0.25)' }}>
        <div className="flex h-full w-full items-center justify-center font-semibold" style={{ color: ACCENT }}>FM</div>
      </div>

      {/* Orbits */}
      {[1, 2].map((ring, rIdx) => (
        <div key={ring} className="absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              border: '1px dashed rgba(108,108,108,0.25)',
              transform: `translate(-50%, -50%) scale(${1 + rIdx * 0.28})`,
            }}
          />
        </div>
      ))}

      {/* Items around a circle */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite]">
          {triggers.map((t, i) => {
            const angle = (i / triggers.length) * Math.PI * 2;
            const radius = 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={t}
                className="group absolute"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <div
                  className="rounded-full border bg-white/80 px-3 py-1 text-xs shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:scale-105"
                  style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                >
                  <span className="font-medium" style={{ color: ACCENT }}>{t}</span>
                </div>
                {/* Tooltip */}
                <div className="pointer-events-none absolute left-1/2 top-full mt-2 hidden w-48 -translate-x-1/2 rounded-md border bg-white p-2 text-[11px] leading-snug text-gray-700 shadow-md group-hover:block">
                  {`How we use ${t.toLowerCase()} to influence perception and action.`}
                </div>
                {/* Glow */}
                <div className="pointer-events-none absolute -inset-2 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(circle, rgba(44,95,77,0.22), transparent 60%)' }} />
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Founder photo parallax 0.7x speed: translateY proportional to scroll
  const founderY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="relative bg-white py-24">
      {/* Sticky note */}
      <div className="pointer-events-none absolute bottom-6 right-6 -rotate-3 rounded-md shadow" style={{ background: '#FFF9C4' }}>
        <div className="pointer-events-auto rotate-3 rounded-md px-4 py-3 text-[16px] leading-snug" style={{ fontFamily: 'ui-rounded, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Comic Sans MS", cursive' }}>
          <span className="font-medium">P.S.</span> We only take 3 clients per quarter. Quality > quantity.
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Headline with left margin */}
        <h2 className="font-serif text-[48px] leading-[1.15] tracking-[0.02em] text-black" style={{ marginLeft: '100px' }}>
          Human Intelligence + Machine Precision
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left 40%: Text */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="space-y-6 text-[18px] leading-[1.8] text-gray-800">
              <p>
                I started the studio to close a gap I kept seeing: work that looks good but fails to move people. We design for the subconscious first—calm confidence, quiet authority—then sharpen the logic around it.
              </p>
              <p>
                We believe 95% of decisions are emotional. Our work makes brands feel right before they make sense. That feeling: trust in the first 500ms, momentum in the first scroll, and clarity in the next click.
              </p>
              <p>
                Not everything, for everyone. Specialized depth over generalist breadth. We obsess over typography, pacing, and decision friction to remove 1,000 papercuts your users never report.
              </p>
              <div className="rounded-lg border-l-4 p-5" style={{ borderColor: ACCENT, background: '#F7FAF8' }}>
                <p className="font-medium text-gray-900">
                  Mission: Translate behavioral science into interfaces that convert with dignity.
                </p>
              </div>
            </div>
          </div>

          {/* Right 55%: Visual storytelling */}
          <div className="md:col-span-7 lg:col-span-7">
            {/* Founder photo with parallax */}
            <motion.div style={{ y: founderY }} className="relative h-[500px] overflow-hidden rounded-2xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1600&auto=format&fit=crop"
                alt="Founder portrait"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* 3D-ish orbit visualization */}
            <OrbitingTriggers />

            {/* Behind-the-scenes grid */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                'https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d7?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?q=80&w=800&auto=format&fit=crop',
              ].map((src) => (
                <div key={src} className="h-[150px] overflow-hidden rounded-lg border border-gray-200">
                  <img src={src} alt="Behind the scenes" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
