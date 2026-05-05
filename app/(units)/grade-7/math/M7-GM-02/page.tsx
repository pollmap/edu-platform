import { notFound } from 'next/navigation';
import { CompassConstructionExplorer } from '@/components/interactive/math/CompassConstructionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M7-GM-02';

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
          <strong>작도(construction)</strong>는 눈금 없는 자와 컴퍼스만 사용해 정확한 도형을 그리는 기법이에요. 길이를
          재거나 각도를 측정하지 않아도, 두 도구의 성질만으로 합동인 도형을 만들 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="기본 작도 3가지">
        <p>
          <strong>1. 같은 길이의 선분</strong>: 컴퍼스로 원본 길이를 잰 뒤 새 위치에 호를 그리면 끝.
        </p>
        <p>
          <strong>2. 같은 크기의 각</strong>: 점 O에서 호로 두 변과의 교점을 표시한 다음, 같은 반지름의 호를 새 위치에서 그려 교점을 잇기.
        </p>
        <p>
          <strong>3. 수직이등분선</strong>: 양 끝점에서 같은 반지름(&gt;선분 길이/2)으로 호를 그리면 두 교점이 생겨요. 그 두 점을 잇는 직선이 수직이등분선.
        </p>
      </SectionCard>
      <SectionCard title="합동 조건과 작도">
        <p>
          작도가 가능한 이유는 합동 조건 때문이에요. 두 삼각형이 합동이 되려면 SSS(세 변), SAS(두 변과 끼인각),
          ASA(두 각과 끼인 변) 셋 중 하나만 같으면 충분해요.
        </p>
        <p>
          작도는 이 조건을 정확히 재현하는 도구예요. 같은 길이를 옮기고 같은 각을 옮기면, 결과는 항상 합동.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"자에는 눈금이 있어도 된다"</strong> — 작도용 자는 눈금 없는 직선자예요. 눈금을 쓰면 작도가 아닌 측정이 돼요.</li>
          <li><strong>"각의 삼등분도 가능"</strong> — 임의의 각을 자와 컴퍼스만으로 정확히 3등분하는 건 불가능해요(고대 그리스 3대 난제).</li>
          <li><strong>"세 각이 같으면 합동"</strong> — AAA는 합동 조건이 아니에요. 닮음(similarity)은 되지만 크기는 다를 수 있어요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 작도">
        <p>
          GPS 측위는 세 위성으로부터의 거리(원 호)가 만나는 점을 찾아 위치를 정해요. 건축에서 정확한 직각·평행을 잡는
          기법, 종이 접기로 정삼각형을 만드는 방법도 모두 작도의 응용이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CompassConstructionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
