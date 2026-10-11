import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  type Edge,
  type ReactFlowInstance,
} from '@xyflow/react';
import type { Node } from '@xyflow/react';
import { VOLUME_BY_KEY } from './lib/volumes';
import {
  backdropFor,
  NODE_MAX_WIDTH,
  placeWithDegradation,
  segmentBoundaries,
  ticksFor,
  totalWidth,
  type ColumnRegistry,
  type LayoutCtx,
  type Placeable,
} from './lib/layout';
import { buildRouteScaffold, routeEdge, type Route } from './lib/route';
import { buildLineageIndex, colorOf } from './lib/lineage';
import { buildPlaneMarkers, planesInView, type PlaneMarker } from './lib/planes';
import { nearestEdge, type HitCandidate } from './lib/edgehit';
import { RELATION_LABEL } from './lib/labels';
import { graph, meta } from './lib/data';
import { THEORY_COLUMN, type VolumeKey } from './lib/types';
import {
  buildGraphIndex,
  buildSearchIndex,
  capInbound,
  deriveLit,
  edgeId,
  HL_NONE,
  neighborsOf,
  type GraphIndex,
  type HighlightState,
} from './lib/graph';
import { parseHash, writeHash, type HashState } from './lib/url';
import { InteractionContext, HoverContext, type Hover, type Interaction } from './lib/interaction';
import { GridLayer } from './components/GridLayer';
import { TechBlock } from './components/TechBlock';
import { TechEdge, type TechEdgeData } from './components/TechEdge';
import { Toolbar } from './components/Toolbar';
import { DetailPanel } from './components/DetailPanel';
import { SearchBox } from './components/SearchBox';
import { EdgeTooltip, type EdgeTip } from './components/EdgeTooltip';
import { FlowBridge } from './components/FlowBridge';
import { ZoomControls } from './components/ZoomControls';

const nodeTypes = { grid: GridLayer, tech: TechBlock };
const edgeTypes = { tech: TechEdge };

const SIDE_PANEL_PX = 360; // ui-spec §4
const NARROW_MQ = '(max-width: 1023.98px)'; // 与 index.css 断点一致
const MAIN_INBOUND_CAP = 8; // content-spec §3
const EMPTY_SET: ReadonlySet<string> = new Set();
const PRE_ENTRY: ReadonlySet<string> = new Set(meta.preEntryNodes ?? []); // ui-spec §6

/** 面板补偿：宽屏右侧 360px 面板 / 窄屏底部抽屉 45vh（ui-spec §4） */
function panelInsets(open: boolean, canvas: HTMLElement | null): { x: number; y: number } {
  if (!open || !canvas) return { x: 0, y: 0 };
  return window.matchMedia(NARROW_MQ).matches ? { x: 0, y: canvas.clientHeight * 0.45 } : { x: SIDE_PANEL_PX, y: 0 };
}

export default function App() {
  const [g, setG] = useState<GraphIndex>(() => graph());
  const [viewKey, setViewKey] = useState<VolumeKey>(() => parseHash(location.hash).state.vol);
  const [plane, setPlane] = useState<string | null>(null); // 层态（J-D1）：家系 id 或 null（全部层）
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelFocusOnOpen, setPanelFocusOnOpen] = useState(false);
  const [highlight, setHighlight] = useState<HighlightState>(HL_NONE);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);
  const [edgeTip, setEdgeTip] = useState<EdgeTip | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [centerRequest, setCenterRequest] = useState<{ id: string; flash: boolean } | null>(null);

  const rfRef = useRef<ReactFlowInstance | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<Map<string, { x: number; y: number; h: number }>>(new Map());
  const panelOpenRef = useRef(false);
  const searchOpenRef = useRef(false);
  const tipTimer = useRef<number | undefined>(undefined);
  const flashTimer = useRef<number | undefined>(undefined);
  const zoomPctRef = useRef(100);
  const [zoomPct, setZoomPct] = useState(100);
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW_MQ).matches);

  useEffect(() => {
    panelOpenRef.current = panelOpen;
  }, [panelOpen]);

  useEffect(() => {
    const mq = window.matchMedia(NARROW_MQ);
    const onChange = () => setNarrow(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // dev 压测数据（?fixture=1）：250 节点合成图，覆盖真实数据暂缺的 convergence / 入边超限（prod 构建剔除）
  useEffect(() => {
    if (!import.meta.env.DEV || !new URLSearchParams(location.search).has('fixture')) return;
    void import('./lib/bench-fixture').then(({ makeSyntheticGraph }) => {
      const s = makeSyntheticGraph();
      setG(buildGraphIndex(s.nodes, s.edges, s.volumeOf));
    });
  }, []);

  // 家系归属（J-B）：8 树基准 + 派生 + 例外，随图数据一次预算（跨视图不变色）
  const lineageIdx = useMemo(() => buildLineageIndex(g.nodes, g.edges, meta), [g]);

  // ---- 视图数据：布局 + 边集（memo 只依赖 [viewKey, g]，交互态经 context 下发）----
  const view = useMemo(() => {
    const def = VOLUME_BY_KEY[viewKey];
    const visible =
      viewKey === 'main'
        ? g.nodes.filter((n) => n.master)
        : g.nodes.filter((n) => g.volumeOf.get(n.id) === viewKey);
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
    // 两遍放置 + repair：缺口节点去 concepts 重排（防灰字压字），坐标为实排
    const { placed, degraded } = placeWithDegradation(items, def, ctx);
    // 统一几何（J-A3 / K1/K2）：占用图 + 逐边确定性路由，随本 memo 一次预算
    const scaffold = buildRouteScaffold(placed);

    const gridNode: Node = {
      id: 'grid',
      type: 'grid',
      position: { x: 0, y: 0 },
      draggable: false,
      selectable: false,
      // pointerEvents:none 兜底：全画布骨架不得吞 pane 点击（RF 无节点级事件时本已为 none）
      style: { width: totalWidth(ctx), height: def.height, zIndex: -1, pointerEvents: 'none' },
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
        backdrop: backdropFor(p.item.layer, p.item.column),
        preEntry: viewKey === 'main' && PRE_ENTRY.has(p.item.id ?? ''),
        lineageColor: colorOf(lineageIdx, p.item.id ?? p.item.label),
      },
    }));

    // 居中/焦点用实排坐标（不依赖 DOM 测量）
    const positions = new Map<string, { x: number; y: number; h: number }>();
    for (const p of placed) positions.set(p.item.id ?? p.item.label, { x: p.x, y: p.y, h: p.blockH });
    positionsRef.current = positions;

    const byId = new Map(visible.map((n) => [n.id, n]));
    const rawEdges = g.edges.filter((e) => visibleIds.has(e.source) && visibleIds.has(e.target));
    // 主图入边 ≤8（content-spec §3）：超限按 relation 优先级截断，节点显 `+N`
    const { kept, overflow } =
      viewKey === 'main' ? capInbound(rawEdges, MAIN_INBOUND_CAP) : { kept: rawEdges, overflow: new Map<string, number>() };
    // 逐边路由（端点口径 = RF 锚点约定：源块底中 → 目标块顶中；新不优于旧则退化旧式）
    const routes = new Map<string, Route>();
    for (const e of kept) {
      const s = positions.get(e.source);
      const t = positions.get(e.target);
      const sn = byId.get(e.source);
      const tn = byId.get(e.target);
      if (!s || !t || !sn || !tn) continue;
      routes.set(
        edgeId(e),
        routeEdge(
          { x: s.x + NODE_MAX_WIDTH / 2, y: s.y + s.h, column: `${sn.layer}/${sn.column}` },
          { x: t.x + NODE_MAX_WIDTH / 2, y: t.y, column: `${tn.layer}/${tn.column}` },
          scaffold,
        ),
      );
    }
    const dataEdges: Edge[] = kept.map((e) => {
      // 血统线（J-B/J-C）= 两端同家系：取家系色 + 手绘层；跨家系 / 无家系 = 中性 + 精确线
      const lin = lineageIdx.byNode.get(e.source);
      const lineageEdge = lin !== undefined && lin === lineageIdx.byNode.get(e.target);
      return {
        id: edgeId(e),
        source: e.source,
        target: e.target,
        type: 'tech',
        data: {
          relation: e.relation,
          citation: e.citation,
          sourceLabel: byId.get(e.source)?.label,
          targetLabel: byId.get(e.target)?.label,
          route: routes.get(edgeId(e)),
          lineageEdge,
          lineageColor: lineageEdge ? lineageIdx.colorOfLineage.get(lin!) : undefined,
        },
      };
    });
    // 层态选项（J-D1）：当前视图内出现的家系（按 lineages 声明序）
    const planes = planesInView(visibleIds, lineageIdx.byNode, (meta.lineages ?? []).map((l) => l.id));
    return { nodes: [gridNode, ...dataNodes], edges: dataEdges, keptEdges: kept, inboundBadge: overflow, planes };
  }, [viewKey, g, lineageIdx]);

  // ---- 层态投影（J-D1/J-D2，零重排过滤）：仅该家系节点；跨层边不画连线，改入口/出口标记 ----
  const planeRender = useMemo(() => {
    if (!plane) return null;
    const inPlane = (id: string) => lineageIdx.byNode.get(id) === plane;
    const markers = buildPlaneMarkers(view.keptEdges, lineageIdx.byNode, plane);
    const edgeById = new Map(view.keptEdges.map((e) => [edgeId(e), e]));
    const toRender = (m: PlaneMarker) => {
      const e = edgeById.get(m.edgeId)!;
      const src = g.byId.get(e.source)?.label ?? e.source;
      const tgt = g.byId.get(e.target)?.label ?? e.target;
      const other = (meta.lineages ?? []).find((l) => l.id === m.other)?.label ?? m.other;
      return {
        dir: m.dir,
        color: lineageIdx.colorOfLineage.get(m.other) ?? 'var(--ink-soft)',
        title: `${m.dir === 'in' ? '入口' : '出口'} · ${other}：${src} → ${tgt}（${RELATION_LABEL[e.relation]}）`,
      };
    };
    const nodes = view.nodes
      .filter((n) => n.id === 'grid' || inPlane(n.id))
      .map((n) => {
        const ms = markers.get(n.id);
        return ms ? { ...n, data: { ...n.data, planeMarkers: ms.map(toRender) } } : n;
      });
    const edges = view.edges.filter((e) => inPlane(e.source) && inPlane(e.target));
    return { nodes, edges };
  }, [view, plane, lineageIdx, g]);

  // ---- 高亮派生 ----
  // 收敛态按视图过滤（J-E1）：仅点亮「本视图实际渲染」的收敛边及其端点（0 边视图按钮已 disable）
  const renderedEdges = planeRender?.edges ?? view.edges;
  const lit = useMemo(() => {
    const l = deriveLit(highlight, null, g);
    if (highlight.kind !== 'convergence') return l;
    const litEdges = new Set<string>();
    const litNodes = new Set<string>();
    for (const e of renderedEdges) {
      if (l.litEdges.has(e.id)) {
        litEdges.add(e.id);
        litNodes.add(e.source);
        litNodes.add(e.target);
      }
    }
    return { ...l, litNodes, litEdges };
  }, [highlight, g, renderedEdges]);
  const neighbors = useMemo(() => (hoveredId ? neighborsOf(g, hoveredId) : EMPTY_SET), [hoveredId, g]);

  // ---- 缩放控件（D-8）：onMove 只在整数 % 变化时 setState（平移不触发重渲染）----
  const syncZoom = useCallback(() => {
    const z = rfRef.current?.getZoom();
    if (z === undefined) return;
    const pct = Math.max(1, Math.round(z * 100));
    if (pct !== zoomPctRef.current) {
      zoomPctRef.current = pct;
      setZoomPct(pct);
    }
  }, []);
  const zoomIn = useCallback(() => void rfRef.current?.zoomIn({ duration: 150 }), []);
  const zoomOut = useCallback(() => void rfRef.current?.zoomOut({ duration: 150 }), []);
  const zoomFit = useCallback(() => void rfRef.current?.fitView({ padding: 0.03, duration: 150 }), []);

  // ---- 居中 ----
  const focusNode = useCallback((id: string, flash: boolean) => {
    const inst = rfRef.current;
    const pos = positionsRef.current.get(id);
    if (!inst || !pos) return;
    const cur = inst.getZoom();
    const zoom = cur < 0.5 ? 0.75 : cur; // <0.5 时 minor 不可见、concepts 已藏（ui-spec §7）
    const inset = panelInsets(panelOpenRef.current, canvasRef.current);
    // setCenter 不传 zoom 会默认 maxZoom（RF v12 dist 实证），必须显式传；inset 补偿面板半宽
    void inst.setCenter(pos.x + NODE_MAX_WIDTH / 2 + inset.x / (2 * zoom), pos.y + pos.h / 2 + inset.y / (2 * zoom), {
      zoom,
      duration: 300,
    });
    if (flash) {
      window.clearTimeout(flashTimer.current);
      setFlashId(id);
      flashTimer.current = window.setTimeout(() => setFlashId(null), 700);
    }
  }, []);

  // ---- 选中 / 清除 ----
  const ensureVisible = useCallback(
    (id: string): VolumeKey => {
      const node = g.byId.get(id);
      if (!node) return viewKey;
      const owner = g.volumeOf.get(id) ?? 'main';
      const inCurrent = viewKey === 'main' ? node.master : owner === viewKey;
      if (inCurrent) return viewKey;
      setViewKey(owner); // 深链 / 跨卷命中：自动切卷（ui-spec §5）
      return owner;
    },
    [g, viewKey],
  );

  const selectNode = useCallback(
    (id: string, mode: 'trace' | 'search' | 'none', flash = false) => {
      const vol = ensureVisible(id);
      // 层态（J-D1）：命中节点不在当前层 → 自动切到其家系（无归属 → 退回全部层），同「自动切卷」语义
      if (plane) {
        const lin = lineageIdx.byNode.get(id);
        if (lin !== plane) setPlane(lin ?? null);
      }
      setNotice(null);
      setSelectedId(id);
      setPanelOpen(true);
      setPanelFocusOnOpen(true);
      setHighlight(mode === 'trace' ? { kind: 'trace', origin: id } : mode === 'search' ? { kind: 'search', origin: id } : HL_NONE);
      setCenterRequest({ id, flash });
      setEdgeTip(null);
      writeHash({ vol, node: id });
    },
    [ensureVisible, plane, lineageIdx],
  );

  const clearAll = useCallback(() => {
    setSelectedId(null);
    setPanelOpen(false);
    setHighlight(HL_NONE);
    setEdgeTip(null);
    setNotice(null);
    setCenterRequest(null);
    writeHash({ vol: viewKey, node: null });
  }, [viewKey]);

  const handleView = useCallback((k: VolumeKey) => {
    // 切卷 = 重置：高亮集合跨视图不再自洽，连同选中/面板/tooltip 一并清（计划裁定）
    setViewKey(k);
    setPlane(null);
    setSelectedId(null);
    setPanelOpen(false);
    setHighlight(HL_NONE);
    setEdgeTip(null);
    setHoveredId(null);
    setNotice(null);
    setCenterRequest(null);
    writeHash({ vol: k, node: null });
  }, []);

  // 层切换 = 第 4 态（ui-spec §5）：进入 / 切换 / 退出清高亮与 tooltip；过滤零重排（坐标不变）
  const handlePlane = useCallback((p: string | null) => {
    setPlane(p);
    setHighlight(HL_NONE);
    setEdgeTip(null);
    setHoveredId(null);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    if (selectedId) {
      // Esc 焦点还给节点（ui-spec §4）；节点未渲染（跨卷）时回退到画布
      const el =
        document.querySelector<HTMLElement>(`.react-flow__node[data-id="${CSS.escape(selectedId)}"]`) ??
        document.querySelector<HTMLElement>('[data-testid="rf__wrapper"]');
      el?.focus({ preventScroll: true });
    }
  }, [selectedId]);

  // ---- 深链 ----
  const applyHash = useCallback(
    (state: HashState, volValid: boolean) => {
      const id = state.node;
      const node = id ? g.byId.get(id) : undefined;
      if (!id || !node) {
        // URL 为准：无 node（或无效 id）即清选中/面板/高亮（ui-spec §5：无效 id 留在主图）
        if (id) setNotice('节点不存在');
        setSelectedId(null);
        setPanelOpen(false);
        setHighlight(HL_NONE);
        setCenterRequest(null);
        if (state.vol !== viewKey) setViewKey(state.vol);
        if (!volValid) writeHash({ vol: state.vol, node: null });
        return;
      }
      const owner = g.volumeOf.get(id) ?? 'main';
      const visibleIn = (v: VolumeKey) => (v === 'main' ? node.master : owner === v);
      // URL 显式 vol 优先；节点在该卷不可见时切到其所属卷（ui-spec §5 自动切卷）
      const vol = visibleIn(state.vol) ? state.vol : owner;
      // 层态（J-D1）：深链命中节点不在当前层 → 自动切到其家系（无归属 → 退回全部层）
      if (plane) {
        const lin = lineageIdx.byNode.get(id);
        if (lin !== plane) setPlane(lin ?? null);
      }
      setViewKey(vol);
      setSelectedId(id);
      setPanelOpen(true);
      setPanelFocusOnOpen(false); // 加载即深链：不抢焦点（a11y，ui-spec v0.10 明记）
      setHighlight(HL_NONE); // 深链 ≠ 单击节点：不启动 BFS（ui-spec §5）
      setCenterRequest({ id, flash: true });
      writeHash({ vol, node: id }); // 规范化（replaceState 不触发 hashchange）
    },
    [g, viewKey, plane, lineageIdx],
  );

  const initialApplied = useRef(false);
  useEffect(() => {
    if (initialApplied.current) return;
    initialApplied.current = true;
    const { state, volValid } = parseHash(location.hash);
    applyHash(state, volValid);
  }, [applyHash]);

  useEffect(() => {
    const onHash = () => {
      const { state, volValid } = parseHash(location.hash);
      applyHash(state, volValid);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [applyHash]);

  // ---- 键盘：Esc 只关详情框（搜索下拉打开时由 SearchBox 处理并 stopPropagation）----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || searchOpenRef.current) return;
      closePanel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closePanel]);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(t);
  }, [notice]);

  useEffect(
    () => () => {
      window.clearTimeout(tipTimer.current);
      window.clearTimeout(flashTimer.current);
    },
    [],
  );

  // ---- 边 tooltip：hover 显示（180ms 延迟关闭）、点击固定、平移/切卷/空白关闭 ----
  const hideTipSoon = useCallback(() => {
    window.clearTimeout(tipTimer.current);
    // 固定态（点击 pin）不受 180ms 收起影响：清除只走点空白 / 平移 / 切卷 / 节点选中（ui-spec §2）
    tipTimer.current = window.setTimeout(() => setEdgeTip((t) => (t?.pinned ? t : null)), 180);
  }, []);
  const cancelHideTip = useCallback(() => window.clearTimeout(tipTimer.current), []);

  // ---- 边命中（J-E2 · D-20）：几何「最近边」判定，替代透明命中层叠加（同走廊嵌套边不再被上层吞掉）----
  const EDGE_HIT_PX = 8; // 屏幕像素命中阈值（flow 阈值 = 8 / zoom）
  const panningRef = useRef(false);
  const hitEdges = useMemo<HitCandidate[]>(
    () =>
      renderedEdges
        .map((e) => ({ edgeId: e.id, points: (e.data as unknown as TechEdgeData).route?.points ?? [] }))
        .filter((h) => h.points.length > 1),
    [renderedEdges],
  );
  const edgeAt = useCallback(
    (clientX: number, clientY: number): Edge | null => {
      const inst = rfRef.current;
      if (!inst) return null;
      const p = inst.screenToFlowPosition({ x: clientX, y: clientY });
      const id = nearestEdge(p, hitEdges, EDGE_HIT_PX / inst.getZoom());
      return id === null ? null : (renderedEdges.find((e) => e.id === id) ?? null);
    },
    [hitEdges, renderedEdges],
  );
  const tipData = (edge: Edge): TechEdgeData => edge.data as unknown as TechEdgeData;
  const onCanvasPointerMove = useCallback(
    (ev: React.PointerEvent) => {
      // 平移中不判命中（拖拽 pane 期间不弹 tooltip）
      if (panningRef.current) return;
      // 指针在节点块内 = 离开边（沿 RF onEdgeMouseLeave 语义）：不接管命中、收起未固定 tip。
      // 用事件 target 同步判定（hoveredId 为 React 状态，连续 pointermove 下可能滞后一拍：
      // 从节点块移出的首个 pointermove 会带旧 hoveredId，若光标恰停在节点贴边处会漏 tip）
      if ((ev.target as HTMLElement).closest?.('[data-node-id]')) {
        hideTipSoon();
        return;
      }
      const edge = edgeAt(ev.clientX, ev.clientY);
      if (!edge) {
        hideTipSoon();
        return;
      }
      window.clearTimeout(tipTimer.current);
      // 同边不重设（位置不随光标抖动，同批 1 前行为）；换边则替换（含替换已固定态，同既有）
      setEdgeTip((t) =>
        t?.edgeId === edge.id
          ? t
          : { edgeId: edge.id, x: ev.clientX, y: ev.clientY, pinned: false, data: tipData(edge) },
      );
    },
    [edgeAt, hideTipSoon],
  );
  const onCanvasClick = useCallback(
    (ev: React.MouseEvent) => {
      const edge = edgeAt(ev.clientX, ev.clientY);
      if (edge) {
        window.clearTimeout(tipTimer.current);
        setEdgeTip({ edgeId: edge.id, x: ev.clientX, y: ev.clientY, pinned: true, data: tipData(edge) });
        return;
      }
      clearAll(); // 点空白 = 清全部（原 RF onPaneClick 语义，随边命中接管）
    },
    [edgeAt, clearAll],
  );

  // ---- context ----
  const handleNodeSelect = useCallback((id: string) => selectNode(id, 'trace'), [selectNode]);
  const handlePanelGoto = useCallback((id: string) => selectNode(id, 'trace'), [selectNode]);
  const handleSearchSelect = useCallback((id: string) => selectNode(id, 'search', true), [selectNode]);
  const handlePreEntry = useCallback((id: string) => {
    // ui-spec §6：chip = 切前史卷 + 落地选中（不走 BFS）；不复用 selectNode——ensureVisible 对 master 在主图不切卷
    setNotice(null);
    setViewKey('pre');
    setSelectedId(id);
    setPanelOpen(true);
    setPanelFocusOnOpen(true);
    setHighlight(HL_NONE);
    setEdgeTip(null);
    setHoveredId(null);
    setCenterRequest({ id, flash: true });
    writeHash({ vol: 'pre', node: id });
  }, []);
  const handleSearchOpenChange = useCallback((open: boolean) => {
    searchOpenRef.current = open;
  }, []);
  const interaction = useMemo<Interaction>(
    () => ({
      selectedId,
      flashId,
      lit,
      traced: highlight.kind === 'trace',
      inboundBadge: view.inboundBadge,
      onSelect: handleNodeSelect,
      onPreEntry: handlePreEntry,
    }),
    [selectedId, flashId, lit, highlight.kind, view.inboundBadge, handleNodeSelect, handlePreEntry],
  );
  const hover = useMemo<Hover>(() => ({ hoveredId, neighbors, hover: setHoveredId }), [hoveredId, neighbors]);

  const searchIndex = useMemo(() => buildSearchIndex(g.nodes), [g]);
  // 收敛按钮计数按视图（J-E1）：= 本视图渲染边 ∩ 收敛边
  const convCount = useMemo(
    () => renderedEdges.filter((e) => g.convergence.edgeIds.has(e.id)).length,
    [renderedEdges, g],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar
        viewKey={viewKey}
        onView={handleView}
        right={
          <>
            {view.planes.length > 0 && (
              <select
                aria-label="层（家系平面）"
                title="按家系分层显示（z 轴 = 家系，与色一致）"
                value={plane ?? ''}
                onChange={(e) => handlePlane(e.target.value || null)}
                style={{
                  padding: '4px 6px',
                  fontSize: 13,
                  border: '1px solid var(--rule)',
                  borderRadius: 4,
                  background: 'transparent',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                }}
              >
                <option value="">全部层</option>
                {view.planes.map((p) => (
                  <option key={p} value={p}>
                    {(meta.lineages ?? []).find((l) => l.id === p)?.label ?? p}
                  </option>
                ))}
              </select>
            )}
            <SearchBox
              index={searchIndex}
              volumeOf={g.volumeOf}
              currentView={viewKey}
              onSelect={handleSearchSelect}
              onOpenChange={handleSearchOpenChange}
            />
            <button
              onClick={() => setHighlight((h) => (h.kind === 'convergence' ? HL_NONE : { kind: 'convergence' }))}
              aria-pressed={highlight.kind === 'convergence'}
              disabled={convCount === 0}
              title={
                convCount === 0
                  ? '本视图无 convergence 边（收敛边出现在卷 1–3）'
                  : `高亮 ${convCount} 条收敛边及其多源`
              }
              style={{
                padding: '4px 10px',
                fontSize: 13,
                cursor: convCount === 0 ? 'not-allowed' : 'pointer',
                border: '1px solid var(--rule)',
                borderRadius: 4,
                background: highlight.kind === 'convergence' ? 'var(--ink)' : 'transparent',
                color: highlight.kind === 'convergence' ? 'var(--bg)' : 'var(--ink)',
                opacity: convCount === 0 ? 0.5 : 1,
              }}
            >
              收敛{convCount > 0 ? ` ${convCount}` : ''}
            </button>
          </>
        }
      />
      <div ref={canvasRef} style={{ flex: 1, minHeight: 0, background: 'var(--bg)', position: 'relative' }}>
        {/* 边命中接管层（J-E2）：pointermove / click 走几何最近边判定；面板 / 缩放控件 / tooltip 在此层之外 */}
        <div
          style={{ position: 'absolute', inset: 0 }}
          onPointerMove={onCanvasPointerMove}
          onPointerLeave={hideTipSoon}
          onClick={onCanvasClick}
        >
          <InteractionContext.Provider value={interaction}>
            <HoverContext.Provider value={hover}>
              <ReactFlow
                key={`${viewKey}|${plane ?? 'all'}`}
                nodes={planeRender?.nodes ?? view.nodes}
                edges={planeRender?.edges ?? view.edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                minZoom={0.25}
                maxZoom={2.5}
                fitView
                fitViewOptions={{ padding: 0.03 }}
                onMove={syncZoom}
                onMoveStart={() => {
                  panningRef.current = true;
                  setEdgeTip(null);
                }}
                onMoveEnd={() => {
                  panningRef.current = false;
                }}
              >
                <FlowBridge
                  request={centerRequest}
                  onReady={(i) => {
                    rfRef.current = i;
                  }}
                  onApply={focusNode}
                  onDone={() => setCenterRequest(null)}
                />
              </ReactFlow>
            </HoverContext.Provider>
          </InteractionContext.Provider>
        </div>
        <EdgeTooltip tip={edgeTip} onEnter={cancelHideTip} onLeave={hideTipSoon} />
        <ZoomControls
          zoomPct={zoomPct}
          raised={panelOpen && narrow}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onFit={zoomFit}
        />
        {panelOpen && (
          <DetailPanel
            graph={g}
            nodeId={selectedId}
            focusOnOpen={panelFocusOnOpen}
            onClose={closePanel}
            onGoto={handlePanelGoto}
          />
        )}
        {notice && (
          <div className="notice" role="status">
            {notice}
          </div>
        )}
      </div>
    </div>
  );
}
