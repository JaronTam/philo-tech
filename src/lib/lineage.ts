// 家系归属（UI 优化批 2 · J-B）：8 树基准 + 无向最近树根派生 + 主进边判据 + 例外覆盖
// 口径：真源 = docs/ui-opt-scope.md §8（J-B）；色板 / 渲染 = docs/ui-spec.md §2/§3。
// 确定性约束：无随机、无 DOM、无时钟；集合遍历一律显式排序；同输入 → 同输出。
// 规则（优先级从高到低）：
//   1. master 节点 = 其在 master-master 子图中的「最近树根」（P2 冻结分区，验收硬口径）；
//   2. 其余节点 = 全图（无向）最近树根；
//   3. 距离并列 → 主进边判据（in-edge 按 relation 优先级 → source id 排序，取首个已判明归属的 source），
//      迭代至不动点；
//   4. 残余并列 / 语义修复 → meta.lineageExceptions 覆盖（人工表）。
import type { MetaFile, TechEdge, TechNode } from './types';
import { RELATION_PRIORITY } from './graph';

export interface LineageIndex {
  /** nodeId → lineageId；未归属的节点不在表中（渲染回退中性色） */
  byNode: ReadonlyMap<string, string>;
  /** lineageId → CSS 颜色值（var(--lineage-N)） */
  colorOfLineage: ReadonlyMap<string, string>;
  /** 未判明并列的节点（规则 + 例外后仍无归属；现数据 = 空表） */
  unresolved: readonly string[];
}

const rank = (r: string): number => {
  const i = RELATION_PRIORITY.indexOf(r as (typeof RELATION_PRIORITY)[number]);
  return i === -1 ? RELATION_PRIORITY.length : i;
};

/** 邻接表（有向）：source → targets（按 target id 排序） */
function adjacency(edges: readonly TechEdge[]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const e of edges) {
    const list = adj.get(e.source);
    if (list) list.push(e.target);
    else adj.set(e.source, [e.target]);
  }
  for (const list of adj.values()) list.sort();
  return adj;
}

/** BFS 距离表（给定邻接与单一源）；单源，O(V+E) */
function distances(adj: ReadonlyMap<string, string[]>, src: string): Map<string, number> {
  const dist = new Map<string, number>([[src, 0]]);
  const queue = [src];
  for (let head = 0; head < queue.length; head++) {
    const cur = queue[head];
    for (const nb of adj.get(cur) ?? []) {
      if (!dist.has(nb)) {
        dist.set(nb, dist.get(cur)! + 1);
        queue.push(nb);
      }
    }
  }
  return dist;
}

/** 无向邻接（node → 邻居，按 id 排序；自环忽略） */
function undirected(edges: readonly TechEdge[]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  const add = (a: string, b: string) => {
    if (a === b) return;
    const list = adj.get(a);
    if (list) list.push(b);
    else adj.set(a, [b]);
  };
  for (const e of edges) {
    add(e.source, e.target);
    add(e.target, e.source);
  }
  for (const list of adj.values()) list.sort();
  return adj;
}

/** 最近树根（多源）：node → { dist, roots[] }（roots 按 lineages 声明序） */
function nearestRoots(
  adj: ReadonlyMap<string, string[]>,
  roots: readonly string[],
): Map<string, { dist: number; roots: string[] }> {
  const best = new Map<string, { dist: number; roots: string[] }>();
  for (const root of roots) {
    for (const [id, d] of distances(adj, root)) {
      const b = best.get(id);
      if (!b || d < b.dist) best.set(id, { dist: d, roots: [root] });
      else if (d === b.dist && !b.roots.includes(root)) b.roots.push(root);
    }
  }
  return best;
}

/**
 * 家系索引（纯函数）：见文件头规则。lineages 缺省（无家系表）→ 空索引（fixture / 旧数据安全回落）。
 */
export function buildLineageIndex(
  nodes: readonly TechNode[],
  edges: readonly TechEdge[],
  meta: MetaFile,
): LineageIndex {
  const lineages = meta.lineages ?? [];
  const colorOfLineage = new Map(lineages.map((l) => [l.id, `var(${l.color})`]));
  if (lineages.length === 0) return { byNode: new Map(), colorOfLineage, unresolved: [] };
  const roots = lineages.map((l) => l.id);
  const byNode = new Map<string, string>();

  // 规则 1：master 冻结分区（P2 口径 = master 子图有向最近树根）
  const masterIds = new Set(nodes.filter((n) => n.master).map((n) => n.id));
  const masterEdges = edges.filter((e) => masterIds.has(e.source) && masterIds.has(e.target));
  const masterBest = nearestRoots(adjacency(masterEdges), roots);
  for (const id of masterIds) {
    const b = masterBest.get(id);
    if (b && b.roots.length === 1) byNode.set(id, b.roots[0]);
  }

  // 规则 2：其余节点 = 全图无向最近树根
  const und = undirected(edges);
  const best = nearestRoots(und, roots);
  const pending = new Map<string, string[]>(); // 并列待判
  for (const n of [...nodes].sort((a, b) => a.id.localeCompare(b.id))) {
    if (byNode.has(n.id)) continue; // master 已冻结
    const b = best.get(n.id);
    if (!b) continue; // 不可达（现数据 = 空；validate 拦截）
    if (b.roots.length === 1) byNode.set(n.id, b.roots[0]);
    else pending.set(n.id, b.roots);
  }

  // 规则 3：主进边判据（迭代至不动点；每轮用上轮快照，与遍历顺序无关）
  const inEdges = new Map<string, TechEdge[]>();
  for (const e of edges) {
    const list = inEdges.get(e.target);
    if (list) list.push(e);
    else inEdges.set(e.target, [e]);
  }
  for (const list of inEdges.values()) {
    list.sort((a, b) => rank(a.relation) - rank(b.relation) || a.source.localeCompare(b.source));
  }
  for (let pass = 0; pass < pending.size + 1 && pending.size > 0; pass++) {
    const snapshot = new Map(byNode);
    let grew = false;
    for (const id of [...pending.keys()].sort()) {
      for (const e of inEdges.get(id) ?? []) {
        const src = snapshot.get(e.source);
        if (src) {
          byNode.set(id, src);
          pending.delete(id);
          grew = true;
          break;
        }
      }
    }
    if (!grew) break;
  }

  // 规则 4：人为例外（覆盖以上一切）
  for (const [nodeId, lineageId] of Object.entries(meta.lineageExceptions ?? {})) {
    if (colorOfLineage.has(lineageId)) byNode.set(nodeId, lineageId);
  }

  return {
    byNode,
    colorOfLineage,
    unresolved: [...pending.keys()].filter((id) => !byNode.has(id)).sort(),
  };
}

/** 便捷：节点色值（未归属 → undefined，渲染层回退中性色） */
export function colorOf(index: LineageIndex, nodeId: string): string | undefined {
  const lineageId = index.byNode.get(nodeId);
  return lineageId ? index.colorOfLineage.get(lineageId) : undefined;
}
