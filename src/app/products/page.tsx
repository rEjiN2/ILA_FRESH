"use client";

import { use, useMemo, useState } from "react";
import Sprig from "@/components/Sprig";
import ProductCard from "@/components/ProductCard";
import { Eyebrow } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CATEGORIES, PRODUCTS } from "@/lib/data";

export default function Products({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const initial = use(searchParams);
  const [cat, setCat] = useState(initial.cat || "all");
  const [q, setQ] = useState(initial.q || "");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => cat === "all" || p.cat === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter((p) => (p.name + p.origin + p.blurb).toLowerCase().includes(s));
    }
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [cat, q, sort]);

  return (
    <div className="page">
      <header className="phead">
        <div className="wrap">
          <Eyebrow>The collection</Eyebrow>
          <h1 className="phead-title">Every spice, one shelf</h1>
          <p className="phead-sub">Single-origin whole spices, small-batch grinds and blends with a lineage.</p>
        </div>
      </header>

      <div className="wrap shop">
        <div className="shop-bar">
          <div className="chips">
            <button className={`chip ${cat === "all" ? "is-on" : ""}`} onClick={() => setCat("all")}>
              All
            </button>
            {CATEGORIES.map((c) => (
              <button key={c.id} className={`chip ${cat === c.id ? "is-on" : ""}`} onClick={() => setCat(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="shop-tools">
            <label className="field field--search">
              <Icon.search />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search spices" />
            </label>
            <label className="field field--select">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
              <Icon.chev />
            </label>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="empty">
            <Sprig color="var(--sage)" />
            <h3>Nothing matches that yet</h3>
            <p>Try another word, or clear the filters to see the full shelf.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setQ("");
                setCat("all");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid--shop">
            {list.map((p) => (
              <ProductCard key={p.id} spice={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
