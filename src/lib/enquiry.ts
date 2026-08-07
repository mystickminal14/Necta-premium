/* ------------------------------------------------------------------ *
 * Enquiry purposes.
 *
 * Every CTA on the site lands on /contact, so the contact page would
 * otherwise have no idea whether someone came from the dealership offer,
 * a bag of beans or a machine. Each link carries `?about=<key>` (plus an
 * optional `&item=` for the specific product), and the form reads it back
 * to show what the enquiry is about and prefill the subject.
 * ------------------------------------------------------------------ */

export interface Purpose {
  /** shown on the badge above the form */
  label: string;
  /** prefills the subject field */
  subject: string;
  /** one line of reassurance under the badge */
  note: string;
}

export const PURPOSES = {
  dealership: {
    label: "Necta Dealership",
    subject: "Dealership enquiry",
    note: "Tell us your region and we'll come back with territory and volume details.",
  },
  collaboration: {
    label: "Collaboration Branding",
    subject: "Collaboration branding enquiry",
    note: "Tell us about your brand and how you'd like the bags to look.",
  },
  beans: {
    label: "Coffee Beans",
    subject: "Coffee bean enquiry",
    note: "Let us know the roast, grind and volume you need.",
  },
  origin: {
    label: "Single Origin",
    subject: "Single origin enquiry",
    note: "We'll share what's in season and what we can set aside for you.",
  },
  machines: {
    label: "Espresso Machines",
    subject: "Equipment enquiry",
    note: "Tell us your counter size and daily volume and we'll spec it out.",
  },
} as const satisfies Record<string, Purpose>;

export type PurposeKey = keyof typeof PURPOSES;

/** builds the /contact link a CTA should point at */
export function contactLink(about: PurposeKey, item?: string) {
  const q = new URLSearchParams({ about });
  if (item) q.set("item", item);
  return `/contact?${q}`;
}

/** resolves ?about= / ?item= back into something the form can display */
export function readPurpose(params: URLSearchParams) {
  const key = params.get("about");
  if (!key || !(key in PURPOSES)) return null;

  const purpose = PURPOSES[key as PurposeKey];
  const item = params.get("item")?.slice(0, 80).trim();
  return {
    label: item ? `${purpose.label} — ${item}` : purpose.label,
    subject: item ? `${purpose.subject}: ${item}` : purpose.subject,
    note: purpose.note,
  };
}
