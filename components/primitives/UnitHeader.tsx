import { isHighSchoolUnit } from '@/lib/curriculum';
import type { HighSchoolUnit, Unit } from '@/lib/types';
import { SUBJECT_TAILWIND } from '@/lib/types';
import { Breadcrumb } from './Breadcrumb';
import { UnitProgressBadge } from './UnitProgressBadge';

interface UnitHeaderProps {
  unit: Unit | HighSchoolUnit;
  breadcrumb: Array<{ label: string; href?: string }>;
}

export function UnitHeader({ unit, breadcrumb }: UnitHeaderProps) {
  const tw = SUBJECT_TAILWIND[unit.subject];

  return (
    <header className="mb-6 space-y-3">
      <Breadcrumb items={breadcrumb} />
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 font-mono text-xs font-semibold ${tw.bg} ${tw.text}`}>
          {unit.id}
        </span>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900 dark:text-amber-200">
          {unit.priority}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {unit.domain}
          {isHighSchoolUnit(unit) ? ` · ${unit.courseName ?? ''}` : ''}
        </span>
        <UnitProgressBadge unitId={unit.id} />
      </div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{unit.title}</h1>
      {unit.interactiveTitle ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{unit.interactiveTitle}</p>
      ) : null}
    </header>
  );
}
