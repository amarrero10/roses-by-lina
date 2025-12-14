"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Instagram, Facebook } from "@deemlol/next-icons";
import logo from "@/public/logo.jpg"; // adjust your logo path
import TikTok from "../ui/TikTok";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative mx-auto bg-accent-black px-96 ">
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
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-left px-4 py-24 space-y-6 text-8xl font-medium">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/services" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/contact-us" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link href="/gallery" onClick={() => setIsOpen(false)}>
            Gallery
          </Link>
          <Link href="/faq" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
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
    </nav>
  );
};

export default Navigation;
