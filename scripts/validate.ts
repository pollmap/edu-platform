/**
 * lib/curriculum/* 데이터 무결성 검증.
 *   - ID 유니크
 *   - prerequisites 모두 실재 ID
 *   - DAG (순환 없음)
 *   - 필수 필드 존재
 */
import { CURRICULUM, HIGHSCHOOL_UNITS } from '../lib/curriculum';

const errors: string[] = [];
const warnings: string[] = [];

const allUnits = [...CURRICULUM, ...HIGHSCHOOL_UNITS];
const ids = new Set<string>();

for (const u of allUnits) {
  if (ids.has(u.id)) errors.push(`Duplicate ID: ${u.id}`);
  ids.add(u.id);

  if (!u.title) errors.push(`${u.id}: missing title`);
  if (!u.subject) errors.push(`${u.id}: missing subject`);
  if (!u.componentName) warnings.push(`${u.id}: missing componentName`);
}

// prereq 무결성
for (const u of allUnits) {
  for (const p of u.prerequisites) {
    if (!ids.has(p)) {
      warnings.push(`${u.id}: prerequisite "${p}" not found in CURRICULUM (may be deferred)`);
    }
  }
}

// DAG 검사 (간단 DFS)
const adj = new Map<string, string[]>();
for (const u of allUnits) adj.set(u.id, u.prerequisites);

const WHITE = 0, GRAY = 1, BLACK = 2;
const color = new Map<string, number>();
function dfs(id: string, path: string[]): boolean {
  if (color.get(id) === GRAY) {
    errors.push(`Cycle detected: ${path.join(' → ')} → ${id}`);
    return false;
  }
  if (color.get(id) === BLACK) return true;
  color.set(id, GRAY);
  for (const next of adj.get(id) ?? []) {
    if (!ids.has(next)) continue;
    if (!dfs(next, [...path, id])) return false;
  }
  color.set(id, BLACK);
  return true;
}
for (const u of allUnits) {
  if (color.get(u.id) !== BLACK) dfs(u.id, []);
}

console.log(`[validate] units: ${allUnits.length}`);
console.log(`[validate] errors: ${errors.length}`);
console.log(`[validate] warnings: ${warnings.length}`);
for (const e of errors) console.error('  ERROR:', e);
for (const w of warnings.slice(0, 30)) console.warn('  WARN:', w);
if (warnings.length > 30) console.warn(`  ... and ${warnings.length - 30} more warnings`);

process.exit(errors.length > 0 ? 1 : 0);
