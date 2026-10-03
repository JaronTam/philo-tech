import { useMemo, useState } from 'react';
import { ReactFlow, type Node } from '@xyflow/react';
import { VOLUME_BY_KEY } from './lib/volumes';
import {
  placeInColumns,
  segmentBoundaries,
  ticksFor,
  toPlaceables,
  totalWidth,
  type ColumnRegistry,
  type LayoutCtx,
} from './lib/layout';
import { meta, masterCandidates } from './lib/data';
import type { VolumeKey } from './lib/types';
import { GridLayer } from './components/GridLayer';
import { TechBlock } from './components/TechBlock';
import { Toolbar } from './components/Toolbar';

const nodeTypes = { grid: GridLayer, tech: TechBlock };

export default function App() {
  const [viewKey, setViewKey] = useState<VolumeKey>('main');
  const [fixture, setFixture] = useState(false);

  const nodes = useMemo<Node[]>(() => {
    const def = VOLUME_BY_KEY[viewKey];
    const items = fixture ? toPlaceables(masterCandidates) : [];
    const ctx: LayoutCtx = {
      registry: meta.columns as ColumnRegistry,
      withTheory: items.some(
        (it) => it.column === 'theory' && it.year >= def.start && it.year < def.end,
      ),
    };
    const { placed } = placeInColumns(items, def, ctx);
    const gridNode: Node = {
      id: 'grid',
      type: 'grid',
      position: { x: 0, y: 0 },
      draggable: false,
      selectable: false,
      style: { width: totalWidth(ctx), height: def.height, zIndex: 0 },
      data: { def, ctx, ticks: ticksFor(def), boundaries: segmentBoundaries(def) },
    };
    const dataNodes: Node[] = placed.map((p, i) => ({
      id: `n${i}`,
      type: 'tech',
      position: { x: p.x, y: p.y },
      draggable: false,
      selectable: false,
      style: { zIndex: 10 },
      data: { label: p.item.label, concepts: p.item.concepts },
    }));
    return [gridNode, ...dataNodes];
  }, [viewKey, fixture]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar
        viewKey={viewKey}
        onView={setViewKey}
        fixture={fixture}
        onFixture={setFixture}
      />
      <div style={{ flex: 1, minHeight: 0, background: 'var(--bg)' }}>
        <ReactFlow
          key={`${viewKey}-${fixture}`}
          nodes={nodes}
          edges={[]}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          minZoom={0.25}
          maxZoom={2.5}
          fitView
          fitViewOptions={{ padding: 0.03 }}
        />
      </div>
    </div>
  );
}
