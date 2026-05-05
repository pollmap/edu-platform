import { notFound } from 'next/navigation';
import { UnitSSHCExplorer } from '@/components/interactive/science/highschool/UnitSSHCExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-SHC';

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
          { label: '과학의 역사와 문화' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          과학은 직선이 아니에요. 「<strong>정상과학 → 위기 → 혁명 → 새 패러다임</strong>」의 반복.
          천동설이 1400년을 지배했고, 뉴턴 역학이 200년 만에 상대성·양자에 자리를 내줬어요. 다음 혁명은 무엇일까요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 쿤의 패러다임 전환">
        <p>
          토마스 쿤(1962, 「과학혁명의 구조」): 과학사는 (1) 정상과학(기존 패러다임 안에서 퍼즐 풀기), (2) 변칙 누적,
          (3) 위기, (4) 혁명(새 패러다임 등장), (5) 새 정상과학으로 순환.
          코페르니쿠스(1543) → 뉴턴(1687) → 다윈(1859) → 아인슈타인(1905) → 양자역학(1927) → DNA(1953) → 힉스(2012).
          각 도약은 「세계관」 자체를 바꿨어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "옛 과학자는 우리보다 어리석었다" — 그 시대 도구·자료 안에서는 최선의 결론. 프톨레마이오스 모형도 정확도 높았음.<br />
          ❌ "과학적 발견은 천재 한 명이 한다" — 대부분 공동연구·점진적 누적. DNA도 왓슨·크릭·프랭클린·윌킨스 협업.<br />
          ❌ "과학은 객관적·중립적" — 실험 설계·해석·자금 모두 사회·문화 영향. 다만 「검증·재현」으로 자정.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          AI·CRISPR·양자컴퓨팅이 현재 패러다임 전환의 후보. 과학사·과학철학 영역은 학생부·면접에서 자주 다뤄져요.
          내신 통합과학 「과학의 본성」 단원에서 쿤·포퍼·라카토스 비교 출제. 입시 지문 단골.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitSSHCExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
