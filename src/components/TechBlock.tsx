import type { NodeProps } from '@xyflow/react';
import { NODE_MAX_WIDTH } from '../lib/layout';

export interface TechBlockData {
  label: string;
  concepts?: string[];
}

/** 节点 = 纯文本块：主标 + 灰字 concepts（ui-spec §2） */
export function TechBlock({ data }: NodeProps) {
  const d = data as unknown as TechBlockData;
  return (
    <div style={{ width: NODE_MAX_WIDTH }}>
      <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px' }}>{d.label}</div>
      {d.concepts && d.concepts.length > 0 && (
        <div style={{ fontSize: 11, lineHeight: '15px', color: 'var(--ink-soft)', marginTop: 2 }}>
          {d.concepts.slice(0, 3).join(' · ')}
        </div>
      )}
    </div>
  );
}
