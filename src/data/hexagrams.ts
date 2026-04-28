import type { Hexagram, LineModern, TrigramId } from '@/types/hexagram';
import { trigramByBinary } from '@/data/trigrams';

/**
 * 64 卦元数据（King Wen sequence）
 * 顺序：[名, 拼音, 二进制（自下而上 6 位）]
 */
const META: Array<[string, string, string]> = [
  ['乾', 'qián', '111111'],
  ['坤', 'kūn', '000000'],
  ['屯', 'zhūn', '100010'],
  ['蒙', 'méng', '010001'],
  ['需', 'xū', '111010'],
  ['讼', 'sòng', '010111'],
  ['师', 'shī', '010000'],
  ['比', 'bǐ', '000010'],
  ['小畜', 'xiǎo xù', '111011'],
  ['履', 'lǚ', '110111'],
  ['泰', 'tài', '111000'],
  ['否', 'pǐ', '000111'],
  ['同人', 'tóng rén', '101111'],
  ['大有', 'dà yǒu', '111101'],
  ['谦', 'qiān', '001000'],
  ['豫', 'yù', '000100'],
  ['随', 'suí', '100110'],
  ['蛊', 'gǔ', '011001'],
  ['临', 'lín', '110000'],
  ['观', 'guān', '000011'],
  ['噬嗑', 'shì kè', '100101'],
  ['贲', 'bì', '101001'],
  ['剥', 'bō', '000001'],
  ['复', 'fù', '100000'],
  ['无妄', 'wú wàng', '100111'],
  ['大畜', 'dà xù', '111001'],
  ['颐', 'yí', '100001'],
  ['大过', 'dà guò', '011110'],
  ['坎', 'kǎn', '010010'],
  ['离', 'lí', '101101'],
  ['咸', 'xián', '001110'],
  ['恒', 'héng', '011100'],
  ['遁', 'dùn', '001111'],
  ['大壮', 'dà zhuàng', '111100'],
  ['晋', 'jìn', '000101'],
  ['明夷', 'míng yí', '101000'],
  ['家人', 'jiā rén', '101011'],
  ['睽', 'kuí', '110101'],
  ['蹇', 'jiǎn', '001010'],
  ['解', 'xiè', '010100'],
  ['损', 'sǔn', '110001'],
  ['益', 'yì', '100011'],
  ['夬', 'guài', '111110'],
  ['姤', 'gòu', '011111'],
  ['萃', 'cuì', '000110'],
  ['升', 'shēng', '011000'],
  ['困', 'kùn', '010110'],
  ['井', 'jǐng', '011010'],
  ['革', 'gé', '101110'],
  ['鼎', 'dǐng', '011101'],
  ['震', 'zhèn', '100100'],
  ['艮', 'gèn', '001001'],
  ['渐', 'jiàn', '001011'],
  ['归妹', 'guī mèi', '110100'],
  ['丰', 'fēng', '101100'],
  ['旅', 'lǚ', '001101'],
  ['巽', 'xùn', '011011'],
  ['兑', 'duì', '110110'],
  ['涣', 'huàn', '010011'],
  ['节', 'jié', '110010'],
  ['中孚', 'zhōng fú', '110011'],
  ['小过', 'xiǎo guò', '001100'],
  ['既济', 'jì jì', '101010'],
  ['未济', 'wèi jì', '010101'],
];

/** 古文与现代解读（仅写完的 8 卦放完整内容；其它显示「整理中」） */
type RichContent = {
  judgment: string;
  image: string;
  lines: Array<{ text: string }>;
  judgmentModern?: string;
  imageModern?: string;
  decisionFramework?: {
    checkpoints: string[];
    scenario: string;
  };
};

const RICH: Record<number, RichContent> = {
  1: {
    judgment: '元，亨，利，贞。',
    image: '天行健，君子以自强不息。',
    lines: [
      { text: '初九：潜龙勿用。' },
      { text: '九二：见龙在田，利见大人。' },
      { text: '九三：君子终日乾乾，夕惕若厉，无咎。' },
      { text: '九四：或跃在渊，无咎。' },
      { text: '九五：飞龙在天，利见大人。' },
      { text: '上九：亢龙有悔。' },
    ],
    judgmentModern:
      '乾是六爻全阳，象征纯粹的"创造之力"。卦辞四个字——元、亨、利、贞——是事物从生发到成熟的完整周期：起始、通达、合宜、坚守。它不是承诺一切顺利，而是说"在创造的过程中守住这四个节奏"。',
    imageModern:
      '天体运行刚健不息——这不是关于"努力"的鸡汤，而是关于"节律"的物理观察。健的反面不是懒，是失去节律。自强不息的真意，是不被外界打乱自己的内在节奏。',
    decisionFramework: {
      checkpoints: [
        '**时位**：你此刻在哪一爻？潜（隐伏期）／见（初现期）／惕（试探期）／跃（突破期）／飞（当道期）／亢（过盛期）。读卦先读时，错位的好事也成坏事。',
        '**应位**：眼下有没有合适的"呼应"——同行的人、可借的势、对的时机？乾卦六爻无阴爻之配，因此格外强调"独立判断、不必等呼应"。',
        '**进退**：进、退、守，哪一种最配当下的时位？亢龙之悔不是飞错了，而是没在该退时退。',
      ],
      scenario:
        '把乾卦六爻铺在自己的人生里看，每一阶段都对得上：刚起念时是潜龙，不必急着对外说；事情初成时是见龙，开始有人看见你；一路走到事忙时是惕龙，每日战战兢兢；想要再上一层时是跃龙，在崖边权衡一跃；功成时是飞龙，处于当道之位；而最难读的，是亢龙——已飞在天，最该做的不是再飞高一点，而是为下一次潜龙做准备。',
    },
  },
  2: {
    judgment: '元，亨，利牝马之贞。君子有攸往，先迷后得主，利。西南得朋，东北丧朋。安贞，吉。',
    image: '地势坤，君子以厚德载物。',
    lines: [
      { text: '初六：履霜，坚冰至。' },
      { text: '六二：直，方，大，不习无不利。' },
      { text: '六三：含章可贞。或从王事，无成有终。' },
      { text: '六四：括囊，无咎，无誉。' },
      { text: '六五：黄裳，元吉。' },
      { text: '上六：龙战于野，其血玄黄。' },
    ],
    judgmentModern:
      '坤是六爻全阴，象征纯粹的"承载之力"。卦辞用"牝马"作比——母马的德行是顺、贞、能远行。"先迷后得主"是坤卦最深的话：当你跑在前面试图引领，反而会迷路；当你顺势承接，反而能找到方向。',
  },
  3: {
    judgment: '元，亨，利，贞。勿用有攸往，利建侯。',
    image: '云雷，屯。君子以经纶。',
    lines: [
      { text: '初九：磐桓，利居贞，利建侯。' },
      { text: '六二：屯如邅如，乘马班如，匪寇婚媾。女子贞不字，十年乃字。' },
      { text: '六三：即鹿无虞，惟入于林中。君子几不如舍，往吝。' },
      { text: '六四：乘马班如，求婚媾。往吉，无不利。' },
      { text: '九五：屯其膏，小贞吉，大贞凶。' },
      { text: '上六：乘马班如，泣血涟如。' },
    ],
  },
  4: {
    judgment: '亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。',
    image: '山下出泉，蒙。君子以果行育德。',
    lines: [],
  },
  5: {
    judgment: '有孚，光亨，贞吉。利涉大川。',
    image: '云上于天，需。君子以饮食宴乐。',
    lines: [],
  },
  6: {
    judgment: '有孚，窒。惕中吉。终凶。利见大人，不利涉大川。',
    image: '天与水违行，讼。君子以作事谋始。',
    lines: [],
  },
  7: {
    judgment: '贞，丈人，吉无咎。',
    image: '地中有水，师。君子以容民畜众。',
    lines: [],
  },
  8: {
    judgment: '吉。原筮，元永贞，无咎。不宁方来，后夫凶。',
    image: '地上有水，比。先王以建万国，亲诸侯。',
    lines: [],
  },
};

// ===== 计算关联卦 =====

function reverseBinary(b: string): string {
  return b.split('').reverse().join('');
}
function flipBinary(b: string): string {
  return b
    .split('')
    .map((c) => (c === '1' ? '0' : '1'))
    .join('');
}
function nuclearBinary(b: string): string {
  // 互卦：原卦的 2,3,4 爻作下卦；3,4,5 爻作上卦
  // 原卦 b = b1 b2 b3 b4 b5 b6（自下而上）
  // 互卦下卦 = b2 b3 b4；互卦上卦 = b3 b4 b5
  return b[1] + b[2] + b[3] + b[2] + b[3] + b[4];
}

const BINARY_TO_ID: Map<string, number> = new Map(
  META.map(([, , bin], i) => [bin, i + 1])
);

function idForBinary(bin: string): number {
  const id = BINARY_TO_ID.get(bin);
  if (!id) throw new Error(`Unknown hexagram binary: ${bin}`);
  return id;
}

// ===== 组装最终数据 =====

const POSITION_LABELS_YANG = ['初九', '九二', '九三', '九四', '九五', '上九'];
const POSITION_LABELS_YIN = ['初六', '六二', '六三', '六四', '六五', '上六'];

function buildHexagram(idx: number): Hexagram {
  const id = idx + 1;
  const [name, pinyin, binary] = META[idx];
  const lower: TrigramId = trigramByBinary(binary.slice(0, 3));
  const upper: TrigramId = trigramByBinary(binary.slice(3, 6));
  const unicode = String.fromCodePoint(0x4dc0 + idx);

  const rich = RICH[id];
  const lines: LineModern[] = [];
  for (let i = 0; i < 6; i++) {
    const yinyang: 'yin' | 'yang' = binary[i] === '1' ? 'yang' : 'yin';
    const positionLabel =
      yinyang === 'yang' ? POSITION_LABELS_YANG[i] : POSITION_LABELS_YIN[i];
    const text = rich?.lines[i]?.text ?? '';
    lines.push({
      position: (i + 1) as 1 | 2 | 3 | 4 | 5 | 6,
      yinyang,
      positionLabel,
      text,
    });
  }

  return {
    id,
    name,
    pinyin,
    unicode,
    binary,
    trigrams: { upper, lower },
    judgment: rich?.judgment ?? '',
    image: rich?.image ?? '',
    lines,
    judgmentModern: rich?.judgmentModern,
    imageModern: rich?.imageModern,
    decisionFramework: rich?.decisionFramework,
    related: {
      inverse: idForBinary(reverseBinary(binary)),
      opposite: idForBinary(flipBinary(binary)),
      nuclear: idForBinary(nuclearBinary(binary)),
    },
  };
}

export const HEXAGRAMS: Hexagram[] = META.map((_, i) => buildHexagram(i));

export function getHexagram(id: number): Hexagram | undefined {
  return HEXAGRAMS[id - 1];
}

export function hasModernContent(h: Hexagram): boolean {
  return Boolean(h.judgmentModern);
}
