import Link from 'next/link';
import { HEXAGRAMS, hasModernContent } from '@/data/hexagrams';
import styles from './page.module.css';

export default function HomePage() {
  const recent = HEXAGRAMS.filter(hasModernContent).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroMark}>易</div>
          <div className={styles.brandWord}>YiLab</div>
          <hr className={styles.heroRule} />
          <p className={styles.tagline}>一个产品人的易经笔记</p>
          <div className={styles.ctas}>
            <Link href="/gua/" className={styles.cta}>进入卦象</Link>
            <Link href="/learn/" className={styles.cta}>入门教程</Link>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoInner}>
          <div className={`${styles.manifestoLabel} eyebrow`}>Why YiLab</div>
          <p className={styles.manifestoText}>
            把六十四卦当成<em>现代人的决策框架</em>来读，而不是占卜算命的术。
            易的本意是<em>变化</em>——不是预测未来，是<em>在不确定中保持清醒和柔韧</em>。
            这里没有大师，只有一个产品人和你一起读。
          </p>
        </div>
      </section>

      {/* Recent */}
      <section className={styles.recent}>
        <div className={styles.recentInner}>
          <div className={`${styles.recentLabel} eyebrow`}>最近更新</div>
          <ul className={styles.recentList}>
            {recent.map((h) => (
              <li key={h.id} className={styles.recentItem}>
                <Link href={`/gua/${h.id}/`} className={styles.recentLink}>
                  <span className={styles.recentSeq}>第 {h.id} 卦</span>
                  <span className={styles.recentTitle}>
                    {h.name} · {h.judgmentModern?.slice(0, 22)}…
                  </span>
                  <span className={styles.recentMeta}>{h.unicode}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
