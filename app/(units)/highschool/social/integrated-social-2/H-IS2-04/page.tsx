import { notFound } from 'next/navigation';
import { SDGsExplorer } from '@/components/interactive/social/SDGsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS2-04';

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
          지속가능발전(Sustainable Development)은 <strong>현재 세대의 필요를 충족하면서도 미래 세대의 가능성을 해치지 않는</strong>
          발전을 뜻해요. 2015년 UN이 채택한 <strong>SDGs 17목표</strong>가 그 실행 지도예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5P 그룹">
        <p>
          17목표는 흔히 <strong>People · Planet · Prosperity · Peace · Partnership</strong> 5P로 묶여요.
          빈곤·기아·건강·교육·성평등(People), 물·기후·생태(Planet), 에너지·일자리·산업·도시·소비(Prosperity),
          평화와 정의(Peace), 글로벌 협력(Partnership). 목표들은 서로 얽혀 있어 한 목표만 따로 해결할 수 없어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "환경 보호 = 경제 포기" — SDGs는 둘을 양립시키는 길을 모색.
          ❌ "선진국 책임만의 문제" — 모든 국가·기업·개인이 함께 행동해야 효과가 나요.
          ❌ "2030년까지 다 달성된다" — 진척은 균등하지 않고 일부 목표는 후퇴 중. 점검과 보완이 계속 필요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학교 동아리·공모전·진로 탐구 — SDGs 한두 목표를 골라 자기 활동과 연결하면 의미가 분명해져요.
          내신·수행평가는 SDGs 목표 식별과 연계 분석이 자주 출제. 아래 5P 그룹별로 17목표를 살펴보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SDGsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
