import { notFound } from 'next/navigation';
import { NumberRangeRoundingExplorer } from '@/components/interactive/math/NumberRangeRoundingExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-NA-07';

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
          큰 수를 다룰 때 정확한 값보다 <strong>대략의 값</strong>이면 충분할 때가 많아요.
          <strong>올림 · 버림 · 반올림</strong> 세 가지로 어림하면 계산이 빨라지고 감을 잡기 쉬워져요.
        </p>
      </SectionCard>
      <SectionCard title="세 가지 어림 방법">
        <p>
          ① <strong>올림</strong>: 어림할 자리 아래가 0이 아니면 무조건 1 올림. 47 → 50 (십의 자리 올림).
          ② <strong>버림</strong>: 어림할 자리 아래는 그냥 0. 47 → 40.
          ③ <strong>반올림</strong>: 어림할 자리 아래가 5 이상이면 올림, 4 이하면 버림. 47 → 50, 43 → 40.
          상황에 따라 골라 쓰는 거예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "반올림은 항상 올림" — 4 이하면 버려요. 5가 기준점.
          ❌ "어림 = 대충" — 의도된 정확도예요. 큰 수를 다룰 땐 어림이 더 의미 있는 정보를 줘요.
          ❌ "어느 자리에서 어림할지는 정해져 있다" — 상황에 따라 십·백·천 자리 어디서든 어림해요. 문제 조건을 잘 읽어야 해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 어림">
        <p>
          물건 살 때 "약 5만 원" — 47,800원을 반올림한 값.
          버스가 만 원짜리 1장 = "버림"으로 4900원 받기 어려워 5000원이 한 장 단위.
          공장 생산량을 "약 1억 개" 라고 표현 — 정확히 99,847,213개라 해도 의사소통은 어림이 효율적.
          뉴스의 인구·경제 통계는 거의 모두 어림 값이에요. 실제 수치와의 차이를 의식하는 습관이 중요해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <NumberRangeRoundingExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
