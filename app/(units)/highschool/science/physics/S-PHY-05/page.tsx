import { notFound } from 'next/navigation';
import { CircuitBuilder } from '@/components/interactive/science/CircuitBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-PHY-05';

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
          { label: '물리학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          전하가 흐르면 <strong>전류</strong>, 전하가 받는 압력이 <strong>전압</strong>, 흐름을 막는 정도가 <strong>저항</strong>이에요.
          이 셋의 관계가 옴의 법칙(V = IR). 그리고 전류가 흐르면 자기장이 생기고, 자기장이 변하면 전류가 유도돼요.
          이 양방향 관계가 모든 전기제품의 원리예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 옴의 법칙과 회로 분석">
        <p>
          직렬 연결: 같은 전류 I, 전압 분배 V = V₁+V₂. 저항 합 R = R₁+R₂.
          병렬 연결: 같은 전압 V, 전류 분배 I = I₁+I₂. 1/R = 1/R₁+1/R₂.
          전력 P = VI = I²R. 전류가 자기장을 만든다는 게 앙페르 법칙, 자기장 변화가 전류를 만든다는 게 패러데이 유도법칙.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "직렬이 더 밝다" — 같은 전압에서는 병렬이 더 밝아요(저항 작아짐 → 전류 큼).
          ❌ "전압이 흐른다" — 흐르는 건 전하(전류). 전압은 양 끝점의 에너지 차이.
          ❌ "자기장은 영구자석에서만 나온다" — 전류가 흐르는 모든 도선이 자기장을 만들어요. 전자석의 원리.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          전동기·발전기는 모두 「전류 ↔ 자기장」 변환 장치. 휴대폰 무선충전도 패러데이 전자기 유도.
          가전제품 누전차단기는 들어가는 전류와 나오는 전류 차이를 감지해 자동으로 끊어요.
          수능 「전자기와 양자」 단원의 핵심. 회로 계산 + 자기장 방향 문제 단골.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CircuitBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
