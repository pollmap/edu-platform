import { notFound } from 'next/navigation';
import { PoemStructureExplorer } from '@/components/interactive/korean/PoemStructureExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-LT-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `학년 공통 / ${SUBJECT_LABEL[unit.subject]}`, href: `/common/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          시는 짧지만 깊은 글이에요. <strong>화자·주제·심상·운율·비유</strong> 다섯 요소만 잡으면
          어떤 시도 분석할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="시를 읽는 순서">
        <p>
          1) 누가 말하고 있어? (<strong>화자</strong>) → 2) 무엇을 말하고 있어? (<strong>주제</strong>) →
          3) 어떤 그림이 떠올라? (<strong>심상</strong>) → 4) 소리 내어 읽으면 어떤 박자가 느껴져? (<strong>운율</strong>) →
          5) 무엇에 빗대어 말하고 있어? (<strong>비유</strong>).
          처음부터 다 보려 하지 말고 한 번에 한 요소씩 깊이 살펴보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PoemStructureExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
