import { notFound } from 'next/navigation';
import { DebateStructureExplorer } from '@/components/interactive/korean/DebateStructureExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'K-CK2-01';

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
          공통국어2의 화법은 <strong>토론·협상·발표</strong> 3가지 형식 담화를 다뤄요.
          모두 <strong>입장 정리 → 근거 제시 → 상대 반응 처리 → 마무리</strong> 라는 공통 골격을 공유해요.
          뼈대만 잡으면 학교 토론·동아리 회의·진로 면접에 모두 응용할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 형식 담화의 4단계">
        <p>
          토론은 <strong>입론 → 교차 질의 → 반론 → 최종 변론</strong>, 협상은 <strong>요구 제시 → 상호 양보 탐색 → 합의안 도출 → 확정</strong>,
          발표는 <strong>도입 → 본론 → 사례 → 마무리</strong>로 정해져 있어요. 단계마다 발화 목적이 다르므로,
          단계를 헷갈리지 않는 게 핵심 — 결론을 입론에 끌어다 쓰거나, 반론에 새 근거를 끼워 넣지 않도록 주의해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "토론은 결국 누가 말 잘하느냐의 싸움" — 사실은 누가 단계 절차를 더 잘 지키는지의 게임.
          ❌ "발표는 외운 대로 줄줄 말하면 된다" — 청중 반응에 맞춰 호흡을 조절하는 게 더 중요.
          ❌ "협상에서 양보는 진다" — 상대도 이익을 얻어야 합의가 유지돼요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          진로·진학 면접, 공모전 발표, 동아리 회의 — 형식 담화 능력이 그대로 평가돼요.
          수능 화법·작문은 토론 단계 식별, 협상 전략 분석, 발표 자료 활용 문제가 자주 출제.
          아래에서 토론 4단계의 발화 역할을 직접 비교해 보세요.
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
