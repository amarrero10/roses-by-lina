import Link from "next/link";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import { formatCents, categoryLabels } from "@/lib/format";
import Button from "@/components/ui/Button";

export default async function AdminProductsPage() {
  const db = getDb();
  const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-light text-accent-black">Products</h1>
        <Link href="/admin/products/new">
          <Button>New Product</Button>
        </Link>
      </div>

      <div className="rounded-md border border-hairline bg-primary-white">
        {allProducts.length === 0 ? (
          <p className="p-6 text-sm text-muted-ink">No products yet.</p>
        ) : (
          <ul className="divide-y divide-hairline">
            {allProducts.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/admin/products/${product.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-warm-surface"
                >
                  <div>
                    <p className="text-sm font-medium text-accent-black">{product.name}</p>
                    <p className="text-xs text-muted-ink">
                      {categoryLabels[product.category] ?? product.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-accent-black">
                      {formatCents(product.priceCents)}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        product.isActive
                          ? "bg-warm-surface text-accent-black"
                          : "bg-hairline text-muted-ink"
                      }`}
                    >
                      {product.isActive ? "Active" : "Draft"}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
