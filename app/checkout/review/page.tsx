"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore, cartSubtotalCents } from "@/lib/cart-store";
import { useCheckoutStore } from "@/lib/checkout-store";
import { formatCents } from "@/lib/format";
import Button from "@/components/ui/Button";

export default function CheckoutReviewPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const { info } = useCheckoutStore();
  const subtotal = cartSubtotalCents(items);

  useEffect(() => {
    if (!info.customerName || !info.customerEmail) {
      router.replace("/checkout/information");
    }
  }, [info, router]);

  if (!info.customerName || !info.customerEmail) return null;

  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-light text-accent-black md:text-4xl">
        Review Your Order
      </h1>

      <div className="mb-8 rounded-md border border-hairline p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-widest text-muted-ink">Items</h2>
          <Link href="/cart" className="text-sm underline hover:text-accent-black">
            Edit
          </Link>
        </div>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-4">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sm bg-warm-surface">
                {item.imageUrl && (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="56px" />
                )}
              </div>
              <div className="flex-1 text-sm">
                <p className="text-accent-black">{item.name}</p>
                <p className="text-muted-ink">Qty {item.quantity}</p>
              </div>
              <span className="text-sm text-accent-black">
                {formatCents(item.priceCents * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-between border-t border-hairline pt-4 text-sm">
          <span className="text-muted-ink">Subtotal</span>
          <span className="text-accent-black">{formatCents(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-ink">
          Delivery fee (if applicable) and any rush fee are confirmed by our team after your order
          is placed.
        </p>
      </div>

      <div className="mb-8 rounded-md border border-hairline p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-widest text-muted-ink">
            Contact & Fulfillment
          </h2>
          <Link href="/checkout/information" className="text-sm underline hover:text-accent-black">
            Edit
          </Link>
        </div>
        <dl className="space-y-2 text-sm text-accent-black">
          <div className="flex justify-between">
            <dt className="text-muted-ink">Name</dt>
            <dd>{info.customerName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-ink">Email</dt>
            <dd>{info.customerEmail}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-ink">Phone</dt>
            <dd>{info.customerPhone}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-ink">Method</dt>
            <dd className="capitalize">{info.fulfillmentMethod}</dd>
          </div>
          {info.fulfillmentMethod === "delivery" && (
            <div className="flex justify-between">
              <dt className="text-muted-ink">Address</dt>
              <dd className="text-right">
                {info.deliveryAddressLine1}
                {info.deliveryAddressLine2 ? `, ${info.deliveryAddressLine2}` : ""},{" "}
                {info.deliveryCity}, {info.deliveryState} {info.deliveryZip}
              </dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-muted-ink">Requested Date</dt>
            <dd>
              {info.requestedDate}
              {info.requestedTimeWindow ? ` · ${info.requestedTimeWindow}` : ""}
            </dd>
          </div>
          {info.customerNotes && (
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-muted-ink">Notes</dt>
              <dd className="text-right">{info.customerNotes}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="flex justify-end">
        <Link href="/checkout/payment">
          <Button className="px-10 py-4">Continue to Payment</Button>
        </Link>
      </div>
    </div>
  );
}
