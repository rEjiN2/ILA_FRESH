"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "./icons";
import { useCart } from "./CartContext";
import { Eyebrow } from "./ui";

function Logo() {
  return (
    <Link href="/" className="logo" aria-label="ilaFRESH home">
      <Image src="/logo.png" alt="ILAFRESH" height={96} width={320} className="logo-img" priority />
    </Link>
  );
}

const LINKS: [string, string][] = [
  ["/products", "Shop"],
  ["/about", "Our Story"],
  ["/blog", "Journal"],
  ["/contact", "Contact"],
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlist, toast } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  const doSearch = () => {
    router.push(`/products?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setQ("");
  };

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Menu">
            <Icon.menu />
          </button>
          <Logo />
          <nav className="nav-links">
            {LINKS.map(([href, label]) => (
              <Link key={href} href={href} className={`nav-link ${pathname === href ? "is-on" : ""}`}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="icon-btn" onClick={() => setSearchOpen((s) => !s)} aria-label="Search">
              <Icon.search />
            </button>
            <button
              className="icon-btn hide-sm"
              onClick={() => toast("Language & region — connect this to your i18n later.")}
              aria-label="Region"
            >
              <Icon.globe />
            </button>
            <Link href="/login" className="icon-btn" aria-label="Account">
              <Icon.user />
            </Link>
            <Link href="/wishlist" className="icon-btn badged" aria-label="Wishlist">
              <Icon.heart />
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>
            <Link href="/cart" className="icon-btn badged" aria-label="Cart">
              <Icon.cart />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
        {searchOpen && (
          <div className="nav-search">
            <div className="wrap nav-search-inner">
              <Icon.search />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                placeholder="Search cardamom, pepper, blends…"
              />
              <button className="btn btn-mini" onClick={doSearch}>
                Search
              </button>
              <button className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close">
                <Icon.close />
              </button>
            </div>
          </div>
        )}
      </header>

      {open && (
        <div className="drawer">
          <div className="drawer-head">
            <Logo />
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close">
              <Icon.close />
            </button>
          </div>
          <nav className="drawer-links">
            {LINKS.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
                <Icon.arrow />
              </Link>
            ))}
            <Link href="/login" onClick={() => setOpen(false)}>
              Login / Register
              <Icon.arrow />
            </Link>
            <Link href="/wishlist" onClick={() => setOpen(false)}>
              Wishlist
              <Icon.arrow />
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)}>
              Cart
              <Icon.arrow />
            </Link>
          </nav>
          <div className="drawer-foot">
            <Eyebrow>ila — a modern spice legacy</Eyebrow>
          </div>
        </div>
      )}
    </>
  );
}
