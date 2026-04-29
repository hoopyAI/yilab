import type { Hexagram } from '@/types/hexagram';

type Props = {
  hexagram: Hexagram;
  size?: number;
  /** 线条粗细。默认按 size 推算（约 1/30，最少 4px）*/
  stroke?: number;
  /** 线条占容器宽度的比例 */
  lengthRatio?: number;
  /** 阴爻中央缺口占线条长度的比例 */
  yinGapRatio?: number;
  /** 上下空白边距占容器高度的比例 */
  vPadRatio?: number;
  /** 是否使用墨色渐变（深→浅，模仿毛笔吸墨）*/
  inkGradient?: boolean;
  ariaHidden?: boolean;
};

/**
 * 六爻符号 — 自下而上 6 条线
 * v3：圆润笔触 + 墨色渐变 + 笔锋两端
 */
export default function HexagramSymbol({
  hexagram,
  size = 240,
  stroke,
  lengthRatio = 0.84,
  yinGapRatio = 0.14,
  vPadRatio = 0.08,
  inkGradient = true,
  ariaHidden = false,
}: Props) {
  const w = size;
  const h = size;
  const s = stroke ?? Math.max(4, size / 30);

  const vPad = size * vPadRatio;
  const usableH = size - 2 * vPad;
  const lineSpacing = (usableH - s) / 5;

  const lineLen = size * lengthRatio;
  const xMargin = (size - lineLen) / 2;
  const yinGap = lineLen * yinGapRatio;
  const segLen = (lineLen - yinGap) / 2;

  // 唯一 id 防重复
  const gradId = `ylInk-${hexagram.id}`;
  const filterId = `ylSoftEdge-${hexagram.id}`;
  const strokeColor = inkGradient ? `url(#${gradId})` : 'var(--fg)';

  // SVG 自上而下绘制；binary 是自下而上的，所以反向
  const linesTopDown = hexagram.binary.split('').reverse();

  return (
    <svg
      className="hexagram-svg"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-label={ariaHidden ? undefined : `${hexagram.name}卦`}
      aria-hidden={ariaHidden}
      role={ariaHidden ? 'presentation' : 'img'}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          {/* 上深下淡，模仿毛笔起笔→收笔的吸墨变化 */}
          <stop offset="0%" stopColor="#1A130F" />
          <stop offset="60%" stopColor="#2A1F18" />
          <stop offset="100%" stopColor="#3D2D22" />
        </linearGradient>
        {/* 极细的笔触柔化 */}
        <filter id={filterId} x="-2%" y="-10%" width="104%" height="120%">
          <feGaussianBlur stdDeviation="0.35" />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        {linesTopDown.map((bit, i) => {
          const y = vPad + s / 2 + i * lineSpacing;
          if (bit === '1') {
            return (
              <line
                key={i}
                x1={xMargin}
                x2={xMargin + lineLen}
                y1={y}
                y2={y}
                stroke={strokeColor}
                strokeWidth={s}
                strokeLinecap="round"
              />
            );
          }
          return (
            <g key={i}>
              <line
                x1={xMargin + s * 0.05}
                x2={xMargin + segLen}
                y1={y}
                y2={y}
                stroke={strokeColor}
                strokeWidth={s}
                strokeLinecap="round"
              />
              <line
                x1={xMargin + segLen + yinGap}
                x2={xMargin + lineLen - s * 0.05}
                y1={y}
                y2={y}
                stroke={strokeColor}
                strokeWidth={s}
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
