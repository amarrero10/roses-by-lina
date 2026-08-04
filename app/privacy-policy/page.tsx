"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-warm-surface py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-6xl font-light text-accent-black mb-6">Privacy Policy</h1>
          <p className="text-base md:text-lg text-accent-black/70 leading-relaxed">
            This page explains what information Roses by Lina collects when you use this site, how
            it&apos;s used, and who it&apos;s shared with. Last updated August 2026.
          </p>
        </motion.div>

        <div className="mt-16 space-y-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-accent-black mb-4">Information We Collect</h2>
            <p className="text-accent-black/70 leading-relaxed">
              When you place a shop order or submit a custom quote request, we collect your name,
              email address, phone number, and — for delivery orders — your delivery address, along
              with any order details or notes you provide.
            </p>
            <p className="text-accent-black/70 leading-relaxed mt-4">
              We do not collect or store payment card information. Payment for orders is arranged
              directly with you (Zelle, Apple Pay, Cash App, or cash) — see our{" "}
              <Link href="/policy" className="underline font-medium hover:text-black">
                order policy
              </Link>{" "}
              for details.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-accent-black mb-4">Cookies & Local Storage</h2>
            <p className="text-accent-black/70 leading-relaxed">
              Your shopping cart and in-progress checkout details are stored in your browser&apos;s
              local storage so they persist between visits — this data stays on your device and
              isn&apos;t sent to us until you place an order. We use Vercel Analytics to understand
              overall site traffic; it does not use tracking cookies or collect personal
              information.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-accent-black mb-4">
              How We Use Your Information
            </h2>
            <p className="text-accent-black/70 leading-relaxed">
              We use your information solely to fulfill and communicate about your order or quote
              request — confirming details, arranging delivery or pickup, and following up on
              payment. We don&apos;t sell your information or use it for advertising, and we
              won&apos;t email you marketing messages without your consent.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-accent-black mb-4">Who We Share It With</h2>
            <p className="text-accent-black/70 leading-relaxed">
              Your order information is stored with our hosting and database providers (Vercel and
              Neon) solely to operate this site. We don&apos;t share your information with third
              parties for their own marketing purposes.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-accent-black mb-4">Questions</h2>
            <p className="text-accent-black/70 leading-relaxed">
              If you have questions about your information or would like it removed, reach out at{" "}
              <a
                href="mailto:rosesbylina2025@gmail.com"
                className="underline font-medium hover:text-black"
              >
                rosesbylina2025@gmail.com
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
