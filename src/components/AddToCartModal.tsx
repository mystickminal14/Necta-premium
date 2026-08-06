import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "../lib/cart";
import { useScrollLock } from "../lib/useLenis";
import { kgLabel, npr } from "../lib/products";
import type { Product } from "../lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;
const MAX_QTY = 99;

/**
 * Asks how much coffee before anything lands in the cart: which pack size,
 * and how many bags of it. The running "= 2.5 kg" readout is the point —
 * customers think in kilos, but we sell in fixed pack sizes.
 */
export default function AddToCartModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { add, setOpen } = useCart();
  const [packIndex, setPackIndex] = useState(0);
  const [qty, setQty] = useState(1);

  useScrollLock(!!product);

  // fresh selection every time a different product opens the sheet
  useEffect(() => {
    if (product) {
      setPackIndex(0);
      setQty(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  const pack = product?.packs[packIndex];

  const submit = () => {
    if (!product || !pack) return;
    add(product, pack, qty);
    onClose();
    setOpen(true); // slide the cart open so the addition is visible
  };

  return (
    <AnimatePresence>
      {product && pack && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-espresso/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Add ${product.name} to cart`}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-t-[1.75rem] border border-espresso/10 bg-cream shadow-[0_30px_80px_-30px_rgba(36,19,8,0.7)] sm:rounded-[1.75rem]"
          >
            {/* product header */}
            <div className="flex items-start gap-4 border-b border-espresso/10 p-5">
              <img
                src={product.img}
                alt=""
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold leading-tight text-espresso">{product.name}</h3>
                <p className="mt-1 text-[0.78rem] leading-relaxed text-espresso/55">
                  {product.roast}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-espresso/5 text-espresso/70 transition-colors hover:bg-espresso/10 hover:text-espresso"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              {/* pack size */}
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-espresso/50">
                Pack size
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {product.packs.map((p, i) => (
                  <button
                    key={p.size}
                    onClick={() => setPackIndex(i)}
                    aria-pressed={i === packIndex}
                    className={[
                      "rounded-xl border px-2 py-2.5 text-center transition-all duration-300",
                      i === packIndex
                        ? "border-caramel bg-caramel/15 text-espresso"
                        : "border-espresso/15 bg-white/50 text-espresso/70 hover:border-caramel/40",
                    ].join(" ")}
                  >
                    <span className="block text-sm font-bold">{p.size}</span>
                    <span className="mt-0.5 block text-[0.7rem] tabular-nums text-espresso/55">
                      {npr(p.price)}
                    </span>
                  </button>
                ))}
              </div>

              {/* how many bags */}
              <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-espresso/50">
                How many bags?
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full border border-espresso/15 bg-white/50 p-1">
                  <Stepper
                    label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Stepper>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={MAX_QTY}
                    value={qty}
                    onChange={(e) => {
                      const n = Number.parseInt(e.target.value, 10);
                      setQty(Number.isNaN(n) ? 1 : Math.min(MAX_QTY, Math.max(1, n)));
                    }}
                    aria-label="Quantity"
                    className="w-12 border-0 bg-transparent text-center text-base font-bold tabular-nums text-espresso focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Stepper
                    label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                    disabled={qty >= MAX_QTY}
                  >
                    <Plus className="h-4 w-4" />
                  </Stepper>
                </div>
                <p className="text-sm text-espresso/60">
                  = <span className="font-bold text-espresso">{kgLabel(pack.kg * qty)}</span> of
                  coffee
                </p>
              </div>

              {/* total + confirm */}
              <div className="mt-5 flex items-center justify-between border-t border-espresso/10 pt-4">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-espresso/50">
                  Subtotal
                </span>
                <span className="text-xl font-bold tabular-nums text-espresso">
                  {npr(pack.price * qty)}
                </span>
              </div>

              <button
                onClick={submit}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-[1.01] hover:bg-espresso-2"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to cart
              </button>
              <p className="mt-2.5 text-center text-[0.72rem] leading-relaxed text-espresso/45">
                No payment here — you&apos;ll confirm the order over WhatsApp or email.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stepper({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-8 w-8 place-items-center rounded-full text-espresso transition-colors hover:bg-espresso/8 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}
