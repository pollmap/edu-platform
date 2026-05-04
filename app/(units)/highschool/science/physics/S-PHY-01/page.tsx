import { notFound } from 'next/navigation';
import { TimeDistanceGraph } from '@/components/interactive/science/TimeDistanceGraph';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-PHY-01';

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
          { label: '물리학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          물리학의 출발점은 <strong>"움직임"을 숫자로 표현하는 일</strong>이에요.
          위치·속도·가속도라는 세 양만 정확히 다룰 수 있으면, 자유낙하·자동차 정지거리·로켓 발사까지
          모두 같은 그래프 한 장으로 풀려요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 위치·속도·가속도의 관계">
        <p>
          속도는 <strong>위치의 시간 변화율</strong>(v = dx/dt), 가속도는 <strong>속도의 시간 변화율</strong>(a = dv/dt)이에요.
          시간-위치 그래프의 <strong>기울기</strong>가 속도, 시간-속도 그래프의 <strong>기울기</strong>가 가속도, <strong>면적</strong>은 이동거리.
          등가속도 운동에서는 v = v₀ + at, x = v₀t + ½at² 라는 두 식이 핵심이고, 이건 미적분 한 줄로 유도돼요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "속도가 0이면 가속도도 0이다" — 던진 공이 최고점에 잠시 멈출 때도 중력 가속도는 9.8 m/s² 그대로.
          ❌ "빠른 물체일수록 가속도가 크다" — 등속운동은 속도가 빠르든 느리든 가속도 = 0.
          ❌ "가속도 방향 = 운동 방향" — 브레이크 밟는 차는 가속도가 운동 반대 방향이에요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          교통사고 분석에서 스키드마크 길이로 충돌 직전 속도를 역산하는 게 바로 v² = v₀² + 2ax.
          수능 물리학Ⅰ 「역학과 에너지」 첫 단원 단골 주제예요. 그래프 해석 문제가 해마다 2~3문항씩 나와요.
          엘리베이터에서 체중계가 가벼워지는 순간이 바로 아래로 가속하는 시점.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TimeDistanceGraph />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
