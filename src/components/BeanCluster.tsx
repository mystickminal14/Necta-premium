import { motion } from "framer-motion";

interface BeanSpec {
  src: string;
  top: string;
  left: string;
  size: number;
  rot: number;
  dur: number;
  op: number;
}

/**
 * Photographic coffee-bean cutouts loosely ringing the centre of the stage,
 * each drifting on its own gentle loop — so the space around the 3D model
 * never feels empty. Pointer-transparent decoration.
 */
const BEAN = "/img/bean.png";
const BEANS: BeanSpec[] = [
  { src: BEAN, top: "14%", left: "33%", size: 64, rot: -22, dur: 7.5, op: 0.95 },
  { src: BEAN, top: "19%", left: "63%", size: 50, rot: 60, dur: 8.5, op: 0.85 },
  { src: BEAN, top: "44%", left: "23%", size: 74, rot: 130, dur: 9, op: 0.9 },
  { src: BEAN, top: "58%", left: "71%", size: 58, rot: -110, dur: 7, op: 0.85 },
  { src: BEAN, top: "75%", left: "40%", size: 46, rot: 24, dur: 10, op: 0.8 },
  { src: BEAN, top: "69%", left: "56%", size: 40, rot: -40, dur: 8, op: 0.7 },
  { src: BEAN, top: "31%", left: "79%", size: 34, rot: 200, dur: 9.5, op: 0.65 },
];

export default function BeanCluster({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {BEANS.map((b, i) => (
        <motion.img
          key={i}
          src={b.src}
          alt=""
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: b.op, scale: 1, y: [0, -16, 0], rotate: [b.rot, b.rot + 6, b.rot] }}
          transition={{
            opacity: { duration: 1, delay: i * 0.08 },
            scale: { duration: 1, delay: i * 0.08 },
            y: { duration: b.dur, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: b.dur * 1.3, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ top: b.top, left: b.left, width: b.size }}
          className="absolute drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
        />
      ))}
    </div>
  );
}
