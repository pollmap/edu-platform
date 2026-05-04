import { notFound } from 'next/navigation';
import { SystemOfEquationsExplorer } from '@/components/interactive/math/SystemOfEquationsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-CR-03';

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
          미지수가 두 개일 땐 식 하나로는 부족해요. <strong>두 식을 동시에 만족</strong>해야 하니까,
          좌표평면에서는 <strong>두 직선이 만나는 한 점</strong>이 답이에요.
        </p>
      </SectionCard>

      <SectionCard title="핵심·왜">
        <p>
          식이 하나면 해는 셀 수 없이 많아요(직선 위의 모든 점). 하지만 식 두 개를 동시에 걸면, 보통 <strong>한 점</strong>으로 좁혀져요.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>대입법</strong>: 한 식에서 한 변수를 다른 변수로 표현 → 다른 식에 대입.</li>
          <li><strong>가감법(소거법)</strong>: 두 식을 더하거나 빼서 한 변수를 없애기.</li>
          <li><strong>그래프 풀이</strong>: 두 직선을 그리고 교점을 읽기 — 직관적이지만 정확도는 ↓.</li>
        </ul>
        <p className="text-sm">
          해의 개수는 직선의 모양으로 결정돼요. 만나면 1개, 평행하면 0개, 같으면 무수히 많음.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「식 하나만 풀면 끝」 — 미지수가 둘이라 식 하나로는 해를 정할 수 없어요.</li>
          <li><strong>오개념 2.</strong> 「대입법이 항상 더 좋다」 — 계수가 보기 좋게 떨어지면 가감법이 훨씬 빨라요. 식의 모양을 보고 골라요.</li>
          <li><strong>오개념 3.</strong> 「해가 없으면 풀이가 틀린 것」 — 두 직선이 평행이면 진짜로 해가 없어요. 풀이 도중 0 = 5 같은 모순이 나오면 「해 없음」이 정답.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 연립방정식">
        <p>
          서로 다른 두 통신요금제 중 어느 게 더 싼지를 가르는 지점, 두 운동 코스가 만나는 지점, 두 가게 가격을 비교해 「몇 개 사는 게 이득인지」 찾기 — 모두 식 두 개를 세우고 만나는 점을 구하는 연립방정식 문제예요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SystemOfEquationsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
