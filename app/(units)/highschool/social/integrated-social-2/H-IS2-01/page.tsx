import { notFound } from 'next/navigation';
import { GiniCoefficientExplorer } from '@/components/interactive/social/GiniCoefficientExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS2-01';

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
          정의는 <strong>"무엇이 정당한 분배인가"</strong>에 대한 사회적 합의를 묻는 문제예요.
          지니계수 같은 지표로 불평등을 측정하고, 정의론(공리주의·자유주의·평등주의·역량 접근)으로 어떤 분배를
          정당하다고 볼지 따져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 측정과 평가의 분리">
        <p>
          ① <strong>측정</strong>: 지니계수·로렌츠 곡선·5분위 배율 등으로 격차 자체를 객관적으로 잰다.
          ② <strong>평가</strong>: 같은 지니계수도 어떤 정의관에서 보느냐에 따라 "수용 가능"과 "교정 대상"이 달라진다.
          이 둘을 섞지 않는 게 핵심. 지니계수가 낮다고 무조건 좋은 사회도 아니고, 높다고 무조건 나쁜 사회도 아니에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "지니 = 0이 이상적이다" — 완전 평등은 인센티브 부족 등 다른 문제를 만들 수 있어요.
          ❌ "공리주의 = 최대 다수의 행복" — 소수 희생을 정당화하는 결과를 낳을 위험.
          ❌ "정의론은 추상이라 실생활과 무관" — 세금·복지·교육 정책의 모든 토대가 정의론에서 나와요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          최저임금·기본소득·세제 개편 — 모두 정의론의 실전 응용. 내신·수행평가에서는 같은 사례를 4가지 정의관으로
          비교 분석하는 문제가 자주. 아래에서 지니계수와 정의관을 함께 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GiniCoefficientExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
