import { notFound } from 'next/navigation';
import { UnitSESSExplorer } from '@/components/interactive/science/highschool/UnitSESSExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-ESS';

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
          { label: '지구시스템과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          지구는 「대기·해양·생물·암석」 4권역이 끊임없이 물·탄소·질소·에너지를 주고받는 한 시스템이에요.
          어느 한 곳에 자극이 들어오면 다른 모든 곳이 반응해요. <strong>피드백 루프</strong>가 핵심.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4대 순환과 복사 균형">
        <p>
          탄소 순환: 광합성·호흡·해양 용해·화석연료 연소가 4대 흐름. 인간 배출 ≈ 9 GtC/yr이 자연 균형 깸.
          물 순환: 증발·응결·강수·유출. 대기 수증기 체류 ~9일. 질소 순환: 고정→질산화→동화→탈질.
          에너지 균형: 흡수 ≈ σT⁴ 방출. 알베도 α와 유효 방출률 ε이 평형 온도를 정해요. 현재 ~14 °C는 온실효과 덕분.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "온실효과는 무조건 나쁘다" — 적정 온실효과 없으면 −19 °C, 생명 불가능. 「과잉」이 문제.<br />
          ❌ "물 순환은 비만 생각" — 증발·응결·유출까지 한 사이클. 식물 증산도 큰 흐름.<br />
          ❌ "탄소가 늘어도 식물이 더 흡수해 균형" — 흡수 증가는 한계. 토양·해양 흡수 능력도 포화.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          엘니뇨·라니냐 같은 해양·대기 결합 진동, 전 지구 컨베이어 벨트(THC), 파리협정 1.5 °C 목표가 모두 이 시스템 모델에서 도출.
          내신·수능 지구과학Ⅰ 「에너지 수지·기후변화」는 매년 출제. 그래프 해석이 핵심.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSESSExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
