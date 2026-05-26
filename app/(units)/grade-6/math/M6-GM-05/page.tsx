// AUTO-GENERATED unified unit page. Edit scripts/generate-pages.ts, then regenerate.
import { notFound } from 'next/navigation';
import { UnitInteractiveRenderer } from '@/components/interactive/UnitInteractiveRenderer';
import { UnitLearningMaterial } from '@/components/learning/UnitLearningMaterial';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = "M6-GM-05";

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <UnitLearningMaterial unit={unit} />

      <section
        aria-labelledby={`interactive-${UNIT_ID}`}
        className="mb-5 rounded-lg border border-blue-100 bg-white p-4 shadow-sm dark:border-blue-900/60 dark:bg-zinc-950"
      >
        <div className="mb-3">
          <div className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300">Interactive practice</div>
          <h2 id={`interactive-${UNIT_ID}`} className="mt-1 text-2xl font-extrabold text-zinc-950 dark:text-zinc-50">
            조작 영역
          </h2>
        </div>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitInteractiveRenderer unitId={UNIT_ID} />
        </InteractiveErrorBoundary>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </section>
    </main>
  );
}
