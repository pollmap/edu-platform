/**
 * lib/curriculum/* → app/(units)/.../page.tsx stub 일괄 생성.
 *
 * 사용법:
 *   tsx scripts/generate-pages.ts                # dry-run (tmp/pages-output/)
 *   tsx scripts/generate-pages.ts --apply        # app/(units)/ 직접 생성
 *   tsx scripts/generate-pages.ts --only=M9-CR-03
 *   tsx scripts/generate-pages.ts --force        # 기존 파일 덮어쓰기
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
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
  return `// AUTO-GENERATED stub. Sprint 4+ 단원 작성 시 실제 콘텐츠로 교체.
// TODO: pattern={pattern_id} interactive 추가
import { notFound } from 'next/navigation';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
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
          { label: '홈', href: '/' },
          { label: unit.title },
        ]}
      />
      <SectionCard title="개념 (작성 예정)">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">이 단원은 아직 콘텐츠가 채워지지 않았어요.</p>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
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

  for (const u of target) {
    const rel = pagePath(u);
    const full = resolve(outputBase, rel);
    if (!args.force && existsSync(full)) {
      skip++;
      continue;
    }
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, template(u), 'utf8');
    count++;
  }

  console.log(`[generate-pages] wrote ${count} files (${skip} skipped, ${target.length} total)`);
  console.log(`  output base: ${outputBase}`);
  if (!args.apply) console.log('  (dry-run; pass --apply to write into project root)');
}

main();
