// D-8（M3）：桌面缩放入口——主图 fitView ≈ 0.30，低于 LOD 两档阈值（0.5 / 0.75），
// 灰字 concepts 与 minor 节点在默认视图无正向可达路径（ui-spec §7）。
export interface ZoomControlsProps {
  zoomPct: number;
  /** 窄屏 + 详情框抽屉打开时抬升，避免被 45vh 抽屉盖住（index.css） */
  raised?: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
}

const MIN_PCT = 25; // ReactFlow minZoom 0.25（App.tsx）
const MAX_PCT = 250; // maxZoom 2.5

export function ZoomControls({ zoomPct, raised, onZoomIn, onZoomOut, onFit }: ZoomControlsProps) {
  return (
    <div
      className={raised ? 'zoom-cluster zoom-cluster-raised' : 'zoom-cluster'}
      role="group"
      aria-label="缩放"
    >
      <button type="button" onClick={onZoomOut} disabled={zoomPct <= MIN_PCT} title="缩小" aria-label="缩小">
        −
      </button>
      <span className="zoom-pct" data-zoom-pct>
        {zoomPct}%
      </span>
      <button type="button" onClick={onZoomIn} disabled={zoomPct >= MAX_PCT} title="放大" aria-label="放大">
        +
      </button>
      <button type="button" onClick={onFit} title="适配画布" aria-label="适配画布">
        适配
      </button>
    </div>
  );
}
