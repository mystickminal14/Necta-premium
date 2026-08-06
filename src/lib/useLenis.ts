import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** the live instance, so overlays can freeze the page behind them */
let instance: Lenis | null = null;

/**
 * Freezes / unfreezes page scrolling. Lenis owns the scroll, so pausing it
 * is what actually stops the background moving — the `overflow` fallback
 * covers the frame before Lenis boots and any reduced-motion setups.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    instance?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      instance?.start();
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/**
 * Boots Lenis smooth-scroll and wires it to GSAP's ScrollTrigger so that
 * pinned / scrubbed timelines stay in perfect sync with the smoothed scroll.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    instance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);
}
