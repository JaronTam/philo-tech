// M2 图算法内核：纯函数、无 React、无 JSON import（scripts/bench-bfs.ts 直接复用）
import type { Relation, TechEdge, TechNode, VolumeKey } from './types';

export function edgeId(e: TechEdge): string {
  return `${e.source}->${e.target}`;
}

/** 入边截断优先级（content-spec §3，与 validate.ts 的入度口径一致） */
export const RELATION_PRIORITY: Relation[] = [
  'paradigm_shift',
  'direct_fork',
  'enables',
  'convergence',
  'conceptual_inf',
  'composition',
];

export interface GraphIndex {
  nodes: TechNode[];
  edges: TechEdge[];
  byId: Map<string, TechNode>;
  volumeOf: Map<string, VolumeKey>;
  outEdges: Map<string, TechEdge[]>;
  inEdges: Map<string, TechEdge[]>;
  /** convergence 边及其两端节点（静态数据，预计算） */
  convergence: { nodeIds: Set<string>; edgeIds: Set<string> };
}

export function buildGraphIndex(
  nodes: TechNode[],
  edges: TechEdge[],
  volumeOf: Map<string, VolumeKey>,
): GraphIndex {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const outEdges = new Map<string, TechEdge[]>();
  const inEdges = new Map<string, TechEdge[]>();
  const convNodes = new Set<string>();
  const convEdges = new Set<string>();
  for (const e of edges) {
    const o = outEdges.get(e.source);
    o ? o.push(e) : outEdges.set(e.source, [e]);
    const i = inEdges.get(e.target);
    i ? i.push(e) : inEdges.set(e.target, [e]);
    if (e.relation === 'convergence') {
      convNodes.add(e.source);
      convNodes.add(e.target);
      convEdges.add(edgeId(e));
    }
  }
  return { nodes, edges, byId, volumeOf, outEdges, inEdges, convergence: { nodeIds: convNodes, edgeIds: convEdges } };
}

/** 高亮态（单值联合：三态互斥由结构保证，后启动者胜 = 整体覆盖） */
export type HighlightState =
  | { kind: 'none' }
  | { kind: 'trace'; origin: string }
  | { kind: 'search'; origin: string }
  | { kind: 'convergence' };

export const HL_NONE: HighlightState = { kind: 'none' };

/** 上下游追溯：双向各一次 BFS（prd2 §6），全链不限深；返回被遍历的节点与边 */
export function traceLineage(g: GraphIndex, origin: string): { nodes: Set<string>; edges: Set<string> } {
  const nodes = new Set<string>([origin]);
  const edges = new Set<string>();
  if (!g.byId.has(origin)) return { nodes, edges };
  const up = [origin];
  while (up.length) {
    const cur = up.pop()!;
    for (const e of g.inEdges.get(cur) ?? []) {
      edges.add(edgeId(e));
      if (!nodes.has(e.source)) {
        nodes.add(e.source);
        up.push(e.source);
      }
    }
  }
  const down = [origin];
  while (down.length) {
    const cur = down.pop()!;
    for (const e of g.outEdges.get(cur) ?? []) {
      edges.add(edgeId(e));
      if (!nodes.has(e.target)) {
        nodes.add(e.target);
        down.push(e.target);
      }
    }
  }
  return { nodes, edges };
}

export interface Lit {
  dimming: boolean;
  litNodes: Set<string>;
  litEdges: Set<string>;
  hoverNeighbors: Set<string>;
}

/** 由高亮态 + hover 派生渲染用集合；trace/search/convergence 触发 dim，none 不触发 */
export function deriveLit(hl: HighlightState, hoveredId: string | null, g: GraphIndex): Lit {
  const litNodes = new Set<string>();
  const litEdges = new Set<string>();
  let dimming = false;
  if (hl.kind === 'trace') {
    const t = traceLineage(g, hl.origin);
    t.nodes.forEach((n) => litNodes.add(n));
    t.edges.forEach((e) => litEdges.add(e));
    dimming = true;
  } else if (hl.kind === 'search') {
    litNodes.add(hl.origin);
    for (const e of g.inEdges.get(hl.origin) ?? []) {
      litNodes.add(e.source);
      litEdges.add(edgeId(e));
    }
    for (const e of g.outEdges.get(hl.origin) ?? []) {
      litNodes.add(e.target);
      litEdges.add(edgeId(e));
    }
    dimming = true;
  } else if (hl.kind === 'convergence') {
    g.convergence.nodeIds.forEach((n) => litNodes.add(n));
    g.convergence.edgeIds.forEach((e) => litEdges.add(e));
    dimming = true;
  }
  const hoverNeighbors = hoveredId ? neighborsOf(g, hoveredId) : new Set<string>();
  return { dimming, litNodes, litEdges, hoverNeighbors };
}

/** 悬停邻居高亮集合：节点自身 + 直接前驱 + 直接后继 */
export function neighborsOf(g: GraphIndex, id: string): Set<string> {
  const s = new Set<string>([id]);
  for (const e of g.inEdges.get(id) ?? []) s.add(e.source);
  for (const e of g.outEdges.get(id) ?? []) s.add(e.target);
  return s;
}

/** 主图入边截断（content-spec §3）：按优先级保留前 max 条，其余计数供 `+N` 角标 */
export function capInbound<T extends TechEdge>(
  edges: T[],
  max: number,
): { kept: T[]; overflow: Map<string, number> } {
  const byTarget = new Map<string, T[]>();
  for (const e of edges) {
    const list = byTarget.get(e.target);
    list ? list.push(e) : byTarget.set(e.target, [e]);
  }
  const kept: T[] = [];
  const overflow = new Map<string, number>();
  const rank = (r: Relation) => {
    const i = RELATION_PRIORITY.indexOf(r);
    return i === -1 ? RELATION_PRIORITY.length : i;
  };
  for (const [target, list] of byTarget) {
    if (list.length <= max) {
      kept.push(...list);
      continue;
    }
    const sorted = [...list].sort((a, b) => rank(a.relation) - rank(b.relation));
    kept.push(...sorted.slice(0, max));
    overflow.set(target, list.length - max);
  }
  return { kept, overflow };
}

export interface SearchEntry {
  node: TechNode;
  label: string;
  labelEn: string;
  concepts: string[];
  people: string[];
}

export interface SearchIndex {
  entries: SearchEntry[];
}

export interface SearchHit {
  node: TechNode;
  field: 'label' | 'label_en' | 'concepts' | 'people';
}

export function buildSearchIndex(nodes: TechNode[]): SearchIndex {
  return {
    entries: nodes.map((n) => ({
      node: n,
      label: n.label.toLowerCase(),
      labelEn: n.label_en.toLowerCase(),
      concepts: (n.concepts ?? []).map((c) => c.toLowerCase()),
      people: (n.people ?? []).map((p) => p.toLowerCase()),
    })),
  };
}

/** 搜索：域 = label / label_en / concepts / people；排序 = label 前缀 > label 子串 > label_en > 其余，年内升序 */
export function searchNodes(idx: SearchIndex, query: string, limit = 8): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored: { hit: SearchHit; score: number }[] = [];
  for (const e of idx.entries) {
    let score: number;
    let field: SearchHit['field'];
    if (e.label.startsWith(q)) {
      score = 0;
      field = 'label';
    } else if (e.label.includes(q)) {
      score = 1;
      field = 'label';
    } else if (e.labelEn.startsWith(q)) {
      score = 2;
      field = 'label_en';
    } else if (e.labelEn.includes(q)) {
      score = 3;
      field = 'label_en';
    } else if (e.concepts.some((c) => c.includes(q))) {
      score = 4;
      field = 'concepts';
    } else if (e.people.some((p) => p.includes(q))) {
      score = 5;
      field = 'people';
    } else {
      continue;
    }
    scored.push({ hit: { node: e.node, field }, score });
  }
  scored.sort(
    (a, b) =>
      a.score - b.score ||
      a.hit.node.year - b.hit.node.year ||
      a.hit.node.label.localeCompare(b.hit.node.label),
  );
  return scored.slice(0, limit).map((s) => s.hit);
}
