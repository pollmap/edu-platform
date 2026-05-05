import { notFound } from 'next/navigation';
import { ChemicalEquilibriumSimulator } from '@/components/interactive/science/ChemicalEquilibriumSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S6-MA-02';

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
          물질이 빛과 열을 내며 타는 현상이 <strong>연소</strong>예요. 연소가 일어나려면
          <strong>탈 물질·산소·발화점 이상의 온도</strong> 세 가지가 동시에 필요해요. 이 셋 중 하나만 끊으면
          불이 꺼지는데, 그게 바로 <strong>소화</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="연소의 3요소와 소화의 3원리">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>탈 물질 제거</strong> — 가스 밸브 잠그기·산불 길 끊기</li>
          <li><strong>산소 차단</strong> — 담요·소화기 거품으로 덮기</li>
          <li><strong>온도 낮추기</strong> — 물 뿌리기 (발화점 아래로)</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          기름불에 물을 부으면 더 번지는 이유는, 기름이 떠올라 산소와 다시 만나기 때문이에요.
          기름·전기 화재에는 <strong>전용 소화기</strong>를 써야 해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ChemicalEquilibriumSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
