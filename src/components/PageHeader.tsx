import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Props {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  crumb: string;
}

const BEANS: { top: string; left?: string; right?: string; w: number; rot: number; dur: number }[] = [
  { top: "24%", left: "8%", w: 56, rot: -20, dur: 8 },
  { top: "62%", left: "16%", w: 38, rot: 60, dur: 9 },
  { top: "30%", right: "10%", w: 64, rot: 130, dur: 7.5 },
  { top: "70%", right: "20%", w: 42, rot: -40, dur: 10 },
];

export default function PageHeader({ eyebrow, title, highlight, subtitle, crumb }: Props) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(130%_120%_at_78%_-10%,#3a2416_0%,#2a1810_45%,#1a0d06_100%)] px-4 pb-16 pt-32 text-cream sm:px-8 sm:pb-20 sm:pt-40">
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.07] mix-blend-luminosity" style={{ backgroundImage: "url('/img/beans-texture.jpg')" }} />
      <div className="grain absolute inset-0" />

      {/* floating beans */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BEANS.map((b, i) => (
          <motion.img
            key={i}
            src="/img/bean.png"
            alt=""
            animate={{ y: [0, -14, 0], rotate: [b.rot, b.rot + 8, b.rot] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: b.top, left: b.left, right: b.right, width: b.w }}
            className="absolute opacity-60 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        {/* breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 px-3.5 py-1.5 text-xs font-medium text-cream/70 backdrop-blur"
        >
          <Link to="/" className="transition-colors hover:text-cream">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-cream/40" />
          <span className="text-caramel-light">{crumb}</span>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="font-hand text-2xl text-caramel-light sm:text-3xl">
          {eyebrow}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="mt-2 text-[clamp(1.9rem,7vw,4.4rem)] font-bold leading-[1.04] tracking-tight">
          {title} <span className="text-caramel-light">{highlight}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/65 sm:text-lg">
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
