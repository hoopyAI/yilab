import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>YiLab</div>
        <div className={styles.meta}>
          穷则变 · 变则通 · 通则久
        </div>
      </div>
    </footer>
  );
}
