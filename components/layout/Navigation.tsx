"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Instagram, Facebook } from "@deemlol/next-icons";
import logo from "@/public/logo-mark-paper.svg";
import TikTok from "../ui/TikTok";
import { motion } from "framer-motion";
import CartIndicator from "./CartIndicator";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Custom Orders" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact" },
];

type FlipLinkProps = {
  href: string;
  children: string;
  onClick?: () => void;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-accent-black">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="shrink-0">
          <Image src={logo} alt="Roses by Lina" width={48} height={48} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-9 font-serif text-sm uppercase tracking-widest text-primary-white lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative pb-1 transition-colors hover:text-main-text-gold ${
                pathname === link.href ? "text-main-text-gold" : ""
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-0.5 left-0 h-px w-full bg-main-text-gold" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <CartIndicator />
          {/* Hamburger — mobile / tablet only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="text-primary-white hover:opacity-80 transition cursor-pointer lg:hidden"
          >
            {isOpen ? (
              <X size={30} className="text-main-text-gold" />
            ) : (
              <Menu size={30} className="text-main-text-gold" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`absolute top-full left-0 w-full bg-accent-black text-main-text-gold transition-all duration-500 ease-in-out overflow-hidden lg:hidden ${
          isOpen ? "h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-left px-4 sm:py-16 py-3 2xl:text-8xl sm:text-5xl text-2xl font-medium w-full">
          <div className="flex flex-col gap-4 font-serif ">
            <FlipLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </FlipLink>
            {links.map((link) => (
              <FlipLink key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </FlipLink>
            ))}
            <FlipLink href="/policy" onClick={() => setIsOpen(false)}>
              Policy
            </FlipLink>
            <div>
              <p className="text-xl my-4">Follow Us!</p>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/rosesby.lina/"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <Instagram size={24} color="#c7a552" />
                </Link>
                <Link
                  href="https://www.facebook.com/Rosesby.lina"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <Facebook size={24} color="#c7a552" />
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
