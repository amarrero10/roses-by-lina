"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
];

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
    <section className="bg-[#f4efe9] py-32">
      <div className=" mx-10">
        {/* Heading */}
        <h1 className="text-8xl font-light text-center mb-20 font-serif">Gallery</h1>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 ">
          {images.map((src) => (
            <motion.div
              key={src}
              layout
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelected(src)}
              className="relative aspect-4/5 cursor-pointer overflow-hidden "
            >
              <Image src={src} alt="" fill className="object-cover" />
            </motion.div>
          ))}
        </motion.div>
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
