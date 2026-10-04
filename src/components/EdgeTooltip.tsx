import { useLayoutEffect, useRef, useState } from 'react';
import { RELATION_LABEL, splitCitation } from '../lib/labels';
import type { TechEdgeData } from './TechEdge';

export interface EdgeTip {
  edgeId: string;
  x: number;
  y: number;
  pinned: boolean;
  data: TechEdgeData;
}

interface Props {
  tip: EdgeTip | null;
  onEnter: () => void;
  onLeave: () => void;
}

/** 边 tooltip（ui-spec §2，M2 完整版）：`source → target` + relation + citation（URL 可点击）；悬停跟随光标，点击固定 */
export function EdgeTooltip({ tip, onEnter, onLeave }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  useLayoutEffect(() => {
    if (!tip) return;
    const el = ref.current;
    const w = el?.offsetWidth ?? 320;
    const h = el?.offsetHeight ?? 80;
    let left = tip.x + 12;
    let top = tip.y + 16;
    if (left + w > window.innerWidth - 8) left = tip.x - w - 12;
    if (top + h > window.innerHeight - 8) top = tip.y - h - 16;
    setPos({ left: Math.max(8, left), top: Math.max(8, top) });
  }, [tip]);

  if (!tip) return null;
  const { text, url } = splitCitation(tip.data.citation);
  return (
    <div
      ref={ref}
      className="edge-tooltip"
      role="tooltip"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ position: 'fixed', left: pos.left, top: pos.top }}
    >
      <div style={{ fontSize: 12 }}>
        {tip.data.sourceLabel ?? ''} → {tip.data.targetLabel ?? ''}
        <span style={{ color: 'var(--ink-soft)' }}> · {RELATION_LABEL[tip.data.relation]}</span>
        {tip.pinned && <span style={{ color: 'var(--ink-soft)' }}> · 已固定</span>}
      </div>
      <div style={{ fontSize: 11, lineHeight: '16px', color: 'var(--ink-soft)', marginTop: 4 }}>
        {text}{' '}
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link)' }}>
            来源
          </a>
        )}
      </div>
    </div>
  );
}
