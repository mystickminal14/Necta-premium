import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Coffee,
  ExternalLink,
  Handshake,
  LifeBuoy,
  Settings2,
  Store,
} from "lucide-react";
import type { ReactNode } from "react";
import PageHeader from "../components/PageHeader";
import Process from "../components/Process";
import Faq from "../components/Faq";
import type { QA } from "../components/Faq";
import nectaSpeciality from "../assets/necta-speciality.jpg";
import nectaHouse from "../assets/necta-house.jpg";
import nectaSpecial from "../assets/necta-special.jpg";
import nectaValley from "../assets/necta-valley.jpg";
import nectaPeak from "../assets/necta-peak.jpg";
import espresso3 from "../assets/espresso-3.jpg";
import espresso2 from "../assets/espresso-2.jpg";
import nectaFaq from "../assets/necta-faq.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;
const BRUGNETTI_URL = "https://www.officinebrugnetti.com/EN/";

/* ------------------------------------------------------------------ *
 * Dealership — the two ways to partner with Necta.
 * ------------------------------------------------------------------ */

interface Offer {
  title: string;
  blurb: string;
  icon: ReactNode;
  points: { icon: ReactNode; label: string }[];
}

const OFFERS: Offer[] = [
  {
    title: "Dealership",
    blurb: "Carry Necta in your region — beans, hardware and the people to keep both running.",
    icon: <Store className="h-5 w-5" />,
    points: [
      { icon: <Coffee className="h-4 w-4" />, label: "Coffee" },
      { icon: <Settings2 className="h-4 w-4" />, label: "Coffee Equipment" },
      { icon: <LifeBuoy className="h-4 w-4" />, label: "Support for Cafés" },
    ],
  },
  {
    title: "Collaboration Branding",
    blurb: "Your name on the bag, our roastery behind it — built around how your business serves coffee.",
    icon: <Handshake className="h-5 w-5" />,
    points: [
      { icon: <Check className="h-4 w-4" />, label: "Coffee Solutions for Multiple Businesses" },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Our Coffee — the full range, priced per pack size (1 kg / 500 g / 250 g).
 * ------------------------------------------------------------------ */

interface Pack {
  size: string;
  price: string;
}

type Accent = "gold" | "green";

interface Product {
  name: string;
  roast: string;
  prices: Pack[];
  tag: string;
  blurb: string;
  img: string;
}

/* premium and everyday tiers read differently at a glance */
const ACCENT: Record<Accent, string> = {
  gold: "bg-caramel text-espresso",
  green: "bg-leaf-2 text-cream",
};

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
    img: nectaSpeciality,
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
    img: nectaHouse,
  },
];

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
    img: nectaSpecial,
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
    img: nectaValley,
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
    img: nectaPeak,
  },
];

/* ------------------------------------------------------------------ *
 * PLACEHOLDER — Most Popular Sellings
 *
 * All 1 kg. The client is still deciding which varieties make the cut, so
 * this array is the only thing that needs editing: add, remove or rename
 * entries and the grid takes care of itself. Drop `price` to show
 * "On request" instead.
 * ------------------------------------------------------------------ */

interface Bean {
  name: string;
  roast: string;
  blurb: string;
  img?: string;
  price?: string;
}

const POPULAR_BEANS: Bean[] = [
  {
    name: "Speciality Coffee",
    roast: "City · City Plus · Full City",
    blurb: "Our finest graded lots, cupped for clarity and character — roasted to the profile you choose.",
    img: nectaSpeciality,
    price: "Rs 3,500",
  },
  {
    name: "House Blend",
    roast: "City · City Plus · Full City",
    blurb: "A balanced signature blend built for everyday brewing, roasted to your preferred profile.",
    img: nectaHouse,
    price: "Rs 3,200",
  },
  {
    name: "Necta Special",
    roast: "Medium · Medium Dark",
    blurb: "Our flagship commercial roast — rich, rounded and dialled in for cafés and busy kitchens.",
    img: nectaSpecial,
    price: "Rs 3,000",
  },
  {
    name: "Valley Classic",
    roast: "Medium · Medium Dark",
    blurb: "A dependable medium roast with a smooth, classic cup that keeps regulars coming back.",
    img: nectaValley,
    price: "Rs 2,800",
  },
  {
    name: "Peak Strong",
    roast: "Medium · Medium Dark",
    blurb: "Bold and full-bodied with a strong finish — made for milk drinks and big flavour.",
    img: nectaPeak,
    price: "Rs 2,600",
  },
];

/* Machine line-up — imagery is ours; the full catalogue lives on Brugnetti. */
interface Machine {
  name: string;
  tag: string;
  blurb: string;
  img: string;
}

const MACHINES: Machine[] = [
  {
    name: "Brugnetti Luna",
    tag: "Premium",
    blurb: "A commercial-grade espresso machine built for high-volume cafés — precise, powerful and reliable.",
    img: espresso3,
  },
  {
    name: "Mito Base Compact",
    tag: "Standard",
    blurb: "A compact base machine for smaller counters — the everyday workhorse for a steady flow of shots.",
    img: espresso2,
  },
];

const FAQS: QA[] = [
  { q: "How fresh is the coffee when it ships?", a: "Every order is roasted in small batches and shipped within 48 hours of roasting, so your beans arrive at peak freshness." },
  { q: "Do you deliver across Nepal?", a: "Yes — we deliver nationwide. Kathmandu Valley orders typically arrive in 1–2 days; outside the valley takes 3–5 days." },
  { q: "What grind options do you offer?", a: "We ship whole bean by default, but you can request espresso, moka, drip, or French-press grind in the order notes — free of charge." },
  { q: "Do the espresso machines come with a warranty?", a: "All Necta machines include a 1-year warranty covering manufacturing defects, plus local servicing support." },
  { q: "Can I order a sample before buying a full bag?", a: "Absolutely. Message us and we'll send a small sample so you can find the grade that suits your palate." },
];

/* ---------------------------- pieces ---------------------------- */

function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="min-w-0">
        <p className="font-hand text-xl text-caramel sm:text-2xl">{eyebrow}</p>
        <h2 className="mt-0.5 text-[clamp(1.4rem,5vw,2.2rem)] font-semibold leading-tight text-espresso">{title}</h2>
      </div>
      {note && <p className="max-w-sm text-[0.82rem] leading-relaxed text-espresso/60">{note}</p>}
      <span className="hidden h-px flex-1 basis-full bg-espresso/10 sm:block" />
    </div>
  );
}

function OfferCard({ o, i }: { o: Offer; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
      className="group flex h-full flex-col rounded-2xl border border-espresso/10 bg-white/70 p-5 text-left transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-caramel/40 hover:shadow-[0_24px_50px_-30px_rgba(36,19,8,0.6)] sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/15 text-bean transition-colors duration-500 group-hover:bg-caramel group-hover:text-espresso">
          {o.icon}
        </span>
        <h3 className="text-lg font-bold leading-tight text-espresso sm:text-xl">{o.title}</h3>
      </div>

      <p className="mt-3 text-[0.9rem] leading-relaxed text-espresso/65">{o.blurb}</p>

      <ul className="mt-5 flex-1 space-y-2.5 border-t border-espresso/10 pt-4">
        {o.points.map((p) => (
          <li key={p.label} className="flex items-start gap-2.5 text-[0.92rem] font-medium text-espresso/90">
            <span className="mt-0.5 shrink-0 text-caramel">{p.icon}</span>
            <span className="min-w-0">{p.label}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-espresso px-5 py-2.5 text-[0.82rem] font-semibold text-cream transition-all duration-300 hover:scale-[1.03] hover:bg-espresso-2"
      >
        Enquire
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

function PackCard({ p, i, accent }: { p: Product; i: number; accent: Accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
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
          <span className={`absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider ${ACCENT[accent]}`}>
            {p.tag}
          </span>
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 bg-gradient-to-t from-espresso/95 via-espresso/55 to-transparent px-4 pb-3 pt-14 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <span className="text-sm font-semibold text-cream">Enquire to order</span>
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 ${ACCENT[accent]}`}>
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-bold leading-tight text-espresso">{p.name}</h3>
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
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-espresso/75">{p.blurb}</p>

          <dl className="mt-3 grid grid-cols-3 gap-1 border-t border-espresso/10 pt-3 text-center">
            {p.prices.map((pk) => (
              <div key={pk.size}>
                <dt className="text-[0.6rem] font-medium uppercase tracking-wide text-espresso/55">{pk.size}</dt>
                <dd className="mt-0.5 whitespace-nowrap text-[0.82rem] font-bold tabular-nums text-espresso sm:text-sm">{pk.price}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Link>
    </motion.div>
  );
}

function Group({ eyebrow, title, note, items, grid, accent }: { eyebrow: string; title: string; note?: string; items: Product[]; grid: string; accent: Accent }) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <p className="font-hand text-xl text-caramel sm:text-2xl">{eyebrow}</p>
          <h3 className="mt-0.5 text-[clamp(1.3rem,4.4vw,2rem)] font-semibold leading-tight text-espresso">{title}</h3>
        </div>
        {note && <p className="max-w-xs text-[0.82rem] leading-relaxed text-espresso/60">{note}</p>}
        <span className="hidden h-px flex-1 basis-full bg-espresso/10 sm:block" />
      </div>
      <div className={`grid gap-4 sm:gap-5 ${grid}`}>
        {items.map((p, i) => (
          <PackCard key={p.name} p={p} i={i} accent={accent} />
        ))}
      </div>
    </div>
  );
}

function BeanCard({ b, i }: { b: Bean; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: (i % 3) * 0.09, duration: 0.6, ease: EASE }}
      className="h-full"
    >
      <Link
        to="/contact"
        aria-label={`Enquire about ${b.name}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-espresso/10 bg-white/70 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-caramel/40 hover:shadow-[0_24px_50px_-30px_rgba(36,19,8,0.6)]"
      >
        <div className="relative aspect-[6/5] overflow-hidden bg-gradient-to-b from-cream-2 to-cream-3">
          <span className="absolute left-3 top-3 z-20 rounded-full bg-caramel px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-espresso">
            1 kg
          </span>
          {b.img ? (
            <img
              src={b.img}
              alt={b.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Coffee className="h-16 w-16 text-espresso/25" strokeWidth={1.1} />
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 bg-gradient-to-t from-espresso/95 via-espresso/55 to-transparent px-4 pb-3 pt-14 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <span className="text-sm font-semibold text-cream">Enquire to order</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-caramel text-espresso transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-bold leading-tight text-espresso">{b.name}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {b.roast.split(" · ").map((r) => (
              <span
                key={r}
                className="rounded-md border border-caramel/25 bg-caramel/[0.08] px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-bean"
              >
                {r}
              </span>
            ))}
          </div>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-espresso/75">{b.blurb}</p>
          <div className="mt-3 flex items-baseline justify-between gap-2 border-t border-espresso/10 pt-3">
            <span className="text-[0.62rem] font-medium uppercase tracking-wide text-espresso/55">1 kg</span>
            <span className="text-base font-bold tabular-nums text-espresso">{b.price ?? "On request"}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function MachineCard({ m, i }: { m: Machine; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: i * 0.1, duration: 0.65, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border border-espresso/10 bg-white/70 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-caramel/40 hover:shadow-[0_24px_50px_-30px_rgba(36,19,8,0.6)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-3 sm:aspect-[16/10]">
        <span className="absolute left-3 top-3 z-20 rounded-full bg-bean px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-cream">
          {m.tag}
        </span>
        <img
          src={m.img}
          alt={m.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-base font-bold leading-tight text-espresso sm:text-lg">{m.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-espresso/70">{m.blurb}</p>
      </div>
    </motion.div>
  );
}

/* ---------------------------- page ---------------------------- */

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

      {/* DEALERSHIP */}
      <section className="relative overflow-hidden bg-cream-2 py-14 sm:py-20">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-hand text-2xl text-caramel sm:text-3xl"
            >
              partner with us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-2 text-[clamp(1.6rem,5.4vw,3rem)] font-semibold leading-tight text-espresso"
            >
              Own a Necta <span className="text-caramel">Dealership</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-espresso/60 sm:text-base"
            >
              Bring Necta to your city — beans, equipment and café support under one
              roof, or a coffee programme built around your own brand.
            </motion.p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {OFFERS.map((o, i) => (
              <OfferCard key={o.title} o={o} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* OUR COFFEE — full range with 1 kg / 500 g / 250 g pack pricing */}
      <section className="relative overflow-hidden bg-cream py-14 sm:py-20">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
          <div className="space-y-14 sm:space-y-16">
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
          </div>
        </div>
      </section>

      {/* MOST POPULAR SELLINGS */}
      <section className="relative overflow-hidden bg-cream-2 py-14 sm:py-20">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
          <SectionHead
            eyebrow="straight off the roaster"
            title="Most Popular Sellings"
            note="Our fastest-moving 1 kg bags — the ones cafés reorder without thinking twice."
          />
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {POPULAR_BEANS.map((b, i) => (
              <BeanCard key={b.name} b={b} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="relative overflow-hidden bg-cream py-14 sm:py-20">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-hand text-2xl text-caramel sm:text-3xl"
            >
              behind the counter
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-2 text-[clamp(1.6rem,5.4vw,3rem)] font-semibold leading-tight text-espresso"
            >
              Equipment Solution for <span className="text-caramel">Your Café</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 text-[1.02rem] font-semibold text-espresso/75 sm:text-lg"
            >
              Opening a Café? We&apos;ve Got Your Back.
            </motion.p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {MACHINES.map((m, i) => (
              <MachineCard key={m.name} m={m} i={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 flex flex-col items-center gap-3 text-center"
          >
            <a
              href={BRUGNETTI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-[0.85rem] font-semibold text-cream transition-all duration-300 hover:scale-[1.03] hover:bg-espresso-2 sm:text-base"
            >
              Explore more machines
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="text-[0.82rem] text-espresso/55">
              Full range on Officine Brugnetti — tell us what you need and we&apos;ll source it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* how we do it — From Farm To Cup */}
      <Process />

      <Faq items={FAQS} eyebrow="before you buy" image={nectaFaq} />
    </>
  );
}
