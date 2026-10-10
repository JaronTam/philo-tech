// 统一几何（UI 优化批 1 · K1 / K2 / K3）：布局占用图 + 确定性路由纯函数
// 口径：真源 = docs/ui-opt-scope.md §8（K1–K3 / K8）；渲染描述 = docs/ui-spec.md §2。
// 约束：同输入 → 同输出（候选顺序写死、无随机、无 DOM 测量）；路由面 = 全量块（不受 LOD 影响，K8）。
import { NODE_MAX_WIDTH, type Placed, type Placeable } from './layout';

/** 占用块区间（K1）：按列单份；不存 plane 键 —— 平面 = 查询谓词（K6） */
export interface BlockInterval {
  y0: number;
  y1: number;
  nodeId: string;
}

/** 列键 = `${layer}/${column}`，与 layout.ts 分组键一致 */
export type ColumnKey = string;

export type Occupancy = ReadonlyMap<ColumnKey, readonly BlockInterval[]>;

export interface RouteScaffold {
  /** 占用图（K1 结构） */
  occupancy: Occupancy;
  /** 列几何：列内节点左边缘 x（块矩形 = [x, x + NODE_MAX_WIDTH] × [y0, y1]） */
  columnX: ReadonlyMap<ColumnKey, number>;
}

export interface RouteEndpoint {
  x: number;
  y: number;
  column: ColumnKey;
}

export interface Route {
  /** SVG 折线（端点口径 = 源块底中 → 目标块顶中，与 TechEdge 收到的 RF 锚点同约定） */
  path: string;
  crossings: number;
  bends: number;
  length: number;
  /** true = 新式候选全不优于旧式，已退化旧式路由（K3） */
  degenerate: boolean;
}

/** 同列侧向旁路偏移（= TechEdge 旧同列旁路：节点半宽 + 6px 列间隙） */
const SIDE = NODE_MAX_WIDTH / 2 + 6;
const LENGTH_EPS = 1e-6;

/** 由实排坐标构建路由脚手架（occupancy + 列几何）；纯函数 */
export function buildRouteScaffold(placed: readonly Placed<Placeable>[]): RouteScaffold {
  const occupancy = new Map<ColumnKey, BlockInterval[]>();
  const columnX = new Map<ColumnKey, number>();
  for (const p of placed) {
    const key = `${p.item.layer}/${p.item.column}`;
    const interval: BlockInterval = { y0: p.y, y1: p.y + p.blockH, nodeId: p.item.id ?? p.item.label };
    const list = occupancy.get(key);
    if (list) list.push(interval);
    else occupancy.set(key, [interval]);
    columnX.set(key, p.x);
  }
  return { occupancy, columnX };
}

interface ColumnBlocks {
  x0: number;
  x1: number;
  intervals: readonly BlockInterval[];
}

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface RoutePoint {
  x: number;
  y: number;
}

export interface PathMetrics {
  crossings: number;
  bends: number;
  length: number;
}

function indexColumns(scaffold: RouteScaffold): ColumnBlocks[] {
  const cols: ColumnBlocks[] = [];
  for (const [key, intervals] of scaffold.occupancy) {
    const x = scaffold.columnX.get(key);
    if (x === undefined) continue; // 防御：无列几何的占用条目不参与判交
    cols.push({ x0: x, x1: x + NODE_MAX_WIDTH, intervals });
  }
  return cols;
}

/** 段 × 块矩形严格内部相交（贴边不算）；命中的块按 nodeId 收进 out */
function collectCrossings(seg: Segment, cols: ColumnBlocks[], out: Set<string>): void {
  const xa = Math.min(seg.x1, seg.x2);
  const xb = Math.max(seg.x1, seg.x2);
  const ya = Math.min(seg.y1, seg.y2);
  const yb = Math.max(seg.y1, seg.y2);
  for (const col of cols) {
    if (seg.x1 === seg.x2) {
      if (!(seg.x1 > col.x0 && seg.x1 < col.x1)) continue;
      for (const iv of col.intervals) {
        if (Math.max(ya, iv.y0) < Math.min(yb, iv.y1)) out.add(iv.nodeId);
      }
    } else {
      if (!(Math.max(xa, col.x0) < Math.min(xb, col.x1))) continue;
      for (const iv of col.intervals) {
        if (seg.y1 > iv.y0 && seg.y1 < iv.y1) out.add(iv.nodeId);
      }
    }
  }
}

/** 去重顶点 + 去共线中间点；返回 a→b→a 折返（贴合堆叠节点对的 0 穿字往返）不塌缩为零长 */
function simplify(points: readonly RoutePoint[]): RoutePoint[] {
  const dedup: RoutePoint[] = [];
  for (const p of points) {
    const last = dedup[dedup.length - 1];
    if (last && Math.abs(last.x - p.x) < 1e-9 && Math.abs(last.y - p.y) < 1e-9) continue;
    dedup.push(p);
  }
  const out: RoutePoint[] = [];
  for (let i = 0; i < dedup.length; i++) {
    const a = out[out.length - 1];
    const b = dedup[i];
    const c = dedup[i + 1];
    if (a && c && !(a.x === c.x && a.y === c.y) && ((a.x === b.x && b.x === c.x) || (a.y === b.y && b.y === c.y))) continue;
    out.push(b);
  }
  return out;
}

/** 判据（K3 字典序）：穿字数 → 折点数 → 总长；points = 化简后的顶点（路径输出同源） */
function evaluate(points: readonly RoutePoint[], cols: ColumnBlocks[]): PathMetrics & { points: RoutePoint[] } {
  const pts = simplify(points);
  const hits = new Set<string>();
  let length = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    collectCrossings({ x1: a.x, y1: a.y, x2: b.x, y2: b.y }, cols, hits);
    length += Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
  }
  return { crossings: hits.size, bends: Math.max(0, pts.length - 2), length, points: pts };
}

/**
 * 旧式路由（退化基线，= TechEdge 原算法）：
 * 同列（|Δx| < 2）= 右侧旁路（SIDE = 56，两端 6px 短折）；跨列 = 中线式 my = (sourceY + targetY) / 2。
 */
export function legacyPoints(source: RoutePoint, target: RoutePoint): RoutePoint[] {
  const { x: sx, y: sy } = source;
  const { x: tx, y: ty } = target;
  if (Math.abs(tx - sx) < 2) {
    const rx = sx + SIDE;
    return [
      { x: sx, y: sy },
      { x: sx, y: sy + 6 },
      { x: rx, y: sy + 6 },
      { x: rx, y: ty - 6 },
      { x: tx, y: ty - 6 },
      { x: tx, y: ty },
    ];
  }
  const my = (sy + ty) / 2;
  return [
    { x: sx, y: sy },
    { x: sx, y: my },
    { x: tx, y: my },
    { x: tx, y: ty },
  ];
}

/** 旧式路径串（TechEdge 兜底渲染用） */
export function legacyPath(sx: number, sy: number, tx: number, ty: number): string {
  return toPath(legacyPoints({ x: sx, y: sy }, { x: tx, y: ty }));
}

function toPath(points: readonly RoutePoint[]): string {
  const fmt = (n: number) => `${Math.round(n * 100) / 100}`;
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${fmt(p.x)},${fmt(p.y)}`).join(' ');
}

/** 竖直走廊候选（写死顺序）：列右间隙（= 块右缘 + 6px，即中心 + SIDE）→ 列左间隙 */
function corridorXs(colX: number): [number, number] {
  return [colX + NODE_MAX_WIDTH + 6, colX - 6];
}

/** 横段走廊 y 候选（写死顺序）：中线 → 端点 y → 跨越区内各列块间隙中点（近中线优先） */
function corridorYs(
  c1: number,
  c2: number,
  sy: number,
  ty: number,
  scaffold: RouteScaffold,
): number[] {
  const lo = Math.min(sy, ty);
  const hi = Math.max(sy, ty);
  const my = (sy + ty) / 2;
  const xa = Math.min(c1, c2);
  const xb = Math.max(c1, c2);
  const set = new Set<number>([my, lo, hi]);
  for (const [key, list] of scaffold.occupancy) {
    const X = scaffold.columnX.get(key);
    if (X === undefined) continue;
    if (X + NODE_MAX_WIDTH <= xa || X >= xb) continue; // 横段不经过该列
    const sorted = [...list].sort((a, b) => a.y0 - b.y0);
    for (let i = 0; i < sorted.length; i++) {
      const gapLo = i === 0 ? -1e9 : sorted[i - 1].y1;
      const gapHi = sorted[i].y0;
      const mid = (gapLo + gapHi) / 2;
      if (Number.isFinite(mid) && mid > lo && mid < hi) set.add(mid);
    }
  }
  return [...set].sort((a, b) => Math.abs(a - my) - Math.abs(b - my) || a - b);
}

/** 候选路径族：同列 = 列侧旁路（3 点）；跨列 = 源侧走廊 → 横段走廊 y → 目标侧走廊（6 点，退化塌缩由 simplify 处理） */
function candidateRoutes(source: RouteEndpoint, target: RouteEndpoint, scaffold: RouteScaffold): RoutePoint[][] {
  const scX = scaffold.columnX.get(source.column);
  const tcX = scaffold.columnX.get(target.column);
  if (scX === undefined || tcX === undefined) return [];
  const out: RoutePoint[][] = [];
  if (source.column === target.column) {
    for (const c of corridorXs(scX)) {
      out.push([
        { x: source.x, y: source.y },
        { x: c, y: source.y },
        { x: c, y: target.y },
        { x: target.x, y: target.y },
      ]);
    }
    return out;
  }
  for (const c1 of corridorXs(scX)) {
    for (const c2 of corridorXs(tcX)) {
      for (const ym of corridorYs(c1, c2, source.y, target.y, scaffold)) {
        out.push([
          { x: source.x, y: source.y },
          { x: c1, y: source.y },
          { x: c1, y: ym },
          { x: c2, y: ym },
          { x: c2, y: target.y },
          { x: target.x, y: target.y },
        ]);
      }
    }
  }
  return out;
}

/** 路径判据复算（measure「边穿字」指标与验收共用同一口径） */
export function pathMetrics(points: readonly RoutePoint[], scaffold: RouteScaffold): PathMetrics {
  const m = evaluate(points, indexColumns(scaffold));
  return { crossings: m.crossings, bends: m.bends, length: m.length };
}

/**
 * 单边路由：候选按 K3 字典序取优；新不优于旧则退化旧式（degenerate = true，路径 = 旧式）。
 * 端点 = 源块底中 (x + 50, y + blockH) → 目标块顶中 (x + 50, y)，与 RF 传给 TechEdge 的锚点同约定。
 */
export function routeEdge(source: RouteEndpoint, target: RouteEndpoint, scaffold: RouteScaffold): Route {
  const cols = indexColumns(scaffold);
  const legacy = evaluate(legacyPoints(source, target), cols);
  let best = legacy;
  for (const cand of candidateRoutes(source, target, scaffold)) {
    const m = evaluate(cand, cols);
    if (
      m.crossings < best.crossings ||
      (m.crossings === best.crossings && m.bends < best.bends) ||
      (m.crossings === best.crossings && m.bends === best.bends && m.length < best.length - LENGTH_EPS)
    ) {
      best = m;
    }
  }
  // best 未被任何候选取代 ⇒ 退化旧式（K3「新不优于旧则退化」）
  const degenerate = best === legacy;
  return { path: toPath(best.points), crossings: best.crossings, bends: best.bends, length: best.length, degenerate };
}
