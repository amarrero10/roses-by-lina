"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import img1 from "@/public/1.jpg";
import img2 from "@/public/2.jpg";
import img3 from "@/public/3.jpg";
import img4 from "@/public/4.jpg";
import img19 from "@/public/19.jpg";
import img9 from "@/public/9.jpg";
import img7 from "@/public/7.jpg";

export default function HomeGallery() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: img1,
      scale: scale3,
    },
    {
      src: img2,
      scale: scale5,
    },
    {
      src: img3,
      scale: scale6,
    },
    {
      src: img4,
      scale: scale5,
    },
    {
      src: img19,
      scale: scale6,
    },
    {
      src: img9,
      scale: scale8,
    },
    {
      src: img7,
      scale: scale9,
    },
  ];

  const imagePositionClasses = (index: number) => {
    switch (index) {
      case 1:
        return "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]";
      case 2:
        return "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]";
      case 3:
        return "left-[27.5vw] w-[25vw] h-[25vh]";
      case 4:
        return "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]";
      case 5:
        return "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]";
      case 6:
        return "top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]";
      default:
        return "w-[25vw] h-[25vh]"; // first child (index 0)
    }
  };

  return (
    <div className="h-[400vh] relative" ref={container}>
      <div className=" sticky top-0 h-screen bg-accent-black overflow-hidden ">
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className=" w-full h-full absolute top-0 flex justify-center items-center "
            >
              <div className={`${imagePositionClasses(index)} relative  `}>
                <Image
                  src={src}
                  alt="some"
                  fill
                  placeholder="blur"
                  className="object-cover rounded-xl"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
