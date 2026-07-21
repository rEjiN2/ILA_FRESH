import { Eyebrow } from "@/components/ui";

const TERMS: [string, string][] = [
  ["Overview", "These terms govern your use of ilaFRESH and any purchase made through it. By placing an order you agree to them. We may update these terms; the version shown at the time of your order applies to that order."],
  ["Orders & pricing", "Prices are shown in AED and include VAT where applicable. We may correct pricing errors before dispatch and will contact you if a correction affects your order. An order is confirmed once you receive an email confirmation, not at the point of payment."],
  ["Products & marketplace", "Some products are sold by ila directly and others by independent sellers on our platform. Where a product is sold by a third-party seller, ila facilitates the sale, payment and delivery and charges the seller a commission. The seller remains responsible for the accuracy of their listing and the quality of their product."],
  ["Shipping & delivery", "We ship across the UAE within 1–2 working days, with GCC and international delivery calculated at checkout. Delivery estimates are not guarantees. Risk passes to you on delivery."],
  ["Returns", "As a food product, opened spices cannot be returned for hygiene reasons. If an item arrives damaged, incorrect or below our standard, contact us within 14 days for a replacement or refund."],
  ["Liability", "Nothing in these terms limits liability that cannot be limited by law. Otherwise, our liability for any order is limited to the value of that order."],
  ["Contact", "Questions about these terms can be sent to hello@ilafresh.ae."],
];

export default function Terms() {
  return (
    <div className="page">
      <header className="phead">
        <div className="wrap">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="phead-title">Terms of Service</h1>
          <p className="phead-sub">Last updated 1 July 2026. Written to be read, not just agreed to.</p>
        </div>
      </header>
      <div className="wrap legal">
        {TERMS.map(([t, d], i) => (
          <section key={i} className="legal-sec">
            <h2>
              {String(i + 1).padStart(2, "0")} · {t}
            </h2>
            <p>{d}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
