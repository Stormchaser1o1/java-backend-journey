import ThemeToggle from './ThemeToggle';

export default function Header({ meta }) {
  return (
    <header className="top">
      <div>
        <h1>{meta.title}</h1>
        <p>
          Day {meta.dayNumber} · started {meta.startedOn} · last session {meta.lastSession}
        </p>
      </div>
      <div className="top-actions">
        <a className="repo-link" href={meta.repo} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
