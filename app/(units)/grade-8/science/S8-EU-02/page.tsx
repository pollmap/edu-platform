import { notFound } from 'next/navigation';
import { WeatherFrontExplorer } from '@/components/interactive/science/WeatherFrontExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'S8-EU-02';

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
          날씨는 「기단」(거대한 공기 덩어리)들의 싸움이에요. 한반도는 4대 기단이 계절마다 교대로 영향을 줘서
          사계절이 뚜렷해요. 두 기단이 만나는 경계가 「전선」.
        </p>
      </SectionCard>

      <SectionCard title="기권의 4층 구조">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>대류권</strong> (0~12km): 날씨가 일어나는 곳, 위로 갈수록 추워짐</li>
          <li><strong>성층권</strong> (12~50km): 오존층 있음, 위로 갈수록 더워짐</li>
          <li><strong>중간권</strong> (50~80km): 다시 추워짐, 유성이 타는 곳</li>
          <li><strong>열권</strong> (80~600km): 매우 뜨거움(태양 흡수), 오로라</li>
        </ul>
      </SectionCard>

      <SectionCard title="기단·전선·일기도">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WeatherFrontExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard title="장마와 태풍">
        <p>
          장마는 차가운 오호츠크해 기단과 따뜻한 북태평양 기단이 한반도에서 부딪치는 「정체전선」이에요. 태풍은
          적도 부근의 따뜻한 바다(27°C 이상)에서 수증기가 폭발적으로 상승하며 만들어지는 거대한 회오리. 한반도엔 평균 연 3개가 영향을 줘요.
        </p>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
