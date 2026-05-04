import Link from 'next/link';
import { HomeProgress } from '@/components/primitives/HomeProgress';
import { CURRICULUM, HIGHSCHOOL_UNITS } from '@/lib/curriculum';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';
import type { Subject } from '@/lib/types';

const SUBJECTS: Subject[] = ['math', 'science', 'korean', 'english', 'social'];
const ELEMENTARY_GRADES = [3, 4, 5, 6] as const;
const MIDDLE_GRADES = [7, 8, 9] as const;

export default function Home() {
  const totalUnits = CURRICULUM.length + HIGHSCHOOL_UNITS.length;
  const draftUnits = CURRICULUM.filter((u) => u.status !== 'planned').length;

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          한국 초3~고3 인터랙티브 교육 플랫폼
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          2022 개정 교육과정 5과목 (수학·과학·국어·영어·사회) — 488 단원 / ~800 인터랙티브 양산.
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3 font-mono">
          진행: {draftUnits} / {totalUnits} 단원
        </p>
      </header>

      <section className="mb-10">
        <HomeProgress totalUnits={totalUnits} />
      </section>

      <section className="mb-10 space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">초등학교</h2>
        <GradeRow grades={ELEMENTARY_GRADES} />
      </section>

      <section className="mb-10 space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">중학교</h2>
        <GradeRow grades={MIDDLE_GRADES} />
      </section>

      <section className="mb-10 space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">고등학교</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          학점제 — 공통 / 일반선택 / 진로선택 / 융합선택 (Sprint 10+ 도착 예정)
        </p>
        <Link
          href="/highschool"
          className="inline-block px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          고등학교 메인 →
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          파일럿 (현재 가용)
        </h2>
        <Link
          href="/grade-9/math/M9-CR-03"
          className="inline-block px-4 py-3 rounded-xl border-2 border-blue-600 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
        >
          중3 수학 · 이차함수 (M9-CR-03) →
        </Link>
      </section>
    </main>
  );
}

function GradeRow({ grades }: { grades: readonly number[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {grades.map((g) => (
        <Link
          key={g}
          href={`/grade-${g}`}
          className="block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-600 hover:shadow-sm transition"
        >
          <div className="font-semibold text-zinc-900 dark:text-zinc-100">
            {GRADE_LABEL[g as 3 | 4 | 5 | 6 | 7 | 8 | 9]}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {SUBJECTS.map((s) => SUBJECT_LABEL[s]).join(' · ')}
          </div>
        </Link>
      ))}
    </div>
  );
}
