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

        <section className={styles.section}>
          <div className={`${styles.sectionLabel} eyebrow`}>关于这个站</div>
          <h2 className={styles.h2}>它是怎么做出来的</h2>
          <div className={styles.body}>
            <p>
              静态站，纯粹文字与卦象。中文用霞鹜文楷，
              英文用 Cormorant Garamond，编号用 JetBrains Mono——
              三种字体配着，像旧书的"宋字+花体批注+小注"。
            </p>
            <p>
              视觉风格叫「数字宋本」——米纸底、墨色字、朱砂印。
              想做出一种"在屏幕上翻一卷古书"的感觉。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
