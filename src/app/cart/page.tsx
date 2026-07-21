"use client";

import Link from "next/link";
import SpiceTile from "@/components/SpiceTile";
import Sprig from "@/components/Sprig";
import { Eyebrow } from "@/components/ui";
import { Icon } from "@/components/icons";
import { useCart } from "@/components/CartContext";
import { PRODUCTS, money } from "@/lib/data";

export default function CartPage() {
  const { cart, setQty, removeFromCart } = useCart();
  const rows = cart.map((it) => ({ ...PRODUCTS.find((p) => p.id === it.id)!, qty: it.qty })).filter((r) => r.id);
  const subtotal = rows.reduce((s, r) => s + r.price * r.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 15;

  if (rows.length === 0) {
    return (
      <div className="wrap page narrow">
        <div className="empty tall">
          <Sprig color="var(--sage)" />
          <h3>Your cart is empty</h3>
          <p>The shelf is stocked and waiting. Start with the cardamom — everyone does.</p>
          <Link href="/products" className="btn btn-primary">
            Browse the collection
            <Icon.arrow />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap page">
      <Eyebrow>Your basket</Eyebrow>
      <h1 className="phead-title tight">Cart</h1>
      <div className="cart">
        <div className="cart-list">
          {rows.map((r) => (
            <div key={r.id} className="crow">
              <Link href={`/products/${r.id}`} className="crow-media">
                <SpiceTile spice={r} small />
              </Link>
              <div className="crow-info">
                <Link href={`/products/${r.id}`} className="crow-name">
                  {r.name}
                </Link>
                <span className="crow-origin">
                  {r.origin} · {r.weight}
                </span>
                <div className="stepper stepper--sm">
                  <button onClick={() => setQty(r.id, Math.max(1, r.qty - 1))} aria-label="Decrease">
                    <Icon.minus />
                  </button>
                  <span>{r.qty}</span>
                  <button onClick={() => setQty(r.id, r.qty + 1)} aria-label="Increase">
                    <Icon.plus />
                  </button>
                </div>
              </div>
              <div className="crow-right">
                <span className="crow-price">{money(r.price * r.qty)}</span>
                <button className="crow-del" onClick={() => removeFromCart(r.id)} aria-label="Remove">
                  <Icon.trash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h3>Order summary</h3>
          <div className="sum-row">
            <span>Subtotal</span>
            <b>{money(subtotal)}</b>
          </div>
          <div className="sum-row">
            <span>Shipping</span>
            <b>{shipping === 0 ? "Free" : money(shipping)}</b>
          </div>
          {subtotal < 150 && subtotal > 0 && <p className="sum-hint">Add {money(150 - subtotal)} more for free UAE delivery.</p>}
          <div className="sum-total">
            <span>Total</span>
            <b>{money(subtotal + shipping)}</b>
          </div>
          <Link href="/checkout" className="btn btn-primary btn-block">
            Proceed to checkout
            <Icon.arrow />
          </Link>
          <Link href="/products" className="link link--center">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
