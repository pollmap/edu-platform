import { notFound } from 'next/navigation';
import { EarthShapeExplorer } from '@/components/interactive/science/EarthShapeExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S3-EU-01';

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
          지구는 둥근 공처럼 생긴 행성이에요. 표면은 <strong>땅(약 29%)과 바다(약 71%)</strong>로 이루어져 있고, 그 위를 <strong>공기</strong>가 둘러싸고 있어요.
          그래서 우주에서 보면 파란 행성처럼 보여요.
        </p>
      </SectionCard>
      <SectionCard title="왜 우리는 지구가 둥근 줄 알까">
        <p>
          옛날 사람들은 지구가 평평하다고 생각했어요. 하지만 멀어지는 배는 아랫부분부터 사라지고, 월식 때 달에 비친 지구 그림자가 둥글어요.
          오늘날에는 우주에서 찍은 사진으로 지구가 둥근 모양인 것을 누구나 볼 수 있어요. 그리고 지구는 가만히 있는 것이 아니라 <strong>스스로 돌면서</strong> 태양 주위를 돌아요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>지구가 정확히 동그란 공은 아니에요. 적도 부분이 살짝 부풀어 있어 <strong>약간 찌그러진 공 모양</strong>이에요.</li>
          <li>바다 물의 97%는 짠 바닷물이에요. 우리가 마실 수 있는 민물은 3%뿐, 그중 대부분이 빙하예요.</li>
          <li>공기에서 우리가 숨 쉬는 산소는 21%뿐. 78%는 질소예요. 산소만 있다고 잘못 알기 쉬워요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 지구 모습">
        <p>
          비행기를 오래 타고 멀리 가면 시간이 달라져요(시차). 이것도 지구가 둥글고 돌기 때문이에요.
          GPS, 인공위성, 일기예보, 위성 사진 모두 지구가 둥근 행성이라는 사실을 이용해 작동해요.
          지도와 지구본이 모양이 다르게 그려지는 것도, 둥근 지구를 평평한 종이에 표현하느라 그래요.
        </p>
      </SectionCard>
      <SectionCard title="지구 살펴보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EarthShapeExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
