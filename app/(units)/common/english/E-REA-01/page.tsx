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

const UNIT_ID = 'E-REA-01';

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
          영어 글을 잘 읽으려면 단어 하나씩 해석하기 전에 <strong>주제(topic)와 요지(main idea)</strong>를 먼저 잡아야 해요.
          모든 글에는 핵심 한 문장이 있어요 — 그걸 찾는 연습이 영어 독해의 절반이에요.
        </p>
      </SectionCard>
      <SectionCard title="topic sentence 찾기">
        <p>
          영어 단락은 보통 <strong>맨 앞 문장</strong>이 토픽 문장(topic sentence)이에요. 그 뒤 문장들은 토픽 문장의 근거·예시·세부 정보를 줘요.
          첫 문장을 잘 잡고 나머지를 'why·how·example' 로 분류하면 영어 글 구조가 한국어와 똑같이 보여요.
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
