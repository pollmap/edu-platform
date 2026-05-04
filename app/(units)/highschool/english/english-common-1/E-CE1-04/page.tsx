import { notFound } from 'next/navigation';
import { TenseTimelineExplorer } from '@/components/interactive/english/TenseTimelineExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-CE1-04';

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
          어휘·문법의 핵심은 <strong>시제 12가지</strong>예요. 시간 축(과거·현재·미래) × 시제 형태(단순·진행·완료·완료진행)
          12조합을 한 번에 정리하면, 평생 헷갈리던 시제가 한 표로 정리돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 시제 12조합">
        <p>
          가로축은 <strong>시점</strong>(과거/현재/미래), 세로축은 <strong>형태</strong>(단순/진행/완료/완료진행).
          단순은 사실·습관, 진행은 그 시점에 진행 중, 완료는 그 시점까지의 결과, 완료진행은 그 시점까지 계속 진행됨.
          한국어와 1:1로 대응되지 않는 시제(현재완료 등)가 가장 큰 함정이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "현재완료(have p.p.)는 과거랑 똑같다" — 한국어로 같아 보이지만, 영어는 "지금까지의 영향"을 강조.
          ❌ "진행형은 동작에만 쓴다" — be, know 같은 상태 동사는 보통 진행형을 쓰지 않아요.
          ❌ "미래는 will만 쓴다" — be going to, 진행형(예정) 등 여러 형태가 의미 차이를 만들어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          영문 자기소개서·이력서·해외 이메일 — 시제 한 개 잘못 쓰면 의도가 완전히 달라져요.
          수능 어법은 12시제 식별 문제가 매년 출제. 아래 타임라인으로 시점·형태별 차이를 직접 비교해 보세요.
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
