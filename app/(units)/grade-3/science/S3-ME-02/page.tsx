import { notFound } from 'next/navigation';
import { SoundWaveExplorer } from '@/components/interactive/science/SoundWaveExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S3-ME-02';

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
          소리는 <strong>물체가 떨릴 때 생기는 진동</strong>이에요. 그 진동이 공기를 타고 우리 귀까지 와서 들려요.
          떨리는 빠르기에 따라 <strong>높낮이</strong>가, 떨리는 크기에 따라 <strong>소리 크기</strong>가 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="소리는 어떻게 전해질까">
        <p>
          북을 치면 가죽이 떨려요. 그 떨림이 옆 공기를 밀고 당기면서 파도처럼 퍼져나가요. 우리 귀 안의 작은 막(고막)이
          그 공기 떨림을 받아 다시 떨리면, 뇌가 소리로 알아채요. 그래서 공기가 없는 우주에서는 소리가 전해지지 않아요.
          소리는 공기뿐 아니라 <strong>물·나무·금속</strong> 같은 물질을 통해서도 전달돼요. 오히려 고체일수록 소리가 더 빨라요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>큰 소리 = 높은 소리가 아니에요. <strong>크기와 높낮이는 다른 성질</strong>이에요.</li>
          <li>소리는 빛보다 훨씬 느려요. 그래서 천둥이 번개보다 늦게 들려요.</li>
          <li>아주 높은 소리는 사람 귀로 못 들어요. 박쥐·돌고래는 우리가 못 듣는 초음파로 길을 찾아요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 소리">
        <p>
          악기는 떨림 방법을 다양하게 만든 도구예요. 기타 줄·피아노 줄은 줄이 떨리고, 플루트는 공기 기둥이, 북은 가죽이 떨려요.
          줄이 짧고 팽팽할수록 빨리 떨려서 높은 소리가 나요. 휴대폰 진동, 스피커, 마이크, 청진기, 초음파 검사 모두 소리의
          진동 원리를 이용해요.
        </p>
      </SectionCard>
      <SectionCard title="소리 만들어 보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SoundWaveExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
