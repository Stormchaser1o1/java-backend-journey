import { CalendarClock, CheckCircle2, Flame, Layers } from 'lucide-react';
import StatCard from './ui/StatCard';
import ProgressBar from './ui/ProgressBar';
import Reveal from './ui/Reveal';
import useReveal from '../hooks/useReveal';
import useCountUp from '../hooks/useCountUp';

function daysUntil(iso) {
  const target = new Date(`${iso}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86_400_000);
}

function relativeDay(iso) {
  const d = daysUntil(iso);
  if (d < 0) return `${Math.abs(d)}d overdue`;
  if (d === 0) return 'Due today';
  if (d === 1) return 'Due tomorrow';
  return `in ${d} days`;
}

export default function Stats({ data }) {
  const { meta, phases, currentPhaseId, revisionDue } = data;
  const [ref, shown] = useReveal();

  const currentIndex = phases.findIndex((p) => p.id === currentPhaseId);
  const allModules = phases.flatMap((p) => p.modules);
  const doneModules = allModules.filter((m) => m.done).length;
  const modulePct = allModules.length ? (doneModules / allModules.length) * 100 : 0;

  const modulesCount = useCountUp(doneModules, { active: shown, duration: 900 });
  const streakCount = useCountUp(meta.streakDays, { active: shown, duration: 900 });

  const next = revisionDue
    .slice()
    .sort((a, b) => a.nextRevision.localeCompare(b.nextRevision))[0];
  const overdue = next && daysUntil(next.nextRevision) < 0;

  return (
    <Reveal as="section" className="stats" aria-label="Progress summary" delay={60}>
      <div ref={ref} className="stats-grid">
        <StatCard
          icon={Layers}
          label="Phase"
          value={`${currentIndex} / ${phases.length - 1}`}
          hint={phases[currentIndex]?.name.replace(/^Phase \d+ — /, '')}
          accent="var(--hue-1)"
        >
          <div className="stat-meter">
            <ProgressBar percent={(currentIndex / (phases.length - 1)) * 100} active={shown} />
          </div>
        </StatCard>

        <StatCard
          icon={CheckCircle2}
          label="Modules done"
          value={modulesCount}
          hint={`of ${allModules.length} mapped so far`}
          accent="var(--hue-4)"
        >
          <div className="stat-meter">
            <ProgressBar percent={modulePct} active={shown} tone="success" />
          </div>
        </StatCard>

        <StatCard
          icon={Flame}
          label="Streak"
          value={
            <span className="streak-num">
              {streakCount}
              <span className="streak-unit">{streakCount === 1 ? 'day' : 'days'}</span>
            </span>
          }
          hint="Keep it alive — show up tomorrow"
          accent="var(--hue-6)"
        >
          <div className="streak-dots" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <span
                key={i}
                className={`streak-dot ${i < meta.streakDays ? 'is-lit' : ''}`}
                style={{ '--i': i }}
              />
            ))}
          </div>
        </StatCard>

        <StatCard
          icon={CalendarClock}
          label="Next revision"
          value={next ? relativeDay(next.nextRevision) : '—'}
          hint={next ? next.topic : 'Nothing scheduled'}
          accent={overdue ? 'var(--danger)' : 'var(--hue-5)'}
        />
      </div>
    </Reveal>
  );
}
