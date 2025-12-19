"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Instagram, Facebook } from "@deemlol/next-icons";
import logo from "@/public/logo.jpg"; // adjust your logo path
import TikTok from "../ui/TikTok";
import { motion } from "framer-motion";

type FlipLinkProps = {
  href: string;
  children: string;
  onClick?: () => void;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative mx-auto bg-accent-black 2xl:px-96 z-50 w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src={logo} alt="Logo" width={60} height={60} className="rounded" />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-primary-white hover:opacity-80 transition cursor-pointer "
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Dropdown menu */}
      <div
        className={`absolute top-full left-0 w-full bg-accent-black text-primary-white transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-left px-4 py-16 sm:text-8xl text-5xl font-medium w-full">
          <div className="flex flex-col gap-4 font-serif ">
            <FlipLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </FlipLink>
            <FlipLink href="/about" onClick={() => setIsOpen(false)}>
              About
            </FlipLink>
            <FlipLink href="/services" onClick={() => setIsOpen(false)}>
              Services
            </FlipLink>
            <FlipLink href="/gallery" onClick={() => setIsOpen(false)}>
              Gallery
            </FlipLink>
            <FlipLink href="/faq" onClick={() => setIsOpen(false)}>
              FAQ
            </FlipLink>
            <FlipLink href="/contact-us" onClick={() => setIsOpen(false)}>
              Contact
            </FlipLink>
            <div>
              <p className="text-xl my-4">Follow Us!</p>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/rosesby.lina/"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <Instagram size={24} color="#FEFEFE" />
                </Link>
                <Link
                  href="https://www.facebook.com/Rosesby.lina"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <Facebook size={24} color="#FEFEFE" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@rosesby.lina"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <TikTok />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const FlipLink = ({ href, children, onClick }: FlipLinkProps) => (
  <>
    <motion.div
      initial="initial"
      whileHover="hovered"
      className=" relative block overflow-hidden whitespace-nowrap py-2"
    >
      <Link href={href} onClick={onClick}>
        <div>
          {children.split("").map((char, i) => {
            return (
              <motion.span
                key={i}
                variants={{
                  initial: { y: 0 },
                  hovered: { y: "-125%" },
                }}
                transition={{ delay: i * 0.05, duration: 0.3, ease: "easeInOut" }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </div>
        <div className=" absolute inset-0 py-2">
          {children.split("").map((char, i) => {
            return (
              <motion.span
                key={i}
                variants={{
                  initial: { y: "125%" },
                  hovered: { y: 0 },
                }}
                transition={{ delay: i * 0.05, duration: 0.3, ease: "easeInOut" }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </Link>
    </motion.div>
  </>
);

export default Navigation;
