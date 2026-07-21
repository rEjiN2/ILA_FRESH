import Link from "next/link";
import { notFound } from "next/navigation";
import SpiceTile from "@/components/SpiceTile";
import { BLOG, BLOG_IMG, PRODUCTS } from "@/lib/data";

export function generateStaticParams() {
  return BLOG.map((b) => ({ id: b.id }));
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = BLOG.find((b) => b.id === id);
  if (!post) notFound();
  const more = BLOG.filter((b) => b.id !== post.id).slice(0, 2);

  return (
    <div className="page">
      <article className="wrap article">
        <Link href="/blog" className="link">
          ← The Journal
        </Link>
        <span className="jcard-cat">{post.cat}</span>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-meta">
          {post.date} · {post.read} · By {post.author}
        </p>
        <div className="article-hero">
          <SpiceTile spice={PRODUCTS[0]} src={BLOG_IMG} showBadge={false} />
        </div>
        <div className="article-body">
          {post.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
      <section className="wrap section">
        <div className="sec-head">
          <h2 className="sec-title">Keep reading</h2>
        </div>
        <div className="journal-grid">
          {more.map((b) => (
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
    </div>
  );
}
