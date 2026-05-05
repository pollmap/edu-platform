import { notFound } from 'next/navigation';
import { MixtureSeparationExplorer } from '@/components/interactive/science/MixtureSeparationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S7-MA-03';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  if (!unit) return {};
  return makeUnitMetadata(unit);
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />

      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          혼합물 분리는 「두 물질이 다른 점」을 활용해요. 끓는점이 다르면 증류, 입자 크기가 다르면 거름,
          밀도가 다르면 분별깔때기, 색소를 가르려면 크로마토그래피.
        </p>
      </SectionCard>

      <SectionCard title="혼합물 vs 화합물">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>혼합물</strong>: 성분비가 일정하지 않음, 물리적 방법으로 분리 가능 (소금물·공기·우유)</li>
          <li><strong>화합물</strong>: 성분비 일정, 화학반응으로만 분리 (물 = H₂O, 항상 H:O=1:8)</li>
        </ul>
      </SectionCard>

      <SectionCard title="혼합물 → 분리법 매칭">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MixtureSeparationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="실생활 분리 기술">
        <p>
          정수기 = 거름 + 활성탄 흡착, 술 빚기 = 증류, 천일염 = 증발 + 재결정, 도핑 검사 = 크로마토그래피.
          한 가지 분리법으로 부족하면 「여러 단계」를 조합해요. 산업 분리탑은 한 번에 수십 종 화학물질을 갈라내요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
