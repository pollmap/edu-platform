import { notFound } from 'next/navigation';
import { StackingCubesExplorer } from '@/components/interactive/math/StackingCubesExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M6-GM-03';

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
          쌓기 나무를 위·앞·옆 세 방향에서 바라본 모양만 보고 원래 입체를 추리해요. 같은 위에서 본 모양이라도 쌓기
          나무 개수는 여러 가지일 수 있어요. <strong>3차원을 2차원 시점으로 분해</strong>하는 훈련이에요.
        </p>
      </SectionCard>
      <SectionCard title="세 방향에서 본 모양">
        <p>
          <strong>위에서 본 모양</strong>은 바닥에 깔린 자리(어느 칸에 나무가 있는지)를 보여줘요.
        </p>
        <p>
          <strong>앞에서 본 모양</strong>과 <strong>옆에서 본 모양</strong>은 각 줄의 가장 높은 층(=실루엣)을 보여줘요.
          그래서 뒤쪽에 숨은 낮은 나무는 앞에서는 안 보일 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"세 방향이 같으면 모양도 하나뿐"</strong> — 같은 세 방향 그림이라도 뒤쪽 자리에 나무를 더 쌓을 수 있어 여러 정답이 나오기도 해요.</li>
          <li><strong>"위에서 본 모양 = 바닥 면적"</strong> — 빈 칸은 0개, 나무가 있는 칸만 색칠돼요. 개수와 다를 수 있어요.</li>
          <li><strong>"앞에서 본 모양은 가장 높은 한 줄"</strong> — 앞에서 보면 각 세로 줄(열)마다 가장 높은 층이 보여요. 한 줄이 아니라 여러 줄의 실루엣이에요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 다시점 표현">
        <p>
          건축 도면(평면도·정면도·측면도), 가구 설명서, 게임 속 미니맵 — 모두 같은 원리예요. 의사가 보는 X-ray·CT
          단면, 지도 위에서 도시 윤곽을 그릴 때도 이 사고가 작동해요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <StackingCubesExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
