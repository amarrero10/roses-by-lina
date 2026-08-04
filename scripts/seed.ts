import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  category: (typeof schema.productCategoryEnum.enumValues)[number];
  image: string;
};

const placeholderProducts: SeedProduct[] = [
  {
    slug: "blush-garden-bouquet",
    name: "Blush Garden Bouquet",
    description:
      "A romantic hand-tied bouquet of blush garden roses, ranunculus, and soft greenery.",
    priceCents: 6500,
    category: "bouquet",
    image: "/1.jpg",
  },
  {
    slug: "golden-hour-roses",
    name: "Golden Hour Roses",
    description: "Warm-toned roses arranged for a soft, sun-kissed everyday statement.",
    priceCents: 5800,
    category: "bouquet",
    image: "/4.jpg",
  },
  {
    slug: "ivory-elegance-arrangement",
    name: "Ivory Elegance Arrangement",
    description: "A refined all-white arrangement of roses and lisianthus in a classic vase.",
    priceCents: 8900,
    category: "arrangement",
    image: "/8.jpg",
  },
  {
    slug: "wildflower-meadow-bouquet",
    name: "Wildflower Meadow Bouquet",
    description: "A loose, garden-gathered mix of seasonal wildflowers and textured foliage.",
    priceCents: 5200,
    category: "bouquet",
    image: "/12.jpg",
  },
  {
    slug: "signature-centerpiece",
    name: "Signature Centerpiece",
    description: "A lush low centerpiece designed for tablescapes and intimate gatherings.",
    priceCents: 11500,
    category: "centerpiece",
    image: "/16.jpg",
  },
  {
    slug: "sunset-peony-bouquet",
    name: "Sunset Peony Bouquet",
    description: "Full, ruffled peonies in coral and cream tones for a statement gift.",
    priceCents: 9800,
    category: "seasonal",
    image: "/19.jpg",
  },
  {
    slug: "modern-monochrome-box",
    name: "Modern Monochrome Box",
    description: "A boxed arrangement in a single tonal palette, styled for effortless gifting.",
    priceCents: 7200,
    category: "arrangement",
    image: "/26.jpg",
  },
  {
    slug: "everyday-sweetheart-bouquet",
    name: "Everyday Sweetheart Bouquet",
    description: "A petite, budget-friendly bouquet perfect for a spontaneous gesture.",
    priceCents: 4200,
    category: "bouquet",
    image: "/32.jpg",
  },
];

async function seed() {
  for (const product of placeholderProducts) {
    await db
      .insert(schema.products)
      .values({
        slug: product.slug,
        name: product.name,
        description: product.description,
        priceCents: product.priceCents,
        category: product.category,
        images: [{ url: product.image, alt: product.name, sortOrder: 0 }],
        isActive: true,
      })
      .onConflictDoUpdate({
        target: schema.products.slug,
        set: {
          name: product.name,
          description: product.description,
          priceCents: product.priceCents,
          category: product.category,
          images: [{ url: product.image, alt: product.name, sortOrder: 0 }],
        },
      });
    console.log(`Upserted ${product.slug}`);
  }
}

seed()
  .then(() => {
    console.log(`Seeded ${placeholderProducts.length} placeholder products.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
