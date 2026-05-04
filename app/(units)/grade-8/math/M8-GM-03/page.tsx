import { notFound } from 'next/navigation';
import { PythagoreanTheoremExplorer } from '@/components/interactive/math/PythagoreanTheoremExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-GM-03';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          직각삼각형에서 <strong>두 변의 제곱의 합</strong>이 <strong>빗변의 제곱</strong>과 같아요.
          식으로는 <span className="font-mono">a² + b² = c²</span> (c는 빗변).
        </p>
      </SectionCard>

      <SectionCard title="핵심·왜">
        <p>
          이 정리는 「변의 길이」를 「정사각형의 면적」으로 바꿔서 보면 직관적이에요. 세 변 위에 정사각형을 그리면, 두 작은 정사각형 면적의 합이 큰 정사각형 면적과 정확히 같아요.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>적용 조건</strong>: <span className="font-mono">반드시 직각삼각형</span>. 직각이 아니면 이 식은 성립하지 않아요.</li>
          <li><strong>역도 성립</strong>: 세 변이 a² + b² = c²을 만족하면 그 삼각형은 직각삼각형.</li>
          <li><strong>피타고라스 수</strong>: 세 변이 모두 정수인 묶음. (3,4,5), (5,12,13), (8,15,17), (7,24,25)…</li>
          <li>두 변이 1인 정사각형의 대각선은 √2 — 무리수의 첫 발견은 이 정리에서 출발했어요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「a + b = c」 → 변끼리 더하는 게 아니라 <strong>제곱끼리</strong> 더해요. 3 + 4 = 7 ≠ 5.</li>
          <li><strong>오개념 2.</strong> 「어떤 삼각형에도 적용된다」 → 직각이 없으면 성립하지 않아요. 일반 삼각형은 코사인 법칙으로 일반화돼요(고등 수학).</li>
          <li><strong>오개념 3.</strong> 「c는 가장 긴 변이라 a, b 중 큰 것을 c로」 → c는 「직각의 마주보는 변(빗변)」으로 정해져요. 직각만 정해지면 c가 자동으로 결정돼요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 피타고라스">
        <p>
          TV 화면 인치(대각선 길이) 계산, 사다리를 벽에 기대고 안전 거리 계산, GPS 두 점 사이 직선거리, 직각자 만들기(3·4·5 매듭법) 모두 이 정리.
          현대 컴퓨터 그래픽에서 두 점 사이 거리(distance) 함수도 이걸 그대로 써요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PythagoreanTheoremExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
