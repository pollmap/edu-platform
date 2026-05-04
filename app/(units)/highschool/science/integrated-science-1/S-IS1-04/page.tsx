import { notFound } from 'next/navigation';
import { PendulumFreefallSimulator } from '@/components/interactive/science/PendulumFreefallSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-IS1-04';

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
          { label: '통합과학1' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          깃털과 쇠공이 진공에서 동시에 떨어진다는 갈릴레이의 발견은 「물체의 무게가 아닌 <strong>중력가속도 g</strong>가 낙하를 결정한다」는 충격적인 사실.
          단진자도 길이 L과 g만으로 주기가 결정돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 자유낙하·진자·등시성">
        <p>
          자유낙하 — y = ½g t², v = g t, v² = 2gy. 질량 m이 식에 안 나와요.<br />
          단진자 주기 T = 2π√(L/g). 작은 진폭에서 「등시성」 — 진폭이 달라도 주기는 같음. 갈릴레이가 피사 대성당의 흔들리는 등불을 보고 발견.<br />
          모든 진동·파동 현상의 출발점이고, 시계·메트로놈·지진계의 원리이기도 해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "무거운 게 더 빨리 떨어진다" — 진공에서는 동일. 공기 저항 때문에 깃털이 늦게 떨어질 뿐.<br />
          ❌ "진자 주기는 진폭이 클수록 길다" — 작은 각도(≈15° 이내)에서만 등시성 성립.<br />
          ❌ "달에서는 떨어지지 않는다" — 달 g = 1.62 m/s²로 6배 느릴 뿐, 떨어져요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          엘리베이터 가속·감속 시 체중계 변화, 번지점프 안전 거리 계산, 시계 추(grandfather clock)의 길이로 g 측정.
          통합과학·물리Ⅰ에서 등가속도 운동은 ★ 가장 기본. 자유낙하 그래프(t-y, t-v) 해석이 매년 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PendulumFreefallSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
