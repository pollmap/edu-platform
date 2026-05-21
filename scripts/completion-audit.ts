/**
 * Repository completion audit.
 *
 * This checks coverage that can be verified from the repository itself:
 *   - every registered unit is no longer `planned`
 *   - every ID listed in docs/00-MASTER-INDEX.md is registered in the app
 *   - every registered unit has a route page
 *   - generated placeholder pages are gone
 *   - every active unit page wraps its interactive in InteractiveErrorBoundary
 *   - every active unit componentName is exported from components/interactive
 *   - public GitHub hygiene docs exist
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { CURRICULUM, HIGHSCHOOL_UNITS, unitPath } from '../lib/curriculum';
import type { HighSchoolUnit, Unit } from '../lib/types';

type AnyUnit = Unit | HighSchoolUnit;

interface CountBucket {
  total: number;
  active: number;
  planned: number;
}

const ROOT = join(__dirname, '..');
const allUnits: AnyUnit[] = [...CURRICULUM, ...HIGHSCHOOL_UNITS];
const requiredDocs = ['README.md', 'LICENSE', 'LICENSE-CONTENT.md', 'SECURITY.md', 'CONTRIBUTING.md'];
const UNIT_ID_PATTERN = /\|\s*([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)\s*\|/g;

function bump(map: Map<string, CountBucket>, key: string, unit: AnyUnit) {
  const bucket = map.get(key) ?? { total: 0, active: 0, planned: 0 };
  bucket.total += 1;
  if (unit.status === 'planned') bucket.planned += 1;
  else bucket.active += 1;
  map.set(key, bucket);
}

function routeFile(unit: AnyUnit): string {
  return join(ROOT, 'app', '(units)', ...unitPath(unit).slice(1).split('/'), 'page.tsx');
}

function walkTsx(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTsx(p));
    else if (/\.tsx?$/.test(entry.name)) out.push(p);
  }
  return out;
}

function exportedInteractiveNames(): Set<string> {
  const names = new Set<string>();
  const files = walkTsx(join(ROOT, 'components', 'interactive'));
  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    for (const match of src.matchAll(/export\s+(?:function|const)\s+([A-Za-z0-9_]+)/g)) {
      names.add(match[1]);
    }
  }
  return names;
}

function masterIndexIds(): Set<string> {
  const src = readFileSync(join(ROOT, 'docs', '00-MASTER-INDEX.md'), 'utf8');
  const ids = new Set<string>();
  for (const match of src.matchAll(UNIT_ID_PATTERN)) {
    if (match[1] !== 'ID') ids.add(match[1]);
  }
  return ids;
}

const statusCounts = new Map<string, number>();
const subjectCounts = new Map<string, CountBucket>();
const levelCounts = new Map<string, CountBucket>();
const plannedUnits: string[] = [];
const missingPages: string[] = [];
const stubPages: string[] = [];
const activeWithoutInteractiveBoundary: string[] = [];
const missingDocs = requiredDocs.filter((p) => !existsSync(join(ROOT, p)));
const masterIds = masterIndexIds();
const registeredIds = new Set(allUnits.map((unit) => unit.id));
const masterIdsMissingFromApp = [...masterIds].filter((id) => !registeredIds.has(id)).sort();
const appIdsMissingFromMaster = [...registeredIds].filter((id) => !masterIds.has(id)).sort();

for (const unit of allUnits) {
  statusCounts.set(unit.status, (statusCounts.get(unit.status) ?? 0) + 1);
  bump(subjectCounts, unit.subject, unit);
  const levelKey =
    unit.schoolLevel === 'highschool'
      ? `highschool:${(unit as HighSchoolUnit).category}`
      : unit.schoolLevel;
  bump(levelCounts, levelKey, unit);

  if (unit.status === 'planned') plannedUnits.push(`${unit.id} ${unitPath(unit)}`);

  const page = routeFile(unit);
  if (!existsSync(page)) {
    missingPages.push(`${unit.id} ${unitPath(unit)}`);
    continue;
  }

  const src = readFileSync(page, 'utf8');
  if (
    src.startsWith('// AUTO-GENERATED stub') ||
    src.includes('개념 (작성 예정)') ||
    src.includes('TODO: pattern=')
  ) {
    stubPages.push(`${unit.id} ${relative(ROOT, page)}`);
  }
  if (unit.status !== 'planned' && !src.includes('InteractiveErrorBoundary')) {
    activeWithoutInteractiveBoundary.push(`${unit.id} ${relative(ROOT, page)}`);
  }
}

const exportedNames = exportedInteractiveNames();
const missingComponents = allUnits
  .filter((unit) => unit.status !== 'planned' && unit.componentName && !exportedNames.has(unit.componentName))
  .map((unit) => `${unit.id}: ${unit.componentName}`);

const blockers = [
  ...masterIdsMissingFromApp.map((id) => `master index ID is not registered in app: ${id}`),
  ...appIdsMissingFromMaster.map((id) => `app unit ID is missing from master index: ${id}`),
  ...plannedUnits.map((v) => `planned unit remains: ${v}`),
  ...missingPages.map((v) => `missing route page: ${v}`),
  ...stubPages.map((v) => `generated placeholder page remains: ${v}`),
  ...activeWithoutInteractiveBoundary.map((v) => `active page lacks InteractiveErrorBoundary: ${v}`),
  ...missingComponents.map((v) => `missing interactive export: ${v}`),
  ...missingDocs.map((v) => `missing repository document: ${v}`),
];

const report = {
  totals: {
    masterIndexIds: masterIds.size,
    units: allUnits.length,
    appUnits: CURRICULUM.length,
    highschoolUnits: HIGHSCHOOL_UNITS.length,
    activeUnits: allUnits.filter((unit) => unit.status !== 'planned').length,
    plannedUnits: plannedUnits.length,
    interactiveExports: exportedNames.size,
  },
  statusCounts: Object.fromEntries([...statusCounts].sort()),
  subjectCounts: Object.fromEntries([...subjectCounts].sort()),
  levelCounts: Object.fromEntries([...levelCounts].sort()),
  blockers,
};

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log('[completion-audit] repository completion coverage');
  console.log(
    `[completion-audit] units: ${report.totals.activeUnits}/${report.totals.units} active, ${report.totals.plannedUnits} planned`,
  );
  console.log(
    `[completion-audit] master index: ${report.totals.units}/${report.totals.masterIndexIds} IDs registered`,
  );
  console.log(`[completion-audit] interactive exports: ${report.totals.interactiveExports}`);
  console.log(`[completion-audit] blockers: ${blockers.length}`);
  for (const [subject, bucket] of Object.entries(report.subjectCounts)) {
    console.log(
      `  ${subject}: ${bucket.active}/${bucket.total} active, ${bucket.planned} planned`,
    );
  }
  for (const blocker of blockers.slice(0, 50)) {
    console.error(`  ERROR: ${blocker}`);
  }
  if (blockers.length > 50) console.error(`  ... ${blockers.length - 50} more`);
}

process.exit(blockers.length > 0 ? 1 : 0);
