import { notFound } from 'next/navigation';
import { FractionMultiplicationExplorer } from '@/components/interactive/math/FractionMultiplicationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-NA-06';

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
          소수의 곱셈은 분수의 곱셈과 본질이 같아요. 0.3 × 0.4 는 곧 3/10 × 4/10 = 12/100 = 0.12.
          분수로 바꿔 곱한 뒤 다시 소수로 돌리는 게 핵심이에요.
        </p>
      </SectionCard>
      <SectionCard title="소수점 자리 규칙">
        <p>
          빠른 방법: 소수점 무시하고 그냥 곱한 뒤, 두 수의 소수점 아래 자릿수를 더해 옮기면 돼요.
          0.3 × 0.4 → 3 × 4 = 12. 두 수 모두 소수점 아래 1자리 → 합 2자리 → 0.12.
          0.25 × 0.4 → 25 × 4 = 100. 합 3자리 → 0.100 = 0.1.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "곱하면 항상 커진다" — 1보다 작은 수를 곱하면 오히려 작아져요. 0.3 × 0.4 = 0.12 (0.3보다 작음).
          ❌ "0.5 × 0.5 = 0.25라 작아지는 게 이상해" — 1의 절반의 절반이니 1/4. 익숙해질 때까지 분수로 변환해서 확인.
          ❌ 소수점 위치 헷갈림 — 자릿수만 정확히 세면 실수 0.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 소수 곱셈">
        <p>
          1.5kg 사과가 1kg에 3000원이면? 3000 × 1.5 = 4500원. 30% 할인은 0.7 곱하기. 5000원의 0.7 = 3500원.
          은행 이자, 환율 계산, 비율 응용 — 어른의 돈 계산은 거의 다 소수 곱셈이에요. 격자 시각화로 분수와 같은 원리임을 익혀 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <FractionMultiplicationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
