import { notFound } from 'next/navigation';
import { AngleProtractor } from '@/components/interactive/math/AngleProtractor';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M7-GM-01';

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
          중1 도형의 출발점은 <strong>점·선·면·각</strong>이에요.
          이 네 가지로 모든 평면도형과 입체도형이 정의돼요.
          특히 <strong>각</strong>은 두 변(반직선)이 만드는 벌어진 정도이고, 0°부터 360°로 표시해요.
        </p>
      </SectionCard>
      <SectionCard title="점·선·면·각이 왜 기본일까">
        <p>
          점은 <strong>위치만 있고 크기가 없는</strong> 개념이에요. 점이 모이면 선, 선이 모이면 면, 면이 모이면 입체가 돼요.
          이 4단계 위계가 모든 도형 정의의 골격이에요.
        </p>
        <p>
          각은 두 반직선의 사이를 재는 양으로,{' '}
          <strong>예각(0~90°), 직각(90°), 둔각(90~180°), 평각(180°), 반사각(180~360°)</strong>으로 분류해요.
          이 분류는 삼각형·사각형 성질, 원주각, 닮음·합동 모든 곳에서 다시 등장해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>"각이 크면 변도 길어야 한다"</strong> — 아니에요. 각의 크기는 변의 길이와 무관해요. 같은 60°라도 변이 1cm일 수도 100cm일 수도 있어요.
          </li>
          <li>
            <strong>"180°를 넘는 각은 잘못된 각"</strong> — 아니에요. 180~360°는 <strong>반사각(우각)</strong>으로 정식 분류돼요.
          </li>
          <li>
            <strong>"평행선은 만난다"</strong> — 같은 평면에서 평행선은 영원히 만나지 않아요. 단, 입체나 비유클리드 기하에선 다른 이야기가 됩니다.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 각도">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          시계의 시침과 분침 — 12시 0분일 때 0°, 3시일 때 90°, 6시일 때 180°.
          책의 모서리는 직각, 피자 한 조각은 둔각·예각, 자전거 핸들을 끝까지 돌리면 반사각이 되기도 해요.
          축구 슛 각도, 카메라 화각, 건축 지붕 경사 — 모두 각의 분류로 설명할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AngleProtractor />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
