import { motion } from "framer-motion";
import { Sprout, Mountain, Droplets, Flame, ScanLine, PackageCheck } from "lucide-react";
import type { ReactNode } from "react";
import ScatterBeans from "./ScatterBeans";
import bean from "../assets/necta-cofe-nags.png";
interface Feat {
  icon: ReactNode;
  top: string;
  title: string;
  align: "left" | "right";
  target: { x: number; y: number };
}

const FEATURES: Feat[] = [
  { icon: <Sprout className="h-5 w-5" />, top: "Handpicked", title: "Single-Origin Nepali Beans", align: "left", target: { x: -400, y: -170 } },
  { icon: <Droplets className="h-5 w-5" />, top: "Fully Washed", title: "Clean, Bright & Balanced", align: "left", target: { x: -450, y: 10 } },
  { icon: <Flame className="h-5 w-5" />, top: "Small-Batch", title: "Roasted Fresh Weekly", align: "left", target: { x: -400, y: 190 } },
  { icon: <PackageCheck className="h-5 w-5" />, top: "Aroma-Locked", title: "Nitrogen-Sealed Fresh", align: "right", target: { x: 400, y: -170 } },
  { icon: <Mountain className="h-5 w-5" />, top: "High Altitude", title: "Grown Above 1,200m", align: "right", target: { x: 450, y: 10 } },
  { icon: <ScanLine className="h-5 w-5" />, top: "Graded & Sorted", title: "Premium Screen Size", align: "right", target: { x: 400, y: 190 } },
];

const BG_BEANS = [
  { top: "16%", left: "12%", w: 56, rot: -22, dur: 8 },
  { top: "68%", left: "8%", w: 40, rot: 60, dur: 9.5 },
  { top: "22%", left: "84%", w: 48, rot: 130, dur: 8.5 },
  { top: "76%", left: "88%", w: 36, rot: -40, dur: 10 },
];

function CardInner({ f }: { f: Feat }) {
  const right = f.align === "right";
  return (
    <div className={`flex items-center gap-3 rounded-2xl border border-cream/15 bg-leaf-2/90 p-4 shadow-2xl backdrop-blur-sm ${right ? "flex-row-reverse text-right" : "text-left"}`}>
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/20 text-caramel-light">{f.icon}</div>
      <div>
        <p className="text-[0.65rem] uppercase tracking-wider text-caramel-light">{f.top}</p>
        <p className="text-sm font-semibold leading-tight text-cream">{f.title}</p>
      </div>
    </div>
  );
}

const Heading = () => (
  <div className="mx-auto max-w-2xl text-center">
    <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-hand text-2xl text-caramel-light sm:text-3xl">
      why choose us
    </motion.p>
    <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mt-1 text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold text-cream">
      Every Bean, Carefully <span className="text-caramel-light">Chosen</span>
    </motion.h2>
  </div>
);

const Beans = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    {BG_BEANS.map((b, i) => (
      <motion.img
        key={i}
        src="/img/bean.png"
        alt=""
        animate={{ y: [0, -16, 0], rotate: [b.rot, b.rot + 8, b.rot] }}
        transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: b.top, left: b.left, width: b.w }}
        className="absolute opacity-60 drop-shadow-[0_12px_22px_rgba(0,0,0,0.4)]"
      />
    ))}
  </div>
);

const GREEN = "bg-[radial-gradient(120%_100%_at_50%_0%,#34543f_0%,#24412f_45%,#1c352a_100%)]";

/* ---------- desktop: bag rises, cards spread out once on view, then stay ---------- */
function DesktopStage() {
  return (
    <section id="why" className={`relative hidden overflow-hidden py-24 text-cream lg:block ${GREEN}`}>
      <div className="grain absolute inset-0" />
      <ScatterBeans count={14} />
      <Beans />

      <div className="relative mx-auto max-w-7xl px-8">
        <Heading />

        <div className="relative mt-6 h-[42rem]">
          {/* centre bag rising from the bottom */}
          <motion.div
            initial={{ opacity: 0, y: 220 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 z-10 w-64 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/25 blur-[90px]" />
            <img src={bean} alt="Necta Coffee — Silver Bean single origin" className="relative z-10 mx-auto w-full drop-shadow-[0_50px_80px_rgba(0,0,0,0.65)]" />
          </motion.div>

          {/* cards: clustered at the centre, then spread out slowly — and stay */}
          {FEATURES.map((f, i) => (
            <div key={f.top} className="absolute left-1/2 top-1/2 z-30 w-64 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, x: f.target.x, y: f.target.y, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.12 }}
              >
                <CardInner f={f} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- mobile: clean stacked layout ---------- */
function MobileStage() {
  return (
    <section className={`relative overflow-hidden py-16 text-cream lg:hidden ${GREEN}`}>
      <div className="grain absolute inset-0" />
      <ScatterBeans count={10} />
      <Beans />

      <div className="relative mx-auto max-w-md px-5">
        <Heading />

        {/* bag rising from the bottom on view */}
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto my-10 w-full max-w-[16rem]"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/20 blur-[70px]" />
          <img src={bean} alt="Necta Coffee — Silver Bean single origin" className="relative z-10 mx-auto w-full drop-shadow-[0_40px_70px_rgba(0,0,0,0.6)]" />
        </motion.div>

        <div className="flex flex-col gap-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.top}
              initial={{ opacity: 0, scale: 0.85, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 320, damping: 18, mass: 0.6, delay: i * 0.05 }}
            >
              <CardInner f={{ ...f, align: "left" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BeansChosen() {
  return (
    <>
      <DesktopStage />
      <MobileStage />
    </>
  );
}
