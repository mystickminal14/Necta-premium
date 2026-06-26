import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sprout, Mountain, Droplets, Flame, ScanLine, PackageCheck, Leaf, Coffee, HeartHandshake } from "lucide-react";
import type { ReactNode } from "react";
import CoffeeScene from "../three/CoffeeScene";
import ScatterBeans from "./ScatterBeans";
import BeanCluster from "./BeanCluster";
import { scrollState } from "../lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

interface Feat { icon: ReactNode; top: string; title: string; angle: number; }

const FEATURES: Feat[] = [
  { icon: <Sprout className="h-5 w-5" />, top: "Handpicked", title: "Single-Origin Nepali Beans", angle: -32 },
  { icon: <Droplets className="h-5 w-5" />, top: "Fully Washed", title: "Clean, Bright & Balanced", angle: 0 },
  { icon: <Flame className="h-5 w-5" />, top: "Small-Batch", title: "Roasted Fresh Weekly", angle: 32 },
  { icon: <PackageCheck className="h-5 w-5" />, top: "Aroma-Locked", title: "Nitrogen-Sealed Fresh", angle: 148 },
  { icon: <Mountain className="h-5 w-5" />, top: "High Altitude", title: "Grown Above 1,200m", angle: 180 },
  { icon: <ScanLine className="h-5 w-5" />, top: "Graded & Sorted", title: "Premium Screen Size", angle: 212 },
];

const VALUES = [
  { icon: <Leaf className="h-4 w-4" />, label: "Ethically Sourced" },
  { icon: <Coffee className="h-4 w-4" />, label: "Roasted With Care" },
  { icon: <HeartHandshake className="h-4 w-4" />, label: "People First" },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function Stage() {
  const wrapper = useRef<HTMLDivElement>(null);
  const aboutLayer = useRef<HTMLDivElement>(null);
  const greenLayer = useRef<HTMLDivElement>(null);
  const whyHead = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const apply = (p: number) => {
        scrollState.hero = clamp01(p / 0.42); // model: right → down-centre

        const ap = clamp01(p / 0.32); // about fades out
        gsap.set(aboutLayer.current, { autoAlpha: 1 - ap, y: -40 * ap });
        gsap.set(hint.current, { autoAlpha: 1 - clamp01(p / 0.12) });

        gsap.set(greenLayer.current, { autoAlpha: clamp01((p - 0.3) / 0.22) });

        const fp = clamp01((p - 0.42) / 0.5);
        gsap.set(whyHead.current, { autoAlpha: fp, y: 30 * (1 - fp) });

        const rx = Math.min(window.innerWidth * 0.33, 440);
        const ry = Math.min(window.innerHeight * 0.3, 240);
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const cp = clamp01(fp * 1.35 - i * 0.06);
          const e = easeOut(cp);
          const rad = (FEATURES[i].angle * Math.PI) / 180;
          gsap.set(el, { x: rx * Math.cos(rad) * e, y: ry * Math.sin(rad) * e, scale: 0.7 + 0.3 * e, autoAlpha: cp });
        });
      };

      ScrollTrigger.create({
        trigger: wrapper.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (s) => apply(s.progress),
        onRefresh: (s) => apply(s.progress),
      });
    }, wrapper);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapper} id="about" className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* backgrounds — dark espresso (About) → green (Why), distinct from the cream hero */}
        <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_78%_-10%,#3a2416_0%,#2a1810_45%,#1a0d06_100%)]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-luminosity"
            style={{ backgroundImage: "url('/img/beans-texture.jpg')" }}
          />
          <div className="grain absolute inset-0" />
        </div>
        <div ref={greenLayer} className="absolute inset-0 opacity-0 bg-[radial-gradient(120%_100%_at_50%_0%,#34543f_0%,#24412f_45%,#1c352a_100%)]">
          <div className="grain absolute inset-0" />
        </div>

        <ScatterBeans count={12} />

        {/* soft glow + photographic beans ringing the model (fills the space) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[58vh] w-[58vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/15 blur-[90px]" />
        <BeanCluster className="z-10" />

        {/* 3D model layer */}
        <div className="absolute inset-0 z-20">
          <CoffeeScene />
        </div>

        {/* ABOUT layer (left copy) */}
        <div ref={aboutLayer} className="pointer-events-none absolute inset-0 z-30">
          <div className="mx-auto grid h-full max-w-7xl grid-cols-2 items-center px-8">
            <div className="pointer-events-auto max-w-xl">
              <p className="font-hand text-3xl text-caramel-light">about us</p>
              <h2 className="mt-2 text-[clamp(2.4rem,4.6vw,4rem)] font-bold leading-[1.02] tracking-tight text-cream">
                A small roastery, <br />
                a <span className="text-caramel-light">big</span> love for coffee.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">
                Necta Coffee works hand-in-hand with farmers across Nepal&apos;s
                highlands — selecting only the ripest cherries and roasting them
                in small batches, so every cup tastes the way it should.
              </p>
              <p className="mt-3 max-w-md text-base leading-relaxed text-cream/50">
                No shortcuts, no mass roasting. Just honest coffee, delivered fresh.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {VALUES.map((v) => (
                  <span key={v.label} className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-sm font-medium text-cream/90 backdrop-blur-sm">
                    <span className="text-caramel-light">{v.icon}</span>
                    {v.label}
                  </span>
                ))}
              </div>
            </div>
            <div />
          </div>
        </div>

        {/* WHY heading */}
        <div ref={whyHead} id="why" className="pointer-events-none absolute left-1/2 top-[9%] z-30 -translate-x-1/2 text-center opacity-0">
          <p className="font-hand text-2xl text-caramel-light">why choose us</p>
          <h2 className="mt-1 text-[clamp(1.9rem,3.6vw,3rem)] font-bold text-cream">
            Every Bean, Carefully <span className="text-caramel-light">Chosen</span>
          </h2>
        </div>

        {/* ORBIT cards */}
        <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center">
          <div className="relative">
            {FEATURES.map((f, i) => (
              <div key={f.top} ref={(el) => { cardRefs.current[i] = el; }} className="absolute left-1/2 top-1/2 w-60 -translate-x-1/2 -translate-y-1/2 opacity-0">
                <div className="flex items-center gap-3 rounded-2xl border border-cream/15 bg-leaf-2/85 p-4 text-left shadow-2xl backdrop-blur-sm">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/20 text-caramel-light">{f.icon}</div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-wider text-caramel-light">{f.top}</p>
                    <p className="text-sm font-semibold leading-tight text-cream">{f.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div ref={hint} className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/55">
          <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-cream/30 pt-1.5">
            <span className="h-2 w-0.5 animate-bounce rounded-full bg-cream/50" />
          </span>
        </div>
      </div>
    </section>
  );
}
