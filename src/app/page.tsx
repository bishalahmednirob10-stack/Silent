import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Mail,
  MessageCircle,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { MotionGrid, MotionItem, MotionSection } from "@/components/motion";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import { StickerCalculator } from "@/components/sticker-calculator";
import ProductCarousel from "@/components/product-carousel";
import { brand } from "@/lib/brand";
import { collectionCards, products } from "@/lib/products";

const featured = products.filter((product) => product.featured).slice(0, 8);
const trendingProducts = products.filter((p) => p.featured).slice(0, 11);
const whatsappLink = `https://wa.me/${brand.phone.replace(/\D/g, "")}`;

const trustItems = [
  { label: "COD Available", Icon: BadgeCheck },
  { label: "Fast Delivery", Icon: Truck },
  { label: "Waterproof Print", Icon: ShieldCheck },
  { label: "4.9 Rating", Icon: Star },
];

const reviews = [
  {
    name: "Rafi, Dhaka",
    text: "The anime stickers held up on my water bottle and the colors stayed sharp.",
    image: "/products/stickers/naruto.png",
  },
  {
    name: "Nusrat, Chattogram",
    text: "My phone case print feels premium, and choosing the model was easy.",
    image: "/products/phone-cases/fire.jpg",
  },
  {
    name: "Ayon, Sylhet",
    text: "The live size calculator made custom sticker pricing super clear.",
    image: "/products/stickers/f1.jpg",
  },
];

const contactItems = [
  {
    label: "Instagram",
    value: "@stickerfizzbd",
    href: brand.instagramUrl,
    Icon: Camera,
  },
  {
    label: "Facebook",
    value: "StickerFizz BD",
    href: brand.facebookUrl,
    Icon: MessageCircle,
  },
  {
    label: "WhatsApp",
    value: brand.phone,
    href: whatsappLink,
    Icon: MessageCircle,
  },
  {
    label: "Email",
    value: brand.email,
    href: `mailto:${brand.email}`,
    Icon: Mail,
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-[#fbf7f1]">
          <div className="mx-auto grid min-h-[calc(100svh-64px)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_430px] lg:px-8">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full bg-black px-4 py-2 text-sm font-black text-[#f4c45a]">
                Bangladesh-made custom prints
              </p>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-black sm:text-6xl lg:text-7xl">
                Premium Custom Stickers & Phone Cases
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-black/65">
                Bangladesh-made custom prints for anime, gaming, football, F1
                and creators.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex h-13 min-h-12 items-center justify-center gap-2 rounded-[16px] bg-black px-6 text-sm font-black text-white transition hover:bg-[#e63b2e]"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  className="inline-flex h-13 min-h-12 items-center justify-center gap-2 rounded-[16px] border border-black/15 bg-white px-6 text-sm font-black text-black transition hover:border-green-600 hover:text-green-700"
                >
                  <MessageCircle size={18} />
                  WhatsApp Order
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {trustItems.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="rounded-[18px] border border-black/10 bg-white p-3 shadow-sm"
                  >
                    <Icon size={20} className="mb-2 text-green-700" />
                    <p className="text-sm font-black">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-6 -top-6 hidden rounded-full bg-[#f4c45a] px-5 py-3 text-sm font-black shadow-xl lg:block">
                Latest products
              </div>
              <ProductCarousel products={trendingProducts as any} />
            </div>
          </div>
        </section>

        <MotionSection className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-red-600">
                  Trending Collections
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Swipe into your style
                </h2>
              </div>
              <Link href="/products" className="hidden text-sm font-black sm:block">
                View all
              </Link>
            </div>
            <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
              {collectionCards.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group w-[76vw] shrink-0 snap-start overflow-hidden rounded-[22px] border border-black/10 bg-[#fbf7f1] shadow-sm transition hover:-translate-y-1 sm:w-64 lg:w-auto"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={520}
                    height={420}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-black">{category.name}</h3>
                    <p className="mt-3 inline-flex text-sm font-black text-red-600">
                      Shop Button
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#f1ede7] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-red-600">
                Best Sellers
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Loved by creators and collectors
              </h2>
            </div>
            <MotionGrid className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <MotionItem key={product.id}>
                  <ProductCard product={product} />
                </MotionItem>
              ))}
            </MotionGrid>
          </div>
        </MotionSection>

        <MotionSection id="reviews" className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-red-600">
                  Reviews
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Real orders, real print quality
                </h2>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    ["7.5K+", "Orders Completed"],
                    ["6.2K+", "Happy Customers"],
                    ["4.9", "Average Rating"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-[18px] bg-[#fbf7f1] p-3">
                      <p className="text-2xl font-black">{value}</p>
                      <p className="mt-1 text-xs font-bold text-black/55">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {reviews.map((review) => (
                  <figure
                    key={review.name}
                    className="rounded-[22px] border border-black/10 bg-white p-4 shadow-sm"
                  >
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={360}
                      height={260}
                      className="h-36 w-full rounded-[16px] object-cover"
                    />
                    <div className="mt-4 flex gap-1 text-[#f4c45a]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="fill-current" />
                      ))}
                    </div>
                    <blockquote className="mt-3 text-sm font-bold leading-6 text-black/70">
                      {review.text}
                    </blockquote>
                    <figcaption className="mt-4 font-black">{review.name}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection id="contact" className="bg-[#fbf7f1] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-red-600">
                Contact
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Order on the channel you already use
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {contactItems.map(({ label, value, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  className="rounded-[22px] border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1"
                >
                  <span className="grid size-11 place-items-center rounded-[14px] bg-black text-[#f4c45a]">
                    <Icon size={19} />
                  </span>
                  <p className="mt-5 text-sm font-bold text-black/50">{label}</p>
                  <p className="mt-1 break-words font-black">{value}</p>
                </Link>
              ))}
            </div>
          </div>
        </MotionSection>
      </main>
    </>
  );
}
