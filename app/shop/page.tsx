import Link from "next/link";
import Image from "next/image";
import { getActiveProducts, type ProductCategory } from "@/lib/products";
import { categoryLabels } from "@/lib/format";
import ProductCard from "@/components/shop/ProductCard";
import { productCategoryEnum } from "@/db/schema";
import bannerImg from "@/public/13.jpg";

export const metadata = {
  title: "Shop | Roses by Lina",
  description: "Browse ready-made bouquets and arrangements from Roses by Lina.",
};

type ShopPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const validCategory = productCategoryEnum.enumValues.includes(category as ProductCategory)
    ? (category as ProductCategory)
    : undefined;

  const products = await getActiveProducts(validCategory);

  return (
    <>
      <section className="relative flex h-[45vh] min-h-80 items-end overflow-hidden">
        <Image
          src={bannerImg}
          alt="Fresh floral arrangements from Roses by Lina"
          fill
          placeholder="blur"
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-accent-black/80 via-accent-black/10 to-transparent" />
        <div className="relative z-10 w-full px-6 pb-12 text-center md:px-12">
          <span className="mb-3 block font-serif text-sm uppercase tracking-widest text-main-text-gold">
            Shop
          </span>
          <h1 className="font-serif text-4xl font-light text-primary-white md:text-6xl">
            Ready-Made Arrangements
          </h1>
        </div>
      </section>

      <section className="bg-primary-white px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mx-auto mb-12 max-w-xl text-center text-base text-muted-ink md:text-lg">
            Browse our current bouquets and arrangements, ready for delivery or pickup. Planning a
            wedding or large event instead?{" "}
            <Link href="/services" className="underline hover:text-accent-black">
              Request a custom quote
            </Link>
            .
          </p>

          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                !validCategory
                  ? "border-accent-black bg-accent-black text-primary-white"
                  : "border-hairline text-accent-black hover:border-accent-black"
              }`}
            >
              All
            </Link>
            {productCategoryEnum.enumValues.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${cat}`}
                className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                  validCategory === cat
                    ? "border-accent-black bg-accent-black text-primary-white"
                    : "border-hairline text-accent-black hover:border-accent-black"
                }`}
              >
                {categoryLabels[cat] ?? cat}
              </Link>
            ))}
          </div>

          {products.length === 0 ? (
            <p className="py-20 text-center text-muted-ink">
              No arrangements available in this category right now — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name}
                  priceCents={product.priceCents}
                  images={product.images}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
