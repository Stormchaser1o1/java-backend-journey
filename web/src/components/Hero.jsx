import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import ProgressRing from './ui/ProgressRing';
import Reveal from './ui/Reveal';

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Burning the midnight oil';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Hero({ meta, nextAction }) {
  return (
    <Reveal as="section" className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-main">
        <span className="pill pill-accent hero-badge">
          <Sparkles size={11} strokeWidth={2.4} aria-hidden="true" />
          Up next
        </span>

        <p className="hero-greeting">{greeting()}, Yogender.</p>
        <h1 id="hero-title" className="hero-title">
          {nextAction.module}
        </h1>
        <p className="hero-desc">{nextAction.description}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#roadmap">
            Start this module
            <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </a>
          <span className="hero-meta">
            <Calendar size={13} strokeWidth={2} aria-hidden="true" />
            {nextAction.phase}
          </span>
        </div>
      </div>

      <div className="hero-ring">
        <ProgressRing percent={meta.overallProgressPercent} size={156} stroke={11} />
        <p className="hero-ring-cap">
          Started {new Date(meta.startedOn).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>
    </Reveal>
  );
}
