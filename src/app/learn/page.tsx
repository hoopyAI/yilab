import Link from 'next/link';
import { LEARN_ARTICLES } from '@/data/learn-articles';
import styles from './page.module.css';

export const metadata = {
  title: '入门导览',
  description: '从零开始的易经入门导览',
};

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
          六篇连读，约 45 分钟。读完后再翻 64 卦，路就通了。
        </p>
      </header>

      <ol className={styles.list}>
        {LEARN_ARTICLES.map((a) => (
          <li key={a.slug} className={styles.item}>
            <span className={styles.seq}>0{a.order}</span>
            <Link href={`/learn/${a.slug}/`} className={styles.itemLink}>
              <div className={styles.itemTitle}>
                {a.title}
                <span className={styles.itemTitleEn}>{a.titleEn}</span>
              </div>
              <p className={styles.itemDesc}>{a.summary}</p>
            </Link>
            <span className={styles.status}>{a.readingMin} min</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
