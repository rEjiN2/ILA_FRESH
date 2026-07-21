"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Icon } from "@/components/icons";
import { Eyebrow } from "@/components/ui";
import { useCart } from "@/components/CartContext";
import { PRODUCTS } from "@/lib/data";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const rows = wishlist.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as typeof PRODUCTS;

  if (rows.length === 0) {
    return (
      <div className="wrap page narrow">
        <div className="empty tall">
          <Icon.heart style={{ width: 40, height: 40, color: "var(--sage)" }} />
          <h3>No saved spices yet</h3>
          <p>Tap the heart on anything you want to come back to. It&apos;ll wait for you here.</p>
          <Link href="/products" className="btn btn-primary">
            Find something to love
            <Icon.arrow />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap page">
      <Eyebrow>Saved for later</Eyebrow>
      <h1 className="phead-title tight">Wishlist</h1>
      <div className="grid grid--shop">
        {rows.map((p) => (
          <ProductCard key={p.id} spice={p} />
        ))}
      </div>
    </div>
  );
}
