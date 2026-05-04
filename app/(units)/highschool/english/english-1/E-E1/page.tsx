import { notFound } from 'next/navigation';
import { TenseTimelineExplorer } from '@/components/interactive/english/TenseTimelineExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-E1';

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
          영어Ⅰ은 듣기·말하기·읽기·쓰기 4기능을 통합적으로 다루는 고등학교 공통과목이에요.
          중학교 때 배운 문법을 <strong>실제 의사소통</strong>으로 연결하는 단계라, 시제·문장 구조 감각이 가장 중요해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 4기능을 묶는 시제 감각">
        <p>
          영어Ⅰ에서 가장 자주 쓰이는 도구가 <strong>12시제 매트릭스</strong>예요.
          시간(과거·현재·미래) × 상태(단순·진행·완료·완료진행) = 12칸. 각 칸은 같은 동사라도 의미가 달라져요.
          예) "I work" / "I am working" / "I have worked" / "I have been working" — 표면상 비슷해 보이지만
          말하는 사람의 시점과 강조점이 다 달라요. 영어Ⅰ 지문은 이 미세한 차이로 의미가 갈려요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "현재완료 = 과거" — 현재완료는 과거 사건이 지금까지 영향을 주는 것. "어제(yesterday)" 같은 명확한 과거 부사와 함께 못 써요.
          ❌ "will = 미래" — 추측·의지·즉흥적 결정 같은 화자의 태도 표현. 단순 미래는 "be going to"가 더 자연스러울 때가 많아요.
          ❌ "진행형은 항상 -ing만 붙이면 됨" — 상태동사(know, like, have=소유)는 보통 진행형으로 안 써요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 영어 듣기·독해는 시제 단서로 정답을 가르는 문제가 많아요.
          "had + p.p." (대과거)로 사건 순서를 묻거나, "have been -ing"으로 진행 중 강조를 묻기도 해요.
          자기소개·이력서·이메일 작문에서도 시제를 잘못 쓰면 어색해 보여요.
          매트릭스 위에서 12시제를 한눈에 보고, 같은 동사가 어떻게 변하는지 직접 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TenseTimelineExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
