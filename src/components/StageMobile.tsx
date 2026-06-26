import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sprout, Mountain, Droplets, Flame, ScanLine, PackageCheck, Leaf, Coffee, HeartHandshake } from "lucide-react";
import type { ReactNode } from "react";
import CoffeeScene from "../three/CoffeeScene";
import ScatterBeans from "./ScatterBeans";
import BeanCluster from "./BeanCluster";
import { scrollState } from "../lib/scrollState";

const FEATURES: { icon: ReactNode; top: string; title: string }[] = [
  { icon: <Sprout className="h-5 w-5" />, top: "Handpicked", title: "Single-Origin Nepali Beans" },
  { icon: <Droplets className="h-5 w-5" />, top: "Fully Washed", title: "Clean, Bright & Balanced" },
  { icon: <Flame className="h-5 w-5" />, top: "Small-Batch", title: "Roasted Fresh Weekly" },
  { icon: <PackageCheck className="h-5 w-5" />, top: "Aroma-Locked", title: "Nitrogen-Sealed Fresh" },
  { icon: <Mountain className="h-5 w-5" />, top: "High Altitude", title: "Grown Above 1,200m" },
  { icon: <ScanLine className="h-5 w-5" />, top: "Graded & Sorted", title: "Premium Screen Size" },
];

const VALUES = [
  { icon: <Leaf className="h-4 w-4" />, label: "Ethically Sourced" },
  { icon: <Coffee className="h-4 w-4" />, label: "Roasted With Care" },
  { icon: <HeartHandshake className="h-4 w-4" />, label: "People First" },
];

export default function StageMobile() {
  // Park the model centred & front-facing for the static mobile layout.
  useEffect(() => {
    scrollState.hero = 1;
  }, []);

  return (
    <>
      {/* ABOUT + model — dark espresso, distinct from the cream hero */}
      <section id="about" className="relative overflow-hidden bg-[radial-gradient(130%_120%_at_80%_-10%,#3a2416_0%,#2a1810_45%,#1a0d06_100%)] px-5 pt-16 pb-4 text-cream">
        <div className="grain absolute inset-0" />
        <div className="relative">
          <p className="font-hand text-2xl text-caramel-light">about us</p>
          <h2 className="mt-1 text-[clamp(2rem,9vw,2.8rem)] font-bold leading-[1.05] tracking-tight text-cream">
            A small roastery, a <span className="text-caramel-light">big</span> love for coffee.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/70">
            We work hand-in-hand with farmers across Nepal&apos;s highlands — only
            the ripest cherries, roasted in small batches, delivered fresh.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {VALUES.map((v) => (
              <span key={v.label} className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/5 px-3 py-1.5 text-xs font-medium text-cream/90">
                <span className="text-caramel-light">{v.icon}</span>
                {v.label}
              </span>
            ))}
          </div>
        </div>

        {/* model */}
        <div className="relative mt-2 h-[46vh] w-full">
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[26vw] font-bold leading-none tracking-tighter text-cream/[0.06]">
            NECTA
          </span>
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[38vh] w-[38vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/15 blur-3xl" />
          <BeanCluster />
          <CoffeeScene />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="relative overflow-hidden bg-leaf px-5 py-16 text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#34543f_0%,#24412f_45%,#1c352a_100%)]" />
        <ScatterBeans count={8} />
        <div className="relative">
          <p className="font-hand text-2xl text-caramel-light">why choose us</p>
          <h2 className="mt-1 text-[clamp(1.8rem,7vw,2.4rem)] font-bold">
            Every Bean, Carefully <span className="text-caramel-light">Chosen</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.top}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="flex items-center gap-3 rounded-2xl border border-cream/10 bg-leaf-2/70 p-4"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/15 text-caramel-light">{f.icon}</div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-caramel-light">{f.top}</p>
                  <p className="text-sm font-semibold leading-tight">{f.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
