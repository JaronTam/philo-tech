import type { EdgeProps } from '@xyflow/react';
import { useInteraction } from '../lib/interaction';
import { legacyPath, type Route } from '../lib/route';
import type { Relation } from '../lib/types';

export interface TechEdgeData {
  relation: Relation;
  citation: string;
  sourceLabel?: string;
  targetLabel?: string;
  /** 统一几何路由（App memo 预算，J-A3/K2）；缺省时按旧式算法兜底 */
  route?: Route;
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

/** 边 = 正交折线，无箭头（ui-spec §2）；路径 = 统一几何路由（K3，退化时即旧式中线式）；完整 tooltip 由 App 层 EdgeTooltip 渲染 */
export function TechEdge({ id, sourceX, sourceY, targetX, targetY, data }: EdgeProps) {
  const d = data as unknown as TechEdgeData;
  const { lit } = useInteraction();
  const dim = lit.dimming && !lit.litEdges.has(id);
  const path = d.route?.path ?? legacyPath(sourceX, sourceY, targetX, targetY);
  const s = STYLE[d.relation];
  return (
    <>
      <path
        d={path}
        fill="none"
        stroke={s.stroke}
        strokeWidth={s.width}
        strokeDasharray={s.dash}
        opacity={dim ? 0.1 : 1}
      />
      {/* 透明加宽命中层：hover/click 经 RF 的边事件冒泡（视觉层保持 1） */}
      <path d={path} fill="none" stroke="transparent" strokeWidth={14} />
    </>
  );
}
