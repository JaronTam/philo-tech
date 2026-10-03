import { Handle, Position, useViewport, type NodeProps } from '@xyflow/react';
import { NODE_MAX_WIDTH } from '../lib/layout';

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

/** 节点 = 纯文本块：主标 + 灰字 concepts（≤2 行，ui-spec §2）；LOD：scale < 0.75 隐藏灰字、< 0.5 隐藏 minor（ui-spec §7） */
export function TechBlock({ data }: NodeProps) {
  const d = data as unknown as TechBlockData;
  const { zoom } = useViewport();
  if (d.weight === 'minor' && zoom < 0.5) return null;
  const f = FONT[d.weight];
  return (
    <div style={{ width: NODE_MAX_WIDTH }}>
      <Handle type="target" position={Position.Top} style={HANDLE_STYLE} />
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
      <Handle type="source" position={Position.Bottom} style={HANDLE_STYLE} />
    </div>
  );
}
