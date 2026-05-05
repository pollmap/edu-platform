import { notFound } from 'next/navigation';
import { PhotosynthesisExplorer } from '@/components/interactive/science/PhotosynthesisExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S8-LI-02';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  if (!unit) return {};
  return makeUnitMetadata(unit);
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) {
    notFound();
  }

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
          식물은 빛으로 「당」을 만들어요(광합성). 만든 당으로 호흡도 해서 에너지를 써요. 동물과 다른 점은
          「먹지 않고 스스로 영양분을 만든다」는 것.
        </p>
      </SectionCard>

      <SectionCard title="광합성 vs 호흡">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="text-left py-2"> </th>
                <th className="text-left py-2">광합성</th>
                <th className="text-left py-2">호흡</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-1 font-bold">반응식</td>
                <td className="py-1">CO₂ + H₂O → 포도당 + O₂</td>
                <td className="py-1">포도당 + O₂ → CO₂ + H₂O</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-1 font-bold">에너지</td>
                <td className="py-1">흡수 (빛)</td>
                <td className="py-1">방출 (ATP)</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-1 font-bold">장소</td>
                <td className="py-1">엽록체</td>
                <td className="py-1">미토콘드리아</td>
              </tr>
              <tr>
                <td className="py-1 font-bold">시간</td>
                <td className="py-1">낮 (빛 있을 때만)</td>
                <td className="py-1">24시간</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="광합성 영향 요인 시뮬레이션">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PhotosynthesisExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="식물도 「숨」을 쉬어요">
        <p>
          낮에는 광합성이 호흡보다 활발해서 「O₂를 내뿜는 것처럼 보이지만」, 호흡도 동시에 일어나요. 밤에는 광합성이
          멈추고 호흡만 해서 CO₂를 내요. 식물 옆에서 자도 산소가 부족해지지는 않아요(호흡량이 매우 적음).
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
