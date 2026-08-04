import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getActiveProductBySlug } from "@/lib/products";
import { formatCents, categoryLabels } from "@/lib/format";
import AddToCartButton from "@/components/shop/AddToCartButton";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getActiveProductBySlug(slug);
  if (!product) return { title: "Product Not Found | Roses by Lina" };
  return {
    title: `${product.name} | Roses by Lina`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getActiveProductBySlug(slug);

  if (!product) notFound();

  const image = product.images[0];

  return (
    <section className="bg-primary-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-warm-surface">
          {image && (
            <Image
              src={image.url}
              alt={image.alt || product.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <Link href="/shop" className="mb-6 text-sm text-muted-ink hover:text-accent-black">
            &larr; Back to Shop
          </Link>
          <span className="mb-3 block text-sm uppercase tracking-widest text-muted-ink">
            {categoryLabels[product.category] ?? product.category}
          </span>
          <h1 className="font-serif text-3xl font-light text-accent-black md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-xl text-accent-black">{formatCents(product.priceCents)}</p>
          <p className="mt-6 text-base leading-relaxed text-muted-ink">{product.description}</p>

          <div className="mt-10 max-w-sm">
            <AddToCartButton
              productId={product.id}
              slug={product.slug}
              name={product.name}
              priceCents={product.priceCents}
              imageUrl={image?.url ?? ""}
            />
          </div>

          <p className="mt-6 text-sm text-muted-ink">
            Local delivery and studio pickup available at checkout. See our{" "}
            <Link href="/policy" className="underline hover:text-accent-black">
              policies
            </Link>{" "}
            for details.
          </p>
        </div>
      </div>
    </section>
  );
}
