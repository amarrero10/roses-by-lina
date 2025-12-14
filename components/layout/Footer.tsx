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
    <div className=" flex flex-col h-[500px] bg-accent-black text-primary-white justify-between py-20 ">
      <div className=" grid grid-cols-3 gap-10 mx-24">
        <div className="text-4xl text-center px-20">
          <p>Please feel free to get in touch with us!</p>
          <p className=" text-2xl mt-10"> Hablamos Español</p>
        </div>
        <div>
          <div className=" flex gap-10 text-2xl items-center">
            <Phone size={24} />
            <p>By Phone</p>
          </div>
          <p className="  ml-16 mt-7">813-956-2388</p>
        </div>
        <div>
          <div className=" flex gap-10 text-2xl items-center">
            <Mail />
            <p>By Email</p>
          </div>
          <p className="ml-16 mt-7 underline underline-offset-3">rosesbylina@gmail.com</p>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap 10 mx-24 items-center">
        <div>
          <Image
            src={logo}
            alt="Logo of floral design studio, Roses by Lina"
            width={80}
            height={80}
            className="rounded"
            placeholder="blur"
          />
        </div>
        <div>
          <p className=" text-lg">&copy; Roses by Lina | All rights Reserved {year}</p>
        </div>
        <div className=" flex gap-6">
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
  );
};

export default Footer;
