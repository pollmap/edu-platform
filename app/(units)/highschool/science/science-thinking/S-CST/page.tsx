import { notFound } from 'next/navigation';
import { UnitSCSTExplorer } from '@/components/interactive/science/highschool/UnitSCSTExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CST';

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
          { label: '융합과학 탐구' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          융합과학은 「하나의 질문에 물리·화학·생물·지구과학을 모두 동원」하는 사고 훈련이에요.
          좋은 질문은 검증 가능해야 하고, 좋은 가설은 <strong>방향성·숫자·반증 가능성</strong>을 갖춰야 해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 탐구의 5단계">
        <p>
          1) 관찰: 일상의 작은 차이를 포착. 2) 질문·가설: 「~할수록 ~할 것이다」 형태로 검증 가능하게.
          3) 변인 통제: 독립변인(내가 바꾸는 것), 종속변인(결과로 변하는 것), 통제변인(고정).
          4) 측정·기록: 정량적 데이터 + 오차 추정. 5) 결론·확장: 가설 채택/기각 + 후속 질문 생성.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "가설이 틀리면 실패한 실험" — 반증된 가설도 정상적 과학 진보. 칼 포퍼의 「반증 가능성」.<br />
          ❌ "통제변인은 그냥 동일하게만" — 무엇을 통제했는지 구체적으로 기록해야 재현 가능.<br />
          ❌ "단 한 번 측정으로 결론" — 반복 측정·평균·표준편차로 우연 효과 배제.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          학생부 종합 전형·과학 영재 면접에서 「자기주도 탐구 보고서」가 핵심. 가설–변인–결과–한계의 논리적 일관성이 평가 포인트.
          대학 입시 자기소개서·연구 활동 기록부 작성 시 이 5단계 구조 그대로 쓰면 됨.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSCSTExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
