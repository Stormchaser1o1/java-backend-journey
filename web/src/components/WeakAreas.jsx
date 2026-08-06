export default function WeakAreas({ weakAreas }) {
  return (
    <section className="block">
      <h3>Weak areas</h3>
      {weakAreas.length === 0 ? (
        <div className="empty-card">None recorded yet — will fill in from quiz performance.</div>
      ) : (
        <div className="empty-card" style={{ fontStyle: 'normal' }}>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {weakAreas.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
