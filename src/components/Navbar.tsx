import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import nectaLogo from "../assets/necta-logo-transparent.png";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Product", to: "/product" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:pt-5">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-2.5 sm:px-5 sm:py-3",
          "rounded-[2.5rem] border transition-all duration-500",
          scrolled
            ? "border-espresso/10 bg-cream/80 shadow-[0_10px_40px_-12px_rgba(36,19,8,0.35)] backdrop-blur-xl"
            : "border-espresso/5 bg-cream/40 backdrop-blur-md",
        ].join(" ")}
      >
        {/* logo — box height stays fixed so it doesn't push the pill taller;
            the image itself is larger and overflows the box visually */}
        <Link to="/" className="flex h-9 shrink-0 items-center pl-1 sm:h-10">
          <img src={nectaLogo} alt="Necta Coffee" className="h-14 w-auto sm:h-16" />
        </Link>

        {/* desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  [
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-espresso"
                      : "text-espresso/70 hover:text-espresso",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-espresso/8"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          {/* desktop CTA — enquiries only, there is no checkout */}
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.04] hover:bg-espresso-2 md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Inquire Now
          </Link>

          {/* mobile toggle */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full bg-espresso/5 text-espresso md:hidden"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-4 bg-espresso transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-4 bg-espresso transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-4 bg-espresso transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-[4.75rem] z-50 w-[min(92vw,22rem)] rounded-3xl border border-espresso/10 bg-cream/95 p-2 shadow-xl backdrop-blur-xl md:hidden"
          >
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  [
                    "block rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                    isActive ? "bg-espresso/5 text-espresso" : "text-espresso/85 hover:bg-espresso/5",
                  ].join(" ")
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-espresso px-4 py-3 text-center text-base font-semibold text-cream"
            >
              <MessageCircle className="h-4 w-4" /> Inquire Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
