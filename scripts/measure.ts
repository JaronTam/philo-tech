// M0 实测（ui-spec §1）：master 候选表 44 条试排 → 同列间距检查 + 段高建议 + 连通性（F-D-4）
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MasterCandidate, MetaFile } from '../src/lib/types';
import {
  AVOID_LIMIT,
  CONCEPTS_RESERVE_PX,
  placeInColumns,
  toPlaceables,
  type LayoutCtx,
  type Violation,
} from '../src/lib/layout';
import { VOLUME_BY_KEY, segmentHeights, type VolumeDef } from '../src/lib/volumes';

const root = join(import.meta.dirname, '..');
const load = <T,>(rel: string): T => JSON.parse(readFileSync(join(root, rel), 'utf8')) as T;

const meta = load<MetaFile>('data/meta.json');
const candidates = load<MasterCandidate[]>('data/master-candidates.json');
const ctx: LayoutCtx = { registry: meta.columns, withTheory: true };

// 前史定稿 13 条（content-spec §4，2026-10-03 裁定）
const PREHISTORY: MasterCandidate[] = [
  { label: '布尔《思维规律研究》', layer: 'L0_hardware', column: 'theory', year: 1854 },
  { label: '罗素《数学原理》', layer: 'L0_hardware', column: 'theory', year: 1910 },
  { label: '哥德尔不完备定理', layer: 'L0_hardware', column: 'theory', year: 1931 },
  { label: '图灵机', layer: 'L0_hardware', column: 'theory', year: 1936 },
  { label: '丘奇 λ 演算', layer: 'L0_hardware', column: 'theory', year: 1936 },
  { label: '香农开关电路论文', layer: 'L0_hardware', column: 'theory', year: 1937 },
  { label: 'McCulloch–Pitts 神经元模型', layer: 'L0_hardware', column: 'theory', year: 1943 },
  { label: 'Hollerith 打孔卡制表机', layer: 'L0_hardware', column: 'device', year: 1890 },
  { label: 'ABC', layer: 'L0_hardware', column: 'device', year: 1942 },
  { label: 'Colossus', layer: 'L0_hardware', column: 'device', year: 1944 },
  { label: 'Harvard Mark I', layer: 'L0_hardware', column: 'device', year: 1944 },
  { label: 'ENIAC', layer: 'L0_hardware', column: 'device', year: 1945 },
  { label: 'EDVAC 报告', layer: 'L0_hardware', column: 'arch', year: 1945 },
];

// 已裁定边骨架（content-spec §3/§4）：仅用于连通性检查，M1 起由 data 提供
const SKELETON: [string, string][] = [
  ['布尔《思维规律研究》', '香农开关电路论文'],
  ['罗素《数学原理》', '哥德尔不完备定理'],
  ['罗素《数学原理》', 'McCulloch–Pitts 神经元模型'],
  ['哥德尔不完备定理', '丘奇 λ 演算'],
  ['丘奇 λ 演算', 'LISP'],
  ['香农开关电路论文', '晶体管'],
  ['图灵机', 'EDVAC 报告'],
  ['ABC', 'ENIAC'],
  ['ENIAC', 'EDVAC 报告'],
  ['EDVAC 报告', 'Manchester Baby'],
  ['Hollerith 打孔卡制表机', 'Harvard Mark I'],
  ['Colossus', 'Manchester Baby'],
];

const fmt = (n: number): string => (Number.isInteger(n) ? `${n}` : n.toFixed(1));

function localDef(def: VolumeDef, start: number, end: number, height: number): VolumeDef {
  return { key: def.key, title: def.title, start, end, height };
}

/** 单段分析：无限下推求「需高」；受限下推（±20px）收集违规 */
function analyze(
  name: string,
  def: VolumeDef,
  items: MasterCandidate[],
  reserve = 0,
): { need: number; limited: Violation[] } {
  const placeables = toPlaceables(items);
  const unlimited = placeInColumns(placeables, def, ctx, 0, Infinity, reserve);
  let need = 0;
  for (const p of unlimited.placed) need = Math.max(need, p.y + p.blockH);
  const limited = placeInColumns(placeables, def, ctx, 0, AVOID_LIMIT, reserve);
  console.log(
    `  ${name}：节点 ${unlimited.placed.length} · 需高 ${fmt(need)} / 现有 ${fmt(def.height)}${need > def.height ? ` → 缺 ${fmt(need - def.height)}` : ' ✓'}`,
  );
  return { need, limited: limited.violations };
}

console.log('=== M0 实测报告（master 候选 44 条 / 前史定稿 13 条）===');
console.log('块高 = 主标折行 × 20px + 灰字（上限 2 行 × 15px + 4px）；「预留」轮 = 所有节点 +34px 灰字两行');
console.log('避让：按年份序单向下推，单节点 ≤ +20px（ui-spec §1）\n');

console.log('[1] 主图 · 逐段分析（段内无限下推求需高；主图改动 = 只加高该段）');
const main = VOLUME_BY_KEY.main;
let totalNeed = 0;
for (const seg of main.segments!) {
  const years = seg.end - seg.start;
  const height = years * seg.pxPerYear;
  const local = localDef(main, seg.start, seg.end, height);
  const items = candidates.filter((c) => c.year >= seg.start && c.year < seg.end);
  const a = analyze(`段 [${seg.start}, ${seg.end}) ${seg.pxPerYear}px/年 高 ${height}`, local, items);
  const b = analyze(`  同上 + 灰字预留`, local, items, CONCEPTS_RESERVE_PX).need;
  totalNeed += Math.max(a.need, b);
  if (a.need > height || b > height) {
    const base = Math.max(a.need, b);
    const newRate = Math.ceil((base / years) * 10) / 10;
    console.log(`    ⇒ 建议：${seg.pxPerYear} → ${newRate}px/年（段高 ${height} → ${fmt(years * newRate)}）`);
  }
  for (const v of a.limited) {
    console.log(
      `    违规 ${v.column}：${v.upper} ↔ ${v.lower} 原始 ${fmt(v.naturalGap)} → 微调后 ${fmt(v.finalGap)} < 需 ${fmt(v.requiredGap)}（缺 ${fmt(v.deficit)}）`,
    );
  }
}
const totalSegHeight = segmentHeights(main);
console.log(
  `  合计需高（各段 max(需, 预留) 之和）≈ ${fmt(totalNeed)} / 现有段高合计 ${fmt(totalSegHeight)}（差 ${fmt(totalNeed - totalSegHeight)}）`,
);

console.log('\n[2] 分卷视图（线性 2000px）');
for (const key of ['pre', 'v1', 'v2', 'v3', 'v4'] as const) {
  const def = VOLUME_BY_KEY[key];
  const items = key === 'pre' ? PREHISTORY : candidates;
  const a = analyze(`${def.title} [${def.start}, ${def.end})`, def, items);
  const b = analyze(`  同上 + 灰字预留`, def, items, CONCEPTS_RESERVE_PX).need;
  if (Math.max(a.need, b) > def.height) {
    console.log(`    ⇒ 建议：H 2000 → ${fmt(Math.ceil(Math.max(a.need, b) / 20) * 20)}px`);
  }
}

console.log('\n=== 连通性（F-D-4）===');
const labeled = [
  ...PREHISTORY,
  ...candidates.filter((c) => ['LISP', '晶体管', 'Manchester Baby'].includes(c.label)),
];
const known = new Set(labeled.map((c) => c.label));
const adj = new Map<string, string[]>();
for (const [a, b] of SKELETON) {
  if (!known.has(a) || !known.has(b)) continue;
  adj.set(a, [...(adj.get(a) ?? []), b]);
  adj.set(b, [...(adj.get(b) ?? []), a]);
}
const seen = new Set<string>();
const components: string[][] = [];
for (const n of known) {
  if (seen.has(n)) continue;
  const stack = [n];
  const comp: string[] = [];
  while (stack.length) {
    const cur = stack.pop()!;
    if (seen.has(cur)) continue;
    seen.add(cur);
    comp.push(cur);
    for (const nb of adj.get(cur) ?? []) if (!seen.has(nb)) stack.push(nb);
  }
  components.push(comp);
}
for (const comp of components.sort((a, b) => b.length - a.length)) {
  console.log(`  ${comp.length === 1 ? '孤立' : `${comp.length} 节点`}：${comp.join(' / ')}`);
}

// master 子图（v0.2 表 + 骨架边）：主图只渲染 master 节点 + 两端都在主图的边
const masterSet = new Set(candidates.map((c) => c.label));
{
  const deg = new Map<string, number>([...masterSet].map((l) => [l, 0]));
  for (const [a, b] of SKELETON) {
    if (masterSet.has(a) && masterSet.has(b)) {
      deg.set(a, (deg.get(a) ?? 0) + 1);
      deg.set(b, (deg.get(b) ?? 0) + 1);
    }
  }
  const isolated = [...masterSet].filter((l) => (deg.get(l) ?? 0) === 0);
  const pre = isolated.filter((l) => PREHISTORY.some((p) => p.label === l));
  console.log(
    `  master 子图（${masterSet.size} 条，v0.2）：前史孤立 = ${pre.join(' / ') || '无'}；全表孤立 ${isolated.length} 条`,
  );
}
console.log('  注：正卷节点边集 M1/M3 写入后复跑本项。');
