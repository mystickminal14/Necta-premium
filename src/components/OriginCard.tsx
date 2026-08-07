import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Origin } from "../lib/products";
import { contactLink } from "../lib/enquiry";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * An origin, not a SKU — no pricing, pack sizes or roast profiles.
 *
 * The card rests as a photo with just the district name, and reveals the
 * detail on hover. On touch there is no hover to discover, so the overlay
 * sits open from `md` down — hence the `md:` prefixes on the hidden state
 * rather than plain ones.
 */
export default function OriginCard({ o, i }: { o: Origin; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
      className="h-full"
    >
      <Link
        to={contactLink("origin", o.name)}
        aria-label={`Enquire about ${o.name} single origin`}
        className="group relative block h-full overflow-hidden rounded-[1.5rem] border border-espresso/10 shadow-[0_20px_50px_-32px_rgba(36,19,8,0.7)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-caramel/40 hover:shadow-[0_34px_60px_-30px_rgba(36,19,8,0.65)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-3">
          <img
            src={o.img}
            alt={`${o.name} single origin coffee`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />

          {/* resting scrim — deepens on hover so the revealed copy stays legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/45 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            {/* display serif, same treatment as the "Cold Brew" / "Single
                Origin" product cards. Scales down on ~300px phones —
                "Sindhupalchowk" is 14 characters and overflows at full size */}
            <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-cream min-[400px]:text-[1.95rem] sm:text-[2.2rem]">
              {o.name}
            </h3>

            {/* the reveal: folded away on pointer devices, open on touch */}
            <div className="md:grid md:grid-rows-[0fr] md:transition-[grid-template-rows] md:duration-500 md:ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:grid-rows-[1fr]">
              <div className="md:overflow-hidden">
                <p className="mt-2.5 text-[0.82rem] leading-relaxed text-cream/75">
                  {o.blurb}
                </p>

                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {o.notes.map((n) => (
                    <li
                      key={n}
                      className="rounded-md border border-caramel/40 bg-caramel/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-caramel-light"
                    >
                      {n}
                    </li>
                  ))}
                </ul>

                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-caramel-light">
                  Enquire about this origin
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
