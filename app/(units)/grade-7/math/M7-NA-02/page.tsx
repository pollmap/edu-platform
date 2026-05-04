import { notFound } from 'next/navigation';
import { IntegerNumberLine } from '@/components/interactive/math/IntegerNumberLine';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M7-NA-02';

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
          0보다 작은 수가 <strong>음수</strong>예요. 음수와 양수, 그리고 0을 모두 합친 것이 <strong>정수</strong>입니다. 정수를 분수로 표현할 수 있는 것까지 합치면 <strong>유리수</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="왜 음수가 필요한가">
        <p>
          기온, 빚, 해수면 아래 깊이처럼 <strong>0보다 작은 양</strong>을 다뤄야 할 때가 있어요. 자연수만으로는 “영하 5도”나 “1만 원 빚”을 표현할 수 없으니, 음수가 필요해요.
        </p>
        <p>
          수직선에서 음수는 <strong>왼쪽 방향</strong>을 의미해요. 더하기/빼기는 수직선 위 이동으로 그릴 수 있습니다.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <IntegerNumberLine />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
