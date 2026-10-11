// 边命中（UI 优化批 3.5 · J-E2 · D-20）：几何「最近边」判定，替代透明命中层叠加
// 口径：真源 = docs/ui-opt-b35-scope.md §0（J-E2 批 A）；交互描述 = docs/ui-spec.md §2。
// 约束：纯函数、确定性（平局按 edgeId 字典序）；输入坐标 = flow 空间，阈值由调用方按屏幕 px / zoom 换算。
import type { RoutePoint } from './route';

export interface HitCandidate {
  edgeId: string;
  points: readonly RoutePoint[];
}

/** 点到线段距离平方（全流程无开方，比较用） */
function distSqToSegment(p: RoutePoint, a: RoutePoint, b: RoutePoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  let t = 0;
  if (lenSq > 0) {
    t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
  }
  const cx = a.x + t * dx;
  const cy = a.y + t * dy;
  const ex = p.x - cx;
  const ey = p.y - cy;
  return ex * ex + ey * ey;
}

/**
 * 最近边（阈值内）：返回 edgeId；无命中 → null。
 * 平局（距离差 < 1e-9）取 edgeId 字典序小者（确定性）。
 */
export function nearestEdge(
  p: RoutePoint,
  edges: readonly HitCandidate[],
  maxDist: number,
): string | null {
  const EPS = 1e-9;
  let bestId: string | null = null;
  let bestD = maxDist * maxDist;
  for (const e of edges) {
    let d = Infinity;
    for (let i = 1; i < e.points.length; i++) {
      const s = distSqToSegment(p, e.points[i - 1], e.points[i]);
      if (s < d) d = s;
    }
    const better =
      bestId === null ? d < bestD : d < bestD - EPS || (d < bestD + EPS && e.edgeId < bestId);
    if (better) {
      bestD = d;
      bestId = e.edgeId;
    }
  }
  return bestId;
}
