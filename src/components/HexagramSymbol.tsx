import type { Hexagram } from '@/types/hexagram';

type Props = {
  hexagram: Hexagram;
  size?: number;
  stroke?: number;
  color?: string;
  ariaHidden?: boolean;
};

/**
 * 六爻符号 SVG —— 自下而上 6 条线
 * 阳爻：一条连续粗线
 * 阴爻：两段中间有缺口
 */
export default function HexagramSymbol({
  hexagram,
  size = 64,
  stroke = 6,
  color = 'var(--fg)',
  ariaHidden = false,
}: Props) {
  const width = size;
  const height = size;
  const lineSpacing = (size - stroke) / 5; // 6 lines, 5 gaps
  const lineLength = size * 0.85;
  const margin = (size - lineLength) / 2;
  const yinGap = lineLength * 0.18;

  // binary: bottom-to-top, but we draw top first
  const lines = hexagram.binary.split('').reverse(); // index 0 = top line (line 6)

  return (
    <svg
      className="hexagram-svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-label={ariaHidden ? undefined : `${hexagram.name}卦`}
      aria-hidden={ariaHidden}
      role={ariaHidden ? 'presentation' : 'img'}
    >
      {lines.map((bit, i) => {
        const y = stroke / 2 + i * lineSpacing;
        if (bit === '1') {
          return (
            <line
              key={i}
              x1={margin}
              x2={margin + lineLength}
              y1={y}
              y2={y}
              stroke={color}
              strokeWidth={stroke}
              strokeLinecap="square"
            />
          );
        }
        // yin: two segments
        const segLen = (lineLength - yinGap) / 2;
        return (
          <g key={i}>
            <line
              x1={margin}
              x2={margin + segLen}
              y1={y}
              y2={y}
              stroke={color}
              strokeWidth={stroke}
              strokeLinecap="square"
            />
            <line
              x1={margin + segLen + yinGap}
              x2={margin + lineLength}
              y1={y}
              y2={y}
              stroke={color}
              strokeWidth={stroke}
              strokeLinecap="square"
            />
          </g>
        );
      })}
    </svg>
  );
}
