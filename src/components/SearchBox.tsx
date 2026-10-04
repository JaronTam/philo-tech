import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { searchNodes, type SearchIndex } from '../lib/graph';
import { VOLUME_BY_KEY } from '../lib/volumes';
import type { TechNode, VolumeKey } from '../lib/types';

interface Props {
  index: SearchIndex;
  volumeOf: Map<string, VolumeKey>;
  currentView: VolumeKey;
  onSelect: (id: string) => void;
  onOpenChange: (open: boolean) => void;
}

function visibleInView(node: TechNode, volumeOf: Map<string, VolumeKey>, view: VolumeKey): boolean {
  return view === 'main' ? node.master : volumeOf.get(node.id) === view;
}

/** 搜索（ui-spec §5）：域 = label / label_en / concepts / people；Enter 选中首条；无结果显示「无匹配节点」 */
export function SearchBox({ index, volumeOf, currentView, onSelect, onOpenChange }: Props) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => searchNodes(index, q), [index, q]);
  const show = open && q.trim().length > 0;

  useEffect(() => {
    onOpenChange(show);
  }, [show, onOpenChange]);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [q]);

  const choose = (id: string) => {
    onSelect(id);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (show) {
        setOpen(false);
        e.stopPropagation(); // 只关下拉，不触发 App 的「关详情框」
      }
      return;
    }
    if (!show) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      const hit = results[active] ?? results[0];
      if (hit) choose(hit.node.id);
    }
  };

  return (
    <div ref={boxRef} style={{ position: 'relative' }}>
      <input
        type="search"
        value={q}
        placeholder="搜索…"
        role="combobox"
        aria-expanded={show}
        aria-controls="search-listbox"
        aria-activedescendant={show && results[active] ? `search-opt-${results[active].node.id}` : undefined}
        aria-label="搜索节点"
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        style={{
          width: 180,
          padding: '4px 8px',
          fontSize: 13,
          border: '1px solid var(--rule)',
          borderRadius: 4,
          background: 'var(--bg)',
          color: 'var(--ink)',
          outline: 'none',
        }}
      />
      {show && (
        <div className="search-dropdown" id="search-listbox" role="listbox" aria-label="搜索结果">
          {results.length === 0 ? (
            <div role="status" style={{ padding: '6px 10px', fontSize: 12, color: 'var(--ink-soft)' }}>
              无匹配节点
            </div>
          ) : (
            results.map((h, i) => (
              <div
                key={h.node.id}
                id={`search-opt-${h.node.id}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(h.node.id)}
                style={{
                  padding: '5px 10px',
                  fontSize: 13,
                  cursor: 'pointer',
                  background: i === active ? 'var(--lane-a)' : 'transparent',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <span>{h.node.label}</span>
                <span style={{ color: 'var(--ink-soft)', fontSize: 11 }}>
                  {h.node.year}
                  {!visibleInView(h.node, volumeOf, currentView) &&
                    ` · ${VOLUME_BY_KEY[volumeOf.get(h.node.id) ?? 'v1'].title}`}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
