import { notFound } from 'next/navigation';
import { PunnettSquareExplorer } from '@/components/interactive/science/PunnettSquareExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S9-LI-01';

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
          유전은 「조합」이에요. 부모로부터 한쪽씩 받은 두 유전자가 짝을 이루고, 그중 「우성」이 표현형으로 드러나요.
          멘델은 완두콩으로 이 규칙을 발견했어요.
        </p>
      </SectionCard>

      <SectionCard title="멘델의 법칙">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>분리의 법칙</strong>: 한 쌍의 유전자는 생식세포 형성 시 1개씩 나뉨</li>
          <li><strong>우성·열성</strong>: 잡종 1세대(F1)에서는 우성 형질만 표현</li>
          <li><strong>독립의 법칙</strong>: 두 쌍의 형질은 서로 영향 없이 유전 (같은 염색체에 있으면 연관)</li>
        </ul>
      </SectionCard>

      <SectionCard title="퍼넷사각형으로 확률 계산">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PunnettSquareExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="DNA에서 형질까지">
        <p>
          유전자는 DNA의 한 부분이고, 단백질을 만드는 「설계도」예요. 부모의 정자·난자가 만나면 23+23=46개 염색체로
          새 개체가 시작돼요. 「분리·조합」을 통해 같은 부모에게서 다양한 자녀가 태어나요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
