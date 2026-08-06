export default function NextUp({ nextAction }) {
  return (
    <div className="next-card">
      <div className="eyebrow">Up next</div>
      <h2>{nextAction.module}</h2>
      <div className="phase-tag">{nextAction.phase}</div>
      <p>{nextAction.description}</p>
    </div>
  );
}
