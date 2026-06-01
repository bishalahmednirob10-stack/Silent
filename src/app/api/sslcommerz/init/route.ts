import { NextResponse } from "next/server";
import SSLCommerzPayment from "sslcommerz-lts";

type InitPayload = {
  total: number;
  orderId: string;
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
    city?: string;
    address?: string;
  };
  items?: {
    title: string;
  }[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as InitPayload;
  const storeId = process.env.SSLC_STORE_ID;
  const storePassword = process.env.SSLC_STORE_PASSWORD;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const isLive = process.env.SSLC_IS_LIVE === "true";

  if (!storeId || !storePassword) {
    return NextResponse.json({
      ok: false,
      message:
        "SSLCommerz credentials are not configured yet. Add SSLC_STORE_ID and SSLC_STORE_PASSWORD to enable live payments.",
      received: body,
    });
  }

  const customer = body.customer ?? {};
  const productName =
    body.items?.map((item) => item.title).join(", ").slice(0, 240) ??
    "StickerFizz BD order";
  const payment = new SSLCommerzPayment(storeId, storePassword, isLive);
  const response = await payment.init({
    total_amount: body.total,
    currency: "BDT",
    tran_id: body.orderId,
    success_url: `${siteUrl}/checkout/success?orderId=${body.orderId}`,
    fail_url: `${siteUrl}/checkout?payment=failed`,
    cancel_url: `${siteUrl}/checkout?payment=cancelled`,
    ipn_url: `${siteUrl}/api/sslcommerz/ipn`,
    shipping_method: "Courier",
    product_name: productName,
    product_category: "Custom prints",
    product_profile: "general",
    cus_name: customer.name ?? "StickerFizz Customer",
    cus_email: customer.email || "customer@stickerfizzbd.com",
    cus_add1: customer.address ?? "Bangladesh",
    cus_city: customer.city ?? "Dhaka",
    cus_state: customer.city ?? "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: customer.phone ?? "01700000000",
    ship_name: customer.name ?? "StickerFizz Customer",
    ship_add1: customer.address ?? "Bangladesh",
    ship_city: customer.city ?? "Dhaka",
    ship_state: customer.city ?? "Dhaka",
    ship_postcode: "1000",
    ship_country: "Bangladesh",
  });

  return NextResponse.json({
    ok: Boolean(response.GatewayPageURL),
    message: response.GatewayPageURL
      ? "SSLCommerz session created."
      : response.failedreason ?? "SSLCommerz did not return a gateway URL.",
    gatewayUrl: response.GatewayPageURL,
    paymentMethods: ["bKash", "Nagad", "Visa", "Mastercard"],
  });
}
