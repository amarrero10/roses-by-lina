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
        <section className=" py-64 font-serif">
          <div className=" flex flex-col w-[70%] mx-auto">
            <h1 className="text-9xl ">Fresh. Modern. Roses by Lina</h1>
            <h1 className="text-9xl mb-10"> Designed for you.</h1>
            <p className=" text-xl">Founded by Linette Carcamo</p>
            <p className=" text-xl">Based in the Tampa Bay Area</p>
          </div>
        </section>
        <HomeGallery />

        {/* The next text section after the takeover */}
        <section className=" max-w-2xl mx-auto px-6 py-60  text-center ">
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
            <Link
              href="/services"
              className="text-9xl font-bold uppercase cursor-pointer font-serif flex gap-2 items-center"
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

        <section className=" mx-auto px-20 text-left ">
          <p className="text-lg leading-relaxed mb-20">Recent Works</p>
          <div className=" grid grid-cols-3 gap-10 ">
            <div>
              <Image
                className=" rounded-2xl max-h-[600px] object-cover"
                src={img1}
                alt="home"
                placeholder="blur"
              ></Image>
              <p className=" mt-10  text-sm">
                A modern floral piece crafted to celebrate a graduation milestone.
              </p>
            </div>
            <div>
              <Image
                className=" rounded-2xl max-h-[600px] object-cover"
                src={img2}
                alt="home"
                placeholder="blur"
              ></Image>
              <p className=" mt-10 text-sm">
                A refined floral arrangement created to celebrate a birthday with elegance and
                warmth.
              </p>
            </div>
            <div>
              <Image
                className=" rounded-2xl max-h-[600px] object-cover"
                src={img3}
                alt="home"
                placeholder="blur"
              ></Image>
              <p className=" mt-10  text-sm">
                A romantic floral design curated for an intimate engagement proposal.
              </p>
            </div>
          </div>
        </section>
        <section className=" mx-auto px-20 my-20  selection:bg-primary-white selection:text-red-200">
          <div className=" bg-accent-black text-primary-white rounded-2xl py-20 ">
            <h2 className="text-8xl font-serif font-light mb-10 text-center ">Get In Touch</h2>
            <p className="text-lg leading-relaxed text-justify font-poppins mb-20 w-[700px] mx-auto">
              We design flower arrangements and displays for various occasions, spaces, and themes,
              including; commercials, advertisements, packaging, retail stores, complexes,
              exhibition halls, international expositions, etc. We will propose a flower arrangement
              styling plan that matches the client&apos;s concept and ideas. We also offer licenses
              for our floral patterns.
            </p>

            <ContactForm />
            <p className="text-lg leading-relaxed mt-10 text-center font-poppins">
              Rather call or text? Reach out to us at 813-956-2388 instead.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
