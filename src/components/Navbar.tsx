import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Beans", href: "#grades" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:pt-5">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "flex w-full max-w-4xl items-center justify-between gap-3 px-3 py-2 sm:px-4 sm:py-2.5",
          "rounded-[2.5rem] border transition-all duration-500",
          scrolled
            ? "border-espresso/10 bg-cream/80 shadow-[0_10px_40px_-12px_rgba(36,19,8,0.35)] backdrop-blur-xl"
            : "border-espresso/5 bg-cream/40 backdrop-blur-md",
        ].join(" ")}
      >
        {/* logo */}
        <a href="#home" className="flex shrink-0 items-center pl-1">
          <img
            src="/img/logo-necta.png"
            alt="Necta Coffee"
            className="h-6 w-auto sm:h-7"
          />
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-3.5 py-2 text-sm font-medium text-espresso/80 transition-colors hover:text-espresso"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* desktop CTA */}
        <a
          href="#beans"
          className="hidden shrink-0 rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.04] hover:bg-espresso-2 md:inline-flex"
        >
          Shop
        </a>

        {/* mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-espresso/5 text-espresso md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-4 bg-espresso transition-transform duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-espresso transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-espresso transition-transform duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </motion.nav>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-[4.5rem] z-50 w-[min(92vw,22rem)] rounded-3xl border border-espresso/10 bg-cream/95 p-2 shadow-xl backdrop-blur-xl md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-espresso/85 transition-colors hover:bg-espresso/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#beans"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-2xl bg-espresso px-4 py-3 text-center text-base font-semibold text-cream"
            >
              Shop Our Beans
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
