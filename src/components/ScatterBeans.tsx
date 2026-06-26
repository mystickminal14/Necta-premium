import { useMemo } from "react";

/**
 * Small coffee beans scattered statically across a section — subtle decoration.
 * Pure CSS beans (.bean), low opacity, gentle random placement & rotation.
 */
export default function ScatterBeans({
  count = 8,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const beans = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 92,
        left: Math.random() * 94,
        size: 8 + Math.random() * 14,
        rot: Math.random() * 360,
        op: 0.12 + Math.random() * 0.22,
      })),
    [count]
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {beans.map((b) => (
        <span
          key={b.id}
          className="bean absolute"
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 1.35,
            opacity: b.op,
            transform: `rotate(${b.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}
