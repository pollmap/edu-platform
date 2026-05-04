import { notFound } from 'next/navigation';
import { DebateStructureExplorer } from '@/components/interactive/korean/DebateStructureExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK1-01';

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
          화법은 <strong>말로 생각을 정확히 전달하고 상대를 이해시키는 기술</strong>이고,
          언어는 그 도구예요. 일상 대화부터 토론·발표까지 모두 같은 원리 — 청자에 맞는 어휘 선택,
          논리의 흐름, 비언어 표현(시선·억양)이 함께 작동해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 담화 상황 3요소">
        <p>
          <strong>화자·청자·맥락</strong>이 모이면 한 편의 담화가 돼요.
          같은 문장도 누구에게 어디서 말하느냐에 따라 의미가 달라지고, 그래서 형식적 토론에는
          <strong> 입론 → 교차 질의 → 반론 → 최종 변론</strong> 이라는 정해진 흐름이 있어요.
          이 흐름을 알면 발표·면접·일상 토론 모두 같은 틀로 정리돼요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "말 잘하는 건 타고난다" — 절차와 어휘를 외우면 누구나 단계적으로 좋아져요.
          ❌ "토론은 상대를 이기는 것" — 토론은 더 나은 결론을 함께 찾는 과정이에요.
          ❌ "감정에 호소해야 설득된다" — 단기에는 효과 있지만 약점이 드러나면 반대 효과를 냅니다.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학교 발표·동아리 회의·면접·온라인 토론까지 모두 이 구조로 풀려요.
          수능 화법·작문에서는 발화 의도, 청자 분석, 토론 단계 식별이 단골 출제 포인트예요.
          아래 인터랙티브로 4단계를 직접 클릭하며 발화 역할을 익혀 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <DebateStructureExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
