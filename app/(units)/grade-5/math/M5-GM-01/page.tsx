import { notFound } from 'next/navigation';
import { PolygonAreaExplorer } from '@/components/interactive/math/PolygonAreaExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-GM-01';

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
          넓이는 <strong>도형 안에 들어가는 단위 정사각형(1×1)의 개수</strong>예요. 모든 다각형의 넓이는 결국 직사각형으로 환원할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="공식이 왜 그렇게 생겼을까">
        <p>
          평행사변형은 옆을 잘라 직사각형으로 만들면 <strong>밑변 × 높이</strong>가 보여요. 삼각형은 같은 모양 두 개를 합치면 평행사변형이니 <strong>÷ 2</strong>. 사다리꼴은 윗변과 아랫변을 평균한 게 직사각형의 가로가 되는 셈이에요.
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          ※ 시각화의 둘레는 슬라이더 정수값에서 사선은 단순화된 근사. 정확한 둘레는 피타고라스 정리 후 학습.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PolygonAreaExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
