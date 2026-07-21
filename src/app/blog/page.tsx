import Link from "next/link";
import SpiceTile from "@/components/SpiceTile";
import { Eyebrow } from "@/components/ui";
import { BLOG, BLOG_IMG, PRODUCTS } from "@/lib/data";

export default function Blog() {
  const [lead, ...rest] = BLOG;
  return (
    <div className="page">
      <header className="phead">
        <div className="wrap">
          <Eyebrow>The Journal</Eyebrow>
          <h1 className="phead-title">Notes from the source</h1>
          <p className="phead-sub">
            Field notes, kitchen technique and the odd recipe — from the people who grow, grind and cook with
            these spices.
          </p>
        </div>
      </header>

      <div className="wrap section">
        <Link href={`/blog/${lead.id}`} className="feature">
          <div className="feature-art">
            <SpiceTile spice={PRODUCTS[0]} src={BLOG_IMG} showBadge={false} />
          </div>
          <div className="feature-copy">
            <span className="jcard-cat">{lead.cat} · Featured</span>
            <h2>{lead.title}</h2>
            <p>{lead.excerpt}</p>
            <span className="jcard-meta">
              {lead.date} · {lead.read} · {lead.author}
            </span>
          </div>
        </Link>

        <div className="journal-grid journal-grid--all">
          {rest.map((b) => (
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
      </div>
    </div>
  );
}
