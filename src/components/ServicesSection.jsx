import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
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
  X,
} from 'lucide-react';

const ACCENT = '#2C5F4D';

const triggers = [
  {
    title: 'Emotional Storytelling',
    copy: '95% of decisions are subconscious.',
    Icon: Heart,
    details:
      'We design narratives that map to primal needs—safety, status, belonging—so your product “feels right” before it’s analyzed. We sequence micro-moments to reduce doubt and build momentum.',
  },
  {
    title: 'Scarcity & Urgency',
    copy: '332% conversion lift with limited-time offers.',
    Icon: Hourglass,
    details:
      'Ethical scarcity: limited cohorts, shipping windows, and capacity-based constraints. We pair timers with social proof to nudge action while keeping brand trust intact.',
  },
  {
    title: 'Social Proof Systems',
    copy: '92% trust peer recommendations.',
    Icon: Network,
    details:
      'We architect signals—logos, testimonials, live activity, usage counters—into Z- and F-patterns so they are seen without clutter, establishing credibility instantly.',
  },
  {
    title: 'Authority Signaling',
    copy: 'Borrow trust from credible associations and cues.',
    Icon: Shield,
    details:
      'Credentials, certifications, expert quotes, and design motifs that convey rigor. Subtlety matters: authority should feel earned, not shouted.',
  },
  {
    title: 'Novelty & Surprise',
    copy: 'Pattern breaks reset attention and memory encoding.',
    Icon: Star,
    details:
      'Micro-interactions, motion pivots, and unexpected but tasteful reveals keep attention high and deepen recall without overwhelming cognitive load.',
  },
  {
    title: 'Clarity & Simplicity',
    copy: 'Reduce cognitive load to speed choices.',
    Icon: Eye,
    details:
      'We remove friction and ambiguity using plain language, progressive disclosure, and information hierarchy tuned for 500ms comprehension.',
  },
  {
    title: 'Commitment & Consistency',
    copy: 'Small yeses compound into large actions.',
    Icon: Target,
    details:
      'Low-stakes micro-commitments (quiz, preference save) prime users for bigger steps. We keep visual and copy patterns consistent to maintain momentum.',
  },
  {
    title: 'Loss Aversion',
    copy: 'People avoid losses more than seek gains.',
    Icon: Lock,
    details:
      'We frame outcomes around avoided pain and preserved gains, with careful contrast and copy that highlights what’s at risk by doing nothing.',
  },
  {
    title: 'Cognitive Ease',
    copy: 'Fluent experiences feel more truthful.',
    Icon: Brain,
    details:
      'Typography rhythm, whitespace, and chunking reduce mental effort. Fluent experiences are judged as more credible and trustworthy.',
  },
  {
    title: 'Anchoring & Framing',
    copy: 'First numbers shape all comparisons.',
    Icon: Anchor,
    details:
      'We place meaningful anchors before key choices (e.g., reference pricing, benchmarks) so subsequent options feel reasonable and compelling.',
  },
  {
    title: 'Reciprocity',
    copy: 'Give value first to invite action back.',
    Icon: Gift,
    details:
      'Provide immediate value—templates, insights, audits—so users feel comfortable reciprocating with time, data, or purchase.',
  },
  {
    title: 'Habit Loops',
    copy: 'Cue, routine, reward—designed intentionally.',
    Icon: RefreshCcw,
    details:
      'We map triggers, actions, and rewards into the product journey, using reminders and progress markers to reinforce repeat engagement.',
  },
];

function TriggerCard({ title, copy, Icon, delay = 0, onOpen }) {
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
          transitionDuration: '300ms',
        }}
      >
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md" style={{ backgroundColor: '#FAFAFA', border: `1px solid ${ACCENT}` }}>
          <Icon size={22} color={ACCENT} />
        </div>
        <h3 className="font-serif text-2xl tracking-wide">{title}</h3>
        <p className="mt-3 text-gray-700">{copy}</p>
        <div className="mt-6 h-px w-full bg-gray-200" />
        <button
          onClick={onOpen}
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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const activeTrigger = triggers[active];

  return (
    <section id="framework" className="relative bg-white pb-24 pt-10 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mt-20 text-center font-serif text-5xl tracking-wide">The 12 Triggers Framework</h2>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {triggers.map((t, i) => (
            <TriggerCard
              key={t.title}
              title={t.title}
              copy={t.copy}
              Icon={t.Icon}
              delay={i * 0.08}
              onOpen={() => {
                setActive(i);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-fadeIn" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="font-serif text-3xl tracking-wide">{activeTrigger.title}</Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-gray-600">{activeTrigger.copy}</Dialog.Description>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-md p-2 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-5 text-[15px] leading-relaxed text-gray-800">
              {activeTrigger.details}
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                className="rounded-full border px-4 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <a
                href="#contact"
                className="rounded-full px-5 py-2 text-sm text-white"
                style={{ backgroundColor: ACCENT }}
              >
                Apply this to my product
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
