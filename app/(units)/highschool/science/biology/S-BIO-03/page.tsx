import { notFound } from 'next/navigation';
import { HumanBodySystems } from '@/components/interactive/science/HumanBodySystems';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'S-BIO-03';

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
          { label: '생명과학' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          몸이 외부 환경(폭염·운동·식사)에 흔들려도 <strong>체온 36.5℃·혈당 90 mg/dL·삼투압 일정</strong>으로 유지되는 능력이 「항상성」.
          이걸 신경계(빠름)와 내분비계(느림)가 협력해 「피드백 회로」로 만들어 내요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 음성 피드백·자율신경·호르몬">
        <p>
          뜨거우면 땀, 차면 떨림 — 모두 <strong>시상하부</strong>가 지휘하는 음성 피드백.
          교감신경(긴장·도주)과 부교감신경(이완·소화)이 서로 길항 작용을 해요.
          호르몬은 혈액으로 이동해 표적기관에 작용 — 인슐린(혈당 ↓)·글루카곤(혈당 ↑)이 대표적인 길항 쌍.
          활동전위는 「전부 아니면 전무」 법칙: 역치를 넘으면 같은 크기로 발사, 못 넘으면 안 일어나요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "호르몬이 신경보다 빠르다" — 신경 = 밀리초, 호르몬 = 초~분 단위.<br />
          ❌ "양성 피드백은 절대 일어나지 않는다" — 분만(옥시토신)·혈액응고는 양성 피드백.<br />
          ❌ "인슐린은 당을 만든다" — 반대. 혈당을 세포로 보내 「내려요」.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          당뇨병(인슐린 분비·작용 이상), 갑상샘 항진증, 스트레스성 위염 — 모두 항상성 회로 고장이에요.
          수능 생명과학Ⅰ 「항상성과 몸의 조절」은 매년 4~5문항이 출제되는 최대 단원. 그래프 해석·피드백 회로 그림 분석 필수.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HumanBodySystems />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
