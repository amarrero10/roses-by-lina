"use client";

import TikTok from "../ui/TikTok";
import { Instagram, Facebook } from "@deemlol/next-icons";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import logo from "@/public/logo.jpg";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col bg-accent-black text-primary-white py-16 md:py-20">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 mx-6 md:mx-24 text-center md:text-left">
        {/* Intro */}
        <div className="text-3xl md:text-4xl px-0 md:px-20">
          <p>Please feel free to get in touch with us!</p>
          <p className="text-xl md:text-2xl mt-6 md:mt-10">Hablamos Español</p>
        </div>

        {/* Phone */}
        <div>
          <div className="flex justify-center md:justify-start gap-4 text-xl md:text-2xl items-center">
            <Phone size={24} />
            <p>By Phone</p>
          </div>
          <p className="mt-4 md:mt-7 md:ml-16">
            <a href="tel:18139562388" className="hover:underline">
              813-956-2388
            </a>
          </p>
        </div>

        {/* Email */}
        <div>
          <div className="flex justify-center md:justify-start gap-4 text-xl md:text-2xl items-center">
            <Mail />
            <p>By Email</p>
          </div>
          <p className="mt-4 md:mt-7 md:ml-16 underline underline-offset-3">
            <a href="mailto:rosesbylina@gmail.com">rosesbylina@gmail.com</a>
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mx-6 md:mx-24 items-center mt-16 md:mt-20 text-center md:text-left">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Image
            src={logo}
            alt="Logo of floral design studio, Roses by Lina"
            width={80}
            height={80}
            className="rounded"
            placeholder="blur"
          />
        </div>

        {/* Copyright */}
        <div>
          <p className="text-sm md:text-lg">&copy; Roses by Lina | All rights reserved {year}</p>
        </div>

        {/* Socials */}
        <div>
          <p className="text-lg mb-4">Follow Us!</p>
          <div className="flex justify-center md:justify-start gap-6">
            <Link href="https://www.tiktok.com/@rosesby.lina" target="_blank">
              <TikTok />
            </Link>
            <Link href="https://www.instagram.com/rosesby.lina/" target="_blank">
              <Instagram />
            </Link>
            <Link href="https://www.facebook.com/Rosesby.lina" target="_blank">
              <Facebook />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
