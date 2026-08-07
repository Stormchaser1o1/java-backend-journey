import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Check, ChevronDown, Circle, ExternalLink, Loader } from 'lucide-react';
import { PHASE_ICONS, hueFor } from '../data/phaseIcons';
import { noteFor, noteUrl } from '../data/notes';
import ProgressBar from './ui/ProgressBar';
import Reveal from './ui/Reveal';
import RichText from './ui/RichText';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'current', label: 'In progress' },
  { id: 'upcoming', label: 'Upcoming' },
];

const STATE_META = {
  done: { label: 'Done', pill: 'pill-success', Icon: Check },
  current: { label: 'In progress', pill: 'pill-accent', Icon: Loader },
  upcoming: { label: 'Upcoming', pill: 'pill-muted', Icon: Circle },
};

/** Animates between 0 and the measured content height so the accordion
 *  never jumps, and settles on `auto` so nested content can reflow. */
function Collapse({ open, children }) {
  const inner = useRef(null);
  const [height, setHeight] = useState(open ? 'auto' : 0);

  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;

    if (open) {
      setHeight(el.scrollHeight);
      const t = setTimeout(() => setHeight('auto'), 260);
      return () => clearTimeout(t);
    }

    setHeight(el.scrollHeight);
    const raf = requestAnimationFrame(() => setHeight(0));
    return () => cancelAnimationFrame(raf);
  }, [open, children]);

  return (
    <div className="collapse" style={{ height }} aria-hidden={!open}>
      <div ref={inner}>{children}</div>
    </div>
  );
}

/** Skimmable revision card: summary bullets + the interview hits. */
function ModuleNote({ note, id }) {
  return (
    <div className="module-note" id={id}>
      <p className="note-heading">Key points</p>
      <ul className="note-points">
        {note.keyPoints.map((point, i) => (
          <li key={i}>
            <RichText text={point} />
          </li>
        ))}
      </ul>

      <p className="note-heading">Interview hits</p>
      <ul className="note-qa">
        {note.interview.map((item, i) => (
          <li key={i}>
            <p className="note-q">
              <RichText text={item.q} />
            </p>
            <p className="note-a">
              <RichText text={item.a} />
            </p>
          </li>
        ))}
      </ul>

      <a className="note-link" href={noteUrl(note)} target="_blank" rel="noreferrer">
        Read the full Day {String(note.day).padStart(3, '0')} note
        <ExternalLink size={12} strokeWidth={2.2} aria-hidden="true" />
      </a>
    </div>
  );
}

function ModuleRow({ phaseId, module: m, index, noteOpen, onToggleNote }) {
  const note = noteFor(phaseId, m.id);
  const noteId = `note-${phaseId}-${m.id}`;
  const open = note && noteOpen;

  const inner = (
    <>
      <span className="module-check">
        {m.done && <Check size={11} strokeWidth={3.6} aria-hidden="true" />}
      </span>
      <span className="module-name">{m.name}</span>
      {m.done && <span className="sr-only">completed</span>}
      {note && (
        <>
          <span className="module-day">Day {String(note.day).padStart(3, '0')}</span>
          <ChevronDown size={14} className="module-chevron" aria-hidden="true" />
        </>
      )}
    </>
  );

  return (
    <li
      className={`module ${m.done ? 'is-done' : ''} ${note ? 'has-note' : ''} ${
        open ? 'is-note-open' : ''
      }`}
      style={{ '--i': index }}
    >
      {note ? (
        <button
          type="button"
          className="module-row"
          onClick={onToggleNote}
          aria-expanded={open}
          aria-controls={noteId}
        >
          {inner}
        </button>
      ) : (
        <div className="module-row">{inner}</div>
      )}

      {open && <ModuleNote note={note} id={noteId} />}
    </li>
  );
}

function PhaseRow({ phase, index, open, onToggle, openNotes, onToggleNote }) {
  const Icon = PHASE_ICONS[phase.id];
  const { label, pill, Icon: StateIcon } = STATE_META[phase.state];
  const hue = hueFor(index);

  const total = phase.modules.length;
  const done = phase.modules.filter((m) => m.done).length;
  const pct = total ? (done / total) * 100 : 0;
  const panelId = `phase-panel-${phase.id}`;

  return (
    <li className={`phase ${phase.state} ${open ? 'is-open' : ''}`} style={{ '--hue': hue }}>
      <span className="phase-rail" aria-hidden="true" />

      <button
        type="button"
        className="phase-btn"
        onClick={total ? onToggle : undefined}
        disabled={!total}
        aria-expanded={total ? open : undefined}
        aria-controls={total ? panelId : undefined}
      >
        <span className="phase-node">
          <Icon size={16} strokeWidth={2.1} aria-hidden="true" />
          {phase.state === 'done' && (
            <span className="phase-node-badge">
              <Check size={9} strokeWidth={4} aria-hidden="true" />
            </span>
          )}
          {phase.state === 'current' && <span className="phase-node-ping" aria-hidden="true" />}
        </span>

        <span className="phase-body">
          <span className="phase-title-row">
            <span className="phase-title">{phase.name}</span>
            <span className={`pill ${pill} phase-state`}>
              <StateIcon size={10} strokeWidth={3} aria-hidden="true" />
              {label}
            </span>
          </span>

          {total > 0 && (
            <span className="phase-progress">
              <ProgressBar percent={pct} height={4} tone={done === total ? 'success' : 'gradient'} />
              <span className="phase-count">
                {done}/{total}
              </span>
            </span>
          )}
        </span>

        {total > 0 && <ChevronDown size={16} className="phase-chevron" aria-hidden="true" />}
      </button>

      {total > 0 && (
        <Collapse open={open}>
          <ul className="modules" id={panelId}>
            {phase.modules.map((m, i) => (
              <ModuleRow
                key={m.id}
                phaseId={phase.id}
                module={m}
                index={i}
                noteOpen={openNotes.has(`${phase.id}:${m.id}`)}
                onToggleNote={() => onToggleNote(`${phase.id}:${m.id}`)}
              />
            ))}
          </ul>
        </Collapse>
      )}
    </li>
  );
}

/** Every "<phaseId>:<moduleId>" that has a revision note, in roadmap order. */
function notedKeys(phases) {
  return phases.flatMap((p) =>
    p.modules.filter((m) => noteFor(p.id, m.id)).map((m) => `${p.id}:${m.id}`)
  );
}

export default function Roadmap({ phases, currentPhaseId }) {
  const [filter, setFilter] = useState('all');
  const [openIds, setOpenIds] = useState(() => new Set([currentPhaseId]));
  const [openNotes, setOpenNotes] = useState(() => new Set());

  const visible = useMemo(
    () => (filter === 'all' ? phases : phases.filter((p) => p.state === filter)),
    [filter, phases]
  );

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleNote = (key) =>
    setOpenNotes((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const expandable = visible.filter((p) => p.modules.length > 0);
  const allOpen = expandable.length > 0 && expandable.every((p) => openIds.has(p.id));

  // Revision mode: every taught module's notes open at once, for a morning skim.
  const allNoteKeys = useMemo(() => notedKeys(phases), [phases]);
  const revising = allNoteKeys.length > 0 && allNoteKeys.every((k) => openNotes.has(k));

  const toggleRevision = () => {
    if (revising) {
      setOpenNotes(new Set());
      return;
    }
    setOpenNotes(new Set(allNoteKeys));
    setOpenIds(new Set(phases.filter((p) => p.modules.length > 0).map((p) => p.id)));
    setFilter('all');
  };

  return (
    <Reveal as="section" className="section" id="roadmap" aria-labelledby="roadmap-title">
      <header className="section-head">
        <div>
          <h2 id="roadmap-title" className="section-title">
            Roadmap
          </h2>
          <p className="section-sub">
            14 phases from fundamentals to interview-ready · tap any{' '}
            <span className="sub-accent">Day</span> module for its revision notes
          </p>
        </div>

        <div className="section-tools">
          {allNoteKeys.length > 0 && (
            <button
              type="button"
              className={`btn btn-sm revision-toggle ${revising ? 'is-active' : ''}`}
              onClick={toggleRevision}
              aria-pressed={revising}
            >
              <BookOpen size={13} strokeWidth={2.2} aria-hidden="true" />
              {revising ? 'Close notes' : 'Revision mode'}
            </button>
          )}

          <div className="segmented" role="tablist" aria-label="Filter phases">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={`segment ${filter === f.id ? 'is-active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {expandable.length > 0 && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() =>
                setOpenIds(allOpen ? new Set() : new Set(expandable.map((p) => p.id)))
              }
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          )}
        </div>
      </header>

      {visible.length === 0 ? (
        <p className="empty">No phases match this filter.</p>
      ) : (
        <ul className="timeline">
          {visible.map((phase) => (
            <PhaseRow
              key={phase.id}
              phase={phase}
              index={phases.indexOf(phase)}
              open={openIds.has(phase.id)}
              onToggle={() => toggle(phase.id)}
              openNotes={openNotes}
              onToggleNote={toggleNote}
            />
          ))}
        </ul>
      )}
    </Reveal>
  );
}
