import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Hourglass,
  Network,
  Shield,
  Star,
  Target,
  Eye,
  Lock,
  Brain,
  Anchor,
  Gift,
  RefreshCcw,
} from 'lucide-react';

const ACCENT = '#2C5F4D';

const triggers = [
  {
    title: 'Emotional Storytelling',
    copy: '95% of decisions are subconscious.',
    Icon: Heart,
  },
  {
    title: 'Scarcity & Urgency',
    copy: '332% conversion lift with limited-time offers.',
    Icon: Hourglass,
  },
  {
    title: 'Social Proof Systems',
    copy: '92% trust peer recommendations.',
    Icon: Network,
  },
  {
    title: 'Authority Signaling',
    copy: 'Borrow trust from credible associations and cues.',
    Icon: Shield,
  },
  {
    title: 'Novelty & Surprise',
    copy: 'Pattern breaks reset attention and memory encoding.',
    Icon: Star,
  },
  {
    title: 'Clarity & Simplicity',
    copy: 'Reduce cognitive load to speed choices.',
    Icon: Eye,
  },
  {
    title: 'Commitment & Consistency',
    copy: 'Small yeses compound into large actions.',
    Icon: Target,
  },
  {
    title: 'Loss Aversion',
    copy: 'People avoid losses more than seek gains.',
    Icon: Lock,
  },
  {
    title: 'Cognitive Ease',
    copy: 'Fluent experiences feel more truthful.',
    Icon: Brain,
  },
  {
    title: 'Anchoring & Framing',
    copy: 'First numbers shape all comparisons.',
    Icon: Anchor,
  },
  {
    title: 'Reciprocity',
    copy: 'Give value first to invite action back.',
    Icon: Gift,
  },
  {
    title: 'Habit Loops',
    copy: 'Cue, routine, reward—designed intentionally.',
    Icon: RefreshCcw,
  },
];

function TriggerCard({ title, copy, Icon, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const baseShadow = '0px 6px 18px rgba(44,95,77,0.06)';
  const hoverShadow = '0px 4px 20px rgba(44,95,77,0.15)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className="[perspective:1000px]"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="h-full rounded-lg border-2 bg-white p-10 transition-transform will-change-transform"
        style={{
          borderColor: ACCENT,
          transform: hovered ? 'rotateX(5deg) rotateY(5deg)' : 'rotateX(0deg) rotateY(0deg)',
          boxShadow: hovered ? hoverShadow : baseShadow,
          transformStyle: 'preserve-3d',
          transitionDuration: '400ms',
        }}
      >
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md" style={{ backgroundColor: '#FAFAFA', border: `1px solid ${ACCENT}` }}>
          <Icon size={22} color={ACCENT} />
        </div>
        <h3 className="font-serif text-2xl tracking-wide">{title}</h3>
        <p className="mt-3 text-gray-700">{copy}</p>
        <div className="mt-6 h-px w-full bg-gray-200" />
        <button
          className="mt-6 inline-flex items-center text-sm font-medium"
          style={{ color: ACCENT }}
          aria-label={`Learn more about ${title}`}
        >
          Learn More
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="framework" className="relative bg-white pb-24 pt-10 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mt-20 text-center font-serif text-5xl tracking-wide">The 12 Triggers Framework</h2>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {triggers.map((t, i) => (
            <TriggerCard key={t.title} title={t.title} copy={t.copy} Icon={t.Icon} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
