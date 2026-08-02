import ScatterBeans from "./ScatterBeans";

const WORDS = [
  "Nepal Origin",

  "Freshly Roasted",
  "Single Origin",
  "Small Batch",
  "Handpicked",
  "Nepal Grown",
  "Fully Washed",
];


export default function BeansBand() {
  const row = [...WORDS, ...WORDS];
  return (
    <section className="relative overflow-hidden bg-espresso py-14 text-cream sm:py-20">
      <ScatterBeans count={10} />

      <div className="relative mb-8 text-center">
        <p className="font-hand text-3xl text-caramel-light sm:text-4xl">Our Value Chain</p>
      </div>

      {/* marquee */}
      <div className="relative flex select-none overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center">
          {row.map((w, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold tracking-tight text-cream/90">
                {w}
              </span>
              <span className="bean h-3 w-2.5 shrink-0 opacity-70" />
            </span>
          ))}
        </div>
        <div aria-hidden className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center">
          {row.map((w, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold tracking-tight text-cream/90">
                {w}
              </span>
              <span className="bean h-3 w-2.5 shrink-0 opacity-70" />
            </span>
          ))}
        </div>
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-espresso to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-espresso to-transparent" />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
