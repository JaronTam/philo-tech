// 合成压测图（确定性）：M2 性能验收输入（250 节点），并覆盖真实数据暂缺的 convergence / 入边超限 hub。
// 列名与 data/meta.json 注册表一致，dev fixture（?fixture=1）可直接走真实布局。
import type { Layer, TechEdge, TechNode, VolumeKey } from './types';

const LANE_COLUMNS: [Layer, string[]][] = [
  ['L0_hardware', ['device', 'arch', 'accelerator']],
  ['L1_system', ['os', 'net']],
  ['L2_language', ['c-family', 'lisp-family', 'ml-family', 'jvm-family', 'toolchain', 'scripting']],
  ['L3_data', ['relational', 'nosql', 'distributed']],
  ['L4_delivery', ['web', 'container', 'cloud-api']],
  ['L5_ai', ['nn', 'framework']],
];

function mulberry32(seed: number): () => number {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function volumeOfYear(year: number): VolumeKey {
  if (year < 1947) return 'pre';
  if (year < 1980) return 'v1';
  if (year < 2000) return 'v2';
  if (year < 2015) return 'v3';
  return 'v4';
}

export interface SyntheticGraph {
  nodes: TechNode[];
  edges: TechEdge[];
  volumeOf: Map<string, VolumeKey>;
}

/** 生成确定性合成图：年份跨 1854–2026，含 convergence 边与一个 in-degree 12 的 hub */
export function makeSyntheticGraph(seed = 1, nodeCount = 250): SyntheticGraph {
  const rnd = mulberry32(seed);
  const span = 2026 - 1854;
  const nodes: TechNode[] = [];
  const volumeOf = new Map<string, VolumeKey>();

  for (let i = 0; i < nodeCount; i++) {
    const [layer, columns] = LANE_COLUMNS[i % LANE_COLUMNS.length];
    const column = columns[Math.floor(rnd() * columns.length)];
    const year = 1854 + Math.floor((i * span) / nodeCount) + Math.floor(rnd() * 4);
    const id = `syn-${String(i).padStart(3, '0')}-${year}`;
    volumeOf.set(id, volumeOfYear(year));
    nodes.push({
      id,
      label: `合成节点 ${i}`,
      label_en: `Synthetic Node ${i}`,
      layer,
      column,
      year,
      weight: i % 12 === 0 ? 'epic' : i % 4 === 0 ? 'major' : 'minor',
      master: i % 4 === 0,
      summary: `合成数据（seed ${seed}），用于 250 节点性能与收敛高亮压测。`,
      concepts: [`concept-${i % 7}`, `concept-${(i + 3) % 7}`],
      people: [`person-${i % 5}`, `lab-${i % 3}`],
      sources: [`https://example.com/syn/${id}`],
      checked_at: '2026-10-05',
    });
  }

  const edges: TechEdge[] = [];
  const seen = new Set<string>();
  const push = (source: string, target: string, relation: TechEdge['relation']) => {
    const key = `${source}->${target}`;
    if (source === target || seen.has(key)) return;
    seen.add(key);
    edges.push({ source, target, relation, citation: `合成依据：https://example.com/cite/${source}` });
  };
  const idOf = (i: number) => nodes[i].id;

  for (let i = 1; i < nodeCount; i++) {
    const fanIn = rnd() < 0.4 ? 2 : 1;
    for (let k = 0; k < fanIn; k++) {
      const src = i - 1 - Math.floor(rnd() * Math.min(12, i));
      const r = rnd();
      push(idOf(src), idOf(i), r < 0.6 ? 'enables' : r < 0.85 ? 'conceptual_inf' : 'direct_fork');
    }
    // ~6% 目标带 convergence 多源（2–4 条），供收敛高亮与「多源」语义压测
    if (i % 17 === 0) {
      const sources = 2 + Math.floor(rnd() * 3);
      for (let k = 0; k < sources; k++) {
        const src = i - 1 - Math.floor(rnd() * Math.min(20, i));
        push(idOf(src), idOf(i), 'convergence');
      }
    }
  }
  // 入边超限 hub（index 40，master）：10 条入边全来自 master 节点 → 主图视图内可见 10 > 8，触发 `+N` 角标
  for (const src of [0, 4, 8, 12, 16, 20, 24, 28, 32, 36]) {
    push(idOf(src), idOf(40), src % 8 === 0 ? 'direct_fork' : 'enables');
  }

  return { nodes, edges, volumeOf };
}
