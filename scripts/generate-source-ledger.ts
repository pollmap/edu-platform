import { writeFileSync } from 'node:fs';
import { CURRICULUM, HIGHSCHOOL_UNITS, isHighSchoolUnit } from '../lib/curriculum';
import { getUnitBlueprint } from '../lib/unit-blueprints';
import { SUBJECT_LABEL } from '../lib/types';

const allUnits = [...CURRICULUM, ...HIGHSCHOOL_UNITS];

function escapeCell(value: unknown): string {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
}

const rows: string[] = [];

rows.push('# Unit Source Ledger');
rows.push('');
rows.push('Generated from the active UnitBlueprint registry on 2026-05-22. The app exposes only verified rows. The 96 expansion slots are blocked until a traceable official per-unit row or document locator is recorded.');
rows.push('');
rows.push('| unitId | subject | schoolLevel | domainOrCourse | title | officialUrl | documentTitle | documentDate | locator | evidenceText | verificationStatus |');
rows.push('|---|---|---|---|---|---|---|---|---|---|---|');

for (const unit of allUnits) {
  const blueprint = getUnitBlueprint(unit.id);
  const source = blueprint?.sourceRefs.find((ref) => ref.sourceType === 'official-primary') ?? blueprint?.sourceRefs[0];
  const domainOrCourse = isHighSchoolUnit(unit) ? (unit.courseName ?? unit.course) : unit.domain;

  rows.push(`| ${[
    unit.id,
    SUBJECT_LABEL[unit.subject],
    unit.schoolLevel,
    domainOrCourse,
    unit.title,
    source?.officialUrl ?? source?.url ?? source?.document ?? '',
    source?.documentTitle ?? '',
    source?.documentDate ?? '',
    source?.locator ?? '',
    source?.evidenceText ?? '',
    source?.verificationStatus ?? 'needs-review',
  ].map(escapeCell).join(' | ')} |`);
}

for (let index = 1; index <= 96; index += 1) {
  rows.push(`| ${[
    `BLOCKED-NO-ID-${String(index).padStart(3, '0')}`,
    'unassigned',
    'unassigned',
    'unassigned',
    'unassigned',
    'not admitted to app data',
    'No official per-unit row recorded',
    'not verified',
    'No locator',
    'Blocked: no traceable official row or document evidence has been recorded for this expansion slot.',
    'blocked',
  ].map(escapeCell).join(' | ')} |`);
}

rows.push('');
rows.push('## Source Policy Notes');
rows.push('');
rows.push('- NCIC (`https://www.ncic.re.kr/`) is the primary official curriculum source for active verified units.');
rows.push('- High-school credit-system context uses `https://www.hscredit.net/` only as a secondary course-context source.');
rows.push('- The blocked rows are not app data and must not be counted in `OFFICIAL_VERIFIED_UNIT_TARGET`.');
rows.push('- `OFFICIAL_VERIFIED_UNIT_TARGET` remains 392 until all 488 rows are verified with official locators and evidence text.');

writeFileSync('docs/unit-source-ledger.md', `${rows.join('\n')}\n`, 'utf8');

console.log(`[source-ledger] wrote ${allUnits.length + 96} rows to docs/unit-source-ledger.md`);
