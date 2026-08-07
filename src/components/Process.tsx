import { motion } from "framer-motion";
import { Sprout, Settings, Flame, Package, Truck } from "lucide-react";
import type { ReactNode } from "react";
import bean from "../assets/bean.png";

/* small beans drifting down either margin — decorative only, and kept
   clear of the content column so they never sit under the copy */
const SIDE_BEANS = [
  { top: "8%", left: "3%", w: 34, rot: -20, dur: 9 },
  { top: "34%", left: "6%", w: 24, rot: 55, dur: 11 },
  { top: "62%", left: "2%", w: 30, rot: 130, dur: 10 },
  { top: "86%", left: "7%", w: 20, rot: -60, dur: 12 },
  { top: "12%", right: "4%", w: 28, rot: 35, dur: 10.5 },
  { top: "40%", right: "2%", w: 34, rot: -15, dur: 9.5 },
  { top: "68%", right: "6%", w: 22, rot: 100, dur: 11.5 },
  { top: "90%", right: "3%", w: 30, rot: -45, dur: 8.5 },
];

function SideBeans() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      {SIDE_BEANS.map((b, i) => (
        <motion.img
          key={i}
          src={bean}
          alt=""
          animate={{ y: [0, -14, 0], rotate: [b.rot, b.rot + 10, b.rot] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: b.top, left: b.left, right: b.right, width: b.w }}
          className="absolute opacity-40 drop-shadow-[0_10px_18px_rgba(36,19,8,0.35)]"
        />
      ))}
    </div>
  );
}

const STEPS: { icon: ReactNode; step: string; title: string; desc: string }[] = [
  { icon: <Sprout className="h-5 w-5 sm:h-6 sm:w-6" />, step: "01", title: "Handpicked", desc: "Ripest cherries selected by hand at altitude." },
  { icon: <Settings className="h-5 w-5 sm:h-6 sm:w-6" />, step: "02", title: "Processed", desc: "Washed & natural processing preserves origin character." },
  { icon: <Flame className="h-5 w-5 sm:h-6 sm:w-6" />, step: "03", title: "Roasted", desc: "Small-batch. Every profile cupped for perfection." },
  { icon: <Package className="h-5 w-5 sm:h-6 sm:w-6" />, step: "04", title: "Freshly Packed", desc: "Nitrogen-sealed immediately after roasting." },
  { icon: <Truck className="h-5 w-5 sm:h-6 sm:w-6" />, step: "05", title: "Delivered", desc: "From our roastery to your door — freshness intact." },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* One left-to-right sweep: the connector draws, a bean rides along it, and each
   step lands in turn. `rest`/`show` are driven by the step wrapper, so the four
   pieces of a step always animate together — the delays below are absolute. */
const STEP_DELAY = 0.13;

const rise = {
  rest: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-cream-2 py-16 sm:py-20 md:py-28">
      <div className="grain absolute inset-0" />
      <SideBeans />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-hand text-2xl text-caramel sm:text-3xl">
            how we do it
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: EASE }} className="mt-2 text-[clamp(1.6rem,5.6vw,3.4rem)] font-semibold leading-tight text-espresso">
            From Farm To Cup. <br />
            <span className="text-caramel">Every Step.</span>
          </motion.h2>
        </div>

        <div className="relative mt-12 sm:mt-14">
          {/* connector line — draws itself once, then a glow sweeps it forever */}
          <div aria-hidden className="absolute left-[10%] right-[10%] top-9 hidden md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: EASE }}
              style={{ transformOrigin: "left center" }}
              className="relative h-px w-full bg-espresso/15"
            >
              {/* clip window is taller than the line so the bloom isn't sliced,
                  but still stops the glow overshooting either end */}
              <span className="absolute inset-x-0 -inset-y-2 overflow-hidden">
                <motion.span
                  animate={{ left: ["-22%", "100%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
                  className="absolute top-1/2 h-px w-[22%] -translate-y-1/2"
                >
                  {/* the hairline itself brightens… */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-caramel to-transparent" />
                  {/* …with a soft bloom bleeding above and below it */}
                  <span className="absolute inset-x-0 -inset-y-[3px] bg-gradient-to-r from-transparent via-caramel/55 to-transparent blur-[6px]" />
                </motion.span>
              </span>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-9 min-[380px]:gap-x-4 sm:gap-y-10 md:grid-cols-5 md:gap-x-6">
            {STEPS.map((s, i) => {
              const at = i * STEP_DELAY;
              return (
                <motion.div
                  key={s.step}
                  initial="rest"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="group relative z-10 text-center"
                >
                  <motion.div
                    variants={{ rest: { scale: 0.6, opacity: 0, y: 14 }, show: { scale: 1, opacity: 1, y: 0 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, mass: 0.7, delay: at }}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-espresso/15 bg-cream text-espresso transition-all duration-300 group-hover:-translate-y-1 group-hover:border-caramel group-hover:bg-caramel group-hover:text-cream group-hover:shadow-[0_14px_28px_-12px_rgba(176,122,60,0.75)] sm:h-[72px] sm:w-[72px]"
                  >
                    {s.icon}
                  </motion.div>

                  <motion.p
                    variants={rise}
                    transition={{ duration: 0.45, delay: at + 0.14, ease: EASE }}
                    className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-caramel sm:mt-4 sm:text-[0.65rem]"
                  >
                    {s.step}
                  </motion.p>
                  <motion.h3
                    variants={rise}
                    transition={{ duration: 0.45, delay: at + 0.2, ease: EASE }}
                    className="mt-1 text-sm font-bold text-espresso sm:text-base"
                  >
                    {s.title}
                  </motion.h3>
                  <motion.p
                    variants={rise}
                    transition={{ duration: 0.45, delay: at + 0.26, ease: EASE }}
                    className="mx-auto mt-1 max-w-[12rem] text-[0.78rem] leading-relaxed text-espresso/55 sm:text-sm"
                  >
                    {s.desc}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
