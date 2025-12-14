"use client";

import { motion } from "framer-motion";

export default function InfiniteText() {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full border-y py-4 mb-10">
      <motion.div
        className="flex gap-12 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          type: "tween",
          duration: 50,
          ease: "linear",
        }}
      >
        {/* Duplicate content for seamless loop */}
        <span className="mx-8">Luxury Floral Design</span>
        <span className="mx-8">Timeless Arrangements</span>
        <span className="mx-8">Celebrations</span>
        <span className="mx-8">Thoughtfully Curated</span>
        <span className="mx-8">Luxury in Every Stem</span>
        <span className="mx-8">Moments in Bloom</span>
        <span className="mx-8">Designed for Life&apos;s Milestones</span>
        <span className="mx-8">Luxury Floral Design</span>
        <span className="mx-8">Timeless Arrangements</span>
        <span className="mx-8">Celebrations</span>
        <span className="mx-8">Thoughtfully Curated</span>
        <span className="mx-8">Luxury in Every Stem</span>
        <span className="mx-8">Moments in Bloom</span>
        <span className="mx-8">Designed for Life&apos;s Milestones</span>
        <span className="mx-8">Luxury Floral Design</span>
        <span className="mx-8">Timeless Arrangements</span>
        <span className="mx-8">Celebrations</span>
        <span className="mx-8">Thoughtfully Curated</span>
        <span className="mx-8">Luxury in Every Stem</span>
        <span className="mx-8">Moments in Bloom</span>
        <span className="mx-8">Designed for Life&apos;s Milestones</span>
        <span className="mx-8">Luxury Floral Design</span>
        <span className="mx-8">Timeless Arrangements</span>
        <span className="mx-8">Celebrations</span>
        <span className="mx-8">Thoughtfully Curated</span>
        <span className="mx-8">Luxury in Every Stem</span>
        <span className="mx-8">Moments in Bloom</span>
        <span className="mx-8">Designed for Life&apos;s Milestones</span>
      </motion.div>
    </div>
  );
}
