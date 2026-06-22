import styles from "./page.module.css";
import Hero from "@/components/Hero";
import AboutCompany from "@/components/AboutCompany";
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
        <AboutCompany />
        <Services />
        <WhyUs />
        <LogoMarquee />
        <div className={styles.darkBlock} data-nav-invert>
          <Reviews />
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
