import { notFound } from 'next/navigation';
import { RiemannSumExplorer } from '@/components/interactive/math/highschool/RiemannSumExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA1-06';

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
          정적분은 <strong>「곡선 아래 면적을 무한히 잘게 잘라 더한 극한」</strong>이에요.
          구간을 n조각으로 자르고 직사각형들의 합 (리만합)을 구한 뒤, n을 무한대로 보내면
          정확한 면적 = 정적분 값이 돼요. 이게 「구분구적법」의 정확한 의미.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 리만합 → 정적분">
        <p>
          구간 [a, b]를 n등분 (Δx = (b−a)/n)하고 각 구간의 대표점에서 함숫값에 Δx를 곱해 더해요.
          대표점 잡는 방식 (왼쪽 끝·오른쪽 끝·중점)에 따라 부분 결과가 달라지지만, n → ∞이면 모두 같은 값으로 수렴.
          이 극한이 <strong>∫ₐᵇ f(x) dx (정적분)</strong>이에요.
          미적분 기본정리: ∫ₐᵇ f(x) dx = F(b) − F(a) (F는 f의 부정적분) — 이게 미분과 적분이 역연산임을 증명.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "정적분은 항상 면적이다" — f(x) &lt; 0인 부분은 음수로 더해져요. 면적이 아니라 「부호 있는 면적」.
          ❌ "리만합 = 정적분" — 리만합은 근사, 극한이 정적분.
          ❌ "정적분 = 부정적분" — 부정적분은 함수, 정적분은 수.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          속도-시간 그래프 아래 면적 = 이동거리, 일률-시간 그래프 아래 면적 = 일량.
          수능 미적분에서 정적분의 기하적 의미·치환적분·부분적분 모두 매년 출제 영역.
          분할 수 n을 2에서 120까지 키워 가며 리만합이 참값 8/3에 어떻게 가까워지는지 직접 확인하세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <RiemannSumExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
