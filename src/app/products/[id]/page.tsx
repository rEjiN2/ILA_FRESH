import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const spice = PRODUCTS.find((p) => p.id === id);
  if (!spice) notFound();
  return <ProductDetail spice={spice} />;
}
