import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A horizontal snap-scroller with page arrows and dots. Pages are measured
 * from the live scroll width rather than assumed from a column count, so it
 * stays correct as the card grid reflows across breakpoints.
 *
 * `data-lenis-prevent` keeps Lenis from swallowing the inner scroll.
 */
export default function ScrollPager({
  children,
  label,
  itemClass = "w-[78%] min-[480px]:w-[46%] lg:w-[31.5%]",
}: {
  children: React.ReactNode[];
  label: string;
  /** width of each slide — controls how many cards a page shows */
  itemClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const anim = useRef<number | null>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  /* Page position is derived from scroll *progress*, not from
   * `scrollLeft / clientWidth` — the final page is nearly always a partial
   * one (it stops at maxScroll), so a raw division reports the wrong page
   * at the end of the row. */
  const pageAt = (el: HTMLDivElement, total: number) => {
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0 || total <= 1) return 0;
    return Math.round((el.scrollLeft / max) * (total - 1));
  };

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const total =
      el.scrollWidth - el.clientWidth <= 1
        ? 1
        : Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
    setPages(total);
    setPage(pageAt(el, total));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, children.length]);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setPage(pageAt(el, pages));
  };

  /**
   * Tweened by hand rather than with `behavior: "smooth"`. Lenis drives the
   * page scroll from its own rAF loop, and that silently cancels any native
   * smooth-scroll animation on a nested scroller — instant writes are the
   * only ones that survive, so we do the easing ourselves.
   */
  const goTo = (p: number) => {
    const el = ref.current;
    if (!el) return;

    const clamped = Math.max(0, Math.min(pages - 1, p));
    const max = el.scrollWidth - el.clientWidth;
    const to = Math.min(clamped * el.clientWidth, max);
    const from = el.scrollLeft;

    if (anim.current !== null) cancelAnimationFrame(anim.current);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollLeft = to;
      return;
    }

    const start = performance.now();
    const duration = 480;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.scrollLeft = from + (to - from) * (1 - Math.pow(1 - t, 3));
      anim.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    anim.current = requestAnimationFrame(step);
  };

  useEffect(
    () => () => {
      if (anim.current !== null) cancelAnimationFrame(anim.current);
    },
    [],
  );

  const atStart = page <= 0;
  const atEnd = page >= pages - 1;

  return (
    /* one reveal for the whole row — the cards inside can't use whileInView,
       so the entrance animation lives here instead */
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div
        ref={ref}
        onScroll={onScroll}
        data-lenis-prevent
        role="region"
        aria-label={label}
        /* proximity, not mandatory: a mandatory snap makes the final
           partial page unreachable, since maxScroll lands between two
           snap points and the browser rejects it */
        /* deliberately no scroll-snap: it re-snaps every intermediate value
           the tween below writes, which stalls the animation outright */
        className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:gap-5 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} className={`shrink-0 ${itemClass}`}>
            {child}
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <PagerButton label="Previous" onClick={() => goTo(page - 1)} disabled={atStart}>
            <ChevronLeft className="h-4 w-4" />
          </PagerButton>

          <div className="flex items-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page}
                className={[
                  "h-2 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  i === page ? "w-7 bg-caramel" : "w-2 bg-espresso/20 hover:bg-espresso/35",
                ].join(" ")}
              />
            ))}
          </div>

          <PagerButton label="Next" onClick={() => goTo(page + 1)} disabled={atEnd}>
            <ChevronRight className="h-4 w-4" />
          </PagerButton>
        </div>
      )}
    </motion.div>
  );
}

function PagerButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 bg-white/60 text-espresso transition-all duration-300 hover:border-caramel/50 hover:bg-caramel/15 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-espresso/15 disabled:hover:bg-white/60"
    >
      {children}
    </button>
  );
}
