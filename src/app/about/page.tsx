import styles from './page.module.css';

export const metadata = {
  title: '关于',
  description: '关于 YiLab 与项目主理人',
};

const PRINCIPLES = [
  {
    title: '只做义理，不做术数',
    body: '不算婚姻、不算疾病、不算生死。易经在这里是<strong>决策与思考的框架</strong>，不是预测的术。',
  },
  {
    title: '渐进发布，公开学习',
    body: 'v1 上线时只完整写了 8 卦的现代解读，剩下 56 卦逐周更新。这不是缺陷，是<strong>"和读者一起学"的承诺</strong>。',
  },
  {
    title: '一个产品人在读',
    body: '所有解读都会带"决策检查点 + 现代场景类比"。乾卦六爻怎么对应一个项目的 0→1，是这里专门要讲的事。',
  },
  {
    title: '永远开源思维',
    body: '内容会沉淀在公开页面、可复制可引用。不在微信群里。',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={`${styles.label} eyebrow`}>About · 关于</div>
        <h1 className={styles.title}>YiLab 是什么</h1>

        <div className={styles.body}>
          <p>
            YiLab 是一个<em>产品人/科技人解构易经</em>的可交互式学习站。
          </p>
          <p>
            "易"的本意是<em>变化</em>——不是预测未来，是
            <em>在不确定中保持清醒和柔韧</em>。"Lab" 不是说我是大师，
            是说这是一个公开的实验室——你能看到我学到哪、卡在哪、想到什么。
          </p>
          <p>
            64 卦在我看来是 64 种"系统状态"的原型：每一卦的 6 爻是状态内部的 6 个动力位置；
            卦的"变爻"是状态转移函数。这听起来玄，但任何做过产品/系统/复杂决策的人都会会心一笑——
            易经其实是中国人三千年前发明的一套<em>面向不确定性的"系统状态描述语言"</em>。
          </p>
          <p>这里要做的，是把这套语言翻译给现代人听。</p>
        </div>

        <section className={styles.section}>
          <div className={`${styles.sectionLabel} eyebrow`}>Principles · 几条原则</div>
          <h2 className={styles.h2}>这个项目怎么做事</h2>
          <ol className={styles.principles}>
            {PRINCIPLES.map((p, i) => (
              <li key={i} className={styles.principle}>
                <span className={styles.principleNum}>0{i + 1}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-title), serif', fontWeight: 600, marginBottom: 4 }}>
                    {p.title}
                  </div>
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
          <div className={`${styles.sectionLabel} eyebrow`}>Stack · 技术声明</div>
          <h2 className={styles.h2}>这个站是怎么做的</h2>
          <div className={styles.body}>
            <p>
              Next.js 16 + React 19 + TypeScript，纯静态导出，部署在 Cloudflare Pages。
              字体使用 Noto Serif SC + Playfair Display + JetBrains Mono。视觉风格叫「数字宋本」。
            </p>
            <p>
              源码与设计文档（包括 6 个月学习计划）会逐步开放。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
