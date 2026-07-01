import { motion } from "framer-motion";
import { Leaf, Coffee, HeartHandshake } from "lucide-react";

const VALUES = [
  { icon: <Leaf className="h-4 w-4" />, label: "Ethically Sourced" },
  { icon: <Coffee className="h-4 w-4" />, label: "Roasted With Care" },
  { icon: <HeartHandshake className="h-4 w-4" />, label: "People First" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[radial-gradient(130%_120%_at_78%_-10%,#3a2416_0%,#2a1810_45%,#1a0d06_100%)] py-20 text-cream sm:py-28"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-luminosity"
        style={{ backgroundImage: "url('/img/beans-texture.jpg')" }}
      />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* IMAGE collage */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
            <img
              src="/img/bag-editorial.jpg"
              alt="Necta Coffee — editorial"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          {/* overlapping secondary image */}
          <div className="absolute -bottom-8 -right-5 w-40 overflow-hidden rounded-2xl border-4 border-espresso shadow-2xl sm:w-48">
            <img
              src="/img/green-beans.png"
              alt="Fresh coffee beans"
              className="aspect-square w-full object-cover"
            />
          </div>

          {/* floating stat badge */}
          <div className="absolute -left-4 top-8 rounded-2xl bg-caramel/95 px-4 py-3 shadow-xl backdrop-blur-sm">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cream/80">Since</p>
            <p className="text-xl font-bold text-white">2020</p>
          </div>
        </motion.div>

        {/* COPY */}
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-hand text-2xl text-caramel-light sm:text-3xl">
            about us
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-2 text-[clamp(2.2rem,4.6vw,3.8rem)] font-bold leading-[1.05] tracking-tight text-cream">
            A small roastery, <br className="hidden sm:block" />a <span className="text-caramel-light">big</span> love for coffee.
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">
            Necta Coffee works hand-in-hand with farmers across Nepal&apos;s
            highlands — selecting only the ripest cherries and roasting them in
            small batches, so every cup tastes the way it should.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.18 }} className="mt-3 max-w-md text-base leading-relaxed text-cream/50">
            No shortcuts, no mass roasting. Just honest coffee, delivered fresh.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.26 }} className="mt-8 flex flex-wrap gap-2.5">
            {VALUES.map((v) => (
              <span key={v.label} className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-sm font-medium text-cream/90 backdrop-blur-sm">
                <span className="text-caramel-light">{v.icon}</span>
                {v.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
