import { notFound } from 'next/navigation';
import { PolygonInteriorAngleExplorer } from '@/components/interactive/math/PolygonInteriorAngleExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M7-GM-03';

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
          <strong>n각형의 내각합 = (n − 2) × 180°</strong>. 변이 늘어날수록 내각합도 180°씩 일정하게 늘어나요.
          반면 <strong>외각의 합은 어떤 다각형이든 항상 360°</strong>로 변하지 않아요.
        </p>
      </SectionCard>
      <SectionCard title="왜 (n − 2) × 180일까">
        <p>
          한 꼭짓점에서 다른 꼭짓점으로 대각선을 그어 보세요. n각형은
          <strong> (n − 2)개의 삼각형</strong>으로 깔끔하게 쪼개져요. 삼각형 한 개의 내각합은 180°이니,
          쪼개진 (n − 2)개의 삼각형 내각을 모두 더하면 자연스럽게 (n − 2) × 180°가 돼요.
        </p>
        <p>
          외각합이 360°인 이유는 더 직관적이에요. 다각형 둘레를 한 바퀴 도는 동안, 진행 방향이 한 바퀴(360°) 돌아오는 거예요.
          그래서 변이 3개든 100개든 외각의 합은 항상 360°.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>"오목 다각형은 공식이 안 통한다"</strong> — 일반 볼록 다각형 기준 공식이지만, 단순 다각형(자기 교차 없음)이면
            오목해도 (n − 2) × 180° 공식이 성립해요.
          </li>
          <li>
            <strong>"정n각형이어야 한 내각이 같다"</strong> — 맞아요. 일반 다각형은 한 각씩 다를 수 있어요.
            <strong>정n각형의 한 내각 = (n − 2) × 180° ÷ n</strong>.
          </li>
          <li>
            <strong>"외각합도 변에 따라 달라진다"</strong> — 아니에요. <strong>항상 360°</strong>입니다. 이건 외워둬요.
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 다각형 각">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          벌집은 정육각형이라 한 내각이 정확히 120°. 세 개의 셀이 한 점에서 정확히 360°로 모이기 때문에 빈틈 없이 채울 수 있어요.
          축구공은 정오각형 12개 + 정육각형 20개로 만들어진 절단정이십면체(트렁케이티드 이코사헤드론)예요.
          교통표지판도 다각형 종류에 따라 의미가 달라요(예: 정팔각형 멈춤 표지).
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PolygonInteriorAngleExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
