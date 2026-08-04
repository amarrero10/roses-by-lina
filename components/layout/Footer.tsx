"use client";

import TikTok from "../ui/TikTok";
import { Instagram, Facebook } from "@deemlol/next-icons";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import logo from "@/public/logo-mark-ink.svg";
import Image from "next/image";

const shopLinks = [
  { href: "/shop", label: "All Arrangements" },
  { href: "/shop?category=bouquet", label: "Bouquets" },
  { href: "/shop?category=centerpiece", label: "Centerpieces" },
  { href: "/services", label: "Weddings & Events" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-main-text-gold text-accent-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-16 md:grid-cols-4 md:gap-8 md:px-12 md:py-24">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Image src={logo} alt="Roses by Lina" width={56} height={56} />
          <p className="mt-5 max-w-[220px] text-sm leading-relaxed text-accent-black/80">
            Boutique floral design for the Tampa Bay area. Hablamos español.
          </p>
          <div className="mt-6 flex gap-5">
            <Link
              href="https://www.instagram.com/rosesby.lina/"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://www.facebook.com/Rosesby.lina"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            <Link href="https://www.tiktok.com/@rosesby.lina" target="_blank" aria-label="TikTok">
              <TikTok />
            </Link>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="mb-4 text-xs uppercase tracking-widest text-accent-black/60">Shop</h3>
          <ul className="space-y-3 text-sm">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-4 text-xs uppercase tracking-widest text-accent-black/60">Company</h3>
          <ul className="space-y-3 text-sm">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-xs uppercase tracking-widest text-accent-black/60">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={15} />
              <a href="tel:18139562388" className="hover:underline">
                813-956-2388
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} />
              <a href="mailto:rosesbylina2025@gmail.com" className="hover:underline">
                rosesbylina2025@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-accent-black/15">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-3 px-6 py-6 text-xs text-accent-black/70 md:flex-row md:justify-between md:px-12">
          <p>&copy; {year} Roses by Lina. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/policy" className="hover:underline">
              Order Policy
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
