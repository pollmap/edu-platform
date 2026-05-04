import { notFound } from 'next/navigation';
import { UnitCircleExplorer } from '@/components/interactive/math/highschool/UnitCircleExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AL-03';

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
          삼각함수의 정의는 <strong>「반지름 1인 원 위 한 점의 좌표」</strong>예요.
          중학교에서 배운 「직각삼각형의 변의 비」를 일반각 (음수·360°초과)까지 확장한 게 단위원 정의.
          이 한 그림에서 sin, cos, tan, 사분면별 부호, 항등식까지 전부 읽어낼 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 단위원과 sin·cos·tan">
        <p>
          단위원 위의 점 P (cos θ, sin θ)에서 <strong>x좌표 = cos θ, y좌표 = sin θ</strong>.
          tan θ = sin θ / cos θ는 직선의 기울기를 의미해요.
          모든 항등식의 출발점인 sin²θ + cos²θ = 1은 「반지름 = 1」의 피타고라스 정리예요.
          사분면별 부호 (I: +,+ / II: −,+ / III: −,− / IV: +,−)는 좌표의 부호 그대로.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "삼각함수는 직각삼각형에서만 쓴다" — 단위원 정의로 일반각 모두에 적용돼요.
          ❌ "θ가 90°면 tan θ도 정의된다" — cos 90° = 0이라 tan 90°는 정의되지 않아요.
          ❌ "(sin θ)²와 sin θ²는 같다" — 다릅니다. 보통 sin²θ는 (sin θ)²의 약식 표기.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          교류전류·소리·빛의 파동·용수철 진동 — 모두 sin·cos로 표현돼요.
          수능 「대수」 삼각함수 단원의 절반 이상이 단위원에서 좌표를 정확히 읽는 문제예요.
          0°, 30°, 45°, 60°, 90°의 sin·cos 값은 외워 두면 시험에서 시간이 절약돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <UnitCircleExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
