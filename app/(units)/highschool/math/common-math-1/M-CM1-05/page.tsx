import { notFound } from 'next/navigation';
import { QuadraticFunctionExplorer } from '@/components/interactive/math/QuadraticFunctionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM1-05';

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
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          이차방정식 <strong>ax² + bx + c = 0</strong> 의 풀이는 인수분해 / 완전제곱(평방완성) / 근의 공식,
          이렇게 세 갈래예요. 풀기 전에 「몇 개의 실근이 있나」를 알려주는 게 <strong>판별식 D = b² − 4ac</strong>.
          그래프로 보면 「포물선이 x축과 몇 번 만나는가」와 정확히 일치해요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 판별식과 근의 분포">
        <p>
          ① D &gt; 0 → 서로 다른 두 실근, x축 두 점에서 만남.<br />
          ② D = 0 → 중근(겹친 한 점), x축에 접함.<br />
          ③ D &lt; 0 → 두 허근, x축과 안 만남.<br />
          근과 계수 관계(<strong>비에타</strong>): α + β = −b/a, αβ = c/a. 근의 부호·합·곱만 알아도 판별식 + 비에타로 식의 모양이 결정돼요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「판별식 음수 = 풀이 불가」 — 실수 범위에선 그렇지만, 복소수 범위에선 항상 두 근(켤레쌍) 이 있어요.<br />
          ❌ 근의 공식에서 부호 실수 — −b ± √D 의 분자, 분모는 2a. a 가 음수면 부호 신호 자체가 바뀌어요.<br />
          ❌ 「α, β 가 실근이라는 가정」을 안 쓰고 비에타 적용 — α + β, αβ 는 D 부호 무관 항상 성립이지만, 「하나는 양·하나는 음」 같은 조건은 D ≥ 0 부터 확인해야 해요.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          물체 낙하·발사 운동(포물선), 손익분기점, 면적 최적화 — 모두 이차방정식 한 줄로 모형화돼요.
          수능에서는 「판별식 + 비에타 + 그래프 위치」가 한 문제 안에서 동시에 묻는 형태가 흔해요.
          아래 그래프에서 b² − 4ac 의 부호와 x축 만남 지점이 동기화되는 걸 직접 확인해 보세요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <QuadraticFunctionExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
