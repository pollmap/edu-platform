import { notFound } from 'next/navigation';
import { EthicsThinkersTimeline } from '@/components/interactive/social/EthicsThinkersTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-EI';

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
          윤리와 사상은 <strong>「사람이 어떻게 살아야 하는가?」에 대한 인류의 누적된 답</strong>이에요.
          이 단원은 공자에서 롤스까지 약 2500년 동안 동·서양 사상가들이 어떻게 답을 다듬어 왔는지 시간 순으로 따라가요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 사상의 큰 분기점">
        <p>
          ① <strong>고전(BC 500년대)</strong>: 공자·노자·석가·소크라테스 — 인류 사상의 「축의 시대(Axial Age)」.
          ② <strong>중세</strong>: 신라 원효(화쟁), 송 주희(성리학), 서양 아퀴나스(자연법) — 종교적 세계관 안의 윤리.
          ③ <strong>근세 한국</strong>: 이황·이이의 성리학 논쟁, 정약용의 실학 — 동양 윤리의 한반도적 변주.
          ④ <strong>근대 서양</strong>: 칸트(의무)·벤담(공리)·밀(자유) — 종교에서 떨어져 나온 「세속 윤리」의 정립.
          ⑤ <strong>현대</strong>: 롤스(정의)·매킨타이어(덕윤리 부활) — 공정·공동체 가치의 재발견.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "조선의 성리학 = 무조건 보수" — 이황·이이의 논쟁은 당대 첨단 철학 토론이었어요. 정약용 같은 실학자는 사회 개혁의 동력이었어요.
          ❌ "공리주의 = 다수결" — 「최대 다수의 최대 행복」이지만, 「행복」을 어떻게 측정할지·소수 보호는 어떻게 할지 같은 깊은 논의가 있어요.
          ❌ "사상은 시대의 산물일 뿐" — 시대 배경은 영향을 주지만, 좋은 사상은 시대를 넘어 작동해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 윤리·사상의 단골: 「이황의 이기호발 vs 이이의 기발이승」, 「칸트의 정언명령 vs 벤담의 공리」 같은 비교 분석.
          타임라인을 따라 「누가 누구의 영향을 받고 누구를 비판했는지」 계보를 그려 보면 자연스럽게 정리돼요.
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
