import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Candy,
  Citrus,
  Coffee,
  Cookie,
  Droplets,
  FlaskConical,
  Flower2,
  Layers,
  Leaf,
  Sprout,
  Waves,
} from "lucide-react";
import type { ReactNode } from "react";
import ScatterBeans from "./ScatterBeans";
import pouch from "../assets/necta-cofe-nags.png";

/* ------------------------------------------------------------------ *
 * Data — one entry per roast. The packet artwork is shared; the band,
 * tint and glow are what make each roast read differently. Swap
 * `image` per roast the day we get three real packet renders.
 * ------------------------------------------------------------------ */

interface Card {
  icon: ReactNode;
  top: string;
  title: string;
}

interface Roast {
  id: string;
  label: string;
  band: { bg: string; fg: string };
  tint: string;
  glow: string;
  wash: string;
  left: [Card, Card, Card];
  right: [Card, Card, Card];
}

const ic = "h-5 w-5";

const ROASTS: Roast[] = [
  {
    id: "light",
    label: "Light Roast",
    band: { bg: "#d9b382", fg: "#241308" },
    tint: "brightness(1.06) saturate(0.94)",
    glow: "rgba(205,160,106,0.30)",
    wash: "radial-gradient(58% 48% at 50% 42%, rgba(205,160,106,0.20), transparent 72%)",
    left: [
      { icon: <Citrus className={ic} />, top: "Acidity", title: "Bright Acidity" },
      { icon: <Droplets className={ic} />, top: "Body", title: "Medium Body" },
      { icon: <Waves className={ic} />, top: "Aftertaste", title: "Balanced Aftertaste" },
    ],
    right: [
      { icon: <FlaskConical className={ic} />, top: "Brew Method", title: "Suitable for Filter Brew" },
      { icon: <Flower2 className={ic} />, top: "Tasting Notes", title: "Floral Notes" },
      { icon: <Sprout className={ic} />, top: "Sourcing", title: "Single Origin" },
    ],
  },
  {
    id: "medium",
    label: "Medium Roast",
    band: { bg: "#b07a3c", fg: "#f4ecdd" },
    tint: "none",
    glow: "rgba(176,122,60,0.34)",
    wash: "radial-gradient(58% 48% at 50% 42%, rgba(176,122,60,0.22), transparent 72%)",
    left: [
      { icon: <Citrus className={ic} />, top: "Acidity", title: "Medium Acidity" },
      { icon: <Droplets className={ic} />, top: "Body", title: "Medium Body" },
      { icon: <Waves className={ic} />, top: "Aftertaste", title: "Balanced Aftertaste" },
    ],
    right: [
      { icon: <Coffee className={ic} />, top: "Brew Method", title: "Suitable for Espresso" },
      { icon: <Candy className={ic} />, top: "Tasting Notes", title: "Caramel Notes" },
      { icon: <Layers className={ic} />, top: "Sourcing", title: "Single / Blend" },
    ],
  },
  {
    id: "medium-dark",
    label: "Medium Dark Roast",
    band: { bg: "#3a2416", fg: "#e8d8bd" },
    tint: "brightness(0.9) saturate(1.1) contrast(1.05)",
    glow: "rgba(107,66,38,0.38)",
    wash: "radial-gradient(58% 48% at 50% 42%, rgba(107,66,38,0.26), transparent 72%)",
    left: [
      { icon: <Citrus className={ic} />, top: "Acidity", title: "Low Acidity" },
      { icon: <Droplets className={ic} />, top: "Body", title: "Medium Body" },
      { icon: <Leaf className={ic} />, top: "Aftertaste", title: "Tea Like Notes" },
    ],
    right: [
      { icon: <Coffee className={ic} />, top: "Brew Method", title: "Suitable for Espresso" },
      { icon: <Cookie className={ic} />, top: "Tasting Notes", title: "Cocoa Notes" },
      { icon: <Layers className={ic} />, top: "Sourcing", title: "Blend" },
    ],
  },
];

/* card slots around the packet — position is fixed, contents swap per roast.
   `ring` drives the ripple: the cards nearest the packet change first. */
const SLOTS = [
  { side: "left", i: 0, x: -400, y: -170, ring: 1 },
  { side: "left", i: 1, x: -450, y: 10, ring: 0 },
  { side: "left", i: 2, x: -400, y: 190, ring: 2 },
  { side: "right", i: 0, x: 400, y: -170, ring: 1 },
  { side: "right", i: 1, x: 450, y: 10, ring: 0 },
  { side: "right", i: 2, x: 400, y: 190, ring: 2 },
] as const;

const GREEN = "bg-[radial-gradient(120%_100%_at_50%_0%,#34543f_0%,#24412f_45%,#1c352a_100%)]";
const EASE = [0.16, 1, 0.3, 1] as const;
const FLIP_MS = 0.75;
const AUTO_MS = 5200;

const BG_BEANS = [
  { top: "16%", left: "12%", w: 56, rot: -22, dur: 8 },
  { top: "68%", left: "8%", w: 40, rot: 60, dur: 9.5 },
  { top: "22%", left: "84%", w: 48, rot: 130, dur: 8.5 },
  { top: "76%", left: "88%", w: 36, rot: -40, dur: 10 },
];

/* ------------------------------------------------------------------ *
 * Roast state — a two-faced packet.
 *
 * The packet has a front and a back face. Picking a roast writes it to
 * whichever face is currently hidden, then spins the packet 180°. The
 * artwork therefore changes while the packet is edge-on and invisible,
 * which is what sells it as a real object turning around. Clicking
 * mid-flip just queues another half-turn, so it can never desync.
 * ------------------------------------------------------------------ */
interface FlipState {
  turns: number;
  faces: [number, number];
}

const parityOf = (turns: number) => ((turns % 2) + 2) % 2;

function useRoastFlip() {
  const [st, setSt] = useState<FlipState>({ turns: 0, faces: [0, 0] });
  const activeIndex = st.faces[parityOf(st.turns)];

  // both updaters are pure, so `select`/`advance` stay referentially stable
  const select = useCallback((next: number) => {
    setSt((s) => {
      const p = parityOf(s.turns);
      const cur = s.faces[p];
      if (cur === next) return s;
      const faces: [number, number] = [s.faces[0], s.faces[1]];
      faces[1 - p] = next;
      // spin forward when moving right along the tabs, back when moving left
      return { turns: s.turns + (next > cur ? 1 : -1), faces };
    });
  }, []);

  const advance = useCallback(() => {
    setSt((s) => {
      const p = parityOf(s.turns);
      const faces: [number, number] = [s.faces[0], s.faces[1]];
      faces[1 - p] = (s.faces[p] + 1) % ROASTS.length;
      return { turns: s.turns + 1, faces };
    });
  }, []);

  return { turns: st.turns, faces: st.faces, activeIndex, select, advance };
}

/* ---------------------------- packet ---------------------------- */

function PacketFace({ roast, back = false }: { roast: Roast; back?: boolean }) {
  return (
    <div
      className={back ? "absolute inset-0" : "relative"}
      style={{ backfaceVisibility: "hidden", transform: back ? "rotateY(180deg)" : undefined }}
    >
      <img
        src={pouch}
        alt={`Necta Coffee — ${roast.label}`}
        className="w-full drop-shadow-[0_50px_80px_rgba(0,0,0,0.65)] transition-[filter] duration-500"
        style={{ filter: roast.tint }}
      />
      {/* roast band — sits over the printed strip at the foot of the label */}
      <div
        className="absolute grid place-items-center overflow-hidden rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-colors duration-500"
        style={{
          left: "13.4%",
          width: "74%",
          top: "79%",
          height: "6.6%",
          background: roast.band.bg,
          color: roast.band.fg,
        }}
      >
        <span className="text-[0.56rem] font-bold uppercase leading-none tracking-[0.22em]">
          {roast.label}
        </span>
      </div>
    </div>
  );
}

function Packet({
  turns,
  faces,
  active,
  reduce,
  className = "",
}: {
  turns: number;
  faces: [number, number];
  active: Roast;
  reduce: boolean;
  className?: string;
}) {
  // keyframes are memoised on `turns` so unrelated re-renders never re-trigger the toss
  const target = useMemo(
    () =>
      reduce
        ? { rotateY: 0, scale: 1, y: 0 }
        : { rotateY: turns * 180, scale: [1, 0.9, 1], y: [0, -22, 0] },
    [turns, reduce]
  );

  return (
    <div className={`relative ${className}`} style={{ perspective: 1400 }}>
      {/* glow lives outside the flipper so it doesn't spin with the packet */}
      <motion.div
        aria-hidden
        animate={{ backgroundColor: active.glow }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
      />

      <motion.div
        animate={target}
        transition={{
          rotateY: { duration: FLIP_MS, ease: EASE },
          scale: { duration: FLIP_MS, times: [0, 0.5, 1], ease: "easeInOut" },
          y: { duration: FLIP_MS, times: [0, 0.5, 1], ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        <PacketFace roast={ROASTS[faces[0]]} />
        <PacketFace roast={ROASTS[faces[1]]} back />
      </motion.div>

      {/* floor shadow — shrinks as the packet lifts off */}
      <motion.div
        aria-hidden
        animate={reduce ? { scaleX: 1, opacity: 0.45 } : { scaleX: [1, 0.7, 1], opacity: [0.45, 0.2, 0.45] }}
        transition={{ duration: FLIP_MS, times: [0, 0.5, 1], ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-6 left-1/2 h-6 w-[60%] -translate-x-1/2 rounded-[50%] bg-black blur-xl"
      />
    </div>
  );
}

/* ---------------------------- cards ---------------------------- */

function RoastCard({
  card,
  roastId,
  align,
  ring,
  reduce,
}: {
  card: Card;
  roastId: string;
  align: "left" | "right";
  ring: number;
  reduce: boolean;
}) {
  const right = align === "right";
  // min-height keeps the stacked mobile list from jumping in the gap between
  // one card's exit and the next card's entrance
  return (
    <div className="min-h-[4.75rem]" style={{ perspective: 900 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={roastId}
          initial={reduce ? { opacity: 0 } : { rotateX: -78, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { rotateX: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { rotateX: 70, opacity: 0 }}
          transition={{
            duration: 0.24,
            ease: "easeOut",
            delay: reduce ? 0 : ring * 0.06,
          }}
          style={{ transformOrigin: "center bottom" }}
          className={`flex items-center gap-2.5 rounded-2xl border border-cream/15 bg-leaf-2/90 p-3 shadow-2xl backdrop-blur-sm sm:gap-3 sm:p-4 ${
            right ? "flex-row-reverse text-right" : "text-left"
          }`}
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-caramel/20 text-caramel-light sm:h-11 sm:w-11">
            {card.icon}
          </div>
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-caramel-light">{card.top}</p>
            <p className="text-sm font-semibold leading-tight text-cream">{card.title}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------- chrome ---------------------------- */

const Heading = () => (
  <div className="mx-auto max-w-2xl text-center">
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="font-hand text-2xl text-caramel-light sm:text-3xl"
    >
Choose Your Roast    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mt-1 text-[clamp(1.5rem,5.4vw,3.2rem)] font-bold leading-tight text-cream"
    >
      Everything You Need <br/><span className="text-caramel-light">For Your Café</span>
    </motion.h2>
  </div>
);

function Tabs({
  activeIndex,
  onSelect,
  layoutId,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
  layoutId: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Roast profile"
      className="mx-auto mt-7 flex max-w-full snap-x gap-2 overflow-x-auto rounded-full border border-cream/15 bg-leaf/50 p-1.5 backdrop-blur-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-fit"
    >
      {ROASTS.map((r, i) => {
        const on = i === activeIndex;
        return (
          <button
            key={r.id}
            role="tab"
            aria-selected={on}
            onClick={() => onSelect(i)}
            className={`relative shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] transition-colors sm:px-5 sm:py-2.5 sm:text-[0.7rem] sm:tracking-[0.16em] ${
              on ? "text-espresso" : "text-cream/65 hover:text-cream"
            }`}
          >
            {on && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-caramel-light"
              />
            )}
            <span className="relative z-10">{r.label}</span>
          </button>
        );
      })}
    </div>
  );
}

const Beans = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    {BG_BEANS.map((b, i) => (
      <motion.img
        key={i}
        src="/img/bean.png"
        alt=""
        animate={{ y: [0, -16, 0], rotate: [b.rot, b.rot + 8, b.rot] }}
        transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: b.top, left: b.left, width: b.w }}
        className="absolute opacity-60 drop-shadow-[0_12px_22px_rgba(0,0,0,0.4)]"
      />
    ))}
  </div>
);

/* per-roast warm wash over the green — ties the whole stage to the choice */
const Wash = ({ activeIndex }: { activeIndex: number }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    {ROASTS.map((r, i) => (
      <motion.div
        key={r.id}
        animate={{ opacity: i === activeIndex ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0"
        style={{ background: r.wash }}
      />
    ))}
  </div>
);

/* ---------------------------- stages ---------------------------- */

function DesktopStage(s: ReturnType<typeof useRoastFlip> & { reduce: boolean; onPick: (i: number) => void }) {
  const active = ROASTS[s.activeIndex];

  return (
    <section className={`relative hidden overflow-hidden py-24 text-cream lg:block ${GREEN}`}>
      <div className="grain absolute inset-0" />
      <Wash activeIndex={s.activeIndex} />
      <ScatterBeans count={14} />
      <Beans />

      <div className="relative mx-auto max-w-7xl px-8">
        <Heading />
        <Tabs activeIndex={s.activeIndex} onSelect={s.onPick} layoutId="roast-tab-desktop" />

        <div className="relative mt-4 h-[42rem]">
          <motion.div
            initial={{ opacity: 0, y: 220 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute left-1/2 top-1/2 z-10 w-64 -translate-x-1/2 -translate-y-1/2"
          >
            <Packet turns={s.turns} faces={s.faces} active={active} reduce={s.reduce} />
          </motion.div>

          {SLOTS.map((slot) => (
            <div
              key={`${slot.side}-${slot.i}`}
              className="absolute left-1/2 top-1/2 z-30 w-64 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, x: slot.x, y: slot.y, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.5 + slot.ring * 0.12 }}
              >
                <RoastCard
                  card={active[slot.side][slot.i]}
                  roastId={active.id}
                  align={slot.side}
                  ring={slot.ring}
                  reduce={s.reduce}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileStage(s: ReturnType<typeof useRoastFlip> & { reduce: boolean; onPick: (i: number) => void }) {
  const active = ROASTS[s.activeIndex];
  const cards = [...active.left, ...active.right];

  return (
    <section className={`relative overflow-hidden py-16 text-cream lg:hidden ${GREEN}`}>
      <div className="grain absolute inset-0" />
      <Wash activeIndex={s.activeIndex} />
      <ScatterBeans count={10} />
      <Beans />

      <div className="relative mx-auto max-w-md px-4">
        <Heading />
        <Tabs activeIndex={s.activeIndex} onSelect={s.onPick} layoutId="roast-tab-mobile" />

        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto my-12 w-full max-w-[15rem]"
        >
          <Packet turns={s.turns} faces={s.faces} active={active} reduce={s.reduce} />
        </motion.div>

        <div className="flex flex-col gap-3">
          {cards.map((card, i) => (
            <RoastCard
              key={i}
              card={card}
              roastId={active.id}
              align="left"
              ring={i % 3}
              reduce={s.reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- root ---------------------------- */

export default function BeansChosen() {
  const flip = useRoastFlip();
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [locked, setLocked] = useState(false);

  const { select } = flip;
  const onPick = useCallback(
    (i: number) => {
      setLocked(true); // a real click stops the auto-cycle for good
      select(i);
    },
    [select]
  );

  // auto-cycle so the flip gets discovered without a click, until the user takes over
  const { advance } = flip;
  useEffect(() => {
    if (locked || reduce || !inView) return;
    const id = setInterval(advance, AUTO_MS);
    return () => clearInterval(id);
  }, [locked, reduce, inView, advance]);

  // the anchor lives on the wrapper, not the desktop stage — that section is
  // display:none below lg, which would make #roast unreachable on phones
  return (
    <div id="roast" ref={ref}>
      <DesktopStage {...flip} reduce={reduce} onPick={onPick} />
      <MobileStage {...flip} reduce={reduce} onPick={onPick} />
    </div>
  );
}
