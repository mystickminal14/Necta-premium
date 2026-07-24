import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Leaf, Clock, Award } from "lucide-react";
import type { ReactNode } from "react";
import nectaCup from "../assets/necta-cup.png";

interface Point {
  icon: ReactNode;
  title: string;
  desc: string;
  align: "left" | "right";
  target: { x: number; y: number };
}

const POINTS: Point[] = [
  { icon: <Coffee className="h-5 w-5" />, title: "Freshly Brewed", desc: "Roasted days ago, not months — taste the difference.", align: "left", target: { x: -430, y: -175 } },
  { icon: <Clock className="h-5 w-5" />, title: "Your Daily Ritual", desc: "The cup that makes mornings worth waking up for.", align: "left", target: { x: -430, y: 175 } },
  { icon: <Leaf className="h-5 w-5" />, title: "Eco Cups", desc: "Served in fully recyclable, plant-based cups.", align: "right", target: { x: 430, y: -175 } },
  { icon: <Award className="h-5 w-5" />, title: "Single Origin", desc: "Ethically sourced beans, traceable to the farm.", align: "right", target: { x: 430, y: 175 } },
];

function CardInner({ p }: { p: Point }) {
  const right = p.align === "right";
  return (
    <div className={`group flex w-full items-start gap-4 rounded-2xl border border-cream/10 bg-leaf-2/90 p-4 shadow-2xl backdrop-blur-sm transition-colors hover:border-caramel/40 lg:w-64 ${right ? "flex-row-reverse text-right" : "text-left"}`}>
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/20 text-caramel-light transition-colors group-hover:bg-caramel/30">{p.icon}</div>
      <div>
        <p className="text-base font-bold text-cream">{p.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-cream/60">{p.desc}</p>
      </div>
    </div>
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

      {/* DESKTOP — cup rises, cards pop out from the centre and stay */}
      <div className="relative z-10 mx-auto mt-6 hidden w-full max-w-6xl px-8 lg:block">
        <div className="relative h-[38rem]">
          {/* centre cup rising from the bottom */}
          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 z-10 w-[26rem] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/20 blur-[100px]" />
            <img src="/img/beans-pile.png" alt="" aria-hidden className="pointer-events-none absolute -bottom-6 left-1/2 w-[90%] -translate-x-1/2 opacity-90" />
            <motion.img
              style={{ y: cupY }}
              src={nectaCup}
              alt="A Necta Coffee cup"
              className="relative z-10 mx-auto w-full drop-shadow-[0_50px_80px_rgba(0,0,0,0.65)]"
            />
          </motion.div>

          {/* cards: clustered at the centre, then pop out — and stay */}
          {POINTS.map((p, i) => (
            <div key={p.title} className="absolute left-1/2 top-1/2 z-30 w-64 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, x: p.target.x, y: p.target.y, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.12 }}
              >
                <CardInner p={p} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE/TABLET — clean stacked layout */}
      <div className="relative z-10 mx-auto mt-8 w-full max-w-md px-5 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mb-8 w-4/5 max-w-[21rem]"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/20 blur-[70px]" />
          <img src="/img/beans-pile.png" alt="" aria-hidden className="pointer-events-none absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 opacity-90" />
          <img src={nectaCup} alt="A Necta Coffee cup" className="relative z-10 mx-auto w-full drop-shadow-[0_40px_70px_rgba(0,0,0,0.6)]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.85, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 320, damping: 18, mass: 0.6, delay: i * 0.07 }}
            >
              <CardInner p={{ ...p, align: "left" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
