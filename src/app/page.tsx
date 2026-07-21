"use client";

import Link from "next/link";
import SpiceTile from "@/components/SpiceTile";
import Sprig from "@/components/Sprig";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { Eyebrow, Rating } from "@/components/ui";
import { Icon } from "@/components/icons";
import { BLOG, CATEGORIES, CAT_IMG, HERO_IMG, HERO_MINI, PRODUCTS, money } from "@/lib/data";

const ORIGINS = ["Idukki", "Wayanad", "Alleppey", "Matale", "Kashmir", "Zanzibar", "Guangxi", "Gujarat"];

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.best).slice(0, 4);
  const hero = PRODUCTS[0];

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-bg" src={HERO_IMG} alt="" aria-hidden="true" />
        <div className="hero-atmos" />
        <div className="wrap hero-inner">
          <div className="hero-copy reveal">
            <Eyebrow>Idukki-grown · Small batch</Eyebrow>
            <h1 className="hero-title">
              A modern
              <br />
              <em className="ital">spice</em> legacy
            </h1>
            <p className="hero-sub">
              Single-origin cardamom and botanical blends, sourced from the farms that grow them
              best and milled the week they ship. Nothing old on our shelves.
            </p>
            <div className="hero-cta">
              <Link href="/products" className="btn btn-primary btn-lg">
                Shop the collection
                <Icon.arrow />
              </Link>
              <Link href="/about" className="btn btn-ghost btn-lg">
                Our story
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <b>12</b>
                <span>single-origin spices</span>
              </div>
              <span className="hs-div" />
              <div>
                <b>48h</b>
                <span>mill to dispatch</span>
              </div>
              <span className="hs-div" />
              <div>
                <b>4.9★</b>
                <span>average rating</span>
              </div>
            </div>
          </div>
          <div className="hero-collage reveal reveal-2">
            <div className="hc-main">
              <SpiceTile spice={hero} src={HERO_IMG} showBadge={false} />
            </div>
            <div className="hc-mini">
              <SpiceTile spice={hero} src={HERO_MINI} small showBadge={false} />
            </div>
            <Link href={`/products/${hero.id}`} className="hc-card">
              <span className="hf-eyebrow">This week from the estate</span>
              <strong>{hero.name}</strong>
              <div className="hf-row">
                <Rating value={hero.rating} count={hero.reviews} mini />
                <span className="hf-price">{money(hero.price)}</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...Array(2)].flatMap((_, k) =>
              ORIGINS.map((o, i) => (
                <span key={k + "-" + i}>
                  {o}
                  <i className="mq-dot" />
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Category rail */}
      <section className="band band--white">
        <div className="wrap section">
          <div className="cats">
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={`/products?cat=${c.id}`} className="cat">
                <div className="cat-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={CAT_IMG[c.id]} alt={c.label} loading="lazy" />
                </div>
                <div className="cat-text">
                  <span className="cat-label">{c.label}</span>
                  <span className="cat-note">{c.note}</span>
                </div>
                <span className="cat-arrow">
                  <Icon.arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="wrap section">
        <div className="sec-head">
          <div>
            <Eyebrow>Loved by the kitchen</Eyebrow>
            <h2 className="sec-title">This season&apos;s bestsellers</h2>
          </div>
          <Link href="/products" className="link">
            All spices <Icon.arrow />
          </Link>
        </div>
        <div className="grid">
          {featured.map((p) => (
            <ProductCard key={p.id} spice={p} />
          ))}
        </div>
      </section>

      {/* Story strip */}
      <section className="strip">
        <div className="wrap strip-inner">
          <div className="strip-art">
            <Sprig color="rgba(231,229,219,0.5)" />
          </div>
          <div className="strip-copy">
            <Eyebrow>The ila way</Eyebrow>
            <h2 className="strip-title">From the Idukki hills, and soon from farms like it everywhere.</h2>
            <p>
              ila — <i>leaf</i>, in Malayalam — began with a single estate&apos;s cardamom. Today we&apos;re
              opening the platform to independent growers and makers who share our standard, so the
              best small producers can reach your kitchen directly. We handle storefront, payments
              and delivery; they keep doing what they do best.
            </p>
            <div className="hero-cta">
              <Link href="/about" className="btn btn-primary">
                Read our story
                <Icon.arrow />
              </Link>
              <Link href="/about#sellers" className="btn btn-ghost">
                Become a seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="band band--white">
        <div className="wrap section">
          <div className="values">
            {[
              ["Single origin, named", "Every jar tells you the exact region it grew in — not just a country."],
              ["Milled to order", "Ground spices are milled the week they ship, then dated on the label."],
              ["Fair at the farm gate", "We buy direct and pay above market, so quality is worth growing."],
              ["Lab-tested purity", "No fillers, no dyes, no anti-caking agents. One ingredient, checked."],
            ].map(([t, d], i) => (
              <div key={i} className="value">
                <span className="value-no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal teaser */}
      <section className="wrap section">
        <div className="sec-head">
          <div>
            <Eyebrow>The Journal</Eyebrow>
            <h2 className="sec-title">Notes from the source</h2>
          </div>
          <Link href="/blog" className="link">
            All stories <Icon.arrow />
          </Link>
        </div>
        <div className="journal-grid">
          {BLOG.slice(0, 3).map((b) => (
            <Link key={b.id} href={`/blog/${b.id}`} className="jcard">
              <span className="jcard-cat">{b.cat}</span>
              <h3>{b.title}</h3>
              <p>{b.excerpt}</p>
              <span className="jcard-meta">
                {b.date} · {b.read}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
