import { useEffect, useRef } from 'react';
import { useReactFlow, useStore, type ReactFlowInstance } from '@xyflow/react';

export interface CenterRequest {
  id: string;
  flash: boolean;
}

interface Props {
  /** 待执行的居中请求（深链 / 跨卷跳转 / 搜索命中）；null = 无 */
  request: CenterRequest | null;
  onReady: (instance: ReactFlowInstance) => void;
  onApply: (id: string, flash: boolean) => void;
  onDone: () => void;
}

const SETTLE_MS = 120; // transform 静止判定窗
const DEADLINE_MS = 1500; // 兜底：超过则强制定位（用户持续平移等极端情况）

/**
 * <ReactFlow> 子组件：拿实例，并在「视口稳定」后执行 pending 居中。
 * 不用 useNodesInitialized：受控 nodes 数组下 store.nodesInitialized 不会因测量翻转（RF v12 实证，
 * setNodes 的 checkEquality 保持旧 internal 对象，标志位停在 false），且 fitView 落位时机不定；
 * 改用 transform 静止作为「fitView 已完成」的信号。
 */
export function FlowBridge({ request, onReady, onApply, onDone }: Props) {
  const instance = useReactFlow();
  const transform = useStore((s) => s.transform);
  const lastChangeRef = useRef(0);
  const armedAtRef = useRef(0);

  useEffect(() => {
    onReady(instance);
  }, [instance, onReady]);

  useEffect(() => {
    lastChangeRef.current = performance.now();
  }, [transform]);

  useEffect(() => {
    if (!request) return;
    armedAtRef.current = performance.now();
    let raf = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const now = performance.now();
      const settled = now - lastChangeRef.current > SETTLE_MS;
      const overdue = now - armedAtRef.current > DEADLINE_MS;
      if (settled || overdue) {
        onApply(request.id, request.flash);
        onDone();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [request, onApply, onDone]);

  return null;
}
