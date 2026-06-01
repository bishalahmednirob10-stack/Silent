import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { products } from "@/lib/products";

const baseUrl = brand.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/products",
    "/cart",
    "/checkout",
    ...products.map((product) => `/products/${product.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
