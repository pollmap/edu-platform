import { notFound } from 'next/navigation';
import { DensitySolubilityExplorer } from '@/components/interactive/science/DensitySolubilityExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S7-MA-02';

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
          물질마다 「얼마나 빽빽한가(밀도)」, 「얼마나 잘 녹는가(용해도)」가 달라요. 이 두 가지는 「물질을 식별하는
          지문」이에요.
        </p>
      </SectionCard>

      <SectionCard title="밀도 = 질량 / 부피">
        <p>
          같은 부피의 「쇠 1L」와 「물 1L」 중 쇠가 훨씬 무거워요. 부피가 같다면 질량이 큰 쪽이 「밀도가 크다」고
          해요. 밀도는 g/mL 또는 kg/L로 표현해요.
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>물 = 1.00 g/mL (기준)</li>
          <li>철 = 7.87 g/mL → 가라앉음</li>
          <li>식용유 = 0.92 g/mL → 물 위로 뜸</li>
        </ul>
      </SectionCard>

      <SectionCard title="용해도 = 100g 물에 녹는 g">
        <p>
          「용해도」는 일정 온도에서 「용매 100g에 최대로 녹을 수 있는 용질의 g」 수예요. 온도에 따라 크게 변해요.
          KNO₃는 0°C에 13g, 80°C에 220g까지 녹아요(17배). NaCl은 거의 일정.
        </p>
      </SectionCard>

      <SectionCard title="밀도탑·용해도 시뮬레이션">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DensitySolubilityExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
