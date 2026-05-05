import { notFound } from 'next/navigation';
import { UnitSPSSExplorer } from '@/components/interactive/science/highschool/UnitSPSSExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-PSS';

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
          { label: '행성우주과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          별빛이 살짝 어두워지면(통과) 행성이 별 앞을 지나갔다는 것. 별빛 색이 살짝 빨개지면(적색편이) 별이
          멀어지고 있다는 것. <strong>아주 작은 변화</strong>가 우주의 가장 큰 비밀들을 드러내요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 통과·시선속도·허블">
        <p>
          통과법: 행성이 별 앞을 지나면 (Rp/Rs)² 비율만큼 별빛이 어두워짐. Kepler·TESS 위성이 5,000+ 외계행성 발견.
          시선속도법: 행성이 별을 끌어 별이 흔들 → 도플러 효과로 별빛 파장 주기적 변동. K = 28.4 × Mp(MJ) × P(yr)^(−1/3) m/s.
          허블 법칙: v = H₀d. H₀ ≈ 70 km/s/Mpc. 적색편이 z = v/c. 우주가 팽창한다는 직접 증거.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "허블 법칙은 은하가 우리에게서 도망가는 것" — 은하가 움직이는 게 아니라 「공간 자체」가 늘어나는 것.<br />
          ❌ "통과법으로 모든 외계행성 발견" — 궤도가 우리 시선과 정렬돼야만 가능. 무작위 ~1 % 확률.<br />
          ❌ "블랙홀은 모든 걸 빨아들인다" — 같은 거리·같은 질량이면 별·블랙홀 인력 똑같음. 「가까이 가야」 강해짐.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          제임스웹 우주망원경이 z ≈ 13의 초기 은하 관측, 외계행성 대기 분광으로 생명 흔적 탐색. 트라피스트-1 행성계는 통과법·시선속도법 결합 사례.
          수능 지구과학Ⅱ 「우주의 진화」는 매년 출제. 허블 법칙 그래프·외계행성 검출 원리가 ★.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSPSSExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
