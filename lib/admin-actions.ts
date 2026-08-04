"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { auth } from "@/lib/auth";
import { orders, products, type ProductImage } from "@/db/schema";
import type { ProductCategory } from "@/lib/products";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type ProductFormData = {
  name: string;
  description: string;
  priceCents: number;
  category: ProductCategory;
  images: ProductImage[];
  isActive: boolean;
};

export async function createProduct(data: ProductFormData) {
  await requireAdmin();
  const db = getDb();

  const baseSlug = slugify(data.name) || "product";
  let slug = baseSlug;
  let suffix = 1;
  while ((await db.select().from(products).where(eq(products.slug, slug))).length > 0) {
    slug = `${baseSlug}-${++suffix}`;
  }

  const [created] = await db.insert(products).values({ ...data, slug }).returning();
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return created;
}

export async function updateProduct(id: string, data: ProductFormData) {
  await requireAdmin();
  const db = getDb();
  const [updated] = await db.update(products).set(data).where(eq(products.id, id)).returning();
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return updated;
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const db = getDb();
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export type OrderStatus = (typeof orders.$inferSelect)["status"];

export async function updateOrder(
  id: string,
  data: { status: OrderStatus; deliveryFeeCents: number; adminNotes: string },
) {
  await requireAdmin();
  const db = getDb();

  const [existing] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  if (!existing) throw new Error("Order not found");

  const totalCents = existing.subtotalCents + data.deliveryFeeCents + existing.rushFeeCents;

  await db
    .update(orders)
    .set({
      status: data.status,
      deliveryFeeCents: data.deliveryFeeCents,
      adminNotes: data.adminNotes,
      totalCents,
    })
    .where(eq(orders.id, id));

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}
