import { notFound } from 'next/navigation';
import { LinearEquationBalance } from '@/components/interactive/math/LinearEquationBalance';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M7-CR-02';

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
          일차방정식은 <strong>=가 적힌 양팔 저울</strong>이에요. x를 찾아내려면 저울의 균형을 깨뜨리지 않게
          양쪽에 똑같이 빼고, 똑같이 나누면 돼요.
        </p>
      </SectionCard>

      <SectionCard title="왜 양변에 똑같이 해야 할까?">
        <p>
          한쪽 접시에서 사과 2개를 빼는데 다른 쪽은 그대로면 저울이 기울어요. 등식도 똑같아요.
          <strong> 양변에 같은 수를 더하거나 빼고, 같은 수로 곱하거나 나누는 동안 = 가 유지</strong>돼요.
          0이 아닌 수로만 나눠야 한다는 점은 잊지 마세요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          <strong>이항할 때 부호 안 바꾸기</strong>가 가장 자주 하는 실수예요. 3x + 2 = 8 에서 +2를
          오른쪽으로 옮기면 −2가 돼요. 빼기로 양변에 똑같이 빼는 거니까요. 그리고
          0으로 나누는 식 (예: 0·x = 0) 은 해가 무수히 많거나 없을 수 있다는 점도 주의.
        </p>
      </SectionCard>

      <SectionCard title="실생활">
        <p>
          편의점에서 빵 1개 값을 x원, 우유 1개 값이 1,000원이고 함께 산 가격이 3,000원이면 식은
          <strong> x + 1000 = 3000</strong>이에요. 양변에서 1000을 빼면 x = 2000. 모르는 값을 문자로
          잡고 균형을 맞춰 해를 꺼내는 게 방정식이에요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LinearEquationBalance />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
