import { notFound } from 'next/navigation';
import { RotationSolidExplorer } from '@/components/interactive/math/RotationSolidExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M6-GM-05';

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
          평면도형을 한 직선(축)을 중심으로 회전시키면 입체가 돼요. 직사각형을 돌리면 <strong>원기둥</strong>,
          직각삼각형을 돌리면 <strong>원뿔</strong>, 반원을 돌리면 <strong>구</strong>예요.
        </p>
      </SectionCard>
      <SectionCard title="부피·겉넓이 공식">
        <p>
          <strong>원기둥</strong>: V = πr²h, S = 2πr(r+h). 위·아래 원 두 개와 옆면 직사각형(가로 = 원둘레)이 합쳐진 모양.
        </p>
        <p>
          <strong>원뿔</strong>: V = ⅓πr²h, S = πr(r+ℓ). 같은 밑면·높이일 때 부피가 원기둥의 ⅓밖에 안 돼요. ℓ은 모선(꼭짓점에서 밑면 가장자리까지).
        </p>
        <p>
          <strong>구</strong>: V = ⁴⁄₃πr³, S = 4πr². 어느 방향에서 봐도 똑같이 보이는 가장 대칭적인 입체예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"원뿔 부피 = 원기둥 부피"</strong> — 같은 밑면·높이에서 원뿔은 원기둥의 ⅓이에요. 물을 부어 보면 정확히 3번에 가득 차요.</li>
          <li><strong>"구의 겉넓이 = 4πr³"</strong> — 부피가 ⁴⁄₃πr³이고 겉넓이는 4πr²예요. 차원 단위(²/³)로 구분.</li>
          <li><strong>"원기둥 옆면은 곡면이라 펼칠 수 없다"</strong> — 펼치면 가로 = 2πr인 직사각형이에요. 캔 라벨이 직사각형인 이유.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 회전체">
        <p>
          음료수 캔(원기둥), 고깔모자·아이스크림콘(원뿔), 농구공·지구(구) — 일상 곳곳이 회전체예요. 도공이 물레로
          그릇을 빚는 과정도 평면 곡선이 회전축을 따라 입체가 되는 모습이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RotationSolidExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
