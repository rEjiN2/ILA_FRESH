"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/data";
import { useCart } from "./CartContext";

export default function Footer() {
  const { subscribe } = useCart();
  return (
    <footer className="foot">
      <div className="wrap foot-top">
        <div className="foot-brand">
          <Link href="/" className="logo">
            <Image src="/ila-logo.png" alt="ILAFRESH" height={96} width={320} className="logo-img logo-img--foot" />
          </Link>
          <p>Single-origin spice, milled to order and shipped close to harvest. From the Idukki hills to your kitchen.</p>
          <div className="foot-social">
            {["Instagram", "Pinterest", "WhatsApp"].map((s) => (
              <button key={s} onClick={() => subscribe("__social__")}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <h4>Shop</h4>
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={`/products?cat=${c.id}`}>
                {c.label}
              </Link>
            ))}
            <Link href="/products">All spices</Link>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <Link href="/about">Our story</Link>
            <Link href="/about#sellers">Become a seller</Link>
            <Link href="/blog">The Journal</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="foot-col">
            <h4>Support</h4>
            <Link href="/contact">Help & orders</Link>
            <Link href="/terms">Shipping & returns</Link>
            <Link href="/terms">Terms of service</Link>
            <Link href="/privacy">Privacy policy</Link>
          </div>
        </div>
      </div>
      <div className="wrap foot-bar">
        <span>© {new Date().getFullYear()} ilaFRESH. All rights reserved.</span>
        <div className="foot-legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact us</Link>
        </div>
      </div>
    </footer>
  );
}
