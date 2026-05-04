import { notFound } from 'next/navigation';
import { LensOpticsExplorer } from '@/components/interactive/science/LensOpticsExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S6-ME-01';

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
          빛은 다른 물질을 만나면 꺾여요(<strong>굴절</strong>). 렌즈는 이 성질을 이용해 빛을 모으거나 퍼뜨려요.
          <strong>볼록렌즈</strong>는 가운데가 두꺼워 빛을 한 점(초점)에 모으고, <strong>오목렌즈</strong>는 가운데가 얇아 빛을 퍼뜨려요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 원리 — 굴절과 초점">
        <p>
          빛이 공기에서 유리(렌즈)로 들어갈 때 속도가 바뀌면서 진행 방향이 꺾여요. 렌즈는 가운데와 가장자리 두께가 달라서 위치마다 꺾이는 정도가 달라요.
          그래서 평행하게 들어온 빛이 한 점에 모이거나 한 점에서 나오는 것처럼 퍼져요. 그 점을 <strong>초점</strong>이라고 하고, 렌즈와 초점 사이 거리가 <strong>초점거리(f)</strong>예요.
          물체의 위치에 따라 상이 정립인지 도립인지, 실상인지 허상인지가 달라져요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1">
          <li>&quot;돋보기는 항상 크게 보여준다&quot; → 물체가 초점 안쪽일 때만 확대된 정립 허상이 보여요. 초점 밖이면 거꾸로 된 도립 실상이 생겨요.</li>
          <li>&quot;실상은 진짜고 허상은 가짜&quot; → 둘 다 우리 눈에는 보이지만, 실상은 스크린에 비치는 빛이 실제로 모인 것이고, 허상은 빛의 연장선이 만나는 가상의 점이에요.</li>
          <li>&quot;렌즈가 두꺼울수록 초점이 멀다&quot; → 반대예요. 두꺼울수록 빛을 더 많이 꺾어 초점이 가까워져요.</li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 렌즈">
        <ul className="list-disc list-inside space-y-1">
          <li>카메라·휴대폰 카메라: 볼록렌즈로 빛을 모아 센서에 도립 실상을 만들어요.</li>
          <li>돋보기·망원경 대물렌즈·현미경: 모두 볼록렌즈를 써요.</li>
          <li>근시 안경: 오목렌즈로 빛을 퍼뜨려 망막 앞에 맺히던 상을 망막 위로 옮겨요.</li>
          <li>우리 눈의 수정체는 볼록렌즈 — 멀리/가까이를 볼 때 모양이 바뀌어 초점거리를 조절해요.</li>
        </ul>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <LensOpticsExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
