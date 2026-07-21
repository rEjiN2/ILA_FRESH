"use client";

import { useState } from "react";
import Sprig from "./Sprig";
import { CATEGORIES, PHOTO, type Product } from "@/lib/data";

export default function SpiceTile({
  spice,
  small,
  src,
  showBadge = true,
}: {
  spice: Product;
  small?: boolean;
  src?: string;
  showBadge?: boolean;
}) {
  const [a, b] = spice.tone;
  const imgSrc = src || PHOTO[spice.id];
  const [ok, setOk] = useState(true);
  return (
    <div className="tile" style={{ background: `radial-gradient(120% 130% at 25% 15%, ${a} 0%, ${b} 100%)` }}>
      <div className="tile-grain" />
      <div className="tile-sprig" style={{ width: small ? "46%" : "52%" }}>
        <Sprig color="rgba(255,255,255,0.30)" />
      </div>
      {imgSrc && ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="tile-img" src={imgSrc} alt={spice.name} loading="lazy" onError={() => setOk(false)} />
      )}
      <div className="tile-shade" />
      {showBadge && <span className="tile-badge">{CATEGORIES.find((c) => c.id === spice.cat)?.label}</span>}
    </div>
  );
}
