import { useEffect, useMemo, useRef } from 'react';
import { edgeId, type GraphIndex } from '../lib/graph';
import { layerLabel, RELATION_LABEL, splitCitation } from '../lib/labels';
import type { TechEdge, TechNode } from '../lib/types';

interface Props {
  graph: GraphIndex;
  nodeId: string | null;
  focusOnOpen: boolean;
  onClose: () => void;
  onGoto: (id: string) => void;
}

function Citation({ citation }: { citation: string }) {
  const { text, url } = splitCitation(citation);
  return (
    <span>
      {text}{' '}
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link)' }}>
          来源
        </a>
      )}
    </span>
  );
}

function EdgeRow({
  edge,
  other,
  onGoto,
}: {
  edge: TechEdge;
  other: TechNode | undefined;
  onGoto: (id: string) => void;
}) {
  const id = other?.id;
  return (
    <li style={{ marginBottom: 8, listStyle: 'none' }}>
      <button
        onClick={() => id && onGoto(id)}
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: id ? 'pointer' : 'default',
          font: 'inherit',
          color: 'inherit',
        }}
      >
        <span style={{ fontSize: 12 }}>
          <span style={{ color: 'var(--ink-soft)' }}>{other?.label ?? '(缺失)'}</span>
          <span style={{ color: 'var(--ink-soft)' }}> · {RELATION_LABEL[edge.relation]} · </span>
          <span style={{ color: 'var(--ink-soft)', fontSize: 11 }}>{other?.year}</span>
        </span>
        <span style={{ display: 'block', fontSize: 11, lineHeight: '16px', color: 'var(--ink-soft)' }}>
          <Citation citation={edge.citation} />
        </span>
      </button>
    </li>
  );
}

/** 详情框（ui-spec §4）：右侧 360px 固定面板 / <1024px 底部抽屉；非模态、不锁画布 */
export function DetailPanel({ graph, nodeId, focusOnOpen, onClose, onGoto }: Props) {
  const ref = useRef<HTMLElement>(null);
  const node = nodeId ? graph.byId.get(nodeId) : undefined;

  useEffect(() => {
    if (node && focusOnOpen) ref.current?.focus({ preventScroll: true });
  }, [node, focusOnOpen]);

  const { inbound, outbound } = useMemo(() => {
    if (!node) return { inbound: [], outbound: [] };
    const inb = (graph.inEdges.get(node.id) ?? []).map((e) => ({ edge: e, other: graph.byId.get(e.source) }));
    const outb = (graph.outEdges.get(node.id) ?? []).map((e) => ({ edge: e, other: graph.byId.get(e.target) }));
    return { inbound: inb, outbound: outb };
  }, [graph, node]);

  if (!node) return null;

  return (
    <aside
      ref={ref}
      role="complementary"
      aria-label={`节点详情：${node.label}`}
      tabIndex={-1}
      className="detail-panel"
      style={{ outline: 'none' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600 }}>{node.label}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>{node.label_en}</div>
        </div>
        <button
          onClick={onClose}
          aria-label="关闭详情"
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontSize: 16,
            lineHeight: 1,
            color: 'var(--ink-soft)',
            padding: 4,
          }}
        >
          ×
        </button>
      </div>

      <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 8, lineHeight: '18px' }}>
        {node.year}
        {node.year_note && `（${node.year_note}）`} · {layerLabel(node.layer)} · {node.column} · {node.weight}
      </div>

      <p style={{ fontSize: 13, lineHeight: '20px', margin: '10px 0' }}>{node.summary}</p>

      {node.concepts && node.concepts.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
          {node.concepts.map((c) => (
            <span
              key={c}
              style={{
                fontSize: 11,
                color: 'var(--ink-soft)',
                border: '1px solid var(--rule)',
                borderRadius: 3,
                padding: '1px 6px',
              }}
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {node.people && node.people.length > 0 && (
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 8 }}>{node.people.join(' · ')}</div>
      )}

      <div style={{ fontSize: 12, lineHeight: '20px', marginBottom: 6 }}>
        {node.sources.length === 0 ? (
          <span style={{ color: 'var(--ink-soft)' }}>未核验</span>
        ) : (
          node.sources.map((s, i) => (
            <div key={s}>
              <a href={s} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link)' }}>
                来源 {i + 1}
              </a>
            </div>
          ))
        )}
      </div>

      <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 12 }}>
        核验：{node.checked_at}
        {node.archive_url && (
          <>
            {' · '}
            <a href={node.archive_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link)' }}>
              存档
            </a>
          </>
        )}
      </div>

      {inbound.length > 0 && (
        <>
          <h3 className="detail-h">入边（{inbound.length}）</h3>
          <ul style={{ margin: 0, padding: 0 }}>
            {inbound.map(({ edge, other }) => (
              <EdgeRow key={edgeId(edge)} edge={edge} other={other} onGoto={onGoto} />
            ))}
          </ul>
        </>
      )}

      {outbound.length > 0 && (
        <>
          <h3 className="detail-h">出边（{outbound.length}）</h3>
          <ul style={{ margin: 0, padding: 0 }}>
            {outbound.map(({ edge, other }) => (
              <EdgeRow key={edgeId(edge)} edge={edge} other={other} onGoto={onGoto} />
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
