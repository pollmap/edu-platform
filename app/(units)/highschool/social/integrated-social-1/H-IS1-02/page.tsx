import { notFound } from 'next/navigation';
import { HappinessFactorsExplorer } from '@/components/interactive/social/HappinessFactorsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS1-02';

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
          행복은 단일 변수가 아니라 <strong>여러 요인의 조합</strong>이에요. 소득·관계·건강·자율성·의미·사회 신뢰 — 6가지 축이
          어떤 비중으로 결합되는지가 사람마다, 사회마다 달라요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 행복 결정 6요인">
        <p>
          연구들은 일관되게 <strong>관계·건강·의미</strong>를 장기 행복의 가장 큰 축으로 보고해요. 소득은 일정 수준까지만
          강한 영향을 주고(이스털린 역설), 이후에는 자율성과 의미가 더 중요해져요. 사회 신뢰·제도 공정성도
          국가 단위 비교에서 행복 지수와 강하게 묶여요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "돈이 많을수록 행복하다" — 기본 욕구 충족 이후로는 효과가 둔화돼요.
          ❌ "행복은 마음먹기 나름" — 사회·제도 환경이 개인 행복에 큰 영향을 줘요.
          ❌ "행복은 측정 불가능" — 자기 보고·종단 연구로 상당한 설명력을 가진 지표가 만들어져 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          진로·생활 설계에서 "내가 어떤 요인을 가장 중요하게 생각하는가"를 점검해 보면 의외로 잘 모르는 경우가 많아요.
          내신·수행평가에서는 행복 결정요인 비교가 자주 출제. 아래 슬라이더로 본인의 가중치를 조정해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HappinessFactorsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
