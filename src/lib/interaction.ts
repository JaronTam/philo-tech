// 交互 context：选中/高亮态经 context 下发，避免把视觉态塞进 RF 的 node/edge data（memo 保持 [viewKey] 依赖）
import { createContext, useContext } from 'react';
import type { Lit } from './graph';

export interface Interaction {
  selectedId: string | null;
  flashId: string | null;
  lit: Lit;
  /** BFS 追溯态（J-C：追溯态高亮边随血统线一起走手绘层） */
  traced: boolean;
  /** 主图入边超限时的 `+N` 计数（target id → N） */
  inboundBadge: Map<string, number>;
  onSelect: (id: string) => void;
  /** 主图「前史」chip：切前史卷 + 落地选中（ui-spec §6；不走 BFS） */
  onPreEntry: (id: string) => void;
}

export interface Hover {
  hoveredId: string | null;
  /** 悬停节点及其直接邻居（淡底高亮集合） */
  neighbors: ReadonlySet<string>;
  hover: (id: string | null) => void;
}

export const InteractionContext = createContext<Interaction | null>(null);
export const HoverContext = createContext<Hover | null>(null);

export function useInteraction(): Interaction {
  const v = useContext(InteractionContext);
  if (!v) throw new Error('InteractionContext 缺失');
  return v;
}

export function useHover(): Hover {
  const v = useContext(HoverContext);
  if (!v) throw new Error('HoverContext 缺失');
  return v;
}
