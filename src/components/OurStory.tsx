import { motion } from "framer-motion";
import a54208 from "../assets/A54208.jpeg";

const STATS: [string, string][] = [
  ["1,400m+", "Avg Altitude"],
  ["100%", "Single Origin"],
  ["48hr", "Farm to Roast"],
];

export default function OurStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-espresso py-20 text-cream sm:py-28">
      <span className="pointer-events-none absolute -right-10 top-6 select-none font-hand text-[12vw] leading-none text-cream/[0.04]">
        since 2020
      </span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-25px_rgba(0,0,0,0.8)]">
            <img src={a54208} alt="Necta Coffee pouches" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute bottom-5 left-5 rounded-2xl bg-caramel/90 px-4 py-3 backdrop-blur-sm">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cream/80">Origin</p>
            <p className="text-sm font-bold text-white">Jhamsikhel, Lalitpur</p>
          </div>
        </motion.div>

        {/* text */}
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-hand text-2xl text-caramel-light sm:text-3xl">
            our story
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-2 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-tight">
            Coffee Crafted <br className="hidden sm:block" />
            <span className="text-caramel-light">With Purpose.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 max-w-md text-base leading-relaxed text-cream/65">
            At Necta Coffee, extraordinary coffee begins long before roasting. Every bean is carefully sourced, evaluated, and packed to preserve its unique character.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-4 max-w-md text-base leading-relaxed text-cream/65">
            From dedicated farmers to skilled roasters — every step reflects our commitment to quality.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10 grid grid-cols-3 border-t border-cream/10 pt-7">
            {STATS.map(([n, l], i) => (
              <div
                key={l}
                className={
                  i === 0
                    ? "border-r border-cream/10 pr-4"
                    : i === STATS.length - 1
                      ? "pl-4"
                      : "border-r border-cream/10 px-4"
                }
              >
                <div className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold leading-none text-caramel-light">{n}</div>
                <div className="mt-2 text-[0.65rem] uppercase tracking-[0.12em] text-cream/45">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
