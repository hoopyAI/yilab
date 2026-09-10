import Link from 'next/link';
import TaijiBagua from '@/components/TaijiBagua';
import styles from './page.module.css';

type Palette = {
  id: 'A' | 'B' | 'C';
  name: string;
  enName: string;
  emoji: string;
  desc: string;
  bullet: string;
  swatches: { label: string; hex: string }[];
};

const PALETTES: Palette[] = [
  {
    id: 'A',
    name: '月白宋瓷',
    enName: 'Song Porcelain',
    emoji: '❄️',
    desc: '冷调 · 极低饱和 · 像汝窑',
    bullet: '几乎全是高级灰，朱砂哑光不刺眼。',
    swatches: [
      { label: '背景', hex: '#F5F4F1' },
      { label: '卡片', hex: '#FCFCFA' },
      { label: '主文字', hex: '#25272A' },
      { label: '边线', hex: '#DEDDD8' },
      { label: '朱砂', hex: '#9E4942' },
      { label: '辅色', hex: '#7A8088' },
    ],
  },
  {
    id: 'B',
    name: '茶素',
    enName: 'Tea Silk',
    emoji: '🍵',
    desc: '微暖 · 中等低饱和 · 像泡过的茶',
    bullet: '保留古色但去掉所有"脏"的部分（推荐）。',
    swatches: [
      { label: '背景', hex: '#F0EBE0' },
      { label: '卡片', hex: '#F8F4EA' },
      { label: '主文字', hex: '#2A2520' },
      { label: '边线', hex: '#D8CFBE' },
      { label: '朱砂', hex: '#A85742' },
      { label: '茶褐', hex: '#8B7E6D' },
    ],
  },
  {
    id: 'C',
    name: '墨石',
    enName: 'Ink Stone',
    emoji: '🪨',
    desc: '中性 · 黑白灰 · 一点点红',
    bullet: '画廊级简洁，几乎全无装饰。',
    swatches: [
      { label: '背景', hex: '#F0EFEC' },
      { label: '卡片', hex: '#FAFAF8' },
      { label: '主文字', hex: '#1F1F22' },
      { label: '边线', hex: '#E0DFDC' },
      { label: '朱砂', hex: '#944138' },
    ],
  },
];

export default function ReviewPage() {
  return (
    <div className={styles.wrap}>
      <header className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.introEyebrow}>YL · COLOR REVIEW</div>
          <h1 className={styles.introTitle}>
            三种低饱和配色 <span className={styles.introEn}>side by side</span>
          </h1>
          <p className={styles.introText}>
            每张卡片都用各自的配色重做了首页的核心模块——「易」字 + 太极八卦
            + 标语 + 按钮 + 色板。整页只剩下颜色的差别。
          </p>
          <p className={styles.introHint}>
            滚动对比 ↓
          </p>
        </div>
      </header>

      {PALETTES.map((p, i) => (
        <section
          key={p.id}
          className={styles.card}
          data-palette={p.id}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className={styles.cardInner}>
            {/* 顶部 ID + 名称 */}
            <div className={styles.cardHead}>
              <span className={styles.cardId}>选项 {p.id}</span>
              <span className={styles.cardName}>
                {p.name} <span aria-hidden>{p.emoji}</span>
              </span>
              <span className={styles.cardEn}>{p.enName}</span>
            </div>

            <div className={styles.cardDesc}>{p.desc}</div>

            {/* 主体：左 emblem，右 文案 */}
            <div className={styles.body}>
              <div className={styles.emblemCol}>
                <div className={styles.emblemHalo} aria-hidden />
                <TaijiBagua size={300} />
                <div className={styles.emblemCaption}>太极 · 先天八卦</div>
              </div>

              <div className={styles.textCol}>
                <div className={styles.eyebrow}>易 · YiLab</div>
                <div className={styles.mark}>易</div>
                <div className={styles.brand}>YiLab</div>
                <p className={styles.tagline}>一卷可翻阅的易经</p>
                <p className={styles.subtag}>
                  An I Ching, retold for modern readers.
                </p>
                <p className={styles.bullet}>{p.bullet}</p>

                <div className={styles.ctas}>
                  <button type="button" className={`${styles.cta} ${styles.ctaPrimary}`}>
                    翻阅卦象
                  </button>
                  <button type="button" className={styles.cta}>
                    入门导览
                  </button>
                </div>
              </div>
            </div>

            {/* 示例条目 */}
            <ul className={styles.recent}>
              <li>
                <span className={styles.recentSeq}>第 01 卦</span>
                <span className={styles.recentTitle}>乾为天 · 自强不息，藏锋…</span>
                <span className={styles.recentSym}>☰</span>
              </li>
              <li>
                <span className={styles.recentSeq}>第 02 卦</span>
                <span className={styles.recentTitle}>坤为地 · 厚德载物，先迷…</span>
                <span className={styles.recentSym}>☷</span>
              </li>
            </ul>

            {/* 色板 */}
            <div className={styles.swatches}>
              {p.swatches.map((s) => (
                <div key={s.hex} className={styles.swatch}>
                  <span
                    className={styles.swatchChip}
                    style={{ background: s.hex }}
                    aria-hidden
                  />
                  <span className={styles.swatchMeta}>
                    <span className={styles.swatchLabel}>{s.label}</span>
                    <span className={styles.swatchHex}>{s.hex}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <footer className={styles.outro}>
        <p className={styles.outroText}>
          选好之后告诉我 <strong>A / B / C</strong>，我会把它套用到全局样式上。
        </p>
        <p className={styles.outroHint}>
          也可以说 "B + 把朱砂再降一点" 之类的微调。
        </p>
        <Link href="/" className={styles.outroBack}>← 回到现版本</Link>
      </footer>
    </div>
  );
}
