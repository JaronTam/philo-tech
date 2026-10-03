// M1 实测（ui-spec §1）：真实数据（vol-0..4）试排 → 同列间距检查 + 段高建议 + 连通性
// 两轮口径：主标轮（去 concepts，段高定标依据，对应 LOD scale < 0.75）；带 concepts 轮（放大读，敏感性阅读）
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MetaFile, TechNode, VolumeFile } from '../src/lib/types';
import {
  AVOID_LIMIT,
  placeInColumns,
  placeWithDegradation,
  type LayoutCtx,
  type Placeable,
  type Violation,
} from '../src/lib/layout';
import { VOLUME_BY_KEY, segmentHeights, type VolumeDef } from '../src/lib/volumes';

const root = join(import.meta.dirname, '..');
const load = <T,>(rel: string): T => JSON.parse(readFileSync(join(root, rel), 'utf8')) as T;

const meta = load<MetaFile>('data/meta.json');
const volFiles = ['vol-0', 'vol-1', 'vol-2', 'vol-3', 'vol-4'].map(
  (v) => load<VolumeFile>(`data/${v}.json`),
);
const allNodes = volFiles.flatMap((v) => v.nodes);
const allEdges = volFiles.flatMap((v) => v.edges);
const byId = new Map(allNodes.map((n) => [n.id, n]));
const ctx: LayoutCtx = { registry: meta.columns, withTheory: true };

const toPlaceables = (nodes: TechNode[], withConcepts: boolean): Placeable[] =>
  nodes.map((n) => ({
    id: n.id,
    label: n.label,
    layer: n.layer,
    column: n.column,
    year: n.year,
    weight: n.weight,
    concepts: withConcepts ? n.concepts : undefined,
  }));

const fmt = (n: number): string => (Number.isInteger(n) ? `${n}` : n.toFixed(1));

function localDef(def: VolumeDef, start: number, end: number, height: number): VolumeDef {
  return { key: def.key, title: def.title, start, end, height };
}

/** 单轮分析：无限下推求「需高」；受限下推（±20px）收集违规 */
function runPass(
  def: VolumeDef,
  items: Placeable[],
): { need: number; deepest: Placeable | null; violations: Violation[] } {
  const unlimited = placeInColumns(items, def, ctx, 0, Infinity, 0);
  let need = 0;
  let deepest: Placeable | null = null;
  for (const p of unlimited.placed) {
    if (p.y + p.blockH >= need) {
      need = p.y + p.blockH;
      deepest = p.item;
    }
  }
  const limited = placeInColumns(items, def, ctx, 0, AVOID_LIMIT, 0);
  return { need, deepest, violations: limited.violations };
}

function printViolations(tag: string, violations: Violation[]): void {
  for (const v of violations) {
    console.log(
      `    违规（${tag}）${v.column}：${v.upper} ↔ ${v.lower} 原始 ${fmt(v.naturalGap)} → 微调后 ${fmt(v.finalGap)} < 需 ${fmt(v.requiredGap)}（缺 ${fmt(v.deficit)}）`,
    );
  }
}

function report(name: string, def: VolumeDef, nodes: TechNode[], suggest: boolean): number {
  const label = runPass(def, toPlaceables(nodes, false));
  const full = runPass(def, toPlaceables(nodes, true));
  const gap = label.need - def.height;
  const years = def.end - def.start;
  const real = placeWithDegradation(toPlaceables(nodes, true), def, ctx);
  let realNeed = 0;
  for (const p of real.placed) realNeed = Math.max(realNeed, p.y + p.blockH);
  console.log(
    `  ${name}：节点 ${nodes.length} · 主标轮需高 ${fmt(label.need)} / 现有 ${fmt(def.height)}${gap > 0 ? ` → 缺 ${fmt(gap)}` : ' ✓'} · 带 concepts 需高 ${fmt(full.need)} · 实排需高 ${fmt(realNeed)}（去灰字 ${real.degraded.size}，余违规 ${real.violations.length}）`,
  );
  if (suggest && label.need > def.height) {
    const rate = def.height / years;
    let fit: number | null = null;
    for (let r = Math.ceil(rate * 10) / 10 + 0.1; r <= rate + 6; r = Math.round((r + 0.1) * 10) / 10) {
      const probe = localDef(def, def.start, def.end, years * r);
      if (runPass(probe, toPlaceables(nodes, false)).need <= years * r) {
        fit = r;
        break;
      }
    }
    console.log(
      fit === null
        ? `    ⇒ 主标轮缺口需 +6px/年 以上方能自洽（当前 ${rate.toFixed(1)}，需高随速率增长）`
        : `    ⇒ 建议（主标轮）：${rate.toFixed(1)} → ${fit}px/年（段高 ${fmt(def.height)} → ${fmt(years * fit)}）`,
    );
  }
  printViolations('主标轮', label.violations);
  printViolations('带 concepts', full.violations);
  printViolations('实排', real.violations);
  return label.need;
}

console.log(`=== M1 实测报告（真实数据：nodes ${allNodes.length} / edges ${allEdges.length}）===`);
console.log('块高 = 主标折行 × 20px（字号按 weight 16/14/12）+ 灰字 ≤2 行 × 15px + 4px');
console.log('主标轮 = 段高定标依据（LOD < 0.75 隐藏灰字）；带 concepts 轮 = 放大读');
console.log('避让：按年份序单向下推，单节点 ≤ +20px（ui-spec §1）\n');

console.log('[1] 主图 · 逐段分析（master 节点；段内无限下推求需高）');
const main = VOLUME_BY_KEY.main;
const masterNodes = allNodes.filter((n) => n.master);
let totalLabelNeed = 0;
let totalFullNeed = 0;
for (const seg of main.segments!) {
  const years = seg.end - seg.start;
  const height = years * seg.pxPerYear;
  const local = localDef(main, seg.start, seg.end, height);
  const segNodes = masterNodes.filter((n) => n.year >= seg.start && n.year < seg.end);
  totalLabelNeed += report(
    `段 [${seg.start}, ${seg.end}) ${seg.pxPerYear}px/年 高 ${fmt(height)}`,
    local,
    segNodes,
    true,
  );
  totalFullNeed += runPass(local, toPlaceables(segNodes, true)).need;
}
console.log(
  `  合计：主标轮需高 ${fmt(totalLabelNeed)} · 带 concepts 需高 ${fmt(totalFullNeed)} / 现有段高合计 ${fmt(segmentHeights(main))}`,
);

console.log('\n[2] 分卷视图（线性刻度）');
for (const key of ['pre', 'v1', 'v2', 'v3', 'v4'] as const) {
  const def = VOLUME_BY_KEY[key];
  const nodes = key === 'pre' ? volFiles[0].nodes : volFiles[Number(key[1])].nodes;
  const need = report(`${def.title} [${def.start}, ${def.end})`, def, nodes, false);
  if (need > def.height) {
    console.log(`    ⇒ 建议（主标轮）：H ${fmt(def.height)} → ${fmt(Math.ceil(need / 20) * 20)}px`);
  }
}

console.log('\n=== 连通性 ===');
const adj = new Map<string, string[]>();
for (const e of allEdges) {
  adj.set(e.source, [...(adj.get(e.source) ?? []), e.target]);
  adj.set(e.target, [...(adj.get(e.target) ?? []), e.source]);
}
const seen = new Set<string>();
const components: string[][] = [];
for (const n of allNodes) {
  if (seen.has(n.id)) continue;
  const stack = [n.id];
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
const label = (id: string) => byId.get(id)?.label ?? id;
for (const comp of components.sort((a, b) => b.length - a.length)) {
  console.log(`  ${comp.length === 1 ? '孤立' : `${comp.length} 节点`}：${comp.map(label).join(' / ')}`);
}

// master 子图（主图只渲染 master 节点 + 两端都在主图的边）
{
  const masterSet = new Set(masterNodes.map((n) => n.id));
  const deg = new Map<string, number>([...masterSet].map((id) => [id, 0]));
  let masterEdges = 0;
  for (const e of allEdges) {
    if (masterSet.has(e.source) && masterSet.has(e.target)) {
      masterEdges += 1;
      deg.set(e.source, (deg.get(e.source) ?? 0) + 1);
      deg.set(e.target, (deg.get(e.target) ?? 0) + 1);
    }
  }
  const isolated = [...masterSet].filter((id) => (deg.get(id) ?? 0) === 0);
  const pre = isolated.filter((id) => byId.get(id)!.year < 1947);
  console.log(
    `  master 子图（${masterSet.size} 节点 / ${masterEdges} 边）：前史孤立 = ${pre.map(label).join(' / ') || '无'}；全表孤立 ${isolated.length} 条：${isolated.map(label).join(' / ') || '无'}`,
  );
}
