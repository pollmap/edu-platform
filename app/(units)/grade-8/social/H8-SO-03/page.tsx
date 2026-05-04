import { notFound } from 'next/navigation';
import { SupplyDemandExplorer } from '@/components/interactive/social/SupplyDemandExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H8-SO-03';

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
          한 나라가 다른 나라와 물건과 서비스를 사고 파는 것이 <strong>국제거래(무역)</strong>예요.
          국가별로 잘 만들 수 있는 것이 다르기 때문에 무역을 하면 모두에게 이득이 돼요(<strong>비교우위</strong>).
        </p>
      </SectionCard>
      <SectionCard title="국민경제는 가계 · 기업 · 정부의 흐름">
        <p>
          가계는 일하고 임금을 받고, 기업은 물건을 팔아 이익을 얻고, 정부는 세금을 걷어 공공서비스를 제공해요.
          이 셋이 서로 돈과 재화를 주고받으며 경제가 돌아가요. 무역은 여기에 외국이 추가된 형태예요.
          수요-공급 그래프로 시장 가격이 어떻게 정해지는지 익혀 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SupplyDemandExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
