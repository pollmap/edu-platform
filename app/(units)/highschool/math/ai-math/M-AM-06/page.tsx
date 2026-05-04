import { notFound } from 'next/navigation';
import { NaiveBayesClassifier } from '@/components/interactive/math/highschool/NaiveBayesClassifier';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AM-06';

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
          나이브 베이즈는 <strong>「단어들이 서로 독립이라고 순진하게(naive) 가정」</strong>하고,
          베이즈 정리로 분류하는 가장 단순한 AI 분류기예요. 단순하지만 스팸 필터에서 오랫동안 쓰일 만큼 강력해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — P(C|w₁,...,wₙ) ∝ P(C)·∏P(wᵢ|C)">
        <p>
          분모 P(w)는 모든 클래스에서 같으니 비교할 때 무시할 수 있어요. 그래서 「사전확률 × 우도들의 곱」만 계산해
          가장 큰 클래스를 답으로 골라요. 곱셈이 0이 되는 걸 막으려고 라플라스 평활화(+1)를 쓰고,
          숫자 언더플로우 방지를 위해 보통 로그 합 형태로 계산해요. log P(C) + Σ log P(wᵢ|C).
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「독립이라는 가정이 진짜다」 — 자연어에서는 단어들이 강하게 의존해요. 그래서 「나이브(순진한)」예요.
          ❌ 「학습 데이터에 없는 단어는 곱하면 0」 — 그래서 라플라스 평활화로 모든 단어에 +1을 더해 줘요.
          ❌ 「확률을 그냥 곱한다」 — 단어가 많으면 곱이 너무 작아져 0으로 떨어져요. log를 써 합으로 바꿔야 안정.
        </p>
      </SectionCard>
      <SectionCard title="실생활·AI 응용">
        <p>
          Gmail의 초기 스팸 필터, 뉴스 카테고리 자동 분류, 감정 분석 — 나이브 베이즈가 베이스라인으로 자주 쓰여요.
          최신 LLM이 등장한 지금도, 「작은 데이터 + 빠른 결과」가 필요한 곳에서는 여전히 현역이에요.
          시뮬레이터에서 학습 문장을 바꿔 가며 분류 결과가 어떻게 변하는지 관찰해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <NaiveBayesClassifier />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
