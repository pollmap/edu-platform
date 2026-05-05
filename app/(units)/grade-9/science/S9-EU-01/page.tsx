import { notFound } from 'next/navigation';
import { StellarEvolutionExplorer } from '@/components/interactive/science/StellarEvolutionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S9-EU-01';

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
          별의 일생은 「<strong>질량</strong>」 하나로 거의 결정돼요. 무거운 별은 더 밝게 타지만 더 빨리 죽고,
          가벼운 별은 어둡게 오래 살아요.
        </p>
      </SectionCard>

      <SectionCard title="HR도 — 별의 지도">
        <p>
          헤르츠스프룽-러셀 도(HR도)는 별의 「표면 온도」를 가로축, 「광도」를 세로축에 그린 그림이에요. 대부분의 별은
          왼쪽 위(뜨겁고 밝음) → 오른쪽 아래(차갑고 어두움)로 이어지는 「<strong>주계열</strong>」 띠에 모여 있어요.
          태양도 주계열에 속해 있고, 약 100억 년의 수명을 가져요.
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><strong>주계열 단계</strong>: 수소를 헬륨으로 바꾸는 안정 단계 (생애의 90%)</li>
          <li><strong>적색거성</strong>: 수소가 다 떨어지면 외피가 팽창</li>
          <li><strong>최후</strong>: 가벼운 별 → 백색왜성 / 무거운 별 → 중성자별·블랙홀</li>
        </ul>
      </SectionCard>

      <SectionCard title="진화 시뮬레이터">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <StellarEvolutionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="왜 이렇게 차이날까?">
        <p>
          무거운 별은 중심부 압력이 매우 커서 핵융합이 격렬하게 일어나요. 「밝게 빛난다」는 건 「에너지를 빨리 쓴다」는 뜻이라
          연료가 금방 떨어지는 거예요. 우리 태양은 적당히 무거워서 100억 년 동안 안정적으로 살 수 있어요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
