import type { NodeProps } from '@xyflow/react';
import {
  CANVAS_MARGIN,
  LANES,
  THEORY_COLUMN_WIDTH,
  laneBases,
  laneWidths,
  type LayoutCtx,
  type Tick,
} from '../lib/layout';
import type { VolumeDef } from '../lib/volumes';

export interface GridData {
  def: VolumeDef;
  ctx: LayoutCtx;
  ticks: Tick[];
  boundaries: { year: number; y: number; pxPerYear: number }[];
}

/** 骨架层：泳道带 + 时间网格 + 年份刻度 + 主图段界（M0） */
export function GridLayer({ data }: NodeProps) {
  const { def, ctx, ticks, boundaries } = data as unknown as GridData;
  const bases = laneBases(ctx);
  const widths = laneWidths(ctx.registry);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {ctx.withTheory && (
        <div
          style={{
            position: 'absolute',
            left: CANVAS_MARGIN,
            top: 0,
            width: THEORY_COLUMN_WIDTH,
            height: def.height,
            background: 'var(--lane-b)',
          }}
        />
      )}
      {LANES.map((lane, i) => (
        <div
          key={lane.layer}
          style={{
            position: 'absolute',
            left: bases[i],
            top: 0,
            width: widths[i],
            height: def.height,
            background: i % 2 === 0 ? 'var(--lane-a)' : 'var(--lane-b)',
            borderLeft: '1px solid var(--rule)',
            borderRight: i === LANES.length - 1 ? '1px solid var(--rule)' : undefined,
          }}
        />
      ))}
      {ticks.map((t) => (
        <div
          key={t.year}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: t.y,
            borderTop: '1px solid var(--grid)',
          }}
        />
      ))}
      {ticks.map((t) => (
        <div
          key={`label-${t.year}`}
          style={{
            position: 'absolute',
            left: 2,
            top: t.y - 6,
            fontSize: 10,
            lineHeight: '12px',
            color: 'var(--ink-soft)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {t.year}
        </div>
      ))}
      {boundaries.map((b) => (
        <div key={`seg-${b.year}`} style={{ position: 'absolute', left: 0, right: 0, top: b.y }}>
          <div style={{ borderTop: '1px dashed var(--dim)' }} />
          <div
            style={{
              position: 'absolute',
              right: 4,
              top: 2,
              fontSize: 10,
              color: 'var(--ink-soft)',
            }}
          >
            {b.year} 起 · {b.pxPerYear}px/年
          </div>
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          left: 8,
          top: 6,
          fontFamily: '"Songti SC", "SimSun", Georgia, serif',
          fontSize: 18,
          color: 'var(--ink-soft)',
        }}
      >
        {def.title}
      </div>
    </div>
  );
}
