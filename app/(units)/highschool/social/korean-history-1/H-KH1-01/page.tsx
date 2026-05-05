import { notFound } from 'next/navigation';
import { KoreanHistoryTimeline } from '@/components/interactive/social/KoreanHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-KH1-01';

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
          전근대 한국사는 <strong>고조선부터 조선 후기까지 약 4천 년</strong>의 흐름이에요.
          이름은 바뀌어도 한반도라는 공간 위에서 사람들은 끊임없이 농사를 짓고, 외세를 막고, 사상을 다듬어 왔어요.
          큰 줄기를 「선사 → 고대(고조선·삼국·통일신라·발해) → 중세(고려) → 근세(조선)」 4단계로 잡으면 머리가 정리돼요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 시대 구분의 기준">
        <p>
          시대를 가르는 기준은 <strong>지배 계층·생산 양식·국제 질서</strong> 세 가지예요.
          삼국 → 통일신라는 「귀족 중심 골품제」, 고려는 「문벌 귀족 + 무신 + 권문세족」, 조선은 「양반 사대부」로 지배층이 바뀌었어요.
          농경은 점점 정교해지고(이앙법·휴경 → 상품작물), 동아시아 외교는 중국 중심 조공 책봉에서 임진왜란 이후 변동을 겪어요.
          이름 외우기보다 「누가 권력을 쥐었고, 어떻게 먹고살았으며, 누구와 외교했는가」를 잡으면 통합 이해가 가능해요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "신라가 가장 강해서 통일했다" — 신라는 가장 약한 나라에서 출발했고, 외교(나당 연합)와 시기 선택이 결정적이었어요.
          이후 당과의 전쟁(나당전쟁)에서 자주적 통일을 완성했어요.
          ❌ "발해는 한국사가 아니다" — 발해는 고구려 유민이 세웠고 「고려」를 자칭한 사료가 있어요. 한국사의 흐름 속에서 다뤄요.
          ❌ "조선은 정체된 사회였다" — 18세기 후반 실학·상품화폐경제·민중 의식 성장은 분명한 「내재적 발전」이에요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 한국사는 「시대 구분 → 사료 매칭 → 인과 분석」 3단계가 핵심이에요. 사진·지도·도표를 어느 시대에 놓을지부터 결정해야 풀려요.
          공무원·교사·언론사 시험에서도 「조선의 신분제 변화」, 「고려의 정치 기구」 같은 통시적 변화 추적 문제가 단골이에요.
          타임라인을 직접 움직여 보면서 시대별 특징과 인접 시대의 차이를 손에 익혀 보세요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
