"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useCheckoutStore, type PaymentMethod } from "@/lib/checkout-store";
import type { CreateOrderPayload, CreateOrderResponse } from "@/lib/order-types";
import RadioCard from "@/components/ui/RadioCard";
import Button from "@/components/ui/Button";

const paymentOptions: { value: PaymentMethod; label: string; description: string }[] = [
  { value: "zelle", label: "Zelle", description: "Send to albert.marrero10@gmail.com" },
  { value: "apple_pay", label: "Apple Pay", description: "Shared with you at confirmation" },
  { value: "cash_app", label: "Cash App", description: "Shared with you at confirmation" },
  { value: "cash", label: "Cash", description: "Paid at pickup or delivery" },
];

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);
  const { info, paymentMethod, setPaymentMethod, reset } = useCheckoutStore();

  const [selected, setSelected] = useState<PaymentMethod | null>(paymentMethod);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!info.customerName || !info.customerEmail) {
      router.replace("/checkout/information");
    }
  }, [info, router]);

  const handleSelect = (method: PaymentMethod) => {
    setSelected(method);
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (!selected || !agreed) return;
    setSubmitting(true);
    setError(null);

    const payload: CreateOrderPayload = {
      items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      customerName: info.customerName,
      customerEmail: info.customerEmail,
      customerPhone: info.customerPhone,
      fulfillmentMethod: info.fulfillmentMethod,
      deliveryAddressLine1: info.deliveryAddressLine1 || undefined,
      deliveryAddressLine2: info.deliveryAddressLine2 || undefined,
      deliveryCity: info.deliveryCity || undefined,
      deliveryState: info.deliveryState || undefined,
      deliveryZip: info.deliveryZip || undefined,
      requestedDate: info.requestedDate,
      requestedTimeWindow: info.requestedTimeWindow || undefined,
      paymentMethod: selected,
      customerNotes: info.customerNotes || undefined,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: CreateOrderResponse = await res.json();

      if (!data.success) {
        setError(data.error);
        setSubmitting(false);
        return;
      }

      clearCart();
      reset();
      router.push(`/order-confirmation/${data.orderNumber}`);
    } catch {
      setError("Something went wrong placing your order. Please try again.");
      setSubmitting(false);
    }
  };

  if (!info.customerName || !info.customerEmail) return null;

  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-light text-accent-black md:text-4xl">
        Payment Method
      </h1>

      <p className="mb-6 text-sm text-muted-ink">
        Roses by Lina accepts the methods below. Selecting one places your order as{" "}
        <span className="font-medium text-accent-black">pending payment</span> — we&apos;ll follow
        up with details to complete it, per our{" "}
        <a href="/policy" target="_blank" className="underline hover:text-accent-black">
          deposit policy
        </a>
        .
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {paymentOptions.map((option) => (
          <RadioCard
            key={option.value}
            id={`payment-${option.value}`}
            name="paymentMethod"
            label={option.label}
            description={option.description}
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleSelect(option.value)}
          />
        ))}
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-muted-ink">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-accent-black"
        />
        I agree to the{" "}
        <Link href="/policy" target="_blank" className="underline hover:text-accent-black">
          deposit & payment policy
        </Link>
        .
      </label>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handlePlaceOrder}
          disabled={!selected || !agreed || submitting}
          className="px-10 py-4"
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
