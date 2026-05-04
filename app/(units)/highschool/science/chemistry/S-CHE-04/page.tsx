import { notFound } from 'next/navigation';
import { MolecularGeometryExplorer } from '@/components/interactive/science/highschool/MolecularGeometryExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CHE-04';

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
          { label: '화학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          분자의 모양은 화학식만으로는 안 보여요. 중심 원자 주변의 <strong>전자쌍이 서로 밀쳐내며</strong>
          가장 멀리 떨어지려는 배치가 곧 분자 모양이에요. 이걸 <strong>VSEPR 이론</strong>이라 해요.
          모양이 다르면 극성·반응성·생체활성이 전부 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 입체수와 결합각">
        <p>
          입체수 = 결합쌍 + 고립쌍. 입체수가 2면 직선(180°), 3이면 평면삼각형(120°), 4면 정사면체(109.5°).
          고립쌍이 있으면 결합각이 좁아져요(고립쌍이 결합쌍보다 더 강하게 밀침).
          NH₃(고립쌍 1개)는 107°, H₂O(고립쌍 2개)는 104.5°로 점점 좁아져요.
          극성 분자(H₂O) vs 무극성 분자(CO₂) 구분도 모양으로 결정.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "CO₂는 굽은형이다 (O=C=O)" — 직선형이에요. 두 산소가 정확히 반대 방향에 있어 극성이 상쇄.
          ❌ "H₂O는 평면이다" — 평면이지만 굽은형. 직선이 아니에요(고립쌍 때문).
          ❌ "결합각은 원자 종류로 결정된다" — 사실 전자쌍 「개수」가 결정해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          물이 극성이라 소금을 녹이고 기름을 안 녹이는 이유, DNA의 이중나선이 정확히 그 모양인 이유,
          단백질이 효소 활성을 갖는 이유가 모두 분자 모양에서 출발해요.
          수능 「화학결합과 분자」 단원, 모양 ↔ 결합각 ↔ 극성 묻는 문제 매년 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MolecularGeometryExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
