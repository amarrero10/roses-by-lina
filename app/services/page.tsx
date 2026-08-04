"use client";
import Image from "next/image";
import Pic1 from "../../public/1.jpg";
import Pic2 from "../../public/2.jpg";
import Pic3 from "../../public/33.jpg";
import Pic4 from "../../public/19.jpg";
import Pic5 from "../../public/32.jpg";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import ServicesHero from "@/components/ServicesHero";
import ContactForm from "@/components/ContactForm";
import { Suspense } from "react";
import Link from "next/link";

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
        <main ref={container} className="relative sm:h-[520vh] h-[450vh] ">
          <Section1 scrollYProgress={scrollYProgress} />
          <Section2 scrollYProgress={scrollYProgress} />
          <Section3 scrollYProgress={scrollYProgress} />
          <Section4 scrollYProgress={scrollYProgress} />
          <Section5 scrollYProgress={scrollYProgress} />
        </main>
      </div>
      <section className="bg-accent-black py-20 md:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <span className="mb-4 block font-serif text-sm uppercase tracking-widest text-main-text-gold">
            Start Your Request
          </span>
          <h2 className="mb-4 font-serif text-3xl font-light text-primary-white md:text-5xl">
            Tell Us About Your Event
          </h2>
          <p className="mb-2 text-base leading-relaxed text-primary-white/70">
            Share a few details below and we&apos;ll follow up with a personalized quote. A 50%
            non-refundable deposit secures your date — see our{" "}
            <Link href="/policy" className="underline hover:text-primary-white">
              full policy
            </Link>
            .
          </p>
          <p className="mb-10 text-sm text-primary-white/50">
            Need something ready today instead?{" "}
            <Link href="/shop" className="underline hover:text-primary-white">
              Browse the shop
            </Link>
            .
          </p>

          <ContactForm className="text-left" />
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
        bg-warm-surface
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
          <span className="block text-sm uppercase tracking-widest text-muted-ink mb-4">
            Floral Services
          </span>

          <div className="w-12 h-px bg-accent-black/30 mb-6" />

          <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight text-accent-black/70">
            Custom Floral
            <br />
            Arrangements
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-accent-black/70">
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
          bg-warm-surface
          rounded-b-2xl md:rounded-bl-2xl
          md:rounded-br-none
          min-h-[400px]
        "
      >
        <div className="max-w-md">
          <span className="block text-sm uppercase tracking-widest text-muted-ink mb-4">
            Celebrations
          </span>

          <div className="w-12 h-px bg-accent-black/30 mb-6" />

          <h2 className="text-4xl md:text-5xl font-light mb-6 text-accent-black/70">
            Birthdays & Graduations
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-accent-black/70">
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
          <span className="block text-sm uppercase tracking-widest text-muted-ink mb-4">
            Special Moments
          </span>

          <div className="w-12 h-px bg-accent-black/30 mb-6" />

          <h2 className="text-4xl md:text-5xl font-light mb-6 text-accent-black/70">Proposals</h2>

          <p className="text-base md:text-lg leading-relaxed text-accent-black/70">
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
        mb-10
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
          bg-warm-surface
          rounded-b-2xl md:rounded-bl-2xl
          md:rounded-br-none
          min-h-[400px]
        "
      >
        <div className="max-w-md">
          <span className="block text-sm uppercase tracking-widest text-muted-ink mb-4">
            Life Events
          </span>

          <div className="w-12 h-px bg-accent-black/30 mb-6" />

          <h2 className="text-4xl md:text-5xl font-light mb-6 text-accent-black/70">
            Weddings & Memorials
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-accent-black/70">
            Carefully curated floral designs created with intention, beauty, and respect — honoring
            love, life, and memory.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

const Section5 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
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
          src={Pic5}
          alt="Wedding and Memorial Flowers"
          placeholder="blur"
          fill
          className="
            object-contain
            bg-primary-white
          "
        />
      </div>

      {/* Text */}
      {/* Text */}
      <div
        className="
          flex items-center
          px-8 md:px-24
          bg-warm-surface
          min-h-[400px]
        "
      >
        <div className="max-w-md">
          <span className="block text-sm uppercase tracking-widest text-muted-ink mb-4">
            Signature Designs
          </span>

          <div className="w-12 h-px bg-accent-black/30 mb-6" />

          <h2 className="text-4xl md:text-5xl font-light mb-6 text-accent-black/70">Boxed Arrangements</h2>

          <p className="text-base md:text-lg leading-relaxed text-accent-black/70">
            Elegant boxed floral arrangements designed for effortless gifting. Thoughtfully styled
            and beautifully presented, each box is perfect for surprises, celebrations, or simply
            making someone’s day feel extra special.
          </p>
        </div>
      </div>
    </motion.section>
  );
};
