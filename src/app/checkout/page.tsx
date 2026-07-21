"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";
import { Icon } from "@/components/icons";
import { useCart } from "@/components/CartContext";
import { PRODUCTS, money } from "@/lib/data";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartCount, clearCart, toast } = useCart();
  const [done, setDone] = useState(false);

  const total = cart.reduce((s, x) => {
    const p = PRODUCTS.find((p) => p.id === x.id);
    return s + (p ? p.price * x.qty : 0);
  }, 0);
  const shipping = total >= 150 || total === 0 ? 0 : 15;

  useEffect(() => {
    if (cartCount === 0 && !done) router.replace("/cart");
  }, [cartCount, done, router]);

  if (cartCount === 0 && !done) return null;

  if (done) {
    return (
      <div className="wrap page narrow">
        <div className="empty tall">
          <span className="sent-check">
            <Icon.check />
          </span>
          <h3>Order placed — thank you</h3>
          <p>This is a demo checkout. Wire it to your payment provider and the ACA backend to take it live.</p>
          <Link href="/" className="btn btn-primary">
            Back to home
            <Icon.arrow />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap page">
      <Eyebrow>Almost there</Eyebrow>
      <h1 className="phead-title tight">Checkout</h1>
      <div className="cart">
        <div className="checkout-form">
          <h3>Delivery details</h3>
          <div className="frow">
            <label className="field fill">
              <span>Full name</span>
              <input placeholder="Meera Nair" />
            </label>
            <label className="field fill">
              <span>Phone</span>
              <input placeholder="+971 …" />
            </label>
          </div>
          <label className="field fill">
            <span>Address</span>
            <input placeholder="Building, street, area" />
          </label>
          <div className="frow">
            <label className="field fill">
              <span>City</span>
              <input placeholder="Sharjah" defaultValue="Sharjah" />
            </label>
            <label className="field fill">
              <span>Emirate</span>
              <input placeholder="Sharjah" />
            </label>
          </div>
          <h3 style={{ marginTop: 26 }}>Payment</h3>
          <p className="pay-note">Demo only — no real card details are collected. Connect Stripe / a UAE gateway here.</p>
          <label className="field fill">
            <span>Card number</span>
            <input placeholder="4242 4242 4242 4242" />
          </label>
        </div>
        <aside className="summary">
          <h3>Order summary</h3>
          <div className="sum-row">
            <span>Subtotal ({cartCount} items)</span>
            <b>{money(total)}</b>
          </div>
          <div className="sum-row">
            <span>Shipping</span>
            <b>{shipping === 0 ? "Free" : money(shipping)}</b>
          </div>
          <div className="sum-total">
            <span>Total</span>
            <b>{money(total + shipping)}</b>
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              setDone(true);
              clearCart();
              toast("Order placed (demo)");
            }}
          >
            Place order
            <Icon.arrow />
          </button>
          <Link href="/cart" className="link link--center">
            Back to cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
