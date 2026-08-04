import Image from "next/image";
import Link from "next/link";
import { formatCents } from "@/lib/format";
import type { ProductImage } from "@/db/schema";

type ProductCardProps = {
  slug: string;
  name: string;
  priceCents: number;
  images: ProductImage[];
};

const ProductCard = ({ slug, name, priceCents, images }: ProductCardProps) => {
  const image = images[0];

  return (
    <Link href={`/shop/${slug}`} className="group block">
      <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-warm-surface">
        {image && (
          <Image
            src={image.url}
            alt={image.alt || name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="font-serif text-lg text-accent-black">{name}</h3>
        <span className="text-sm text-muted-ink">{formatCents(priceCents)}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
