import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Faq from "../components/Faq";
import type { QA } from "../components/Faq";

const INFO = [
  { icon: <MapPin className="h-5 w-5" />, label: "Visit us", value: "Jhamsikhel 08, Lalitpur MNC, Nepal" },
  { icon: <Mail className="h-5 w-5" />, label: "Email us", value: "nectacoffeept@gmail.com", href: "mailto:nectacoffeept@gmail.com" },
  { icon: <Phone className="h-5 w-5" />, label: "Call us", value: "+977 9849515304", href: "tel:+9779849515304" },
  { icon: <Clock className="h-5 w-5" />, label: "Roastery hours", value: "Sun–Fri · 9am – 6pm" },
];

const FAQS: QA[] = [
  { q: "How quickly will you reply?", a: "We answer messages within one business day — usually much faster on Instagram DMs." },
  { q: "Can I visit the roastery?", a: "Yes! Drop by during roastery hours in Jhamsikhel, Lalitpur. Message ahead so we can have a fresh cup waiting for you." },
  { q: "Do you supply cafés and offices in bulk?", a: "We do. Tell us your volume and preferred grade in the form and our wholesale team will send custom pricing." },
  { q: "Can I get a free sample?", a: "Absolutely — mention it in your message and we'll arrange a sample so you can taste before committing." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <PageHeader
        crumb="Contact"
        eyebrow="say hello"
        title="Let's Get You"
        highlight="Brewing."
        subtitle="Questions about a grade, a wholesale order, or just want to talk coffee? We'd love to hear from you — reach out and we'll get right back."
      />

      {/* form (left) + map (right) */}
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10">
          {/* form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-[0_24px_60px_-30px_rgba(36,19,8,0.5)] sm:p-8"
          >
            {sent ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-14 w-14 text-caramel" />
                <h3 className="mt-4 text-2xl font-bold text-espresso">Message sent!</h3>
                <p className="mt-2 max-w-sm text-espresso/60">
                  Thanks for reaching out, {form.name || "friend"}. We&apos;ll get back to you within one business day.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 rounded-full border border-espresso/20 px-6 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-espresso/5"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <h2 className="text-2xl font-bold text-espresso">Send us a message</h2>
                <p className="mt-1 text-sm text-espresso/55">Fill in the form and we&apos;ll be in touch shortly.</p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Your name">
                    <input required value={form.name} onChange={set("name")} placeholder="Jane Doe" className={inputCls} />
                  </Field>
                  <Field label="Email">
                    <input required type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" className={inputCls} />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Subject">
                    <input value={form.subject} onChange={set("subject")} placeholder="Wholesale enquiry" className={inputCls} />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Message">
                    <textarea required rows={5} value={form.message} onChange={set("message")} placeholder="Tell us how we can help…" className={`${inputCls} resize-none`} />
                  </Field>
                </div>

                <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-[1.01] hover:bg-espresso-2 sm:w-auto sm:text-base">
                  <Send className="h-4 w-4" /> Send message
                </button>
              </form>
            )}
          </motion.div>

          {/* map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-espresso/10 shadow-[0_24px_60px_-30px_rgba(36,19,8,0.5)]"
          >
            <iframe
              title="Necta Coffee — Jhamsikhel, Lalitpur, Nepal"
              src="https://www.google.com/maps?q=Jhamsikhel+08,+Lalitpur+MNC,+Nepal&z=15&output=embed"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* location badge */}
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-2xl bg-espresso/90 px-4 py-3 text-cream shadow-xl backdrop-blur-sm">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-caramel-light">Our roastery</p>
              <p className="text-sm font-bold">Jhamsikhel, Lalitpur</p>
            </div>
          </motion.div>
        </div>

        {/* info strip */}
        <div className="relative mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {INFO.map((it) => (
            <div key={it.label} className="flex items-start gap-4 rounded-2xl border border-espresso/10 bg-white/60 p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/15 text-caramel">{it.icon}</div>
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.15em] text-espresso/45">{it.label}</p>
                {it.href ? (
                  <a href={it.href} className="text-sm font-semibold text-espresso transition-colors hover:text-caramel">{it.value}</a>
                ) : (
                  <p className="text-sm font-semibold text-espresso">{it.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Faq items={FAQS} eyebrow="quick answers" />
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-espresso/15 bg-cream/50 px-4 py-3 text-sm text-espresso placeholder:text-espresso/35 transition-colors focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-espresso/50">{label}</span>
      {children}
    </label>
  );
}
