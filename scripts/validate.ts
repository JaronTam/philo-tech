import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { AVOID_LIMIT, estimateBlockHeight } from '../src/lib/layout';
import { buildLineageIndex } from '../src/lib/lineage';
import type { Layer, MetaFile, TechEdge, TechNode, VolumeFile } from '../src/lib/types';

const root = join(import.meta.dirname, '..');
const YEAR_MIN = 1854;
const YEAR_MAX = 2027; // 半开 [1854, 2027)

const LAYERS: Layer[] = [
  'L0_hardware',
  'L1_system',
  'L2_language',
  'L3_data',
  'L4_delivery',
  'L5_ai',
  'PRE_theory',
];

function load<T>(rel: string): T {
  return JSON.parse(readFileSync(join(root, rel), 'utf8')) as T;
}

const meta = load<MetaFile>('data/meta.json');
const volFiles = ['vol-0', 'vol-1', 'vol-2', 'vol-3', 'vol-4'].map(
  (v) => load<VolumeFile>(`data/${v}.json`),
);

const nodes: TechNode[] = volFiles.flatMap((v) => v.nodes);
const edges: TechEdge[] = volFiles.flatMap((v) => v.edges);

const errors: string[] = [];
const warnings: string[] = [];

const byId = new Map<string, TechNode>();
for (const n of nodes) {
  if (byId.has(n.id)) errors.push(`[id] 重复：${n.id}`);
  byId.set(n.id, n);
}

const banned = meta.bannedWords.map((w) => w.toLowerCase());
function bannedHit(label: string): string | null {
  const lower = label.toLowerCase();
  return banned.find((w) => lower.includes(w)) ?? null;
}

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

for (const n of nodes) {
  const where = `node ${n.id}`;
  if (!KEBAB.test(n.id)) errors.push(`[id 格式] ${where}：非 kebab-case`);
  if (!n.id.endsWith(`-${n.year}`)) warnings.push(`[id 年份] ${where}：未以 -${n.year} 结尾`);
  if (!n.label || !n.label_en) errors.push(`[label] ${where}：label / label_en 缺失`);
  if (!LAYERS.includes(n.layer)) errors.push(`[layer] ${where}：非法枚举 ${n.layer}`);
  const cols = meta.columns[n.layer] ?? [];
  if (!cols.includes(n.column)) {
    errors.push(`[column] ${where}：${n.column} 未在 ${n.layer} 下声明`);
  }
  if (n.layer === 'PRE_theory' && n.year >= 1947) {
    errors.push(`[layer] ${where}：PRE_theory 限前史卷（year < 1947）`);
  }
  if (n.year < YEAR_MIN || n.year >= YEAR_MAX) errors.push(`[year] ${where}：${n.year} 越界`);
  if (!n.summary) errors.push(`[summary] ${where}：缺失`);
  else if ([...n.summary].length > 60) {
    errors.push(`[summary] ${where}：${[...n.summary].length} 字符 > 60`);
  }
  if (!n.people || n.people.length < 2 || n.people.length > 4) {
    errors.push(`[people] ${where}：${n.people?.length ?? 0} 条（需 2–4）`);
  }
  if (!n.sources || n.sources.length < 1) errors.push(`[sources] ${where}：空`);
  if (!n.checked_at) errors.push(`[checked_at] ${where}：缺失`);
  const hit = bannedHit(n.label);
  if (hit) errors.push(`[禁用词] ${where}：label「${n.label}」命中「${hit}」`);
}

// 同列同年（K7，content-spec §3）：≤2；同年对的「上方」（year, label 排序）label-only 块高 ≤ AVOID_LIMIT
// —— 布局 repair（降级扩展 + 不动点）的闭合域：上方块超出 ±20px 避让上限即无解
{
  const sameCell = new Map<string, TechNode[]>();
  for (const n of nodes) {
    const key = `${n.layer}/${n.column}@${n.year}`;
    sameCell.set(key, [...(sameCell.get(key) ?? []), n]);
  }
  for (const [key, list] of sameCell) {
    if (list.length <= 1) continue;
    if (list.length > 2) {
      errors.push(`[同列同年] ${key}：${list.map((n) => n.label).join(' / ')}（${list.length} 条 > 2）`);
      continue;
    }
    const [upper] = [...list].sort((a, b) => a.year - b.year || a.label.localeCompare(b.label));
    const h = estimateBlockHeight(upper.label, undefined, upper.weight);
    if (h > AVOID_LIMIT) {
      errors.push(
        `[同列同年] ${key}：上方 ${upper.label} label-only 块高 ${h}px > ${AVOID_LIMIT}px（避让闭合域之外）`,
      );
    }
  }
}

const inDeg = new Map<string, number>();
const outDeg = new Map<string, number>();
for (const e of edges) {
  if (!byId.has(e.source)) errors.push(`[悬空] edge source 不存在：${e.source}`);
  if (!byId.has(e.target)) errors.push(`[悬空] edge target 不存在：${e.target}`);
  if (!e.citation) errors.push(`[citation] edge ${e.source} → ${e.target}：为空`);
  // M2 起 citation 尾 URL 在边 tooltip 与详情框渲染为可点击外链（ui-spec §2/§4），故要求存在
  else if (!/https?:\/\//.test(e.citation)) errors.push(`[citation] edge ${e.source} → ${e.target}：无可点击来源 URL`);
  const s = byId.get(e.source);
  const t = byId.get(e.target);
  if (s && t && s.year > t.year) {
    errors.push(`[时间倒流] ${e.source}(${s.year}) → ${e.target}(${t.year})`);
  }
  inDeg.set(e.target, (inDeg.get(e.target) ?? 0) + 1);
  outDeg.set(e.source, (outDeg.get(e.source) ?? 0) + 1);
}

// convergence 判定在入度累计完成后进行（规则：target 最终入度 ≥ 2）
for (const e of edges) {
  if (e.relation === 'convergence' && (inDeg.get(e.target) ?? 0) < 2) {
    errors.push(`[convergence] ${e.target} 入度 < 2`);
  }
}

const shiftCount = edges.filter((e) => e.relation === 'paradigm_shift').length;
if (shiftCount > 8) errors.push(`[paradigm_shift] 全站 ${shiftCount} 条 > 8`);

for (const n of nodes) {
  const where = `node ${n.id}`;
  const inD = inDeg.get(n.id) ?? 0;
  const outD = outDeg.get(n.id) ?? 0;
  if (outD > 5) errors.push(`[出边] ${where}：${outD} 条 > 5`);
  if (inD > 10) warnings.push(`[入边] ${where}：${inD} 条 > 10，提示复核`);
  if (inD === 0) {
    if (n.year < 1947) {
      if (outD === 0) errors.push(`[孤岛] 前史源头 ${n.id}：无入边且无出边`);
    } else {
      errors.push(`[入边] 正卷 ${n.id}：无入边（非源头）`);
    }
  }
}

// 边预算（content-spec §3，F-B-7 → J7）：主图入边 ≤8；相邻卷跨卷边 ≤32（master→master ≤7）
// （下限 3 为 M3 全量目标，建设期降级为 warning）
const masterIds = new Set(nodes.filter((n) => n.master).map((n) => n.id));
const mainInDeg = new Map<string, number>();
for (const e of edges) {
  if (masterIds.has(e.source) && masterIds.has(e.target)) {
    mainInDeg.set(e.target, (mainInDeg.get(e.target) ?? 0) + 1);
  }
}
for (const [id, d] of mainInDeg) {
  if (d > 8) errors.push(`[主图入边] ${id}：${d} 条 > 8`);
}

// 主图「前史」入口标记（ui-spec §6）：id 必须存在、master（主图可见）、year < 1947（防 id 漂移）
for (const id of meta.preEntryNodes ?? []) {
  const n = byId.get(id);
  if (!n) errors.push(`[前史入口] ${id}：节点不存在`);
  else if (!n.master) errors.push(`[前史入口] ${id}：非 master，主图不可见`);
  else if (n.year >= 1947) errors.push(`[前史入口] ${id}：year ${n.year} ≥ 1947`);
}

// 家系（UI 优化批 2 · J-B；口径 = docs/ui-spec.md §2）：表完整性 + 归属覆盖 + master 45 与 8 树分区一致
let lineageInfo = '家系：未启用';
{
  const lineages = meta.lineages ?? [];
  const exceptions = meta.lineageExceptions ?? {};
  const css = readFileSync(join(root, 'src/index.css'), 'utf8');
  const lineageIds = new Set<string>();
  if (lineages.length === 0) errors.push('[家系] meta.lineages 缺失');
  for (const l of lineages) {
    if (lineageIds.has(l.id)) errors.push(`[家系] id 重复：${l.id}`);
    lineageIds.add(l.id);
    const rootNode = byId.get(l.id);
    if (!rootNode) errors.push(`[家系] ${l.id}：树根节点不存在`);
    else if (!rootNode.master) errors.push(`[家系] ${l.id}：树根非 master（主图不可见）`);
    if (!l.label) errors.push(`[家系] ${l.id}：label 缺失`);
    if (!/^--lineage-\d+$/.test(l.color)) errors.push(`[家系] ${l.id}：色 token 非法「${l.color}」`);
    else if (!css.includes(`${l.color}:`)) errors.push(`[家系] ${l.id}：${l.color} 未在 src/index.css 声明`);
  }
  for (const [nodeId, lineageId] of Object.entries(exceptions)) {
    if (!byId.has(nodeId)) errors.push(`[家系例外] ${nodeId}：节点不存在`);
    if (!lineageIds.has(lineageId)) errors.push(`[家系例外] ${nodeId} → ${lineageId}：家系不存在`);
  }
  // (b) 归属覆盖全表：所有节点有归属、无未消解并列
  const idx = buildLineageIndex(nodes, edges, meta);
  for (const n of nodes) {
    if (!idx.byNode.has(n.id)) errors.push(`[家系] ${n.id}：无归属（不可达或并列未消解）`);
  }
  for (const id of idx.unresolved) errors.push(`[家系] ${id}：并列未消解（补例外或改数据）`);
  // (c) master 45 与 8 树分区一致：独立复算 master 子图「最近树根」（多源 BFS，并列 = 分区不唯一），
  //     对照派生基线（不含例外的 buildLineageIndex 结果）
  const mIds = new Set(nodes.filter((n) => n.master).map((n) => n.id));
  const mAdj = new Map<string, string[]>();
  for (const e of edges) {
    if (mIds.has(e.source) && mIds.has(e.target)) {
      mAdj.set(e.source, [...(mAdj.get(e.source) ?? []), e.target]);
    }
  }
  const bfsDist = (src: string): Map<string, number> => {
    const dist = new Map<string, number>([[src, 0]]);
    const q = [src];
    while (q.length) {
      const cur = q.shift()!;
      for (const nb of mAdj.get(cur) ?? []) {
        if (!dist.has(nb)) {
          dist.set(nb, dist.get(cur)! + 1);
          q.push(nb);
        }
      }
    }
    return dist;
  };
  const bestD = new Map<string, number>();
  const bestRoots = new Map<string, string[]>();
  for (const root of lineages) {
    for (const [id, d] of bfsDist(root.id)) {
      const cur = bestD.get(id);
      if (cur === undefined || d < cur) {
        bestD.set(id, d);
        bestRoots.set(id, [root.id]);
      } else if (d === cur && !bestRoots.get(id)!.includes(root.id)) {
        bestRoots.get(id)!.push(root.id);
      }
    }
  }
  const uncovered = [...mIds].filter((id) => !bestRoots.has(id)).sort();
  if (uncovered.length) errors.push(`[家系] master 未被任何家系树覆盖：${uncovered.join(' / ')}`);
  const tied = [...mIds].filter((id) => (bestRoots.get(id)?.length ?? 0) > 1).sort();
  if (tied.length) errors.push(`[家系] master 树归属并列（分区不唯一）：${tied.join(' / ')}`);
  const baseline = buildLineageIndex(nodes, edges, { ...meta, lineageExceptions: {} });
  let treeDivergence = 0;
  for (const id of [...mIds].sort()) {
    const expect = bestRoots.get(id)?.[0];
    if (expect && baseline.byNode.get(id) !== expect) {
      treeDivergence += 1;
      errors.push(`[家系] master ${id}：派生基线 ${baseline.byNode.get(id) ?? '∅'} ≠ 8 树分区 ${expect}`);
    }
  }
  const excCount = Object.keys(exceptions).length;
  const excMaster = Object.keys(exceptions).filter((id) => mIds.has(id)).length;
  lineageInfo = `家系：${lineages.length} 条 · 归属 ${idx.byNode.size}/${nodes.length}（例外 ${excCount} 条，其中 master ${excMaster}）· master ${mIds.size} 与 8 树分区基线偏离 ${treeDivergence}`;
  if (lineages.length > 0 && lineageIds.size !== 8) {
    warnings.push(`[家系] 家系 ${lineageIds.size} 条 ≠ 8（基准 = master 8 树）`);
  }
}

const volIdx = new Map<string, number>();
volFiles.forEach((v, i) => v.nodes.forEach((n) => volIdx.set(n.id, i)));
const crossPairs = new Map<string, number>();
const crossMasterPairs = new Map<string, number>();
for (const e of edges) {
  const a = volIdx.get(e.source);
  const b = volIdx.get(e.target);
  if (a === undefined || b === undefined || a === b) continue;
  if (Math.abs(a - b) !== 1) {
    warnings.push(`[跨卷边] ${e.source} → ${e.target}：跨 ${Math.abs(a - b)} 卷（相邻卷规则之外）`);
  }
  const key = `vol-${Math.min(a, b)} → vol-${Math.max(a, b)}`;
  crossPairs.set(key, (crossPairs.get(key) ?? 0) + 1);
  if (masterIds.has(e.source) && masterIds.has(e.target)) {
    crossMasterPairs.set(key, (crossMasterPairs.get(key) ?? 0) + 1);
  }
}
// M3 修订（J1 → J5 → J7）：总量 ≤32；master→master ≤7（唯一会渲染的类型：主图要求两端皆 master，分卷视图要求两端同卷）
for (const [key, count] of crossPairs) {
  if (count > 32) errors.push(`[跨卷边] ${key}：${count} 条 > 32`);
  else if (count < 3) warnings.push(`[跨卷边] ${key}：${count} 条 < 3（M3 全量前补足）`);
}
for (const [key, count] of crossMasterPairs) {
  if (count > 7) errors.push(`[跨卷边·主图] ${key}：${count} 条 > 7`);
}

console.log(`validate：nodes ${nodes.length} / edges ${edges.length}`);
console.log(`  ${lineageInfo}`);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.log(`  ERROR ${e}`);
if (errors.length > 0) {
  console.log(`\n${errors.length} error(s)`);
  process.exit(1);
}
console.log('全部通过');
