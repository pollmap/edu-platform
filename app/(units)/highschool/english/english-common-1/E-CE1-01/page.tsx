import { notFound } from 'next/navigation';
import { SituationalDialogueSimulator } from '@/components/interactive/english/SituationalDialogueSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-CE1-01';

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
          듣기·말하기는 <strong>상황·청자·격식</strong>에 맞춰 표현을 고르는 능력이에요.
          단어를 더 외우는 것보다, "이 상황에서는 어떤 표현이 자연스러운가"의 감각을 키우는 게 훨씬 큰 향상으로 이어져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 격식 3단계">
        <p>
          영어 회화는 보통 <strong>격식(formal) · 준격식(neutral) · 비격식(casual)</strong> 3단계로 톤이 갈려요.
          면접·발표는 격식, 카페·길 묻기는 준격식, 친구와의 대화는 비격식. 같은 의미라도
          "I want…" 대신 "Could I…?" "Wanna…?"처럼 표현이 달라져요. 줄임말과 슬랭의 사용 가능 여부도 격식이 결정.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "원어민처럼 발음만 하면 된다" — 잘못된 격식의 표현은 발음이 좋아도 이상하게 들려요.
          ❌ "줄임말은 모두 비격식" — 일부 줄임말(it&apos;s, I&apos;m)은 준격식까지 자연스러움.
          ❌ "직설적인 게 솔직한 거다" — 영어권 회화에서 정중함은 대화의 기본 매너.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          공항·여행·진로 면접·온라인 미팅 — 모두 격식 감각이 결과를 좌우해요.
          수능 듣기는 상황·관계 추론 문제가 자주 출제. 아래 4가지 상황의 대화 패턴을 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SituationalDialogueSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
