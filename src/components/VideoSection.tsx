import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import beansTexture from "../assets/beans-texture.webp";

const VIDEOS = [
  { src: "/video/roasting.mp4", label: "Roasting", caption: "Small-batch, cupped for perfection" },
  { src: "/video/beans-showcase.mp4", label: "The Beans", caption: "Premium lots, ready to brew" },
];

export default function VideoSection() {
  const [active, setActive] = useState<(typeof VIDEOS)[number] | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

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
          {VIDEOS.map((v, i) => (
            <motion.button
              key={v.src}
              type="button"
              onClick={() => setActive(v)}
              aria-label={`Play ${v.label} video`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative block cursor-pointer overflow-hidden rounded-[1.75rem] border border-cream/10 text-left shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel-light"
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

              <div className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-cream/15 backdrop-blur-sm ring-1 ring-cream/40 transition duration-300 group-hover:scale-110 group-hover:bg-cream/25">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6 text-cream">
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
                  </svg>
                </span>
              </div>

              <div className="absolute bottom-4 left-5">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-caramel-light">{v.label}</p>
                <p className="text-base font-semibold">{v.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActive(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`${active.label} video`}
              className="fixed inset-0 z-100 grid place-items-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-cream/10 bg-black shadow-2xl"
              >
                <video
                  src={active.src}
                  controls
                  autoPlay
                  playsInline
                  className="h-auto max-h-[80vh] w-full object-contain"
                />
              </motion.div>

              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close video"
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream/15 text-cream ring-1 ring-cream/30 backdrop-blur-sm transition hover:bg-cream/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel-light sm:right-8 sm:top-8"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
