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

const UNIT_ID = 'M4-GM-03';

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
          삼각형은 변 3개 · 각 3개로 된 가장 단순한 다각형이에요. 세 각의 합은 <strong>항상 180°</strong>로 정해져 있어요.
          삼각형은 <strong>각</strong>으로 보면 예각·직각·둔각, <strong>변</strong>으로 보면 정삼각·이등변·부등변삼각형으로 나뉘어요.
        </p>
      </SectionCard>
      <SectionCard title="왜 두 가지 기준으로 나눌까">
        <p>
          삼각형은 모양이 정말 다양해서 한 가지 기준만으론 다 설명할 수 없어요. 그래서 <strong>각의 크기 기준</strong>과 <strong>변의 길이 기준</strong>으로 따로 분류해요.
          예를 들어 &ldquo;정삼각형&rdquo;은 변 기준 이름이고, 같은 삼각형을 각 기준으로 보면 &ldquo;예각삼각형&rdquo;이에요. 두 이름이 동시에 쓰일 수 있어요!
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>세 각의 합이 180°를 넘는 삼각형은 그릴 수 없어요. 평면에선 절대로요.</li>
          <li>이등변삼각형은 <strong>두 변만</strong> 같으면 되고, 정삼각형은 <strong>세 변 모두</strong> 같아야 해요. 정삼각형은 이등변삼각형의 특별한 경우예요.</li>
          <li>&ldquo;직각이등변삼각형&rdquo;처럼 두 분류 이름이 합쳐진 삼각형도 있어요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 삼각형">
        <p>
          삼각형은 <strong>가장 안정한 도형</strong>이라 다리·교량·자전거 프레임·텐트·집 지붕에 많이 써요.
          힘이 한쪽으로 쏠려도 모양이 잘 안 바뀌거든요. 도로 표지판(양보·경고)과 음악의 트라이앵글 악기도 모두 삼각형이에요.
        </p>
      </SectionCard>
      <SectionCard title="각도를 바꿔 분류해 보기">
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
