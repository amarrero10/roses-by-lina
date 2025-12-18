"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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

const About = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen bg-[#fefefe] flex items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-4xl mx-auto px-8 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="block text-sm uppercase tracking-widest text-black/50 mb-4"
          >
            About Us
          </motion.span>

          <motion.h1 variants={fadeUp} className="text-7xl font-light leading-tight mb-8">
            Floral Design Rooted in
            <br />
            Care & Craft
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-black/60 max-w-2xl mx-auto">
            Every arrangement we create is thoughtfully designed to celebrate life’s most meaningful
            moments.
          </motion.p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-24 items-center px-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-[4/5]"
          >
            <Image src="/1.jpg" alt="Our floral studio" fill className="object-cover" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-5xl font-light mb-6">
              Our Story
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg text-black/60 leading-relaxed mb-6">
              Roses by Lina was founded with a simple belief — flowers have the power to express
              what words sometimes cannot.
            </motion.p>

            <motion.p variants={fadeUp} className="text-lg text-black/60 leading-relaxed">
              From everyday arrangements to once-in-a-lifetime celebrations, we approach every
              design with intention, creativity, and care.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-32 bg-[#fefefe]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-5xl mx-auto text-center px-12"
        >
          <motion.h2 variants={fadeUp} className="text-5xl font-light mb-20">
            What Guides Our Work
          </motion.h2>

          <div className="grid grid-cols-3 gap-16">
            {[
              {
                title: "Thoughtful Design",
                text: "Every arrangement is customized to reflect emotion, seasonality, and style.",
              },
              {
                title: "Quality & Care",
                text: "We source fresh, beautiful blooms and handle each piece with care.",
              },
              {
                title: "Personal Connection",
                text: "We believe in listening closely and creating designs that feel personal.",
              },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="text-center">
                <h3 className="text-xl font-light mb-4">{item.title}</h3>
                <p className="text-black/60">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-accent-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center text-white px-12"
        >
          <h2 className="text-5xl font-light mb-6">Let’s Create Something Beautiful</h2>
          <p className="text-lg text-white/70 mb-10">
            We’d love to hear about your next floral project.
          </p>

          <p className="text-sm text-white/60 mb-6">
            Prefer to reach out directly? You’re welcome to call, text, or email us — and we’re
            happy to assist in English or Spanish (<span className="italic">hablamos español</span>
            ).
          </p>

          <Link
            href="/contact-us"
            className="inline-block border border-white px-10 py-4 uppercase tracking-wide text-sm hover:bg-white hover:text-black transition"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default About;
