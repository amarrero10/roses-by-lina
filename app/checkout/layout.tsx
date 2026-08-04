"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

const steps = [
  { path: "/checkout/information", label: "Information" },
  { path: "/checkout/review", label: "Review" },
  { path: "/checkout/payment", label: "Payment" },
];

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  const currentIndex = steps.findIndex((step) => pathname.startsWith(step.path));

  if (items.length === 0) return null;

  return (
    <section className="bg-primary-white px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <ol className="mb-12 flex items-center justify-center gap-2 text-sm">
          {steps.map((step, i) => (
            <li key={step.path} className="flex items-center gap-2">
              <span
                className={
                  i <= currentIndex
                    ? "font-medium text-accent-black"
                    : "text-muted-ink"
                }
              >
                {step.label}
              </span>
              {i < steps.length - 1 && <span className="text-hairline">&mdash;</span>}
            </li>
          ))}
        </ol>
        {children}
      </div>
    </section>
  );
}
