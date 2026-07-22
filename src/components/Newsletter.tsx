"use client";

import { useState } from "react";
import { Eyebrow } from "./ui";
import { useCart } from "./CartContext";

const LEAVES = [
  { left: "12%", size: 30, duration: 8, delay: 0 },
  { left: "38%", size: 22, duration: 10, delay: 1.4 },
  { left: "60%", size: 34, duration: 9.5, delay: 3 },
  { left: "80%", size: 24, duration: 7.5, delay: 0.8 },
  { left: "94%", size: 28, duration: 11, delay: 2.2 },
];

export default function Newsletter() {
  const { subscribe } = useCart();
  const [email, setEmail] = useState("");
  return (
    <section className="wrap section">
      <div className="news">
        <div className="news-art" aria-hidden="true">
          {LEAVES.map((l, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src="/ila-drop.png"
              alt=""
              className="leaf-drop"
              style={{
                left: l.left,
                width: l.size,
                animationDuration: `${l.duration}s`,
                animationDelay: `${l.delay}s`,
              }}
            />
          ))}
        </div>
        <Eyebrow>Join the inner circle</Eyebrow>
        <h2 className="news-title">First pick of every harvest</h2>
        <p className="news-sub">New arrivals, restocks of things that sell out, and the occasional recipe. No noise.</p>
        <div className="news-form">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email" />
          <button
            className="btn btn-primary"
            onClick={() => {
              subscribe(email);
              setEmail("");
            }}
          >
            Notify me
          </button>
        </div>
      </div>
    </section>
  );
}
