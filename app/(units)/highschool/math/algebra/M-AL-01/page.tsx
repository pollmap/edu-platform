import { notFound } from 'next/navigation';
import { ExponentLogExplorer } from '@/components/interactive/math/highschool/ExponentLogExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AL-01';

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
          지수와 로그는 <strong>「몇 번 곱했나」와 「몇 번 곱해야 하나」를 거꾸로 묻는 한 쌍</strong>이에요.
          서로 역연산이라서 한쪽을 알면 다른 쪽이 자동으로 따라와요.
          큰 수와 작은 수를 다루는 모든 분야 — 인구·지진·소리·반감기 — 가 이 한 도구로 깔끔하게 표현돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 지수↔로그 변환과 로그법칙">
        <p>
          지수 표현 <strong>aˣ = N</strong>은 로그 표현 <strong>logₐN = x</strong>와 완전히 같은 사실이에요.
          핵심 로그법칙 5가지: log(MN) = logM + logN, log(M/N) = logM − logN, logMⁿ = n·logM,
          밑변환 logₐM = log_b M / log_b a, 그리고 a^(logₐx) = x (역함수).
          곱셈을 덧셈으로, 나눗셈을 뺄셈으로 「줄여 주는」 게 로그의 진짜 가치예요 (네이피어가 발명한 이유).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "log0 = 0이다" — 정의역에서 빠져요. 로그의 진수는 항상 양수.
          ❌ "log(M+N) = logM + logN" — 절대 성립하지 않아요. 합은 분리되지 않습니다.
          ❌ "밑이 음수일 수 있다" — 지수·로그 모두 밑은 양수, 1이 아닌 수.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          지진 규모(리히터)·소리 크기(데시벨)·산성도(pH)는 모두 상용로그 스케일이라
          1만큼 차이는 10배 차이를 의미해요. 수능 수학 「대수」에서 매년 1~2문제는 로그법칙·밑변환을 직접 묻는
          기본 문제로 출제돼요. 슬라이더를 직접 움직여 지수가 바뀔 때 결과가 어떻게 변하는지 감을 잡아 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ExponentLogExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
