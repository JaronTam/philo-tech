// 数据模型：prd2 §3.3 schema v5.1
export type Layer =
  | 'L0_hardware'
  | 'L1_system'
  | 'L2_language'
  | 'L3_data'
  | 'L4_delivery'
  | 'L5_ai';

export type Relation =
  | 'enables'
  | 'direct_fork'
  | 'conceptual_inf'
  | 'paradigm_shift'
  | 'convergence'
  | 'composition';

export interface TechNode {
  id: string;
  label: string;
  label_en: string;
  layer: Layer;
  column: string;
  year: number;
  weight: 'epic' | 'major' | 'minor';
  master: boolean;
  summary: string;
  concepts?: string[];
  people?: string[];
  sources: string[];
  checked_at: string;
  archive_url?: string;
}

export interface TechEdge {
  source: string;
  target: string;
  relation: Relation;
  citation: string;
}

export interface ParadigmBand {
  id: string;
  label: string;
  from: number;
  to: number | null;
  layers: Layer[];
}

export interface VolumeFile {
  nodes: TechNode[];
  edges: TechEdge[];
}

export interface MetaFile {
  columns: Record<Layer, string[]>;
  bannedWords: string[];
  bands: ParadigmBand[];
}

export type VolumeKey = 'main' | 'pre' | 'v1' | 'v2' | 'v3' | 'v4';

// 前史理论节点使用保留列名 theory + 占位 layer（content-spec §4）
export const THEORY_COLUMN = 'theory';

/** M0 实测输入（docs/master-candidates.md 的 JSON 版；字段限表内三列 + 备注） */
export interface MasterCandidate {
  label: string;
  layer: Layer;
  column: string;
  year: number;
  note?: string;
  theory?: boolean;
}
