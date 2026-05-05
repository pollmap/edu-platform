import { notFound } from 'next/navigation';
import { PresentationStructureSimulator } from '@/components/interactive/english/PresentationStructureSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-PD';

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
          { label: '고등학교', href: '/highschool' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          영어 발표와 토론은 <strong>표현이 정해진 6단계 흐름</strong>이 있어요.
          외울 게 많아 보여도 단계별 시그널 표현 2~3개씩만 익히면 진짜 발표·토론이 가능해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 발표 6단계">
        <p>
          ① Opening → ② Preview → ③ Main Points → ④ Transition → ⑤ Closing → ⑥ Q&amp;A.
          단계마다 <strong>고정 표현</strong>이 있어 청중이 흐름을 따라가기 쉬워요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;원어민처럼 술술 말해야&quot; — 명확한 구조가 발음보다 더 중요해요.
          ❌ &quot;Q&amp;A에서 모르는 척하면 X&quot; — 모르면 솔직히 인정 + follow-up이 신뢰의 길.
          ❌ &quot;Transition은 시간 낭비&quot; — 청중이 길을 잃지 않게 해주는 핵심 도구.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          대학 발표·인턴 미팅·해외 면접 — 모두 같은 6단계 구조로 풀려요.
          토익 스피킹·OPIC도 이 흐름을 평가합니다. 아래에서 단계별 표현을 직접 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PresentationStructureSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
