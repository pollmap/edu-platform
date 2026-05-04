import { notFound } from 'next/navigation';
import { BarChartBuilder } from '@/components/interactive/math/BarChartBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M4-DP-01';

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
          막대그래프는 각 항목의 값을 막대 길이로 나타내 비교하기 쉽게 한 그림이에요. 표를 보고 한참 생각해야 할 비교가 막대로 그리면 한눈에 보여요.
        </p>
      </SectionCard>
      <SectionCard title="막대그래프 그리는 순서">
        <p>
          ① 가로축에 항목 이름, 세로축에 값(개수·점수·온도). ② 세로축에 적당한 눈금 정하기 — 가장 큰 값보다 살짝 큰 수까지.
          ③ 항목마다 값에 맞는 높이로 막대를 그림. ④ 제목과 단위 적기. 순서를 지키면 누구든 읽을 수 있는 그래프가 돼요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "막대 굵기가 다르면 다른 의미" — 막대 굵기는 통일해요. 굵기로 정보를 표현하지 않아요.
          ❌ "0부터 시작 안 해도 됨" — 막대그래프는 항상 0부터. 안 그러면 차이가 과장돼요(뉴스에서 자주 보는 속임수).
          ❌ "값이 같으면 막대 색도 같아야" — 색은 자유. 다만 같은 분류는 같은 색이 보기 좋아요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 막대그래프">
        <p>
          학급 좋아하는 음식 조사, 한 주 걸음 수, 월별 용돈 사용 — 일상 어디서나 쓰여요.
          뉴스의 선거 결과, 코로나 확진자 수, 기상 예보의 강수량도 모두 막대그래프예요.
          그래프를 그리는 능력보다 더 중요한 건 <strong>거짓 그래프를 알아채는 능력</strong>이에요. 0부터 시작하지 않은 그래프, 축 단위가 빠진 그래프를 의심하세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BarChartBuilder />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
