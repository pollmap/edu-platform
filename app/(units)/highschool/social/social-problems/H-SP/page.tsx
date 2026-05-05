import { notFound } from 'next/navigation';
import { DataAnalysisToolkit } from '@/components/interactive/social/DataAnalysisToolkit';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-SP';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: '고등학교', href: '/highschool' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          사회 문제는 <strong>감정만으로 다루면 길을 잃기 쉬워요</strong>. 통계·데이터로 문제의 「크기·분포·변화」를 먼저 그려야
          제대로 된 토론이 가능해요. 평균·중앙값·분산·상관 — 단순한 도구가 사회를 보는 눈을 바꿔요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4가지 통계 도구">
        <p>
          ① <strong>평균</strong>: 모든 값을 더해 개수로 나눈 값. 이상치(outlier)에 약해요.
          ② <strong>중앙값</strong>: 정렬했을 때 한가운데. 이상치에 강함. 소득·집값 같은 「쏠림」 데이터에 적합.
          ③ <strong>표준편차</strong>: 평균에서 얼마나 흩어져 있나. 격차의 크기.
          ④ <strong>상관</strong>: 두 변수가 함께 움직이는 정도. 단, 상관은 인과(causation)가 아니에요.
          평균만 보면 빈부 격차가 가려지고, 중앙값만 보면 극단적 부유층의 영향력이 가려져요. 같이 봐야 해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "평균 = 전형적인 값" — 분포가 쏠리면 평균은 「가공된 숫자」가 돼요.
          ❌ "상관 = 인과" — 아이스크림 판매와 익사 사고는 상관 있지만 인과 X (둘 다 「여름」이라는 제3변수).
          ❌ "통계는 거짓말" — 통계는 「잘 쓰면」 진실에 가깝고 「잘못 쓰면」 거짓에 가까워요. 도구일 뿐.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 사회문제 탐구·통합사회: 「데이터 해석 자료」를 읽고 결론을 도출하는 문항이 핵심.
          뉴스의 「OECD 평균」, 「소득 분위」 같은 통계 표현을 들었을 때 「어떤 분포인가, 평균인가 중앙값인가」를 묻는 습관이 비판적 시민의 기본기예요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DataAnalysisToolkit />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
