/**
 * A tiny mutable store shared between the GSAP/ScrollTrigger world (DOM)
 * and the react-three-fiber render loop. The Canvas reads `hero` every
 * frame and lerps the model towards it, so there is no React re-render
 * on scroll (keeps things buttery on the 3D side).
 */
export const scrollState = {
  /** hero choreography progress, 0 (right, in hero) → 1 (centered, zoomed) */
  hero: 0,
};
