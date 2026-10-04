import type { ReactNode } from 'react';
import { VOLUMES } from '../lib/volumes';
import type { VolumeKey } from '../lib/types';

interface Props {
  viewKey: VolumeKey;
  onView: (k: VolumeKey) => void;
  /** 右侧控件槽（搜索框 / 收敛 toggle，F-E-3 落值：并入顶栏） */
  right?: ReactNode;
}

export function Toolbar({ viewKey, onView, right }: Props) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '8px 12px',
        borderBottom: '1px solid var(--rule)',
        background: 'var(--bg)',
        flexWrap: 'wrap',
      }}
    >
      <span
        style={{
          fontFamily: '"Songti SC", "SimSun", Georgia, serif',
          fontSize: 16,
          marginRight: 12,
        }}
      >
        技术史图谱
      </span>
      {VOLUMES.map((v) => (
        <button
          key={v.key}
          onClick={() => onView(v.key)}
          style={{
            padding: '4px 10px',
            fontSize: 13,
            cursor: 'pointer',
            border: '1px solid var(--rule)',
            borderRadius: 4,
            background: viewKey === v.key ? 'var(--ink)' : 'transparent',
            color: viewKey === v.key ? 'var(--bg)' : 'var(--ink)',
          }}
        >
          {v.title}
        </button>
      ))}
      {right && <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>{right}</div>}
    </header>
  );
}
