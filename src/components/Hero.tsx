import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import ScatterBeans from "./ScatterBeans";

const STATS: [string, string][] = [
  ["10+", "Nepali Farms"],
  ["100%", "Single Origin"],
  ["48hr", "Farm to Roast"],
];

// photographic bean cutouts that "touch up" the hero
const BEANS = [
  { top: "12%", left: "6%", w: 54, rot: -18, dur: 8 },
  { top: "70%", left: "4%", w: 40, rot: 40, dur: 9 },
  { top: "82%", left: "42%", w: 34, rot: 120, dur: 7.5 },
  { top: "8%", left: "52%", w: 30, rot: 200, dur: 10 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[radial-gradient(120%_120%_at_82%_-5%,#f9f3e7_0%,#f4ecdd_42%,#ecdfc8_100%)] px-5 pb-12 pt-32 sm:px-8 sm:pt-36 lg:pt-28"
    >
      <ScatterBeans count={10} />

      {/* photographic beans touch-up */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BEANS.map((b, i) => (
          <motion.img
            key={i}
            src="/img/bean.png"
            alt=""
            animate={{ y: [0, -14, 0], rotate: [b.rot, b.rot + 8, b.rot] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: b.top, left: b.left, width: b.w }}
            className="absolute opacity-80 drop-shadow-[0_10px_20px_rgba(36,19,8,0.25)]"
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.25fr]">
        {/* LEFT — copy */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-cream/60 px-3.5 py-1.5 text-xs font-medium text-espresso/70 backdrop-blur"
          >
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-caramel text-caramel" />
              ))}
            </span>
            Loved by coffee lovers across Nepal
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-hand text-2xl text-caramel sm:text-3xl"
          >
            Nepal&apos;s finest, in every cup
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-espresso"
          >
            Quality You
            <br />
            Can{" "}
            <span className="relative inline-block text-caramel">
              Trust
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 8C40 3 120 2 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-md text-base leading-relaxed text-espresso/70 sm:text-lg"
          >
            Handpicked from Nepal&apos;s finest farms and small-batch roasted in
            our own roastery. From the volcanic highlands of Melamchi to the cup
            in your hands — fresh, traceable, and crafted with care for people
            who truly love coffee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link to="/product" className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_12px_30px_-10px_rgba(36,19,8,0.6)] transition-all duration-300 hover:scale-[1.03] hover:bg-espresso-2 sm:text-base">
              Shop Our Beans
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/contact" className="inline-flex items-center rounded-full border border-espresso/25 px-7 py-3.5 text-sm font-semibold text-espresso transition-all duration-300 hover:border-espresso hover:bg-espresso/5 sm:text-base">
              Talk to us
            </Link>
          </motion.div>

          {/* mini stats — more text on the left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 hidden max-w-md grid-cols-3 gap-4 border-t border-espresso/10 pt-6 sm:grid"
          >
            {STATS.map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold leading-none text-espresso sm:text-3xl">{n}</div>
                <div className="mt-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-espresso/50">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — product pouches (bigger, no NECTA text) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* soft halo */}
          <div className="absolute left-1/2 top-1/2 -z-0 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/25 blur-3xl" />
          <motion.img
            src="/img/pouches-cutout.png"
            alt="Necta Coffee pouches"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-[1] mx-auto w-[122%] max-w-none drop-shadow-[0_50px_80px_rgba(36,19,8,0.45)] sm:w-full sm:max-w-xl lg:w-[135%] lg:max-w-none lg:translate-x-[4%]"
          />

          {/* floating chips */}
          <div className="absolute right-2 top-6 z-[2] hidden rounded-2xl border border-espresso/10 bg-cream/70 px-4 py-3 shadow-lg backdrop-blur-md sm:right-6 sm:block">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-caramel">Available Now</p>
            <p className="text-sm font-bold text-espresso">Simcoe · Silver Bean</p>
          </div>
          <div className="absolute bottom-8 left-0 z-[2] hidden rounded-2xl border border-espresso/10 bg-cream/70 px-4 py-3 shadow-lg backdrop-blur-md sm:block">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-caramel">Roasted Weekly</p>
            <p className="text-sm font-bold text-espresso">Always Fresh</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
