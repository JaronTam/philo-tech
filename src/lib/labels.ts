// 枚举显示名（详情框 / edge tooltip 共用）
import { LANES } from './layout';
import type { Layer, Relation } from './types';

export function layerLabel(l: Layer): string {
  if (l === 'PRE_theory') return '前史'; // 哨兵层不代表泳道（ui-spec §4）
  return LANES.find((x) => x.layer === l)?.title ?? l;
}

export const RELATION_LABEL: Record<Relation, string> = {
  enables: '使能',
  direct_fork: '直接分支',
  conceptual_inf: '概念影响',
  paradigm_shift: '范式转移',
  convergence: '收敛',
  composition: '组合',
};

/** citation 形如「一句话依据 … 来源：https://…」；拆出尾 URL 供 tooltip / 详情框渲染可点击链接 */
export function splitCitation(citation: string): { text: string; url: string | null } {
  const m = citation.match(/https?:\/\/[^\s，。；）)]+/);
  if (!m || m.index === undefined) return { text: citation, url: null };
  // 去掉 URL 前的引导词与悬空标点（「…。来源：<url>」→「…」）
  const text = citation.slice(0, m.index).replace(/(?:来源[：:]?|[：:，,、;；\s])+$/, '');
  return { text, url: m[0] };
}
