import { notFound } from 'next/navigation';
import { ShadowMirrorExplorer } from '@/components/interactive/science/ShadowMirrorExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S4-ME-02';

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
          빛은 <strong>곧게 나아가는 성질</strong>이 있어요. 그래서 빛 앞을 무엇이 막으면 그 뒤편에 어두운 부분(<strong>그림자</strong>)이
          생기고, 거울처럼 매끄러운 면을 만나면 튀어나가요(<strong>반사</strong>).
        </p>
      </SectionCard>
      <SectionCard title="그림자와 거울의 원리">
        <p>
          빛은 빛을 막는 물체를 통과하지 못해요. 그래서 물체 뒤편 바닥에 빛이 닿지 않는 영역이 생기고, 그게 그림자예요.
          그림자 모양은 물체 모양과 닮고, 빛의 위치에 따라 길이와 방향이 달라져요. 한편 거울은 매끄럽고 반짝이는 면이라
          빛이 들어온 각도와 똑같은 각도로 튀어나가요. 이것이 <strong>반사 법칙</strong>이에요. 그래서 우리가 거울을 보면
          내 모습을 똑바로 볼 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>그림자 색은 <strong>검정이 아니에요</strong>. 다른 빛이 어두운 부분에 비치면 그림자가 회색·푸른색으로 보여요.</li>
          <li>거울에서 보이는 모습은 <strong>좌우가 바뀐 모양</strong>이에요. 글자를 거울에 비추면 거꾸로 보여요.</li>
          <li>모든 면이 거울처럼 반사하는 건 아니에요. 매끄러우면 한 방향(거울), 거칠면 사방으로 흩어져요(난반사).</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 빛 사용">
        <p>
          그림자는 해시계의 원리예요. 시간에 따라 해 위치가 달라져 그림자 길이·방향이 변하니까요. 거울은 욕실·자동차 사이드미러·
          잠망경·만화경에 쓰여요. 잠망경은 거울 두 개를 비스듬히 배치해 위쪽 풍경을 아래쪽 눈으로 보여주는 도구예요.
          멀리 있는 신호를 거울로 햇빛에 반사해 보내는 통신도 옛날에 있었어요.
        </p>
      </SectionCard>
      <SectionCard title="빛 따라가 보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ShadowMirrorExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
