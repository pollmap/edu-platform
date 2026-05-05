import { notFound } from 'next/navigation';
import { MediaComparisonMatrix } from '@/components/interactive/korean/MediaComparisonMatrix';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-MD-01';

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
          매체는 <strong>같은 메시지를 다른 방식으로 전달하는 통로</strong>예요.
          신문 · 라디오 · 텔레비전 · 누리집 · 누리소통망 — 같은 사건도 매체에 따라
          <strong>속도·깊이·감정·믿음 정도</strong>가 모두 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="매체별 5축 비교">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>속도</strong> — 누리소통망 ≫ 누리집 &gt; TV &gt; 신문 &gt; 책</li>
          <li><strong>깊이</strong> — 책 &gt; 신문 &gt; 잡지 &gt; TV &gt; 짧은 영상</li>
          <li><strong>감각</strong> — 책=글, 라디오=소리, TV=글+소리+영상, 게임=상호작용</li>
          <li><strong>방향</strong> — 일방향(TV·신문) vs 쌍방향(SNS·댓글)</li>
          <li><strong>신뢰</strong> — 출처가 분명한가? 검증되었는가?</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          어떤 매체가 더 좋다·나쁘다 하기보다 <strong>목적에 맞게 골라 쓰는 능력</strong>이 중요해요.
          긴 분석은 책으로, 빠른 알림은 SNS로 — 이런 식으로요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MediaComparisonMatrix />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
