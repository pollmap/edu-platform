import { notFound } from 'next/navigation';
import { PeriodicTableExplorer } from '@/components/interactive/science/PeriodicTableExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-IS1-02';

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
          우주에는 약 100여 개의 원소가 존재해요. 이 원소들이 「주기율표」라는 한 장의 표에 배치되는 순간,
          물질의 모든 성질이 <strong>전자 배치</strong>라는 단 하나의 규칙으로 설명돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 빅뱅·별의 핵합성·주기율">
        <p>
          ① 빅뱅 직후 — 가장 가벼운 원소(H, He, 약간의 Li) 형성.<br />
          ② 별 내부 핵융합 — H → He → C → O → Si → ...→ Fe까지.<br />
          ③ 초신성 폭발 — Fe보다 무거운 원소(Au, U)는 폭발 에너지로만 생성.<br />
          주기율표 행(주기) = 전자껍질 수, 열(족) = 최외각 전자 수. 같은 족은 화학적 성질이 비슷해요.
          이온화 에너지·전자친화도·전기음성도 모두 「주기적 경향성」을 보여요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "주기율표는 임의로 정렬했다" — 멘델레예프(1869)가 원자량 순으로 배열, 모즐리(1913)가 원자번호로 정정.<br />
          ❌ "원자번호 = 원자량" — 다름. 원자번호 = 양성자 수, 원자량 ≈ 양성자 + 중성자.<br />
          ❌ "주기율표 18족(비활성기체)는 절대 반응 안 한다" — Xe, Kr는 강한 산화제와 반응 가능.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          반도체(Si, Ge)·리튬이온전지(Li, Co)·태양전지(Si, GaAs) — 모두 주기율표상 위치로 성질이 결정.
          우리 몸 65% 산소, 18% 탄소, 10% 수소, 3% 질소 = 별의 잔해. 통합과학·화학Ⅰ에서 주기율은 ★ 핵심 단원.
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
