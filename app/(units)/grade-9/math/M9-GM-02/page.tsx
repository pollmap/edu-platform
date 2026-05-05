import { notFound } from 'next/navigation';
import { CircleTheoremExplorer } from '@/components/interactive/math/CircleTheoremExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M9-GM-02';

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
          원에서 가장 핵심 정리는 두 가지예요. <strong>같은 호에 대한 원주각은 모두 같다</strong>(원주각 정리),
          그리고 <strong>접선은 접점에서 반지름과 수직</strong>이에요. 단순해 보여도 시험·실생활에서 강력하게 쓰여요.
        </p>
      </SectionCard>
      <SectionCard title="원주각 ↔ 중심각">
        <p>
          한 호 AB 위의 두 점 사이를 보는 각 중에서, <strong>중심 O에서 본 각이 중심각</strong>, 원주 위 점 P에서 본 각이{' '}
          <strong>원주각</strong>이에요.
        </p>
        <p>
          정리: <strong>원주각 = ½ × 중심각</strong>. 그래서 같은 호 위 어느 점에서 봐도 원주각은 항상 같아요. 이걸
          움직여 보면 진짜 신기해요.
        </p>
      </SectionCard>
      <SectionCard title="탈레스 정리와 접선 정리">
        <p>
          <strong>탈레스 정리</strong>: 지름이 빗변인 직각삼각형은 항상 원에 내접해요. 반대로, 지름을 한 변으로 하는
          원주각은 항상 90°. 직각인 삼각형 → 외접원의 중심은 빗변의 중점.
        </p>
        <p>
          <strong>접선 정리</strong>: 원에 그은 접선은 접점에서 반지름과 90°를 이뤄요. 이걸 이용해 외접원·내접원의 작도가 가능해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"원주각은 점마다 달라진다"</strong> — 같은 호에서 본 원주각은 모두 같아요. 점 P가 호 위에서 어디로 움직여도 ∠APB는 일정.</li>
          <li><strong>"중심각이 원주각보다 작다"</strong> — 반대예요. 중심각 = 2 × 원주각. 중심각이 더 커요.</li>
          <li><strong>"접선은 원과 두 점에서 만난다"</strong> — 접선은 정확히 한 점에서 만나요. 두 점에서 만나는 직선은 할선(secant).</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 원의 성질">
        <p>
          자동차 바퀴 자국이 직선인 이유(접선과 노면), 카메라 화각의 분포, 위성궤도 설계, 드릴·기어의 톱니 형태 모두
          원의 성질에서 나와요. 원형 무대를 어떤 자리에서 보든 정면 시야가 동일해 보이는 이유도 원주각이 일정하기 때문.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CircleTheoremExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
