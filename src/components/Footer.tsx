import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin } from "lucide-react";

function Instagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <>
      {/* ===== FINAL CTA ===== */}
      <section id="contact" className="relative overflow-hidden bg-espresso py-24 text-cream">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.10]" style={{ backgroundImage: "url('/img/beans-texture.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 to-espresso" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl px-5 text-center"
        >
          <p className="font-hand text-3xl text-caramel-light sm:text-4xl">taste you want</p>
          <h2 className="mt-2 text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[0.95]">
            Let&apos;s Get You <br />
            <span className="text-caramel-light">Brewing.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-cream/65">
            Not sure which grade suits you? DM us for a free sample — we&apos;ll help you find your perfect cup. Delivery all over Nepal.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-caramel px-7 py-3.5 font-semibold text-espresso transition-transform duration-300 hover:scale-[1.04]">
              <MessageCircle className="h-4 w-4" /> DM us for a sample
            </a>
            <a href="mailto:nectacoffeept@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/5">
              <Mail className="h-4 w-4" /> Email us
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-espresso-2 px-5 py-12 text-cream/70 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <img src="/img/logo-necta.png" alt="Necta Coffee" className="mx-auto h-7 brightness-0 invert md:mx-0" />
            <p className="mt-4 max-w-xs text-sm text-cream/50">
              Handpicked from Nepal&apos;s finest farms. Small-batch roasted, delivered fresh.
            </p>
            <div className="mt-5 flex justify-center gap-3 md:justify-start">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-caramel hover:text-espresso">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="mailto:nectacoffeept@gmail.com" className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-caramel hover:text-espresso">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-caramel-light">Explore</p>
              <ul className="space-y-2">
                {[["Our Beans", "#beans"], ["Our Story", "#story"], ["Process", "#process"], ["Grades", "#grades"]].map(([l, h]) => (
                  <li key={h}><a href={h} className="transition-colors hover:text-cream">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-caramel-light">Reach us</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-caramel-light" /> Melamchi, Nepal</p>
              <p className="mt-2 flex items-center gap-2"><MessageCircle className="h-4 w-4 text-caramel-light" /> DM for free sample</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          © {new Date().getFullYear()} Necta Coffee · Grown in Nepal · Est. 2020
        </div>
      </footer>
    </>
  );
}
