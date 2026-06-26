import { useMemo } from "react";

/**
 * Decorative coffee beans drifting down through the hero. Pure CSS — no asset
 * required. Each bean gets a randomised lane, size, delay, duration and spin.
 */
export default function FallingBeans({ count = 16 }: { count?: number }) {
  const beans = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 10 + Math.random() * 18;
        return {
          id: i,
          left: Math.random() * 100,
          size,
          delay: -Math.random() * 14,
          duration: 9 + Math.random() * 10,
          drift: (Math.random() - 0.5) * 120,
          spin: 180 + Math.random() * 360,
          opacity: 0.25 + Math.random() * 0.45,
        };
      }),
    [count]
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {beans.map((b) => (
        <span
          key={b.id}
          className="bean absolute -top-10"
          style={
            {
              left: `${b.left}%`,
              width: b.size,
              height: b.size * 1.35,
              opacity: b.opacity,
              animation: `beanfall ${b.duration}s linear ${b.delay}s infinite`,
              ["--drift" as string]: `${b.drift}px`,
              ["--spin" as string]: `${b.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}

      <style>{`
        @keyframes beanfall {
          0%   { transform: translate(0, -10vh) rotate(0deg); }
          100% { transform: translate(var(--drift), 115vh) rotate(var(--spin)); }
        }
      `}</style>
    </div>
  );
}
