import { motion } from "framer-motion";
import bag from "../assets/necta-barista.webp";
import beansTexture from "../assets/beans-texture.webp";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[radial-gradient(130%_120%_at_78%_-10%,#3a2416_0%,#2a1810_45%,#1a0d06_100%)] py-20 text-cream sm:py-28"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-luminosity"
        style={{ backgroundImage: `url(${beansTexture})` }}
      />
      <div className="grain absolute inset-0" />

      {/* the image column takes the larger share so the photo can run landscape
          and keep the full counter scene in frame */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
        {/* IMAGE collage */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[17.5rem] min-[380px]:max-w-sm sm:max-w-md lg:max-w-none"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
            <img
              src={bag}
              alt="Necta Coffee — a barista pulling a shot beside a bag of Necta beans"
              /* the source is 1.77:1. The 3:2 frame is what keeps this column
                 the same height as the copy beside it, so the framing is done
                 inside it rather than by reshaping it: object-right drops the
                 slack off the left (dried flowers), and the scale — pinned to
                 the left edge so that stays put — pushes the bright window off
                 the right. What's left runs packet → barista → machine →
                 grinder, at the cost of ~7% off the top and bottom. */
              className="aspect-3/2 w-full origin-left scale-[1.17] object-cover object-right"
            />
          </div>


          {/* floating stat badge */}
          <div className="absolute -left-2 top-6 rounded-xl bg-caramel/95 px-3 py-2 shadow-xl backdrop-blur-sm sm:-left-4 sm:top-8 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cream/80">Since</p>
            <p className="text-xl font-bold text-white">2020</p>
          </div>
        </motion.div>

        {/* COPY */}
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-hand text-2xl text-caramel-light sm:text-3xl">
            built for your counter
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-2 text-[clamp(1.9rem,4.8vw,3.5rem)] font-bold leading-[1.04] tracking-tight text-cream">
            Right choice, for{" "}
            <br className="hidden sm:block" />
            your <span className="text-caramel-light">coffee</span> shop.
          </motion.h2>

          {/* two paragraphs, stacked and set at the same size — the old
              split into a smaller two-column pair read as a footnote */}
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 text-[1rem] leading-relaxed text-cream/70 sm:text-[1.05rem]">
            At Necta Coffee, we help every cafe serve exceptional coffee with confidence. Every bean is sourced from experienced Nepali farmers, carefully processed, and precision roasted to a consistent cup profile that meets professional cafe standards.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-4 text-[1rem] leading-relaxed text-cream/70 sm:text-[1.05rem]">
            Our work goes far beyond roasting. We back your team with dependable supply, transparent sourcing, and roast profiles tuned to the way you brew — the foundation for a coffee experience that keeps your regulars coming back.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
