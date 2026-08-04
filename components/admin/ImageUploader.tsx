"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { X } from "lucide-react";
import type { ProductImage } from "@/db/schema";

type ImageUploaderProps = {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
};

const ImageUploader = ({ images, onChange }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const blob = await upload(`products/${Date.now()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      onChange([...images, { url: blob.url, alt: "", sortOrder: images.length }]);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-5">
      <span className="mb-2 block text-sm font-medium text-current">Photos</span>
      <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((image, i) => (
          <div key={image.url} className="relative aspect-square overflow-hidden rounded-md bg-warm-surface">
            <Image src={image.url} alt={image.alt || "Product photo"} fill className="object-cover" sizes="150px" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent-black/70 text-primary-white cursor-pointer"
              aria-label="Remove photo"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileChange}
        disabled={uploading}
        className="text-sm text-muted-ink"
      />
      {uploading && <p className="mt-2 text-sm text-muted-ink">Uploading...</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ImageUploader;
