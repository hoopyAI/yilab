export type TrigramId = 'qian' | 'kun' | 'zhen' | 'gen' | 'kan' | 'li' | 'xun' | 'dui';

export type Trigram = {
  id: TrigramId;
  name: string;       // 乾、坤、震、艮、坎、离、巽、兑
  pinyin: string;
  symbol: string;     // ☰ ☷ ☳ ☶ ☵ ☲ ☴ ☱
  binary: string;     // 3-char string, bottom-to-top
  nature: string;     // 天、地、雷、山、水、火、风、泽
};

export type Yin = 0;
export type Yang = 1;

export type LineModern = {
  position: 1 | 2 | 3 | 4 | 5 | 6;
  yinyang: 'yin' | 'yang';
  positionLabel: string;  // 初九、九二、…、上六
  text: string;           // 爻辞原文
  modern?: string;        // 现代解读
};

export type Hexagram = {
  id: number;          // 1-64 (King Wen sequence)
  name: string;        // 乾、坤、…
  pinyin: string;
  unicode: string;     // ䷀ ䷁ … (computed from id)
  binary: string;      // 6-char string, bottom-to-top
  trigrams: {
    upper: TrigramId;
    lower: TrigramId;
  };

  // Classical text (always present)
  judgment: string;    // 卦辞
  image: string;       // 大象传
  lines: LineModern[]; // 6 entries

  // Modern interpretation (may be partial)
  judgmentModern?: string;
  imageModern?: string;
  decisionFramework?: {
    checkpoints: Array<
      | string
      | { label: string; hint?: string; body: string }
    >;
    scenario: string;
  };

  // Computed relations
  related: {
    inverse: number;   // 综卦 (上下颠倒)
    opposite: number;  // 错卦 (阴阳全变)
    nuclear: number;   // 互卦 (中间四爻)
  };
};
