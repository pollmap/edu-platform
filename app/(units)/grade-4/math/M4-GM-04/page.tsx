import { notFound } from 'next/navigation';
import { QuadrilateralHierarchy } from '@/components/interactive/math/QuadrilateralHierarchy';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M4-GM-04';

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
          사각형은 변 4개 · 각 4개로 된 도형이에요. 조건이 까다로워질수록 더 특별한 이름이 붙어요.
          가장 까다로운 사각형은 <strong>정사각형</strong>이고, 가장 느슨한 건 <strong>사다리꼴</strong>이에요.
        </p>
      </SectionCard>
      <SectionCard title="조건이 점점 추가돼요">
        <p>
          사다리꼴(평행한 변 1쌍) → 평행사변형(2쌍 평행) → 마름모(네 변 같음) 또는 직사각형(네 각 직각) → <strong>정사각형(둘 다 만족)</strong>.
          위쪽 사각형의 모든 성질을 가지면서 추가 조건을 만족하면 더 특별한 이름이 돼요.
          그래서 정사각형은 직사각형이기도 하고, 마름모이기도 하고, 평행사변형이기도 하고, 사다리꼴이기도 해요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li>&ldquo;직사각형은 정사각형이다&rdquo;는 <strong>틀렸어요</strong>. 거꾸로 &ldquo;정사각형은 직사각형이다&rdquo;는 맞아요. 포함 방향 주의!</li>
          <li>마름모와 직사각형은 둘 다 평행사변형이지만 서로 다른 길로 특별해진 사각형이에요.</li>
          <li>사다리꼴 정의에서 &ldquo;평행한 변 한 쌍&rdquo;을 &ldquo;딱 한 쌍만&rdquo;으로 잘못 외우면, 평행사변형도 사다리꼴인지 헷갈려요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 사각형">
        <p>
          교실 칠판·책상은 직사각형, 휴대폰 화면은 직사각형 또는 정사각형, 다이아몬드 모양 표지판은 마름모,
          횡단보도 표지판이나 사다리는 사다리꼴이에요. 도시 건물 창문, 책 표지, 노트, 모니터 등 우리 주변엔 직사각형이 가장 많아요.
        </p>
      </SectionCard>
      <SectionCard title="위계 직접 살펴보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <QuadrilateralHierarchy />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
