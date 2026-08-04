import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { productCategoryEnum, products } from "@/db/schema";

export type ProductCategory = (typeof productCategoryEnum.enumValues)[number];

export async function getActiveProducts(category?: ProductCategory) {
  const db = getDb();
  return db
    .select()
    .from(products)
    .where(
      category
        ? and(eq(products.isActive, true), eq(products.category, category))
        : eq(products.isActive, true),
    )
    .orderBy(desc(products.createdAt));
}

export async function getProductBySlug(slug: string) {
  const db = getDb();
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getActiveProductBySlug(slug: string) {
  const product = await getProductBySlug(slug);
  if (!product || !product.isActive) return null;
  return product;
}
