"use client";

import { use, useState } from "react";
import { Eyebrow } from "@/components/ui";
import { Icon } from "@/components/icons";
import { useCart } from "@/components/CartContext";

export default function Contact({ searchParams }: { searchParams: Promise<{ subject?: string }> }) {
  const { subject: presetSubject } = use(searchParams);
  const { toast } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: presetSubject === "seller" ? "I'd like to sell on ila" : "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = () => {
    if (!form.name || !form.email || !form.message) {
      toast("Please fill in your name, email and message.");
      return;
    }
    setSent(true);
    toast("Message sent — we'll reply within a day.");
  };

  const faqs: [string, string][] = [
    ["How fresh is 'milled to order'?", "Ground spices are milled the week your order ships and dated on the label. Whole spices are rotated so nothing sits long enough to fade."],
    ["Do you ship outside the UAE?", "Yes — across the GCC and internationally. Rates are calculated at checkout by weight and destination."],
    ["How do I sell my spice on ila?", "Use the form and choose 'Sell on ila', or read the seller section on our story page. We'll walk you through listing, commission and payouts."],
  ];
  const [open, setOpen] = useState(0);

  return (
    <div className="page">
      <header className="phead">
        <div className="wrap">
          <Eyebrow>Say hello</Eyebrow>
          <h1 className="phead-title">Get in touch</h1>
          <p className="phead-sub">
            Questions about an order, a wholesale enquiry, or a spice you&apos;d like us to carry — we read
            every message.
          </p>
        </div>
      </header>

      <div className="wrap contact">
        <div className="contact-form">
          {sent ? (
            <div className="sent">
              <span className="sent-check">
                <Icon.check />
              </span>
              <h3>Thank you — message received</h3>
              <p>
                We&apos;ll get back to you at <b>{form.email}</b> within one working day.
              </p>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              <div className="frow">
                <label className="field fill">
                  <span>Your name</span>
                  <input value={form.name} onChange={set("name")} placeholder="Meera Nair" />
                </label>
                <label className="field fill">
                  <span>Email</span>
                  <input value={form.email} onChange={set("email")} placeholder="you@email.com" />
                </label>
              </div>
              <label className="field fill">
                <span>Subject</span>
                <div className="field--select fill">
                  <select value={form.subject} onChange={set("subject")}>
                    <option value="">Choose a topic</option>
                    <option>An order question</option>
                    <option>Wholesale / restaurants</option>
                    <option value="I'd like to sell on ila">Sell on ila</option>
                    <option>Something else</option>
                  </select>
                  <Icon.chev />
                </div>
              </label>
              <label className="field fill">
                <span>Message</span>
                <textarea rows={5} value={form.message} onChange={set("message")} placeholder="Tell us what you need…" />
              </label>
              <button className="btn btn-primary btn-lg" onClick={submit}>
                Send message
                <Icon.arrow />
              </button>
            </>
          )}
        </div>

        <aside className="contact-side">
          <div className="cside-card">
            <h3>Reach us directly</h3>
            <p>
              <b>Email</b>
              <br />
              hello@ilafresh.ae
            </p>
            <p>
              <b>Phone</b>
              <br />
              +971 6 000 0000
            </p>
            <p>
              <b>Studio & mill</b>
              <br />
              Al Qasimia, Sharjah, UAE
            </p>
            <p>
              <b>Hours</b>
              <br />
              Sun–Thu, 9am–6pm GST
            </p>
          </div>
          <div className="faq">
            <h3>Quick answers</h3>
            {faqs.map(([q, a], i) => (
              <div key={i} className={`faq-item ${open === i ? "is-open" : ""}`}>
                <button onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{q}</span>
                  <Icon.chev className="faq-chev" />
                </button>
                <div className="faq-a">
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
