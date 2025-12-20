"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOut equivalent
    },
  }),
};

export default function PolicyPage() {
  return (
    <section className="bg-[#faf8f6] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-0">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-6xl font-light text-gray-700 mb-6">
            Policies & Important Information
          </h1>

          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Please review our policies carefully before placing an order. These guidelines ensure
            clarity, fairness, and the best experience for everyone.
          </p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {/* Deposit */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-gray-700 mb-4">Deposit & Payment</h2>
            <p className="text-gray-600 leading-relaxed">
              A <span className="font-medium">50% deposit is required</span> to place any order.
              This deposit is <span className="font-medium uppercase">non-refundable</span> and
              confirms your order in our schedule.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              Orders <span className="font-medium">will not be placed</span> without a deposit.
            </p>

            <div className="mt-4 text-sm text-gray-500">
              Accepted payment methods: <strong>Zelle, Apple Pay, Cash App, and Cash.</strong>
              <br />
              <span className="uppercase font-medium">No checks accepted.</span>
            </div>
          </motion.div>

          {/* Delivery */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-gray-700 mb-4">Delivery & Pickup</h2>
            <p className="text-gray-600 leading-relaxed">
              Delivery fees are based on location and will be discussed prior to confirmation.
              <span className="font-medium"> Pickup is always free.</span>
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              We <span className="font-medium uppercase">do not ship</span> flowers.
            </p>
          </motion.div>

          {/* Rush Orders */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-gray-700 mb-4">Last-Minute Orders</h2>
            <p className="text-gray-600 leading-relaxed">
              Orders must be placed at least{" "}
              <span className="font-medium">24 hours in advance</span>.
            </p>

            <p className="text-gray-600 leading-relaxed mt-2">
              A <span className="font-medium">$20 rush fee</span> will apply to last-minute requests
              and is subject to availability.
            </p>
          </motion.div>

          {/* Pickup Responsibility */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-gray-700 mb-4">Unclaimed Orders</h2>
            <p className="text-gray-600 leading-relaxed">
              If flowers are not picked up at the agreed-upon time, the order will be considered
              forfeited.
            </p>

            <p className="text-gray-600 leading-relaxed mt-2">
              The product will be lost and the{" "}
              <span className="font-medium">deposit will not be refunded </span>
              for both pre-made and custom orders.
            </p>
          </motion.div>

          {/* Liability */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-gray-700 mb-4">Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Once flowers are handed over to the client or recipient,
              <span className="font-medium"> we are not responsible</span> for damage, care,
              environmental conditions, or handling.
            </p>
          </motion.div>

          {/* Communication */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-gray-700 mb-4">Communication</h2>
            <p className="text-gray-600 leading-relaxed">
              Any questions, changes, or concerns must be communicated{" "}
              <span className="font-medium underline">prior to delivery or pickup</span>.
            </p>
          </motion.div>

          {/* Agreement */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border-t pt-8"
          >
            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              By placing an order, you acknowledge that you have read, understood, and agreed to all
              policies listed above.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
