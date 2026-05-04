import { notFound } from 'next/navigation';
import { PlotDiagramExplorer } from '@/components/interactive/korean/PlotDiagramExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-LT-02';

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
          { label: `학년 공통 / ${SUBJECT_LABEL[unit.subject]}`, href: `/common/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          소설은 보통 <strong>발단 → 전개 → 위기 → 절정 → 결말</strong> 5단 구조로 흘러요.
          이 곡선을 알면 어디서 긴장이 차오르고, 어디서 풀리는지 한눈에 보여요.
        </p>
      </SectionCard>
      <SectionCard title="갈등이 모든 이야기의 엔진">
        <p>
          소설을 끌고 가는 힘은 <strong>갈등</strong>이에요. 인물 vs 인물, 인물 vs 자연, 인물 vs 자기 자신 — 갈등이 없으면 이야기가 없어요.
          5단 구성은 갈등이 어떻게 만들어지고, 어떻게 풀리는지 보여주는 지도예요.
          영화·드라마·만화도 같은 곡선을 따르는 경우가 많아요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PlotDiagramExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
