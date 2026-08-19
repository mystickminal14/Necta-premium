import { motion } from "framer-motion";
import teamPhoto from "../assets/necta-barista.webp";

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
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-25px_rgba(0,0,0,0.8)]">
            <img
              src={teamPhoto}
              alt="A Necta Coffee barista pulling espresso behind the counter"
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </motion.div>

        {/* text */}
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-hand text-2xl text-caramel-light sm:text-3xl">
            our team
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-2 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-tight">
            Coffee Crafted <br className="hidden sm:block" />
            <span className="text-caramel-light">With Purpose.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 max-w-md text-base leading-relaxed text-cream/65">
            Necta runs on a small team out of Jhamsikhel, Lalitpur. No middlemen, no borrowed labels — we buy the cherries, cup the lots, roast the batches and seal the bags ourselves.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-4 max-w-md text-base leading-relaxed text-cream/65">
            Every season we go up to the farms ourselves, taste what the harvest gave us, and pay for the lots we would want to drink. What does not make the cupping table does not make the bag.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.28 }} className="mt-4 max-w-md text-base leading-relaxed text-cream/65">
            Roasting happens in small batches, close to the day it ships. The
            same hands are behind your coffee from the first cherry to the last
            scoop, so what reaches your counter still tastes like the hill it
            came from.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
