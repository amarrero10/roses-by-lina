"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import lina from "../../public/lina-about.jpg";

/* ----------------- Motion Variants ----------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const values = [
  {
    number: "01",
    title: "Thoughtful Design",
    text: "Every arrangement is customized to reflect emotion, seasonality, and style.",
  },
  {
    number: "02",
    title: "Quality & Care",
    text: "We source fresh, beautiful blooms and handle each piece with care.",
  },
  {
    number: "03",
    title: "Personal Connection",
    text: "We believe in listening closely and creating designs that feel personal.",
  },
];

/* ----------------- Page ----------------- */

const About = () => {
  return (
    <>
      {/* ================= HERO — full-bleed image ================= */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden md:min-h-[85vh]">
        <Image
          src={lina}
          alt="Roses by Lina floral studio"
          fill
          placeholder="blur"
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-accent-black/80 via-accent-black/20 to-transparent" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 w-full px-6 pb-16 md:px-16 md:pb-24"
        >
          <motion.span
            variants={fadeUp}
            className="block text-sm uppercase tracking-widest text-main-text-gold mb-4"
          >
            About Us
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="max-w-3xl text-4xl md:text-7xl font-serif font-light leading-tight mb-6 text-primary-white"
          >
            Floral Design Rooted in Care &amp; Craft
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-xl text-base md:text-xl text-primary-white/80">
            Every arrangement we create is thoughtfully designed to celebrate life&apos;s most
            meaningful moments.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= STORY — single narrow column ================= */}
      <section className="bg-primary-white py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-2xl px-6 md:px-0"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 block font-serif text-sm uppercase tracking-widest text-muted-ink"
          >
            Our Story
          </motion.span>

          <motion.p variants={fadeUp} className="text-lg md:text-xl leading-relaxed text-muted-ink mb-6">
            Roses by Lina was founded with a simple belief — flowers have the power to express
            what words sometimes cannot.
          </motion.p>

          <motion.p variants={fadeUp} className="text-lg md:text-xl leading-relaxed text-muted-ink mb-6">
            From everyday arrangements to once-in-a-lifetime celebrations, every design is created
            with intention, creativity, and care.
          </motion.p>

          <motion.p variants={fadeUp} className="text-lg md:text-xl leading-relaxed text-muted-ink">
            Founded by <span className="font-medium text-accent-black">Linette Carcamo</span>, a
            young entrepreneur with a deep passion for floral design, Roses by Lina is rooted in
            artistry, dedication, and a love for meaningful moments. Linette brings a personal,
            hands-on approach to every arrangement, ensuring each piece feels thoughtful and
            uniquely crafted.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 text-sm text-muted-ink">
            Services available in English and Spanish.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= VALUES — numbered list ================= */}
      <section className="bg-warm-surface py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-5xl px-6 md:px-12"
        >
          <motion.h2
            variants={fadeUp}
            className="mb-16 text-center font-serif text-3xl font-light text-accent-black md:text-5xl"
          >
            What Guides Our Work
          </motion.h2>

          <div className="divide-y divide-hairline border-y border-hairline">
            {values.map((item) => (
              <motion.div
                key={item.number}
                variants={fadeUp}
                className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="font-serif text-2xl text-main-text-gold sm:w-16">
                  {item.number}
                </span>
                <div>
                  <h3 className="mb-2 font-serif text-xl text-accent-black">{item.title}</h3>
                  <p className="text-muted-ink">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 md:py-32 bg-accent-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center text-white px-6 md:px-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 md:mb-6">
            Let’s Create Something Beautiful
          </h2>

          <p className="text-base md:text-lg text-white/70 mb-6 md:mb-10">
            We’d love to hear about your next floral project.
          </p>

          <p className="text-sm text-white/60 mb-8">
            Prefer to reach out directly? You can call, text, or email us — and we’re happy to
            assist in English or Spanish <span className="italic">(hablamos español)</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-block border border-primary-white px-10 py-4 uppercase tracking-wide text-sm hover:bg-primary-white hover:text-accent-black transition"
            >
              Contact Us
            </Link>
            <Link
              href="/shop"
              className="inline-block border border-main-text-gold text-main-text-gold px-10 py-4 uppercase tracking-wide text-sm hover:bg-main-text-gold hover:text-accent-black transition"
            >
              Shop Arrangements
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default About;
