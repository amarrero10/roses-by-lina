"use client";
import Image from "next/image";
import Pic1 from "../../public/1.jpg";
import Pic2 from "../../public/2.jpg";
import Pic3 from "../../public/3.jpg";
import Pic4 from "../../public/4.jpg";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import ServicesHero from "@/components/ServicesHero";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone } from "lucide-react";
import { Suspense } from "react";

export default function Services() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ServicesHero />
      </Suspense>

      <div className="sm:py-60 py-10 bg-accent-black">
        <main ref={container} className="relative h-[400vh] ">
          <Section1 scrollYProgress={scrollYProgress} />
          <Section2 scrollYProgress={scrollYProgress} />
          <Section3 scrollYProgress={scrollYProgress} />
          <Section4 scrollYProgress={scrollYProgress} />
        </main>
      </div>
      <section className="bg-accent-black py-16 md:py-20">
        <div
          className="
      max-w-4xl sm:max-w-7xl mx-auto
      grid grid-cols-1 md:grid-cols-2
      gap-12 md:gap-24
      items-start
      bg-accent-text-purple
    "
        >
          {/* Text */}
          <div className="text-accent-black p-6 md:p-10">
            <h2 className="text-3xl md:text-5xl font-light mb-4 md:mb-6">
              Let’s Create Something Beautiful
            </h2>

            <p className="text-base md:text-lg text-accent-black/70 leading-relaxed mb-6">
              Whether you’re celebrating a milestone, planning an event, or simply sending a
              thoughtful gesture, we’d love to hear from you. Share a few details and we’ll be in
              touch.
            </p>

            <div className="w-10 h-px bg-accent-black/30 my-6" />

            {/* Secondary contact blurb */}
            <p className="text-sm text-accent-black leading-relaxed">
              Prefer to reach out directly? You’re welcome to call or email us instead. We’re happy
              to assist in English or Spanish — <span className="italic">hablamos español</span>.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="mr-2 text-accent-black" />
                <a href="tel:18139562388" className="hover:text-white transition">
                  813&nbsp;·&nbsp;956&nbsp;·&nbsp;2388
                </a>
              </div>

              <div className="flex items-center">
                <Mail className="mr-2 text-accent-black" />
                <a
                  href="mailto:rosesbylina2025@gmail.com"
                  className="hover:text-white underline transition"
                >
                  rosesbylina2025@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm className="bg-black p-6 md:p-12" />
        </div>
      </section>
    </>
  );
}

const Section1 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="
        sticky top-0
        h-[700px] md:h-[800px]
        mb-10
        grid grid-cols-1 md:grid-cols-2
        bg-[#faf8f6]
        rounded-2xl
      "
    >
      {/* Image */}
      <div className="relative h-[300px] md:h-auto">
        <Image
          src={Pic1}
          alt="Custom Floral Arrangements"
          placeholder="blur"
          fill
          className="
            object-cover
            rounded-t-2xl md:rounded-tl-2xl
            md:rounded-tr-none
            md:rounded-bl-2xl
          "
        />
      </div>

      {/* Text */}
      <div className="flex items-center px-8 md:px-24">
        <div className="max-w-md">
          <span className="block text-sm uppercase tracking-widest text-gray-400 mb-4">
            Floral Services
          </span>

          <div className="w-12 h-px bg-gray-600 mb-6" />

          <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight text-gray-600">
            Custom Floral
            <br />
            Arrangements
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            Designed for everyday moments and meaningful gestures — from birthdays and celebrations
            to “just because.”
          </p>
        </div>
      </div>
    </motion.section>
  );
};

const Section2 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="
        sticky top-0
        h-[700px] md:h-[800px]
        mb-10
        grid grid-cols-1 md:grid-cols-2
        rounded-2xl

      "
    >
      {/* Image */}
      <div className="relative h-[300px] md:h-auto">
        <Image
          src={Pic2}
          alt="Birthday and Graduation Flowers"
          placeholder="blur"
          fill
          className="
            object-cover
            rounded-t-2xl md:rounded-tr-2xl
            md:rounded-tl-none
            md:rounded-br-2xl

          "
        />
      </div>

      {/* Text */}
      <div
        className="
          flex items-center
          px-8 md:px-24
          bg-[#faf8f6]
          rounded-b-2xl md:rounded-bl-2xl
          md:rounded-br-none
          min-h-[400px]
        "
      >
        <div className="max-w-md">
          <span className="block text-sm uppercase tracking-widest text-gray-400 mb-4">
            Celebrations
          </span>

          <div className="w-12 h-px bg-gray-600 mb-6" />

          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-600">
            Birthdays & Graduations
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            Thoughtfully designed floral arrangements that celebrate milestones, joy, and meaningful
            moments.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

const Section3 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="
        sticky top-0
        h-[700px] md:h-[800px]
        mb-10
        grid grid-cols-1 md:grid-cols-2
        rounded-2xl
      "
    >
      {/* Image */}
      <div className="relative h-[300px] md:h-auto">
        <Image
          src={Pic3}
          alt="Proposal Flowers"
          placeholder="blur"
          fill
          className="
            object-cover
            rounded-t-2xl md:rounded-tl-2xl
            md:rounded-tr-none
            md:rounded-bl-2xl
          "
        />
      </div>

      {/* Text */}
      <div
        className="
          flex items-center
          px-8 md:px-24
          bg-white
          rounded-b-2xl md:rounded-tr-2xl
          md:rounded-br-2xl
          md:rounded-bl-none
          min-h-[400px]
        "
      >
        <div className="max-w-md">
          <span className="block text-sm uppercase tracking-widest text-gray-400 mb-4">
            Special Moments
          </span>

          <div className="w-12 h-px bg-gray-600 mb-6" />

          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-600">Proposals</h2>

          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            From intimate gestures to grand displays, our florals help create moments that feel
            unforgettable and deeply personal.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

const Section4 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="
        sticky top-0
        h-[700px] md:h-[800px]
        grid grid-cols-1 md:grid-cols-2
        rounded-2xl
      "
    >
      {/* Image */}
      <div className="relative h-[300px] md:h-auto">
        <Image
          src={Pic4}
          alt="Wedding and Memorial Flowers"
          placeholder="blur"
          fill
          className="
            object-cover
            rounded-t-2xl md:rounded-tr-2xl
            md:rounded-tl-none
            md:rounded-br-2xl
          "
        />
      </div>

      {/* Text */}
      <div
        className="
          flex items-center
          px-8 md:px-24
          bg-[#faf8f6]
          rounded-b-2xl md:rounded-bl-2xl
          md:rounded-br-none
          min-h-[400px]
        "
      >
        <div className="max-w-md">
          <span className="block text-sm uppercase tracking-widest text-gray-400 mb-4">
            Life Events
          </span>

          <div className="w-12 h-px bg-gray-600 mb-6" />

          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-600">
            Weddings & Memorials
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            Carefully curated floral designs created with intention, beauty, and respect — honoring
            love, life, and memory.
          </p>
        </div>
      </div>
    </motion.section>
  );
};
