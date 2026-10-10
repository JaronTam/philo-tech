// M1 实测（ui-spec §1）：真实数据（vol-0..4）试排 → 同列间距检查 + 段高建议 + 连通性
// 两轮口径：主标轮（去 concepts，段高定标依据，对应 LOD scale < 0.75）；带 concepts 轮（放大读，敏感性阅读）
// M3 增：--draft <path> 候选草稿模式（data/candidates/vol-N.draft.json → 预检 + 列占用矩阵 + 测高）
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { THEORY_COLUMN, type Layer, type MetaFile, type TechNode, type VolumeFile } from '../src/lib/types';
import {
  AVOID_LIMIT,
  NODE_MAX_WIDTH,
  placeInColumns,
  placeWithDegradation,
  type LayoutCtx,
  type Placeable,
  type Violation,
} from '../src/lib/layout';
import { buildRouteScaffold, legacyPoints, pathMetrics, routeEdge } from '../src/lib/route';
import { capInbound } from '../src/lib/graph';
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

// ---- M3 候选草稿模式：npm run measure -- --draft data/candidates/vol-1.draft.json ----
interface DraftNode {
  id: string;
  label: string;
  label_en?: string;
  layer: Layer;
  column: string;
  year: number;
  weight?: 'epic' | 'major' | 'minor';
  master?: boolean;
  summary?: string;
  concepts?: string[];
}

interface DraftFile {
  volume: 'v1' | 'v2' | 'v3' | 'v4';
  nodes: DraftNode[];
}

const draftArgIdx = process.argv.indexOf('--draft');
if (draftArgIdx >= 0) {
  const draftPath = process.argv[draftArgIdx + 1];
  if (!draftPath) {
    console.error('用法：npm run measure -- --draft data/candidates/vol-N.draft.json');
    process.exit(1);
  }
  const draft = load<DraftFile>(draftPath);
  const def = VOLUME_BY_KEY[draft.volume];
  if (!def || def.key === 'main' || def.key === 'pre' || def.segments) {
    console.error(`--draft 仅支持 v1..v4（收到 ${draft.volume}）`);
    process.exit(1);
  }
  const existing = new Set(allNodes.map((n) => n.id));
  const fresh = draft.nodes.filter((n) => !existing.has(n.id));
  console.log(`=== 候选草稿测高（${draftPath}）===`);
  console.log(
    `${def.title} [${def.start}, ${def.end}) · 草稿 ${draft.nodes.length} 节点（新增 ${fresh.length} / 沿用既有 ${draft.nodes.length - fresh.length}）· 现 H ${fmt(def.height)}\n`,
  );

  const errors: string[] = [];
  const warns: string[] = [];
  const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  const seenId = new Set<string>();
  const occ = new Map<string, DraftNode[]>();
  for (const n of draft.nodes) {
    if (!kebab.test(n.id)) errors.push(`[id 格式] ${n.id}`);
    else if (!n.id.endsWith(`-${n.year}`)) warns.push(`[id 年份] ${n.id} 未以 -${n.year} 结尾`);
    if (seenId.has(n.id)) errors.push(`[id 重复] ${n.id}`);
    seenId.add(n.id);
    const banned = meta.bannedWords.find((w) =>
      /[a-z]/i.test(w) ? n.label.toLowerCase().includes(w.toLowerCase()) : n.label.includes(w),
    );
    if (banned) errors.push(`[禁用词] ${n.label} 命中「${banned}」`);
    if (n.summary !== undefined && [...n.summary].length > 60) {
      errors.push(`[summary] ${n.label} ${[...n.summary].length} 字符 > 60`);
    }
    const cols = meta.columns[n.layer];
    if (!cols) errors.push(`[layer] ${n.label} 未知 layer ${n.layer}`);
    else if (!cols.includes(n.column)) errors.push(`[column] ${n.label} 的 ${n.column} 不在 ${n.layer}`);
    if (n.layer === 'PRE_theory' && n.year >= 1947) errors.push(`[layer] ${n.label} PRE_theory 限 year < 1947`);
    if (n.year < def.start || n.year >= def.end) {
      errors.push(`[year] ${n.label} ${n.year} 越出 [${def.start}, ${def.end})`);
    }
    const key = `${n.layer}/${n.column}`;
    occ.set(key, [...(occ.get(key) ?? []), n]);
  }
  const byYearPerColumn = new Map<string, number>();
  for (const [key, list] of occ) {
    for (const n of list) {
      byYearPerColumn.set(`${key}@${n.year}`, (byYearPerColumn.get(`${key}@${n.year}`) ?? 0) + 1);
    }
  }
  for (const [key, count] of byYearPerColumn) {
    if (count > 1) {
      const [group, year] = key.split('@');
      const dupes = occ
        .get(group)!
        .filter((n) => n.year === Number(year))
        .map((n) => n.label);
      errors.push(`[同列同年] ${group} @ ${year}：${dupes.join(' / ')}`);
    }
  }
  console.log(`预检：error ${errors.length} / warn ${warns.length}`);
  for (const e of errors) console.log(`  ERROR ${e}`);
  for (const w of warns) console.log(`  warn  ${w}`);

  console.log('\n列占用矩阵（layer/column → 年份）：');
  for (const [key, list] of [...occ].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`  ${key}：${[...list].sort((a, b) => a.year - b.year).map((n) => n.year).join(' ')}`);
  }

  console.log('');
  const draftAsNodes: TechNode[] = draft.nodes.map((n) => ({
    id: n.id,
    label: n.label,
    label_en: n.label_en ?? '',
    layer: n.layer,
    column: n.column,
    year: n.year,
    weight: n.weight ?? 'major',
    master: n.master ?? false,
    summary: n.summary ?? '',
    concepts: n.concepts,
    sources: [],
    checked_at: '',
  }));
  report(`${def.title}（草稿）`, def, draftAsNodes, true);
  process.exit(errors.length > 0 ? 1 : 0);
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

console.log('\n[3] 边穿字（统一几何路由复算 · 口径 = 全量 block，无 LOD；目标 ≤10 块，不设 gate —— K4）');
{
  // 视图构造与 App.tsx 同口径（主图 = master；主图入边 ≤8 截断）
  const masterNodes = allNodes.filter((n) => n.master);
  const viewList: { key: string; def: VolumeDef; nodes: TechNode[] }[] = [
    { key: 'main', def: VOLUME_BY_KEY.main, nodes: masterNodes },
    { key: 'pre', def: VOLUME_BY_KEY.pre, nodes: volFiles[0].nodes },
    { key: 'v1', def: VOLUME_BY_KEY.v1, nodes: volFiles[1].nodes },
    { key: 'v2', def: VOLUME_BY_KEY.v2, nodes: volFiles[2].nodes },
    { key: 'v3', def: VOLUME_BY_KEY.v3, nodes: volFiles[3].nodes },
    { key: 'v4', def: VOLUME_BY_KEY.v4, nodes: volFiles[4].nodes },
  ];
  let legacyTotal = 0;
  let routeTotal = 0;
  for (const { key, def, nodes } of viewList) {
    const items = toPlaceables(nodes, true);
    const vctx: LayoutCtx = {
      registry: meta.columns,
      withTheory: items.some(
        (it) => it.column === THEORY_COLUMN && it.year >= def.start && it.year < def.end,
      ),
    };
    const { placed } = placeWithDegradation(items, def, vctx);
    const scaffold = buildRouteScaffold(placed);
    const pos = new Map(placed.map((p) => [p.item.id ?? p.item.label, p]));
    const nodeById = new Map(nodes.map((n) => [n.id, n]));
    const visible = new Set(nodes.map((n) => n.id));
    const rawEdges = allEdges.filter((e) => visible.has(e.source) && visible.has(e.target));
    const kept = key === 'main' ? capInbound(rawEdges, 8).kept : rawEdges;
    let viewLegacy = 0;
    let viewRoute = 0;
    let degenerate = 0;
    const residual: string[] = [];
    for (const e of kept) {
      const s = pos.get(e.source)!;
      const t = pos.get(e.target)!;
      const sn = nodeById.get(e.source)!;
      const tn = nodeById.get(e.target)!;
      const src = { x: s.x + NODE_MAX_WIDTH / 2, y: s.y + s.blockH, column: `${sn.layer}/${sn.column}` };
      const tgt = { x: t.x + NODE_MAX_WIDTH / 2, y: t.y, column: `${tn.layer}/${tn.column}` };
      const legacy = pathMetrics(legacyPoints(src, tgt), scaffold);
      const route = routeEdge(src, tgt, scaffold);
      viewLegacy += legacy.crossings;
      viewRoute += route.crossings;
      if (route.degenerate) degenerate += 1;
      if (route.crossings > 0) residual.push(`${e.source} ＞ ${e.target} ${route.crossings}`);
    }
    legacyTotal += viewLegacy;
    routeTotal += viewRoute;
    console.log(
      `  ${key}：边 ${kept.length} · 旧式 ${viewLegacy} 块 → 新路由 ${viewRoute} 块 · 退化 ${degenerate} 边`,
    );
    if (residual.length) console.log(`   残留：${residual.join(' · ')}`);
  }
  console.log(
    `  合计：旧式 ${legacyTotal} 块 → 新路由 ${routeTotal} 块（目标 ≤10 块：${routeTotal <= 10 ? '✓' : '✗'}）`,
  );
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
