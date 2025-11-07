import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl tracking-wide"
        >
          Strategy before spectacle.
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[17px] leading-8 text-gray-700">
              We operate on a simple truth: 95% of decisions are emotional. Our methodology engineers feeling—attention, desire, trust—then channels it into action. We blend behavioral science with art direction to make fewer, better moves.
            </p>
            <p className="mt-6 text-[17px] leading-8 text-gray-700">
              Layouts follow the grain of human scanning: a Z-pattern to hook, an F-pattern to inform. One high-contrast CTA per section. 30–40% white space to breathe. Each interaction is tuned to a 300ms calm.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-3xl border border-gray-200 bg-[#FAFAFA] p-6 shadow-sm">
              <ul className="space-y-3 text-sm text-gray-800">
                <li><span className="font-medium" style={{ color: '#2C5F4D' }}>70%</span> credibility, <span className="font-medium" style={{ color: '#2C5F4D' }}>30%</span> personality.</li>
                <li>Asymmetric grids and diagonal tension for quiet dynamism.</li>
                <li>Micro-interactions with haptic-like feedback on CTAs.</li>
                <li>One clear focal point per screen—always.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
