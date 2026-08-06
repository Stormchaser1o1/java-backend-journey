export default function RevisionTable({ revisionDue }) {
  return (
    <section className="block">
      <h3>Revision schedule</h3>
      {revisionDue.length === 0 ? (
        <div className="empty-card">Nothing scheduled yet.</div>
      ) : (
        <table className="revision">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Taught on</th>
              <th>Next revision</th>
            </tr>
          </thead>
          <tbody>
            {revisionDue.map((row) => (
              <tr key={row.topic}>
                <td>{row.topic}</td>
                <td>{row.taughtOn}</td>
                <td>
                  {row.nextRevision} <span style={{ color: 'var(--text-muted)' }}>({row.label})</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
