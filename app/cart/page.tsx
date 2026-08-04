"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore, cartSubtotalCents } from "@/lib/cart-store";
import { formatCents } from "@/lib/format";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = cartSubtotalCents(items);

  if (items.length === 0) {
    return (
      <section className="bg-primary-white px-6 py-32 text-center">
        <h1 className="font-serif text-3xl font-light text-accent-black md:text-5xl">
          Your Cart is Empty
        </h1>
        <p className="mt-4 text-muted-ink">Browse our arrangements and add something lovely.</p>
        <Link href="/shop" className="mt-8 inline-block">
          <Button>Shop Arrangements</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-primary-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-12 font-serif text-3xl font-light text-accent-black md:text-5xl">
          Your Cart
        </h1>

        <ul className="divide-y divide-hairline border-y border-hairline">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-5 py-6">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-warm-surface">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                )}
              </div>

              <div className="flex-1">
                <Link
                  href={`/shop/${item.slug}`}
                  className="font-serif text-lg text-accent-black hover:underline"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-muted-ink">{formatCents(item.priceCents)}</p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline hover:border-accent-black cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline hover:border-accent-black cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <span className="text-sm font-medium text-accent-black">
                  {formatCents(item.priceCents * item.quantity)}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeItem(item.productId)}
                  className="text-muted-ink hover:text-accent-black cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-lg text-accent-black">Subtotal</span>
          <span className="text-lg font-medium text-accent-black">{formatCents(subtotal)}</span>
        </div>
        <p className="mt-2 text-sm text-muted-ink">
          Delivery fee, rush fee (if applicable), and payment method are confirmed at checkout.
        </p>

        <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
          <Link href="/shop" className="text-sm text-muted-ink hover:text-accent-black">
            &larr; Continue Shopping
          </Link>
          <Link href="/checkout/information">
            <Button className="w-full px-10 py-4 sm:w-auto">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
