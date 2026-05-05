import { notFound } from 'next/navigation';
import { TrigRatioExplorer } from '@/components/interactive/math/TrigRatioExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'M9-GM-01';

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
          직각삼각형에서 한 예각 θ를 정하면 세 변의 비가 자동으로 결정돼요. 이 비를{' '}
          <strong>sin θ, cos θ, tan θ</strong>라고 불러요. 각도만 알면 변의 비를 알고, 변의 비로부터 각도도 알 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="sin·cos·tan 정의">
        <p>
          직각삼각형에서 각 θ에 대해:
        </p>
        <ul className="list-disc pl-5 space-y-1 font-mono text-sm">
          <li>sin θ = (대변) / (빗변) — θ의 맞은편 변과 빗변의 비</li>
          <li>cos θ = (밑변) / (빗변) — θ에 붙은 변과 빗변의 비</li>
          <li>tan θ = (대변) / (밑변) = sin θ / cos θ</li>
        </ul>
        <p>
          단위원(반지름 1)에서 보면 빗변이 1이라 sin θ는 점의 y좌표, cos θ는 x좌표가 돼요. 이게 고1 삼각함수의 출발점.
        </p>
      </SectionCard>
      <SectionCard title="특수각 외우기">
        <p>
          30°·45°·60°는 자주 나와서 외워두는 게 좋아요.
        </p>
        <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
          <li>30°: sin=1/2, cos=√3/2, tan=1/√3</li>
          <li>45°: sin=cos=√2/2, tan=1</li>
          <li>60°: sin=√3/2, cos=1/2, tan=√3</li>
        </ul>
        <p>
          0°·90°: sin은 0→1, cos은 1→0으로 변해요. tan은 90°에 가까워질수록 무한대로 커져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>"sin은 항상 빗변/대변"</strong> — 반대예요. sin = 대변/빗변. 외울 때 "사이코사이"(sin=대/빗, cos=밑/빗) 같은 암기법 활용.</li>
          <li><strong>"각이 2배면 sin도 2배"</strong> — 비례 관계가 아니에요. sin 30°=0.5인데 sin 60°=0.866. 2배 아님.</li>
          <li><strong>"삼각비는 직각삼각형에서만"</strong> — 일반 삼각형에서도 사인 법칙·코사인 법칙으로 확장돼요(고2).</li>
        </ul>
      </SectionCard>
      <SectionCard title="실생활 속 삼각비">
        <p>
          건물·산의 높이 측정(기준선 길이와 올려본 각으로 tan 계산), GPS·항법, 천문관측, 게임 캐릭터 회전, 음향파의
          분석 — 모두 삼각비예요. 18세기 항해사들은 삼각함수로 별을 보고 위치를 알았어요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TrigRatioExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
