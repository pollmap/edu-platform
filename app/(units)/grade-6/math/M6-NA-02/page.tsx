import { notFound } from 'next/navigation';
import { DecimalDivisionExplorer } from '@/components/interactive/math/DecimalDivisionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M6-NA-02';

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
          소수의 나눗셈은 <strong>소수점을 옮겨서 정수 나눗셈으로 바꾸기</strong>가 핵심이에요.
          두 수에 똑같이 10·100·1000을 곱하면 몫은 변하지 않아요.
        </p>
      </SectionCard>

      <SectionCard title="왜 이게 자연스러울까?">
        <p>
          나눗셈은 <strong>같은 비율로 두 수를 키워도 몫이 같아요</strong>. 예를 들어
          <strong> 7.2 ÷ 0.4 </strong>는 양쪽에 10을 곱해 <strong>72 ÷ 4 = 18</strong>로 바꿔서 풀 수 있어요.
          나누는 수가 정수가 되도록 소수점만 똑같이 오른쪽으로 옮기면 돼요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          <strong>소수점을 한쪽만</strong> 옮기면 안 돼요. 그러면 비율이 바뀌어 몫이 달라져요.
          또 0.5 ÷ 2와 5 ÷ 2를 헷갈리지 않게, 소수점 자리수를 끝까지 챙겨야 해요.
        </p>
      </SectionCard>

      <SectionCard title="실생활">
        <p>
          1.2 m 끈을 0.3 m씩 자르면 몇 토막일까? 1.2 ÷ 0.3 = 4. 카페에서 우유 0.5 L짜리 한 병을
          0.05 L 컵에 옮기면 몇 잔? 0.5 ÷ 0.05 = 10. 모두 소수점만 옮기면 끝이에요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DecimalDivisionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
