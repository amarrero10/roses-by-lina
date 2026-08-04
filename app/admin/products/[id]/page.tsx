import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import ProductForm from "@/components/admin/ProductForm";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const db = getDb();
  const [product] = await db.select().from(products).where(eq(products.id, id)).limit(1);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 font-serif text-3xl font-light text-accent-black">Edit Product</h1>
      <ProductForm
        productId={product.id}
        initialData={{
          name: product.name,
          description: product.description,
          priceCents: product.priceCents,
          category: product.category,
          images: product.images,
          isActive: product.isActive,
        }}
      />
    </div>
  );
}
