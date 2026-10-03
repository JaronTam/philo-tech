import metaJson from '../../data/meta.json';
import vol0 from '../../data/vol-0.json';
import vol1 from '../../data/vol-1.json';
import vol2 from '../../data/vol-2.json';
import vol3 from '../../data/vol-3.json';
import vol4 from '../../data/vol-4.json';
import masterJson from '../../data/master-candidates.json';
import type { MasterCandidate, MetaFile, TechEdge, TechNode, VolumeFile } from './types';
import type { VolumeKey } from './types';

export const meta = metaJson as unknown as MetaFile;

export const volumeFiles: { key: VolumeKey; file: VolumeFile }[] = [
  { key: 'pre', file: vol0 as VolumeFile },
  { key: 'v1', file: vol1 as VolumeFile },
  { key: 'v2', file: vol2 as VolumeFile },
  { key: 'v3', file: vol3 as VolumeFile },
  { key: 'v4', file: vol4 as VolumeFile },
];

export const masterCandidates = masterJson as unknown as MasterCandidate[];

export function allNodes(): TechNode[] {
  return volumeFiles.flatMap(({ file }) => file.nodes);
}

export function allEdges(): TechEdge[] {
  return volumeFiles.flatMap(({ file }) => file.edges);
}
