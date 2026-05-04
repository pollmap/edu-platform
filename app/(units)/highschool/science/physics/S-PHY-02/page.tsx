import { notFound } from 'next/navigation';
import { ForceVectorExplorer } from '@/components/interactive/science/ForceVectorExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-PHY-02';

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
          뉴턴이 정리한 세 법칙은 <strong>"힘 = 운동의 원인"</strong>이라는 한 문장으로 압축돼요.
          힘이 없으면 등속(관성), 힘을 주면 가속도(F = ma), 힘은 쌍으로 작용(작용-반작용).
          이 세 줄로 행성 궤도부터 자동차 충돌까지 정량 분석이 가능해져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — F = ma 와 자유물체도">
        <p>
          물체에 작용하는 모든 힘을 화살표로 그린 게 <strong>자유물체도(FBD)</strong>예요.
          중력(mg)·수직항력(N)·마찰력(f)·장력(T)을 하나하나 분리해서 더한 합력이 ma 와 같다.
          벡터 합성은 평행사변형 또는 성분 분해(x·y축)로 풀어요. 마찰력은 방향이 운동을 방해하므로 항상 운동 반대.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "힘은 운동의 방향과 같다" — 원운동에서 힘은 중심을 향하지만 운동은 접선 방향.
          ❌ "작용-반작용은 같은 물체에 작용한다" — 두 힘은 <strong>서로 다른 물체</strong>에 작용해요. 그래서 상쇄되지 않음.
          ❌ "정지한 물체는 힘이 없다" — 책상 위 책에는 중력↓ + 수직항력↑ 가 균형 잡힌 상태(합력 = 0).
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          안전벨트·에어백은 충돌 시 가속도(F = ma)를 줄여 부상을 막는 장치.
          경사면 미끄럼틀에서 가속도 = g·sinθ - μg·cosθ 같은 문제가 수능 단골이에요.
          로켓 추진은 작용-반작용. 발사대를 미는 게 아니라 분사된 가스가 로켓을 미는 반작용으로 떠올라요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ForceVectorExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
