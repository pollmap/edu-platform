import { notFound } from 'next/navigation';
import { PhotosynthesisExplorer } from '@/components/interactive/science/PhotosynthesisExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-IS1-03';

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
          { label: '통합과학1' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          자연에 존재하는 모든 물질은 <strong>원자가 결합한 분자</strong>로 만들어져요. 같은 탄소(C)도 어떻게 결합하느냐에 따라
          다이아몬드(가장 단단)·흑연(연필심)·풀러렌(축구공 모양)으로 변신.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 화학결합·생체분자·DNA">
        <p>
          ① 이온결합 — 금속 + 비금속(NaCl).<br />
          ② 공유결합 — 비금속 사이 전자 공유(H₂O, CH₄, DNA 골격).<br />
          ③ 금속결합 — 금속 양이온 + 자유전자.<br />
          생명체는 <strong>탄소 골격 + H, O, N, P, S</strong>로 만들어진 거대 분자(단백질·핵산·지질·탄수화물)로 구성.
          DNA는 이중나선 + 4개 염기(ATGC) + 인산-당 골격으로 유전 정보를 저장하는 「나선 사다리」.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "원자는 더 이상 쪼갤 수 없다" — 양성자·중성자·전자, 더 들어가면 쿼크. 「원자」라는 이름은 「분할 불가능」이란 뜻이지만, 실제는 분할 가능.<br />
          ❌ "공유결합 = 정전기적 인력" — 공유결합은 전자 공유, 이온결합이 정전기적 인력.<br />
          ❌ "DNA는 단백질이다" — DNA는 핵산. 단백질과 다른 분자.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          코로나 백신 mRNA — 핵산을 이용한 새로운 약물 패러다임. CRISPR 유전자가위 — DNA 염기서열을 정확히 잘라 편집.
          그래핀(2D 탄소) — 강철보다 200배 강하고 투명한 신소재. 통합과학에서 「자연의 구성 물질」은 ★ 다학제 단원.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PhotosynthesisExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
