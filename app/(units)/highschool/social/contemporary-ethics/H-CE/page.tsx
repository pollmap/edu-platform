import { notFound } from 'next/navigation';
import { EthicsThinkersTimeline } from '@/components/interactive/social/EthicsThinkersTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-CE';

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
          현대 사회의 윤리 문제 — AI, 환경, 생명, 정의 — 는 <strong>오래된 사상의 도구로 새 문제를 묻는 작업</strong>이에요.
          공자·맹자·소크라테스·칸트·롤스 — 이들이 던진 질문은 2500년이 지나도 여전히 작동해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 동·서양 윤리의 두 축">
        <p>
          <strong>동양</strong>은 「관계 안에서 사람이 사람답게 사는 법」에 집중해 왔어요. 유가의 인(仁)·예(禮), 불교의 자비, 도가의 자연 — 모두 「공동체 속의 자아」를 묻는 전통.
          <strong>서양</strong>은 「개인의 이성과 의무·결과」에 더 무게를 둬 왔어요. 칸트의 의무론, 벤담의 공리주의, 아리스토텔레스의 덕윤리 — 행위의 옳음을 무엇으로 평가할지 다양한 기준 제시.
          현대 윤리는 두 축을 결합해 새 문제(데이터 윤리·AI·기후)에 답을 찾고 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "동양 = 집단주의, 서양 = 개인주의" — 단순화된 이분법이에요. 동양에도 개인 수양 전통이, 서양에도 공동체 윤리(아리스토텔레스·매킨타이어)가 깊어요.
          ❌ "옛 윤리는 지금에 안 맞다" — 인간 본성·관계·정의 같은 핵심 문제는 시간이 지나도 그대로예요. 도구를 어떻게 쓰느냐가 관건.
          ❌ "윤리 = 정답 찾기" — 윤리학은 「더 좋은 질문 만들기」에 가까워요. 다양한 관점 비교가 핵심.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 윤리는 「공자 vs 칸트」, 「벤담 vs 밀」 같은 사상가 비교가 단골이에요. 단순 암기 대신 「각 사상가가 같은 문제에 어떻게 답할까」를 머릿속에서 시뮬레이션해 보세요.
          AI 윤리·기후 정의 같은 신유형도 이 사상사적 토대 위에서 출제돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EthicsThinkersTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
