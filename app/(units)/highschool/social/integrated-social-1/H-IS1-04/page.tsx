import { notFound } from 'next/navigation';
import { UrbanizationSimulator } from '@/components/interactive/social/UrbanizationSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS1-04';

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
          생활공간은 <strong>고정된 무대가 아니라 끊임없이 재구성되는 흐름</strong>이에요.
          농경 → 산업화 → 도시화 성숙 → 정보화 → 스마트 도시. 단계마다 새로운 혜택과 새로운 문제가 함께 와요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5단계 흐름">
        <p>
          단계가 진전될수록 <strong>도시화율과 생산성</strong>이 올라가요. 동시에 <strong>주거·환경·격차·디지털</strong>의
          새로운 과제가 생겨나요. 정보화 사회에선 일부 일자리가 위치와 무관해지고, 스마트 도시에서는
          데이터가 도시 자체의 인프라가 돼요. "진보 vs 후퇴" 이분법이 아니라, 각 단계의 트레이드오프를 보는 게 중요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "도시화 = 무조건 좋다" — 환경 오염·격차·소외도 함께 커져요.
          ❌ "정보화 = 모두에게 평등한 기회" — 디지털 격차로 새로운 불평등이 생겨요.
          ❌ "스마트 도시는 SF" — 한국·싱가포르·바르셀로나 등 이미 운영되는 인프라.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          내가 사는 도시가 어느 단계인지, 어떤 과제가 가장 큰지 점검해 보면 통합사회의 시야가 잡혀요.
          내신·수행평가는 단계별 특성과 문제 매칭이 자주 출제. 아래 슬라이더로 5단계를 직접 이동해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UrbanizationSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
