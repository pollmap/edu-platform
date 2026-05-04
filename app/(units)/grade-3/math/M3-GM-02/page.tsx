import { notFound } from 'next/navigation';
import { ClockExplorer } from '@/components/interactive/math/ClockExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M3-GM-02';

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
          길이는 <strong>&ldquo;얼마나 긴가&rdquo;</strong>를, 시간은 <strong>&ldquo;얼마나 흘렀나&rdquo;</strong>를 재요. 둘 다 <strong>같은 단위로 모아 세는 묶음</strong>으로 잴 수 있어요.
          길이는 mm·cm·m, 시간은 초·분·시 같은 묶음을 써요.
        </p>
      </SectionCard>
      <SectionCard title="왜 단위를 여러 개 쓸까">
        <p>
          연필 길이를 m로 재면 &ldquo;0.18m&rdquo;라 어색해요. 짧은 건 mm·cm로, 긴 건 m로 재면 숫자가 깔끔해져요.
          시간도 마찬가지예요. 초로만 표현하면 학교 가는 시간이 &ldquo;1800초&rdquo;라 헷갈리지만, &ldquo;30분&rdquo;이라고 하면 한눈에 들어와요.
          그래서 우리는 <strong>크기에 알맞은 단위</strong>를 골라 써요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>cm와 mm 자릿수</strong>가 헷갈려요. 1cm = 10mm, 1m = 100cm.</li>
          <li><strong>아날로그 시계</strong>의 짧은 바늘(시)과 긴 바늘(분)을 반대로 읽기 쉬워요. 짧은 바늘이 시!</li>
          <li>&ldquo;1시간 30분&rdquo;을 60+30 = 90분으로 바꿀 줄 모르면 시간 계산을 못 해요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 길이·시간">
        <p>
          체육 시간 50m 달리기는 m로, 머리카락 굵기는 mm로, 학교 등굣길은 m나 km로 재요.
          알람 시계, 영상 길이, 버스 도착 시간, 게임 쿨타임 모두 시·분·초의 묶음 변환이에요.
        </p>
      </SectionCard>
      <SectionCard title="시계와 길이 직접 만져 보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ClockExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
