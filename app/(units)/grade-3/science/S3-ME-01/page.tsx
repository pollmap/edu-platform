import { notFound } from 'next/navigation';
import { MagnetExplorer } from '@/components/interactive/science/MagnetExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S3-ME-01';

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
          자석은 <strong>N극과 S극</strong>이라는 두 극을 가진 돌(또는 쇠)이에요.
          다른 극끼리는 끌어당기고, 같은 극끼리는 밀어내요. 그리고 <strong>철</strong>로 된 물건만 자석에 붙어요.
        </p>
      </SectionCard>
      <SectionCard title="왜 자석에 붙는 물건은 정해져 있을까">
        <p>
          모든 물질은 아주 작은 알갱이(원자)로 되어 있는데, 그중에 철·니켈·코발트 같은 몇 가지 금속만이
          이 알갱이의 방향을 한쪽으로 줄 세울 수 있어요. 한 방향으로 줄 선 알갱이가 모이면 자석의 힘이 생겨요.
          그래서 같은 금속이라도 알루미늄·구리·금에는 자석이 안 붙어요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>모든 금속이 자석에 붙는다고 오해하기 쉬워요. 사실은 <strong>철 종류만</strong>!</li>
          <li>N극과 S극을 잘라 따로 떼어 놓을 수는 없어요. 자석을 잘라도 양쪽 끝에 새로 N·S가 생겨요.</li>
          <li>지구도 거대한 자석이에요. 그래서 나침반 바늘이 항상 북쪽을 가리켜요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 자석">
        <p>
          냉장고 자석, 자석 필통, 가방 잠금장치, 이어폰 안 작은 자석, 신용카드 뒷면 검은 띠, 스피커, 모터, MRI 의료 기계까지
          자석은 어디에나 있어요. 길 찾을 때 쓰는 나침반도 작은 자석이 지구 자기를 따라 도는 원리예요.
        </p>
      </SectionCard>
      <SectionCard title="자석 실험해 보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MagnetExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
