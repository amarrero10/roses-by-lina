"use client";
import Image from "next/image";
import Pic1 from "../../public/1.jpg";
import Pic2 from "../../public/2.jpg";
import Pic3 from "../../public/3.jpg";
import Pic4 from "../../public/4.jpg";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function Services() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="my-96">
      <main ref={container} className="relative h-[400vh] ">
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <Section3 scrollYProgress={scrollYProgress} />
        <Section4 scrollYProgress={scrollYProgress} />
      </main>
    </div>
  );
}

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-[800px] bg-[#C72626] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh] mb-10"
    >
      <p>Scroll Perspective</p>
      <div className="flex gap-4">
        <p>Section</p>
        <div className="relative w-[12.5vw]">
          <Image src={Pic1} alt="img" placeholder="blur" fill />
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-[800px] flex justify-between bg-amber-400"
    >
      <div className=" ">
        <h1> Some text</h1>
      </div>
      <Image src={Pic2} alt="img" placeholder="blur" className=" object-cover" />
    </motion.div>
  );
};

const Section3 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <motion.div style={{ scale, rotate }} className="sticky top-0 h-[800px]">
      <Image src={Pic3} alt="img" placeholder="blur" fill className=" object-cover" />
    </motion.div>
  );
};

const Section4 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <motion.div style={{ scale, rotate }} className="sticky top-0 h-[800px]">
      <Image src={Pic4} alt="img" placeholder="blur" fill className=" object-cover" />
    </motion.div>
  );
};
