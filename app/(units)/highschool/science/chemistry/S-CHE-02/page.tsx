import { notFound } from 'next/navigation';
import { PeriodicTableExplorer } from '@/components/interactive/science/highschool/PeriodicTableExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-CHE-02';

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
          { label: '화학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          원자는 <strong>핵(양성자+중성자)과 그 주변을 도는 전자</strong>로 이루어져 있어요.
          전자가 어느 껍질·궤도함수에 어떻게 배치되느냐가 그 원소의 성질을 결정해요.
          멘델레예프가 1869년 만든 주기율표는 「전자배치 → 성질」의 가장 강력한 압축 지도예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 전자배치와 주기적 성질">
        <p>
          전자는 K(2), L(8), M(8), N(2)... 껍질에 들어가요. 같은 「족」(세로)은 최외각 전자 수가 같아 화학적 성질 닮음.
          같은 「주기」(가로)는 같은 껍질이 채워지는 줄. 1족=알칼리금속(반응 강함), 17족=할로겐(전자 받기 좋아함), 18족=비활성기체(이미 안정).
          오른쪽으로 갈수록 원자반지름↓, 이온화에너지↑, 전기음성도↑. 아래로 갈수록 반대.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "원자는 더 쪼갤 수 없다" — 양성자·중성자도 쿼크로 구성. 다만 화학에서는 원자가 최소 단위.
          ❌ "전자는 행성처럼 핵을 돈다" — 양자역학적 확률 분포(궤도함수). 보어 모형은 비유적 단순화.
          ❌ "주기율표는 무게 순이다" — 원자 「번호」 순(양성자 수). 무게 순이면 Te-I, Ar-K 자리가 바뀌어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          반도체(Si, Ge)·이차전지(Li, Co, Ni)·의약품(Pt 항암제)까지 모두 주기율표 위치에서 그 성질이 예측 가능해요.
          탄소 1원소만으로 다이아몬드와 흑연이 모두 만들어지는 건 결합 방식 차이.
          수능 「원자의 세계」 단원의 기초. 전자배치 묻는 문제 매년 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PeriodicTableExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
