import { notFound } from 'next/navigation';
import { ChainRuleExplorer } from '@/components/interactive/math/highschool/ChainRuleExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA2-04';

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
          연쇄법칙(Chain Rule)은 <strong>「변수가 다른 변수를 통해 변할 때」</strong> 변화율을 곱셈으로 잇는 공식이에요.
          dy/dx = (dy/du)·(du/dx) — 마치 분수처럼 약분되는 것처럼 보이지만 엄밀히는 합성함수의 미분 정리.
          매개변수 미분, 음함수 미분으로 자연스럽게 확장됩니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 두 가지 응용">
        <p>
          <strong>합성함수 미분</strong>: y = f(g(x))이면 dy/dx = f&apos;(g(x))·g&apos;(x).
          예) y = sin(x²) → dy/dx = cos(x²)·2x.
          <strong>매개변수 미분</strong>: x = x(t), y = y(t)일 때 dy/dx = (dy/dt)/(dx/dt).
          반원에서 x = cos t, y = sin t로 매개변수화하면 접선 기울기가 곧장 나와요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「sin(x²)의 미분 = cos(x²)」 — 안쪽 미분 2x를 빠뜨리면 안 돼요.
          ❌ 「(dy/dx)는 진짜 분수다」 — 연쇄법칙에서 「분수처럼」 다루지만 엄밀히는 라이프니츠 표기에 불과.
          ❌ 「매개변수 미분은 dx/dt가 양수일 때만」 — 부호와 상관없이 성립. 단, dx/dt = 0인 점에서는 정의되지 않음.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          사이클로이드, 행성 궤도, 로봇 팔의 운동학 — 매개변수 미분은 곡선을 「시간으로 풀어 쓴」 모든 문제의 도구.
          합성함수 모드에서 k를 바꿔 보세요. sin(kx²)이 k가 커질수록 진동이 빨라지고 도함수의 진폭도 커지는 것을 확인할 수 있어요.
          매개변수 모드에서 t = π/2 근처에서 dx/dt가 0에 가까워져 dy/dx가 발산하는 모습도 관찰 가능합니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ChainRuleExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
