import { notFound } from 'next/navigation';
import { CoordinatePlaneProportion } from '@/components/interactive/math/CoordinatePlaneProportion';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M7-CR-03';

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
          좌표평면은 <strong>x축과 y축이 십자로 만나는 무한한 도화지</strong>예요. 두 변수의 관계를 점으로
          찍으면 모양이 보여요. 정비례는 직선, 반비례는 쌍곡선이에요.
        </p>
      </SectionCard>

      <SectionCard title="왜 모양이 다를까?">
        <p>
          정비례 <strong>y = kx</strong>는 x가 늘어난 만큼 y도 같은 비율로 늘어나요. 그래서 점들을 잇는 선이
          반듯한 <strong>직선</strong>이고 항상 원점을 지나요. 반비례 <strong>y = k/x</strong>는 x가 커지면
          y가 작아지면서, 두 좌표축에 점점 가까워지지만 결코 닿지 않는 <strong>쌍곡선</strong>이 돼요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          반비례 그래프가 <strong>축에 닿는다</strong>고 생각하면 안 돼요. y = k/x에서 x = 0이면 정의되지
          않기 때문에 그래프는 축을 절대 만나지 않아요. 또 <strong>y가 x에 따라 변하지 않는 직선
          (y = c)</strong>은 정비례가 아니에요. 정비례는 반드시 원점을 지나야 해요.
        </p>
      </SectionCard>

      <SectionCard title="실생활">
        <p>
          시속 60 km로 달리면 거리 y와 시간 x는 <strong>y = 60x</strong>인 정비례. 같은 거리 60 km를 가는데
          속도 x와 시간 y의 관계는 <strong>y = 60/x</strong>인 반비례. 같은 60이 보이지만 곱셈이냐 나눗셈이냐에
          따라 그래프 모양이 완전히 달라요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CoordinatePlaneProportion />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
