import { motion } from "framer-motion";
import ScatterBeans from "./ScatterBeans";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[radial-gradient(120%_120%_at_82%_-5%,#f9f3e7_0%,#f4ecdd_42%,#ecdfc8_100%)] px-5 pb-12 pt-32 sm:px-8 sm:pt-36 lg:pt-28"
    >
      <ScatterBeans count={10} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* LEFT — copy */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-hand text-2xl text-caramel sm:text-3xl"
          >
            Nepal&apos;s finest, in every cup
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-espresso"
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
            Handpicked from Nepal&apos;s finest farms. Small-batch roasted and
            delivered fresh — for people who truly love coffee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <a href="#grades" className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_12px_30px_-10px_rgba(36,19,8,0.6)] transition-all duration-300 hover:scale-[1.03] hover:bg-espresso-2 sm:text-base">
              Shop Our Beans
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="#about" className="inline-flex items-center rounded-full border border-espresso/25 px-7 py-3.5 text-sm font-semibold text-espresso transition-all duration-300 hover:border-espresso hover:bg-espresso/5 sm:text-base">
              Our Story
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex items-center gap-3 text-espresso/45"
          >
            <span className="h-px w-8 bg-espresso/25" />
            <span className="text-xs uppercase tracking-[0.22em]">Grown in Nepal · Est. 2020</span>
          </motion.div>
        </div>

        {/* RIGHT — product pouches (bhg removed) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* soft halo */}
          <div className="absolute left-1/2 top-1/2 -z-0 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/20 blur-3xl" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -z-0 hidden -translate-x-1/2 -translate-y-1/2 select-none text-[18vw] font-bold leading-none tracking-tighter text-espresso/[0.05] lg:block">
            NECTA
          </span>
          <motion.img
            src="/img/pouches-cutout.png"
            alt="Necta Coffee pouches"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-[1] mx-auto w-[92%] max-w-md drop-shadow-[0_40px_70px_rgba(36,19,8,0.4)] sm:max-w-lg lg:w-[128%] lg:max-w-none lg:translate-x-[6%]"
          />

          {/* floating chip */}
          <div className="absolute right-2 top-6 z-[2] rounded-2xl border border-espresso/10 bg-cream/70 px-4 py-3 shadow-lg backdrop-blur-md sm:right-6">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-caramel">Available Now</p>
            <p className="text-sm font-bold text-espresso">Simcoe · Silver Bean</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
