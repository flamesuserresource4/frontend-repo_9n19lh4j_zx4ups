import { motion } from 'framer-motion';

const services = [
  {
    title: 'Brand Strategy',
    desc: 'Positioning, narratives, and identity systems that move people to act.',
  },
  {
    title: 'Product Experience',
    desc: 'Conversion-minded UX/UI where clarity, flow, and emotion align.',
  },
  {
    title: 'Website Design',
    desc: 'Minimal, luxurious sites engineered for trust and performance.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-4xl tracking-wide sm:text-5xl">Services</h2>
          <p className="max-w-lg text-sm text-gray-600">
            Each engagement is designed for a single outcome: aligned emotion and action. One focal point per screen. No noise.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group md:col-span-4"
            >
              <div className="relative h-full rounded-3xl border border-gray-200 bg-[#FAFAFA] p-8 shadow-sm transition-transform duration-150 will-change-transform group-hover:-translate-y-0.5">
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 0 1px #2C5F4D' }} />
                <h3 className="font-serif text-2xl tracking-wide">{s.title}</h3>
                <p className="mt-3 text-gray-700">{s.desc}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                <div className="mt-6 inline-flex items-center text-sm font-medium" style={{ color: '#2C5F4D' }}>
                  Explore
                  <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#2C5F4D' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
