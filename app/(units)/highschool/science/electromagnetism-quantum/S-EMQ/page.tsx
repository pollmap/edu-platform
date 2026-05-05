import { notFound } from 'next/navigation';
import { UnitSEMQExplorer } from '@/components/interactive/science/highschool/UnitSEMQExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-EMQ';

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
          { label: '전자기와 양자' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          전자기는 「변하는 자기장이 전기를 만들고, 변하는 전기가 자기를 만든다」는 짝궁 관계예요.
          그리고 그 결과로 빛 자체가 「전자기파」. 더 깊이 들어가면 빛은 입자(광자)이기도 하고
          전자도 파장(드브로이)이기도 한 — <strong>이중성</strong>의 세계.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 유도·광전·드브로이">
        <p>
          패러데이의 법칙: 유도기전력 ε = −dΦ/dt. 도선이 자기장 속에서 움직이면 ε = BLv.
          광전효과: E = hf. 한계 진동수 이상의 빛만 전자를 떼어내고, 빛 세기는 전자 수에만 영향(KE는 진동수가 결정).
          드브로이: λ = h/(mv). 입자도 파동이라는 사실을 전자 회절 실험으로 확인.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "광전효과는 빛 세기로 전자가 더 많이 빠른다" — 빛 세기는 「전자 수」만 늘려요. 속도는 진동수.<br />
          ❌ "전자기 유도는 자석을 움직여야만 일어난다" — 자기장이 변하기만 하면 됨. 도선이 움직여도 OK.<br />
          ❌ "드브로이 파장은 가상의 파동" — 실험으로 회절 관측. 실재하는 파동.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          발전기·인덕션레인지·교통카드 NFC는 모두 전자기 유도. 태양광 패널이 전기를 만드는 원리는 광전효과와 유사한 광기전.
          전자현미경은 드브로이 파장이 광학현미경 한계를 깬 결과. 수능 물리Ⅰ·Ⅱ 단골 출제 영역.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSEMQExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
