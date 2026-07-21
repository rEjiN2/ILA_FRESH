"use client";

import { useState } from "react";
import Link from "next/link";
import SpiceTile from "@/components/SpiceTile";
import ProductCard from "@/components/ProductCard";
import { Rating } from "@/components/ui";
import { Icon } from "@/components/icons";
import { useCart } from "@/components/CartContext";
import { CATEGORIES, PRODUCTS, money, type Product } from "@/lib/data";

export default function ProductDetail({ spice }: { spice: Product }) {
  const { addToCart, toggleWish, wishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"about" | "notes" | "ship">("about");
  const wished = wishlist.includes(spice.id);
  const related = PRODUCTS.filter((p) => p.cat === spice.cat && p.id !== spice.id).slice(0, 3);
  const filled = related.length ? related : PRODUCTS.filter((p) => p.id !== spice.id).slice(0, 3);

  return (
    <div className="page">
      <div className="wrap crumb">
        <Link href="/products" className="link">
          Shop
        </Link>
        <span>/</span>
        <span>{CATEGORIES.find((c) => c.id === spice.cat)?.label}</span>
        <span>/</span>
        <b>{spice.name}</b>
      </div>

      <div className="wrap pdp">
        <div className="pdp-media">
          <SpiceTile spice={spice} />
        </div>
        <div className="pdp-info">
          <span className="pdp-origin">
            <Icon.leaf /> {spice.origin}
          </span>
          <h1 className="pdp-name">{spice.name}</h1>
          <div className="pdp-rate">
            <Rating value={spice.rating} count={spice.reviews} />
          </div>
          <p className="pdp-blurb">{spice.blurb}</p>
          <div className="pdp-price">
            {money(spice.price)}
            <span>/ {spice.weight}</span>
          </div>

          <div className="pdp-buy">
            <div className="stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                <Icon.minus />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                <Icon.plus />
              </button>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => addToCart(spice.id, qty)}>
              Add to cart · {money(spice.price * qty)}
            </button>
            <button className={`icon-btn icon-btn--lg ${wished ? "is-on" : ""}`} onClick={() => toggleWish(spice.id)} aria-label="Wishlist">
              {wished ? <Icon.heartFill /> : <Icon.heart />}
            </button>
          </div>
          <p className="pdp-ship">
            <Icon.check /> Ships in 1–2 days across the UAE · Free over {money(150)}
          </p>

          <div className="tabs">
            {(
              [
                ["about", "The spice"],
                ["notes", "Tasting & grade"],
                ["ship", "Storage & shipping"],
              ] as const
            ).map(([k, l]) => (
              <button key={k} className={`tab ${tab === k ? "is-on" : ""}`} onClick={() => setTab(k)}>
                {l}
              </button>
            ))}
          </div>
          <div className="tab-body">
            {tab === "about" && (
              <p>
                {spice.blurb} Grown in {spice.origin}, then handled as little as possible on the way to you. We
                rotate stock constantly, so what you receive is close to harvest, never a jar that has been
                sitting in a warehouse forgetting how to taste like itself.
              </p>
            )}
            {tab === "notes" && (
              <ul className="notes">
                {spice.notes.map((n, i) => (
                  <li key={i}>
                    <Icon.check />
                    {n}
                  </li>
                ))}
              </ul>
            )}
            {tab === "ship" && (
              <p>
                Keep it whole and sealed, away from light and heat — a cupboard, not the spot beside the stove.
                Orders ship in 1–2 working days by insured courier across the UAE, with free delivery over{" "}
                {money(150)}. GCC and international shipping is calculated at checkout.
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="wrap section">
        <div className="sec-head">
          <h2 className="sec-title">Pairs well with</h2>
        </div>
        <div className="grid">
          {filled.map((p) => (
            <ProductCard key={p.id} spice={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
