import { Eyebrow } from "@/components/ui";

const PRIVACY: [string, string][] = [
  ["What we collect", "We collect the details you give us — name, contact, delivery address and order history — and basic technical data such as device and usage information needed to run the store."],
  ["How we use it", "To process orders, arrange delivery, provide support, and — only if you opt in — send you occasional updates. We do not sell your personal data."],
  ["Payments", "Payments are handled by regulated payment providers. We do not store full card numbers on our servers."],
  ["Sellers", "When you buy from an independent seller on ila, we share the details needed to fulfil and deliver your order. Sellers may only use this data to complete your order."],
  ["Cookies", "We use essential cookies to keep the store working and, with your consent, analytics cookies to understand and improve it. You can manage these in your browser."],
  ["Your rights", "You can ask us to access, correct or delete your data, or to stop marketing to you, at any time by emailing privacy@ilafresh.ae."],
  ["Retention", "We keep order records for as long as needed for legal, tax and accounting purposes, then delete or anonymise them."],
];

export default function Privacy() {
  return (
    <div className="page">
      <header className="phead">
        <div className="wrap">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="phead-title">Privacy Policy</h1>
          <p className="phead-sub">Last updated 1 July 2026. Written to be read, not just agreed to.</p>
        </div>
      </header>
      <div className="wrap legal">
        {PRIVACY.map(([t, d], i) => (
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
