import type { VolumeKey } from './types';

// 卷定义与刻度：真源 = docs/ui-spec.md §1（与 prd2 §4 冲突时以 prd2 为准）
export interface Segment {
  start: number;
  end: number; // 半开 [start, end)
  pxPerYear: number;
}

export interface VolumeDef {
  key: VolumeKey;
  title: string;
  start: number;
  end: number; // 半开 [start, end)
  height: number; // 画布纵向像素（主图 2800 含边距，段高合计 2713）
  segments?: Segment[]; // 仅主图：分段压缩刻度，段界 = 卷界
}

export const VOLUMES: VolumeDef[] = [
  {
    key: 'main',
    title: '主图',
    start: 1854,
    end: 2027,
    height: 2800,
    segments: [
      { start: 1854, end: 1947, pxPerYear: 6.8 }, // M1 实测：6.3 → 6.8（真实标签主标轮缺口 39.2px）
      { start: 1947, end: 1980, pxPerYear: 12 }, // 396 ✓
      { start: 1980, end: 2000, pxPerYear: 25 }, // 500 ✓
      { start: 2000, end: 2015, pxPerYear: 35 }, // 525 ✓（主图按 LOD 主标块高标定）
      { start: 2015, end: 2027, pxPerYear: 55 }, // 660 ✓
    ],
  },
  { key: 'pre', title: '前史', start: 1854, end: 1947, height: 2160 }, // M0 实测：2000 → 2160（px/年 23.2）
  { key: 'v1', title: '卷 1', start: 1947, end: 1980, height: 2000 },
  { key: 'v2', title: '卷 2', start: 1980, end: 2000, height: 2000 },
  { key: 'v3', title: '卷 3', start: 2000, end: 2015, height: 2000 },
  { key: 'v4', title: '卷 4', start: 2015, end: 2027, height: 2000 },
];

export const VOLUME_BY_KEY: Record<VolumeKey, VolumeDef> = Object.fromEntries(
  VOLUMES.map((v) => [v.key, v]),
) as Record<VolumeKey, VolumeDef>;

export function segmentHeights(def: VolumeDef): number {
  if (!def.segments) return def.height;
  return def.segments.reduce((s, seg) => s + (seg.end - seg.start) * seg.pxPerYear, 0);
}

export function linearRate(def: VolumeDef): number {
  return def.height / (def.end - def.start);
}
