import progress from './data/progress';
import useTheme from './hooks/useTheme';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Roadmap from './components/Roadmap';
import Revision from './components/Revision';
import Footer from './components/Footer';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <TopBar meta={progress.meta} theme={theme} onToggleTheme={toggle} />

      <main id="main" className="shell" tabIndex={-1}>
        <span id="top" />
        <Hero meta={progress.meta} nextAction={progress.nextAction} />
        <Stats data={progress} />
        <Roadmap phases={progress.phases} currentPhaseId={progress.currentPhaseId} />
        <Revision revisionDue={progress.revisionDue} weakAreas={progress.weakAreas} />
        <Footer meta={progress.meta} />
      </main>
    </>
  );
}
