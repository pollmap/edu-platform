import { notFound } from 'next/navigation';
import { RockCyclePlateExplorer } from '@/components/interactive/science/RockCyclePlateExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-EAR-01';

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
          { label: '지구과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          단단해 보이는 지구 표면도 사실은 <strong>10여 개의 거대한 판</strong>이 연간 수 cm씩 움직이는 「떠다니는 퍼즐」.
          판이 부딪히고 갈라지는 곳에서 지진·화산·산맥·해구가 만들어지고, 암석은 끊임없이 변신해요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 판 구조론·암석 순환">
        <p>
          맨틀 대류로 판이 이동하면서 ① 발산 경계(대서양 중앙해령) ② 수렴 경계(히말라야·일본 해구) ③ 보존 경계(샌안드레아스 단층)를 만들어요.
          암석은 마그마 → 화성암 → 풍화·퇴적 → 퇴적암 → 변성 → 변성암 → 다시 용융 → 마그마 — 끝없이 순환.
          판게아(약 3.4억년 전) → 현재 대륙 분포까지가 수억 년 단위 연속 변화.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "지진은 갑자기 한 번 일어나고 끝" — 응력 축적 → 단층 파열 → 여진까지 수년 단위. 일본 동일본 대지진(2011) 후 여진 10년 진행.<br />
          ❌ "화산은 산처럼 늘 솟아 있다" — 옐로스톤 슈퍼화산은 거대 칼데라(분지). 산이 아님.<br />
          ❌ "지구 내부는 다 액체다" — 외핵만 액체. 내핵은 고압으로 고체. 맨틀은 고체지만 「유동성 있는 고체」.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          포항·경주 지진(2017·2016) — 한반도가 안전지대가 아니라는 증거. 일본·인도네시아의 빈번한 화산·지진 이유는 환태평양 화산대.
          수능 지구과학Ⅰ 「고체 지구」는 매년 4~5문항. 판 경계 종류 + 암석 순환 + 절대연령 측정이 ★ 패턴.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RockCyclePlateExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
