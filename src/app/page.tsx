import styles from "./page.module.css";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import LogoMarquee from "@/components/LogoMarquee";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <Hero />
        <Services />
        <WhyUs />
        <LogoMarquee />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
