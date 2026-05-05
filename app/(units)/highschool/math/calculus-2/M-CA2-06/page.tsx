import { notFound } from 'next/navigation';
import { IntegrationTechniquesExplorer } from '@/components/interactive/math/highschool/IntegrationTechniquesExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA2-06';

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
          미분에 「곱의 법칙」과 「연쇄법칙」이 있듯, 적분에는 <strong>「부분적분」과 「치환적분」</strong>이 있어요.
          치환적분 = 연쇄법칙의 역방향. 부분적분 = 곱의 미분 공식의 역방향.
          어느 기법을 쓸지 판단하는 것이 첫 단추입니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 두 기법 한 줄 요약">
        <p>
          <strong>치환적분</strong>: ∫f(g(x))·g&apos;(x) dx = ∫f(u) du. 「내부 함수 g(x)를 u로」.
          예) ∫2x cos(x²) dx → u = x², du = 2x dx → ∫cos u du = sin(x²) + C.
          <strong>부분적분</strong>: ∫u dv = uv − ∫v du. 「LIATE 순서」(로그·역삼각·다항·삼각·지수)로 u 선택.
          예) ∫x eˣ dx → u = x, dv = eˣ dx → xeˣ − eˣ + C.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「치환만 하면 모두 풀린다」 — 안쪽 미분 g&apos;(x)가 적분 식 안에 「있어야」 치환적분이 성립.
          ❌ 「부분적분은 한 번만 하면 끝」 — ∫x²eˣ dx처럼 두 번 이상 반복해야 풀리는 경우 많아요.
          ❌ 「LIATE는 절대 법칙」 — 가이드라인일 뿐. 결과가 더 복잡해지면 u를 바꿔 다시 시도.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          확률밀도함수의 적분, 푸리에 변환, 미분방정식 풀이 — 부분적분과 치환적분은 응용 수학의 일상 도구.
          버튼으로 두 기법을 전환하며 예제 문제를 풀어 보세요. 「힌트」를 본 다음 「풀이 보기」로 단계별 전개를 확인하면 패턴이 익혀집니다.
          수능 「미적분Ⅱ」에서는 매년 1문제씩은 부분/치환을 직접 적용하는 문제가 출제돼요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <IntegrationTechniquesExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
