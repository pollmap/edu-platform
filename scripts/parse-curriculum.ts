/**
 * docs/00-MASTER-INDEX.md → lib/curriculum/*.ts 자동 생성
 *
 * 사용법:
 *   tsx scripts/parse-curriculum.ts             # tmp/ 출력 (dry-run)
 *   tsx scripts/parse-curriculum.ts --apply     # lib/curriculum/* 직접 갱신
 *
 * 정책:
 *   - 초중 5-col 표 (ID·영역·단원·인터랙티브·우선) 지원
 *   - 학년 공통 K-/E- 5-col 표 (ID·영역·주제·인터랙티브·적용학년) 지원
 *   - 고등 공통 4-col 표 (ID·단원·인터랙티브·우선) 지원
 *   - 고등 진로/융합 묶음 표 (과목·코드·핵심·우선) 는 course-level 로 1행 1단원 처리
 *   - 출력 결정론성: 단원 정렬 + 안정 직렬화
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..');
const INPUT = resolve(ROOT, 'docs/00-MASTER-INDEX.md');

type Subject = 'math' | 'science' | 'korean' | 'english' | 'social';
type SchoolLevel = 'elementary' | 'middle' | 'highschool' | 'cross-grade';
type Priority = 'P0' | 'P1' | 'P2';
type HSCategory = 'common' | 'general' | 'career' | 'fusion';

interface ParsedUnit {
  id: string;
  subject: Subject;
  schoolLevel: SchoolLevel;
  grade?: number;
  domain: string;
  domainCode: string;
  title: string;
  interactiveTitle: string;
  priority: Priority;
  prerequisites: string[];
  achievementStandards: string[];
  componentName: string;
  status: 'planned' | 'draft';
  // 고등
  category?: HSCategory;
  course?: string;
  courseName?: string;
}

const SUBJECT_BY_HEADER: Record<string, Subject> = {
  '수학': 'math',
  '과학': 'science',
  '국어': 'korean',
  '영어': 'english',
  '사회': 'social',
};

const COURSE_BY_PREFIX: Record<string, { slug: string; name: string; subject: Subject; category: HSCategory }> = {
  // 수학 공통
  'M-CM1': { slug: 'common-math-1', name: '공통수학1', subject: 'math', category: 'common' },
  'M-CM2': { slug: 'common-math-2', name: '공통수학2', subject: 'math', category: 'common' },
  // 수학 일반선택
  'M-AL': { slug: 'algebra', name: '대수', subject: 'math', category: 'general' },
  'M-CA1': { slug: 'calculus-1', name: '미적분Ⅰ', subject: 'math', category: 'general' },
  'M-PS': { slug: 'probability-statistics', name: '확률과 통계', subject: 'math', category: 'general' },
  // 수학 진로
  'M-CA2': { slug: 'calculus-2', name: '미적분Ⅱ', subject: 'math', category: 'career' },
  'M-GE': { slug: 'geometry', name: '기하', subject: 'math', category: 'career' },
  'M-EM': { slug: 'economic-math', name: '경제 수학', subject: 'math', category: 'career' },
  'M-AM': { slug: 'ai-math', name: '인공지능 수학', subject: 'math', category: 'career' },
  // 수학 융합
  'M-MC': { slug: 'math-culture', name: '수학과 문화', subject: 'math', category: 'fusion' },
  'M-AS': { slug: 'applied-statistics', name: '실용 통계', subject: 'math', category: 'fusion' },
  'M-MR': { slug: 'math-research', name: '수학과제 탐구', subject: 'math', category: 'fusion' },
  // 과학 공통
  'S-IS1': { slug: 'integrated-science-1', name: '통합과학1', subject: 'science', category: 'common' },
  'S-IS2': { slug: 'integrated-science-2', name: '통합과학2', subject: 'science', category: 'common' },
  'S-LE1': { slug: 'science-lab-1', name: '과학탐구실험1', subject: 'science', category: 'common' },
  'S-LE2': { slug: 'science-lab-2', name: '과학탐구실험2', subject: 'science', category: 'common' },
  // 과학 일반
  'S-PHY': { slug: 'physics', name: '물리학', subject: 'science', category: 'general' },
  'S-CHE': { slug: 'chemistry', name: '화학', subject: 'science', category: 'general' },
  'S-BIO': { slug: 'biology', name: '생명과학', subject: 'science', category: 'general' },
  'S-EAR': { slug: 'earth-science', name: '지구과학', subject: 'science', category: 'general' },
  // 과학 진로
  'S-MEC': { slug: 'mechanics-energy', name: '역학과 에너지', subject: 'science', category: 'career' },
  'S-EMQ': { slug: 'electromagnetism-quantum', name: '전자기와 양자', subject: 'science', category: 'career' },
  'S-CME': { slug: 'matter-energy', name: '물질과 에너지', subject: 'science', category: 'career' },
  'S-CRW': { slug: 'chemical-reactions', name: '화학반응의 세계', subject: 'science', category: 'career' },
  'S-CMB': { slug: 'cell-metabolism', name: '세포와 물질대사', subject: 'science', category: 'career' },
  'S-GEN': { slug: 'genetics', name: '생물의 유전', subject: 'science', category: 'career' },
  'S-ESS': { slug: 'earth-system', name: '지구시스템과학', subject: 'science', category: 'career' },
  'S-PSS': { slug: 'planetary-space', name: '행성우주과학', subject: 'science', category: 'career' },
  // 과학 융합
  'S-SHC': { slug: 'science-history-culture', name: '과학의 역사와 문화', subject: 'science', category: 'fusion' },
  'S-CEE': { slug: 'climate-environment', name: '기후변화와 환경생태', subject: 'science', category: 'fusion' },
  'S-CST': { slug: 'science-thinking', name: '융합과학 탐구', subject: 'science', category: 'fusion' },
  // 국어
  'K-CK1': { slug: 'korean-common-1', name: '공통국어1', subject: 'korean', category: 'common' },
  'K-CK2': { slug: 'korean-common-2', name: '공통국어2', subject: 'korean', category: 'common' },
  'K-CL': { slug: 'speaking-language', name: '화법과 언어', subject: 'korean', category: 'general' },
  'K-RW': { slug: 'reading-writing', name: '독서와 작문', subject: 'korean', category: 'general' },
  'K-LIT': { slug: 'literature', name: '문학', subject: 'korean', category: 'general' },
  'K-TR': { slug: 'topic-reading', name: '주제 탐구 독서', subject: 'korean', category: 'career' },
  'K-LF': { slug: 'literature-film', name: '문학과 영상', subject: 'korean', category: 'career' },
  'K-PC': { slug: 'professional-communication', name: '직무 의사소통', subject: 'korean', category: 'career' },
  'K-RD': { slug: 'reading-discussion', name: '독서 토론과 글쓰기', subject: 'korean', category: 'fusion' },
  'K-MC': { slug: 'media-communication', name: '매체 의사소통', subject: 'korean', category: 'fusion' },
  'K-LE': { slug: 'language-life', name: '언어생활 탐구', subject: 'korean', category: 'fusion' },
  // 영어
  'E-CE1': { slug: 'english-common-1', name: '공통영어1', subject: 'english', category: 'common' },
  'E-CE2': { slug: 'english-common-2', name: '공통영어2', subject: 'english', category: 'common' },
  'E-E1': { slug: 'english-1', name: '영어Ⅰ', subject: 'english', category: 'general' },
  'E-E2': { slug: 'english-2', name: '영어Ⅱ', subject: 'english', category: 'general' },
  'E-RW': { slug: 'english-reading-writing', name: '영어 독해와 작문', subject: 'english', category: 'general' },
  'E-LIT': { slug: 'english-literature', name: '영미 문학 읽기', subject: 'english', category: 'career' },
  'E-PD': { slug: 'english-presentation', name: '영어 발표와 토론', subject: 'english', category: 'career' },
  'E-VOC': { slug: 'vocational-english', name: '직무 영어', subject: 'english', category: 'career' },
  'E-CV': { slug: 'english-conversation', name: '실생활 영어 회화', subject: 'english', category: 'fusion' },
  'E-ME': { slug: 'media-english', name: '미디어 영어', subject: 'english', category: 'fusion' },
  'E-WC': { slug: 'world-culture-english', name: '세계 문화와 영어', subject: 'english', category: 'fusion' },
  // 사회
  'H-IS1': { slug: 'integrated-social-1', name: '통합사회1', subject: 'social', category: 'common' },
  'H-IS2': { slug: 'integrated-social-2', name: '통합사회2', subject: 'social', category: 'common' },
  'H-KH1': { slug: 'korean-history-1', name: '한국사1', subject: 'social', category: 'common' },
  'H-KH2': { slug: 'korean-history-2', name: '한국사2', subject: 'social', category: 'common' },
  'H-WG': { slug: 'world-geography', name: '세계시민과 지리', subject: 'social', category: 'general' },
  'H-WH': { slug: 'world-history', name: '세계사', subject: 'social', category: 'general' },
  'H-SC': { slug: 'society-culture', name: '사회와 문화', subject: 'social', category: 'general' },
  'H-CE': { slug: 'contemporary-ethics', name: '현대사회와 윤리', subject: 'social', category: 'general' },
  'H-KG': { slug: 'korean-geography', name: '한국지리 탐구', subject: 'social', category: 'career' },
  'H-UF': { slug: 'urban-future', name: '도시의 미래 탐구', subject: 'social', category: 'career' },
  'H-EH': { slug: 'east-asian-history', name: '동아시아 역사 기행', subject: 'social', category: 'career' },
  'H-PO': { slug: 'politics', name: '정치', subject: 'social', category: 'career' },
  'H-LS': { slug: 'law-society', name: '법과 사회', subject: 'social', category: 'career' },
  'H-EC': { slug: 'economics', name: '경제', subject: 'social', category: 'career' },
  'H-EI': { slug: 'ethics-ideas', name: '윤리와 사상', subject: 'social', category: 'career' },
  'H-HE': { slug: 'humanities-ethics', name: '인문학과 윤리', subject: 'social', category: 'career' },
  'H-IR': { slug: 'international-relations', name: '국제 관계의 이해', subject: 'social', category: 'career' },
  'H-TG': { slug: 'travel-geography', name: '여행지리', subject: 'social', category: 'fusion' },
  'H-MW': { slug: 'modern-world-history', name: '역사로 탐구하는 현대 세계', subject: 'social', category: 'fusion' },
  'H-SP': { slug: 'social-problems', name: '사회문제 탐구', subject: 'social', category: 'fusion' },
  'H-FE': { slug: 'finance-economics', name: '금융과 경제생활', subject: 'social', category: 'fusion' },
  'H-EP': { slug: 'ethics-problems', name: '윤리문제 탐구', subject: 'social', category: 'fusion' },
  'H-CSW': { slug: 'climate-sustainable-world', name: '기후변화와 지속가능한 세계', subject: 'social', category: 'fusion' },
};

interface Section {
  level: SchoolLevel;
  subject?: Subject;
  grade?: number;
  hsCategory?: HSCategory;
  hsCourse?: string;
  hsCourseName?: string;
  domain?: string;
  domainCode?: string;
}

function pascalCase(s: string): string {
  return s
    .replace(/[^a-zA-Z0-9]+(\w)/g, (_, c: string) => c.toUpperCase())
    .replace(/^(\w)/, (c) => c.toUpperCase());
}

function deriveComponentName(unitId: string, title: string): string {
  // 한글 → ID 기반으로 PascalCase 컴포넌트명 생성
  const safeId = unitId.replace(/-/g, '');
  return `Unit${safeId}Explorer`;
}

function inferDomainCode(domain: string): string {
  const map: Record<string, string> = {
    '수와 연산': 'NA',
    '변화와 관계': 'CR',
    '도형과 측정': 'GM',
    '자료와 가능성': 'DP',
    '운동과 에너지': 'ME',
    '운동·에너지': 'ME',
    '물질': 'MA',
    '생명': 'LI',
    '지구와 우주': 'EU',
    '지구·우주': 'EU',
    '지리': 'GE',
    '일반사회': 'SO',
    '역사': 'HI',
    '문법': 'GR',
    '문학': 'LT',
    '듣기·말하기': 'LS',
    '읽기': 'RD',
    '쓰기': 'WR',
    '매체': 'MD',
    '어휘': 'VOC',
    '듣기': 'LIS',
    '말하기': 'SPK',
  };
  return map[domain.trim()] ?? '';
}

function isLevelHeader(line: string): { level: SchoolLevel; grade?: number } | null {
  const m = line.match(/^##\s*(초[3-6]|중[1-3])\b/);
  if (m) {
    const tag = m[1];
    if (tag.startsWith('초')) {
      const g = parseInt(tag.slice(1), 10);
      return { level: 'elementary', grade: g };
    } else {
      const g = parseInt(tag.slice(1), 10) + 6; // 중1=7
      return { level: 'middle', grade: g };
    }
  }
  return null;
}

function isSubjectHeader(line: string): Subject | null {
  // # Ⅰ. 수학 — ... 또는 ## Ⅵ-1. 고등 수학
  const m = line.match(/^#{1,3}\s*(?:Ⅰ|Ⅱ|Ⅲ|Ⅳ|Ⅴ|Ⅵ-[1-5])\.\s*(?:고등\s*)?(수학|과학|국어|영어|사회)/);
  return m ? SUBJECT_BY_HEADER[m[1]] : null;
}

function isHSCategoryHeader(line: string): HSCategory | null {
  // 단독 "### 공통" 또는 "### 공통 과목" / "### 공통 (1학년 필수)" 모두 매치
  if (/^###\s*공통\b/.test(line)) return 'common';
  if (/^###\s*일반\s*선택/.test(line)) return 'general';
  if (/^###\s*진로\s*선택/.test(line)) return 'career';
  if (/^###\s*융합\s*선택/.test(line)) return 'fusion';
  return null;
}

function isCourseHeader(line: string): { code: string; name: string } | null {
  // #### 공통수학1 (M-CM1) 또는 #### 미적분Ⅰ (M-CA1)
  const m = line.match(/^####\s*([^\(]+?)\s*\(([\w-]+)\)\s*$/);
  if (m) return { name: m[1].trim(), code: m[2].trim() };
  return null;
}

const ID_RE = /^[MSKEH](?:[3-9]?)-[A-Z]+\d?(?:-\d+)?$|^[MSKEH]-[A-Z]+\d?(?:-\d+)?$/;

function parseTableRow(line: string): string[] | null {
  if (!line.trim().startsWith('|')) return null;
  const trimmed = line.trim().replace(/^\||\|$/g, '');
  // 표 헤더 구분선 ---
  if (/^[-:|]+$/.test(trimmed.replace(/\|/g, ''))) return null;
  return trimmed.split('|').map((c) => c.trim());
}

function findIdInRow(cells: string[]): { idx: number; id: string } | null {
  for (let i = 0; i < cells.length; i++) {
    const c = cells[i].trim();
    if (ID_RE.test(c)) return { idx: i, id: c };
  }
  return null;
}

function isPriority(s: string): s is Priority {
  return s === 'P0' || s === 'P1' || s === 'P2';
}

interface ParseStats {
  units: number;
  byLevel: Record<SchoolLevel, number>;
  bySubject: Record<Subject, number>;
  warnings: string[];
}

function parse(md: string): { units: ParsedUnit[]; stats: ParseStats } {
  const lines = md.split(/\r?\n/);
  const sec: Section = { level: 'elementary' };
  const units: ParsedUnit[] = [];
  const stats: ParseStats = {
    units: 0,
    byLevel: { elementary: 0, middle: 0, highschool: 0, 'cross-grade': 0 },
    bySubject: { math: 0, science: 0, korean: 0, english: 0, social: 0 },
    warnings: [],
  };

  // 헤더 컨텍스트 추적
  let isHighschoolSection = false;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];

    // 고등 섹션 진입 표시: # Ⅵ. 고등학교
    if (/^#\s*Ⅵ\.\s*고등학교/.test(line)) {
      isHighschoolSection = true;
      sec.level = 'highschool';
      sec.grade = undefined;
      sec.subject = undefined;
      continue;
    }

    // # Ⅰ ~ Ⅴ : 초중 과목 섹션
    const subj = isSubjectHeader(line);
    if (subj) {
      sec.subject = subj;
      if (!isHighschoolSection) {
        // 학년 공통 K-/E- 섹션 진입 (Ⅲ 국어, Ⅳ 영어)
        if (subj === 'korean' || subj === 'english') {
          // 모드 토글: 처음에는 학년 별 표 (없음), 그 다음 학년 공통 표
          // master-index 의 Ⅲ/Ⅳ 는 학년 공통이므로 cross-grade 로 둠
          sec.level = 'cross-grade';
          sec.grade = undefined;
        } else {
          // 수학·과학·사회는 학년별 진행. 다음 ## 헤더에서 grade 결정
        }
      }
      continue;
    }

    // ## 초3, 중1 등
    const lev = isLevelHeader(line);
    if (lev) {
      sec.level = lev.level;
      sec.grade = lev.grade;
      continue;
    }

    // ## Ⅵ-X. 고등 XX → 위에서 isSubjectHeader 가 잡음

    // ### 공통/일반선택/...
    const hsCat = isHSCategoryHeader(line);
    if (hsCat && isHighschoolSection) {
      sec.hsCategory = hsCat;
      sec.hsCourse = undefined;
      sec.hsCourseName = undefined;
      continue;
    }

    // #### 과목 (코드)
    const course = isCourseHeader(line);
    if (course && isHighschoolSection) {
      sec.hsCourse = course.code;
      sec.hsCourseName = course.name;
      const meta = COURSE_BY_PREFIX[course.code];
      if (meta) {
        sec.subject = meta.subject;
        sec.hsCategory = meta.category;
      }
      continue;
    }

    // 표 행 파싱
    const cells = parseTableRow(line);
    if (!cells) continue;
    const idHit = findIdInRow(cells);
    if (!idHit) continue;

    const cellsTrim = cells.map((c) => c.trim());
    const subjectGuess = sec.subject;
    if (!subjectGuess) {
      stats.warnings.push(`L${lineIdx + 1}: ${idHit.id} - subject context missing`);
      continue;
    }

    // 우선순위 추출 (마지막 셀 또는 P 패턴 매치)
    let priority: Priority = 'P1';
    const lastCell = cellsTrim[cellsTrim.length - 1] ?? '';
    if (isPriority(lastCell)) {
      priority = lastCell;
    } else if (/^초\d~|^중\d~|^초\d/.test(lastCell)) {
      priority = 'P1'; // 적용학년 컬럼 → 기본 P1
    }

    // domain 추출
    let domain = sec.domain ?? '';
    let domainCode = sec.domainCode ?? '';
    // 5-col 표: ID, 영역, 단원, 인터랙티브, 우선
    if (cellsTrim.length === 5 && idHit.idx === 0) {
      domain = cellsTrim[1];
      domainCode = inferDomainCode(domain);
    }
    // 진로/융합 묶음 표: 과목명, ID, 핵심, 우선 (4-col, idIdx=1)
    let title = '';
    let interactiveTitle = '';
    if (cellsTrim.length === 4 && idHit.idx === 1) {
      title = cellsTrim[0]; // 과목명
      interactiveTitle = cellsTrim[2];
      domain = sec.hsCategory ?? '';
      domainCode = sec.hsCategory?.toUpperCase() ?? '';
    }
    // 5-col 표: ID at 0
    else if (cellsTrim.length === 5 && idHit.idx === 0) {
      title = cellsTrim[2];
      interactiveTitle = cellsTrim[3];
    }
    // 4-col 표: ID, 단원, 인터랙티브, 우선 (idIdx=0)
    else if (cellsTrim.length === 4 && idHit.idx === 0) {
      title = cellsTrim[1];
      interactiveTitle = cellsTrim[2];
    }

    if (!title) {
      stats.warnings.push(`L${lineIdx + 1}: ${idHit.id} - title parse failed`);
      continue;
    }

    // 컴포넌트명 생성
    const componentName = deriveComponentName(idHit.id, title);

    const unit: ParsedUnit = {
      id: idHit.id,
      subject: subjectGuess,
      schoolLevel: sec.level,
      grade: sec.grade,
      domain,
      domainCode,
      title,
      interactiveTitle,
      priority,
      prerequisites: [],
      achievementStandards: [],
      componentName,
      status: 'planned',
    };

    if (sec.level === 'highschool') {
      const cm = COURSE_BY_PREFIX[sec.hsCourse ?? ''] ?? COURSE_BY_PREFIX[idHit.id];
      if (cm) {
        unit.category = cm.category;
        unit.course = cm.slug;
        unit.courseName = cm.name;
      } else if (sec.hsCategory) {
        unit.category = sec.hsCategory;
        unit.course = sec.hsCourse ?? 'unknown';
        unit.courseName = sec.hsCourseName ?? '';
      }
      delete unit.grade;
    }

    units.push(unit);
    stats.units++;
    stats.byLevel[sec.level]++;
    stats.bySubject[subjectGuess]++;
  }

  // 결정론적 정렬
  units.sort((a, b) => a.id.localeCompare(b.id));
  return { units, stats };
}

function emitFile(units: ParsedUnit[], filePath: string, exportName: string, isHS: boolean): void {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const lines: string[] = [
    `// AUTO-GENERATED by scripts/parse-curriculum.ts`,
    `// 입력: docs/00-MASTER-INDEX.md`,
    `// 수동 수정 금지 — 마스터 인덱스에서 변경 후 재생성.`,
    isHS
      ? `import type { HighSchoolUnit } from '../types';`
      : `import type { Unit } from '../types';`,
    ``,
    `export const ${exportName}: ${isHS ? 'HighSchoolUnit' : 'Unit'}[] = [`,
  ];

  for (const u of units) {
    lines.push('  {');
    lines.push(`    id: ${JSON.stringify(u.id)},`);
    lines.push(`    subject: ${JSON.stringify(u.subject)},`);
    if (!isHS) {
      lines.push(`    schoolLevel: ${JSON.stringify(u.schoolLevel)},`);
      if (u.grade !== undefined) {
        lines.push(`    grade: ${u.grade},`);
      }
    } else {
      lines.push(`    schoolLevel: 'highschool',`);
      if (u.category) lines.push(`    category: ${JSON.stringify(u.category)},`);
      if (u.course) lines.push(`    course: ${JSON.stringify(u.course)},`);
      if (u.courseName) lines.push(`    courseName: ${JSON.stringify(u.courseName)},`);
      lines.push(`    credits: 4,`);
      lines.push(`    evaluation: 'relative',`);
    }
    lines.push(`    domain: ${JSON.stringify(u.domain)},`);
    lines.push(`    domainCode: ${JSON.stringify(u.domainCode)},`);
    lines.push(`    title: ${JSON.stringify(u.title)},`);
    lines.push(`    interactiveTitle: ${JSON.stringify(u.interactiveTitle)},`);
    lines.push(`    priority: ${JSON.stringify(u.priority)},`);
    lines.push(`    prerequisites: ${JSON.stringify(u.prerequisites)},`);
    lines.push(`    achievementStandards: ${JSON.stringify(u.achievementStandards)},`);
    lines.push(`    componentName: ${JSON.stringify(u.componentName)},`);
    lines.push(`    status: ${JSON.stringify(u.status)},`);
    lines.push('  },');
  }

  lines.push('];');
  lines.push('');
  writeFileSync(filePath, lines.join('\n'), 'utf8');
}

function main(): void {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const verbose = args.includes('--verbose');

  const outputBase = apply ? resolve(ROOT, 'lib/curriculum') : resolve(ROOT, 'tmp/curriculum-output');

  const md = readFileSync(INPUT, 'utf8');
  const { units, stats } = parse(md);

  console.log(`[parse-curriculum] parsed ${stats.units} units`);
  console.log(`  by level:`, stats.byLevel);
  console.log(`  by subject:`, stats.bySubject);
  if (stats.warnings.length > 0) {
    console.log(`  warnings: ${stats.warnings.length}`);
    if (verbose) for (const w of stats.warnings) console.log('    ', w);
  }

  // 분류
  const elementary = units.filter((u) => u.schoolLevel === 'elementary');
  const middle = units.filter((u) => u.schoolLevel === 'middle');
  const crossGrade = units.filter((u) => u.schoolLevel === 'cross-grade');
  const hsCommon = units.filter((u) => u.schoolLevel === 'highschool' && u.category === 'common');
  const hsGeneral = units.filter((u) => u.schoolLevel === 'highschool' && u.category === 'general');
  const hsCareer = units.filter((u) => u.schoolLevel === 'highschool' && u.category === 'career');
  const hsFusion = units.filter((u) => u.schoolLevel === 'highschool' && u.category === 'fusion');

  emitFile(elementary, resolve(outputBase, 'elementary.ts'), 'ELEMENTARY_UNITS', false);
  emitFile(middle, resolve(outputBase, 'middle.ts'), 'MIDDLE_UNITS', false);
  emitFile(crossGrade, resolve(outputBase, 'common-cross-grade.ts'), 'COMMON_CROSS_GRADE_UNITS', false);
  emitFile(hsCommon, resolve(outputBase, 'highschool-common.ts'), 'HIGHSCHOOL_COMMON_UNITS', true);
  emitFile(hsGeneral, resolve(outputBase, 'highschool-general.ts'), 'HIGHSCHOOL_GENERAL_UNITS', true);
  emitFile(hsCareer, resolve(outputBase, 'highschool-career.ts'), 'HIGHSCHOOL_CAREER_UNITS', true);
  emitFile(hsFusion, resolve(outputBase, 'highschool-fusion.ts'), 'HIGHSCHOOL_FUSION_UNITS', true);

  console.log(`[parse-curriculum] wrote 7 files to ${outputBase}`);
  if (!apply) {
    console.log('  (dry-run; pass --apply to write into lib/curriculum/)');
  }
}

main();
