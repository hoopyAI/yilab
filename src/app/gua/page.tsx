import Link from 'next/link';
import { HEXAGRAMS, hasModernContent } from '@/data/hexagrams';
import styles from './page.module.css';

export const metadata = {
  title: '六十四卦',
  description: '六十四卦索引——按周文王所传次序',
};

export default function GuaIndexPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.label} eyebrow`}>The Sixty-Four · 卦象索引</div>
        <h1 className={styles.title}>六十四卦</h1>
        <div className={styles.titleEn}>King Wen Sequence</div>
        <p className={styles.lead}>
          按周文王所传次序排列。每一卦都是一种"系统状态"的原型——
          点开看古文经文与今释。
        </p>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} /> 已附今释
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDotMuted} /> 古文整理中
          </span>
        </div>
      </header>

      <div className={styles.gridWrap}>
        <div className={styles.grid}>
          {HEXAGRAMS.map((h) => {
            const modern = hasModernContent(h);
            return (
              <Link
                key={h.id}
                href={`/gua/${h.id}/`}
                className={`${styles.cell} ${modern ? styles.cellHasModern : styles.cellEmpty}`}
                aria-label={`第 ${h.id} 卦 ${h.name}`}
              >
                <span className={styles.cellSymbol}>{h.unicode}</span>
                <span className={styles.cellName}>{h.name}</span>
                <span className={styles.cellSeq}>{String(h.id).padStart(2, '0')}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
