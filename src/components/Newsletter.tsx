"use client";

import { useState } from "react";
import Sprig from "./Sprig";
import { Eyebrow } from "./ui";
import { useCart } from "./CartContext";

export default function Newsletter() {
  const { subscribe } = useCart();
  const [email, setEmail] = useState("");
  return (
    <section className="wrap section">
      <div className="news">
        <div className="news-art">
          <Sprig color="rgba(44,85,48,0.18)" />
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
