import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandSeal} aria-hidden>易</span>
          <span className={styles.brandWord}>YiLab</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/gua/" className={styles.navLink}>卦象</Link>
          <Link href="/learn/" className={styles.navLink}>入门</Link>
          <Link href="/about/" className={styles.navLink}>关于</Link>
        </nav>
      </div>
    </header>
  );
}
