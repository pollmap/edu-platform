import { notFound } from 'next/navigation';
import { ScatterCorrelationExplorer } from '@/components/interactive/math/ScatterCorrelationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M9-DP-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          두 변량(예: 키와 몸무게) 간의 관계를 점으로 찍은 그림이 <strong>산점도</strong>예요. 점들이 직선 모양에
          가까울수록 두 변량이 강한 <strong>상관관계</strong>를 가져요. 양의 상관·음의 상관·무상관으로 분류돼요.
        </p>
      </SectionCard>
      <SectionCard title="상관계수 r 해석">
        <p>
          상관계수 r은 −1 ≤ r ≤ 1 범위의 수예요. <strong>r = +1</strong>은 완벽한 양의 직선,{' '}
          <strong>r = 0</strong>은 무관, <strong>r = −1</strong>은 완벽한 음의 직선.
        </p>
        <p>
          |r| ≥ 0.7이면 강한 상관, 0.3~0.7이면 약한 상관, 0.3 미만이면 거의 무관으로 해석해요. 단, 표본 수와 분야에 따라
          기준은 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="상관 ≠ 인과">
        <p>
          <strong>가장 중요한 원칙</strong>: 두 변량이 강한 상관을 보여도 한쪽이 다른 한쪽의 원인이라는 보장은 없어요.
          예) 아이스크림 판매량과 익사 사고 수는 상관이 높지만, 둘 다 '여름'이라는 제3 변수의 영향을 받을 뿐이에요.
        </p>
        <p>
          인과관계를 입증하려면 무작위 대조 실험(RCT)이 필요해요. 관찰 데이터의 상관만으로는 부족.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"r=0이면 두 변수는 완전히 무관"</strong> — 선형 상관이 없다는 뜻. 곡선 관계(2차)는 r이 0이어도 강한 비선형 관계가 있을 수 있어요.</li>
          <li><strong>"상관이 강하면 인과 입증"</strong> — 절대 X. 제3 변수 또는 우연일 수 있어요.</li>
          <li><strong>"이상치는 무시"</strong> — 이상치 한두 개가 r 값을 크게 흔들 수 있어요. 항상 산점도를 먼저 그려서 모양을 확인.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 산점도·상관">
        <p>
          공부 시간과 시험 점수, 광고비와 매출, 운동량과 체중 변화 — 모두 산점도로 시각화해 패턴을 찾을 수 있어요.
          머신러닝의 회귀(regression)도 본질적으로는 산점도에서 가장 잘 맞는 직선·곡선을 찾는 작업이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ScatterCorrelationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
