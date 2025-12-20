import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import { Poppins, Playfair_Display, Montserrat } from "next/font/google";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Roses by Lina",
  description:
    "Roses by Lina creates custom floral arrangements for weddings, events, and everyday moments. Elegant, handcrafted flowers designed with care.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} ${poppins.variable} antialiased h-screen`}
      >
        <Navigation />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
