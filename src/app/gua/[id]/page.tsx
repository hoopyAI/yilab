import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HEXAGRAMS, getHexagram } from '@/data/hexagrams';
import { TRIGRAMS } from '@/data/trigrams';
import HexagramSymbol from '@/components/HexagramSymbol';
import styles from './page.module.css';

type Params = { id: string };

export function generateStaticParams() {
  return HEXAGRAMS.map((h) => ({ id: String(h.id) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const h = getHexagram(Number(id));
  if (!h) return { title: '未找到' };
  return {
    title: `第 ${h.id} 卦 · ${h.name}`,
    description: h.judgment || `第 ${h.id} 卦 ${h.name}（${h.pinyin}）`,
  };
}

export default async function GuaDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const idNum = Number(id);
  const h = getHexagram(idNum);
  if (!h) notFound();

  const upper = TRIGRAMS[h.trigrams.upper];
  const lower = TRIGRAMS[h.trigrams.lower];
  const inv = getHexagram(h.related.inverse)!;
  const opp = getHexagram(h.related.opposite)!;
  const nuc = getHexagram(h.related.nuclear)!;

  const hasJudgment = h.judgment.length > 0;
  const hasModern = Boolean(h.judgmentModern);
  const prevId = idNum > 1 ? idNum - 1 : null;
  const nextId = idNum < 64 ? idNum + 1 : null;
  const idStr = String(h.id).padStart(2, '0');

  return (
    <article className={styles.page}>
      <div className={styles.crumb}>
        <Link href="/gua/">← 返回索引</Link>
        <span>{idStr} / 64 · King Wen</span>
      </div>

      {/* Hero split */}
      <header className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.symbolBox}>
            <HexagramSymbol hexagram={h} size={240} stroke={10} />
          </div>

          <div className={styles.heroNameRow}>
            <div className={styles.heroName}>{h.name}</div>
            <div className={styles.heroPinyin}>{h.pinyin}</div>
            <div className={styles.heroSeal} aria-hidden>
              <span>{h.name}</span>
              <span className={styles.heroSealNum}>{idStr}</span>
            </div>
          </div>

          <div className={styles.heroMeta}>
            <div>上 <span className={styles.heroMetaSym}>{upper.symbol}</span> {upper.name} · <strong>{upper.nature}</strong></div>
            <div>下 <span className={styles.heroMetaSym}>{lower.symbol}</span> {lower.name} · <strong>{lower.nature}</strong></div>
            <div>序 · 第 {h.id} 卦 / 共六十四</div>
          </div>

          <div className={styles.related}>
            <div className={styles.relatedLabel}>关联卦象</div>
            <Link href={`/gua/${inv.id}/`} className={styles.relatedLink}>
              <span className={styles.relatedKind}>综卦</span>
              <span className={styles.relatedTo}>{inv.name} · 第 {inv.id} 卦</span>
            </Link>
            <Link href={`/gua/${opp.id}/`} className={styles.relatedLink}>
              <span className={styles.relatedKind}>错卦</span>
              <span className={styles.relatedTo}>{opp.name} · 第 {opp.id} 卦</span>
            </Link>
            <Link href={`/gua/${nuc.id}/`} className={styles.relatedLink}>
              <span className={styles.relatedKind}>互卦</span>
              <span className={styles.relatedTo}>{nuc.name} · 第 {nuc.id} 卦</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={`${styles.judgmentLabel} eyebrow`}>卦辞 · The Judgment</div>
          {hasJudgment ? (
            <p className={styles.judgment}>{h.judgment}</p>
          ) : (
            <p className={`${styles.judgment} ${styles.judgmentEmpty}`}>古文整理中</p>
          )}

          {hasModern ? (
            <>
              <div className={`${styles.modernLabel} eyebrow`}>今 释 · Modern Reading</div>
              <div className={styles.modern}>{h.judgmentModern}</div>
            </>
          ) : hasJudgment ? (
            <div className={styles.fallback}>
              这一卦的今释还在写中。计划顺着乾→坤→屯→蒙→需→讼→师→比依次往后推，每周一两卦。
            </div>
          ) : null}
        </div>
      </header>

      {/* 大象传 */}
      {h.image && (
        <section className={styles.section}>
          <div className={`${styles.sectionLabel} eyebrow`}>大象传 · The Image</div>
          <p className={styles.imageOriginal}>{h.image}</p>
          {h.imageModern && <p className={styles.modernPara}>{h.imageModern}</p>}
        </section>
      )}

      {/* 今释 决策 */}
      {h.decisionFramework && (
        <>
          <div className={styles.divider}>❦</div>
          <section className={styles.decision}>
            <h2 className={styles.decisionTitle}>时位三问</h2>
            <div className={styles.decisionTitleEn}>Three Questions of Position &amp; Time</div>
            <ul className={styles.checkpointList}>
              {h.decisionFramework.checkpoints.map((cp, i) => (
                <li
                  key={i}
                  className={styles.checkpoint}
                  dangerouslySetInnerHTML={{
                    __html: cp.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              ))}
            </ul>
            <div className={`${styles.scenarioLabel} eyebrow`}>今 境 · A Modern Reflection</div>
            <p className={styles.scenario}>{h.decisionFramework.scenario}</p>
          </section>
        </>
      )}

      {/* 爻辞 */}
      {h.lines.some((l) => l.text) && (
        <section className={styles.linesSection}>
          <div className={styles.divider}>❦</div>
          <div className={`${styles.sectionLabel} eyebrow`}>爻辞 · The Lines</div>
          <p className={styles.linesIntro}>
            自下而上，从初爻读到上爻——下方为最早的潜伏期，上方为最末的过盛期。
          </p>
          <ul className={styles.linesList}>
            {h.lines.map((line) => (
              <li key={line.position} className={styles.lineItem}>
                <div className={styles.linePos}>
                  <span className={styles.linePosLabel}>{line.positionLabel}</span>
                  <span className={styles.linePosOrd}>{String(line.position).padStart(2, '0')}</span>
                </div>
                <div>
                  {line.text ? (
                    <p className={styles.lineText}>{line.text}</p>
                  ) : (
                    <p className={styles.lineEmpty}>古文整理中</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom nav */}
      <nav className={styles.bottomNav}>
        <div>{prevId && <Link href={`/gua/${prevId}/`}>← 第 {prevId} 卦</Link>}</div>
        <div>{nextId && <Link href={`/gua/${nextId}/`}>第 {nextId} 卦 →</Link>}</div>
      </nav>
    </article>
  );
}
