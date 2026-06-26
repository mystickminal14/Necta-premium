import { motion } from "framer-motion";
import { Sprout, Settings, Flame, Package, Truck } from "lucide-react";
import type { ReactNode } from "react";

const STEPS: { icon: ReactNode; step: string; title: string; desc: string }[] = [
  { icon: <Sprout className="h-6 w-6" />, step: "01", title: "Handpicked", desc: "Ripest cherries selected by hand at altitude." },
  { icon: <Settings className="h-6 w-6" />, step: "02", title: "Processed", desc: "Washed & natural processing preserves origin character." },
  { icon: <Flame className="h-6 w-6" />, step: "03", title: "Roasted", desc: "Small-batch. Every profile cupped for perfection." },
  { icon: <Package className="h-6 w-6" />, step: "04", title: "Packed Fresh", desc: "Nitrogen-sealed immediately after roasting." },
  { icon: <Truck className="h-6 w-6" />, step: "05", title: "Delivered", desc: "From our roastery to your door — freshness intact." },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-cream-2 py-20 sm:py-28">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-hand text-2xl text-caramel sm:text-3xl">
            how we do it
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-2 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-espresso">
            From Farm To Cup. <span className="text-caramel">Every Step.</span>
          </motion.h2>
        </div>

        <div className="relative mt-14">
          {/* connector line */}
          <div className="absolute left-[10%] right-[10%] top-9 hidden h-px bg-espresso/15 md:block" />
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-x-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative z-10 text-center"
              >
                <div className="mx-auto grid h-[72px] w-[72px] place-items-center rounded-full border border-espresso/15 bg-cream text-espresso transition-all duration-300 group-hover:border-caramel group-hover:bg-caramel group-hover:text-cream">
                  {s.icon}
                </div>
                <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-caramel">{s.step}</p>
                <h3 className="mt-1 text-base font-bold text-espresso">{s.title}</h3>
                <p className="mx-auto mt-1 max-w-[12rem] text-sm text-espresso/55">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
