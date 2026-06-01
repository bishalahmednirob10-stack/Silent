"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { brand } from "@/lib/brand";
import { useCart } from "@/lib/store";

const nav = [
  { label: "Shop", href: "/products" },
  { label: "Custom", href: "/#contact" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#fffaf6]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-black">
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-full bg-[#161412] text-[#ffce6b]">
            <Image src={brand.logo} alt={`${brand.displayName} logo`} fill className="object-cover" />
          </span>
          <span className="text-xl tracking-tight">{brand.displayName}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-black/70 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-black">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="hidden size-10 place-items-center rounded-lg border border-black/10 bg-white text-black shadow-sm transition hover:border-black/25 sm:grid"
            aria-label="Search products"
          >
            <Search size={18} />
          </Link>
          <Link
            href="/cart"
            className="relative grid size-10 place-items-center rounded-lg bg-[#161412] text-white shadow-sm transition hover:bg-[#e63b2e]"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#ffce6b] text-[11px] font-black text-black">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-lg border border-black/10 bg-white md:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="border-t border-black/10 bg-[#fffaf6] px-4 py-4 shadow-lg md:hidden">
          <nav className="grid gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-[14px] px-3 py-3 text-base font-black hover:bg-[#f4c45a]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
