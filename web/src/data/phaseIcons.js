import {
  Binary,
  Boxes,
  Coffee,
  Database,
  FolderKanban,
  GitBranch,
  Layers,
  Leaf,
  ListTree,
  MessagesSquare,
  Network,
  PenTool,
  Rocket,
  Server,
} from 'lucide-react';

/** One icon per phase — keyed by phase id so reordering data can't desync it. */
export const PHASE_ICONS = {
  p0: Binary,
  p1: Coffee,
  p2: Boxes,
  p3: Layers,
  p4: ListTree,
  p5: Database,
  p6: Leaf,
  p7: Rocket,
  p8: Server,
  p9: PenTool,
  p10: Network,
  p11: GitBranch,
  p12: FolderKanban,
  p13: MessagesSquare,
};

const HUES = [
  'var(--hue-1)',
  'var(--hue-2)',
  'var(--hue-3)',
  'var(--hue-4)',
  'var(--hue-5)',
  'var(--hue-6)',
  'var(--hue-7)',
  'var(--hue-8)',
];

/** Hue follows the phase's position in the roadmap, so a phase keeps its
 *  colour no matter which subset is being rendered. */
export function hueFor(index) {
  return HUES[index % HUES.length];
}
