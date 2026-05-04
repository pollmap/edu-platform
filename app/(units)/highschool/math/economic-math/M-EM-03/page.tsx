import { notFound } from 'next/navigation';
import { ElasticityExplorer } from '@/components/interactive/math/highschool/ElasticityExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-EM-03';

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
          { label: '경제 수학', href: '/highschool/math/economic-math' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          수요·공급 곡선은 가격과 수량의 관계 함수예요. <strong>탄력성</strong>은 그 함수가
          「가격 변화에 얼마나 민감한지」를 비율로 측정한 것. 미분의 경제판이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — Eᵈ = |%ΔQ / %ΔP|">
        <p>
          단순 기울기는 단위(원, 개)가 달라 비교가 어려워요. 그래서 「가격이 1% 변할 때 수량이 몇 % 변하나」를 쓰는데
          이게 가격 탄력성 E. |E| &gt; 1이면 「탄력적」(필수재 아님), |E| &lt; 1이면 「비탄력적」(필수재).
          미분으로는 E = (dQ/dP) · (P/Q). 곡선의 기울기 + 현재 점의 비율이 합쳐진 양이에요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「기울기 = 탄력성」 — 두 곡선이 평행해도 점이 다르면 탄력성은 달라요. 「점탄력성」이 정확.
          ❌ 「소금·기름은 항상 비탄력」 — 단기는 비탄력, 장기는 대체재가 늘어 탄력적이 되기도 해요.
          ❌ 「세금을 누가 더 부담하나는 정해져 있다」 — 탄력성이 작은 쪽(덜 민감한 쪽)이 더 부담해요. 정책 분석의 핵심.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          유가 인상이 휘발유 소비에 미치는 영향, 담뱃세 효과, 콘서트 가격 결정, 명품 가격 전략 — 모두 탄력성으로 분석해요.
          경제 수학에서는 「가격이 N% 오르면 수입은 어떻게 변하나」 류 문제가 단골(탄력적이면 가격 인상 시 수입 감소).
          시뮬레이터로 곡선 기울기와 절편을 바꿔 가며 균형점·탄력성이 어떻게 변하는지 익혀 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ElasticityExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
