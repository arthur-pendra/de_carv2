import type { Metadata } from "next";
import "./globals.css";
import { TransitionProvider, TransitionContent } from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import StructuredData from "@/components/StructuredData";
import { business } from "@/config/business";

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: "Car Detailing Heerlen | GD Carcare — interieur, exterieur & coating",
    template: "%s | GD Carcare",
  },
  description:
    "Professionele car detailing in Heerlen en heel Limburg. Interieur- en exterieurreiniging, polijsten, keramische coating en kleibehandeling. Direct online een afspraak boeken met vaste pakketprijzen.",
  keywords: [
    "car detailing Heerlen",
    "auto poetsen Heerlen",
    "keramische coating Limburg",
    "interieurreiniging auto",
    "exterieur detailing",
    "auto detailing Parkstad",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "GD Carcare",
    title: "Car Detailing Heerlen | GD Carcare",
    description:
      "Professionele car detailing in Heerlen en Limburg. Direct online boeken met vaste pakketprijzen.",
    url: business.url,
    images: [{ url: "/img/hero.png", width: 1200, height: 630, alt: "GD Carcare detailing" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>
        <StructuredData />
        <SmoothScroll>
          <TransitionProvider>
            <Navbar />
            <TransitionContent>
              {children}
            </TransitionContent>
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
