import { notFound } from 'next/navigation';
import { TriangleClassifier } from '@/components/interactive/math/TriangleClassifier';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-GM-01';

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
          삼각형과 사각형은 단순해 보이지만 「변·각·합동·닮음」으로 끌어낼 수 있는 성질이 어마어마해요.
          한 가지 사실이 정해지면 다른 길이·각이 줄줄이 따라 정해지는 게 도형의 매력.
        </p>
      </SectionCard>

      <SectionCard title="삼각형 핵심 성질">
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>내각의 합 = 180°</strong>: 어떤 삼각형이든 세 각을 더하면 정확히 180°.</li>
          <li><strong>외각</strong>은 이웃하지 않는 두 내각의 합.</li>
          <li><strong>이등변삼각형</strong>: 두 변이 같으면 그 마주보는 두 각도 같아요. (역도 성립)</li>
          <li><strong>정삼각형</strong>: 세 변이 같으면 세 각이 모두 60°.</li>
          <li><strong>합동 조건</strong>: SSS(세 변), SAS(두 변과 끼인 각), ASA(한 변과 두 각).</li>
        </ul>
      </SectionCard>

      <SectionCard title="사각형 핵심 성질">
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>내각의 합 = 360°</strong>: 사각형의 네 각을 더하면 항상 360°.</li>
          <li><strong>평행사변형</strong>: 마주보는 변이 평행 → 마주보는 변·각이 같고 대각선이 서로를 이등분.</li>
          <li><strong>마름모</strong>: 네 변이 모두 같음. 대각선이 서로 수직 이등분.</li>
          <li><strong>직사각형</strong>: 네 각이 모두 직각. 대각선의 길이가 같음.</li>
          <li><strong>정사각형</strong>: 네 변·네 각이 모두 같음. 마름모이자 직사각형.</li>
        </ul>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li><strong>오개념 1.</strong> 「변 세 개 다 알면 삼각형 하나」 → 맞아요(SSS). 단 두 변의 합이 나머지 한 변보다 커야 삼각형이 만들어져요(삼각부등식).</li>
          <li><strong>오개념 2.</strong> 「마주보는 변이 같으면 평행사변형」 → 변만 같다고는 안 됨. 마주보는 변이 「평행」이라는 조건이 핵심.</li>
          <li><strong>오개념 3.</strong> 「정사각형은 직사각형이 아니다」 → 정사각형은 직사각형의 특수한 경우(네 변이 같은 직사각형). 마름모이기도 해요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 삼각형·사각형">
        <p>
          삼각형은 「가장 단단한 모양」이라 다리·트러스·자전거 프레임의 기본. 사각형은 가구·창문·픽셀(정사각형 격자)의 기본.
          GPS 측위, 측량, 항해도 결국 삼각형의 성질로 거리를 계산해요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TriangleClassifier />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
