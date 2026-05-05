import { notFound } from 'next/navigation';
import { ConicTangentExplorer } from '@/components/interactive/math/highschool/ConicTangentExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-GE-02';

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
          이차곡선의 접선 공식은 <strong>「접점 좌표만 알면 끝」</strong>이에요.
          미분을 거치지 않고 곡선의 방정식에 접점 (x₁, y₁)을 절반씩 분배하면 곧장 접선식이 나오는 깔끔한 패턴.
          음함수 미분과 비교해 보면 왜 이렇게 단순해지는지 직관이 잡혀요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 접선 공식 4종">
        <p>
          <strong>원 x² + y² = r²</strong>: 접선 <strong>x₁x + y₁y = r²</strong>. 「양쪽 변수에서 한 자리씩 점」.
          <strong>타원 x²/a² + y²/b² = 1</strong>: 접선 <strong>x₁x/a² + y₁y/b² = 1</strong>.
          <strong>포물선 y² = 4px</strong>: 접선 <strong>y₁y = 2p(x + x₁)</strong>.
          <strong>쌍곡선 x²/a² − y²/b² = 1</strong>: 접선 <strong>x₁x/a² − y₁y/b² = 1</strong>.
          공통 원리: 곱의 형태 → 한쪽을 점 좌표로 치환.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「접선은 곡선과 한 점에서만 만난다」 — 직선이라면 그렇지만, 일반적으로 다른 점에서 또 만날 수 있어요. 「국소적」 한 점 접촉이 핵심.
          ❌ 「접선의 기울기를 구해서 점을 지나는 직선식으로 쓴다」 — 가능하지만 위 공식이 훨씬 빨라요.
          ❌ 「접점이 곡선 위에 있는지 확인 안 해도 된다」 — 접선 공식은 점 (x₁, y₁)이 곡선 위에 있을 때만 성립.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          위성 궤도(타원), 자동차 헤드라이트(포물선 반사), 스피커 진동판(쌍곡선) — 이차곡선 접선은 광학·역학 설계의 기본.
          접점 각도를 슬라이더로 움직이면 빨간 접선이 매끄럽게 회전. 원·타원 두 케이스에서 공식이 어떻게 변하는지 비교해 보세요.
          수능 「기하」에서 접선 공식 직접 적용 + 두 접선이 수직일 조건 등이 빈출.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ConicTangentExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
