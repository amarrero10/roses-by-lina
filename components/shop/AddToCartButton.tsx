"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import Button from "@/components/ui/Button";

type AddToCartButtonProps = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  imageUrl: string;
};

const AddToCartButton = ({ productId, slug, name, priceCents, imageUrl }: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem({ productId, slug, name, priceCents, imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Button onClick={handleClick} className="w-full py-4">
      {added ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
