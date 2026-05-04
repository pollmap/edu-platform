import { notFound } from 'next/navigation';
import { ParticleStateSimulator } from '@/components/interactive/science/ParticleStateSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S8-MA-02';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          물에 녹았을 때 <strong>전기를 흐르게 하는 물질</strong>이 <strong>전해질</strong>이에요.
          전해질은 물속에서 (+) 또는 (−) 전기를 띤 작은 알갱이인 <strong>이온</strong>으로 쪼개져요.
        </p>
      </SectionCard>

      <SectionCard title="핵심·왜">
        <p>
          소금(NaCl)은 물에 녹으면 Na⁺(나트륨 양이온)와 Cl⁻(염화 음이온)으로 흩어져요. 이 이온이 전기를 옮기기 때문에 소금물에는 전기가 흘러요.
          반대로 설탕은 물에 녹아도 분자 그대로라 이온이 안 만들어져요. 그래서 설탕물엔 전기가 안 흘러요(<strong>비전해질</strong>).
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>양이온(cation)</strong>: 전자를 잃어 (+) 전기를 띤 입자. 예) Na⁺, Mg²⁺, NH₄⁺.</li>
          <li><strong>음이온(anion)</strong>: 전자를 얻어 (−) 전기를 띤 입자. 예) Cl⁻, OH⁻, SO₄²⁻.</li>
          <li><strong>이온화</strong>: 전해질이 물에서 양이온·음이온으로 갈라지는 과정.</li>
          <li>전해질 강도: 잘 갈라지면 강전해질(소금·염산), 일부만 갈라지면 약전해질(아세트산).</li>
        </ul>
      </SectionCard>

      <SectionCard title="앙금 생성 — 두 이온이 만나면">
        <p>
          서로 다른 두 전해질 용액을 섞으면, 어떤 양이온·음이온 짝이 결합해 <strong>물에 안 녹는 고체(앙금)</strong>로 가라앉기도 해요.
          이 반응으로 어떤 이온이 들어 있었는지 확인할 수 있어요.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Ag⁺ + Cl⁻ → AgCl ↓ (흰색): 염화이온 검출.</li>
          <li>Ba²⁺ + SO₄²⁻ → BaSO₄ ↓ (흰색): 황산이온 검출.</li>
          <li>Pb²⁺ + 2I⁻ → PbI₂ ↓ (노란색): 요오드이온 검출.</li>
        </ul>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「전해질 = 다 위험」 → 우리 몸에도 Na⁺, K⁺, Ca²⁺ 같은 전해질이 꼭 필요해요. 이온 음료가 전해질을 보충하는 이유.</li>
          <li><strong>오개념 2.</strong> 「물 자체가 전기를 흐른다」 → 순수한 물은 거의 안 흐르게 해요. 녹아 있는 이온이 흐르게 하는 것.</li>
          <li><strong>오개념 3.</strong> 「이온은 분자가 부서진 것」 → 분자가 깨졌다기보단 전자가 옮겨가서 전기적 균형이 깨진 입자라고 보는 게 정확.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 이온">
        <p>
          이온 음료, 콘택트렌즈 식염수, 배터리(전해액), 도금(금속 이온이 전기로 옮겨감), 정수기 필터(이온 교환), 산성비(H⁺) — 화학과 일상이 만나는 거의 모든 자리에 이온이 있어요.
          몸속 이온 균형이 깨지면 근육 경련·부정맥이 생겨서 의료에서도 핵심 지표예요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ParticleStateSimulator />
        </InteractiveErrorBoundary>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          ※ 위 입자 모델은 상태변화용이지만, 같은 「입자가 흩어지는 모습」을 떠올리면서 이온이 물속에서 자유롭게 움직이는 장면을 상상해 보세요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
