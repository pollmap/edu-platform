import { notFound } from 'next/navigation';
import { BarChartBuilder } from '@/components/interactive/math/BarChartBuilder';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M3-DP-01';

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
          그림그래프는 <strong>그림 한 개가 몇 개를 뜻하는지</strong> 정해 놓고, 그 그림을 늘어놓아 수를 비교하는 그래프예요.
          예: 사과 그림 한 개 = 사과 5개. 그림 3개면 사과 15개.
        </p>
      </SectionCard>
      <SectionCard title="왜 이렇게 그릴까">
        <p>
          숫자만 적힌 표보다 그림이 한눈에 들어와요. 그림 개수만 세도 누가 더 많고 적은지 바로 보이거든요.
          중요한 건 <strong>한 그림이 몇 개를 나타내는지(단위)</strong>를 정확히 정하는 거예요. 단위를 안 적으면 같은 그래프도 사람마다 다르게 읽어요.
        </p>
      </SectionCard>
      <SectionCard title="자주 헷갈리는 점">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>큰 그림 / 작은 그림</strong>으로 자릿수를 나타내기도 해요. 예: 큰 그림 1개 = 10마리, 작은 그림 1개 = 1마리.</li>
          <li>그림 개수만 세고 끝나면 안 되고, <strong>그림 1개가 몇 개를 뜻하는지 곱</strong>해야 진짜 수가 나와요.</li>
          <li>단위가 다른 두 그래프는 그림 개수만으로 비교하면 안 돼요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 그림그래프">
        <p>
          학급에서 좋아하는 과일 조사, 일주일 날씨 기록, 동네 가게 손님 수 등 <strong>나뉜 항목별 수를 한눈에</strong> 보여줄 때 써요.
          뉴스에서 “사람 모양 1개 = 100만 명”처럼 그림으로 인구를 그리는 것도 그림그래프예요.
        </p>
      </SectionCard>
      <SectionCard title="직접 만들어 보기">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <BarChartBuilder />
        </InteractiveErrorBoundary>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          막대를 그림이라고 상상해 봐요. 막대 길이만큼 그림 개수를 그리면 그림그래프가 돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
