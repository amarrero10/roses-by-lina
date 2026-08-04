"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore, cartTotalItems } from "@/lib/cart-store";

const CartIndicator = () => {
  const items = useCartStore((state) => state.items);
  const count = cartTotalItems(items);

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `View cart, ${count} item${count === 1 ? "" : "s"}` : "View cart"}
      className="relative text-primary-white hover:opacity-80 transition"
    >
      <ShoppingBag size={26} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-main-text-gold text-[11px] font-medium text-accent-black">
          {count}
        </span>
      )}
    </Link>
  );
};

export default CartIndicator;
