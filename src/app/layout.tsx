import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { TransitionProvider, TransitionContent } from "@/components/PageTransition";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "GD Carcare | Specialist in detailing",
  description: "Professionele auto detailing: interieur en exterieur reiniging, keramische sealant en kleibehandeling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>
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
