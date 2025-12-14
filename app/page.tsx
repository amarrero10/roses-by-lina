"use client";

import HomeGallery from "@/components/HomeGallery";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <main className=" min-h-screen bg-primary-white selection:bg-accent-black selection:text-primary-white">
        <section className=" py-64">
          <div className=" flex flex-col w-[70%] mx-auto">
            <h1 className="text-9xl">Fresh. Modern. Roses by Lina</h1>
            <h1 className="text-9xl mb-10"> Designed for you.</h1>
            <p className=" text-xl">Founded by Linette Carcamo</p>
            <p className=" text-xl">Based in the Tampa Bay Area</p>
          </div>
        </section>
        <HomeGallery />

        {/* The next text section after the takeover */}
        <section className=" max-w-2xl mx-auto px-6 py-60  text-center">
          <p className="text-xl leading-relaxed mb-44">
            Roses by Lina is a boutique floral studio offering refined floral designs for events and
            special occasions. From intimate celebrations to grand gatherings, our work blends
            elegance, creativity, and intentional design.
          </p>
          <motion.div
            className=" flex flex-col"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
          >
            <Link href="/services" className="text-9xl font-bold uppercase cursor-pointer ">
              services
            </Link>
            <div
              className={`border-t-8 border-accent-text-purple rounded-xl transition-all duration-300 ease-in-out ${
                hovered ? "w-full" : "w-0"
              }`}
            ></div>
          </motion.div>
        </section>

        <section className=" mx-auto px-20 text-left ">
          <p className="text-lg leading-relaxed mb-44">Recent Works</p>
          <div className=" flex gap-10 w-full justify-between">
            <div>
              <Link href="/work/1" className="text-9xl font-bold uppercase cursor-pointer">
                1
              </Link>
              <p>Description of work</p>
            </div>
            <div>
              <Link href="/work/2" className="text-9xl font-bold uppercase cursor-pointer">
                2
              </Link>
              <p>Description of work</p>
            </div>
            <div>
              <Link href="/work/3" className="text-9xl font-bold uppercase cursor-pointer">
                3
              </Link>
              <p>Description of work</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
