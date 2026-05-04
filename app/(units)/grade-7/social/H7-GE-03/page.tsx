import { notFound } from 'next/navigation';
import { KoreaRegionExplorer } from '@/components/interactive/social/KoreaRegionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H7-GE-03';

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
          지형은 땅의 모양이에요. 산·평야·강·해안·고원·분지 등 — 각 지형은 사람들의 농업·교통·산업·도시 발달에 큰 영향을 줘요.
        </p>
      </SectionCard>
      <SectionCard title="한국의 주요 지형">
        <p>
          한국은 동쪽이 높고 서쪽이 낮은 <strong>동고서저</strong> 지형. 백두대간 산줄기가 동해안 따라 이어지고, 큰 강들은 대부분 서·남쪽으로 흘러요.
          동쪽은 좁은 해안과 동해, 서쪽은 넓은 평야와 서해(갯벌·간척지), 남쪽은 다도해와 제주.
          70% 이상이 산지라 평야가 귀해요. 한강·낙동강·금강·영산강 같은 큰 강 주변 평야가 인구·도시 집중지였어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "산은 그냥 가만히 있어" — 지진·풍화·침식으로 매년 조금씩 변해요. 백두산은 화산이라 다시 분출 가능성도 있어요.
          ❌ "강은 항상 같은 자리" — 큰 홍수 후 강줄기가 바뀌기도 해요. 한강도 시간에 따라 자리를 옮겼어요.
          ❌ "평야가 무조건 좋다" — 평야는 농사에 좋지만 홍수 위험도 커요. 산지·고원도 목축·관광 자원이 풍부해요.
        </p>
      </SectionCard>
      <SectionCard title="지형이 만든 우리 도시">
        <p>
          서울이 한반도 중앙 + 한강 + 평야의 만남이라 수도가 됐어요. 부산은 큰 항구와 분지(요새형 지형)로 항만·물류 중심.
          제주의 한라산·오름·해안절벽은 화산 활동의 흔적이고, 강원도 산악은 스키·관광 중심이 됐어요.
          내가 사는 지역의 지형이 그곳의 산업·문화에 어떻게 영향을 줬는지 살펴보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreaRegionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
