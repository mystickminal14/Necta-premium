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

type Accent = "gold" | "green" | "brown";

interface Product {
  name: string;
  roast?: string;      // available roast profile
  prices?: Pack[];     // tiered pack pricing (beans)
  price?: string;      // single price (machines)
  tag?: string;
  accent?: Accent;     // overrides the group accent
  blurb: string;
  img?: string;        // image
  cover?: boolean;     // true = full-bleed photo (machines)
}

// tier colour system — premium / standard / machines read differently
const ACCENT: Record<Accent, { badge: string; cta: string }> = {
  gold: { badge: "bg-caramel text-espresso", cta: "bg-caramel text-espresso" },
  green: { badge: "bg-leaf-2 text-cream", cta: "bg-leaf-2 text-cream" },
  brown: { badge: "bg-bean text-cream", cta: "bg-bean text-cream" },
};

// A — Premium Segment
const PREMIUM: Product[] = [
  {
    name: "Speciality Coffee",
    roast: "City · City Plus · Full City · Full City Plus",
    tag: "Speciality",
    blurb: "Our finest graded lots, cupped for clarity and character — roasted to the profile you choose.",
    prices: [
      { size: "1 kg", price: "Rs 3,500" },
      { size: "500 g", price: "Rs 1,850" },
      { size: "250 g", price: "Rs 1,000" },
    ],
    img: "/img/necta-speciality.jpg",
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
    img: "/img/necta-house.jpg",
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
    img: "/img/necta-special.jpg",
  },
  {
    name: "Valley Classic",
    roast: "Medium · Medium Dark",
    tag: "Classic",
    blurb: "A dependable medium roast with a smooth, classic cup that keeps regulars coming back.",
    prices: [
      { size: "1 kg", price: "Rs 2,800" },
      { size: "500 g", price: "Rs 1,500" },
      { size: "250 g", price: "Rs 800" },
    ],
    img: "/img/necta-valley.jpg",
  },
  {
    name: "Peak Strong",
    roast: "Medium · Medium Dark",
    tag: "Strong",
    blurb: "Bold and full-bodied with a strong finish — made for milk drinks and big flavour.",
    prices: [
      { size: "1 kg", price: "Rs 2,600" },
      { size: "500 g", price: "Rs 1,350" },
      { size: "250 g", price: "Rs 700" },
    ],
    img: "/img/necta-peak.jpg",
  },
];

// Espresso Machines — two units, distinct tiers
const MACHINES: Product[] = [
  {
    name: "Brugnetti Luna",
    tag: "Premium",
    accent: "gold",
    price: "Rs 650,000",
    blurb: "A commercial-grade espresso machine built for high-volume cafés — precise, powerful and reliable.",
    img: "/img/espresso-3.jpg",
    cover: true,
  },
  {
    name: "Mito Base Compact",
    tag: "Standard",
    accent: "brown",
    price: "On request",
    blurb: "A compact base machine for smaller counters — the everyday workhorse for a steady flow of shots.",
    img: "/img/espresso-2.jpg",
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

const EASE = [0.16, 1, 0.3, 1] as const;

function ProductCard({ p, i, accent }: { p: Product; i: number; accent: Accent }) {
  const isBeans = !!p.prices;
  const a = ACCENT[p.accent ?? accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: (i % 3) * 0.09, duration: 0.6, ease: EASE }}
      className="h-full"
    >
      <Link
        to="/contact"
        aria-label={`Enquire about ${p.name}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-espresso/10 bg-white/70 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-caramel/40 hover:shadow-[0_24px_50px_-30px_rgba(36,19,8,0.6)]"
      >
        <div className="relative aspect-[6/5] overflow-hidden bg-gradient-to-b from-cream-2 to-cream-3">
          {p.tag && (
            <span className={`absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider ${a.badge}`}>
              {p.tag}
            </span>
          )}
          {p.img ? (
            <img
              src={p.img}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Coffee className="h-20 w-20 text-espresso/25" strokeWidth={1.1} />
            </div>
          )}

          {/* hover reveal — shown by default on touch, revealed on hover on desktop */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 bg-gradient-to-t from-espresso/95 via-espresso/55 to-transparent px-4 pb-3 pt-14 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <span className="text-sm font-semibold text-cream">{isBeans ? "Enquire to order" : "Enquire"}</span>
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 ${a.cta}`}>
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-bold leading-tight text-espresso">{p.name}</h3>
          {p.roast && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.roast.split(" · ").map((r) => (
                <span
                  key={r}
                  className="rounded-md border border-caramel/25 bg-caramel/[0.08] px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-bean"
                >
                  {r}
                </span>
              ))}
            </div>
          )}
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-espresso/75 line-clamp-2">{p.blurb}</p>

          {p.prices ? (
            <dl className="mt-3 grid grid-cols-3 gap-1 border-t border-espresso/10 pt-3 text-center">
              {p.prices.map((pk) => (
                <div key={pk.size}>
                  <dt className="text-[0.6rem] font-medium uppercase tracking-wide text-espresso/55">{pk.size}</dt>
                  <dd className="mt-0.5 whitespace-nowrap text-sm font-bold tabular-nums text-espresso">{pk.price}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="mt-3 flex items-baseline justify-between border-t border-espresso/10 pt-3">
              <span className="text-[0.62rem] font-medium uppercase tracking-wide text-espresso/55">Price</span>
              <span className="text-base font-bold tabular-nums text-espresso">{p.price}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function Group({ eyebrow, title, note, items, grid, accent }: { eyebrow: string; title: string; note?: string; items: Product[]; grid: string; accent: Accent }) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p className="font-hand text-xl text-caramel sm:text-2xl">{eyebrow}</p>
          <h3 className="mt-0.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold text-espresso">{title}</h3>
        </div>
        {note && <p className="max-w-xs text-[0.82rem] leading-relaxed text-espresso/60">{note}</p>}
        <span className="hidden h-px flex-1 basis-full bg-espresso/10 sm:block" />
      </div>
      <div className={`grid gap-5 ${grid}`}>
        {items.map((p, i) => (
          <ProductCard key={p.name} p={p} i={i} accent={accent} />
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

      <section className="relative overflow-hidden bg-cream py-14 sm:py-20">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="space-y-16">
            <Group
              eyebrow="premium segment"
              title="Speciality & House Blend"
              note="Graded, single-origin lots roasted to the profile you choose — City through Full City Plus."
              items={PREMIUM}
              grid="max-w-2xl grid-cols-1 min-[480px]:grid-cols-2"
              accent="gold"
            />
            <Group
              eyebrow="everyday commercial"
              title="Commercial Beans"
              note="Consistent medium roasts built for cafés, kitchens and daily drinking."
              items={COMMERCIAL}
              grid="grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3"
              accent="green"
            />
            <Group
              eyebrow="pull the perfect shot"
              title="Espresso Machines"
              note="Commercial-grade hardware to brew Necta beans just right."
              items={MACHINES}
              grid="max-w-2xl grid-cols-1 min-[480px]:grid-cols-2"
              accent="brown"
            />
          </div>
        </div>
      </section>

      {/* how we do it — From Farm To Cup */}
      <Process />

      <Faq items={FAQS} eyebrow="before you buy" image="/img/necta-faq.jpg" />
    </>
  );
}
