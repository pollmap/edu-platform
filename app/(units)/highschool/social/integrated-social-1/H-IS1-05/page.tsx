import { notFound } from 'next/navigation';
import { HumanRightsCaseExplorer } from '@/components/interactive/social/HumanRightsCaseExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-IS1-05';

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
          인권은 <strong>인간이라는 사실만으로 가지는 권리</strong>이고, 헌법은 그 권리를 국가에게 약속받은 문서예요.
          인권 보장은 추상이 아니라 구체 사례 안에서 침해와 회복이 반복되며 다듬어져요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 권리의 4종 구분">
        <p>
          헌법상 기본권은 보통 <strong>자유권 / 평등권 / 사회권 / 참정권·청구권</strong>으로 묶여요.
          시대가 변하면서 정보 인권·환경권 같은 새로운 권리도 추가되고, 권리 사이 충돌(예: 표현의 자유 vs 명예 보호)이
          생기면 비례 원칙으로 조정해요. 사례 분석이 가장 빠른 학습.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "헌법은 정치인만의 영역" — 일상의 차별·프라이버시·노동 환경이 헌법 문제로 직결돼요.
          ❌ "권리는 무제한" — 다른 사람의 권리·공익과 충돌하면 비례 원칙으로 제한 가능.
          ❌ "인권 침해는 옛날 일" — 디지털 감시·차별·노동 등 새 형태의 침해가 계속 등장.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학교·아르바이트·온라인 활동에서 마주치는 문제를 인권 사례로 분석해 보면 헌법이 가까워져요.
          내신·수행평가는 사례 → 권리 종류 매칭, 권리 충돌 시 조정 원칙이 자주 출제. 아래 사례 탐색기로 시작해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HumanRightsCaseExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
