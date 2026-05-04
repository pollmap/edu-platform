import { notFound } from 'next/navigation';
import { ParticleStateSimulator } from '@/components/interactive/science/ParticleStateSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S8-MA-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`, href: `/grade-${unit.grade}/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          모든 물질은 더 작은 입자 — <strong>원자</strong>로 이루어져 있어요. 원자가 모여 <strong>분자</strong>를 이루고, 분자들이 모여 우리가 보는 물질이 돼요.
        </p>
      </SectionCard>
      <SectionCard title="원소·원자·분자">
        <p>
          <strong>원소</strong>는 같은 종류의 원자로만 이루어진 순수한 물질 (수소·산소·금·철 등 약 118종).
          <strong>원자</strong>는 화학 반응에서 더 이상 쪼개지지 않는 가장 작은 입자.
          <strong>분자</strong>는 원자 2개 이상이 결합한 입자 (H₂O = 수소 2 + 산소 1).
          물질의 성질은 어떤 원자가 어떤 비율로 어떻게 결합하느냐로 정해져요. 같은 탄소라도 결합 방식에 따라 흑연·다이아몬드·풀러렌이 됩니다.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "원자는 진짜 존재 X, 그냥 모형" — 현미경 기술로 원자 하나하나가 사진으로 찍혀요(STM).
          ❌ "원자가 가장 작은 입자" — 원자 안에는 양성자·중성자·전자가 있고, 그 안에는 쿼크가 있어요.
          ❌ "분자 모형은 그냥 그림" — 결합 각도·길이가 실제 측정값과 일치해요. 모형이 추상적이지만 실재를 반영.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 원자·분자">
        <p>
          물(H₂O)은 수소 2개 + 산소 1개. 이 비율을 바꾸면 다른 물질(과산화수소 H₂O₂)이 돼요.
          공기는 질소(N₂) 78% + 산소(O₂) 21% + 약간의 다른 분자.
          단백질·DNA 같은 큰 생체 분자는 원자 수만 개가 정교하게 배열된 결과예요. 화학·생물·재료공학·약학 모두 원자·분자 이해 위에 서 있어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ParticleStateSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
