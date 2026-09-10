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
  ariaHidden?: boolean;
};

/**
 * 六爻符号 — 自下而上 6 条线
 *
 * v4 简化版：去掉 gradient + filter，stroke 直接用 currentColor，
 * 元素 color 走 inline style 强制为深墨色。
 */
export default function HexagramSymbol({
  hexagram,
  size = 240,
  stroke,
  lengthRatio = 0.84,
  yinGapRatio = 0.14,
  vPadRatio = 0.08,
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
      style={{ color: '#25272A', display: 'block' }}
    >
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
              stroke="currentColor"
              strokeWidth={s}
              strokeLinecap="round"
            />
          );
        }
        return (
          <g key={i}>
            <line
              x1={xMargin}
              x2={xMargin + segLen}
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeWidth={s}
              strokeLinecap="round"
            />
            <line
              x1={xMargin + segLen + yinGap}
              x2={xMargin + lineLen}
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeWidth={s}
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}
