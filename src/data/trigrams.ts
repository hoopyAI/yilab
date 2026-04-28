import type { Trigram, TrigramId } from '@/types/hexagram';

export const TRIGRAMS: Record<TrigramId, Trigram> = {
  qian: { id: 'qian', name: '乾', pinyin: 'qián', symbol: '☰', binary: '111', nature: '天' },
  dui:  { id: 'dui',  name: '兑', pinyin: 'duì',  symbol: '☱', binary: '110', nature: '泽' },
  li:   { id: 'li',   name: '离', pinyin: 'lí',   symbol: '☲', binary: '101', nature: '火' },
  zhen: { id: 'zhen', name: '震', pinyin: 'zhèn', symbol: '☳', binary: '100', nature: '雷' },
  xun:  { id: 'xun',  name: '巽', pinyin: 'xùn',  symbol: '☴', binary: '011', nature: '风' },
  kan:  { id: 'kan',  name: '坎', pinyin: 'kǎn',  symbol: '☵', binary: '010', nature: '水' },
  gen:  { id: 'gen',  name: '艮', pinyin: 'gèn',  symbol: '☶', binary: '001', nature: '山' },
  kun:  { id: 'kun',  name: '坤', pinyin: 'kūn',  symbol: '☷', binary: '000', nature: '地' },
};

export const TRIGRAM_LIST: Trigram[] = Object.values(TRIGRAMS);

export function trigramByBinary(binary: string): TrigramId {
  const found = TRIGRAM_LIST.find((t) => t.binary === binary);
  if (!found) throw new Error(`Invalid trigram binary: ${binary}`);
  return found.id;
}
