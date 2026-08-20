import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import ScatterBeans from "./ScatterBeans";
import ScrollPager from "./ScrollPager";
import a54208 from "../assets/a54208.webp";
import img0763 from "../assets/img_0763.webp";
import nectaBand from "../assets/necta-band.webp";
import handheld from "../assets/new/handheld.webp";

/* ------------------------------------------------------------------ *
 * PLACEHOLDER CONTENT
 *
 * The client hasn't sent real reviews yet, so the six below are stand-ins
 * shaped exactly like the real thing. Replace `quote`, `name` and `role`
 * as they come in — attribution is deliberately by role and city rather
 * than an invented person, so nothing reads as a real endorsement before
 * it is one.
 * ------------------------------------------------------------------ */

interface Review {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    quote:
      "The roast has been consistent from the first delivery, which means our baristas dial in once and pour the same shot all week.",
    name: "Maybe Mars",
    role: "Swayambhu",
    rating: 5,
  },
  {
    quote:
      "They walked us through grind, dose and machine setup before we opened. It felt less like a supplier and more like a team behind the counter.",
    name: "Coco Cafe",
    role: "Putalisadak",
    rating: 5,
  },
  {
    quote:
      "Our regulars started asking where the beans come from. Being able to say a Nepali farm, by name, changed how we sell coffee.",
    name: "Hajur ko Bakery",
    role: "Imadol",
    rating: 5,
  },
  {
    quote:
      "The medium dark holds up beautifully in milk — the cocoa note still comes through in a 12oz latte, which is exactly what we needed.",
    name: "Mui Bakery",
    role: "Bhaktapur",
    rating: 5,
  },
  {
    quote:
      "Bags arrive within days of roasting and the freshness shows in the bloom. We've stopped keeping a backup supplier.",
    name: "Afnai Coffee",
    role: "Baneshwor",
    rating: 5,
  },
  {
    quote:
      "We needed a coffee course that could hold its own after a tasting menu. Necta's beans pour smooth enough for the finish without ever feeling like an afterthought.",
    name: "Fine Dinners",
    role: "Chitwan",
    rating: 5,
  },
];

const CAFES = [
  { img: handheld, label: "Green beans, hand-sorted before the roast" },
  { img: a54208, label: "Partner cafe — counter service" },
  { img: img0763, label: "Partner cafe — espresso bar" },
  { img: nectaBand, label: "Partner cafe — table service" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const monogram = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < n ? "fill-caramel-light text-caramel-light" : "text-cream/25"
            }`}
        />
      ))}
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-leaf-2/80 p-5 shadow-2xl backdrop-blur-sm transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-caramel/40 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <Stars n={r.rating} />
        <Quote className="h-5 w-5 shrink-0 text-caramel-light/40" />
      </div>

      <blockquote className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-cream/80 sm:mt-4 sm:text-base">
        {r.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-cream/10 pt-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-caramel/20 text-[0.72rem] font-bold text-caramel-light">
          {monogram(r.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-cream">{r.name}</p>
          <p className="truncate text-[0.78rem] text-cream/55">{r.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-[radial-gradient(120%_100%_at_50%_-10%,#34543f_0%,#24412f_45%,#1c352a_100%)] py-16 text-cream sm:py-20 md:py-28"
    >
      <div className="grain absolute inset-0" />
      <ScatterBeans count={10} />
      <span className="pointer-events-none absolute -left-3 bottom-1 select-none font-hand text-[12vw] leading-none text-cream/[0.04]">
        sip
      </span>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8">
        {/* HEADING */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-hand text-2xl text-caramel-light sm:text-4xl"
          >
            straight from the counter
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-2 text-[clamp(1.75rem,5.6vw,3.6rem)] font-bold leading-[1.08]"
          >
            Customer <span className="text-caramel-light">Reviews</span> <br /> of Our Beans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-cream/65 sm:text-lg"
          >
            What the cafes pouring Necta say about the beans <br /> in their own words.
          </motion.p>
        </div>

        {/* REVIEWS — a carousel on phones, an even grid from md up: every
            card is the same size regardless of quote length, so the wall
            reads as one set rather than a ragged masonry */}
        <div className="mt-10 sm:mt-12 md:hidden">
          <ScrollPager label="Customer reviews" itemClass="w-[86%] min-[480px]:w-[60%]">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={i} r={r} />
            ))}
          </ScrollPager>
        </div>

        {/* auto-rows-fr keeps every row the same height, so all six cards
            match — not just the ones sharing a row */}
        <div className="mt-12 hidden auto-rows-fr gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: EASE }}
              className="h-full"
            >
              <ReviewCard r={r} />
            </motion.div>
          ))}
        </div>

        {/* CAFÉ PHOTOS — a scrolling strip on phones, a full row from sm up */}
        <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {CAFES.map((c, i) => (
            <motion.div
              key={c.img}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              className="group relative w-[58%] shrink-0 snap-start overflow-hidden rounded-2xl border border-cream/10 min-[420px]:w-[45%] sm:w-auto"
            >
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] sm:aspect-[3/4]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-leaf/80 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
