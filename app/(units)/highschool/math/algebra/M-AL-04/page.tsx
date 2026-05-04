import { notFound } from 'next/navigation';
import { TrigGraphExplorer } from '@/components/interactive/math/highschool/TrigGraphExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AL-04';

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
          삼각함수의 그래프는 <strong>네 가지 변형 (진폭 A, 주기상수 B, 위상이동 C, 수직이동 D)</strong>으로 모든 형태가
          만들어져요. y = A·sin(B(x − C)) + D 한 식이 모든 사인 계열 곡선을 커버해요.
          이 단원은 변환 4종을 분리해서 이해하는 게 시험 핵심.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4가지 변환">
        <p>
          <strong>A (진폭)</strong>: 그래프의 위·아래 진동 폭. 최댓값 = D + |A|, 최솟값 = D − |A|.
          <strong>B (주기상수)</strong>: 주기 T = 2π / |B|. B가 클수록 빠르게 진동.
          <strong>C (위상이동)</strong>: 그래프를 좌우로 이동 (양수면 오른쪽).
          <strong>D (수직이동)</strong>: 그래프 자체를 위·아래로 이동 (중심선 = y = D).
          A, B, C, D를 분리해서 한 번에 하나씩만 변화시키는 습관이 핵심.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "주기는 2π/B인데, B가 음수면?" — 주기는 항상 양수, T = 2π/|B|.
          ❌ "B를 키우면 주기가 길어진다" — 반대예요. B 클수록 한 번에 더 많이 회전 → 짧은 주기.
          ❌ "y = sin(x − π)와 y = sin(x + π)는 같지 않다" — 사인은 주기 2π라서 같아요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          교류 전압 V(t) = V₀sin(2πft), 음파, 조수 간만 — 모두 A·B·C·D 4개 매개변수로 표현돼요.
          수능 「대수」 그래프 변환 문제는 매년 출제되는 빈출 영역.
          슬라이더 4개를 한 번에 하나만 움직이면서 어떤 매개변수가 어떤 변환을 일으키는지 분리해서 익히세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TrigGraphExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
