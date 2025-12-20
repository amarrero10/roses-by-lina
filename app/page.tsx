"use client";

import HomeGallery from "@/components/HomeGallery";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "@/public/1.jpg";
import img2 from "@/public/2.jpg";
import img3 from "@/public/3.jpg";
import Lenis from "lenis";
import InfiniteText from "@/components/InfiniteText";
import ContactForm from "@/components/ContactForm";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Home() {
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <>
      <main className=" min-h-screen bg-primary-white selection:bg-accent-black selection:text-primary-white">
        <section className=" md:py-64 py-20 font-serif">
          <div className=" flex flex-col md:w-[70%] md:mx-auto">
            <h1 className="lg:text-9xl md:text-7xl text-3xl text-center sm:text-left ">
              Fresh. Modern. Roses by Lina
            </h1>
            <h1 className="lg:text-9xl md:text-7xl text-3xl md:mb-10 mb-3 text-center sm:text-left">
              {" "}
              Designed for you.
            </h1>
            <p className=" md:text-xl text-sm text-center sm:text-left">
              Founded by Linette Carcamo
            </p>
            <p className=" md:text-xl text-sm text-center sm:text-left">
              Based in the Tampa Bay Area
            </p>
          </div>
        </section>
        <HomeGallery />

        {/* The next text section after the takeover */}
        <section className=" max-w-2xl sm:mx-auto mx-3 sm:px-6 sm:py-60 py-10 text-center sm:text-left ">
          <p className="text-xl leading-relaxed sm:mb-44 mb-14">
            Roses by Lina is a boutique floral studio offering refined floral designs for events and
            special occasions. From intimate celebrations to grand gatherings, our work blends
            elegance, creativity, and intentional design.
          </p>
          <motion.div
            className=" flex flex-col items-center sm:items-stretch "
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
          >
            <Link
              href="/services"
              className="2xl:text-9xl text-4xl sm:text-7xl font-bold uppercase cursor-pointer font-serif flex gap-2 items-center"
            >
              <p> services</p>
              <span>
                <ArrowRight size={46} className={`${hovered ? " text-accent-text-purple" : ""}`} />
              </span>
            </Link>

            <div
              className={`border-t-8 border-accent-text-purple rounded-xl transition-all duration-300 ease-in-out ${
                hovered ? "w-[105%]" : "w-0"
              }`}
            ></div>
          </motion.div>
        </section>

        <InfiniteText />

        <section className="  text-left px-3 w-full ">
          <p className="text-lg leading-relaxed sm:mb-14 mb-3">Recent Works</p>
          <div className="flex gap-10 flex-col sm:flex-row ">
            <div className=" max-w-[screen] shadow-2xl rounded-2xl">
              <Image
                className=" rounded-2xl sm:max-h-[600px] object-cover"
                src={img1}
                alt="home"
                placeholder="blur"
              ></Image>
              <p className=" mt-10 sm:text-xl  text-sm p-4">
                A modern floral piece crafted to celebrate a graduation milestone.
              </p>
            </div>
            <div className="max-w-[screen] shadow-2xl rounded-2xl">
              <Image
                className=" rounded-2xl sm:max-h-[600px] object-cover"
                src={img2}
                alt="home"
                placeholder="blur"
              ></Image>
              <p className=" mt-10 sm:text-xl text-sm p-4 ">
                A refined floral arrangement created to celebrate a birthday with elegance and
                warmth.
              </p>
            </div>
            <div className=" max-w-[screen] shadow-2xl rounded-2xl">
              <Image
                className=" rounded-2xl sm:max-h-[600px]  object-cover"
                src={img3}
                alt="home"
                placeholder="blur"
              ></Image>
              <p className=" mt-10 sm:text-xl  text-sm p-4  ">
                A romantic floral design curated for an intimate engagement proposal.
              </p>
            </div>
          </div>
          <div className="mt-10 flex justify-center sm:justify-end">
            <Button>
              <Link href="/gallery">See More →</Link>
            </Button>
          </div>
        </section>

        <section className=" px-3 my-20  selection:bg-primary-white selection:text-red-200">
          <div className=" bg-accent-black text-primary-white rounded-2xl py-20 px-10  ">
            <h2 className="text-8xl font-serif font-light mb-10 text-center text-[#c7a552] ">
              Get In Touch
            </h2>
            <p className="sm:text-lg text-sm leading-relaxed sm:text-justify font-poppins mb-20 sm:w-[700px] mx-auto">
              We design flower arrangements and displays for various occasions, spaces, and themes,
              including; commercials, advertisements, packaging, retail stores, complexes,
              exhibition halls, international expositions, etc. We will propose a flower arrangement
              styling plan that matches the client&apos;s concept and ideas. We also offer licenses
              for our floral patterns.
            </p>

            <ContactForm className=" sm:w-1/2 sm:mx-auto  " />
            <p className="text-lg leading-relaxed mt-10 text-center font-poppins">
              Rather call or text? Reach out to us at 813-956-2388 instead.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
