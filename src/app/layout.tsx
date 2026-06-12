import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Sierra Collections | Luxury Pakistani Heritage & Festive Wear", template: "%s | Sierra Collections" },
  description: "Explore Sierra Collections' refined edit of luxury Pakistani suits, unstitched lawn, festive chiffon Peshwas, ready-to-wear pret kurtis, and bespoke bridal wear.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Sierra Collections",
    description: "Premium luxury Pakistani heritage and festive wear with global express delivery.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
