import { notFound } from 'next/navigation';
import { SolutionParticleSimulator } from '@/components/interactive/science/SolutionParticleSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S5-MA-01';

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
          물(<strong>용매</strong>)에 설탕(<strong>용질</strong>)을 녹이면 <strong>용액</strong>이 돼요.
          용액의 진하기는 <strong>질량 퍼센트 농도</strong> = (용질 ÷ 용액) × 100 으로 표시해요.
        </p>
      </SectionCard>
      <SectionCard title="설탕은 사라진 게 아니라 작아진 거예요">
        <p>
          물에 설탕을 녹이면 보이지 않게 되지만 <strong>사라진 게 아니에요</strong>. 물 분자 사이로 설탕 입자가 퍼져 들어간 거죠.
          용액 무게를 재 보면 물 무게 + 설탕 무게가 그대로 보존돼요(<strong>질량보존</strong>).
          물을 증발시키면 설탕이 다시 나타나요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SolutionParticleSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
