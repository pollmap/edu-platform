import type { HighSchoolUnit, Unit } from '@/lib/types';
import { SUBJECT_TAILWIND } from '@/lib/types';
import { isHighSchoolUnit } from '@/lib/curriculum';
import { Breadcrumb } from './Breadcrumb';

interface UnitHeaderProps {
  unit: Unit | HighSchoolUnit;
  breadcrumb: Array<{ label: string; href?: string }>;
}

export function UnitHeader({ unit, breadcrumb }: UnitHeaderProps) {
  const tw = SUBJECT_TAILWIND[unit.subject];
  return (
    <header className="mb-6 space-y-3">
      <Breadcrumb items={breadcrumb} />
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-2 py-0.5 text-xs rounded-full ${tw.bg} ${tw.text} font-semibold font-mono`}>
          {unit.id}
        </span>
        <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-semibold dark:bg-amber-900 dark:text-amber-200">
          {unit.priority}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {unit.domain}
          {isHighSchoolUnit(unit) ? ` · ${unit.courseName}` : ''}
        </span>
      </div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{unit.title}</h1>
      {unit.interactiveTitle ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{unit.interactiveTitle}</p>
      ) : null}
    </header>
  );
}
