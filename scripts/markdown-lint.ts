/**
 * docs/00-MASTER-INDEX.md 표 헤더 일관성 검증.
 *   - 표 헤더 컬럼 수가 데이터 행과 일치
 *   - 알려진 헤더 패턴 외 emit warning
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const INPUT = resolve(ROOT, 'docs/00-MASTER-INDEX.md');

// 알려진 헤더 (단원 표 + 부수 표). 단원 표 헤더 외에는 lint 의미 약함.
const KNOWN_HEADERS: string[][] = [
  ['ID', '영역', '단원', '인터랙티브 후보', '우선'],
  ['ID', '영역', '단원', '인터랙티브', '우선'],
  ['ID', '영역', '주제', '인터랙티브 후보', '적용학년'],
  ['ID', '영역', '주제', '인터랙티브', '적용학년'],
  ['ID', '영역', '주제', '인터랙티브 후보', '적용'],
  ['ID', '영역', '주제', '인터랙티브', '적용'],
  ['ID', '단원', '인터랙티브', '우선'],
  ['ID', '단원', '인터랙티브 후보', '우선'],
  ['ID', '영역', '핵심', '우선'],
  ['과목', '코드', '핵심', '우선'],
  ['과목', '코드', '핵심 (인터랙티브)', '우선'],
  ['과목', '코드', '핵심 (인터랙티브 후보)', '우선'],
  ['과목', '코드', '핵심 단원 (인터랙티브 후보)', '우선'],
  // 메타 표 (단원이 아님)
  ['컬럼', '의미'],
  ['자료', 'URL', '용도'],
  ['학교급', '수학', '과학', '국어', '영어', '사회', '합계'],
  ['이름', '값'],
];

// 정책: 헤더가 unknown 이어도 단원 행이 없으면 메타 표로 간주 → warn
// 컬럼 수 mismatch 만 fail.

function parseRow(line: string): string[] | null {
  if (!line.trim().startsWith('|')) return null;
  return line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
}

const md = readFileSync(INPUT, 'utf8');
const lines = md.split(/\r?\n/);
let inTable = false;
let headerCells: string[] = [];
let tableLineStart = 0;
const errors: string[] = [];
const warnings: string[] = [];

for (let i = 0; i < lines.length; i++) {
  const cells = parseRow(lines[i]);
  if (!cells) {
    if (inTable) inTable = false;
    continue;
  }
  // separator row
  if (cells.every((c) => /^[-:]+$/.test(c))) {
    if (cells.length !== headerCells.length) {
      errors.push(`L${i + 1}: separator/header column mismatch (${cells.length} vs ${headerCells.length})`);
    }
    continue;
  }
  if (!inTable) {
    inTable = true;
    headerCells = cells;
    tableLineStart = i + 1;
    const matched = KNOWN_HEADERS.some(
      (h) => h.length === cells.length && h.every((v, idx) => cells[idx] === v),
    );
    if (!matched) {
      warnings.push(`L${i + 1}: unknown table header: [${cells.join(' | ')}]`);
    }
  } else {
    if (cells.length !== headerCells.length) {
      errors.push(`L${i + 1}: row column count ${cells.length} != header ${headerCells.length} (table from L${tableLineStart})`);
    }
  }
}

console.log(`[markdown-lint] checked ${INPUT}`);
console.log(`[markdown-lint] errors: ${errors.length}`);
console.log(`[markdown-lint] warnings: ${warnings.length}`);
for (const m of errors) console.error('  ERROR:', m);
for (const m of warnings.slice(0, 20)) console.warn('  WARN:', m);
if (warnings.length > 20) console.warn(`  ... ${warnings.length - 20} more`);

process.exit(errors.length > 0 ? 1 : 0);
