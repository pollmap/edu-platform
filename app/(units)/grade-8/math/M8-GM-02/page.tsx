import { notFound } from 'next/navigation';
import { SimilarityExplorer } from '@/components/interactive/math/SimilarityExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M8-GM-02';

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
          두 도형의 모양이 같지만 크기만 다르면 <strong>닮음(similar)</strong>이에요. 합동은 모양·크기 모두 같음, 닮음은
          모양만 같고 크기는 비율로 다름. 닮음비 k는 변·둘레의 배율을 뜻해요.
        </p>
      </SectionCard>
      <SectionCard title="닮음비 k의 의미">
        <p>
          <strong>변의 비 = k</strong>: 모든 대응변이 k배. 예) 닮음비 1:2면 작은 도형의 변이 1cm일 때 큰 도형은 2cm.
        </p>
        <p>
          <strong>넓이의 비 = k²</strong>: 가로·세로 모두 k배니까 넓이는 k×k=k².
        </p>
        <p>
          <strong>부피의 비 = k³</strong>: 입체에서 가로·세로·높이 모두 k배라 부피는 k³배. 닮음비 1:2 → 부피는 1:8.
        </p>
      </SectionCard>
      <SectionCard title="삼각형 닮음 조건">
        <p>
          <strong>SSS 닮음</strong>: 세 변의 비가 같음.{' '}
          <strong>SAS 닮음</strong>: 두 변의 비가 같고 끼인각이 같음.{' '}
          <strong>AA 닮음</strong>: 두 각이 같음(세 번째도 자동으로 같으므로).
        </p>
        <p>
          평행선과 비례선분(중점연결정리, 평행선 사이의 비), 삼각형 무게중심 등의 정리도 모두 닮음에서 출발해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"닮음비 2배 → 넓이도 2배"</strong> — 넓이는 k²배. 1:2 닮음이면 넓이는 1:4.</li>
          <li><strong>"닮음 = 합동"</strong> — 합동은 닮음비 k=1인 특수 경우. 일반 닮음은 크기가 달라요.</li>
          <li><strong>"각이 같으면 항상 닮음"</strong> — 다각형은 각만 같다고 닮음이 안 돼요(정사각형과 직사각형). 삼각형만 AA로 충분.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 닮음">
        <p>
          지도 축척(1:50000은 닮음비), 사진 확대·축소, 로봇·인형의 미니어처, 건축 모델, 영화의 미니어처 세트 — 모두
          닮음의 응용이에요. 빵을 두 배 크기로 만들면 재료는 8배 들어가는 이유도 부피가 k³배라서.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SimilarityExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
