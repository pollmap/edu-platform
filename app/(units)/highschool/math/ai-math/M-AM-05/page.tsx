import { notFound } from 'next/navigation';
import { GradientDescentExplorer } from '@/components/interactive/math/highschool/GradientDescentExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AM-05';

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
          { label: '인공지능 수학', href: '/highschool/math/ai-math' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          AI 학습은 <strong>「손실함수가 가장 낮은 점」을 찾는 일</strong>이고, 그 도구가 미분이에요.
          기울기(gradient)가 양수면 왼쪽으로, 음수면 오른쪽으로 한 발씩 내려가는 게 「경사하강법」이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — x ← x − η · ∇L(x)">
        <p>
          현재 위치 x에서 기울기 ∇L(x)를 계산하고, 그 반대 방향으로 학습률 η만큼 이동해요.
          η가 너무 크면 골짜기를 뛰어넘어 발산, 너무 작으면 한참 걸려요. 보통 η = 0.001 ~ 0.1.
          극값(local minimum)에서는 기울기가 0이라 멈추는데, 시작점이나 momentum, Adam 같은 변형이 이를 보완해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「항상 전역 최소점을 찾는다」 — 비볼록(non-convex) 함수에서는 지역 최소에 갇힐 수 있어요.
          ❌ 「학습률은 클수록 빠르다」 — 너무 크면 아예 발산해서 NaN이 떠요.
          ❌ 「미분 = 기울기 한 개」 — 다변수에서는 각 변수별 편미분의 모음 ∇L가 「가장 가파른 방향」이에요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·AI 응용">
        <p>
          ChatGPT 같은 LLM의 수십억 파라미터도 결국 「경사하강법으로 손실을 줄이며」 학습된 거예요.
          이미지 분류, 음성 인식, 강화학습 — 모든 딥러닝의 학습 알고리즘이 이 한 줄에서 출발해요.
          시뮬레이터로 학습률을 바꿔 가며 「발산」, 「수렴」, 「갇힘」을 직접 관찰해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <GradientDescentExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
