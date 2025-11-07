import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ACCENT = '#2C5F4D';

function LiveActivityTicker() {
  const messages = useMemo(
    () => [
      'Sarah from Portland just downloaded our framework',
      'Miguel from Austin booked a strategy audit',
      'Priya from London joined the waitlist',
      'Jonah from Berlin started a 14-day experiment',
    ],
    []
  );
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div className="mx-auto mb-8 w-full max-w-2xl">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2 shadow-sm"
      >
        <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
        <p className="text-sm text-gray-800">{messages[index]}</p>
      </motion.div>
    </div>
  );
}

function LogoCarousel() {
  const brands = [
    'Acme',
    'Nimbus',
    'Helix',
    'Vertex',
    'Orbit',
    'Polar',
    'Quanta',
    'Apollo',
  ];
  const row = [...brands, ...brands]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden py-6">
      <p className="mb-4 text-center text-sm text-gray-500">Trusted by forward-thinking brands</p>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[scrollLeft_25s_linear_infinite] gap-10 pr-10">
          {row.map((b, i) => (
            <div
              key={b + i}
              className="flex h-[60px] w-[120px] items-center justify-center rounded-md border border-gray-200 bg-white px-4 filter grayscale transition duration-300 hover:grayscale-0"
            >
              <span className="text-sm font-medium text-gray-700">{b}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scrollLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

function TestimonialCard({ quote, name, company, metric, photo, isActive, offset }) {
  return (
    <div
      className={`absolute left-1/2 top-0 w-full max-w-md -translate-x-1/2 rounded-2xl bg-white p-6 shadow-xl transition-all duration-700`} 
      style={{ transform: `translateX(-50%) translateY(${offset}px) ${isActive ? '' : ''}`, opacity: isActive ? 1 : offset < 0 ? 0.95 : 0.9, zIndex: isActive ? 30 : 20 }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
          {/* Placeholder photo */}
          {photo ? <img src={photo} alt={name} className="h-full w-full object-cover" /> : null}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{company}</p>
        </div>
        <div className="ml-auto rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-[${ACCENT}]" style={{ color: ACCENT }}>
          {metric}
        </div>
      </div>
      <p className="text-[20px] italic leading-relaxed text-gray-800">“{quote}”</p>
    </div>
  );
}

function TestimonialDeck() {
  const testimonials = [
    {
      quote: 'They reframed our onboarding and the conversion lift stunned our board.',
      name: 'Amelia Carter',
      company: 'Head of Growth, Nimbus',
      metric: '+127% CVR',
      photo: '',
    },
    {
      quote: 'The team translates psychology into design decisions that actually move revenue.',
      name: 'Daniel Kim',
      company: 'CMO, Helix',
      metric: '890% ROI',
      photo: '',
    },
    {
      quote: 'From the first audit to scale, they stayed laser-focused on outcomes.',
      name: 'Leah Ortiz',
      company: 'Founder, Vertex',
      metric: '92% retention',
      photo: '',
    },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <div className="relative h-[320px] w-full">
      <TestimonialCard {...testimonials[(active + 1) % 3]} isActive={false} offset={-20} />
      <TestimonialCard {...testimonials[(active + 2) % 3]} isActive={false} offset={20} />
      <TestimonialCard {...testimonials[active]} isActive offset={0} />
    </div>
  );
}

function Stat({ value, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const target = value;
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="text-[42px] font-serif font-extrabold" style={{ color: ACCENT }}>{display}{typeof value === 'number' && value >= 100 ? '' : ''}</div>
      <div className="mt-1 text-xs text-gray-500">{label}</div>
    </div>
  );
}

export default function SocialProofSection() {
  return (
    <section
      className="relative py-20"
      style={{ background: 'linear-gradient(15deg, #FFFFFF 0%, #F5F5F5 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <LiveActivityTicker />
        <LogoCarousel />

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <TestimonialDeck />
          </div>
          <div className="md:col-span-5 flex items-center">
            <div className="grid w-full grid-cols-2 gap-8">
              <Stat value={127} label="Avg Conversion Lift" />
              <Stat value={50} label="Brands Transformed" />
              <Stat value={890} label="Peak ROI" />
              <Stat value={92} label="Retention Rate" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
