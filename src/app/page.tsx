"use client";

import Link from "next/link";
import SpiceTile from "@/components/SpiceTile";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { Eyebrow, Rating } from "@/components/ui";
import { Icon } from "@/components/icons";
import { BLOG, CAT_IMG, HERO_IMG, HERO_MINI, PRODUCTS, money } from "@/lib/data";

const ORIGINS = ["Idukki", "Wayanad", "Alleppey", "Matale", "Kashmir", "Zanzibar", "Guangxi", "Gujarat"];

const COLLECTIONS = [
  { id: "whole", label: "Whole Spices", sub: "Sun-dried • Single Origin • Handpicked", icon: Icon.leaf },
  { id: "ground", label: "Ground Spices", sub: "Finely milled • Small batches", icon: Icon.mortar },
  { id: "blends", label: "Blends", sub: "Expertly crafted • Rich in flavor", icon: Icon.flower },
  { id: "botanical", label: "Botanicals & Tea", sub: "Steep • Sip • Restore", icon: Icon.cup },
];

const VALUES = [
  { n: "01", title: "Single-Origin Harvest", desc: "Handpicked from the finest growing regions for distinct aroma and flavor.", img: CAT_IMG.whole, icon: Icon.leaf },
  { n: "02", title: "Freshly Milled", desc: "Ground in small batches only after you order — always fresh, never sitting on shelves.", img: CAT_IMG.ground, icon: Icon.mortar },
  { n: "03", title: "Fair & Ethical Trade", desc: "We work directly with farmers and pay above-market prices for quality that lasts.", img: CAT_IMG.blends, icon: Icon.hand },
  { n: "04", title: "Lab-Tested Purity", desc: "Every batch is tested for purity and safety. No fillers, no colors, no compromises.", img: CAT_IMG.botanical, icon: Icon.flask },
];

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

      {/* Collections */}
      <section className="band band--cream">
        <div className="wrap section">
          <div className="sec-head sec-head--center">
            <Eyebrow>Loved by the kitchen</Eyebrow>
            <h2 className="sec-title">Explore Our Collections</h2>
            <p className="coll-sub">
              From whole spices to handcrafted blends,
              <br />
              every product is sourced for freshness and authenticity.
            </p>
          </div>
          <div className="coll-grid">
            {COLLECTIONS.map((c) => (
              <Link key={c.id} href={`/products?cat=${c.id}`} className={`coll-card coll-card--${c.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="coll-bg" src={CAT_IMG[c.id]} alt={c.label} loading="lazy" />
                <div className="coll-overlay" />
                <span className="coll-arrow">
                  <Icon.arrow />
                </span>
                <div className="coll-body">
                  <span className="coll-icon">
                    <c.icon />
                  </span>
                  <h3 className="coll-title">{c.label}</h3>
                  <p className="coll-note">{c.sub}</p>
                  <span className="coll-btn">
                    Explore Collection <Icon.arrow />
                  </span>
                </div>
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="strip-bg" src="/ila-banner3.jpg" alt="" aria-hidden="true" />
        <div className="strip-atmos" />
        <div className="wrap strip-inner">
          <div className="strip-art strip-cards">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="strip-card strip-card-1" src="/card1.jpg" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="strip-card strip-card-2" src="/card2.jpg" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="strip-card strip-card-3" src="/card3.jpg" alt="" />
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
      <section className="band band--cream">
        <div className="wrap section">
          <div className="values">
            {VALUES.map((v) => (
              <div key={v.n} className="value">
                <div className="value-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.img} alt="" loading="lazy" />
                </div>
                <span className="value-icon-wrap">
                  <span className="value-icon">
                    <v.icon />
                  </span>
                </span>
                <div className="value-body">
                  <span className="value-no">{v.n}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                  <Link href="/about" className="value-link">
                    Learn more <Icon.arrow />
                  </Link>
                </div>
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
