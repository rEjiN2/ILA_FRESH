"use client";

import Link from "next/link";
import SpiceTile from "./SpiceTile";
import { Rating } from "./ui";
import { Icon } from "./icons";
import { useCart } from "./CartContext";
import { money, type Product } from "@/lib/data";

export default function ProductCard({ spice }: { spice: Product }) {
  const { addToCart, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(spice.id);
  return (
    <article className="card">
      <Link href={`/products/${spice.id}`} className="card-media" aria-label={`View ${spice.name}`}>
        <SpiceTile spice={spice} small />
        {spice.best && <span className="tag-best">Bestseller</span>}
      </Link>
      <button
        className={`card-wish ${wished ? "is-on" : ""}`}
        onClick={() => toggleWish(spice.id)}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      >
        {wished ? <Icon.heartFill /> : <Icon.heart />}
      </button>
      <div className="card-body">
        <div className="card-top">
          <span className="card-origin">{spice.origin}</span>
          <Rating value={spice.rating} mini />
        </div>
        <Link href={`/products/${spice.id}`} className="card-name">
          {spice.name}
        </Link>
        <p className="card-blurb">{spice.blurb}</p>
        <div className="card-foot">
          <span className="price">
            {money(spice.price)}
            <i>/ {spice.weight}</i>
          </span>
          <button className="btn btn-mini" onClick={() => addToCart(spice.id)}>
            Add
            <Icon.plus />
          </button>
        </div>
      </div>
    </article>
  );
}
