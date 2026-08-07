import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, HelpCircle, ArrowRight } from "lucide-react";
import bagEditorial from "../assets/bag-editorial.webp";

export interface QA { q: string; a: string; }

export default function Faq({
  items,
  eyebrow = "good to know",
  title = "Frequently Asked",
  highlight = "Questions",
  image = bagEditorial,
}: {
  items: QA[];
  eyebrow?: string;
  title?: string;
  highlight?: string;
  image?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-cream-2 py-20 sm:py-28">
      <div className="grain absolute inset-0" />
      <span className="pointer-events-none absolute -right-6 top-8 select-none font-hand text-[14vw] leading-none text-espresso/[0.04]">
        faq
      </span>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* LEFT — image panel */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-30px_rgba(36,19,8,0.6)]">
            <img
              src={image}
              alt="Necta Coffee"
              className="h-72 w-full object-cover sm:h-80 lg:h-[30rem]"
            />
            {/* dark gradient + content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/10" />
            <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-3.5 py-1.5 text-xs font-medium text-cream/90 backdrop-blur">
                <HelpCircle className="h-4 w-4 text-caramel-light" />
                {eyebrow}
              </div>
              <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.05] text-cream">
                {title} <span className="text-caramel-light">{highlight}</span>
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70 sm:text-base">
                Can&apos;t find what you&apos;re looking for? Our team is always
                happy to help.
              </p>
              <Link
                to="/contact"
                className="group mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-caramel px-6 py-3 text-sm font-semibold text-espresso transition-all duration-300 hover:scale-[1.03]"
              >
                Still have questions?
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT — accordion */}
        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={it.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? "border-caramel/40 bg-white shadow-[0_14px_34px_-22px_rgba(36,19,8,0.5)]" : "border-espresso/10 bg-white/60 hover:border-espresso/20"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${isOpen ? "text-caramel" : "text-espresso/30"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold text-espresso sm:text-lg">{it.q}</span>
                  </span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-caramel text-cream" : "bg-espresso/5 text-espresso"}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-5 pb-5 pl-[3.25rem] text-sm leading-relaxed text-espresso/65 sm:px-6 sm:pb-6 sm:pl-[3.75rem] sm:text-base">
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
