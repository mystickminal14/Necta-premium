import { motion } from "framer-motion";
import beansTexture from "../assets/beans-texture.webp";

export default function VideoSection() {
  return (
    <section className="relative overflow-hidden bg-leaf py-20 text-cream sm:py-28">
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] mix-blend-luminosity" style={{ backgroundImage: `url(${beansTexture})` }} />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-hand text-2xl text-caramel-light sm:text-3xl">straight from the roastery</p>
          <h2 className="mt-1 text-[clamp(2rem,5vw,3.4rem)] font-semibold">
            Watch The <span className="text-caramel-light">Craft</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { src: "/video/roasting.mp4", label: "Roasting", caption: "Small-batch, cupped for perfection" },
            { src: "/video/beans-showcase.mp4", label: "The Beans", caption: "Premium lots, ready to brew" },
          ].map((v, i) => (
            <motion.div
              key={v.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-cream/10 shadow-2xl"
            >
              <video
                src={v.src}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-5/4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-caramel-light">{v.label}</p>
                <p className="text-base font-semibold">{v.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
