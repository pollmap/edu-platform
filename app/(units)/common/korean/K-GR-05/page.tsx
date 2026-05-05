import { notFound } from 'next/navigation';
import { SentenceComponentTree } from '@/components/interactive/korean/SentenceComponentTree';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-GR-05';

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
          모든 한국어 문장은 <strong>주어 + 서술어</strong>라는 두 기둥 위에 서요. 거기에
          <strong>목적어·보어·관형어·부사어</strong> 같은 부속 성분이 붙어 의미가 풍부해져요.
          문장의 짜임을 알면 긴 글도 한눈에 분해할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="문장의 5대 성분">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>주어</strong> — 누가 / 무엇이 (이/가, 은/는)</li>
          <li><strong>서술어</strong> — 어찌하다 / 어떠하다 / 무엇이다</li>
          <li><strong>목적어</strong> — 무엇을 (을/를)</li>
          <li><strong>보어</strong> — 무엇이 되다 / 아니다</li>
          <li><strong>관형어·부사어</strong> — 꾸며 주는 말 (어떤·어떻게)</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          문장은 <strong>홑문장</strong>(주·서 한 쌍)과 <strong>겹문장</strong>(이어진·안긴 문장)으로 나뉘어요.
          홑문장 두 개를 어떤 연결 어미로 묶느냐에 따라 의미가 미세하게 달라져요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SentenceComponentTree />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
