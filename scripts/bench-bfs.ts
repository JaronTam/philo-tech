// M2 性能验收：上下游追溯在 250 节点下 < 100ms（prd2 §10）。
// ① 手工图断言 traceLineage / capInbound / convergenceHighlight 语义；② 合成 250 节点测 p50/p95；③ p95 > 100ms 退出码 1；④ 真实数据复跑（报告，不设 gate）。
// 脚本与 App 共用 src/lib/graph.ts，同一实现。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import {
  buildGraphIndex,
  buildSearchIndex,
  capInbound,
  deriveLit,
  searchNodes,
  traceLineage,
  type GraphIndex,
} from '../src/lib/graph';
import { makeSyntheticGraph } from '../src/lib/bench-fixture';
import type { Relation, TechEdge, TechNode, VolumeKey } from '../src/lib/types';

function mkNode(id: string, year: number, extra: Partial<TechNode> = {}): TechNode {
  return {
    id,
    label: id,
    label_en: id,
    layer: 'L0_hardware',
    column: 'device',
    year,
    weight: 'major',
    master: false,
    summary: 'bench fixture',
    sources: ['https://example.com'],
    checked_at: '2026-10-05',
    ...extra,
  };
}
function mkEdge(source: string, target: string, relation: Relation): TechEdge {
  return { source, target, relation, citation: `依据：https://example.com/${source}` };
}
function index(nodes: TechNode[], edges: TechEdge[]): GraphIndex {
  return buildGraphIndex(nodes, edges, new Map<string, VolumeKey>(nodes.map((n) => [n.id, 'v1'])));
}

// ---- ① 正确性断言 ----
{
  const nodes = ['a', 'b', 'c', 'd', 'e', 'f'].map((x, i) => mkNode(x, 1970 + i));
  const edges = [
    mkEdge('a', 'b', 'enables'),
    mkEdge('b', 'c', 'enables'),
    mkEdge('d', 'c', 'direct_fork'),
    mkEdge('c', 'e', 'enables'),
    mkEdge('e', 'f', 'enables'),
  ];
  const g = index(nodes, edges);

  const fromB = traceLineage(g, 'b');
  assert.deepEqual([...fromB.nodes].sort(), ['a', 'b', 'c', 'e', 'f']);
  assert.deepEqual(
    [...fromB.edges].sort(),
    ['a->b', 'b->c', 'c->e', 'e->f'],
    '向上只沿入边、向下只沿出边：d 与 d->c 不入 b 的血统',
  );

  const fromC = traceLineage(g, 'c');
  assert.deepEqual([...fromC.nodes].sort(), ['a', 'b', 'c', 'd', 'e', 'f']);
  assert.equal(fromC.edges.size, 5);

  const fromA = traceLineage(g, 'a');
  assert.deepEqual([...fromA.nodes].sort(), ['a', 'b', 'c', 'e', 'f'], 'a 无祖先');

  assert.deepEqual([...traceLineage(g, 'nope').nodes], ['nope'], '未知 id：仅返回自身');

  // capInbound：优先级 paradigm_shift > enables > conceptual_inf
  const capped = capInbound(
    [mkEdge('x', 't', 'conceptual_inf'), mkEdge('y', 't', 'paradigm_shift'), mkEdge('z', 't', 'enables')],
    2,
  );
  assert.deepEqual(
    capped.kept.map((e) => e.source).sort(),
    ['y', 'z'],
    '按 relation 优先级截断',
  );
  assert.equal(capped.overflow.get('t'), 1);

  // convergenceHighlight：convergence 边及其两端
  const gc = index(
    ['x', 'y', 'z'].map((v, i) => mkNode(v, 1970 + i)),
    [mkEdge('x', 'z', 'convergence'), mkEdge('y', 'z', 'convergence'), mkEdge('x', 'y', 'enables')],
  );
  assert.deepEqual([...gc.convergence.nodeIds].sort(), ['x', 'y', 'z']);
  assert.deepEqual([...gc.convergence.edgeIds].sort(), ['x->z', 'y->z']);

  // search：域与排序
  const si = buildSearchIndex([
    mkNode('shannon', 1937, { label: '香农', label_en: 'Claude Shannon', concepts: ['switching'], people: ['Bell Labs'] }),
    mkNode('turing', 1936, { label: '图灵机', label_en: 'Turing Machine', people: ['Alan Turing'] }),
  ]);
  assert.deepEqual(searchNodes(si, '图灵').map((h) => h.node.id), ['turing']);
  assert.deepEqual(searchNodes(si, 'shannon').map((h) => h.node.id), ['shannon'], 'label_en 命中');
  assert.deepEqual(searchNodes(si, 'switching').map((h) => h.node.id), ['shannon'], 'concepts 命中');
  assert.deepEqual(searchNodes(si, 'zzz'), [], '无匹配');
  console.log('bench：正确性断言 6 组全过（trace / cap / convergence / search）');
}

// ---- ② 合成 250 节点性能 ----
const { nodes, edges, volumeOf } = makeSyntheticGraph(1, 250);
const g = buildGraphIndex(nodes, edges, volumeOf);
const hubInEdges = g.inEdges.get(nodes[40].id) ?? [];
const hubIn = hubInEdges.length;
const hubMasterIn = hubInEdges.filter((e) => g.byId.get(e.source)?.master).length;
assert.ok(hubIn >= 10 && hubMasterIn >= 9, `hub in-degree ${hubIn}（master 来源 ${hubMasterIn}）不足，无法触发主图 ≤8 截断`);
assert.equal(capInbound(hubInEdges.filter((e) => g.byId.get(e.source)?.master && g.byId.get(e.target)?.master), 8).overflow.get(nodes[40].id), hubMasterIn - 8, '主图截断应产生 +N');
assert.ok(g.convergence.edgeIds.size >= 8, `convergence 边 ${g.convergence.edgeIds.size} < 8`);
console.log(`bench：合成图 nodes ${nodes.length} / edges ${edges.length}（hub in-degree ${hubIn}，convergence ${g.convergence.edgeIds.size} 条，跨卷 ${[...volumeOf.values()].filter((v) => v !== 'v1').length} 节点）`);

const samples: number[] = [];
for (let round = 0; round < 20; round++) {
  for (const n of nodes) {
    const t0 = performance.now();
    const lit = deriveLit({ kind: 'trace', origin: n.id }, null, g);
    samples.push(performance.now() - t0);
    assert.ok(lit.dimming && lit.litNodes.has(n.id));
  }
}
samples.sort((a, b) => a - b);
const p = (q: number) => samples[Math.floor(q * (samples.length - 1))];
const p50 = p(0.5);
const p95 = p(0.95);
const max = samples[samples.length - 1];

const idx = buildSearchIndex(nodes);
const sq: number[] = [];
for (let i = 0; i < 500; i++) {
  const t0 = performance.now();
  searchNodes(idx, i % 2 ? '合成节点 12' : 'concept-3');
  sq.push(performance.now() - t0);
}
sq.sort((a, b) => a - b);

console.log(`bench：deriveLit（= 单次追溯全量计算，${samples.length} 次） p50 ${p50.toFixed(3)}ms / p95 ${p95.toFixed(3)}ms / max ${max.toFixed(3)}ms`);
console.log(`bench：searchNodes（500 次） p95 ${sq[Math.floor(0.95 * (sq.length - 1))].toFixed(3)}ms`);

// ---- ④ 真实数据复跑（M3）：报告口径，p95 gate 以合成 250 节点为准（prd2 §10）----
{
  const root = join(import.meta.dirname, '..');
  const load = <T,>(rel: string): T => JSON.parse(readFileSync(join(root, rel), 'utf8')) as T;
  const volNames = ['vol-0', 'vol-1', 'vol-2', 'vol-3', 'vol-4'] as const;
  const volKeys: VolumeKey[] = ['pre', 'v1', 'v2', 'v3', 'v4'];
  const rNodes: TechNode[] = [];
  const rEdges: TechEdge[] = [];
  const nodeVol = new Map<string, number>();
  volNames.forEach((v, i) => {
    const f = load<{ nodes: TechNode[]; edges: TechEdge[] }>(`data/${v}.json`);
    f.nodes.forEach((n) => {
      rNodes.push(n);
      nodeVol.set(n.id, i);
    });
    rEdges.push(...f.edges);
  });
  const volumeOf = new Map<string, VolumeKey>(rNodes.map((n) => [n.id, volKeys[nodeVol.get(n.id)!]]));
  const rg = buildGraphIndex(rNodes, rEdges, volumeOf);

  let outMax = 0;
  let inMax = 0;
  let outArg = '';
  let inArg = '';
  for (const n of rNodes) {
    const o = rg.outEdges.get(n.id)?.length ?? 0;
    const i = rg.inEdges.get(n.id)?.length ?? 0;
    if (o > outMax) {
      outMax = o;
      outArg = n.label;
    }
    if (i > inMax) {
      inMax = i;
      inArg = n.label;
    }
  }
  const masterIds = new Set(rNodes.filter((n) => n.master).map((n) => n.id));
  const mmIn = new Map<string, number>();
  for (const e of rEdges) {
    if (masterIds.has(e.source) && masterIds.has(e.target)) mmIn.set(e.target, (mmIn.get(e.target) ?? 0) + 1);
  }
  const mmTop = [...mmIn]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, c]) => `${rg.byId.get(id)?.label ?? id} ${c}`)
    .join(' / ');
  const pairs = new Map<string, number>();
  for (const e of rEdges) {
    const a = nodeVol.get(e.source);
    const b = nodeVol.get(e.target);
    if (a === undefined || b === undefined || Math.abs(a - b) !== 1) continue;
    const key = `${volNames[Math.min(a, b)]}→${volNames[Math.max(a, b)]}`;
    pairs.set(key, (pairs.get(key) ?? 0) + 1);
  }
  const pairStr = ['vol-0→vol-1', 'vol-1→vol-2', 'vol-2→vol-3', 'vol-3→vol-4']
    .map((k) => `${k} ${pairs.get(k) ?? 0}`)
    .join(' / ');
  console.log(
    `bench：真实数据 nodes ${rNodes.length}（master ${masterIds.size}） / edges ${rEdges.length} · 出度 max ${outMax}（${outArg}） / 入度 max ${inMax}（${inArg}）`,
  );
  console.log(`bench：真实数据 master→master 入度 top：${mmTop || '无'} · convergence ${rg.convergence.edgeIds.size} 条 · 跨卷 ${pairStr}`);

  const rs: number[] = [];
  for (let round = 0; round < 20; round++) {
    for (const n of rNodes) {
      const t0 = performance.now();
      deriveLit({ kind: 'trace', origin: n.id }, null, rg);
      rs.push(performance.now() - t0);
    }
  }
  rs.sort((a, b) => a - b);
  const rp = (q: number) => rs[Math.floor(q * (rs.length - 1))];
  const rIdx = buildSearchIndex(rNodes);
  const rq: number[] = [];
  for (let i = 0; i < 500; i++) {
    const t0 = performance.now();
    searchNodes(rIdx, i % 2 ? '计算机' : 'transistor');
    rq.push(performance.now() - t0);
  }
  rq.sort((a, b) => a - b);
  console.log(
    `bench：真实数据 deriveLit（${rs.length} 次） p50 ${rp(0.5).toFixed(3)}ms / p95 ${rp(0.95).toFixed(3)}ms / max ${rs[rs.length - 1].toFixed(3)}ms · searchNodes p95 ${rq[Math.floor(0.95 * (rq.length - 1))].toFixed(3)}ms`,
  );
}

if (p95 > 100) {
  console.log(`\n未达标：p95 ${p95.toFixed(3)}ms > 100ms`);
  process.exit(1);
}
console.log(`\n达标：p95 ${p95.toFixed(3)}ms < 100ms（口径 = 250 节点合成图单次追溯计算，prd2 §10；真实数据复跑见 ④）`);
