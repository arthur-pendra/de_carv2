import styles from './WBHeerlen.module.css';

export default function WBHeerlenPage() {
  return (
    <main className={styles.page}>
      <div className={styles.iframeContainer}>
        <iframe
          src="https://heerlendoenlive-9c6018f275d5133f383ca3b.webflow.io/"
          className={styles.iframe}
          title="WB Heerlen"
          allowFullScreen
        />
      </div>
    </main>
  );
}
