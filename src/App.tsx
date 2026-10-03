import { useMemo, useState } from 'react';
import { ReactFlow, type Edge, type Node } from '@xyflow/react';
import { VOLUME_BY_KEY } from './lib/volumes';
import {
  placeWithDegradation,
  segmentBoundaries,
  ticksFor,
  totalWidth,
  type ColumnRegistry,
  type LayoutCtx,
  type Placeable,
} from './lib/layout';
import { meta, volumeFiles } from './lib/data';
import { THEORY_COLUMN, type VolumeKey } from './lib/types';
import { GridLayer } from './components/GridLayer';
import { TechBlock } from './components/TechBlock';
import { TechEdge } from './components/TechEdge';
import { Toolbar } from './components/Toolbar';

const nodeTypes = { grid: GridLayer, tech: TechBlock };
const edgeTypes = { tech: TechEdge };

export default function App() {
  const [viewKey, setViewKey] = useState<VolumeKey>('main');

  const { nodes, edges } = useMemo(() => {
    const def = VOLUME_BY_KEY[viewKey];
    const allNodesList = volumeFiles.flatMap(({ file }) => file.nodes);
    const visible =
      viewKey === 'main'
        ? allNodesList.filter((n) => n.master)
        : (volumeFiles.find(({ key }) => key === viewKey)?.file.nodes ?? []);
    const visibleIds = new Set(visible.map((n) => n.id));

    const items: Placeable[] = visible.map((n) => ({
      id: n.id,
      label: n.label,
      layer: n.layer,
      column: n.column,
      year: n.year,
      weight: n.weight,
      concepts: n.concepts,
    }));
    const ctx: LayoutCtx = {
      registry: meta.columns as ColumnRegistry,
      withTheory: items.some(
        (it) => it.column === THEORY_COLUMN && it.year >= def.start && it.year < def.end,
      ),
    };
    // 两遍放置：缺口节点去 concepts 重排（防灰字压字），坐标为实排
    const { placed, degraded } = placeWithDegradation(items, def, ctx);

    const gridNode: Node = {
      id: 'grid',
      type: 'grid',
      position: { x: 0, y: 0 },
      draggable: false,
      selectable: false,
      style: { width: totalWidth(ctx), height: def.height, zIndex: -1 }, // -1：泳道底色垫在边层之下（RF 默认边在节点层之下）
      data: { def, ctx, ticks: ticksFor(def), boundaries: segmentBoundaries(def) },
    };
    const dataNodes: Node[] = placed.map((p) => ({
      id: p.item.id ?? p.item.label,
      type: 'tech',
      position: { x: p.x, y: p.y },
      draggable: false,
      selectable: false,
      style: { zIndex: 10 },
      data: {
        label: p.item.label,
        concepts: p.item.concepts,
        weight: p.item.weight ?? 'major',
        layer: p.item.layer,
        hideConcepts: degraded.has(p.item.id ?? ''),
      },
    }));

    const byId = new Map(visible.map((n) => [n.id, n]));
    const dataEdges: Edge[] = [];
    for (const { file } of volumeFiles) {
      for (const e of file.edges) {
        if (!visibleIds.has(e.source) || !visibleIds.has(e.target)) continue;
        dataEdges.push({
          id: `${e.source}->${e.target}`,
          source: e.source,
          target: e.target,
          type: 'tech',
          data: {
            relation: e.relation,
            citation: e.citation,
            sourceLabel: byId.get(e.source)?.label,
            targetLabel: byId.get(e.target)?.label,
          },
        });
      }
    }
    return { nodes: [gridNode, ...dataNodes], edges: dataEdges };
  }, [viewKey]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar viewKey={viewKey} onView={setViewKey} />
      <div style={{ flex: 1, minHeight: 0, background: 'var(--bg)' }}>
        <ReactFlow
          key={viewKey}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
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
