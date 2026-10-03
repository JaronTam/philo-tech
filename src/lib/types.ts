// 数据模型：prd2 §3.3 schema v5.1
export type Layer =
  | 'L0_hardware'
  | 'L1_system'
  | 'L2_language'
  | 'L3_data'
  | 'L4_delivery'
  | 'L5_ai'
  | 'PRE_theory'; // 前史渊源层（哨兵，非泳道）：仅 theory 单列，限 year < 1947（content-spec §4）

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

// 前史理论节点：layer = PRE_theory、column = theory 单列（content-spec §4）
export const THEORY_COLUMN = 'theory';
