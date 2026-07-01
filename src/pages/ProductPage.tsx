import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Process from "../components/Process";
import Faq from "../components/Faq";
import type { QA } from "../components/Faq";

interface Product {
  name: string;
  price: string;
  tag?: string;
  blurb: string;
  img?: string;   // image
  cover?: boolean; // true = full-bleed photo, false = padded cutout
}

const BEANS: Product[] = [
  { name: "Silver Bean — Single Origin", price: "Rs 850", tag: "Bestseller", blurb: "100% Arabica, fully washed, light roast. 250g.", img: "/img/newsinglebrew.png" },
  { name: "Simcoe Reserve", price: "Rs 1,200", tag: "Premium", blurb: "Top screen-size lot with a bright, floral cup. 250g.", img: "/img/pouch-front.png" },
  { name: "Dark Roast House", price: "Rs 950", blurb: "Bold, full-bodied and chocolatey. Great with milk. 250g.", img: "/img/pouch-dark.png" },
  { name: "Everyday Blend", price: "Rs 800", blurb: "Smooth, balanced and dependable — your daily cup. 250g.", img: "/img/pouches-cutout.png" },
];

const MACHINES: Product[] = [
  { name: "Necta Classic Espresso", price: "Rs 28,000", tag: "New", blurb: "Single-boiler 15-bar machine. Café-quality shots at home.", img: "/img/espresso-3.jpg", cover: true },
  { name: "Necta Pro Dual Boiler", price: "Rs 65,000", tag: "Pro", blurb: "Dual boiler, PID control and pre-infusion for the perfectionist.", img: "/img/espresso-2.jpg", cover: true },
];

const FAQS: QA[] = [
  { q: "How fresh is the coffee when it ships?", a: "Every order is roasted in small batches and shipped within 48 hours of roasting, so your beans arrive at peak freshness." },
  { q: "Do you deliver across Nepal?", a: "Yes — we deliver nationwide. Kathmandu Valley orders typically arrive in 1–2 days; outside the valley takes 3–5 days." },
  { q: "What grind options do you offer?", a: "We ship whole bean by default, but you can request espresso, moka, drip, or French-press grind in the order notes — free of charge." },
  { q: "Do the espresso machines come with a warranty?", a: "All Necta machines include a 1-year warranty covering manufacturing defects, plus local servicing support." },
  { q: "Can I order a sample before buying a full bag?", a: "Absolutely. Message us and we'll send a small sample so you can find the grade that suits your palate." },
];

function ProductCard({ p, i }: { p: Product; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (i % 4) * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-white/70 shadow-[0_18px_40px_-26px_rgba(36,19,8,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-caramel/50 hover:shadow-[0_28px_55px_-26px_rgba(36,19,8,0.55)]"
    >
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-b from-cream-2 to-cream-3">
        {p.tag && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-espresso px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-cream">
            {p.tag}
          </span>
        )}
        {p.img ? (
          <img
            src={p.img}
            alt={p.name}
            className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${p.cover ? "object-cover" : "object-contain p-6"}`}
          />
        ) : (
          <Coffee className="h-24 w-24 text-espresso/30 transition-transform duration-500 group-hover:scale-105" strokeWidth={1.1} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-tight text-espresso">{p.name}</h3>
        <p className="mt-2 flex-1 text-sm text-espresso/60">{p.blurb}</p>
        <div className="mt-4 flex items-center justify-between border-t border-espresso/10 pt-4">
          <span className="text-lg font-bold text-espresso">{p.price}</span>
          <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-caramel transition-colors hover:text-espresso">
            Enquire <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Group({ eyebrow, title, items, cols }: { eyebrow: string; title: string; items: Product[]; cols: string }) {
  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-hand text-2xl text-caramel sm:text-3xl">{eyebrow}</p>
          <h2 className="mt-1 text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold text-espresso">{title}</h2>
        </div>
        <span className="hidden h-px flex-1 bg-espresso/10 sm:block" />
      </div>
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${cols}`}>
        {items.map((p, i) => (
          <ProductCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <>
      <PageHeader
        crumb="Product"
        eyebrow="shop necta"
        title="Beans &"
        highlight="Espresso Machines."
        subtitle="What we do best — single-origin Nepali coffee, small-batch roasted, and the espresso machines to brew it just right. Simple, honest, and made for everyday coffee lovers."
      />

      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-7xl space-y-20 px-5 sm:px-8">
          <Group eyebrow="freshly roasted" title="Coffee Beans" items={BEANS} cols="lg:grid-cols-4" />
          <Group eyebrow="pull the perfect shot" title="Espresso Machines" items={MACHINES} cols="lg:grid-cols-2 lg:max-w-3xl" />
        </div>
      </section>

      {/* how we do it — From Farm To Cup */}
      <Process />

      <Faq items={FAQS} eyebrow="before you buy" />
    </>
  );
}
