"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { PRODUCTS } from "@/lib/data";
import { Icon } from "./icons";

type CartLine = { id: string; qty: number };

type CartCtx = {
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  subscribe: (email: string) => void;
  toast: (msg: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("ila-cart");
      const w = localStorage.getItem("ila-wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    localStorage.setItem("ila-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!hydrated.current) return;
    localStorage.setItem("ila-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toast = useCallback((m: string) => {
    setToastMsg(m);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      setCart((c) => {
        const ex = c.find((x) => x.id === id);
        if (ex) return c.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x));
        return [...c, { id, qty }];
      });
      const p = PRODUCTS.find((p) => p.id === id);
      if (p) toast(`${p.name} added to cart`);
    },
    [toast]
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty } : x)));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => c.filter((x) => x.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback(
    (id: string) => {
      setWishlist((w) => {
        const on = w.includes(id);
        toast(on ? "Removed from wishlist" : "Saved to wishlist");
        return on ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    [toast]
  );

  const subscribe = useCallback(
    (email: string) => {
      if (email === "__social__") {
        toast("Social links — point these at your real profiles.");
        return;
      }
      if (!email || !email.includes("@")) {
        toast("Enter a valid email to join.");
        return;
      }
      toast("You're in — welcome to the inner circle.");
    },
    [toast]
  );

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <Ctx.Provider
      value={{ cart, wishlist, cartCount, addToCart, setQty, removeFromCart, clearCart, toggleWish, subscribe, toast }}
    >
      {children}
      {toastMsg && (
        <div className="toast">
          <Icon.check /> {toastMsg}
        </div>
      )}
    </Ctx.Provider>
  );
}
