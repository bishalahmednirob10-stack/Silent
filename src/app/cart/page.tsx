"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SHIPPING_FEE, formatTaka } from "@/lib/products";
import { cartKey, useCart } from "@/lib/store";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const delivery = subtotal > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + delivery;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Cart</h1>
        {items.length === 0 ? (
          <div className="mt-8 rounded-lg border border-black/10 bg-white p-8 text-center">
            <p className="text-xl font-black">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-5 inline-flex h-11 items-center rounded-lg bg-[#161412] px-5 text-sm font-black text-white"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <section className="grid gap-4">
              {items.map((item) => {
                const key = cartKey(item);
                return (
                <article
                  key={key}
                  className="grid gap-4 rounded-lg border border-black/10 bg-white p-4 shadow-sm sm:grid-cols-[130px_1fr_auto]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={260}
                    height={260}
                    className="h-32 w-full rounded-lg object-cover sm:w-32"
                  />
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-xl font-black hover:text-[#e63b2e]"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 font-bold text-[#e63b2e]">
                      {formatTaka(item.price)}
                    </p>
                    {item.phoneModel ? (
                      <p className="mt-2 text-sm font-bold text-black/60">
                        Phone Model: {item.phoneModel}
                      </p>
                    ) : null}
                    {item.stickerSize ? (
                      <p className="mt-2 text-sm font-bold text-black/60">
                        Sticker Size: {item.stickerSize.width} x{" "}
                        {item.stickerSize.height} in ({item.stickerSize.area} sq in)
                      </p>
                    ) : null}
                    <div className="mt-4 inline-flex items-center rounded-lg border border-black/10">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1, key)
                        }
                        className="grid size-10 place-items-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="grid h-10 w-10 place-items-center font-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1, key)
                        }
                        className="grid size-10 place-items-center"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, key)}
                    className="grid size-10 place-items-center rounded-lg border border-black/10 text-black/50 hover:text-[#e63b2e]"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </article>
                );
              })}
            </section>

            <aside className="h-fit rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">Order summary</h2>
              <dl className="mt-5 grid gap-3 text-sm font-bold">
                <div className="flex justify-between">
                  <dt className="text-black/60">Subtotal</dt>
                  <dd>{formatTaka(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-black/60">Delivery</dt>
                  <dd>{formatTaka(delivery)}</dd>
                </div>
                <div className="flex justify-between border-t border-black/10 pt-3 text-lg">
                  <dt>Total</dt>
                  <dd>{formatTaka(total)}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                className="mt-5 flex h-12 items-center justify-center rounded-lg bg-[#161412] px-5 text-sm font-black text-white hover:bg-[#e63b2e]"
              >
                Checkout
              </Link>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}
