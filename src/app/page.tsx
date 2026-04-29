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
          <div className={`${styles.heroEyebrow} animFadeIn`}>易 · YiLab</div>

          <div className={`${styles.markWrap} animInkBloom delay-1`}>
            <span className={styles.halo} aria-hidden />
            <div className={styles.heroMark}>易</div>
            <span className={styles.sealOverlay} aria-hidden>
              <span>YL</span>
            </span>
          </div>

          <div className={`${styles.brandWord} animFadeUp delay-2`}>YiLab</div>

          <div className={`${styles.fleuron} animFadeIn delay-3`}>❦</div>

          <p className={`${styles.tagline} animFadeUp delay-3`}>一卷可翻阅的易经</p>
          <p className={`${styles.subtag} animFadeUp delay-4`}>
            An I Ching, retold for modern readers.
          </p>

          <div className={`${styles.ctas} animFadeUp delay-5`}>
            <Link href="/gua/" className={`${styles.cta} ${styles.ctaPrimary}`}>
              翻阅卦象
            </Link>
            <Link href="/learn/" className={styles.cta}>
              入门导览
            </Link>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoInner}>
          <div className={`${styles.manifestoLabel} eyebrow`}>开 卷 之 言</div>
          <p className={styles.manifestoText}>
            把六十四卦当成<em>现代人的决策框架</em>来读，而不是占卜算命的术。
            "易"的本意是<em>变化</em>——不是预测未来，是
            <em>在不确定中保持清醒和柔韧</em>。
            这里没有大师，只是一份认真的读书笔记，与你共读。
          </p>
        </div>
      </section>

      {/* Recent */}
      <section className={styles.recent}>
        <div className={styles.recentInner}>
          <div className={`${styles.recentLabel} eyebrow`}>最 近 翻 阅 · Recent</div>
          <ul className={styles.recentList}>
            {recent.map((h) => (
              <li key={h.id} className={styles.recentItem}>
                <Link href={`/gua/${h.id}/`} className={styles.recentLink}>
                  <span className={styles.recentSeq}>第 {String(h.id).padStart(2, '0')} 卦</span>
                  <span className={styles.recentTitle}>
                    {h.name} · {h.judgmentModern?.slice(0, 20)}…
                  </span>
                  <span className={styles.recentSymbol}>{h.unicode}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
