import { notFound } from 'next/navigation';
import { KoreanModernHistoryTimeline } from '@/components/interactive/social/KoreanModernHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-KH1-03';

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
          1910년 한일합병부터 1945년 광복까지 35년의 일제강점기는 <strong>「식민 지배에 어떻게 저항했고, 그 안에서 어떤 사회·문화가 만들어졌는가」</strong>를 다루는 시기예요.
          저항은 무장 투쟁·외교 활동·문화·사회 운동까지 다양한 갈래로 펼쳐졌어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 저항의 네 갈래">
        <p>
          ① <strong>3·1 운동(1919)</strong>: 비폭력 만세 운동의 정점. 임시정부 수립의 직접적 계기.
          ② <strong>임시정부·외교</strong>: 상해 임시정부, 연해주·미주 활동. 광복군 창설(1940).
          ③ <strong>무장 독립투쟁</strong>: 봉오동·청산리 전투(1920), 의열단·한인애국단의 의거.
          ④ <strong>문화·사회 운동</strong>: 신간회(1927), 물산장려운동, 형평운동, 농민·노동 운동.
          식민 통치 방식도 무단(1910s) → 문화통치(1920s) → 민족말살(1930~40s)로 변했고, 저항도 그에 맞춰 진화했어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "독립운동 = 일부 영웅 이야기" — 노동자 파업, 형평운동, 농민 항쟁 같은 일상의 저항이 함께 있었어요.
          ❌ "문화통치 = 관대한 통치" — 명칭만 바뀌었을 뿐, 친일파 양성·민족 분열 정책이 강화된 시기였어요.
          ❌ "강점기 = 모두가 저항" — 협력자도 있었고, 생계와 저항 사이에서 갈등하는 평범한 사람들의 일상이 대다수였어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 한국사 단골: 「3·1 운동의 영향」, 「의열단·한인애국단 비교」, 「민족말살 통치의 구체적 정책」.
          광복 직후 분단의 배경을 이해하려면 강점기 마지막 10년의 국제 정세(중·일 전쟁, 태평양 전쟁)도 함께 보면 좋아요.
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
