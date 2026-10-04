import metaJson from '../../data/meta.json';
import vol0 from '../../data/vol-0.json';
import vol1 from '../../data/vol-1.json';
import vol2 from '../../data/vol-2.json';
import vol3 from '../../data/vol-3.json';
import vol4 from '../../data/vol-4.json';
import type { MetaFile, TechEdge, TechNode, VolumeFile } from './types';
import type { VolumeKey } from './types';
import { buildGraphIndex, type GraphIndex } from './graph';

export const meta = metaJson as unknown as MetaFile;

export const volumeFiles: { key: VolumeKey; file: VolumeFile }[] = [
  { key: 'pre', file: vol0 as VolumeFile },
  { key: 'v1', file: vol1 as VolumeFile },
  { key: 'v2', file: vol2 as VolumeFile },
  { key: 'v3', file: vol3 as VolumeFile },
  { key: 'v4', file: vol4 as VolumeFile },
];

export function allNodes(): TechNode[] {
  return volumeFiles.flatMap(({ file }) => file.nodes);
}

export function allEdges(): TechEdge[] {
  return volumeFiles.flatMap(({ file }) => file.edges);
}

/** 节点 → 所属卷（深链自动切卷用；主图不是卷，master 节点仍归其数据卷） */
export const volumeOfNode: Map<string, VolumeKey> = new Map(
  volumeFiles.flatMap(({ key, file }) => file.nodes.map((n) => [n.id, key] as const)),
);

let graphIndex: GraphIndex | null = null;

/** 全局图索引（静态数据，懒建一次） */
export function graph(): GraphIndex {
  return (graphIndex ??= buildGraphIndex(allNodes(), allEdges(), volumeOfNode));
}
