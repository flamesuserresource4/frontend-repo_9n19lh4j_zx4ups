import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ACCENT = '#2C5F4D';

// WebGL-style orbiting triggers with shader-like glow using canvas for performance + hover tooltips
function WebGLOutlineOrbits() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const labels = useMemo(
    () => [
      'Attention', 'Novelty', 'Social Proof', 'Authority', 'Scarcity', 'Reciprocity',
      'Loss Aversion', 'Commitment', 'Clarity', 'Framing', 'Simplicity', 'Trust',
    ],
    []
  );

  const tooltips = useMemo(
    () => labels.map((l) => `How we use ${l.toLowerCase()} to influence perception and action.`),
    [labels]
  );

  // Animation state
  const stateRef = useRef({ t: 0, w: 0, h: 0, r: 140 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      stateRef.current.w = w;
      stateRef.current.h = h;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const { w, h } = stateRef.current;
      ctx.clearRect(0, 0, w, h);

      // center
      const cx = w / 2;
      const cy = h / 2;

      // background subtle vignette
      const grad = ctx.createRadialGradient(cx, cy, 40, cx, cy, Math.max(w, h) / 1.1);
      grad.addColorStop(0, 'rgba(28,28,28,0.02)');
      grad.addColorStop(1, 'rgba(28,28,28,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // orbit rings
      ctx.strokeStyle = 'rgba(108,108,108,0.25)';
      ctx.lineWidth = 1;
      [1, 1.28].forEach((s) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, 110 * s, 110 * s, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // slow rotation
      stateRef.current.t += 0.008;
      const t = stateRef.current.t;

      const radius = 140;
      const count = labels.length;

      // soft center core with glow
      ctx.save();
      ctx.shadowColor = 'rgba(44,95,77,0.45)';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.stroke();

      // items
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + t;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;

        // glow
        ctx.save();
        const isHover = i === hoverIndex;
        ctx.shadowColor = `rgba(44,95,77,${isHover ? 0.7 : 0.35})`;
        ctx.shadowBlur = isHover ? 26 : 16;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, isHover ? 9 : 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // label background
        const label = labels[i];
        ctx.font = '12px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial';
        const textW = ctx.measureText(label).width;
        const padX = 8;
        const padY = 6;
        const bx = x - textW / 2 - padX;
        const by = y + 14;
        const bw = textW + padX * 2;
        const bh = 22;

        // rounded rect path (manual to avoid roundRect unsupported envs)
        const r = 8;
        ctx.beginPath();
        ctx.moveTo(bx + r, by);
        ctx.lineTo(bx + bw - r, by);
        ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + r);
        ctx.lineTo(bx + bw, by + bh - r);
        ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - r, by + bh);
        ctx.lineTo(bx + r, by + bh);
        ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - r);
        ctx.lineTo(bx, by + r);
        ctx.quadraticCurveTo(bx, by, bx + r, by);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = ACCENT;
        ctx.fillText(label, bx + padX, by + 15);
      }

      requestAnimationFrame(draw);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    requestAnimationFrame(draw);
    return () => ro.disconnect();
  }, [labels]);

  // Pointer hover detection for stronger glow + tooltip placement
  useEffect(() => {
    const canvas = canvasRef.current;

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPointer({ x, y });
      const { w, h } = stateRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const radius = 140;
      const count = labels.length;
      let found = -1;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + stateRef.current.t;
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius;
        const dx = x - px;
        const dy = y - py;
        if (dx * dx + dy * dy < 14 * 14) {
          found = i;
          break;
        }
      }
      setHoverIndex(found);
    }

    function onLeave() {
      setHoverIndex(-1);
    }

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    return () => {
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [labels]);

  return (
    <div ref={wrapperRef} className="relative mx-auto mt-6 w-full max-w-md">
      <canvas ref={canvasRef} className="h-[360px] w-full rounded-xl border border-gray-200 bg-white" />
      {hoverIndex >= 0 && (
        <div
          className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 rounded-md border bg-white p-3 text-xs leading-snug text-gray-700 shadow-xl"
          style={{ left: pointer.x, top: Math.min(pointer.y + 18, 340) }}
          role="tooltip"
        >
          <div className="mb-1 font-medium" style={{ color: ACCENT }}>{labels[hoverIndex]}</div>
          {tooltips[hoverIndex]}
        </div>
      )}
    </div>
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
        <div className="pointer-events-auto rotate-3 rounded-md px-4 py-3 text-[16px] leading-snug" style={{ fontFamily: 'ui-rounded, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \"Comic Sans MS\", cursive' }}>
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

            {/* Full WebGL-style orbit visualization with glow + tooltips */}
            <WebGLOutlineOrbits />

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
