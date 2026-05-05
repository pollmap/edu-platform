import { notFound } from 'next/navigation';
import { UnitSCMEExplorer } from '@/components/interactive/science/highschool/UnitSCMEExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CME';

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
          { label: '물질과 에너지' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          기체의 압력·부피·온도는 <strong>PV = nRT</strong> 한 식으로 묶여 있고,
          어떤 열기관도 카르노 효율 <strong>η = 1 − T_C/T_H</strong>를 못 넘어요.
          그리고 자발적 변화는 항상 「엔트로피가 늘어나는 방향」으로만 일어나요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 이상기체와 두 열역학 법칙">
        <p>
          이상기체 상태방정식 PV = nRT (R = 0.0821 L·atm/mol·K). 압력·부피·온도 셋 중 둘만 알면 나머지가 결정.
          제1법칙: 에너지는 보존, ΔU = Q − W. 제2법칙: 우주의 엔트로피는 항상 증가, ΔS_total ≥ 0.
          따라서 카르노 사이클이 이론적 최고 효율, T_C가 0 K이 되어야 100 %.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "압력 ↑ 하면 항상 부피 ↘" — 온도가 함께 변하면 보일의 법칙이 깨짐. 온도 일정일 때만 P·V 반비례.<br />
          ❌ "효율 100 % 열기관은 노력하면 가능" — 카르노가 절대 한계. T_C = 0 K은 도달 불가.<br />
          ❌ "엔트로피는 무질서다" — 엄밀히는 「가능한 미시상태의 수」의 로그. 무질서는 직관적 비유일 뿐.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          자동차 가솔린 엔진 효율 ~25 %, 화력발전 ~40 %, 발전소가 강가에 있는 이유는 T_C 낮은 냉각수 확보.
          냉장고는 「엔트로피 감소」 같지만 외부 환경 엔트로피가 더 늘어 총합 ↑. 수능·내신 모두 사이클 P-V 그래프 ★ 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSCMEExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
