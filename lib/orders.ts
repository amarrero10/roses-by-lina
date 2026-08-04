import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { orderItems, orders } from "@/db/schema";

export async function getOrderByNumber(orderNumber: string) {
  const db = getDb();
  const orderRows = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  const order = orderRows[0];
  if (!order) return null;

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  return { order, items };
}
