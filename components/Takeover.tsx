// "use client";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import { useRef } from "react";

// export default function ImageTakeover({ src }) {
//   const ref = useRef(null);

//   // Track scroll relative to this block
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   // Parallax zoom / scale effect
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
//   const borderRadius = useTransform(scrollYProgress, [0, 0.6], ["24px", "0px"]);
//   const y = useTransform(scrollYProgress, [0, 1], [120, 0]);

//   return (
//     <section ref={ref} className="h-[140vh] w-full flex justify-center items-center">
//       <motion.div
//         style={{ scale, opacity, y, borderRadius }}
//         className="relative w-[70vw] h-[75vh] overflow-hidden"
//       >
//         <Image src={src} alt="hero" fill className="object-cover" />
//       </motion.div>
//     </section>
//   );
// }
