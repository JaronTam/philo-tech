import { Handle, Position, useStore, type NodeProps } from '@xyflow/react';
import { NODE_MAX_WIDTH } from '../lib/layout';
import { useHover, useInteraction } from '../lib/interaction';

export type Weight = 'epic' | 'major' | 'minor';

export interface TechBlockData {
  label: string;
  concepts?: string[];
  weight: Weight;
  layer: string;
  hideConcepts?: boolean;
}

const FONT: Record<Weight, { size: number; weight: number; color?: string }> = {
  epic: { size: 16, weight: 700 },
  major: { size: 14, weight: 500 },
  minor: { size: 12, weight: 400, color: 'var(--ink-soft)' },
};

const HANDLE_STYLE = {
  opacity: 0,
  width: 1,
  height: 1,
  minWidth: 0,
  minHeight: 0,
  border: 'none',
  background: 'transparent',
} as const;

/**
 * 节点 = 纯文本块：主标 + 灰字 concepts（≤2 行，ui-spec §2）；LOD：scale < 0.75 隐藏灰字、< 0.5 隐藏 minor（ui-spec §7）。
 * 点击/悬停挂在内层 div（RF 节点级事件会把全画布 wrapper 置 pointer-events:all，吞掉 pane 点击——见 M2 计划）。
 */
export function TechBlock({ id, data }: NodeProps) {
  const d = data as unknown as TechBlockData;
  // 只订阅 zoom：useViewport 会在每帧 pan 时重渲染
  const zoom = useStore((s) => s.transform[2]);
  const { selectedId, flashId, lit, inboundBadge, onSelect } = useInteraction();
  const { hoveredId, neighbors, hover } = useHover();

  if (d.weight === 'minor' && zoom < 0.5) return null;

  const dim = lit.dimming && !lit.litNodes.has(id);
  const hovered = hoveredId === id;
  const neighbor = !hovered && neighbors.has(id);
  const selected = selectedId === id;
  const badge = inboundBadge.get(id) ?? 0;
  const f = FONT[d.weight];

  return (
    <div
      data-node-id={id}
      className={flashId === id ? 'tech-flash' : undefined}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onMouseEnter={() => hover(id)}
      onMouseLeave={() => hover(null)}
      style={{
        width: NODE_MAX_WIDTH,
        position: 'relative',
        pointerEvents: 'auto', // RF wrapper 为 pointer-events:none（M2 计划「潜在缺陷 #2」）
        cursor: 'pointer',
        outline: selected ? '2px solid var(--accent)' : 'none',
        outlineOffset: 2,
      }}
    >
      <div
        style={{
          opacity: dim ? 0.1 : 1,
          background: hovered ? '#00000008' : neighbor ? '#00000004' : 'transparent',
        }}
      >
        <div
          style={{
            fontSize: f.size,
            fontWeight: f.weight,
            lineHeight: '20px',
            color: f.color ?? 'var(--ink)',
          }}
        >
          {d.label}
        </div>
        {zoom >= 0.75 && !d.hideConcepts && d.concepts && d.concepts.length > 0 && (
          <div
            style={{
              fontSize: 11,
              lineHeight: '15px',
              color: 'var(--ink-soft)',
              marginTop: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {d.concepts.join(' · ')}
          </div>
        )}
      </div>
      {badge > 0 && (
        <span
          title={`入边另有 ${badge} 条未绘（详情框列全）`}
          style={{ position: 'absolute', right: -14, top: -6, fontSize: 10, color: 'var(--accent)' }}
        >
          +{badge}
        </span>
      )}
      <Handle type="target" position={Position.Top} style={HANDLE_STYLE} />
      <Handle type="source" position={Position.Bottom} style={HANDLE_STYLE} />
    </div>
  );
}
