import { notFound } from 'next/navigation';
import { ParticipleInversionConverter } from '@/components/interactive/english/ParticipleInversionConverter';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-CE2-03';

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
          공통영어2 어휘·문법은 <strong>같은 의미를 다른 구조로 바꾸는 능력</strong>이 핵심이에요.
          분사구문·도치·강조 — 이 셋이 영어 고급 문법의 빅3.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 변환의 원리">
        <p>
          ① <strong>분사구문</strong> 으로 두 절을 한 절로 압축 →
          ② <strong>도치</strong> 로 강조하고 싶은 부분을 앞으로 →
          ③ <strong>강조 구문(It is~that)</strong> 으로 특정 요소를 부각.
          모두 "정보의 우선순위"를 바꾸는 도구예요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;분사구문은 그냥 -ing 붙이면 끝&quot; — 주어 일치 확인이 핵심, 다르면 절대 생략 X.
          ❌ &quot;도치는 멋있어 보이려고&quot; — 격식·강조 효과가 분명할 때만 자연스러움.
          ❌ &quot;It is ~ that 은 가주어&quot; — cleft 강조 구문은 가주어와 다른 구조예요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스 사설·연설문·문학 작품 — 모두 도치·강조 구문이 자주 등장.
          수능 영어 어법·어휘 7번·9번대 문제는 이 변환 패턴이 단골. 아래에서 5가지 변환을 직접 비교해 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ParticipleInversionConverter />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
