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

const sections = [
  {
    id: "deposit",
    title: "Deposit & Payment",
    body: (
      <>
        <p className="text-accent-black/70 leading-relaxed">
          A <span className="font-medium">50% deposit is required</span> to place any custom
          order. This deposit is <span className="font-medium uppercase">non-refundable</span> and
          confirms your order in our schedule.
        </p>
        <p className="text-accent-black/70 leading-relaxed mt-4">
          Orders <span className="font-medium">will not be placed</span> without a deposit.
        </p>
        <div className="mt-4 text-sm text-muted-ink">
          Accepted payment methods: <strong>Zelle, Apple Pay, Cash App, and Cash.</strong>
          <br />
          <span className="uppercase font-medium">No checks accepted.</span>
        </div>
      </>
    ),
  },
  {
    id: "delivery",
    title: "Delivery & Pickup",
    body: (
      <>
        <p className="text-accent-black/70 leading-relaxed">
          Delivery fees are based on location and will be discussed prior to confirmation.
          <span className="font-medium"> Pickup is always free.</span>
        </p>
        <p className="text-accent-black/70 leading-relaxed mt-4">
          We <span className="font-medium uppercase">do not ship</span> flowers.
        </p>
      </>
    ),
  },
  {
    id: "rush-orders",
    title: "Last-Minute Orders",
    body: (
      <>
        <p className="text-accent-black/70 leading-relaxed">
          Orders must be placed at least <span className="font-medium">24 hours in advance</span>.
        </p>
        <p className="text-accent-black/70 leading-relaxed mt-2">
          A <span className="font-medium">$20 rush fee</span> will apply to last-minute requests
          and is subject to availability.
        </p>
      </>
    ),
  },
  {
    id: "unclaimed",
    title: "Unclaimed Orders",
    body: (
      <>
        <p className="text-accent-black/70 leading-relaxed">
          If flowers are not picked up at the agreed-upon time, the order will be considered
          forfeited.
        </p>
        <p className="text-accent-black/70 leading-relaxed mt-2">
          The product will be lost and the{" "}
          <span className="font-medium">deposit will not be refunded</span> for both pre-made and
          custom orders.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    body: (
      <p className="text-accent-black/70 leading-relaxed">
        Once flowers are handed over to the client or recipient,
        <span className="font-medium"> we are not responsible</span> for damage, care,
        environmental conditions, or handling.
      </p>
    ),
  },
  {
    id: "communication",
    title: "Communication",
    body: (
      <p className="text-accent-black/70 leading-relaxed">
        Any questions, changes, or concerns must be communicated{" "}
        <span className="font-medium underline">prior to delivery or pickup</span>.
      </p>
    ),
  },
];

export default function PolicyPage() {
  return (
    <section className="bg-warm-surface px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[220px_1fr] md:gap-16">
        {/* Sticky table of contents */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="md:sticky md:top-28 md:self-start"
        >
          <h1 className="mb-6 font-serif text-3xl font-light text-accent-black md:text-4xl">
            Policies
          </h1>
          <nav className="hidden md:block">
            <ul className="space-y-3 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted-ink hover:text-accent-black">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* Content */}
        <div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 max-w-xl text-base md:text-lg text-muted-ink leading-relaxed"
          >
            Please review these policies carefully before placing a custom order. They ensure
            clarity, fairness, and the best experience for everyone. (Shop orders follow the same
            payment methods, minus the deposit requirement — full total is confirmed at checkout.)
          </motion.p>

          <div className="space-y-12">
            {sections.map((s, i) => (
              <motion.div
                key={s.id}
                id={s.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="scroll-mt-28"
              >
                <h2 className="text-2xl font-light text-accent-black mb-4">{s.title}</h2>
                {s.body}
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-t border-hairline pt-8"
            >
              <p className="text-sm md:text-base text-muted-ink leading-relaxed">
                By placing an order, you acknowledge that you have read, understood, and agreed to
                all policies listed above.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
