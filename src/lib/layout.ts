import type { Layer, MasterCandidate } from './types';
import { THEORY_COLUMN } from './types';
import { linearRate, type Segment, type VolumeDef } from './volumes';

// 坐标常量：真源 = docs/ui-spec.md §1
export const COLUMN_WIDTH = 112;
export const MIN_LANE_COLS = 3;
export const LANE_EXTRA_PAD = 32;
export const NODE_MAX_WIDTH = 100;
export const CANVAS_MARGIN = 24;
export const AVOID_LIMIT = 20; // 同列避让 y 偏移 ≤ ±20px
export const BLOCK_MIN_PX = 35; // ui-spec §1「35–55px」参考区间下沿（非钳制值）
export const BLOCK_MAX_PX = 55; // ui-spec §1「35–55px」参考区间上沿
export const CONCEPTS_RESERVE_PX = 34; // M3 全量数据带灰字两行的预留量（2×15+4）
// 前史理论单列 x 槽位（content-spec §4：前史理论节点不入六泳道，独立单列）
export const THEORY_COLUMN_WIDTH = COLUMN_WIDTH + LANE_EXTRA_PAD;

export const LANES: { layer: Layer; title: string }[] = [
  { layer: 'L0_hardware', title: 'L0 半导体 / 体系结构' },
  { layer: 'L1_system', title: 'L1 操作系统 / 网络协议' },
  { layer: 'L2_language', title: 'L2 语言 / 编译器 / 运行时' },
  { layer: 'L3_data', title: 'L3 数据库 / 分布式数据' },
  { layer: 'L4_delivery', title: 'L4 Web / 容器 / 交付' },
  { layer: 'L5_ai', title: 'L5 深度学习 / 大模型' },
];

export type ColumnRegistry = Record<Layer, string[]>;

/** 布局上下文：withTheory = 视图含理论节点（含则最左多一条前史单列） */
export interface LayoutCtx {
  registry: ColumnRegistry;
  withTheory: boolean;
}

export function laneWidths(registry: ColumnRegistry): number[] {
  return LANES.map(({ layer }) => {
    const cols = Math.max(registry[layer]?.length ?? 0, MIN_LANE_COLS);
    return cols * COLUMN_WIDTH + LANE_EXTRA_PAD;
  });
}

export function laneBases(ctx: LayoutCtx): number[] {
  let x = CANVAS_MARGIN + (ctx.withTheory ? THEORY_COLUMN_WIDTH : 0);
  return laneWidths(ctx.registry).map((w) => {
    const base = x;
    x += w;
    return base;
  });
}

export function totalWidth(ctx: LayoutCtx): number {
  const lanes = laneWidths(ctx.registry).reduce((s, w) => s + w, 0);
  const theory = ctx.withTheory ? THEORY_COLUMN_WIDTH : 0;
  return lanes + theory + CANVAS_MARGIN * 2;
}

export function xForColumn(ctx: LayoutCtx, layer: Layer, column: string): number {
  const inset = (COLUMN_WIDTH - NODE_MAX_WIDTH) / 2;
  if (column === THEORY_COLUMN) return CANVAS_MARGIN + inset;
  const laneIdx = LANES.findIndex((l) => l.layer === layer);
  const base = laneBases(ctx)[laneIdx] ?? CANVAS_MARGIN;
  const cols = ctx.registry[layer] ?? [];
  const colIdx = Math.max(cols.indexOf(column), 0);
  return base + colIdx * COLUMN_WIDTH + inset;
}

export function clampYear(def: VolumeDef, year: number): number {
  return Math.min(Math.max(year, def.start), def.end - 1);
}

/** Y = year 各卷独立刻度（主图为分段压缩） */
export function yForYear(def: VolumeDef, year: number): number {
  const y = clampYear(def, year);
  if (!def.segments) return (y - def.start) * linearRate(def);
  let acc = 0;
  for (const seg of def.segments) {
    if (y >= seg.end) {
      acc += (seg.end - seg.start) * seg.pxPerYear;
    } else {
      acc += (y - seg.start) * seg.pxPerYear;
      break;
    }
  }
  return acc;
}

export interface Tick {
  year: number;
  y: number;
  label: boolean;
}

const STEP_CANDIDATES = [1, 2, 5, 10, 20, 25, 50, 100];

function pickStep(pxPerYear: number, minLabelPx = 48): number {
  return STEP_CANDIDATES.find((s) => s * pxPerYear >= minLabelPx) ?? 100;
}

export function ticksFor(def: VolumeDef): Tick[] {
  const ticks: Tick[] = [];
  const segs: Segment[] = def.segments ?? [
    { start: def.start, end: def.end, pxPerYear: linearRate(def) },
  ];
  for (const seg of segs) {
    const step = pickStep(seg.pxPerYear);
    const first = Math.ceil(seg.start / step) * step;
    for (let year = first; year < seg.end; year += step) {
      ticks.push({ year, y: yForYear(def, year), label: true });
    }
  }
  return ticks;
}

/** 节点块高估算（主标按 100px 折行 × 20px/行 + 灰字 ≤2 行 × 15px + 4px）—— ui-spec §2 字号表 */
export function estimateBlockHeight(label: string, concepts: string[] = []): number {
  const charW = (ch: string) => (/[⺀-鿿豈-﫿＀-￯《》「」…]/.test(ch) ? 1 : 0.6);
  const width = (s: string) => [...s].reduce((sum, ch) => sum + charW(ch), 0);
  const labelLines = Math.max(1, Math.ceil((width(label) * 14) / NODE_MAX_WIDTH));
  let h = labelLines * 20;
  if (concepts.length > 0) {
    const cLines = Math.min(
      2,
      Math.max(1, Math.ceil((width(concepts.join(' · ')) * 11) / NODE_MAX_WIDTH)),
    );
    h += cLines * 15 + 4;
  }
  return h;
}

export interface Placeable {
  label: string;
  layer: Layer;
  column: string;
  year: number;
  concepts?: string[];
}

export interface Placed<T extends Placeable> {
  item: T;
  x: number;
  y: number;
  naturalY: number;
  offset: number;
  blockH: number;
}

export interface Violation {
  layer: Layer;
  column: string;
  upper: string;
  lower: string;
  naturalGap: number;
  finalGap: number;
  requiredGap: number;
  deficit: number;
}

/**
 * 同列避让（prd2 §5）：按年份排序后贪心下推，单节点偏移 ≤ ±20px；
 * 间距要求 = max(上方节点块高, minGap)；仍不足者登记 violation
 * （对应「拉伸该卷 H 并重算 px/年」；主图上「只加高该段」）。
 */
export function placeInColumns<T extends Placeable>(
  items: T[],
  def: VolumeDef,
  ctx: LayoutCtx,
  minGap = 0,
  avoidLimit = AVOID_LIMIT,
  blockReserve = 0,
): { placed: Placed<T>[]; violations: Violation[] } {
  const inRange = items.filter((it) => it.year >= def.start && it.year < def.end);
  const groups = new Map<string, T[]>();
  for (const it of inRange) {
    const key = `${it.layer}/${it.column}`;
    const g = groups.get(key);
    if (g) g.push(it);
    else groups.set(key, [it]);
  }

  const placed: Placed<T>[] = [];
  const violations: Violation[] = [];
  for (const group of groups.values()) {
    const sorted = [...group].sort((a, b) => a.year - b.year || a.label.localeCompare(b.label));
    let prev: Placed<T> | null = null;
    for (const item of sorted) {
      const naturalY = yForYear(def, item.year);
      const blockH = estimateBlockHeight(item.label, item.concepts) + blockReserve;
      let y = naturalY;
      if (prev) {
        const required = Math.max(prev.blockH, minGap);
        const minY = prev.y + required;
        if (y < minY) y = naturalY + Math.min(minY - naturalY, avoidLimit);
        const gap = y - prev.y;
        if (gap < required - 0.05) {
          violations.push({
            layer: item.layer,
            column: item.column,
            upper: prev.item.label,
            lower: item.label,
            naturalGap: naturalY - prev.naturalY,
            finalGap: gap,
            requiredGap: required,
            deficit: required - gap,
          });
        }
      }
      const p: Placed<T> = {
        item,
        x: xForColumn(ctx, item.layer, item.column),
        y,
        naturalY,
        offset: y - naturalY,
        blockH,
      };
      placed.push(p);
      prev = p;
    }
  }
  return { placed, violations };
}

/** 主图段界（折弯标识线位置） */
export function segmentBoundaries(def: VolumeDef): { year: number; y: number; pxPerYear: number }[] {
  if (!def.segments) return [];
  return def.segments.map((s) => ({
    year: s.start,
    y: yForYear(def, s.start),
    pxPerYear: s.pxPerYear,
  }));
}

export function toPlaceables(cands: MasterCandidate[]): Placeable[] {
  return cands.map((c) => ({ label: c.label, layer: c.layer, column: c.column, year: c.year }));
}

export { THEORY_COLUMN };
