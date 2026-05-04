import { notFound } from 'next/navigation';
import { HumanBodySystems } from '@/components/interactive/science/HumanBodySystems';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-IS2-02';

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
          { label: '통합과학2' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          단 하나의 세포 안에서 「생산 공장(미토콘드리아·엽록체)」 「설계도(DNA)」 「운반 시스템(소포체·골지체)」가 동시에 작동해요.
          이게 모든 생명체의 <strong>「최소 단위 시스템」</strong>인 세포예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 세포 소기관·ATP·세포호흡">
        <p>
          핵 = 유전 정보 저장. 미토콘드리아 = ATP 생산(세포호흡). 엽록체(식물) = 광합성. 소포체·골지체 = 단백질 합성·운반·분비.
          세포막은 <strong>인지질 이중층</strong> + 단백질 — 선택적 투과.<br />
          세포호흡 = C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP(약 30~38). 광합성은 그 역과정.<br />
          ATP는 「세포의 화폐」 — 모든 생명 활동의 직접 에너지원.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "원핵세포에는 DNA가 없다" — DNA는 있음(세포질에 떠 있음). 「핵막」이 없는 것뿐.<br />
          ❌ "광합성 = 호흡의 반대" — 식물도 호흡함. 광합성과 호흡은 동시에 일어남.<br />
          ❌ "세포는 모두 같다" — 적혈구(핵 X)·근육세포(다핵)·신경세포(긴 돌기) 등 매우 다양.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          항암제는 빠르게 분열하는 암세포 미토콘드리아·DNA를 타겟. 박테리아·바이러스 감염은 세포막·세포내 기관 중 어느 곳을 공격하느냐로 분류.
          통합과학·생명과학Ⅰ에서 세포 단원은 ★ 기초. 모든 생리학·유전학으로 연결.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HumanBodySystems />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
