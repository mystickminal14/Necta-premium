import type { CartLine } from "./cart";
import { kgLabel, npr } from "./products";

/* ------------------------------------------------------------------ *
 * Checkout hand-off. We don't take payment on the site — the order is
 * formatted into a plain-text summary and opened in whichever channel
 * the customer picks, so they only have to hit send.
 * ------------------------------------------------------------------ */

/** digits only, country code first — what wa.me expects.
 *  TEMPORARY: pointed at a test handset for now. Switch back to the Necta
 *  business line (9779849515304) before this goes live. */
export const WHATSAPP_NUMBER = "9779861662986";
export const ORDER_EMAIL = "nectacoffeept@gmail.com";

export type Channel = "whatsapp" | "email";

export interface Customer {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export interface OrderSummary {
  subject: string;
  body: string;
}

const RULE = "──────────────────────────";

/**
 * Formats the cart as a website lead rather than a message written in the
 * customer's voice — whoever picks it up should be able to read the whole
 * order at a glance without scrolling back for context.
 *
 * Deliberately plain text: the same body goes to both WhatsApp and email,
 * and WhatsApp's *bold* markers would show up as literal asterisks in a
 * mail client.
 */
export function buildOrder(lines: CartLine[], customer: Customer): OrderSummary {
  const totalKg = lines.reduce((n, l) => n + l.kg * l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.unitPrice * l.qty, 0);
  const bags = lines.reduce((n, l) => n + l.qty, 0);

  const items = lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.name}\n   ${l.size} × ${l.qty} — ${npr(l.unitPrice * l.qty)}`,
    )
    .join("\n");

  const placed = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // "" entries are deliberate blank lines — don't filter them out
  const body = [
    "NEW ORDER — lead from the Necta Coffee website",
    RULE,
    "CUSTOMER",
    `Name: ${customer.name || "—"}`,
    `Phone: ${customer.phone || "—"}`,
    `Deliver to: ${customer.address || "— not provided —"}`,
    "",
    `ORDER (${bags} ${bags === 1 ? "bag" : "bags"})`,
    items,
    "",
    `Total weight: ${kgLabel(totalKg)}`,
    `Order total: ${npr(subtotal)}`,
    customer.notes ? `\nNOTES\n${customer.notes}` : "",
    RULE,
    `Submitted ${placed}. Please confirm stock, delivery and payment.`,
  ]
    .join("\n")
    .trim();

  const subject = `Website order — ${customer.name || "new lead"} · ${npr(subtotal)}`;
  return { subject, body };
}

export function channelUrl(channel: Channel, order: OrderSummary) {
  if (channel === "whatsapp") {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(order.body)}`;
  }
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(order.subject)}&body=${encodeURIComponent(order.body)}`;
}
