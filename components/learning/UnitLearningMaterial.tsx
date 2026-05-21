import { buildUnitLearningMaterial } from '@/lib/learning-materials';
import type { HighSchoolUnit, Unit } from '@/lib/types';

interface UnitLearningMaterialProps {
  unit: Unit | HighSchoolUnit;
}

export function UnitLearningMaterial({ unit }: UnitLearningMaterialProps) {
  const material = buildUnitLearningMaterial(unit);
  const headingId = `learning-material-${unit.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="mb-5 rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 shadow-sm dark:border-blue-900/60 dark:from-blue-950/30 dark:via-zinc-950 dark:to-emerald-950/20"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            단원 학습자료
          </div>
          <h2 id={headingId} className="mt-1 text-xl font-extrabold text-zinc-950 dark:text-zinc-50">
            3분 학습 루프
          </h2>
        </div>
        <div className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-zinc-600 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800">
          {material.gradeLabel} · {material.subjectLabel}
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-white p-4 ring-1 ring-zinc-200 dark:bg-zinc-900/80 dark:ring-zinc-800">
        <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">핵심 질문</div>
        <p className="mt-1 text-lg font-bold leading-relaxed text-zinc-950 dark:text-zinc-50">
          {material.coreQuestion}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {material.quickSummary}
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-lg bg-white p-4 ring-1 ring-zinc-200 dark:bg-zinc-900/80 dark:ring-zinc-800">
          <div className="text-sm font-bold text-zinc-950 dark:text-zinc-50">오늘 목표</div>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {material.learningGoals.map((goal, index) => (
              <li key={goal} className="flex gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                  {index + 1}
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg bg-white p-4 ring-1 ring-zinc-200 dark:bg-zinc-900/80 dark:ring-zinc-800">
          <div className="text-sm font-bold text-zinc-950 dark:text-zinc-50">See · Touch · Predict · Explain · Challenge</div>
          <div className="mt-3 grid gap-2">
            {material.loopSteps.map((step) => (
              <div key={step.label} className="grid gap-1 rounded-md bg-zinc-50 p-3 dark:bg-zinc-950">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
                    {step.label}
                  </span>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{step.title}</span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg bg-amber-50 p-4 ring-1 ring-amber-100 dark:bg-amber-950/20 dark:ring-amber-900/60">
          <div className="text-sm font-bold text-amber-900 dark:text-amber-100">미니 도전</div>
          <p className="mt-2 text-sm leading-relaxed text-amber-900 dark:text-amber-100">
            {material.miniChallenge}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 ring-1 ring-zinc-200 dark:bg-zinc-900/80 dark:ring-zinc-800">
          <div className="text-sm font-bold text-zinc-950 dark:text-zinc-50">복습 질문</div>
          <ul className="mt-2 space-y-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {material.reviewQuestions.map((question) => (
              <li key={question}>- {question}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{material.sourceNote}</p>
    </section>
  );
}
