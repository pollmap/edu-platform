import Link from 'next/link';
import { findUnit, unitPath } from '@/lib/curriculum';
import { buildUnitLearningMaterial } from '@/lib/learning-materials';
import type { HighSchoolUnit, Unit } from '@/lib/types';
import type { UnitContent } from '@/lib/unit-content';

interface UnitLearningMaterialProps {
  unit: Unit | HighSchoolUnit;
}

export function UnitLearningMaterial({ unit }: UnitLearningMaterialProps) {
  const material = buildUnitLearningMaterial(unit);
  const content = material.unitContent;
  const headingId = `learning-material-${unit.id}`;

  if (!content) {
    return <FallbackLearningMaterial unitId={unit.id} material={material} headingId={headingId} />;
  }

  return (
    <section
      aria-labelledby={headingId}
      className="mb-5 overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm dark:border-blue-900/60 dark:bg-zinc-950"
    >
      <div className="bg-blue-50 px-4 py-4 dark:bg-blue-950/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300">
              Source-backed unit content
            </div>
            <h2 id={headingId} className="mt-1 text-2xl font-extrabold text-zinc-950 dark:text-zinc-50">
              단원 세부 학습자료
            </h2>
          </div>
          <div className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800">
            {material.gradeLabel} · {material.subjectLabel}
          </div>
        </div>
      </div>

      <div className="border-t border-blue-100 p-4 dark:border-blue-900/60">
        <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">핵심 질문</div>
        <p className="mt-1 text-lg font-bold leading-relaxed text-zinc-950 dark:text-zinc-50">
          {material.coreQuestion}
        </p>
      </div>

      <div className="grid border-t border-zinc-200 dark:border-zinc-800 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-4 lg:border-r lg:border-zinc-200 lg:dark:border-zinc-800">
          <SectionTitle>3분 훑어보기</SectionTitle>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {content.explanations.easy}
          </p>
          <div className="mt-4 space-y-3">
            {content.examples.slice(0, 2).map((example) => (
              <ExampleBlock key={example.title} example={example} compact />
            ))}
          </div>
        </div>
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800 lg:border-t-0">
          <SectionTitle>표준 · 심화 설명</SectionTitle>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {content.explanations.standard}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {content.explanations.advanced}
          </p>
        </div>
      </div>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <SectionTitle>예시</SectionTitle>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {content.examples.map((example) => (
            <ExampleBlock key={example.title} example={example} />
          ))}
        </div>
      </div>

      <div className="grid border-t border-zinc-200 dark:border-zinc-800 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="p-4 lg:border-r lg:border-zinc-200 lg:dark:border-zinc-800">
          <SectionTitle>미니 문제</SectionTitle>
          <ol className="mt-3 space-y-3">
            {content.miniQuiz.map((quiz, index) => (
              <li key={quiz.kind} className="rounded-md bg-amber-50 p-3 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-100">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-200 text-amber-950 dark:bg-amber-900 dark:text-amber-100">
                    {index + 1}
                  </span>
                  {quizLabel(quiz.kind)}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-amber-950 dark:text-amber-50">
                  {quiz.question}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800 lg:border-t-0">
          <SectionTitle>정답과 해설</SectionTitle>
          <div className="mt-3 space-y-3">
            {content.miniQuiz.map((quiz, index) => (
              <div key={quiz.kind} className="border-l-2 border-blue-200 pl-3 dark:border-blue-800">
                <div className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                  {index + 1}. {quiz.answer}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {quiz.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid border-t border-zinc-200 dark:border-zinc-800 md:grid-cols-2">
        <div className="p-4 md:border-r md:border-zinc-200 md:dark:border-zinc-800">
          <SectionTitle>흔한 실수</SectionTitle>
          <div className="mt-3 space-y-3">
            {content.commonMistakes.map((mistake) => (
              <div key={mistake.mistake}>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{mistake.mistake}</div>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {mistake.correction}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800 md:border-t-0">
          <SectionTitle>실생활 적용</SectionTitle>
          <div className="mt-3 space-y-3">
            {content.realLifeApplications.map((application) => (
              <div key={application.context}>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{application.context}</div>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {application.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid border-t border-zinc-200 dark:border-zinc-800 md:grid-cols-[1fr_1fr]">
        <div className="p-4 md:border-r md:border-zinc-200 md:dark:border-zinc-800">
          <SectionTitle>다음 단원</SectionTitle>
          {content.nextUnitIds.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {content.nextUnitIds.map((nextUnitId) => (
                <NextUnitLink key={nextUnitId} unitId={nextUnitId} />
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              현재 과목 경로의 마지막 단원입니다. 검색으로 다른 개념을 이어서 열 수 있습니다.
            </p>
          )}
        </div>
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800 md:border-t-0">
          <SectionTitle>출처</SectionTitle>
          <ul className="mt-2 space-y-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {content.sourceRefs.map((source) => (
              <li key={`${source.title}-${source.document ?? source.url}`}>
                {source.title}
                {source.document ? ` · ${source.document}` : ''}
                {source.url ? ` · ${source.url}` : ''}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h3 className="text-sm font-extrabold text-zinc-950 dark:text-zinc-50">{children}</h3>;
}

function ExampleBlock({
  example,
  compact = false,
}: {
  example: UnitContent['examples'][number];
  compact?: boolean;
}) {
  return (
    <div className={compact ? '' : 'rounded-md bg-zinc-50 p-3 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800'}>
      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{example.title}</div>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{example.setup}</p>
      {!compact ? (
        <>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{example.walkthrough}</p>
          <p className="mt-2 text-xs font-semibold leading-relaxed text-blue-700 dark:text-blue-300">
            {example.takeaway}
          </p>
        </>
      ) : null}
    </div>
  );
}

function quizLabel(kind: UnitContent['miniQuiz'][number]['kind']): string {
  if (kind === 'concept-check') return '개념 확인';
  if (kind === 'application') return '적용 문제';
  return '실수 교정 · 전이';
}

function NextUnitLink({ unitId }: { unitId: string }) {
  const unit = findUnit(unitId);
  if (!unit) return null;
  return (
    <Link
      href={unitPath(unit)}
      className="min-h-[44px] rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 transition hover:border-blue-400 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200 dark:hover:border-blue-700"
    >
      <span className="font-mono text-xs">{unit.id}</span> {unit.title}
    </Link>
  );
}

function FallbackLearningMaterial({
  unitId,
  material,
  headingId,
}: {
  unitId: string;
  material: ReturnType<typeof buildUnitLearningMaterial>;
  headingId: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/20"
    >
      <h2 id={headingId} className="text-xl font-extrabold text-zinc-950 dark:text-zinc-50">
        3분 학습 루프
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {material.quickSummary}
      </p>
      <p className="mt-3 text-xs text-amber-800 dark:text-amber-200">
        {unitId} 세부 UnitContent가 없으면 이 fallback이 보입니다. content audit은 이 상태를 실패로 처리합니다.
      </p>
    </section>
  );
}
