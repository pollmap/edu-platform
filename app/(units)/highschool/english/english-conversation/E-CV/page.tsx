import { notFound } from 'next/navigation';
import { BeAndDoVerbExplorer } from '@/components/interactive/english/BeAndDoVerbExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-CV';

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
          실생활 영어 회화는 <strong>외운 표현을 쏟아내는 시험 영어</strong>가 아니라
          <strong>상황·상대·시제에 맞춰 말하는 진짜 회화</strong>예요.
          가장 자주 쓰이고 가장 자주 틀리는 게 be동사·일반동사의 인칭·시제 변화예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 매번 흔들리는 두 동사">
        <p>
          영어 회화의 80% 문장 첫머리는 <strong>be동사(am/is/are/was/were)</strong>거나
          <strong>일반동사 + (do/does/did)</strong>예요.
          ① 주어가 누구인지 (1인칭/2인칭/3인칭, 단수/복수) ② 시제가 무엇인지 (현재/과거)
          이 두 가지만 정해지면 동사 모양이 자동으로 결정돼요.
          그런데 실시간 회화에서는 이 자동 변환이 늦어져 "He don't..." 같은 실수가 나와요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "He doesn't... 도 He don't... 도 같은 말" — 3인칭 단수 현재는 doesn't만 맞아요.
          ❌ "I were..."는 가정법인 줄만 알면 됨" — 일반 과거는 "I was". "If I were you"처럼 가정법에서만 were.
          ❌ "be동사 + 일반동사" 같이 사용 (예: He is play soccer) — 둘 중 하나만 본동사. 진행형이면 「be + -ing」.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          영어 면접·여행·전화 회화에서 가장 처음 부딪히는 벽이 인칭·시제예요.
          "I'm going to..." / "She doesn't..." / "We were..." — 입에서 자동으로 나와야 회화가 흐름을 타요.
          토익 LC, OPIc IH 이상은 이 기본 동사 활용이 정확해야 점수가 올라가요.
          아래 매트릭스에서 5인칭 × 2시제 = 10칸이 한눈에 보이니, 빈칸 채우기로 자동화해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BeAndDoVerbExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
