import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  LEARN_ARTICLES,
  getArticle,
  getArticleNeighbors,
  type Section,
} from '@/data/learn-articles';
import styles from './page.module.css';

type Params = { slug: string };

export function generateStaticParams() {
  return LEARN_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: '未找到' };
  return {
    title: a.title,
    description: a.summary,
  };
}

/** 把 **粗体** 转成 <strong>，其余原样输出 */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/);
    if (m) return <strong key={i}>{m[1]}</strong>;
    return <span key={i}>{part}</span>;
  });
}

function SectionView({ section, index }: { section: Section; index: number }) {
  switch (section.type) {
    case 'h2':
      return <h2 className={styles.h2}>{section.text}</h2>;

    case 'p':
      return <p className={styles.p}>{renderInline(section.text)}</p>;

    case 'list':
      return (
        <ul className={styles.list}>
          {section.items.map((item, i) => (
            <li key={i} className={styles.listItem}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );

    case 'quote':
      return (
        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>{renderInline(section.text)}</p>
          {section.cite && (
            <footer className={styles.quoteCite}>—— {section.cite}</footer>
          )}
        </blockquote>
      );

    case 'table':
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {section.header.map((h, i) => (
                  <th key={i}>{renderInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'callout':
      return (
        <aside className={styles.callout}>
          <span className={styles.calloutMark} aria-hidden>※</span>
          <p>{renderInline(section.text)}</p>
        </aside>
      );

    default: {
      const _exhaustive: never = section;
      return null;
    }
  }
}

export default async function LearnArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { prev, next } = getArticleNeighbors(slug);
  const orderStr = String(article.order).padStart(2, '0');

  return (
    <article className={styles.page}>
      <div className={styles.crumb}>
        <Link href="/learn/">← 返回入门导览</Link>
        <span>{orderStr} / 06 · {article.readingMin} 分钟</span>
      </div>

      <header className={styles.header}>
        <div className={`${styles.eyebrow} eyebrow`}>
          第 {orderStr} 篇 · {article.titleEn}
        </div>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.summary}>{article.summary}</p>
      </header>

      <div className={styles.divider}>
        <span aria-hidden>❦</span>
      </div>

      <div className={styles.body}>
        {article.body.map((section, i) => (
          <SectionView key={i} section={section} index={i} />
        ))}
      </div>

      <nav className={styles.bottomNav}>
        <div className={styles.navCell}>
          {prev && (
            <Link href={`/learn/${prev.slug}/`} className={styles.navLink}>
              <span className={styles.navDir}>← 上一篇</span>
              <span className={styles.navTitle}>{prev.title}</span>
            </Link>
          )}
        </div>
        <div className={styles.navCell + ' ' + styles.navCellRight}>
          {next ? (
            <Link href={`/learn/${next.slug}/`} className={styles.navLink}>
              <span className={styles.navDir}>下一篇 →</span>
              <span className={styles.navTitle}>{next.title}</span>
            </Link>
          ) : (
            <Link href="/gua/" className={styles.navLink}>
              <span className={styles.navDir}>翻阅卦象 →</span>
              <span className={styles.navTitle}>开始读 64 卦</span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
