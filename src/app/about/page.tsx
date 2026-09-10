import styles from './page.module.css';

export const metadata = {
  title: '关于',
  description: '关于 YiLab 与这份易经笔记的来由',
};

const PRINCIPLES = [
  {
    title: '只读义理，不演术数',
    body: '不算婚姻、不算疾病、不算生死。易经在这里是<strong>思考与决策的框架</strong>，不是预测的术。',
  },
  {
    title: '渐进发布，公开共读',
    body: '初版只完整写了 8 卦的现代解读，剩下的逐周更新。这不是缺陷，是<strong>"和读者一起读下去"的承诺</strong>。',
  },
  {
    title: '以今释古',
    body: '每一卦都附"今释"——三千年前的话，用今天能听懂的语言重讲一遍；附以现代场景，看古人智慧落到哪里。',
  },
  {
    title: '一份开放的笔记',
    body: '内容沉淀在公开页面，可复制可引用。不在微信群里，不上抖音直播。慢一些，但留得住。',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={`${styles.label} eyebrow`}>About · 关于</div>
        <h1 className={styles.title}>YiLab 是什么</h1>
        <p className={styles.subtitle}>An I Ching, unhurried.</p>

        <div className={styles.body}>
          <p>
            YiLab 是一份认真重读易经的笔记。
          </p>
          <p>
            "易"的本意是<em>变化</em>——不是预测未来，是
            <em>在不确定中保持清醒与柔韧</em>。
            "Lab" 不是大师的实验台，是一间公开的书房——
            你能看到我学到哪、卡在哪、想到什么。
          </p>
          <p>
            这里把六十四卦当成<em>现代人的决策框架</em>来读，
            不走玄学一路。每一卦都附"今释"——
            把古文中那些容易被错读的"吉""凶""利""贞"等字眼，
            翻成现代人能落地的意思；再配一段现代场景，
            看三千年前的智慧能否照见今天的处境。
          </p>
          <p>
            不疾不徐，逐卦更新。一卷读完，是给自己一笔耐心。
          </p>
        </div>

        <section className={styles.section}>
          <div className={`${styles.sectionLabel} eyebrow`}>四条原则</div>
          <h2 className={styles.h2}>这份笔记怎么写</h2>
          <ol className={styles.principles}>
            {PRINCIPLES.map((p, i) => (
              <li key={i} className={styles.principle}>
                <span className={styles.principleNum}>0{i + 1}</span>
                <div>
                  <div className={styles.principleHead}>{p.title}</div>
                  <p
                    className={styles.principleText}
                    dangerouslySetInnerHTML={{ __html: p.body }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.author}>
          <div className={`${styles.sectionLabel} eyebrow`}>笔者 · By</div>
          <a
            className={styles.authorCard}
            href="https://hoopyai.space"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="访问作者主页 hoopyai.space"
          >
            <span className={styles.authorAvatarFrame}>
              <img
                className={styles.authorAvatar}
                src="/images/avatar.jpg"
                alt="潦草虎皮AI说"
                width={120}
                height={120}
                loading="lazy"
                decoding="async"
              />
            </span>
            <div className={styles.authorMeta}>
              <div className={styles.authorEyebrow}>AI 工程师 · AI 玩家</div>
              <h3 className={styles.authorName}>潦草虎皮AI说</h3>
              <p className={styles.authorBio}>
                白天做 AI Agent 方案，业余用 AI 探索一切有趣的事。
                YiLab 是这位作者把易经放回工作台上的另一只手。
              </p>
              <span className={styles.authorLink}>
                hoopyai.space <span aria-hidden>→</span>
              </span>
            </div>
          </a>
        </section>

      </div>
    </div>
  );
}
