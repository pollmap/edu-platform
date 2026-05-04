import { notFound } from 'next/navigation';
import { ExponentLawExplorer } from '@/components/interactive/math/ExponentLawExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-CR-01';

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
          지수법칙은 <strong>거듭제곱이 무엇인지 풀어 쓰면 자동으로 나오는 규칙</strong>이에요. 외우려 하지 말고,
          aᵐ이 a를 m번 곱한 것이라는 정의로 매번 검증해 보세요.
        </p>
      </SectionCard>

      <SectionCard title="왜 지수가 더해질까?">
        <p>
          a³ × a² = (a · a · a) × (a · a) = a · a · a · a · a = a⁵. m번 곱한 것에 n번 곱한 것을 이어 붙이면
          (m + n)번 곱한 것이 돼요. 그래서 <strong>aᵐ × aⁿ = aᵐ⁺ⁿ</strong>예요. (aᵐ)ⁿ도 마찬가지로
          aᵐ을 n번 묶음으로 곱하면 m × n번 곱한 것이라 <strong>(aᵐ)ⁿ = aᵐⁿ</strong>이 돼요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          <strong>aᵐ + aⁿ ≠ aᵐ⁺ⁿ</strong>예요. 더하기는 합쳐지지 않아요. 또 <strong>(a + b)² ≠ a² + b²</strong>도
          아주 흔한 실수예요. (a + b)² = a² + 2ab + b² 처럼 가운데 항이 살아 있어요. 곱셈과 덧셈을
          헷갈리지 마세요.
        </p>
      </SectionCard>

      <SectionCard title="실생활">
        <p>
          종이를 한 번 접으면 두께 2배, 두 번 접으면 4배, n번 접으면 2ⁿ배. 박테리아가 30분에 한 번씩 두 배가
          되면 1시간 후 2² = 4배, 5시간 후 2¹⁰ = 1024배. 지수는 <strong>같은 일이 반복될 때 폭발적으로 커지는</strong>
          크기를 다루는 도구예요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ExponentLawExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
