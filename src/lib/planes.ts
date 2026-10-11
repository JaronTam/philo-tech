// 分层（UI 优化批 3 · J-D1 / J-D2）：家系平面（z 轴语义 = 家系，z ≡ 色）+ 跨层边入口 / 出口标记
// 口径：真源 = docs/ui-opt-scope.md §8（J-D1 / J-D2）；渲染描述 = docs/ui-spec.md §2/§5。
// 确定性约束：无随机、无 DOM、无时钟；标记按 (dir, edgeId) 排序；同输入 → 同输出。
import { edgeId } from './graph';
import type { TechEdge } from './types';

export interface PlaneMarker {
  /** 边 id（source->target） */
  edgeId: string;
  /** 'in' = 入口（本层节点为 target，线自对端平面进入）；'out' = 出口（本层节点为 source，线离开本层） */
  dir: 'in' | 'out';
  /** 对端家系 id（标记色 = 对端家系色，ui-spec §2） */
  other: string;
}

/**
 * 跨层边标记（视图内渲染边集 × 平面）：两端家系不同且恰有一端在本层 → 本层端点 1 个标记。
 * 两端都不在本层的边不产生标记（过滤视图下不可见）。
 */
export function buildPlaneMarkers(
  edges: readonly TechEdge[],
  byNode: ReadonlyMap<string, string>,
  plane: string,
): Map<string, PlaneMarker[]> {
  const out = new Map<string, PlaneMarker[]>();
  for (const e of edges) {
    const s = byNode.get(e.source) === plane;
    const t = byNode.get(e.target) === plane;
    if (s === t) continue;
    const nodeId = s ? e.source : e.target;
    const marker: PlaneMarker = {
      edgeId: edgeId(e),
      dir: s ? 'out' : 'in',
      other: byNode.get(s ? e.target : e.source)!,
    };
    const list = out.get(nodeId);
    if (list) list.push(marker);
    else out.set(nodeId, [marker]);
  }
  for (const list of out.values()) {
    list.sort((a, b) => (a.dir === b.dir ? a.edgeId.localeCompare(b.edgeId) : a.dir === 'in' ? -1 : 1));
  }
  return out;
}

/** 视图内出现的平面（按 lineages 声明序；无归属节点不计） */
export function planesInView(
  nodeIds: Iterable<string>,
  byNode: ReadonlyMap<string, string>,
  order: readonly string[],
): string[] {
  const present = new Set<string>();
  for (const id of nodeIds) {
    const p = byNode.get(id);
    if (p !== undefined) present.add(p);
  }
  return order.filter((p) => present.has(p));
}
