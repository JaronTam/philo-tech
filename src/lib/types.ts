// 数据模型：prd2 §3.3 schema v5.3
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
  year_note?: string; // 争议年备注（schema v5.3，只增不删）；ui-spec §4「year 含争议备注」
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

/** 家系（ui-opt 批 2 · J-B）：id = master 8 树树根节点 id；color = 色板 token 名（ui-spec §3） */
export interface LineageDef {
  id: string;
  label: string;
  color: string;
}

export interface MetaFile {
  columns: Record<Layer, string[]>;
  bannedWords: string[];
  bands: ParadigmBand[];
  /** 主图「前史」入口标记（ui-spec §6，渲染层概念，与入度无关）：这些 id 在主图带 chip，点击跳前史卷 */
  preEntryNodes?: string[];
  /** 家系表（8 条，基准 = master 8 树；派生规则见 src/lib/lineage.ts） */
  lineages?: LineageDef[];
  /** 家系人为例外（nodeId → lineageId）：覆盖派生结果（语义修复，ui-spec §2 注） */
  lineageExceptions?: Record<string, string>;
}

export type VolumeKey = 'main' | 'pre' | 'v1' | 'v2' | 'v3' | 'v4';

// 前史理论节点：layer = PRE_theory、column = theory 单列（content-spec §4）
export const THEORY_COLUMN = 'theory';
