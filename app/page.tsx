import Link from "next/link";
import Image from "next/image";
import HomeGallery from "@/components/HomeGallery";
import InfiniteText from "@/components/InfiniteText";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/shop/ProductCard";
import SmoothScroll from "@/components/home/SmoothScroll";
import { getActiveProducts } from "@/lib/products";
import img16 from "@/public/16.jpg";
import img2 from "@/public/2.jpg";
import img26 from "@/public/26.jpg";
import img5 from "@/public/5.jpg";
import lina from "@/public/lina-about.jpg";

export const revalidate = 60;

export default async function Home() {
  const featuredProducts = (await getActiveProducts()).slice(0, 4);

  return (
    <>
      <SmoothScroll />
      <main className="min-h-screen bg-primary-white selection:bg-accent-black selection:text-primary-white">
        {/* ================= HERO ================= */}
        <section className="grid grid-cols-1 items-center gap-12 px-6 py-16 sm:py-24 md:grid-cols-2 md:gap-16 md:px-12 md:py-28 lg:px-20">
          <div className="font-serif order-2 md:order-1">
            <span className="mb-6 block text-sm uppercase tracking-widest text-muted-ink">
              Tampa Bay Floral Studio
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
              Fresh. Modern.
              <br />
              Roses by Lina.
            </h1>
            <p className="max-w-md text-base sm:text-lg text-muted-ink leading-relaxed mb-2 font-sans">
              Founded by Linette Carcamo — proudly serving the Tampa Bay community with refined,
              handcrafted floral design.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 font-sans">
              <Link href="/shop">
                <Button className="px-8 py-4 text-sm uppercase tracking-wide">Shop Now</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="px-8 py-4 text-sm uppercase tracking-wide">
                  Custom Orders
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative order-1 aspect-4/5 overflow-hidden rounded-2xl md:order-2">
            <Image
              src={img5}
              alt="A Roses by Lina floral arrangement"
              fill
              placeholder="blur"
              priority
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
        </section>

        <HomeGallery />

        {/* ================= 01 — SHOP ================= */}
        <section className="px-6 py-20 sm:py-28 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="mb-3 block font-serif text-sm uppercase tracking-widest text-muted-ink">
                  01 — The Shop
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-light text-accent-black">
                  Ready When You Are
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-ink">
                Ready-made bouquets and arrangements, priced upfront and available for delivery or
                pickup today.
              </p>
            </div>

            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    slug={product.slug}
                    name={product.name}
                    priceCents={product.priceCents}
                    images={product.images}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-ink">New arrangements coming soon.</p>
            )}

            <div className="mt-14 flex justify-center sm:justify-end">
              <Link href="/shop">
                <Button variant="outline" className="px-8 py-4 text-sm uppercase tracking-wide">
                  Shop All Arrangements
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <InfiniteText />

        {/* ================= 02 — STORY ================= */}
        <section className="px-6 py-20 sm:py-28 md:px-12 lg:px-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <div className="relative order-2 aspect-4/5 overflow-hidden rounded-2xl md:order-1">
              <Image
                src={lina}
                alt="Roses by Lina floral studio"
                fill
                placeholder="blur"
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="mb-3 block font-serif text-sm uppercase tracking-widest text-muted-ink">
                02 — Our Story
              </span>
              <h2 className="mb-6 text-3xl sm:text-5xl font-serif font-light text-accent-black">
                Rooted in Care & Craft
              </h2>
              <p className="mb-4 max-w-lg text-base leading-relaxed text-muted-ink">
                Roses by Lina was founded with a simple belief — flowers have the power to express
                what words sometimes cannot. Every design is created with intention, creativity, and
                care.
              </p>
              <Link
                href="/about"
                className="inline-block border-b border-accent-black pb-1 text-sm uppercase tracking-wide text-accent-black hover:text-main-text-gold hover:border-main-text-gold transition-colors"
              >
                Meet Linette
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 03 — SERVICES ================= */}
        <section className="bg-warm-surface px-6 py-20 sm:py-28 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl text-center">
            <span className="mb-3 block font-serif text-sm uppercase tracking-widest text-muted-ink">
              03 — Our Services
            </span>
            <h2 className="mb-16 text-3xl sm:text-5xl font-serif font-light text-accent-black">
              What We Offer
            </h2>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
              {[
                {
                  title: "Everyday Bouquets",
                  text: "Ready-made arrangements for birthdays, gifts, or just because.",
                  href: "/shop",
                  cta: "Shop Now",
                },
                {
                  title: "Weddings & Events",
                  text: "Custom floral design for weddings, proposals, and large celebrations.",
                  href: "/services",
                  cta: "Get a Quote",
                },
                {
                  title: "Custom Design",
                  text: "A specific vision in mind? We'll design it around your budget and style.",
                  href: "/services",
                  cta: "Start a Request",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center">
                  <h3 className="mb-3 font-serif text-xl text-accent-black">{item.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-ink">{item.text}</p>
                  <Link
                    href={item.href}
                    className="text-xs uppercase tracking-widest text-accent-black underline underline-offset-4 hover:text-main-text-gold"
                  >
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= RECENT WORK ================= */}
        <section className="px-6 py-20 sm:py-28 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <span className="mb-3 block font-serif text-sm uppercase tracking-widest text-muted-ink">
              Recent Custom Work
            </span>
            <div className="mb-10 flex items-end justify-between">
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-accent-black">
                From Our Portfolio
              </h2>
            </div>
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-3">
              <div className="shadow-2xl rounded-2xl">
                <Image
                  className="rounded-2xl sm:max-h-[600px] object-cover"
                  src={img16}
                  alt="Modern floral piece for a graduation"
                  placeholder="blur"
                />
                <p className="mt-6 sm:text-lg text-sm p-4 text-muted-ink">
                  A modern floral piece crafted to celebrate a graduation milestone.
                </p>
              </div>
              <div className="shadow-2xl rounded-2xl">
                <Image
                  className="rounded-2xl sm:max-h-[600px] object-cover"
                  src={img2}
                  alt="Refined birthday floral arrangement"
                  placeholder="blur"
                />
                <p className="mt-6 sm:text-lg text-sm p-4 text-muted-ink">
                  A refined floral arrangement created to celebrate a birthday with elegance and
                  warmth.
                </p>
              </div>
              <div className="shadow-2xl rounded-2xl">
                <Image
                  className="rounded-2xl sm:max-h-[600px] object-cover"
                  src={img26}
                  alt="Romantic engagement floral design"
                  placeholder="blur"
                />
                <p className="mt-6 sm:text-lg text-sm p-4 text-muted-ink">
                  A romantic floral design curated for an intimate engagement proposal.
                </p>
              </div>
            </div>
            <div className="mt-10 flex justify-center sm:justify-end">
              <Link href="/gallery">
                <Button variant="outline" className="px-8 py-3">
                  See More Work
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section className="px-3 my-20 selection:bg-primary-white selection:text-red-200">
          <div className="bg-accent-black text-primary-white rounded-2xl py-20 px-10">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif font-light mb-10 text-center text-main-text-gold">
              Get In Touch
            </h2>
            <p className="sm:text-lg text-sm leading-relaxed sm:text-justify font-poppins mb-20 sm:w-[700px] mx-auto">
              We design flower arrangements and displays for various occasions, spaces, and themes,
              including; commercials, advertisements, packaging, retail stores, complexes,
              exhibition halls, international expositions, etc. We will propose a flower arrangement
              styling plan that matches the client&apos;s concept and ideas. We also offer licenses
              for our floral patterns.
            </p>

            <ContactForm className=" sm:w-1/2 sm:mx-auto  " />
            <p className="text-lg leading-relaxed mt-10 text-center font-poppins">
              Rather call or text? Reach out to us at 813-956-2388 instead.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
