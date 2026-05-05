import { notFound } from 'next/navigation';
import { LensOpticsExplorer } from '@/components/interactive/science/LensOpticsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S7-ME-02';

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
          빛은 파동이에요. 직진하다가 다른 매질을 만나면 「반사」하거나 「굴절」해요. 렌즈는 굴절을 이용해서
          빛을 모으거나 흩어 「상」을 만들어요.
        </p>
      </SectionCard>

      <SectionCard title="빛의 3가지 행동">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>직진</strong>: 같은 매질 안에서는 똑바로 (그림자)</li>
          <li><strong>반사</strong>: 입사각 = 반사각 (거울)</li>
          <li><strong>굴절</strong>: 매질 경계에서 꺾임 (물 속 젓가락이 휘어 보임)</li>
        </ul>
      </SectionCard>

      <SectionCard title="볼록·오목 렌즈 시뮬레이션">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LensOpticsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="파동의 공통 성질">
        <p>
          소리·물결·빛 모두 「파동」이에요. 파장(λ)·진동수(f)·진폭으로 표현해요.
          빛은 「가시광선」(380~750nm)만 눈에 보이지만, 적외선·자외선·X선·전파 모두 같은 전자기파의 일부예요.
          진동수가 다를 뿐.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
