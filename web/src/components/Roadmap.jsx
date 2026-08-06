import { useState } from 'react';

const STATUS_LABEL = { done: 'Done', current: 'In progress', upcoming: 'Upcoming' };
const STATUS_ICON = { done: '✓', current: '●', upcoming: '' };

function PhaseRow({ phase, isOpen, onToggle }) {
  const phaseNumber = phase.id.replace('p', '');
  const hasModules = phase.modules.length > 0;
  const doneCount = phase.modules.filter((m) => m.done).length;

  const rowClasses = [
    'phase-row',
    isOpen ? 'open' : '',
    hasModules ? '' : 'no-modules',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rowClasses}>
      <button
        type="button"
        className="phase-head"
        onClick={hasModules ? onToggle : undefined}
        aria-expanded={hasModules ? isOpen : undefined}
      >
        <span className={`badge ${phase.state}`}>{STATUS_ICON[phase.state] || phaseNumber}</span>
        <span className="phase-name">{phase.name}</span>
        {hasModules && (
          <span className="phase-meta">
            {doneCount}/{phase.modules.length} modules
          </span>
        )}
        <span className={`status-pill ${phase.state}`}>{STATUS_LABEL[phase.state]}</span>
        <span className="chevron">▸</span>
      </button>
      {hasModules && isOpen && (
        <ul className="module-list">
          {phase.modules.map((m) => (
            <li key={m.id} className={m.done ? 'done' : ''}>
              <span className="m-check" />
              <span>{m.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Roadmap({ phases, currentPhaseId }) {
  const [openIds, setOpenIds] = useState(() => new Set([currentPhaseId]));

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="block">
      <h3>Roadmap</h3>
      <div className="roadmap">
        {phases.map((phase) => (
          <PhaseRow
            key={phase.id}
            phase={phase}
            isOpen={openIds.has(phase.id)}
            onToggle={() => toggle(phase.id)}
          />
        ))}
      </div>
    </section>
  );
}
