import { notFound } from 'next/navigation';
import { LinearFunctionExplorer } from '@/components/interactive/math/LinearFunctionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-CR-04';

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
          <strong>일차함수</strong> y = mx + b의 그래프는 항상 <strong>직선</strong>이에요.
          기울기 m은 「얼마나 가파르게 가는지」, y절편 b는 「어디에서 출발하는지」를 정해요.
        </p>
      </SectionCard>

      <SectionCard title="핵심·왜">
        <p>
          일차함수는 「x가 1 증가할 때 y가 m만큼 증가한다」는 일정한 변화율을 가져요. 이 일정함이 바로 직선의 정체.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>기울기 m</strong> = (y의 변화량) ÷ (x의 변화량). m &gt; 0 이면 우상향, m &lt; 0 이면 우하향, m = 0 이면 수평선.</li>
          <li><strong>y절편 b</strong> = x = 0일 때의 y값. 그래프가 y축과 만나는 점.</li>
          <li><strong>x절편</strong> = y = 0일 때의 x값. 식으로는 x = -b / m.</li>
          <li>두 직선이 평행이면 m이 같아요. 수직(직각)이면 m₁ × m₂ = -1.</li>
        </ul>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「m이 크면 더 길다」 — 길이가 아니라 「가파른 정도」예요. m=2는 m=1보다 두 배 가파를 뿐.</li>
          <li><strong>오개념 2.</strong> 「y = 3은 일차함수가 아니다」 — m = 0인 일차함수예요(상수함수). 그래프는 수평 직선.</li>
          <li><strong>오개념 3.</strong> 「x = 4도 일차함수」 — 아니에요. 그래프는 수직선이지만 함수가 아니에요. 한 x에 y값이 무수히 많아요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 일차함수">
        <p>
          택시 요금(기본요금 + km당 추가), 휴대전화 요금제(기본료 + 통화량당 요금), 시간당 임금(시급 × 시간) 모두 y = mx + b 형태예요.
          기울기 m은 단가(가격), y절편 b는 출발 지점(기본료·기본 거리·초기값)으로 자주 해석돼요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LinearFunctionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
