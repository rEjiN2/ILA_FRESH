"use client";

import { use, useMemo, useState } from "react";
import Sprig from "@/components/Sprig";
import ProductCard from "@/components/ProductCard";
import { Eyebrow } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CATEGORIES, PRODUCTS, money } from "@/lib/data";

const PRICE_MIN = Math.min(...PRODUCTS.map((p) => p.price));
const PRICE_MAX = Math.max(...PRODUCTS.map((p) => p.price));

export default function Products({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const initial = use(searchParams);
  const [cat, setCat] = useState(initial.cat || "all");
  const [q, setQ] = useState(initial.q || "");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => cat === "all" || p.cat === cat);
    l = l.filter((p) => p.price <= maxPrice);
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter((p) => (p.name + p.origin + p.blurb).toLowerCase().includes(s));
    }
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [cat, q, sort, maxPrice]);

  const clearAll = () => {
    setCat("all");
    setQ("");
    setMaxPrice(PRICE_MAX);
  };

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
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <div className="filter-group">
              <h4>Category</h4>
              <button className={`filter-link ${cat === "all" ? "is-on" : ""}`} onClick={() => setCat("all")}>
                All spices
              </button>
              {CATEGORIES.map((c) => (
                <button key={c.id} className={`filter-link ${cat === c.id ? "is-on" : ""}`} onClick={() => setCat(c.id)}>
                  {c.label}
                </button>
              ))}
            </div>
            <div className="filter-group">
              <h4>Price</h4>
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="filter-price-val">Up to {money(maxPrice)}</div>
            </div>
            <button className="btn btn-ghost btn-block" onClick={clearAll}>
              Clear all filters
            </button>
          </aside>

          <div className="shop-main">
            <div className="shop-bar">
              <span className="shop-count">{list.length} spices</span>
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
                <button className="btn btn-primary" onClick={clearAll}>
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
      </div>
    </div>
  );
}
