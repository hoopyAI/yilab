import type { Hexagram } from '@/types/hexagram';

type Props = {
  hexagram: Hexagram;
  size?: number;
  /** 线条粗细。默认按 size 推算（约 1/40，最少 2.5px） */
  stroke?: number;
  /** 线条占容器宽度的比例。0.86 = 古典书页常见比例 */
  lengthRatio?: number;
  /** 阴爻中央缺口占线条长度的比例 */
  yinGapRatio?: number;
  /** 上下空白边距占容器高度的比例 */
  vPadRatio?: number;
  color?: string;
  ariaHidden?: boolean;
};

/**
 * 六爻符号 — 自下而上 6 条线
 * 阳爻：连续粗线
 * 阴爻：两段中间断开
 *
 * 默认比例为古书风格：线长适中、留白足、缺口紧凑
 */
export default function HexagramSymbol({
  hexagram,
  size = 240,
  stroke,
  lengthRatio = 0.86,
  yinGapRatio = 0.13,
  vPadRatio = 0.08,
  color = 'var(--fg)',
  ariaHidden = false,
}: Props) {
  const w = size;
  const h = size;
  const s = stroke ?? Math.max(2.5, size / 40);

  // 上下留白：让卦象在框内"居中悬浮"，不顶满
  const vPad = size * vPadRatio;
  const usableH = size - 2 * vPad;
  // 6 条线的中线之间均分
  const lineSpacing = (usableH - s) / 5;

  const lineLen = size * lengthRatio;
  const xMargin = (size - lineLen) / 2;
  const yinGap = lineLen * yinGapRatio;
  const segLen = (lineLen - yinGap) / 2;

  // binary 是自下而上读，但 SVG 上方坐标小，所以反向画
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
              stroke={color}
              strokeWidth={s}
              strokeLinecap="butt"
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
              stroke={color}
              strokeWidth={s}
              strokeLinecap="butt"
            />
            <line
              x1={xMargin + segLen + yinGap}
              x2={xMargin + lineLen}
              y1={y}
              y2={y}
              stroke={color}
              strokeWidth={s}
              strokeLinecap="butt"
            />
          </g>
        );
      })}
    </svg>
  );
}
