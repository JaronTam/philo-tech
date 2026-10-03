import type { EdgeProps } from '@xyflow/react';
import type { Relation } from '../lib/types';

export interface TechEdgeData {
  relation: Relation;
  citation: string;
  sourceLabel?: string;
  targetLabel?: string;
}

/** 线型 / 线宽：prd2 §3.5 */
const STYLE: Record<Relation, { stroke: string; width: number; dash?: string }> = {
  enables: { stroke: 'var(--ink-soft)', width: 2.5 },
  direct_fork: { stroke: 'var(--ink-soft)', width: 1.5 },
  conceptual_inf: { stroke: 'var(--ink-soft)', width: 1.5, dash: '4 4' },
  paradigm_shift: { stroke: 'var(--accent)', width: 2 },
  convergence: { stroke: 'var(--ink-soft)', width: 1.5 },
  composition: { stroke: 'var(--ink-soft)', width: 1.5, dash: '2 2' },
};

// 同列上下路由的侧向偏移：节点半宽 50 + 6px 间隙（避开相邻列 112px 槽位）
const SIDE = 56;

/** 边 = 正交折线（横-竖-横；同列取右侧旁路），无箭头（ui-spec §2）；引用暂用原生 title（完整 tooltip 归 M2） */
export function TechEdge({ sourceX, sourceY, targetX, targetY, data }: EdgeProps) {
  const d = data as unknown as TechEdgeData;
  let path: string;
  if (Math.abs(targetX - sourceX) < 2) {
    const rx = sourceX + SIDE;
    path = `M ${sourceX},${sourceY} L ${sourceX},${sourceY + 6} L ${rx},${sourceY + 6} L ${rx},${targetY - 6} L ${targetX},${targetY - 6} L ${targetX},${targetY}`;
  } else {
    const my = (sourceY + targetY) / 2;
    path = `M ${sourceX},${sourceY} L ${sourceX},${my} L ${targetX},${my} L ${targetX},${targetY}`;
  }
  const s = STYLE[d.relation];
  return (
    <>
      <path
        d={path}
        fill="none"
        stroke={s.stroke}
        strokeWidth={s.width}
        strokeDasharray={s.dash}
      />
      <path d={path} fill="none" stroke="transparent" strokeWidth={14}>
        <title>
          {`${d.sourceLabel ?? ''} → ${d.targetLabel ?? ''} · ${d.relation}\n${d.citation}`}
        </title>
      </path>
    </>
  );
}
