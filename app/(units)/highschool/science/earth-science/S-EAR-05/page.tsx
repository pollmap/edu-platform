import { notFound } from 'next/navigation';
import { EarthquakeWaveSimulator } from '@/components/interactive/science/EarthquakeWaveSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-EAR-05';

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
          { label: '지구과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          지진이 났을 때 「긴급재난문자」가 큰 흔들림보다 먼저 도달할 수 있는 이유는 <strong>P파가 S파보다 빠르기 때문</strong>이에요.
          이 시간차로 진앙 거리·규모를 계산하고, 단 몇 초의 골든타임을 만들어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — P·S파·진도 vs 규모·태풍">
        <p>
          P파(종파, ~6 km/s)는 모든 매질(고체·액체·기체)을 통과. S파(횡파, ~3.5 km/s)는 고체만 통과 → 외핵이 액체임을 알려준 결정적 단서.
          진앙 거리 Δ = (Vp·Vs)/(Vp − Vs) × ΔtPS. 「규모(M)」는 지진 자체 크기, 「진도」는 위치별 흔들림 정도 — 다른 개념.
          태풍은 적도 부근 따뜻한 바다(SST 26.5℃ 이상)에서 발생, 코리올리 효과로 회전. 한반도 통과 경로는 보통 「북서 → 북동」.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "규모 7.0이면 6.0보다 1.16배 강하다" — 로그 스케일. 실제는 32배 에너지.<br />
          ❌ "S파가 P파보다 위험하다" — 진폭은 S파가 크지만, P파가 먼저 도달하므로 「조기경보」 핵심.<br />
          ❌ "한국은 지진 안전지대" — 2016 경주 5.8, 2017 포항 5.4 — 한반도도 활성단층 다수.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          긴급재난문자(기상청 KEEWS) 시스템 — P파 감지 후 진원 위치 계산 → 큰 흔들림 도달 전 송출. 일본 신칸센은 P파 감지 시 자동 정차.
          수능 지구과학Ⅰ 「자연재해」 단원은 매년 2~3문항. P-S 시간차 계산 + 진앙 작도가 ★ 핵심.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <EarthquakeWaveSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
