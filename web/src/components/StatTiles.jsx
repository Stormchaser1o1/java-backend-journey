export default function StatTiles({ data }) {
  const { meta, phases, currentPhaseId, revisionDue } = data;

  const currentIndex = phases.findIndex((p) => p.id === currentPhaseId);
  const totalPhases = phases.length;

  const nextRevision = revisionDue
    .slice()
    .sort((a, b) => a.nextRevision.localeCompare(b.nextRevision))[0];

  return (
    <div className="stat-row">
      <div className="stat-tile">
        <div className="label">Overall progress</div>
        <div className="value">{meta.overallProgressPercent}%</div>
        <div className="bar-track">
          <div
            className="bar-fill"
            style={{ width: `${Math.max(meta.overallProgressPercent, 2)}%` }}
          />
        </div>
      </div>

      <div className="stat-tile">
        <div className="label">Current phase</div>
        <div className="value">
          {currentIndex}/{totalPhases - 1}
        </div>
        <div className="sub">{phases[currentIndex]?.name.replace(/^Phase \d+ — /, '')}</div>
      </div>

      <div className="stat-tile">
        <div className="label">Day streak</div>
        <div className="value">🔥 {meta.streakDays}</div>
        <div className="sub">day{meta.streakDays === 1 ? '' : 's'} in a row</div>
      </div>

      <div className="stat-tile">
        <div className="label">Next revision due</div>
        <div className="value">{nextRevision ? nextRevision.nextRevision : '—'}</div>
        <div className="sub">{nextRevision ? nextRevision.topic : 'nothing scheduled'}</div>
      </div>
    </div>
  );
}
