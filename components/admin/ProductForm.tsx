"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ImageUploader from "@/components/admin/ImageUploader";
import { createProduct, deleteProduct, updateProduct, type ProductFormData } from "@/lib/admin-actions";
import { categoryLabels } from "@/lib/format";
import { productCategoryEnum, type ProductImage } from "@/db/schema";

type ProductFormProps = {
  productId?: string;
  initialData?: ProductFormData;
};

const emptyProduct: ProductFormData = {
  name: "",
  description: "",
  priceCents: 0,
  category: "bouquet",
  images: [],
  isActive: true,
};

const ProductForm = ({ productId, initialData }: ProductFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(initialData ?? emptyProduct);
  const [priceInput, setPriceInput] = useState(
    initialData ? (initialData.priceCents / 100).toFixed(2) : "",
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleImagesChange = (images: ProductImage[]) => setForm((f) => ({ ...f, images }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const priceCents = Math.round(parseFloat(priceInput || "0") * 100);
    if (!form.name.trim()) return setError("Product name is required.");
    if (!priceCents || priceCents <= 0) return setError("Enter a valid price.");
    if (form.images.length === 0) return setError("Add at least one photo.");

    const payload: ProductFormData = { ...form, priceCents };

    startTransition(async () => {
      try {
        if (productId) {
          await updateProduct(productId, payload);
        } else {
          await createProduct(payload);
        }
        router.push("/admin/products");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  };

  const handleDelete = () => {
    if (!productId) return;
    if (!confirm("Delete this product? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteProduct(productId);
      router.push("/admin/products");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <Input
        id="name"
        label="Name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
      />
      <Textarea
        id="description"
        label="Description"
        value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
      />
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <Input
          id="price"
          label="Price (USD)"
          type="number"
          step="0.01"
          min="0"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
        />
        <Select
          id="category"
          label="Category"
          value={form.category}
          onChange={(e) =>
            setForm((f) => ({ ...f, category: e.target.value as ProductFormData["category"] }))
          }
        >
          {productCategoryEnum.enumValues.map((cat) => (
            <option key={cat} value={cat}>
              {categoryLabels[cat] ?? cat}
            </option>
          ))}
        </Select>
      </div>

      <ImageUploader images={form.images} onChange={handleImagesChange} />

      <label className="mb-6 flex items-center gap-2 text-sm text-accent-black">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
          className="accent-accent-black"
        />
        Active (visible in shop)
      </label>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between">
        <Button type="submit" disabled={isPending} className="px-8 py-3">
          {isPending ? "Saving..." : productId ? "Save Changes" : "Create Product"}
        </Button>
        {productId && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="text-sm text-red-600 hover:underline cursor-pointer"
          >
            Delete Product
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
