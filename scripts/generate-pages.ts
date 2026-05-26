/**
 * lib/curriculum/* → app/(units)/.../page.tsx stub 일괄 생성.
 *
 * 사용법:
 *   tsx scripts/generate-pages.ts                # dry-run (tmp/pages-output/)
 *   tsx scripts/generate-pages.ts --apply        # app/(units)/ 직접 생성
 *   tsx scripts/generate-pages.ts --only=M9-CR-03
 *   tsx scripts/generate-pages.ts --force        # 기존 파일 덮어쓰기
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CURRICULUM, HIGHSCHOOL_UNITS, isHighSchoolUnit } from '../lib/curriculum';
import type { HighSchoolUnit, Unit } from '../lib/types';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

interface CliArgs {
  apply: boolean;
  force: boolean;
  only?: string;
}

function parseCli(): CliArgs {
  const a = process.argv.slice(2);
  return {
    apply: a.includes('--apply'),
    force: a.includes('--force'),
    only: a.find((x) => x.startsWith('--only='))?.split('=')[1],
  };
}

function pagePath(u: Unit | HighSchoolUnit): string {
  if (isHighSchoolUnit(u)) {
    return `app/(units)/highschool/${u.subject}/${u.course ?? 'unknown'}/${u.id}/page.tsx`;
  }
  if (u.schoolLevel === 'cross-grade') {
    return `app/(units)/common/${u.subject}/${u.id}/page.tsx`;
  }
  return `app/(units)/grade-${u.grade}/${u.subject}/${u.id}/page.tsx`;
}

function template(u: Unit | HighSchoolUnit): string {
  return `// AUTO-GENERATED unified unit page. Edit scripts/generate-pages.ts, then regenerate.
import { notFound } from 'next/navigation';
import { UnitInteractiveRenderer } from '@/components/interactive/UnitInteractiveRenderer';
import { UnitLearningMaterial } from '@/components/learning/UnitLearningMaterial';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = ${JSON.stringify(u.id)};

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
        aria-labelledby={\`interactive-\${UNIT_ID}\`}
        className="mb-5 rounded-lg border border-blue-100 bg-white p-4 shadow-sm dark:border-blue-900/60 dark:bg-zinc-950"
      >
        <div className="mb-3">
          <div className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300">Interactive practice</div>
          <h2 id={\`interactive-\${UNIT_ID}\`} className="mt-1 text-2xl font-extrabold text-zinc-950 dark:text-zinc-50">
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
`;
}

function main(): void {
  const args = parseCli();
  const outputBase = args.apply ? ROOT : resolve(ROOT, 'tmp/pages-output');

  let count = 0;
  let skip = 0;
  const all: Array<Unit | HighSchoolUnit> = [...CURRICULUM, ...HIGHSCHOOL_UNITS];
  const target = args.only ? all.filter((u) => u.id === args.only) : all;

  let preserved = 0;
  for (const u of target) {
    const rel = pagePath(u);
    const full = resolve(outputBase, rel);
    if (existsSync(full)) {
      const isStub = readFileSync(full, 'utf8').startsWith('// AUTO-GENERATED stub');
      if (!isStub && !args.force) {
        // Preserve hand-authored content unless an explicit --force regeneration was requested.
        preserved++;
        continue;
      }
      if (!args.force) {
        skip++;
        continue;
      }
    }
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, template(u), 'utf8');
    count++;
  }
  if (preserved > 0) {
    console.log(`  preserved ${preserved} hand-authored file(s) (no AUTO-GENERATED marker)`);
  }

  console.log(`[generate-pages] wrote ${count} files (${skip} skipped, ${target.length} total)`);
  console.log(`  output base: ${outputBase}`);
  if (!args.apply) console.log('  (dry-run; pass --apply to write into project root)');
}

main();
