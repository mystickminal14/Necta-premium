import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface Grade {
  name: string;
  segment: number; // 1–4, also the number of filled bars
  blurb: string;
}

const grades: Grade[] = [
  {
    name: "Premium Beans",
    segment: 4,
    blurb: "Our finest lot — top screen size, fully washed, an immaculate cup.",
  },
  {
    name: "Deluxe Beans",
    segment: 3,
    blurb: "Exceptional everyday premium. Rich, balanced and clean.",
  },
  {
    name: "Standard Beans",
    segment: 2,
    blurb: "Dependable house grade. Smooth and consistent, day in, day out.",
  },
  {
    name: "Practice Beans",
    segment: 1,
    blurb: "Perfect for dialing in your brew and training your palate.",
  },
];

export default function Quality() {
  return (
    <section
      id="grades"
      className="relative z-30 overflow-hidden bg-cream py-20 sm:py-28"
    >
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* LEFT — image stack */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-25px_rgba(36,19,8,0.6)]">
            <img
              src="/img/green-beans.png"
              alt="Fully washed parchment coffee beans"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          {/* floating pouch */}
          <img
            src="/img/pouch-front.png"
            alt="Necta Coffee pouch"
            className="absolute -bottom-8 -right-4 w-32 rotate-6 rounded-2xl shadow-2xl sm:w-40"
          />
          <div className="absolute -left-4 top-6 rounded-2xl bg-leaf px-4 py-3 text-cream shadow-xl">
            <p className="font-hand text-2xl leading-none text-caramel-light">
              taste you want
            </p>
          </div>
        </motion.div>

        {/* RIGHT — grades */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-hand text-2xl text-caramel sm:text-3xl"
          >
            fully washed parchment
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 max-w-md text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-espresso"
          >
            Beans, Just The Way{" "}
            <span className="text-caramel">You Want</span>
          </motion.h2>

          <p className="mt-4 max-w-md text-base text-espresso/65">
            We grade every harvest into four distinct segments — so whether
            you&apos;re a café, a roaster, or a home brewer, there&apos;s a Necta
            lot made for you.
          </p>

          <div className="mt-8 space-y-3">
            {grades.map((g, i) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
              >
                <GradeRow {...g} />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-[1.03] hover:bg-espresso-2 sm:text-base"
            >
              <MessageCircle className="h-4 w-4" />
              DM us for a sample
            </a>
            <span className="text-sm text-espresso/55">
              Not sure which grade? We&apos;ll help you choose.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GradeRow({ name, segment, blurb }: Grade) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-espresso/10 bg-white/60 p-4 transition-all duration-300 hover:border-caramel/50 hover:bg-white">
      {/* segment indicator */}
      <div className="flex shrink-0 flex-col-reverse gap-1">
        {[1, 2, 3, 4].map((b) => (
          <span
            key={b}
            className={`h-2 w-8 rounded-full transition-colors ${
              b <= segment ? "bg-caramel" : "bg-espresso/10"
            }`}
          />
        ))}
      </div>

      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-base font-bold text-espresso sm:text-lg">
            {name}
          </h3>
          <span className="shrink-0 rounded-full bg-espresso/5 px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider text-espresso/60">
            Segment {segment}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-espresso/60">{blurb}</p>
      </div>
    </div>
  );
}
