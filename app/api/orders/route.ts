import { NextResponse, type NextRequest } from "next/server";
import { inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { generateOrderNumber } from "@/lib/order-number";
import { sendOrderConfirmationEmails } from "@/lib/order-emails";
import type { CreateOrderPayload, CreateOrderResponse } from "@/lib/order-types";

const RUSH_FEE_CENTS = 2000;
const RUSH_WINDOW_MS = 24 * 60 * 60 * 1000;

function jsonError(error: string, status = 400) {
  return NextResponse.json<CreateOrderResponse>({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
  let payload: CreateOrderPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonError("Invalid request body.");
  }

  if (!payload.items || payload.items.length === 0) {
    return jsonError("Your cart is empty.");
  }
  if (!payload.customerName || !payload.customerEmail || !payload.customerPhone) {
    return jsonError("Please provide your name, email, and phone number.");
  }
  if (!payload.requestedDate) {
    return jsonError("Please choose a requested date.");
  }
  if (payload.fulfillmentMethod === "delivery") {
    if (
      !payload.deliveryAddressLine1 ||
      !payload.deliveryCity ||
      !payload.deliveryState ||
      !payload.deliveryZip
    ) {
      return jsonError("Please provide a complete delivery address.");
    }
  }
  if (payload.paymentMethod === "card_pending") {
    return jsonError("Online card payments aren't available yet — please choose another method.");
  }

  const db = getDb();

  const productIds = payload.items.map((item) => item.productId);
  const dbProducts = await db
    .select()
    .from(products)
    .where(inArray(products.id, productIds));

  const productMap = new Map(dbProducts.map((p) => [p.id, p]));

  const lineItems: {
    productId: string;
    productNameSnapshot: string;
    productPriceCentsSnapshot: number;
    quantity: number;
    lineTotalCents: number;
  }[] = [];

  for (const item of payload.items) {
    const product = productMap.get(item.productId);
    if (!product || !product.isActive) {
      return jsonError(
        `"${product?.name ?? "An item"}" in your cart is no longer available. Please update your cart.`,
      );
    }
    if (item.quantity < 1) {
      return jsonError(`Invalid quantity for "${product.name}".`);
    }
    lineItems.push({
      productId: product.id,
      productNameSnapshot: product.name,
      productPriceCentsSnapshot: product.priceCents,
      quantity: item.quantity,
      lineTotalCents: product.priceCents * item.quantity,
    });
  }

  const subtotalCents = lineItems.reduce((sum, item) => sum + item.lineTotalCents, 0);
  const deliveryFeeCents = 0; // v1: confirmed manually by admin, see plan for rationale

  const requestedDate = new Date(`${payload.requestedDate}T00:00:00`);
  const rushFeeCents =
    requestedDate.getTime() - Date.now() < RUSH_WINDOW_MS ? RUSH_FEE_CENTS : 0;

  const totalCents = subtotalCents + deliveryFeeCents + rushFeeCents;
  const orderId = crypto.randomUUID();
  const orderNumber = generateOrderNumber();

  const [orderRows, insertedItems] = await db.batch([
    db
      .insert(orders)
      .values({
        id: orderId,
        orderNumber,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        customerPhone: payload.customerPhone,
        fulfillmentMethod: payload.fulfillmentMethod,
        deliveryAddressLine1: payload.deliveryAddressLine1,
        deliveryAddressLine2: payload.deliveryAddressLine2,
        deliveryCity: payload.deliveryCity,
        deliveryState: payload.deliveryState,
        deliveryZip: payload.deliveryZip,
        requestedDate: payload.requestedDate,
        requestedTimeWindow: payload.requestedTimeWindow,
        subtotalCents,
        deliveryFeeCents,
        rushFeeCents,
        totalCents,
        paymentMethod: payload.paymentMethod,
        customerNotes: payload.customerNotes,
      })
      .returning(),
    db
      .insert(orderItems)
      .values(lineItems.map((item) => ({ ...item, orderId })))
      .returning(),
  ]);
  const insertedOrder = orderRows[0];

  try {
    await sendOrderConfirmationEmails(insertedOrder, insertedItems);
  } catch (err) {
    console.error("Failed to send order confirmation emails:", err);
  }

  return NextResponse.json<CreateOrderResponse>({ success: true, orderNumber });
}
