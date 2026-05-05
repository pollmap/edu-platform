import { notFound } from 'next/navigation';
import { WorldHistoryTimeline } from '@/components/interactive/social/WorldHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-WH';

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
          세계사는 <strong>한국사와 따로 흐르지 않아요</strong>. 같은 시기의 동·서양이 어떻게 연결돼 있었는지 보면, 「갑자기 일어난 것 같은 사건」도 큰 그림 속의 한 점으로 자리잡아요.
          이 단원의 핵심은 「한국 ↔ 세계」 시간 동기화예요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 5단계 큰 흐름">
        <p>
          ① <strong>고대 문명(BC 3500~)</strong>: 4대 문명 + 고조선. ② <strong>고전기(BC 500~AD 500)</strong>: 그리스·로마·진한·삼국. ③ <strong>중세(500~1500)</strong>: 이슬람·당·고려·중세 유럽. ④ <strong>근대(1500~1900)</strong>: 대항해·종교개혁·시민혁명·산업혁명·조선 후기·일본 메이지. ⑤ <strong>현대(1900~)</strong>: 두 번의 세계대전·냉전·세계화·디지털 전환.
          단계마다 동·서양에서 동시에 무슨 일이 있었는지 짝지어 보면 흐름이 살아나요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "근대 = 서양 발전, 동양 정체" — 18~19세기 청·일·조선에도 분명한 내재적 변화가 있었어요. 「서양 중심 시각」을 의심하며 읽는 게 중요해요.
          ❌ "세계사 = 인물 외우기" — 시대마다 큰 「제도·기술·사상」의 변화를 잡으면 인물은 그 속에 자연스럽게 배치돼요.
          ❌ "냉전은 끝났다" — 형태가 바뀌었을 뿐, 강대국 간 경쟁은 다른 방식으로 지속되고 있어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 세계사·통합사회 단골: 「산업혁명과 조선 후기 동시기 비교」, 「양차 대전과 한국사」, 「냉전 구조와 한반도」.
          뉴스의 국제 정세도 「20세기 후반의 어떤 흐름의 연장인지」 자리매김해 보면 이해가 깊어져요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WorldHistoryTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
