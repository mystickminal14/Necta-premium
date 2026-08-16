import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { contactLink } from "../lib/enquiry";
import latteArt from "../assets/new_laatte.webp";
import v60 from "../assets/new/v60.webp";
import coldbrew from "../assets/new/coldbrew.webp";

/* ------------------------------------------------------------------ *
 * Three vertical cards. Swap `img` for the client's own shots when they
 * land — the aspect ratio is fixed by the card, so any portrait crop works.
 * ------------------------------------------------------------------ */

interface Item {
  name: string;
  img: string;
}

const ITEMS: Item[] = [
  {
    name: "Blend",
    img: latteArt,
  },
  {
    name: "Single Origin",
    img: v60,
  },
  {
    name: "Cold Brew",
    img: coldbrew,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function ProductCard({ item, i }: { item: Item; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
    >
      <Link
        to={contactLink("beans", item.name)}
        aria-label={`Inquire about our ${item.name} coffee`}
        className="group relative block overflow-hidden rounded-2xl border border-espresso/10 shadow-[0_20px_50px_-32px_rgba(36,19,8,0.7)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-caramel/40 hover:shadow-[0_34px_60px_-30px_rgba(36,19,8,0.65)] sm:rounded-[1.75rem]"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-cream-3">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          />

          {/* text sits on the photo — the scrim keeps it readable on any crop */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso via-espresso/70 to-transparent px-4 pb-4 pt-20 sm:px-5 sm:pb-5 sm:pt-24">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                {/* the one place the display serif is used — Cormorant runs small for
                    its point size, hence the bump */}
                <h3 className="font-display text-[1.9rem] font-semibold leading-tight text-cream sm:text-[2.35rem]">
                  {item.name}
                </h3>
                {/* the call to action replaces the description on hover —
                    folded away on pointer devices, always shown on touch */}
                <p className="mt-1.5 text-[0.95rem] font-semibold text-caramel-light sm:mt-2 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-500 sm:ease-[cubic-bezier(0.16,1,0.3,1)] sm:group-hover:max-h-12 sm:group-hover:opacity-100">
                  Inquire Now
                </p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-caramel text-espresso transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 sm:h-10 sm:w-10">
                <ArrowUpRight className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function OurProducts() {
  return (
    <section id="products" className="relative z-30 overflow-hidden bg-cream py-16 sm:py-20 md:py-28">
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[clamp(1.75rem,5.6vw,3.4rem)] font-semibold leading-tight text-espresso"
          >
            Our <span className="text-caramel">Products</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-espresso/60 sm:text-base"
          >
            Three ways to serve Necta — each roasted in absolute consistency  and packed
            fresh for the counter it ends up on.
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 sm:mt-12 lg:grid-cols-3 lg:gap-6">
          {ITEMS.map((item, i) => (
            <ProductCard key={item.name} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
