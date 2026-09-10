type Props = {
  size?: number;
  /** 是否显示外圈八卦 */
  withBagua?: boolean;
  ariaLabel?: string;
};

/**
 * 太极 + 先天八卦图
 *
 * 颜色全部走 CSS 变量，可在父级覆盖：
 *   --tj-yang   阳鱼底色（浅）
 *   --tj-yin    阴鱼底色（深）
 *   --tj-eye-y  阳眼颜色（一般 = yin）
 *   --tj-eye-n  阴眼颜色（一般 = yang）
 *   --tj-stroke 外圈描边
 *   --tj-trigram 八卦字符颜色
 *   --tj-ring   八卦细圈颜色
 *
 * 八卦排布（先天八卦 / 伏羲八卦）：
 *   12 点 乾 ☰ · 1:30 兑 ☱ · 3 点 离 ☲ · 4:30 震 ☳
 *   6  点 坤 ☷ · 7:30 艮 ☶ · 9 点 坎 ☵ · 10:30 巽 ☴
 */
export default function TaijiBagua({
  size = 280,
  withBagua = true,
  ariaLabel = '太极八卦图',
}: Props) {
  const VB = 200;
  const taijiR = 56;
  const baguaR = 86;
  const trigramR = 92;

  const trigrams = [
    { sym: '☰', name: '乾', angle: 0 },     // 上
    { sym: '☱', name: '兑', angle: 45 },    // 右上
    { sym: '☲', name: '离', angle: 90 },    // 右
    { sym: '☳', name: '震', angle: 135 },   // 右下
    { sym: '☷', name: '坤', angle: 180 },   // 下
    { sym: '☶', name: '艮', angle: 225 },   // 左下
    { sym: '☵', name: '坎', angle: 270 },   // 左
    { sym: '☴', name: '巽', angle: 315 },   // 左上
  ];

  // angle: 0 上方, 顺时针；返回 (x,y)，圆心 (0,0)
  const polar = (r: number, deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180; // -90 让 0 度指向上方
    return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`-${VB / 2} -${VB / 2} ${VB} ${VB}`}
      role="img"
      aria-label={ariaLabel}
      style={{ overflow: 'visible' }}
    >
      {withBagua && (
        <>
          {/* 八卦背景圈（极淡） */}
          <circle
            cx="0"
            cy="0"
            r={baguaR}
            fill="none"
            stroke="var(--tj-ring, currentColor)"
            strokeWidth="0.4"
            opacity="0.45"
          />
          {/* 八个卦象 */}
          {trigrams.map((t) => {
            const { x, y } = polar(trigramR, t.angle);
            return (
              <text
                key={t.name}
                x={x}
                y={y}
                fontSize="14"
                fontFamily="var(--serif-cn, serif)"
                fill="var(--tj-trigram, currentColor)"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ letterSpacing: 0 }}
              >
                {t.sym}
              </text>
            );
          })}
        </>
      )}

      {/* === 太极 === */}
      {/* 外圈：阳底 */}
      <circle
        cx="0"
        cy="0"
        r={taijiR}
        fill="var(--tj-yang, #F5F4F1)"
        stroke="var(--tj-stroke, currentColor)"
        strokeWidth="0.8"
      />
      {/*
        阴鱼路径：从顶部 (0,-R) 沿大圆到底部 (0,R)，
        再沿两个半径为 R/2 的小圆回到顶部，
        形成经典 S 曲线。
      */}
      <path
        d={[
          `M 0 ${-taijiR}`,
          `A ${taijiR} ${taijiR} 0 0 1 0 ${taijiR}`,
          `A ${taijiR / 2} ${taijiR / 2} 0 0 1 0 0`,
          `A ${taijiR / 2} ${taijiR / 2} 0 0 0 0 ${-taijiR}`,
          `Z`,
        ].join(' ')}
        fill="var(--tj-yin, #25272A)"
      />
      {/* 阳眼（在阴鱼里的小白点） */}
      <circle
        cx="0"
        cy={taijiR / 2}
        r={taijiR / 8}
        fill="var(--tj-eye-n, var(--tj-yang, #F5F4F1))"
      />
      {/* 阴眼（在阳鱼里的小黑点） */}
      <circle
        cx="0"
        cy={-taijiR / 2}
        r={taijiR / 8}
        fill="var(--tj-eye-y, var(--tj-yin, #25272A))"
      />
    </svg>
  );
}
