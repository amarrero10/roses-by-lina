import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 font-serif text-3xl font-light text-accent-black">New Product</h1>
      <ProductForm />
    </div>
  );
}
