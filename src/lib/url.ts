// 深链 hash 路由（prd2 §6：`/#vol=<main|pre|v1..v4>&node=<id>`，缺省 vol=main，无依赖）
import type { VolumeKey } from './types';

export interface HashState {
  vol: VolumeKey;
  node: string | null;
}

const VALID_VOLS: readonly string[] = ['main', 'pre', 'v1', 'v2', 'v3', 'v4'];
export const DEFAULT_VOL: VolumeKey = 'main';

/** 解析 location.hash；无效 vol 静默回 main（volValid=false 供调用方决定是否改写） */
export function parseHash(hash: string): { state: HashState; volValid: boolean } {
  const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
  const rawVol = params.get('vol');
  const volValid = rawVol === null || VALID_VOLS.includes(rawVol);
  const vol = volValid && rawVol ? (rawVol as VolumeKey) : DEFAULT_VOL;
  const node = params.get('node');
  return { state: { vol, node: node || null }, volValid };
}

export function buildHash(s: HashState): string {
  const p = new URLSearchParams();
  p.set('vol', s.vol);
  if (s.node) p.set('node', s.node);
  return p.toString();
}

/** 写回用 replaceState：不产生历史条目、不触发 hashchange（避免回写循环） */
export function writeHash(s: HashState): void {
  history.replaceState(null, '', `#${buildHash(s)}`);
}
