import { notFound } from 'next/navigation';
import { CircleAreaExplorer } from '@/components/interactive/math/CircleAreaExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M6-GM-04';

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
          원의 넓이는 <strong>πr²</strong>이에요. 무작정 외울 수도 있지만, 원을 잘게 부채꼴로 잘라 직사각형으로
          재배치하면 자연스럽게 유도돼요.
        </p>
      </SectionCard>
      <SectionCard title="공식 유도 과정">
        <p>
          원을 짝수 개로 잘라 부채꼴들을 위·아래로 번갈아 끼워 맞추면 점점 직사각형에 가까워져요. 잘린 조각이
          많아질수록 더 정확한 직사각형이 돼요.
        </p>
        <p>
          이 직사각형의 가로는 원둘레의 절반(<strong>πr</strong>), 세로는 반지름(<strong>r</strong>)이에요.
          따라서 넓이는 πr × r = <strong>πr²</strong>이 됩니다.
        </p>
        <p>
          원주율 π는 원둘레/지름 = 약 3.14159...이에요. 어떤 크기의 원이든 둘레와 지름의 비는 일정한 상수예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"원주(둘레) = πr²"</strong> — 원주는 2πr예요. πr²는 넓이.</li>
          <li><strong>"반지름이 2배 → 넓이 2배"</strong> — 넓이는 r²에 비례하므로 r 2배 → 넓이 4배.</li>
          <li><strong>"π는 정확히 3.14"</strong> — 3.14는 근삿값일 뿐, π는 끝없는 무리수예요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 원의 넓이">
        <p>
          피자 한 판의 면적, CD·LP의 라벨 영역, 스프링클러가 물을 뿌리는 범위 — 모두 πr² 계산이에요. 같은 가격이면
          큰 피자가 더 이득인 이유도 r 2배에 면적이 4배라서.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CircleAreaExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
