import styles from './page.module.css';

export const metadata = {
  title: '入门教程',
  description: '从零开始的易经入门教程',
};

const CHAPTERS = [
  {
    slug: 'map',
    title: '易经知识地图',
    desc: '一张图看懂易经的整体结构：经、传、象、数、术。',
    status: 'planned' as const,
  },
  {
    slug: 'yinyang',
    title: '阴阳与太极',
    desc: '不是对立，是互含、互生、互转——理解这点，才能读懂易经。',
    status: 'planned' as const,
  },
  {
    slug: 'bagua',
    title: '八卦原理',
    desc: '八种最基本的"系统状态"：天地雷山水火风泽。',
    status: 'planned' as const,
  },
  {
    slug: 'hexagram',
    title: '六十四卦的结构',
    desc: '上卦、下卦、爻位、当位、应位、承乘——读卦的语法。',
    status: 'planned' as const,
  },
  {
    slug: 'ten-wings',
    title: '十翼是什么',
    desc: '孔子整理的十篇解经文献，是易经从占卜术升华为哲学的关键。',
    status: 'planned' as const,
  },
  {
    slug: 'xici',
    title: '系辞传精读',
    desc: '"生生之谓易"、"一阴一阳之谓道"——易经哲学的纲领，整本书最值钱的部分。',
    status: 'planned' as const,
  },
];

export default function LearnPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.label} eyebrow`}>Learn · 从零入门</div>
        <h1 className={styles.title}>入门教程</h1>
        <p className={styles.lead}>
          不是按典籍出版顺序，是按"现代人理解易经最少阻力的路径"来组织——
          先建框架（地图），再讲原理（阴阳/八卦），再读结构（卦的语法），最后进入哲学（十翼/系辞）。
        </p>
        <p className={styles.note}>
          内容正在按 6 个月学习计划同步写。每完成一章会先在小红书发笔记，再回到这里整理。
        </p>
      </header>

      <ol className={styles.list}>
        {CHAPTERS.map((c, i) => (
          <li key={c.slug} className={styles.item}>
            <span className={styles.seq}>0{i + 1}</span>
            <div>
              <div className={styles.itemTitle}>{c.title}</div>
              <p className={styles.itemDesc}>{c.desc}</p>
            </div>
            <span className={styles.status}>计划中</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
