import { notFound } from 'next/navigation';
import { KoreanModernHistoryTimeline } from '@/components/interactive/social/KoreanModernHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-KH1-02';

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
          1876년 강화도조약부터 1910년 국권 피탈까지 약 35년은 <strong>「근대 국민국가를 어떻게 세울 것인가」</strong>를 둘러싼 격동의 시기였어요.
          위정척사·개화·동학·독립협회·대한제국 — 같은 문제에 서로 다른 답을 들고 등장한 흐름들이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 네 갈래의 답">
        <p>
          ① <strong>위정척사파</strong>: 유교적 질서 보존, 외세 배척. ② <strong>개화파</strong>: 일본·서양 모델로 근대화. 갑신정변(1884)·갑오개혁(1894).
          ③ <strong>동학·민중</strong>: 안에서부터 민중이 주체가 된 변혁. 동학농민운동(1894).
          ④ <strong>독립협회·대한제국</strong>: 독립문·만민공동회로 시민 의식 성장, 광무개혁으로 황제 중심 근대화 시도.
          이 네 흐름은 서로 갈등하고 협력하며 근대로 가는 길을 모색했어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "개화파가 옳고 위정척사파가 틀렸다" — 둘 다 시대 진단의 한 축이었어요. 「자주적 근대화 vs 외세 의존」 둘 사이의 균형이 어려웠던 거예요.
          ❌ "동학은 미신적 운동" — 동학은 평등·민본의 사상 운동이자 농민의 자치 시도이기도 했어요.
          ❌ "갑신정변은 단순한 친일 쿠데타" — 신분제 폐지·내각제 등 근대적 강령을 담았지만, 일본에 의존하면서 민중과 단절된 한계가 있었어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능에서는 「갑오개혁 vs 광무개혁의 차이」, 「동학과 독립협회의 공통점·차이점」 같은 비교 문제가 자주 나와요.
          단순 연도 암기보다 각 흐름이 「누가·왜·무엇을」 추구했는지를 묶어서 정리하면 응용 문제에도 강해져요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreanModernHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
