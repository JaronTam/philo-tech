import type { EdgeProps } from '@xyflow/react';
import { useInteraction } from '../lib/interaction';
import { legacyPath, type Route } from '../lib/route';
import { edgeSeed, sketchPaths } from '../lib/sketch';
import type { Relation } from '../lib/types';

export interface TechEdgeData {
  relation: Relation;
  citation: string;
  sourceLabel?: string;
  targetLabel?: string;
  /** 统一几何路由（App memo 预算，J-A3/K2）；缺省时按旧式算法兜底 */
  route?: Route;
  /** 血统线（两端同家系，J-B）：描边取家系色 + 手绘层（J-C） */
  lineageEdge?: boolean;
  /** 家系色值（var(--lineage-N)，App 查表注入）；跨家系 / 无家系 = undefined → 中性描边 */
  lineageColor?: string;
}

/** 线型 / 线宽：prd2 §3.5；色改由家系承载（J-B：relation 只留线型 / 线宽，accent 让位给选中 / 高亮） */
const STYLE: Record<Relation, { width: number; dash?: string }> = {
  enables: { width: 2.5 },
  direct_fork: { width: 1.5 },
  conceptual_inf: { width: 1.5, dash: '4 4' },
  paradigm_shift: { width: 2 }, // 原 --accent 描边随家系取色，线宽 2 保留（§8 J-B）
  convergence: { width: 1.5 },
  composition: { width: 1.5, dash: '2 2' },
};

/** 跨家系 / 无家系边 = 中性色（「色 = 家系」的边界边不属于任何家系） */
const NEUTRAL = 'var(--ink-soft)';

/**
 * 边 = 正交折线，无箭头（ui-spec §2）；路径 = 统一几何路由（K3，退化时即旧式中线式）。
 * 描边色 = 家系色（血统线）/ 中性（跨家系）；血统线与 BFS 追溯态高亮边走 rough 手绘层（J-C），
 * 其余保持精确直线。透明加宽命中层恒为精确 path（hover/click 经 RF 的边事件冒泡）。
 * 完整 tooltip 由 App 层 EdgeTooltip 渲染。
 */
export function TechEdge({ id, sourceX, sourceY, targetX, targetY, data }: EdgeProps) {
  const d = data as unknown as TechEdgeData;
  const { lit, traced } = useInteraction();
  const dim = lit.dimming && !lit.litEdges.has(id);
  const path = d.route?.path ?? legacyPath(sourceX, sourceY, targetX, targetY);
  const s = STYLE[d.relation];
  // style 注入（而非 stroke 属性）：rough / var() 兼容 —— SVG 表现属性不吃 var()，CSS 声明吃
  const stroke = d.lineageColor ?? NEUTRAL;
  const rough = Boolean(d.lineageEdge) || (traced && lit.litEdges.has(id));
  const opacity = dim ? 0.1 : 1;
  return (
    <>
      {rough ? (
        <g opacity={opacity} strokeLinecap="round" strokeLinejoin="round">
          {sketchPaths(path, edgeSeed(id)).map((p, i) => (
            <path key={i} d={p} fill="none" style={{ stroke }} strokeWidth={s.width} strokeDasharray={s.dash} />
          ))}
        </g>
      ) : (
        <path
          d={path}
          fill="none"
          style={{ stroke }}
          strokeWidth={s.width}
          strokeDasharray={s.dash}
          opacity={opacity}
        />
      )}
      {/* 透明加宽命中层：hover/click 经 RF 的边事件冒泡（视觉层保持 1） */}
      <path d={path} fill="none" stroke="transparent" strokeWidth={14} />
    </>
  );
}
