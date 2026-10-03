import { VOLUMES } from '../lib/volumes';
import type { VolumeKey } from '../lib/types';

interface Props {
  viewKey: VolumeKey;
  onView: (k: VolumeKey) => void;
  fixture: boolean;
  onFixture: (v: boolean) => void;
}

export function Toolbar({ viewKey, onView, fixture, onFixture }: Props) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '8px 12px',
        borderBottom: '1px solid var(--rule)',
        background: 'var(--bg)',
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
      <label
        style={{
          marginLeft: 'auto',
          fontSize: 12,
          color: 'var(--ink-soft)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={fixture}
          onChange={(e) => onFixture(e.target.checked)}
        />
        试排：master 候选表（M0 实测）
      </label>
    </header>
  );
}
