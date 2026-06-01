import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Star, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import { ProductActions } from "./product-actions";
import { brand } from "@/lib/brand";
import { formatTaka, getProduct, getRelatedProducts, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = getProduct((await params).slug);
  return {
    title: product ? `${product.title} | ${brand.displayName}` : "Product",
    description: product?.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = getProduct((await params).slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-black text-black/60 hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to catalog
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1fr_480px]">
          <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
            <div className="overflow-hidden rounded-lg bg-white">
              <Image
                src={product.image}
                alt={product.title}
                width={900}
                height={980}
                priority
                className="h-[560px] w-full object-cover"
              />
            </div>
            <div className="grid gap-3 sm:block">
              {product.images.map((image) => (
                <div
                  key={image}
                  className="mb-3 overflow-hidden rounded-lg border border-black/10 bg-white"
                >
                  <Image
                    src={image}
                    alt={product.title}
                    width={220}
                    height={220}
                    className="h-28 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="inline-flex rounded-full bg-[#ffce6b] px-3 py-1 text-xs font-black">
              {product.category}
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex items-center gap-1 font-black">
                <Star size={18} className="fill-[#ffce6b] text-[#ffce6b]" />
                {product.rating}
              </span>
              <span className="text-black/35">|</span>
              <span className="font-bold text-black/60">{product.stock} in stock</span>
            </div>
            <p className="mt-5 text-lg leading-8 text-black/68">
              {product.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-4xl font-black text-[#e63b2e]">
                {product.type === "sticker" ? "From " : ""}
                {formatTaka(product.price)}
              </span>
              {product.oldPrice ? (
                <span className="text-lg font-bold text-black/35 line-through">
                  {formatTaka(product.oldPrice)}
                </span>
              ) : null}
              {product.type === "case" ? (
                <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">
                  Save Tk 50
                </span>
              ) : null}
            </div>
            <ProductActions product={product} />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-black/10 bg-white p-4">
                <Truck className="mb-2" size={20} />
                <p className="font-black">Fast Bangladesh delivery</p>
                <p className="text-sm text-black/60">COD and SSLCommerz checkout.</p>
              </div>
              <div className="rounded-lg border border-black/10 bg-white p-4">
                <ShieldCheck className="mb-2" size={20} />
                <p className="font-black">Protected finish</p>
                <p className="text-sm text-black/60">Water-resistant print layer.</p>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-6 text-3xl font-black tracking-tight">Related products</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
