import type { Metadata } from "next";
import { Space_Grotesk, Hanken_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ilaFRESH | A Modern Spice Legacy",
  description:
    "Single-origin cardamom and botanical blends, sourced from the farms that grow them best and milled the week they ship.",
  openGraph: {
    title: "ilaFRESH | A Modern Spice Legacy",
    description:
      "Single-origin cardamom and botanical blends, sourced from the farms that grow them best and milled the week they ship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${hankenGrotesk.variable}`}>
      <body>
        <CartProvider>
          <div className="app">
            <Navbar />
            <main className="main-fade">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
