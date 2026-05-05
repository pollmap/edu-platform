import { notFound } from 'next/navigation';
import { RelativeClauseConnector } from '@/components/interactive/english/RelativeClauseConnector';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'E-E2';

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
          영어Ⅱ는 영어Ⅰ에서 익힌 문법·어휘를 <strong>긴 문장과 단락</strong>으로 확장하는 과목이에요.
          관계절·접속사·분사구문으로 정보를 묶어 한 문장에 담는 능력이 핵심.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 관계절로 정보 묶기">
        <p>
          두 짧은 문장을 한 문장으로 묶을 때 <strong>who·which·that·whose·whom</strong>이 핵심 역할을 해요.
          관계절을 능숙하게 쓰면 같은 정보를 30% 더 짧고 자연스럽게 표현할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ &quot;that 만 쓰면 다 통한다&quot; — 사람·사물·소유에 따라 관계대명사가 달라요.
          ❌ &quot;관계절은 길수록 멋있다&quot; — 한 문장에 2개 이상 관계절은 가독성을 망가뜨려요.
          ❌ &quot;콤마는 그냥 쉼표&quot; — 콤마가 있으면 비제한적 용법(부가 정보)으로 의미가 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스 헤드라인·논문 초록·소개 글 — 모두 관계절이 핵심 도구.
          수능 영어 어법은 관계대명사 선택과 콤마 유무 식별이 단골 출제. 아래에서 두 문장을 직접 묶어 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RelativeClauseConnector />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
