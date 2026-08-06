import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "../lib/cart";
import { useScrollLock } from "../lib/useLenis";
import { kgLabel, npr } from "../lib/products";
import { buildOrder, channelUrl, ORDER_EMAIL } from "../lib/order";
import type { Channel, Customer } from "../lib/order";

const EASE = [0.16, 1, 0.3, 1] as const;

const inputCls =
  "w-full rounded-xl border border-espresso/15 bg-white/60 px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/35 transition-colors focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel/20";

const EMPTY: Customer = { name: "", phone: "", address: "", notes: "" };

type Step = "cart" | "checkout" | "sent";

/**
 * The cart itself plus the checkout hand-off. There is no payment step —
 * the order is formatted and opened in WhatsApp or the customer's mail
 * client, whichever they pick, and Necta confirms from there.
 */
export default function CartDrawer() {
  const { lines, count, totalKg, subtotal, setQty, remove, clear, open, setOpen } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [customer, setCustomer] = useState<Customer>(EMPTY);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  // an emptied cart has nothing to check out
  useEffect(() => {
    if (lines.length === 0 && step === "checkout") setStep("cart");
  }, [lines.length, step]);

  const set =
    (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setCustomer((c) => ({ ...c, [k]: e.target.value }));

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = buildOrder(lines, customer);
    // opened in a new tab so the site (and the cart) survives the hand-off
    window.open(channelUrl(channel, order), "_blank", "noopener,noreferrer");
    setStep("sent");
  };

  return (
    /* rewind to the cart view only once the drawer is fully gone, so the
       reset never flashes on screen during the close animation */
    <AnimatePresence onExitComplete={() => setStep("cart")}>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-espresso/50 backdrop-blur-sm"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-y-0 right-0 z-[65] flex w-full max-w-md flex-col border-l border-espresso/10 bg-cream shadow-[-20px_0_60px_-30px_rgba(36,19,8,0.8)]"
          >
            {/* header */}
            <header className="flex items-center gap-3 border-b border-espresso/10 px-5 py-4">
              {step === "checkout" && (
                <button
                  onClick={() => setStep("cart")}
                  aria-label="Back to cart"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-espresso/5 text-espresso/70 transition-colors hover:bg-espresso/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <h2 className="flex-1 text-lg font-bold text-espresso">
                {step === "cart" && "Your cart"}
                {step === "checkout" && "Checkout"}
                {step === "sent" && "Order sent"}
              </h2>
              {step === "cart" && count > 0 && (
                <span className="rounded-full bg-caramel px-2.5 py-1 text-[0.68rem] font-bold text-espresso">
                  {count} {count === 1 ? "bag" : "bags"}
                </span>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-espresso/5 text-espresso/70 transition-colors hover:bg-espresso/10 hover:text-espresso"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* ---------------- cart ---------------- */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4" data-lenis-prevent>
                  {lines.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <ShoppingBag className="h-12 w-12 text-espresso/20" strokeWidth={1.2} />
                      <p className="mt-4 font-semibold text-espresso">Your cart is empty</p>
                      <p className="mt-1 max-w-[16rem] text-sm text-espresso/55">
                        Pick a roast and a pack size — we&apos;ll work out the kilos for you.
                      </p>
                      <button
                        onClick={() => setOpen(false)}
                        className="mt-5 rounded-full border border-espresso/20 px-6 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-espresso/5"
                      >
                        Browse the beans
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {lines.map((l) => (
                        <li
                          key={l.key}
                          className="flex items-start gap-3 rounded-2xl border border-espresso/10 bg-white/60 p-3"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold leading-tight text-espresso">{l.name}</p>
                            <p className="mt-0.5 text-[0.72rem] text-espresso/55">
                              {l.size} · {npr(l.unitPrice)} each
                            </p>

                            <div className="mt-2 flex items-center gap-1 rounded-full border border-espresso/15 bg-cream/70 p-0.5 w-fit">
                              <button
                                aria-label={`Decrease ${l.name}`}
                                onClick={() => setQty(l.key, l.qty - 1)}
                                className="grid h-6 w-6 place-items-center rounded-full text-espresso transition-colors hover:bg-espresso/8"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-bold tabular-nums text-espresso">
                                {l.qty}
                              </span>
                              <button
                                aria-label={`Increase ${l.name}`}
                                onClick={() => setQty(l.key, l.qty + 1)}
                                className="grid h-6 w-6 place-items-center rounded-full text-espresso transition-colors hover:bg-espresso/8"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm font-bold tabular-nums text-espresso">
                              {npr(l.unitPrice * l.qty)}
                            </span>
                            <span className="text-[0.68rem] tabular-nums text-espresso/45">
                              {kgLabel(l.kg * l.qty)}
                            </span>
                            <button
                              aria-label={`Remove ${l.name}`}
                              onClick={() => remove(l.key)}
                              className="text-espresso/35 transition-colors hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {lines.length > 0 && (
                  <footer className="border-t border-espresso/10 bg-cream-2/60 px-5 py-4">
                    <dl className="space-y-1.5 text-sm">
                      <div className="flex justify-between text-espresso/60">
                        <dt>Total weight</dt>
                        <dd className="tabular-nums">{kgLabel(totalKg)}</dd>
                      </div>
                      <div className="flex justify-between text-base font-bold text-espresso">
                        <dt>Subtotal</dt>
                        <dd className="tabular-nums">{npr(subtotal)}</dd>
                      </div>
                    </dl>
                    <p className="mt-1.5 text-[0.7rem] text-espresso/45">
                      Delivery is quoted when we confirm your order.
                    </p>
                    <button
                      onClick={() => setStep("checkout")}
                      className="mt-3 w-full rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-[1.01] hover:bg-espresso-2"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={clear}
                      className="mt-2 w-full rounded-full px-6 py-2 text-[0.78rem] font-medium text-espresso/50 transition-colors hover:text-espresso"
                    >
                      Clear cart
                    </button>
                  </footer>
                )}
              </>
            )}

            {/* ---------------- checkout ---------------- */}
            {step === "checkout" && (
              <form onSubmit={placeOrder} className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4" data-lenis-prevent>
                  <p className="text-sm leading-relaxed text-espresso/60">
                    We confirm every order by hand. Tell us where it&apos;s going and pick how
                    you&apos;d like to send it — we&apos;ll reply with delivery and payment details.
                  </p>

                  <div className="mt-5 space-y-3">
                    <Field label="Your name">
                      <input
                        required
                        value={customer.name}
                        onChange={set("name")}
                        placeholder="Jane Doe"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        required
                        type="tel"
                        value={customer.phone}
                        onChange={set("phone")}
                        placeholder="+977 98…"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Delivery address">
                      <input
                        value={customer.address}
                        onChange={set("address")}
                        placeholder="Jhamsikhel, Lalitpur"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Notes (grind, roast profile…)">
                      <textarea
                        rows={3}
                        value={customer.notes}
                        onChange={set("notes")}
                        placeholder="Espresso grind, please"
                        className={`${inputCls} resize-none`}
                      />
                    </Field>
                  </div>

                  <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-espresso/50">
                    Send the order via
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <ChannelButton
                      active={channel === "whatsapp"}
                      onClick={() => setChannel("whatsapp")}
                      icon={<WhatsAppIcon className="h-5 w-5" />}
                      label="WhatsApp"
                      note="Fastest reply"
                    />
                    <ChannelButton
                      active={channel === "email"}
                      onClick={() => setChannel("email")}
                      icon={<Mail className="h-5 w-5" />}
                      label="Email"
                      note={ORDER_EMAIL}
                    />
                  </div>
                </div>

                <footer className="border-t border-espresso/10 bg-cream-2/60 px-5 py-4">
                  <dl className="flex justify-between text-base font-bold text-espresso">
                    <dt>Total</dt>
                    <dd className="tabular-nums">
                      {npr(subtotal)}
                      <span className="ml-2 text-[0.72rem] font-medium text-espresso/50">
                        {kgLabel(totalKg)}
                      </span>
                    </dd>
                  </dl>
                  <button
                    type="submit"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-[1.01] hover:bg-espresso-2"
                  >
                    {channel === "whatsapp" ? (
                      <WhatsAppIcon className="h-4 w-4" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                    Send order on {channel === "whatsapp" ? "WhatsApp" : "email"}
                  </button>
                </footer>
              </form>
            )}

            {/* ---------------- sent ---------------- */}
            {step === "sent" && (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-caramel" />
                <h3 className="mt-4 text-2xl font-bold text-espresso">Almost there</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/60">
                  Your order opened in {channel === "whatsapp" ? "WhatsApp" : "your email app"} with
                  everything filled in — just hit send and we&apos;ll confirm shortly.
                </p>
                <p className="mt-3 text-[0.75rem] leading-relaxed text-espresso/45">
                  Nothing happened? Your browser may have blocked the pop-up. Go back and try the
                  other option.
                </p>

                <div className="mt-6 flex w-full flex-col gap-2">
                  <button
                    onClick={() => {
                      clear();
                      setCustomer(EMPTY);
                      setStep("cart");
                      setOpen(false);
                    }}
                    className="w-full rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:bg-espresso-2"
                  >
                    Done — clear my cart
                  </button>
                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-espresso/5"
                  >
                    Back to checkout
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-espresso/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function ChannelButton({
  active,
  onClick,
  icon,
  label,
  note,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  note: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all duration-300",
        active
          ? "border-caramel bg-caramel/15"
          : "border-espresso/15 bg-white/50 hover:border-caramel/40",
      ].join(" ")}
    >
      <span className={active ? "text-bean" : "text-espresso/55"}>{icon}</span>
      <span className="text-sm font-bold text-espresso">{label}</span>
      <span className="w-full truncate text-[0.68rem] text-espresso/50">{note}</span>
    </button>
  );
}

/* lucide has no WhatsApp glyph — this is the official mark, simplified */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm0 18.15h-.01a8.24 8.24 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}
