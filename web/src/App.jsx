import './App.css';
import progress from './data/progress';
import Header from './components/Header';
import StatTiles from './components/StatTiles';
import NextUp from './components/NextUp';
import Roadmap from './components/Roadmap';
import RevisionTable from './components/RevisionTable';
import WeakAreas from './components/WeakAreas';
import Footer from './components/Footer';

function App() {
  return (
    <div className="wrap">
      <Header meta={progress.meta} />
      <StatTiles data={progress} />
      <NextUp nextAction={progress.nextAction} />
      <Roadmap phases={progress.phases} currentPhaseId={progress.currentPhaseId} />
      <RevisionTable revisionDue={progress.revisionDue} />
      <WeakAreas weakAreas={progress.weakAreas} />
      <Footer meta={progress.meta} />
    </div>
  );
}

export default App;
