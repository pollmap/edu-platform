import { notFound } from 'next/navigation';
import { TrigExpLogDerivativeExplorer } from '@/components/interactive/math/highschool/TrigExpLogDerivativeExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-CA2-03';

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
          삼각·지수·로그 함수의 도함수는 <strong>「외워 두면 모든 곳에서 바로 쓰이는 만능 카드」</strong>예요.
          미적분Ⅰ의 다항함수 미분에서 한 단계 확장. 단, eˣ만은 자기 자신을 도함수로 갖는 특이한 함수예요.
          이 5가지 공식이 거의 모든 응용의 기초가 됩니다.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5가지 도함수">
        <p>
          ① <strong>(sin x)&apos; = cos x</strong>, ② <strong>(cos x)&apos; = −sin x</strong> (부호 주의!),
          ③ <strong>(tan x)&apos; = sec²x = 1/cos²x</strong> (cos x = 0인 곳은 정의되지 않음),
          ④ <strong>(eˣ)&apos; = eˣ</strong> (자기 자신!), ⑤ <strong>(ln x)&apos; = 1/x</strong> (x {`>`} 0).
          이 5개에 합성·곱·몫 법칙을 더하면 거의 모든 함수의 미분을 처리할 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「(cos x)&apos; = sin x」 — 부호가 반대예요. 마이너스 sin x.
          ❌ 「(eˣ)&apos; = xeˣ⁻¹」 — 다항식 미분 공식과 헷갈리면 안 돼요. eˣ는 「지수가 변수」.
          ❌ 「(ln x)&apos; = 1/x는 모든 x에서 성립」 — ln의 정의역은 x {`>`} 0. 음수에서는 성립하지 않아요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          진동(sin), 인구·이자(eˣ), 정보량(ln) — 자연 현상을 모델링하는 핵심 함수예요.
          버튼으로 5가지를 비교해 보세요. 빨간 도함수 곡선이 파란 원함수와 어떻게 관련되는지 직관이 자라납니다.
          예) sin → cos는 90° 왼쪽으로 평행이동한 같은 모양. eˣ → eˣ는 완전히 같은 곡선.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TrigExpLogDerivativeExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
