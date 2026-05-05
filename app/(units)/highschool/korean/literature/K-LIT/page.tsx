import { notFound } from 'next/navigation';
import { KoreanLiteraryHistoryTimeline } from '@/components/interactive/korean/KoreanLiteraryHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-LIT';

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
          문학은 <strong>인간 경험의 압축본</strong>이에요. 한 시대의 가치·감정·사회 문제가
          시·소설·희곡·수필이라는 형식 안에 결정처럼 굳어 있고, 우리는 그 결정을 풀어가며 읽어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 문학사 흐름의 4축">
        <p>
          한국 문학사는 <strong>고대 → 중세 → 근대 → 현대</strong> 4단계로 흐르고,
          각 단계마다 갈래(시·소설·희곡·수필)가 함께 변해요. 시대 배경 → 형식 변화 → 주제 변화의
          순서로 읽으면 흐름이 보여요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;옛글은 어렵기만 하다&quot; — 형식과 시대 배경을 알면 이해 속도가 훨씬 빨라져요.
          ❌ &quot;시는 감정만 읽으면 된다&quot; — 운율·이미지·시대 맥락까지 함께 읽어야 깊이 이해 가능.
          ❌ &quot;소설은 줄거리가 전부&quot; — 서술자 시점·문체·구조가 의미를 만드는 요소예요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 문학은 갈래·시대·작가·기법 식별이 자주 출제. 작품 본문보다
          <strong> 형식·맥락·기법</strong>을 먼저 익혀두면 처음 보는 작품도 빨리 읽혀요.
          아래 한국 문학사 타임라인으로 시대별 흐름을 잡아보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanLiteraryHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
