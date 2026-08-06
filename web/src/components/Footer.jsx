export default function Footer({ meta }) {
  return (
    <footer>
      <span>Generated from <code>src/data/progress.js</code> — updated each session.</span>
      <a href={meta.repo} target="_blank" rel="noreferrer">
        {meta.repo.replace('https://', '')}
      </a>
    </footer>
  );
}
