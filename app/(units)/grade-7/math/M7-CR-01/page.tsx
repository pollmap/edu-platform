import { notFound } from 'next/navigation';
import { AlgebraicExpressionBuilder } from '@/components/interactive/math/AlgebraicExpressionBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M7-CR-01';

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
          문자는 <strong>아직 모르거나 자유롭게 변하는 수</strong>를 담는 그릇이에요. 같은 그릇끼리
          (= <strong>동류항</strong>) 만 더하거나 뺄 수 있고, x와 y처럼 다른 그릇은 따로 둬야 해요.
        </p>
      </SectionCard>

      <SectionCard title="왜 동류항만 합칠 수 있을까?">
        <p>
          x는 정체가 안 정해진 길이라고 생각해 봐요. 길이 x 막대기 3개와 2개를 합치면 5개. 그래서
          <strong> 3x + 2x = 5x</strong>예요. 하지만 x 막대기와 y 막대기는 길이 자체가 달라서
          섞으면 안 돼요. 숫자만 있는 항(상수항)도 같은 종류끼리 모아야 해요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          <strong>2x + 3y = 5xy</strong>는 틀렸어요. 단위가 다른 걸 합쳐 버린 셈이라 무의미해요.
          또 <strong>x + x = x²</strong> 도 틀렸어요. x + x = 2x 이고, x × x = x²예요. 더하기와
          곱하기를 헷갈리지 마세요.
        </p>
      </SectionCard>

      <SectionCard title="실생활">
        <p>
          연필 3자루 값을 x원이라 하면, 연필 3자루 + 연필 2자루 = 5자루 값 = <strong>5x</strong>원이에요.
          여기에 지우개 한 개를 더 사면 5x + (지우개 값)이 되는데, 지우개 값은 다른 문자라 합치지 않아요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AlgebraicExpressionBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
