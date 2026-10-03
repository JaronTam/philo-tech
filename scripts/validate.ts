import { readFileSync } from 'node:fs';
import { join } from 'node:path';
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
  if (n.column === 'theory') {
    if (n.year >= 1947) errors.push(`[column] ${where}：theory 列限前史卷（year < 1947）`);
  } else if (!cols.includes(n.column)) {
    errors.push(`[column] ${where}：${n.column} 未在 ${n.layer} 下声明`);
  }
  if (n.year < YEAR_MIN || n.year >= YEAR_MAX) errors.push(`[year] ${where}：${n.year} 越界`);
  if (!n.summary) errors.push(`[summary] ${where}：缺失`);
  if (!n.sources || n.sources.length < 1) errors.push(`[sources] ${where}：空`);
  if (!n.checked_at) errors.push(`[checked_at] ${where}：缺失`);
  const hit = bannedHit(n.label);
  if (hit) errors.push(`[禁用词] ${where}：label「${n.label}」命中「${hit}」`);
}

const inDeg = new Map<string, number>();
const outDeg = new Map<string, number>();
for (const e of edges) {
  if (!byId.has(e.source)) errors.push(`[悬空] edge source 不存在：${e.source}`);
  if (!byId.has(e.target)) errors.push(`[悬空] edge target 不存在：${e.target}`);
  if (!e.citation) errors.push(`[citation] edge ${e.source} → ${e.target}：为空`);
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

console.log(`validate：nodes ${nodes.length} / edges ${edges.length}`);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.log(`  ERROR ${e}`);
if (errors.length > 0) {
  console.log(`\n${errors.length} error(s)`);
  process.exit(1);
}
console.log('全部通过（跨卷边数量、citation 可点击性等 M1 后启用）');
