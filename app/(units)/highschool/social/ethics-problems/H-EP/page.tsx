import { notFound } from 'next/navigation';
import { EthicsDilemmaSimulator } from '@/components/interactive/social/EthicsDilemmaSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-EP';

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
          윤리 문제 탐구는 <strong>「정답」을 찾는 게 아니라 「더 좋은 논의」를 만드는 작업</strong>이에요.
          같은 사례를 의무론·공리주의·덕윤리 세 관점으로 보면, 각각이 무엇을 잘 보고 무엇을 놓치는지가 드러나요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 세 관점의 시선">
        <p>
          <strong>의무론(칸트)</strong>: "행위 자체가 옳은가? 인간을 수단 아닌 목적으로 대하는가?" — 결과보다 원칙.
          <strong>공리주의(벤담·밀)</strong>: "어떤 결과가 더 큰 행복을 만드는가?" — 효용 총합으로 평가.
          <strong>덕윤리(아리스토텔레스)</strong>: "유덕한 사람이라면 어떻게 행동할까?" — 성격·습관·균형을 강조.
          현실 사례 — 자율주행의 충돌 회피, AI 채용의 편향, 내부 고발 — 모두 세 관점에서 다른 결론을 내릴 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "공리주의가 가장 합리적" — 다수의 행복을 위해 소수를 희생할 위험이 있어요.
          ❌ "의무론이 가장 도덕적" — 결과를 무시한 원칙이 더 큰 해를 부를 때가 있어요.
          ❌ "덕윤리는 모호" — 구체적 답을 주지 않지만 「판단력」을 키워요. 현실 윤리 문제 대부분은 명확한 규칙으로 풀리지 않아요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 「윤리문제 탐구」·「생활과 윤리」: 사례를 주고 「어떤 관점에서 어떻게 평가할까」를 묻는 자료 분석형 문항이 핵심.
          AI·환경·생명 윤리 같은 신유형은 항상 세 관점의 충돌·조정 패턴으로 답을 만들면 돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EthicsDilemmaSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
