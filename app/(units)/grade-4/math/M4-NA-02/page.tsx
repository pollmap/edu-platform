import { notFound } from 'next/navigation';
import { StandardMultiplicationAlgorithm } from '@/components/interactive/math/StandardMultiplicationAlgorithm';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M4-NA-02';

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
          곱셈 세로셈은 <strong>일의 자리부터 곱하고 올림</strong> 처리한 뒤 십의 자리를 곱해요.
          격자 모델로 이해한 다음 표준 알고리즘을 익히면 빠르게 계산할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="올림이 왜 생길까?">
        <p>
          예를 들어 4 × 7 = 28 — 일의 자리에 28을 다 적을 수 없어요. 한 자리에는 0~9만 들어가니까
          <strong>20은 십의 자리로 옮겨</strong>(올림), 일의 자리엔 8만 남겨요.
          이 올림 한 번이 우리 자리값(10진법)을 유지하는 핵심이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <StandardMultiplicationAlgorithm />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
