import styles from './page.module.css';

export const metadata = {
  title: '入门导览',
  description: '从零开始的易经入门导览',
};

const CHAPTERS = [
  {
    title: '易经知识地图',
    desc: '一张图看懂易经的整体结构：经、传、象、数、术——先有地图，再走路。',
  },
  {
    title: '阴阳与太极',
    desc: '不是对立，是互含、互生、互转。读懂这一点，才读得动后面的卦。',
  },
  {
    title: '八卦原理',
    desc: '八种最基本的"系统状态"：天、地、雷、山、水、火、风、泽——万象之源。',
  },
  {
    title: '六十四卦的结构',
    desc: '上卦、下卦、爻位、当位、应位、承乘——读卦的语法基础。',
  },
  {
    title: '十翼是什么',
    desc: '孔子整理的十篇解经文献，是易经从占卜术升华为一种世界观的关键。',
  },
  {
    title: '系辞传精读',
    desc: '"生生之谓易"、"一阴一阳之谓道"——易经哲学的纲领，是整本书最值得反复读的部分。',
  },
];

export default function LearnPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.label} eyebrow`}>Learn · 入门导览</div>
        <h1 className={styles.title}>入门导览</h1>
        <div className={styles.titleEn}>A Reader&apos;s Guide</div>
        <p className={styles.lead}>
          不按典籍出版顺序，按"现代人理解易经最少阻力的路径"组织——
          先建框架、再讲原理、再读结构、最后入哲学。
        </p>
        <p className={styles.note}>
          内容随六个月学习计划同步写。每完成一章会先在小红书发笔记，再回到这里整理。
        </p>
      </header>

      <ol className={styles.list}>
        {CHAPTERS.map((c, i) => (
          <li key={c.title} className={styles.item}>
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
