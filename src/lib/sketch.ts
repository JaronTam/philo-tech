// 手绘描边（UI 优化批 2 · J-C）：roughjs 折线原语 + 模块级缓存
// 口径：真源 = docs/ui-opt-scope.md §8（J-C）；渲染描述 = docs/ui-spec.md §2「血统线手绘」。
// 确定性：seed = 边 id 哈希（禁随机 / 禁 newSeed()）；同 (path, seed) → 同输出（复跑逐字节同）。
// 引用口径：只用 rough 的折线原语 renderer.linearPath（本层路径恒为 M/L 正交折线）——
//   包入口 'roughjs'（预打包 ESM，含 canvas / svg / filler / path 解析器）无法 tree-shake，
//   实测 gzip 增量越预算；深引 renderer 只取描线原语，gzip 增量回到预算内（ui-spec §2 注）。
//   抖动依赖的选项全部显式给值（不借 generator.defaultOptions 的默认），版本由 package-lock pin。
// 渲染分工：rough 只产路径串（ops → d）；描边色 / 线宽 / 虚线由渲染层以 CSS（style 注入，支持 var()）
//   施加 —— rough 的 stroke 选项写进属性值、不吃 CSS 变量，故不走其 stroke 通道。
import { linearPath } from 'roughjs/bin/renderer';
import type { Op, ResolvedOptions } from 'roughjs/bin/core';

/** 手绘抖动参数（写死的常量：交互态切换不得重抖，改参数 = 全局重绘） */
const ROUGHNESS = 1.2;
const BOWING = 1;
const MAX_RANDOMNESS_OFFSET = 2; // = rough 默认值；显式给值以免依赖内部默认

/** 描线路径读取的选项（缺省字段 = undefined = falsy，与 rough 默认语义一致） */
const OPTIONS = {
  roughness: ROUGHNESS,
  bowing: BOWING,
  maxRandomnessOffset: MAX_RANDOMNESS_OFFSET,
  preserveVertices: true, // 端点与折点保持精确（块边锚定不脱空）
} as ResolvedOptions;

/** ops → SVG 路径串（rough opsToPath 同构：move / bcurveTo / lineTo） */
function opsToPath(ops: readonly Op[]): string {
  let d = '';
  for (const op of ops) {
    const v = op.data;
    if (op.op === 'move') d += `M${v[0]} ${v[1]} `;
    else if (op.op === 'lineTo') d += `L${v[0]} ${v[1]} `;
    else d += `C${v[0]} ${v[1]}, ${v[2]} ${v[3]}, ${v[4]} ${v[5]} `;
  }
  return d.trim();
}

/** 近整数舍入：1 位小数（0.1px 在缩放 0.25–2.5 下不可辨），缩短路径串 */
function roundPath(d: string): string {
  return d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));
}

/** M/L 折线 → 顶点表（本层路径恒为 route 产出的 `M x,y L x,y …`；异常形态退化为不手绘） */
function pointsOf(path: string): [number, number][] {
  const out: [number, number][] = [];
  const re = /(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(path))) out.push([Number(m[1]), Number(m[2])]);
  return out;
}

const cache = new Map<string, readonly string[]>();

/**
 * 边 id → rough seed（FNV-1a 32 位；纯函数、跨会话稳定）。
 * 禁随机：seed 只由 id 决定 ⇒ 同一边的手绘形状跨视图 / 跨交互态恒定。
 */
export function edgeSeed(edgeId: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < edgeId.length; i++) {
    h ^= edgeId.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** 手绘路径族（可见层）：输入精确路径串与 seed，输出 rough 折线子路径（两遍描线 = 铅笔质感） */
export function sketchPaths(path: string, seed: number): readonly string[] {
  const key = `${seed}|${path}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const points = pointsOf(path);
  const opts = { ...OPTIONS, seed } as ResolvedOptions;
  const paths =
    points.length >= 2 ? [roundPath(opsToPath(linearPath(points, false, opts).ops))] : [path];
  cache.set(key, paths);
  return paths;
}
