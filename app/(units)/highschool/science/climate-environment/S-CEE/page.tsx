import { notFound } from 'next/navigation';
import { UnitSCEEExplorer } from '@/components/interactive/science/highschool/UnitSCEEExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CEE';

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
          { label: '기후변화·환경생태' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          기후변화는 「먼 미래의 일」이 아니라 <strong>지금 일어나는 사건</strong>.
          IPCC 시나리오는 우리가 오늘 내리는 결정에 따라 2100년의 지구가 +1.5 °C인지 +4 °C인지를 정해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — SSP 시나리오와 임계점">
        <p>
          IPCC 6차 보고서(AR6)는 5개 SSP 시나리오를 제시. SSP1-1.9: 2050 탄소중립 → +1.4 °C. SSP2-4.5: 중간 → +2.7 °C. SSP5-8.5: 화석연료 의존 → +4.4 °C.
          기후 민감도 ≈ 3 °C / CO₂ 2배. 1.5 °C 임계점을 넘으면 산호초·북극 빙하·영구동토 등이 회복 불가능한 변화로.
          생태계 측면: 개체군 동태(로지스틱 성장)·먹이그물·생물다양성 손실이 모두 연동.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "지구 역사상 더 따뜻했던 적도 있다" — 사실. 다만 변화 속도가 자연 스케일의 ~100배.<br />
          ❌ "겨울이 추우니 온난화는 거짓" — 평균과 변동성은 다른 개념. 극단현상 빈도는 오히려 ↑.<br />
          ❌ "한 사람이 줄여도 의미 없다" — 정책·소비·투표가 시스템 전체를 움직임. 누적이 결정.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          한국의 2050 탄소중립 선언, RE100, EU 탄소국경조정(CBAM) 모두 이 시나리오 분석에서 도출된 정책.
          내신·수능 통합과학·지구과학Ⅰ「기후변화」는 매년 출제. 그래프 해석·정책 비교가 ★.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSCEEExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
