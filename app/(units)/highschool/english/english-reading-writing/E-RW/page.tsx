import { notFound } from 'next/navigation';
import { RelativeClauseConnector } from '@/components/interactive/english/RelativeClauseConnector';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-RW';

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
          영어 독해와 작문은 <strong>긴 글을 정확히 읽고, 자기 의견을 논리적으로 쓰는</strong> 연습이에요.
          이 단계에서 가장 큰 무기는 <strong>관계사·접속사</strong> — 짧은 문장을 묶어 한 문단을 만드는 도구예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 두 문장을 한 문장으로">
        <p>
          긴 글의 문장은 대부분 <strong>관계사로 묶인 결합 문장</strong>이에요.
          ① 두 문장이 공유하는 명사를 찾아내고 ② 사람이면 who/whom, 사물이면 which, 둘 다 가능한 that을 골라
          ③ 두 번째 문장의 그 명사를 관계사로 바꿔 앞 문장 뒤에 붙이는 3단계예요.
          예) "The book is on the desk. + I bought it." → "The book <em>that I bought</em> is on the desk."
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "관계사 뒤에는 항상 동사" — 주격일 때만이에요. 목적격이면 「관계사 + 주어 + 동사」 순서.
          ❌ "that이 만능이라 항상 써도 됨" — 콤마(,)가 붙은 계속적 용법은 that을 못 써요. who/which만 가능.
          ❌ "where = 장소, when = 시간"이라고만 외우면 위험 — 선행사가 진짜 장소·시간일 때만이에요. 추상적 상황은 「in which」 등 전치사+관계사로.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 영어 빈칸·어법 문제의 절반 가까이가 관계사 관련이에요.
          영어 에세이·자기소개서에서도 "I am a person who ~" 같은 관계사 문장으로 자기 정체성을 길게 풀어내요.
          신문 기사·논문 한 문단에는 평균 2~3개의 관계사가 들어가요.
          아래 인터랙티브에서 짧은 두 문장이 어떻게 한 문장으로 묶이는지 직접 만들어 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RelativeClauseConnector />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
