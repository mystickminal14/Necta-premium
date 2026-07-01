import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, ArrowUpRight, Send } from "lucide-react";

function Instagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const EXPLORE: [string, string][] = [
  ["Home", "/"],
  ["Product", "/product"],
  ["Contact", "/contact"],
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-espresso-2 text-cream/70">
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.06]" style={{ backgroundImage: "url('/img/beans-texture.jpg')" }} />

      {/* TOP — newsletter / CTA */}
      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-10 border-b border-cream/10 pb-12 lg:grid-cols-2 lg:items-end"
        >
          <div>
            <p className="font-hand text-3xl text-caramel-light sm:text-4xl">stay fresh</p>
            <h2 className="mt-2 max-w-md text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.05] text-cream">
              Get fresh roasts &amp; offers in your inbox.
            </h2>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
            className="w-full"
          >
            <div className="flex w-full items-center gap-2 rounded-full border border-cream/20 bg-cream/5 p-1.5 backdrop-blur-sm focus-within:border-caramel/60">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-transparent px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-caramel px-5 py-2.5 text-sm font-semibold text-espresso transition-transform duration-300 hover:scale-[1.03]">
                <Send className="h-4 w-4" />
                Subscribe
              </button>
            </div>
            {sent && <p className="mt-2 pl-4 text-xs text-caramel-light">Thanks — you&apos;re on the list! ☕</p>}
          </form>
        </motion.div>

        {/* MIDDLE — columns */}
        <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="flex items-baseline gap-1.5 leading-none">
              <span className="font-hand text-3xl text-caramel-light">Necta</span>
              <span className="text-lg font-bold uppercase tracking-[0.22em] text-cream">Coffee</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-cream/50">
              Handpicked from Nepal&apos;s finest farms. Small-batch roasted, delivered fresh.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-caramel hover:text-espresso">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="mailto:nectacoffeept@gmail.com" className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-caramel hover:text-espresso">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-caramel-light">Explore</p>
            <ul className="space-y-2 text-sm">
              {EXPLORE.map(([l, h]) => (
                <li key={h}>
                  <Link to={h} className="inline-flex items-center gap-1 transition-colors hover:text-cream">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-caramel-light">Shop</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/product" className="transition-colors hover:text-cream">Coffee Bags</Link></li>
              <li><Link to="/product" className="transition-colors hover:text-cream">Espresso Machines</Link></li>
              <li><Link to="/product" className="transition-colors hover:text-cream">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-caramel-light">Reach us</p>
            <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-caramel-light" /> Melamchi, Nepal</p>
            <p className="mt-2 flex items-center gap-2 text-sm"><MessageCircle className="h-4 w-4 text-caramel-light" /> DM for free sample</p>
            <a href="mailto:nectacoffeept@gmail.com" className="mt-2 flex items-center gap-2 text-sm transition-colors hover:text-cream">
              <Mail className="h-4 w-4 text-caramel-light" /> nectacoffeept@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* OVERSIZED WORDMARK */}
      <div className="relative select-none px-5 sm:px-8">
        <p className="bg-gradient-to-b from-cream/[0.10] to-cream/[0.02] bg-clip-text text-center text-[clamp(3.5rem,18vw,16rem)] font-bold leading-[0.8] tracking-tighter text-transparent">
          NECTA COFFEE
        </p>
      </div>

      {/* BOTTOM bar */}
      <div className="relative border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream/40 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Necta Coffee · Grown in Nepal · Est. 2020</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-cream">
            Follow our journey <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
