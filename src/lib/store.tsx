"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, STICKER_PRICE_PER_SQ_INCH } from "./products";

export type CartItem = {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  type: Product["type"];
  phoneModel?: string;
  stickerSize?: {
    width: number;
    height: number;
    area: number;
  };
};

export type CartSelection = {
  phoneModel?: string;
  stickerSize?: {
    width: number;
    height: number;
  };
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, selection?: CartSelection) => void;
  removeItem: (id: string, key?: string) => void;
  updateQuantity: (id: string, quantity: number, key?: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function cartKey(item: Pick<CartItem, "id" | "phoneModel" | "stickerSize">) {
  const stickerKey = item.stickerSize
    ? `${item.stickerSize.width}x${item.stickerSize.height}`
    : "";
  return [item.id, item.phoneModel ?? "", stickerKey].join(":");
}

function selectionKey(id: string, selection?: CartSelection) {
  const stickerKey = selection?.stickerSize
    ? `${selection.stickerSize.width}x${selection.stickerSize.height}`
    : "";
  return [id, selection?.phoneModel ?? "", stickerKey].join(":");
}

function itemFromProduct(product: Product, selection?: CartSelection): CartItem {
  const width = Math.max(selection?.stickerSize?.width ?? 3, 1);
  const height = Math.max(selection?.stickerSize?.height ?? 3, 1);
  const area = width * height;
  const stickerSize =
    product.type === "sticker" ? { width, height, area } : undefined;

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    image: product.image,
    price:
      product.type === "sticker"
        ? area * STICKER_PRICE_PER_SQ_INCH
        : product.price,
    quantity: 1,
    type: product.type,
    phoneModel: product.type === "case" ? selection?.phoneModel : undefined,
    stickerSize,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedCart = window.localStorage.getItem("stickerfizz-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    window.localStorage.setItem("stickerfizz-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, selection?: CartSelection) => {
      setItems((current) => {
        const key = selectionKey(product.id, selection);
        const existing = current.find((item) => cartKey(item) === key);

        if (existing) {
          return current.map((item) =>
            cartKey(item) === key
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [...current, itemFromProduct(product, selection)];
      });
    };

    const removeItem = (id: string, key?: string) => {
      setItems((current) => {
        const targetKey = key ?? id;
        return current.filter((item) => cartKey(item) !== targetKey);
      });
    };

    const updateQuantity = (id: string, quantity: number, key?: string) => {
      if (quantity < 1) {
        removeItem(id, key);
        return;
      }

      setItems((current) =>
        current.map((item) => {
          const itemKey = cartKey(item);
          const targetKey = key ?? id;
          return itemKey === targetKey
            ? { ...item, quantity }
            : item;
        }),
      );
    };

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart: () => setItems([]),
      count,
      subtotal,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
