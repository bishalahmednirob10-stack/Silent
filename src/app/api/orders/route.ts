import { NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type OrderPayload = {
  customer: {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
  };
  items: {
    id: string;
    title: string;
    slug: string;
    price: number;
    quantity: number;
    phoneModel?: string;
    stickerSize?: {
      width: number;
      height: number;
      area: number;
    };
  }[];
  subtotal: number;
  delivery: number;
  total: number;
  paymentMethod: "cod" | "sslcommerz";
};

export async function POST(request: Request) {
  const order = (await request.json()) as OrderPayload;
  const orderId = `SF-${Date.now()}`;
  const firebaseReady = Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (firebaseReady && db) {
    try {
      await addDoc(collection(db, "orders"), {
        orderId,
        createdAt: serverTimestamp(),
        status: "New",
        ...order,
      });

      return NextResponse.json({
        ok: true,
        orderId,
        message: "Order saved to Firebase.",
      });
    } catch (error) {
      return NextResponse.json(
        {
          ok: false,
          orderId,
          message:
            error instanceof Error
              ? `Firebase order save failed: ${error.message}`
              : "Firebase order save failed.",
        },
        { status: 502 },
      );
    }
  }

  if (!scriptUrl) {
    return NextResponse.json(
      {
        ok: false,
        orderId,
        message:
          "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values to save production orders.",
      },
      { status: 503 },
    );
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      orderId,
      createdAt: new Date().toISOString(),
      status: "New",
      ...order,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        orderId,
        message: "Google Sheet order sync failed. Please check the Apps Script deployment.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    orderId,
    message: "Order saved to Google Sheets.",
  });
}
