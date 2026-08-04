"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

const images: string[] = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
  "/9.jpg",
  "/10.jpg",
  "/11.jpg",
  "/12.jpg",
  "/13.jpg",
  "/14.jpg",
  "/15.jpg",
  "/16.jpg",
  "/17.jpg",
  "/18.jpg",
  "/19.jpg",
  "/20.jpg",
  "/21.jpg",
  "/22.jpg",
  "/23.jpg",
  "/24.jpg",
  "/25.jpg",
  "/26.jpg",
  "/27.jpg",
  "/28.jpg",
  "/29.jpg",
  "/30.jpg",
  "/31.jpg",
  "/32.jpg",
];

const aspectRatios = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]"];

const Gallery = () => {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section className="bg-warm-surface px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 block font-serif text-sm uppercase tracking-widest text-muted-ink">
            Portfolio
          </span>
          <h1 className="mb-4 font-serif text-4xl font-light text-accent-black md:text-6xl">
            Gallery
          </h1>
          <p className="text-base text-muted-ink leading-relaxed">
            A look at custom designs we&apos;ve created for weddings, celebrations, and everyday
            moments.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
          {images.map((src, i) => (
            <motion.div
              key={src}
              layout
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(src)}
              className={`relative mb-4 w-full cursor-pointer overflow-hidden break-inside-avoid rounded-sm ${aspectRatios[i % aspectRatios.length]}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-muted-ink">Like what you see?</p>
          <Link
            href="/services"
            className="inline-block border border-accent-black px-8 py-3 text-sm uppercase tracking-wide hover:bg-accent-black hover:text-primary-white transition"
          >
            Start a Custom Order
          </Link>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setSelected(null)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-label="Close"
              className="absolute top-6 right-6 z-50 text-white text-3xl font-light hover:opacity-70"
            >
              <X className=" cursor-pointer " size={40} />
            </motion.button>

            {/* Image */}
            <motion.div
              className="relative w-[80vw] h-[80vh]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image src={selected} alt="" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
