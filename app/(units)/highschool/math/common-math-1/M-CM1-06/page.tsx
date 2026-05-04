import { notFound } from 'next/navigation';
import { QuadraticFunctionExplorer } from '@/components/interactive/math/QuadraticFunctionExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CM1-06';

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
          이차함수의 심화는 <strong>꼭짓점·축·평행이동·범위 제한</strong>을 한 묶음으로 다뤄요.
          중3에서 만난 y = a(x − p)² + q 의 「표준형」을 도구로 쓰며, 어떤 구간에서 최댓값·최솟값이 나오는지를 묻는 문제가 핵심이에요.
        </p>
      </SectionCard>

      <SectionCard title="핵심 — 표준형과 구간 최적화">
        <p>
          y = ax² + bx + c 를 평방완성하면 y = a(x + b/2a)² + (c − b²/4a). 꼭짓점 (−b/2a, c − b²/4a) 가 보여요.<br />
          a &gt; 0 이면 꼭짓점이 최솟값, a &lt; 0 이면 최댓값.<br />
          제한 구간 [α, β] 에서의 최댓값·최솟값은 「꼭짓점이 구간 안인지 / 양 끝값을 비교할 건지」 두 경우로 나뉘어요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「최댓값은 꼭짓점에서」를 무조건 — 구간 제한이 있으면 끝점이 최댓값일 수도 있어요.<br />
          ❌ 평방완성 부호 실수 — y = ax² + bx + c → a 가 음수일 때 x 항 부호가 뒤집힙니다.<br />
          ❌ 평행이동 방향 헷갈림 — y = (x − p)² 는 「x 가 p만큼 오른쪽으로」, y = x² + q 는 「위로 q」.
        </p>
      </SectionCard>

      <SectionCard title="실생활·시험 응용">
        <p>
          이윤이 최대가 되는 가격, 면적이 최대가 되는 변의 길이, 사정 거리 최대화 — 모두 「제한된 범위 내 이차함수의 최댓값」 문제예요.
          수능 공통수학1 에서 「a, b, c 부호 조합으로 그래프 모양 추론」 같은 문제가 단골이고,
          미적분의 도입부에서도 도함수 = 0 이 되는 점이 결국 꼭짓점과 같아요.
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
