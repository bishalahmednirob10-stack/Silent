"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Product, formatTaka } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden bg-[#f3eee8]">
        <Image
          src={product.image}
          alt={product.title}
          width={700}
          height={760}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#ffe8a8] px-3 py-1 text-xs font-bold text-black">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-black/70">
            <Star size={14} className="fill-[#ffce6b] text-[#ffce6b]" />
            {product.rating}
          </span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-14 text-lg font-black tracking-tight">
            {product.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-black/60">
          {product.description}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xl font-black text-[#e63b2e]">
            {product.type === "sticker" ? "From " : ""}
            {formatTaka(product.price)}
          </span>
          {product.oldPrice ? (
            <span className="text-sm font-semibold text-black/35 line-through">
              {formatTaka(product.oldPrice)}
            </span>
          ) : null}
        </div>
        <Link
          href={`/products/${product.slug}`}
          aria-label={`Customize ${product.title}`}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-[14px] bg-[#161412] px-4 text-sm font-black text-white transition hover:bg-[#e63b2e]"
        >
          Customize
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}
