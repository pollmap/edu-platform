import { notFound } from 'next/navigation';
import { UnitSLE201Explorer } from '@/components/interactive/science/highschool/UnitSLE201Explorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-LE2-01';

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
          { label: '과학탐구실험2' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          AI·CRISPR·양자컴퓨팅·핵융합 — 우리 세대가 살아가는 동안 모습이 결정될
          <strong> 4대 첨단 기술</strong>이에요. 원리·현재 수준·위험을 함께 보지 않으면 「공포」나 「과대평가」 둘 다로 빠지기 쉬워요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — TRL과 4대 기술 비교">
        <p>
          기술준비수준(TRL): 1~3 기초연구, 4~6 시제품, 7~9 상용. 현재 AI(9), CRISPR(8), 양자(5), 핵융합(4) 수준.
          AI: 트랜스포머·수십억 매개변수·다음 토큰 예측. CRISPR: gRNA + Cas9 분자 가위.
          양자: 큐비트 중첩·얽힘으로 2ⁿ 상태 동시 탐색. 핵융합: D + T → He + n + 17.6 MeV (1억 °C 플라즈마).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "양자컴퓨터가 모든 컴퓨터를 대체한다" — 특정 알고리즘(쇼어·그로버)에서만 우위. 일반 작업은 고전 컴퓨터.<br />
          ❌ "핵융합 = 핵분열" — 융합은 연쇄반응 X·고준위 폐기물 X. 전혀 다른 메커니즘.<br />
          ❌ "AI가 곧 인간 일자리를 모두 대체" — 자동화 영역과 보완 영역이 공존. 새 직무도 생성.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학생부 「과학·기술 진로 탐색」, 영재 면접, 자기소개서 단골 주제. 「위험·윤리」를 함께 다뤄야 균형 잡힌 답변.
          수능 통합과학 「과학과 미래」 단원에서 4대 기술 중 1~2개가 매년 ★ 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSLE201Explorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
