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

const UNIT_ID = 'K-RD-01';

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
          글은 <strong>큰 묶음 → 토픽 문장 → 뒷받침 문장</strong> 같은 계층 구조로 짜여 있어요. 글의 종류에 따라 묶음의 이름과 순서가 달라집니다.
        </p>
      </SectionCard>
      <SectionCard title="왜 구조를 알아야 할까">
        <p>
          글을 처음부터 끝까지 외우려 하지 말고 <strong>구조 먼저</strong> 보세요. 묶음과 토픽 문장만 잡아도 핵심을 파악할 수 있어요. 시험 지문을 빨리 읽거나 글을 직접 쓸 때 모두 도움이 됩니다.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>설명문</strong> — 정보 전달, 서론/본론/결론</li>
          <li><strong>논설문</strong> — 주장과 근거, 문제 제기 → 근거 → 주장 정리</li>
          <li><strong>서사문</strong> — 이야기, 발단/전개·위기/결말</li>
        </ul>
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
