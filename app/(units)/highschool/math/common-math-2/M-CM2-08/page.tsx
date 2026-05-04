import { notFound } from 'next/navigation';
import { RationalIrrationalFunctionExplorer } from '@/components/interactive/math/RationalIrrationalFunctionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM2-08';

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
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          유리함수 y = k / (x − p) + q 와 무리함수 y = √(x − p) + q 는 둘 다
          <strong>「기본 모양에 평행이동을 더한 형태」</strong>예요.
          유리함수는 <strong>점근선</strong>(접근하지만 닿지 않는 직선), 무리함수는 <strong>시작점</strong>(정의역 끝) 이 핵심 포인트.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 그래프와 정의역·치역">
        <p>
          ① <strong>유리함수</strong> y = k/(x − p) + q: 세로 점근선 x = p, 가로 점근선 y = q. k &gt; 0 이면 1·3사분면형, k &lt; 0 이면 2·4사분면형.<br />
          정의역 x ≠ p, 치역 y ≠ q.<br />
          ② <strong>무리함수</strong> y = √(x − p) + q: (p, q) 에서 출발해 오른쪽 위로 뻗는 곡선.<br />
          정의역 x ≥ p, 치역 y ≥ q.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 점근선을 「선이 닿는다」고 봄 — 점근선은 「가까이 가지만 닿지 않는」 한계선.<br />
          ❌ 평행이동 부호 — y = k/(x − p) 는 「오른쪽으로 p」, y = k/x + q 는 「위로 q」. 식의 부호는 반대로 들어가요.<br />
          ❌ 무리함수 정의역에서 루트 안이 음수가 되는 영역 빠뜨림.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          속도·일률 문제(시간 = 일의 양 / 속도), 광학(렌즈 공식), 음향(소리 세기 ∝ 1/거리²) — 모두 유리·무리함수 모형.
          수능 공통수학2 마지막 단원이라 「유리·무리함수 + 합성·역함수」 결합 문제가 자주 출제돼요.
          아래에서 슬라이더로 점근선이 어떻게 움직이는지, 무리함수 시작점이 어떻게 이동하는지 직접 확인해 보세요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RationalIrrationalFunctionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
