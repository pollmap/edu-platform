import { notFound } from 'next/navigation';
import { WaveInterferenceExplorer } from '@/components/interactive/science/highschool/WaveInterferenceExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-PHY-06';

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
          { label: '물리학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          파동은 <strong>"매질이 제자리에서 진동하며 에너지만 전달"</strong>되는 현상이에요.
          빛은 진공도 통과하는 전자기파. 파동이 만나면 더해지고(중첩), 보강·상쇄되면서 무늬를 만들어요.
          이 간섭 현상이 빛의 파동성을 결정적으로 증명한 영의 이중슬릿 실험이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 파장·진동수·간섭">
        <p>
          파동 기본식: v = fλ (속력 = 진동수 × 파장). 빛은 진공에서 c = 3×10⁸ m/s.
          반사·굴절·회절·간섭이 모든 파동의 4대 성질. 이중슬릿에서 무늬 간격 Δy = λL/d.
          파장이 길수록(빨강), 슬릿 좁을수록, 스크린 멀수록 무늬는 넓어져요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "소리가 빠를수록 진동수가 높다" — 진동수는 음의 높낮이. 빠르기는 매질이 결정(공기 ≈ 340 m/s 일정).
          ❌ "두 빛이 만나면 항상 밝아진다" — 위상이 반대면 상쇄되어 어두워져요(소멸 간섭).
          ❌ "빛은 파동일 뿐이다" — 광전효과처럼 입자(광자)성도 동시에 보여요. 이중성.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          무지개·CD 표면 무지갯빛은 모두 회절·간섭 현상. 노이즈 캔슬링 헤드폰은 소음과 반대 위상 음파를 더해 상쇄.
          광섬유 통신은 전반사. 전자레인지는 정상파의 마디·배 위치 때문에 회전판이 필요해요.
          수능 「파동과 정보 통신」 단원의 빛·파동 문제는 거의 매년 출제.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WaveInterferenceExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
