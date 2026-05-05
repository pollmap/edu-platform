import { notFound } from 'next/navigation';
import { EastAsianTerritoryTimeline } from '@/components/interactive/social/EastAsianTerritoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-EH';

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
          동아시아 — 한·중·일은 <strong>2000년 동안 끊임없이 영향을 주고받은 「하나의 지역」</strong>이에요.
          한자·불교·유교·도시 모델·차·도자기 — 거의 모든 문화가 이 세 나라 사이에서 흐르며 변형됐어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 시대별 영토와 교류">
        <p>
          삼국 → 통일신라·발해 → 고려 → 조선의 영토는 시대마다 달랐고, 만주·간도·대마도 등 「변경 지역」의 귀속도 변동이 있었어요.
          교류는 한자(고대) → 불교·율령(중세) → 조공책봉·통신사(근세) → 식민·전쟁(근대) → 경제 의존(현대)으로 형식이 바뀌어 왔어요.
          영토 분쟁(독도·센카쿠/댜오위·쿠릴) 같은 현재 이슈도 이 역사적 배경 위에서만 이해할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "동아시아 = 중국 중심" — 발해·고려·임진왜란 시기 등 한반도가 동아시아 질서의 핵심 변수였던 시기도 많아요.
          ❌ "역사 인식 = 같으면 좋다" — 같은 역사를 공유하지만 해석은 국가별로 다를 수 있어요. 「공통의 사실 + 다양한 해석」을 인정하는 게 출발.
          ❌ "한·일 갈등 = 감정 문제" — 식민지·전쟁 책임은 법적·역사적 문제이기도 해요. 감정과 사실을 구분해 보는 시선이 중요해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          뉴스의 동아시아 외교 갈등은 거의 항상 「역사 인식 + 영토 + 안보」 3축이 얽혀 있어요.
          수능 동아시아사·세계사 융합 문항, 외교관·기자 시험에서도 「조공책봉의 본질」, 「임진왜란의 동아시아적 의미」 같은 통합 분석이 자주 등장해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EastAsianTerritoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
