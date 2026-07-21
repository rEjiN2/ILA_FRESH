"use client";

import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import { Eyebrow } from "@/components/ui";
import { Icon } from "@/components/icons";

export default function About() {
  return (
    <div className="page">
      <header className="phead phead--tall">
        <div className="wrap">
          <Eyebrow>Our story</Eyebrow>
          <h1 className="phead-title">
            A leaf, a legacy,
            <br />
            and the long way round.
          </h1>
          <p className="phead-sub wide">
            ila means <i>leaf</i>. We started with one estate&apos;s cardamom and a stubborn belief that spice
            should taste like where it came from. This is how that grew into a house.
          </p>
          <div className="article-hero phead-banner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ila-story-banner.jpg" alt="The ila estate" />
          </div>
        </div>
      </header>

      <section className="wrap section prose">
        <div className="prose-cols">
          <div>
            <h2 className="sec-title">It began with a bad jar</h2>
            <p>
              Someone in the family bought cardamom that smelled of nothing. We had grown up around the real
              thing in the Idukki hills, and the gap between that memory and that jar was the whole idea. Good
              spice existed; it just wasn&apos;t reaching people.
            </p>
            <p>
              So we went back to the source, bought direct from the growers we trusted, and refused to let
              anything sit long enough to fade. What started as pods for friends became a shelf, and the shelf
              became ila.
            </p>
          </div>
          <div>
            <h2 className="sec-title">What we won&apos;t do</h2>
            <p>
              We won&apos;t blend origins to hit a price. We won&apos;t grind a year ahead and hope you don&apos;t
              notice. We won&apos;t add rice flour, dye or anti-caking agents to make cheap spice behave. One
              ingredient, named and dated — that&apos;s the entire promise.
            </p>
            <p>
              Everything is milled in small batches in Sharjah and shipped close to harvest. If it isn&apos;t
              good enough for our own kitchen, it doesn&apos;t get a label.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="timeline">
          {[
            ["Est.", "One estate, one spice", "Idukki cardamom, sold to friends and a handful of restaurants who kept asking for more."],
            ["Now", "A curated house", "Whole spices, small-batch grinds and blends, sourced direct and milled to order."],
            ["Next", "An open platform", "Independent growers and makers selling through ila, with our storefront, payments and logistics behind them."],
          ].map(([k, t, d], i) => (
            <div key={i} className="tl-item">
              <span className="tl-key">{k}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sellers" className="strip strip--sellers">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="strip-bg" src="/story-background.jpg" alt="" aria-hidden="true" />
        <div className="strip-atmos" />
        <div className="wrap strip-inner">
          <div className="strip-copy">
            <Eyebrow>For growers & makers</Eyebrow>
            <h2 className="strip-title">Sell your spice through ila</h2>
            <p>
              We&apos;re opening the shelf. If you grow or blend something that meets our standard, list it on
              ila and reach a kitchen that already cares about origin. You keep the craft and the margin; we
              take a simple commission per sale and handle the storefront, payments, customer support and
              delivery. No shopfront to build, no ads to buy.
            </p>
            <ul className="sell-points">
              <li>
                <Icon.check /> Transparent commission, taken only when you sell
              </li>
              <li>
                <Icon.check /> Payments, invoicing and payouts handled for you
              </li>
              <li>
                <Icon.check /> Shared logistics and warehousing across the UAE
              </li>
              <li>
                <Icon.check /> A storefront built for single-origin products
              </li>
            </ul>
            <Link href="/contact?subject=seller" className="btn btn-primary">
              Apply to sell
              <Icon.arrow />
            </Link>
          </div>
          <div className="strip-art strip-art--right strip-cards">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="strip-card strip-card-1" src="/card1.jpg" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="strip-card strip-card-2" src="/card2.jpg" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="strip-card strip-card-3" src="/card3.jpg" alt="" />
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
