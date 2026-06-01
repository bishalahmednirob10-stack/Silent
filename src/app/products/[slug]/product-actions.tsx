"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Ruler, ShoppingBag } from "lucide-react";
import { PhoneModelSelector } from "@/components/phone-model-selector";
import { brand } from "@/lib/brand";
import {
  Product,
  STICKER_PRICE_PER_SQ_INCH,
  formatTaka,
} from "@/lib/products";
import { useCart } from "@/lib/store";

function whatsappUrl(message: string) {
  return `https://wa.me/${brand.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    message,
  )}`;
}

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);
  const [phoneModel, setPhoneModel] = useState("");
  const [error, setError] = useState("");
  const stickerSize = useMemo(
    () => ({
      width: Math.max(Number(width) || 1, 1),
      height: Math.max(Number(height) || 1, 1),
    }),
    [height, width],
  );
  const area = stickerSize.width * stickerSize.height;
  const price =
    product.type === "sticker"
      ? area * STICKER_PRICE_PER_SQ_INCH
      : product.price;

  function validate() {
    if (product.type === "case" && !phoneModel) {
      setError("Select your phone model before ordering.");
      return false;
    }
    setError("");
    return true;
  }

  function handleAddToCart() {
    if (!validate()) {
      return;
    }

    addItem(product, {
      phoneModel,
      stickerSize: product.type === "sticker" ? stickerSize : undefined,
    });
  }

  function directOrder() {
    if (!validate()) {
      return;
    }

    const lines = [
      `StickerFizz BD order`,
      `Product: ${product.title}`,
      product.type === "case" ? `Phone Model: ${phoneModel}` : null,
      product.type === "sticker" ? `Width: ${stickerSize.width} in` : null,
      product.type === "sticker" ? `Height: ${stickerSize.height} in` : null,
      product.type === "sticker" ? `Area: ${area} sq in` : null,
      `Price: ${formatTaka(price)}`,
    ].filter(Boolean);

    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-7 grid gap-4">
      {product.type === "sticker" ? (
        <div className="rounded-[20px] border border-black/10 bg-white p-4">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-[14px] bg-[#f4c45a]">
              <Ruler size={18} />
            </span>
            <div>
              <p className="font-black">Live sticker calculator</p>
              <p className="text-sm font-bold text-black/55">
                Width x Height x Tk {STICKER_PRICE_PER_SQ_INCH}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-bold">
              Width (in)
              <input
                min={1}
                max={24}
                step={0.5}
                type="number"
                value={width}
                onChange={(event) => setWidth(Number(event.target.value))}
                className="mt-2 h-12 w-full rounded-[14px] border border-black/10 px-3 outline-none focus:border-black"
              />
            </label>
            <label className="text-sm font-bold">
              Height (in)
              <input
                min={1}
                max={24}
                step={0.5}
                type="number"
                value={height}
                onChange={(event) => setHeight(Number(event.target.value))}
                className="mt-2 h-12 w-full rounded-[14px] border border-black/10 px-3 outline-none focus:border-black"
              />
            </label>
          </div>
          <div className="mt-4 rounded-[18px] bg-black p-4 text-white">
            <p className="text-sm font-bold text-white/65">
              {stickerSize.width} x {stickerSize.height} x{" "}
              {STICKER_PRICE_PER_SQ_INCH}
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <p className="text-sm font-bold text-white/65">
                Area: {area} sq in
              </p>
              <p className="text-3xl font-black">{formatTaka(price)}</p>
            </div>
          </div>
        </div>
      ) : (
        <PhoneModelSelector value={phoneModel} onChange={setPhoneModel} />
      )}

      {error ? (
        <p className="rounded-[14px] bg-red-50 p-3 text-sm font-bold text-red-700">
          {error}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={handleAddToCart}
          aria-label={`Add ${product.title} to cart`}
          className="flex h-13 min-h-12 items-center justify-center gap-2 rounded-[16px] bg-black px-6 text-sm font-black text-white transition hover:bg-[#e63b2e]"
        >
          <ShoppingBag size={18} />
          Add To Cart
        </button>
        <button
          onClick={directOrder}
          className="flex h-13 min-h-12 items-center justify-center gap-2 rounded-[16px] border border-black/15 bg-white px-6 text-sm font-black text-black transition hover:border-green-600 hover:text-green-700"
        >
          <MessageCircle size={18} />
          Direct Order
        </button>
      </div>
    </div>
  );
}
