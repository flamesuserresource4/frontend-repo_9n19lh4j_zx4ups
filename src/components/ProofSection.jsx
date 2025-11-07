import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const logos = [
  'https://upload.wikimedia.org/wikipedia/commons/3/35/Twitter_Logo_Blue.png',
  'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/24/Leica_Camera_logo.svg',
];

export default function ProofSection() {
  // Live project ticker simulation
  const [count, setCount] = useState(128);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + 1), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-[#FAFAFA] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="font-serif text-4xl tracking-wide">Trusted, quietly.</h2>
            <p className="mt-3 max-w-md text-gray-700">
              We design for decision-making. The results speak softly—and convert loudly.
            </p>
          </div>
          <div className="md:col-span-6 flex md:justify-end">
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm">
              Live projects delivered: <span className="font-medium tabular-nums" style={{ color: '#2C5F4D' }}>{count}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {logos.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <img src={src} alt="Client logo" className="h-8 opacity-70" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
