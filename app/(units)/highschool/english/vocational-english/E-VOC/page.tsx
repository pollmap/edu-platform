import { notFound } from 'next/navigation';
import { WorkplaceEnglishTemplates } from '@/components/interactive/english/WorkplaceEnglishTemplates';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-VOC';

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
          직무 영어는 <strong>일터에서 통하는 영어 템플릿</strong>을 익히는 과목이에요.
          이메일·미팅·요청·사과 — 영어로 일하면 결국 같은 6~7가지 패턴을 반복해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 직무 영어의 톤">
        <p>
          직무 영어는 <strong>polite + direct</strong>가 표준. 한국식 우회 표현은 오히려 모호하게 들려요.
          "Could you ~?" "I&apos;d like to ~" "Let me know if ~" 같은 핵심 표현 10개만 정확히 써도
          하루 일이 매끄러워져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;Sorry to bother you 로 시작해야 예의&quot; — 약하게 들림. 본론을 빨리.
          ❌ &quot;You should ~ 로 부탁&quot; — 명령으로 들림. Could you / Would you mind 사용.
          ❌ &quot;Thanks 만 적으면 끝&quot; — 마감 + 다음 단계까지 명시해야 완성.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          인턴십·외국계 면접·해외 인턴 — 모두 같은 템플릿으로 풀려요.
          토익 라이팅·BEC·OPIc도 이 패턴들을 평가. 아래 6가지 직무 템플릿을 직접 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WorkplaceEnglishTemplates />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
