"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-hairline py-6 first:border-t">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left cursor-pointer"
      >
        <span className="font-serif text-lg md:text-xl font-light text-accent-black">
          {question}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-3xl font-light text-main-text-gold shrink-0 ml-4"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm text-muted-ink leading-relaxed max-w-xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;
