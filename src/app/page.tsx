import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <Hero />
        <section className={styles.testSection}>
          <h2>Test Sectie</h2>
          <p>Dit is een test sectie om te kijken hoe de layout werkt.</p>
        </section>
      </main>
    </>
  );
}
