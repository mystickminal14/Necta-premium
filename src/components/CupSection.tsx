import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Leaf, Clock, Award } from "lucide-react";
import type { ReactNode } from "react";

const POINTS: { icon: ReactNode; title: string; desc: string }[] = [
  { icon: <Coffee className="h-5 w-5" />, title: "Freshly Brewed", desc: "Roasted days ago, not months — taste the difference." },
  { icon: <Leaf className="h-5 w-5" />, title: "Eco Cups", desc: "Served in fully recyclable, plant-based cups." },
  { icon: <Clock className="h-5 w-5" />, title: "Your Daily Ritual", desc: "The cup that makes mornings worth waking up for." },
  { icon: <Award className="h-5 w-5" />, title: "Single Origin", desc: "Ethically sourced beans, traceable to the farm." },
];

function Feature({ icon, title, desc, align = "left", delay = 0 }: { icon: ReactNode; title: string; desc: string; align?: "left" | "right"; delay?: number }) {
  const right = align === "right";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.55 }}
      className={`group flex items-start gap-4 rounded-2xl border border-cream/10 bg-leaf-2/40 p-4 shadow-lg backdrop-blur-sm transition-colors hover:border-caramel/40 ${right ? "lg:flex-row-reverse lg:text-right" : ""}`}
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/20 text-caramel-light transition-colors group-hover:bg-caramel/30">{icon}</div>
      <div>
        <p className="text-base font-bold text-cream">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-cream/60">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function CupSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cupY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="experience" ref={ref} className="relative flex flex-col justify-center overflow-hidden bg-[radial-gradient(120%_100%_at_50%_-10%,#34543f_0%,#24412f_45%,#1c352a_100%)] py-16 text-cream sm:py-20 lg:min-h-screen">
      {/* scattered beans */}
      <img src="/img/bean.png" alt="" aria-hidden className="pointer-events-none absolute left-[8%] top-[16%] w-14 rotate-[40deg] opacity-70" />
      <img src="/img/bean.png" alt="" aria-hidden className="pointer-events-none absolute right-[10%] top-[22%] w-20 -rotate-[20deg] opacity-70" />
      <img src="/img/bean.png" alt="" aria-hidden className="pointer-events-none absolute left-[14%] bottom-[24%] w-12 rotate-[120deg] opacity-60" />
      <span className="pointer-events-none absolute -left-4 bottom-1 select-none font-hand text-[12vw] leading-none text-cream/[0.04]">sip</span>

      {/* TEXT ABOVE */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-hand text-3xl text-caramel-light sm:text-5xl">
          a taste of history in every cup
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-3 text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.05]">
          From Our Roastery, <span className="text-caramel-light">To Your Hands.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg">
          Every Necta cup carries the work of farmers, roasters, and a whole lot of love — brewed to taste exactly the way coffee should.
        </motion.p>
      </div>

      {/* CUP with cards at 4 corners */}
      <div className="relative z-10 mx-auto mt-8 w-full max-w-6xl px-5 sm:px-8 lg:mt-4">
        {/* cup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/15 blur-[110px]" />
          {/* beans pile behind cup */}
          <img src="/img/beans-pile.png" alt="" aria-hidden className="pointer-events-none absolute -bottom-6 left-1/2 w-[60%] max-w-md -translate-x-1/2 opacity-90" />
          <motion.img
            style={{ y: cupY }}
            src="/img/cup-product.png"
            alt="A Necta Coffee cup"
            className="relative mx-auto block w-3/4 max-w-[15rem] drop-shadow-[0_40px_70px_rgba(0,0,0,0.6)] sm:w-full sm:max-w-sm"
          />
        </motion.div>

        {/* corner cards — absolute on desktop, stacked on mobile */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:block">
          <div className="lg:absolute lg:left-0 lg:top-2 lg:w-72">
            <Feature {...POINTS[0]} align="right" delay={0.05} />
          </div>
          <div className="lg:absolute lg:right-0 lg:top-2 lg:w-72">
            <Feature {...POINTS[1]} delay={0.12} />
          </div>
          <div className="lg:absolute lg:bottom-2 lg:left-0 lg:w-72">
            <Feature {...POINTS[2]} align="right" delay={0.18} />
          </div>
          <div className="lg:absolute lg:bottom-2 lg:right-0 lg:w-72">
            <Feature {...POINTS[3]} delay={0.24} />
          </div>
        </div>
      </div>
    </section>
  );
}
