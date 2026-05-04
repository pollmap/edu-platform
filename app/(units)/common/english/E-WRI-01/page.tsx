import { notFound } from 'next/navigation';
import { TextStructureTree } from '@/components/interactive/korean/TextStructureTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'E-WRI-01';

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
          글쓰기는 작은 단위부터 차근차근. <strong>문장 → 단락(paragraph) → 글(essay)</strong> 순으로 쌓아 올려요.
        </p>
      </SectionCard>
      <SectionCard title="단락 1개 = 아이디어 1개">
        <p>
          한 단락에는 <strong>한 가지 생각</strong>만 담아야 해요. 단락을 쓸 땐 (1) 토픽 문장 → (2) 근거·예시 → (3) 정리 순으로.
          5문장 단락이 입문에 알맞아요. 단락 3~5개를 모으면 한 편의 글이 돼요. 영어든 한국어든 글의 뼈대 구조는 같아요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TextStructureTree />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
