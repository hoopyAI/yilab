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

  return (
    <article className={styles.page}>
      <div className={styles.crumb}>
        <Link href="/gua/">← 返回卦象索引</Link>
        <span>{String(h.id).padStart(2, '0')} / 64 · King Wen</span>
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
          </div>

          <div className={styles.heroMeta}>
            <div>上卦 · {upper.name} {upper.symbol} <strong>{upper.nature}</strong></div>
            <div>下卦 · {lower.name} {lower.symbol} <strong>{lower.nature}</strong></div>
            <div>序 · {String(h.id).padStart(2, '0')} / 64</div>
            <div>{h.unicode} · U+{(0x4dc0 + h.id - 1).toString(16).toUpperCase()}</div>
          </div>

          <div className={styles.related}>
            <div className={styles.relatedLabel}>关联卦</div>
            <Link href={`/gua/${inv.id}/`} className={styles.relatedLink}>
              <span className={styles.relatedKind}>综卦</span>
              <span className={styles.relatedTo}>{inv.name} ({inv.id})</span>
            </Link>
            <Link href={`/gua/${opp.id}/`} className={styles.relatedLink}>
              <span className={styles.relatedKind}>错卦</span>
              <span className={styles.relatedTo}>{opp.name} ({opp.id})</span>
            </Link>
            <Link href={`/gua/${nuc.id}/`} className={styles.relatedLink}>
              <span className={styles.relatedKind}>互卦</span>
              <span className={styles.relatedTo}>{nuc.name} ({nuc.id})</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={`${styles.judgmentLabel} eyebrow`}>卦辞 · The Judgment</div>
          {hasJudgment ? (
            <p className={styles.judgment}>{h.judgment}</p>
          ) : (
            <p className={`${styles.judgment} ${styles.judgmentEmpty}`}>
              （古文整理中）
            </p>
          )}

          {hasModern ? (
            <div className={styles.modern}>{h.judgmentModern}</div>
          ) : hasJudgment ? (
            <div className={styles.fallback}>
              这一卦的现代解读还在写。计划在「乾→坤→屯→蒙→需→讼→师→比」八卦写完后再依次往后推。
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

      {/* 决策框架视角 */}
      {h.decisionFramework && (
        <section className={styles.decision}>
          <h2 className={styles.decisionTitle}>决策框架视角</h2>
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
          <div className={`${styles.scenarioLabel} eyebrow`}>现代场景类比</div>
          <p className={styles.scenario}>{h.decisionFramework.scenario}</p>
        </section>
      )}

      {/* 爻辞 */}
      {h.lines.some((l) => l.text) && (
        <section className={styles.linesSection}>
          <div className={`${styles.sectionLabel} eyebrow`}>爻辞 · The Lines（自下而上）</div>
          <p className={styles.linesIntro}>
            按易经传统，爻辞从初爻读到上爻——下方为最早的"潜伏期"，上方为最晚的"过盛期"。
          </p>
          <ul className={styles.linesList}>
            {h.lines.map((line) => (
              <li key={line.position} className={styles.lineItem}>
                <div className={styles.linePos}>
                  <span className={styles.linePosLabel}>{line.positionLabel}</span>
                  {String(line.position).padStart(2, '0')}
                </div>
                <div>
                  {line.text ? (
                    <p className={styles.lineText}>{line.text}</p>
                  ) : (
                    <p className={styles.lineEmpty}>（古文整理中）</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom nav */}
      <nav className={styles.bottomNav}>
        <div>
          {prevId && <Link href={`/gua/${prevId}/`}>← 第 {prevId} 卦</Link>}
        </div>
        <div>
          {nextId && <Link href={`/gua/${nextId}/`}>第 {nextId} 卦 →</Link>}
        </div>
      </nav>
    </article>
  );
}
