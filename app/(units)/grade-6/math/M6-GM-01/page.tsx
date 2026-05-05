import { notFound } from 'next/navigation';
import { PrismPyramidExplorer } from '@/components/interactive/math/PrismPyramidExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M6-GM-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

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
          밑면이 두 개이고 옆면이 직사각형이면 <strong>각기둥</strong>, 밑면이 하나이고 옆면이 삼각형으로 한 점에 모이면{' '}
          <strong>각뿔</strong>이에요. 밑면이 n각형이면 'n각기둥' 또는 'n각뿔'이라 불러요.
        </p>
      </SectionCard>
      <SectionCard title="면·모서리·꼭짓점 규칙">
        <p>
          n각기둥: 면 n+2, 모서리 3n, 꼭짓점 2n. 예) 삼각기둥은 면 5, 모서리 9, 꼭짓점 6.
        </p>
        <p>
          n각뿔: 면 n+1, 모서리 2n, 꼭짓점 n+1. 예) 사각뿔은 면 5, 모서리 8, 꼭짓점 5.
        </p>
        <p>
          모든 다면체는 <strong>오일러 공식 V − E + F = 2</strong>를 만족해요. 면·모서리·꼭짓점을 세서 검산할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"각기둥의 밑면은 항상 사각형"</strong> — 삼각기둥·오각기둥처럼 밑면 모양은 자유.</li>
          <li><strong>"각뿔의 옆면은 직사각형"</strong> — 각뿔은 옆면이 모두 삼각형이에요. 직사각형 옆면은 각기둥.</li>
          <li><strong>"원기둥은 각기둥"</strong> — 각기둥은 밑면이 다각형. 원기둥은 별도 분류예요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 각기둥·각뿔">
        <p>
          연필을 깎기 전 모양은 육각기둥(또는 원기둥), 텐트는 삼각기둥, 이집트 피라미드는 사각뿔이에요. 캔디·향수병의
          베이스도 다양한 각기둥 모양이고, 일부 결정 구조(석영 등)도 자연이 만든 각기둥이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PrismPyramidExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
