import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Coffee,
  ExternalLink,
  Handshake,
  LifeBuoy,
  Plus,
  Settings2,
  Store,
} from "lucide-react";
import type { ReactNode } from "react";
import PageHeader from "../components/PageHeader";
import Faq from "../components/Faq";
import type { QA } from "../components/Faq";
import OriginCard from "../components/OriginCard";
import { COMMERCIAL, ORIGINS, npr } from "../lib/products";
import { contactLink } from "../lib/enquiry";
import type { Product, Segment } from "../lib/products";
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
  about: "dealership" | "collaboration";
  blurb: string;
  icon: ReactNode;
  points: { icon: ReactNode; label: string }[];
}

const OFFERS: Offer[] = [
  {
    title: "Dealership",
    about: "dealership",
    blurb: "Carry Necta in your region — beans, hardware and the people to keep both running.",
    icon: <Store className="h-5 w-5" />,
    points: [
      { icon: <Coffee className="h-4 w-4" />, label: "Coffee" },
      { icon: <Settings2 className="h-4 w-4" />, label: "Coffee Equipment" },
      { icon: <LifeBuoy className="h-4 w-4" />, label: "Support for Cafes" },
    ],
  },
  {
    title: "Collaboration Branding",
    about: "collaboration",
    blurb: "Your name on the bag, our roastery behind it — built around how your business serves coffee.",
    icon: <Handshake className="h-5 w-5" />,
    points: [
      { icon: <Check className="h-4 w-4" />, label: "Coffee Solutions for Multiple Businesses" },
    ],
  },
];

/* premium and everyday tiers read differently at a glance */
const ACCENT: Record<Segment, string> = {
  premium: "bg-caramel text-espresso",
  commercial: "bg-leaf-2 text-cream",
};

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
    blurb: "A commercial-grade espresso machine built for high-volume cafes — precise, powerful and reliable.",
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
  { q: "What grind options do you offer?", a: "We ship whole bean by default, but you can request espresso, moka, drip, or French-press grind when you enquire — free of charge." },
  { q: "Do the espresso machines come with a warranty?", a: "All Necta machines include a 1-year warranty covering manufacturing defects, plus local servicing support." },
  { q: "Can I order a sample before buying a full bag?", a: "Absolutely. Message us and we'll send a small sample so you can find the grade that suits your palate." },
];

/* ---------------------------- pieces ---------------------------- */

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
        to={contactLink(o.about)}
        className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-espresso px-5 py-2.5 text-[0.82rem] font-semibold text-cream transition-all duration-300 hover:scale-[1.03] hover:bg-espresso-2"
      >
        Enquire
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

/* the card body is shared by both catalogue cards — only the price
 * footer and the badge differ between a full pack card and a 1 kg bag */
function CardShell({
  p,
  i,
  badge,
  badgeClass,
  reveal = true,
  children,
}: {
  p: Product;
  i: number;
  badge: string;
  badgeClass: string;
  /** off inside a horizontal scroller — a card parked off to the side never
   *  intersects the viewport, so a whileInView card would stay invisible */
  reveal?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={reveal ? { opacity: 0, y: 22 } : false}
      whileInView={reveal ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: (i % 3) * 0.09, duration: 0.6, ease: EASE }}
      className="h-full"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-espresso/10 bg-white/70 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-caramel/40 hover:shadow-[0_24px_50px_-30px_rgba(36,19,8,0.6)]">
        <div className="relative aspect-[6/5] overflow-hidden bg-gradient-to-b from-cream-2 to-cream-3">
          <span className={`absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider ${badgeClass}`}>
            {badge}
          </span>
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />
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
          {children}
        </div>
      </article>
    </motion.div>
  );
}

/* no checkout on the site — every "add" is an enquiry that lands on the
   contact page with the product named in the aria-label */
function AddButton({ label, product }: { label: string; product: string }) {
  return (
    <Link
      to={contactLink("beans", product)}
      aria-label={`Enquire about ${product}`}
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-4 py-2.5 text-[0.82rem] font-semibold text-cream transition-all duration-300 hover:scale-[1.02] hover:bg-espresso-2"
    >
      <Plus className="h-4 w-4" />
      {label}
    </Link>
  );
}

/* full pack card — all three sizes priced, size chosen in the modal */
function PackCard({ p, i }: { p: Product; i: number }) {
  return (
    <CardShell p={p} i={i} badge={p.tag} badgeClass={ACCENT[p.segment]}>
      <dl className="mt-3 grid grid-cols-3 gap-1 border-t border-espresso/10 pt-3 text-center">
        {p.packs.map((pk) => (
          <div key={pk.size}>
            <dt className="text-[0.6rem] font-medium uppercase tracking-wide text-espresso/55">{pk.size}</dt>
            <dd className="mt-0.5 whitespace-nowrap text-[0.82rem] font-bold tabular-nums text-espresso sm:text-sm">{npr(pk.price)}</dd>
          </div>
        ))}
      </dl>
      <AddButton label="Add to cart" product={p.name} />
    </CardShell>
  );
}

function Group({ eyebrow, title, note, items, grid }: { eyebrow: string; title: string; note?: string; items: Product[]; grid: string }) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <p className="font-hand text-xl text-caramel sm:text-2xl">{eyebrow}</p>
          <h3 className="mt-0.5 text-[clamp(1.6rem,5.4vw,3rem)] font-semibold leading-tight text-espresso">{title}</h3>
        </div>
        {note && <p className="max-w-xs text-[0.82rem] leading-relaxed text-espresso/60">{note}</p>}
        <span className="hidden h-px flex-1 basis-full bg-espresso/10 sm:block" />
      </div>
      <div className={`grid gap-4 sm:gap-5 ${grid}`}>
        {items.map((p, i) => (
          <PackCard key={p.id} p={p} i={i} />
        ))}
      </div>
    </div>
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
              Bring Necta to your city — beans, equipment and cafe support under one
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
            {/* SINGLE ORIGIN — districts, not SKUs: no pricing or roast
                profiles, the detail lives in the card overlay */}
            <div>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <div className="min-w-0">
                  <p className="font-hand text-xl text-caramel sm:text-2xl">where it grows</p>
                  <h3 className="mt-0.5 text-[clamp(1.6rem,5.4vw,3rem)] font-semibold leading-tight text-espresso">
                    Single Origin <span className="text-caramel">Beans</span>
                  </h3>
                </div>
                <p className="max-w-xs text-[0.82rem] leading-relaxed text-espresso/60">
                  Traceable lots from three growing districts — hover a card for the story behind it.
                </p>
                <span className="hidden h-px flex-1 basis-full bg-espresso/10 sm:block" />
              </div>
              <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {ORIGINS.map((o, i) => (
                  <OriginCard key={o.id} o={o} i={i} />
                ))}
              </div>
            </div>

            <Group
              eyebrow="everyday commercial"
              title="Commercial Beans"
              note="Consistent medium roasts built for cafes, kitchens and daily drinking."
              items={COMMERCIAL}
              grid="grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3"
            />
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
              Equipment Solution for <span className="text-caramel">Your Cafe</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 text-[1.02rem] font-semibold text-espresso/75 sm:text-lg"
            >
              Opening a Cafe? We&apos;ve Got Your Back.
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
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to={contactLink("machines")}
                className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-[0.85rem] font-semibold text-cream transition-all duration-300 hover:scale-[1.03] hover:bg-espresso-2 sm:text-base"
              >
                Inquire Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={BRUGNETTI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-espresso/25 px-6 py-3.5 text-[0.85rem] font-semibold text-espresso transition-all duration-300 hover:border-espresso hover:bg-espresso/5 sm:text-base"
              >
                Explore more machines
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <p className="text-[0.82rem] text-espresso/55">
              Full range on Officine Brugnetti — tell us what you need and we&apos;ll source it.
            </p>
          </motion.div>
        </div>
      </section>

      <Faq items={FAQS} eyebrow="before you buy" image={nectaFaq} />
    </>
  );
}
