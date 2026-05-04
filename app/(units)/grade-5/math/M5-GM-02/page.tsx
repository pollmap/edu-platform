import { notFound } from 'next/navigation';
import { PolygonAreaExplorer } from '@/components/interactive/math/PolygonAreaExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M5-GM-02';

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
          두 도형을 포개었을 때 완전히 일치하면 <strong>합동(congruent)</strong>이에요.
          한 직선·점·중심을 기준으로 서로 마주 보면 <strong>대칭(symmetric)</strong>이에요.
          모양과 크기가 같으면서도 위치만 다른 도형들의 관계를 다뤄요.
        </p>
      </SectionCard>
      <SectionCard title="대칭의 종류">
        <p>
          <strong>선대칭</strong>: 한 직선(대칭축)을 기준으로 양쪽이 거울처럼 같은 도형 — 정삼각형·정사각형·하트 모양.
          <strong>점대칭</strong>: 한 점(대칭의 중심)을 중심으로 180° 돌려도 똑같은 도형 — 직사각형·평행사변형·"S" 글자.
          어떤 도형은 두 가지 대칭을 모두 가져요(원·정사각형). 자연·예술 작품에서 대칭은 균형과 안정을 만들어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "비슷하면 합동" — 모양이 비슷해도 크기가 다르면 합동 X. 그건 닮음(similarity)이에요(중2 단원).
          ❌ "선대칭이면 점대칭" — 별개의 개념이에요. 정삼각형은 선대칭이지만 점대칭은 아니에요(180° 돌리면 다른 모양).
          ❌ "대칭축은 항상 세로" — 가로·대각선 등 방향에 상관없어요. 도형마다 대칭축의 위치와 개수가 달라요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 합동·대칭">
        <p>
          공장에서 같은 모양의 부품을 대량으로 만드는 게 합동이에요. 자동차 양 바퀴, 내 양손, 나비 날개 — 모두 대칭이에요.
          한글의 "ㅁ·ㅂ·ㅇ·ㅡ" 같은 글자는 선대칭이고, "ㅍ·ㄹ" 일부는 점대칭에 가까워요.
          건축에서 대칭은 안정감을, 자연에서 대칭은 효율(나비가 균형 있게 날기)을 만들어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PolygonAreaExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
