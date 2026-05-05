import { notFound } from 'next/navigation';
import { AnimalHabitatExplorer } from '@/components/interactive/science/AnimalHabitatExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S4-LI-02';

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
          식물은 움직이지 못하지만, <strong>사는 곳(서식지)에 맞게 잎·줄기·뿌리의 모양을 바꾸며</strong>
          살아남았어요. 사막의 선인장은 가시 같은 잎으로 물을 아끼고, 연못의 부레옥잠은 줄기에 공기 주머니를 만들어 떠 있어요.
        </p>
      </SectionCard>
      <SectionCard title="서식지별 식물 생김새의 비밀">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>들·산</strong> — 보통 잎+뿌리, 꽃과 열매로 번식</li>
          <li><strong>사막</strong> — 잎이 가시·두꺼운 줄기·깊고 넓은 뿌리 (선인장)</li>
          <li><strong>물 위</strong> — 잎이 넓고 가벼움·공기 주머니 (부레옥잠·연꽃)</li>
          <li><strong>물 속</strong> — 잎이 길고 흐물흐물·뿌리는 흙 속 (검정말)</li>
          <li><strong>높은 산</strong> — 키가 작고 빽빽이 뭉침 (눈잣나무)</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          식물의 모양은 <strong>그곳에서 살아남기 위한 답</strong>이에요. 모양을 보면 어디서 사는지 거꾸로 추측할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AnimalHabitatExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
