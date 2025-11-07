import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const accent = '#2C5F4D';

function formatTimeLeft(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function HeroSection() {
  // Scarcity countdown: next quarter end (approx 90 days from now)
  const target = useMemo(() => Date.now() + 1000 * 60 * 60 * 24 * 90, []);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const { days, hours, minutes, seconds } = formatTimeLeft(target - now);

  return (
    <section className="relative min-h-[90vh] w-full bg-[#FAFAFA] text-black overflow-hidden">
      {/* Subtle gradient mesh overlay */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-1/3 -left-1/4 h-[80vh] w-[80vh] rounded-full opacity-30 blur-3xl"
             style={{ background: `radial-gradient(closest-side, ${accent}, transparent 70%)` }} />
        <div className="absolute -bottom-1/3 -right-1/4 h-[80vh] w-[80vh] rounded-full opacity-20 blur-3xl"
             style={{ background: 'radial-gradient(closest-side, #9CA3AF, transparent 70%)' }} />
      </div>

      {/* Spline scene (subtle particle/shape depth) */}
      <div className="absolute inset-0 opacity-60">
        <Spline
          scene="https://prod.spline.design/Hyq8Kf7wrfMwVh1y/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Scarcity bar */}
        <motion.div
          initial={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6 }}
          className="mb-10 inline-flex items-center gap-3 rounded-full border border-gray-300/70 bg-white/70 px-4 py-2 backdrop-blur-sm"
        >
          <span className="inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
          <span className="text-sm tracking-wide text-gray-800">Limited: Accepting 3 clients this quarter</span>
          <span className="ml-2 h-4 w-px bg-gray-300" />
          <span className="text-sm font-medium tabular-nums text-gray-900">
            {String(days).padStart(2, '0')}d:{String(hours).padStart(2, '0')}h:{String(minutes).padStart(2, '0')}m:{String(seconds).padStart(2, '0')}s
          </span>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="font-serif text-5xl leading-tight tracking-wide sm:text-6xl md:text-7xl"
              style={{ letterSpacing: '0.02em' }}
            >
              Confident Minimalism for brands that whisper luxury.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-6 max-w-xl text-lg leading-8 text-gray-700"
            >
              Psychology-driven design that makes people feel first—then act. We blend strategic restraint with modern craft to earn attention and trust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#services"
                className="group inline-flex items-center rounded-full border border-gray-900 bg-gray-900 px-6 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                style={{ backgroundColor: '#000000', borderColor: '#000000' }}
              >
                Start a project
                <span className="ml-3 inline-block h-2 w-2 rounded-full transition-colors duration-300" style={{ backgroundColor: accent }} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-3 text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Our approach
              </a>
            </motion.div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1200&auto=format&fit=crop"
                alt="Founder portrait"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/80 p-4 backdrop-blur">
                <p className="text-sm text-gray-600">Founder & Lead Strategist</p>
                <p className="font-medium text-gray-900">Looks at you to connect. Then looks at the work to direct.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
