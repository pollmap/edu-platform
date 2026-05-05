import { notFound } from 'next/navigation';
import { RectangularSolidExplorer } from '@/components/interactive/math/RectangularSolidExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-GM-03';

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
          평면도형이 길이·넓이라면, 입체도형은 <strong>부피</strong>가 더해져요. 6개의 직사각형으로 둘러싸인 상자가{' '}
          <strong>직육면체</strong>이고, 그 6개가 모두 같은 정사각형이면 <strong>정육면체</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="구성요소">
        <p>
          입체도형은 <strong>면(face)·모서리(edge)·꼭짓점(vertex)</strong>으로 이루어져요. 직육면체는 면 6, 모서리 12,
          꼭짓점 8개. 마주 보는 면 3쌍은 서로 평행하고 합동이에요.
        </p>
        <p>
          상자를 펼치면 <strong>전개도</strong>가 돼요. 전개도는 입체를 이해하는 가장 쉬운 방법이에요. 직육면체의
          전개도는 6개 직사각형이 십자(+) 모양으로 이어진 형태예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"가로·세로 같으면 정육면체"</strong> — 높이까지 같아야 정육면체예요. 셋 다 같지 않으면 직육면체.</li>
          <li><strong>"마주 보는 면은 다른 모양"</strong> — 직육면체에선 마주 보는 면 3쌍이 모두 합동이에요.</li>
          <li><strong>"전개도는 한 가지뿐"</strong> — 정육면체 전개도는 11가지나 돼요. 모서리를 어디에서 자르느냐에 따라 모양이 달라져요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 직육면체·정육면체">
        <p>
          교실의 우유팩, 책, 휴대폰, 택배 상자 — 거의 모든 포장 상자가 직육면체예요. 주사위, 큐브 퍼즐, 각설탕은
          정육면체의 대표적인 예. 제곱·세제곱이라는 단어도 정사각형·정육면체 모양에서 왔어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RectangularSolidExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
