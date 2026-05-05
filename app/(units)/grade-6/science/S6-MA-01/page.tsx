import { notFound } from 'next/navigation';
import { GasIdentificationExplorer } from '@/components/interactive/science/GasIdentificationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S6-MA-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  if (!unit) return {};
  return makeUnitMetadata(unit);
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) {
    notFound();
  }

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
          공기는 색·냄새가 없는 여러 가지 「기체」가 섞인 거예요. 산소·이산화탄소·수소·질소 — 각 기체는
          「특이한 검출 방법」으로 알아낼 수 있어요.
        </p>
      </SectionCard>

      <SectionCard title="공기의 구성">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>질소 78%</strong> — 반응성이 거의 없어 안전</li>
          <li><strong>산소 21%</strong> — 호흡·연소에 꼭 필요</li>
          <li><strong>아르곤·이산화탄소·수증기 등 1%</strong></li>
        </ul>
      </SectionCard>

      <SectionCard title="기체 발생·검출 실험">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GasIdentificationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="기체의 성질을 활용해요">
        <p>
          산소는 의료용 호흡과 용접에, 이산화탄소는 소화기와 탄산음료에, 수소는 연료전지에, 질소는 식품의 산화 방지에
          쓰여요. 각 기체의 「성질」을 알면 「용도」를 만들어낼 수 있어요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
