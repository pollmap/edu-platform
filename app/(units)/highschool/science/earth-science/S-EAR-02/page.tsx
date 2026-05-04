import { notFound } from 'next/navigation';
import { GlobalCirculationExplorer } from '@/components/interactive/science/GlobalCirculationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-EAR-02';

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
          { label: '지구과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          왜 한국 날씨는 「서→동」으로 흘러가나, 왜 사하라는 사막이고 적도 아마존은 우림인가, 왜 태풍은 항상 「오른쪽으로 휘는가」 —
          이 모든 답이 <strong>전지구 대기·해양 대순환</strong> 한 장에 들어 있어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 3순환계·코리올리·해류">
        <p>
          위도별 가열 차이로 적도(상승)·30°(하강)·60°(상승)·극(하강)이라는 3순환(해들리·페렐·극)이 만들어져요.
          지구 자전 → 코리올리 효과로 북반구는 진행 방향의 「오른쪽」, 남반구는 「왼쪽」으로 휘어요.
          표층 해류는 무역풍·편서풍·극풍에 끌려 5대양의 거대한 환류(쿠로시오·멕시코만류 등)를 만들고, 적도→고위도로 열을 운반.
          엘니뇨/라니냐는 적도 태평양 동서 해수면 온도 역전 현상.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "코리올리는 회전목마 타듯 직접 느껴진다" — 너무 작은 힘이라 일상 규모(욕조 물 회전)에선 거의 영향 없음.<br />
          ❌ "해류는 바람만으로 결정된다" — 표층은 바람, 심층은 밀도 차(열염순환).<br />
          ❌ "적도엔 고기압이 있어 맑다" — 반대. 강한 가열로 상승 기류 → 저기압 → 매일 비.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          중국발 황사·미세먼지 이동 경로(편서풍), 태풍 이동 패턴 분석(베타 효과·전향력), 엘니뇨 시 한국 강수량 변화.
          수능 지구과학Ⅰ 「대기와 해양」 단원은 매년 5~6문항이 출제되는 최대 영역. 코리올리·열적환·해류 모두 ★.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GlobalCirculationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
