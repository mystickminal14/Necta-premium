import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import ScatterBeans from "./ScatterBeans";
import a54208 from "../assets/A54208.jpeg";
import img0763 from "../assets/IMG_0763.jpg";
import nectaBand from "../assets/necta-band.jpg";
import espresso2 from "../assets/espresso-2.jpg";

/* ------------------------------------------------------------------ *
 * PLACEHOLDER CONTENT
 *
 * The client hasn't sent partner material yet, so everything below is a
 * stand-in shaped exactly like the real thing will be:
 *
 *   • CAFES  — swap `img` for the partner café photos.
 *   • VOICES — replace `quote`, and fill `name` with the person's name and
 *              `photo` with their headshot. Leave `photo` out and the card
 *              falls back to a monogram, so half-complete data still renders.
 *
 * Attribution is deliberately by role and city rather than an invented
 * person, so nothing here reads as a real endorsement before it is one.
 * ------------------------------------------------------------------ */

interface Cafe {
  img: string;
  label: string;
}

interface Voice {
  quote: string;
  name: string;
  role: string;
  photo?: string;
}

const CAFES: Cafe[] = [
  { img: a54208, label: "Partner café — counter service" },
  { img: img0763, label: "Partner café — espresso bar" },
  { img: nectaBand, label: "Partner café — table service" },
  { img: espresso2, label: "Partner café — brew bar" },
];

const VOICES: Voice[] = [
  {
    quote:
      "The roast has been consistent from the first delivery, which means our baristas dial in once and pour the same shot all week.",
    name: "Café Partner",
    role: "Owner · Kathmandu",
  },
  {
    quote:
      "They walked us through grind, dose and machine setup before we opened. It felt less like a supplier and more like a team behind the counter.",
    name: "Café Partner",
    role: "Head Barista · Pokhara",
  },
  {
    quote:
      "Our regulars started asking where the beans come from. Being able to say a Nepali farm, by name, changed how we sell coffee.",
    name: "Café Partner",
    role: "Founder · Lalitpur",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const monogram = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function VoiceCard({ v, i }: { v: Voice; i: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
      className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-leaf-2/80 p-5 shadow-2xl backdrop-blur-sm transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-caramel/40 sm:p-6"
    >
      <Quote className="h-6 w-6 shrink-0 text-caramel-light/70" />

      <blockquote className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-cream/80 sm:mt-4 sm:text-base">
        {v.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-cream/10 pt-4">
        {v.photo ? (
          <img
            src={v.photo}
            alt={v.name}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/20 text-sm font-bold text-caramel-light">
            {monogram(v.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-cream">{v.name}</p>
          <p className="truncate text-[0.78rem] text-cream/55">{v.role}</p>
        </div>
      </figcaption>
    </motion.figure>
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
            a taste of history in every cup
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-2 text-[clamp(1.75rem,5.6vw,3.6rem)] font-bold leading-[1.08]"
          >
            From Our Roastery, <span className="text-caramel-light">To Your Hands.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-cream/65 sm:text-lg"
          >
            The cafés pouring Necta are the ones who keep us honest — here's what
            it's like working with us.
          </motion.p>
        </div>

        {/* CAFÉ PHOTOS — a scrolling strip on phones, a full row from sm up */}
        <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
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

        {/* TESTIMONIALS */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          {VOICES.map((v, i) => (
            <VoiceCard key={v.role} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
