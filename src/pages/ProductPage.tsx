import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Process from "../components/Process";
import Faq from "../components/Faq";
import type { QA } from "../components/Faq";

interface Pack {
  size: string;
  price: string;
}

interface Product {
  name: string;
  roast?: string;      // available roast profile
  prices?: Pack[];     // tiered pack pricing (beans)
  price?: string;      // single price (machines)
  tag?: string;
  blurb: string;
  img?: string;        // image
  cover?: boolean;     // true = full-bleed photo, false = padded cutout
}

// A — Premium Segment
const PREMIUM: Product[] = [
  {
    name: "Speciality Coffee",
    roast: "City · City Plus · Full City · Full City Plus",
    tag: "Speciality",
    blurb: "Our finest graded lots, cupped for clarity and character. Choose the roast profile that suits your palate.",
    prices: [
      { size: "1 kg", price: "Rs 3,500" },
      { size: "500 g", price: "Rs 1,850" },
      { size: "250 g", price: "Rs 1,000" },
    ],
    img: "/img/pouch-front.png",
  },
  {
    name: "House Blend",
    roast: "City · City Plus · Full City · Full City Plus",
    tag: "Signature",
    blurb: "A balanced signature blend built for everyday brewing, roasted to your preferred profile.",
    prices: [
      { size: "1 kg", price: "Rs 3,200" },
      { size: "500 g", price: "Rs 1,700" },
      { size: "250 g", price: "Rs 900" },
    ],
    img: "/img/newsinglebrew.png",
  },
];

// B — Commercial Beans
const COMMERCIAL: Product[] = [
  {
    name: "Necta Special",
    roast: "Medium · Medium Dark",
    tag: "Flagship",
    blurb: "Our flagship commercial roast — rich, rounded and dialled in for cafés and busy kitchens.",
    prices: [
      { size: "1 kg", price: "Rs 3,000" },
      { size: "500 g", price: "Rs 1,600" },
      { size: "250 g", price: "Rs 850" },
    ],
    img: "/img/pouches-cutout.png",
  },
  {
    name: "Valley Classic",
    roast: "Medium · Medium Dark",
    blurb: "A dependable medium roast with a smooth, classic cup that keeps regulars coming back.",
    prices: [
      { size: "1 kg", price: "Rs 2,800" },
      { size: "500 g", price: "Rs 1,500" },
      { size: "250 g", price: "Rs 800" },
    ],
    img: "/img/pouches-table.png",
  },
  {
    name: "Peak Strong",
    roast: "Medium · Medium Dark",
    blurb: "Bold and full-bodied with a strong finish — made for milk drinks and big flavour.",
    prices: [
      { size: "1 kg", price: "Rs 2,600" },
      { size: "500 g", price: "Rs 1,350" },
      { size: "250 g", price: "Rs 700" },
    ],
    img: "/img/pouch-dark.png",
  },
];

// Espresso Machines
const MACHINES: Product[] = [
  {
    name: "Brugnetti Luna Espresso Machine",
    price: "Rs 650,000",
    tag: "Commercial",
    blurb: "A complete commercial setup — the Brugnetti Luna espresso machine paired with the Mito Base Compact.",
    img: "/img/espresso-3.jpg",
    cover: true,
  },
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
        {p.roast && (
          <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-caramel">{p.roast}</p>
        )}
        <p className="mt-2 flex-1 text-sm text-espresso/60">{p.blurb}</p>

        {p.prices ? (
          <div className="mt-4 space-y-1.5 border-t border-espresso/10 pt-4">
            {p.prices.map((pk) => (
              <div key={pk.size} className="flex items-center justify-between text-sm">
                <span className="text-espresso/55">{pk.size}</span>
                <span className="font-bold text-espresso">{pk.price}</span>
              </div>
            ))}
            <Link
              to="/contact"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-caramel transition-colors hover:text-espresso"
            >
              Enquire <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between border-t border-espresso/10 pt-4">
            <span className="text-lg font-bold text-espresso">{p.price}</span>
            <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-caramel transition-colors hover:text-espresso">
              Enquire <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
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
        subtitle="What we do best — premium and everyday Nepali coffee, small-batch roasted, in 1 kg, 500 g and 250 g packs — plus the espresso machines to brew it just right."
      />

      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-7xl space-y-20 px-5 sm:px-8">
          <Group eyebrow="premium segment" title="Speciality & House Blend" items={PREMIUM} cols="lg:grid-cols-2" />
          <Group eyebrow="everyday commercial" title="Commercial Beans" items={COMMERCIAL} cols="lg:grid-cols-3" />
          <Group eyebrow="pull the perfect shot" title="Espresso Machines" items={MACHINES} cols="lg:grid-cols-2 lg:max-w-3xl" />
        </div>
      </section>

      {/* how we do it — From Farm To Cup */}
      <Process />

      <Faq items={FAQS} eyebrow="before you buy" />
    </>
  );
}
