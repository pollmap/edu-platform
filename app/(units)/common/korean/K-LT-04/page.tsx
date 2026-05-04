import { notFound } from 'next/navigation';
import { NarratorPerspectiveExplorer } from '@/components/interactive/korean/NarratorPerspectiveExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-LT-04';

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
          { label: `학년 공통 / ${SUBJECT_LABEL[unit.subject]}`, href: `/common/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          시점은 <strong>이야기를 누가, 어떻게 들려주는가</strong>를 정해요. 같은 사건이라도 시점에 따라 독자가 받는 인상이 완전히 달라져요.
        </p>
      </SectionCard>
      <SectionCard title="네 가지 시점">
        <p>
          ① <strong>1인칭 주인공 시점</strong>: 주인공인 "나"가 이야기. 내면이 가장 가까이.
          ② <strong>1인칭 관찰자 시점</strong>: 주인공 옆 인물이 "나"로 관찰. 거리감이 있어요.
          ③ <strong>3인칭 관찰자 시점</strong>: 외부인이 행동만 보고함. 마음은 추측만.
          ④ <strong>3인칭 전지적 시점</strong>: 모든 인물의 마음을 다 아는 신적 시점.
          작가는 작품에 맞는 시점을 골라요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "1인칭 = 주인공" — 1인칭 관찰자도 있어요. "나"가 주변 인물을 관찰만 해요.
          ❌ "전지적 시점이 항상 좋다" — 너무 다 보여주면 긴장감이 떨어져요. 미스터리는 보통 1인칭이나 제한된 3인칭.
          ❌ "시점은 중간에 못 바꾼다" — 현대 소설은 장(chapter)마다 시점을 바꾸기도 해요. 고급 기법이지만 가능해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활 속 시점">
        <p>
          영화·드라마에서도 시점이 보여요. 카메라가 한 인물의 눈으로 따라가면 그 인물의 1인칭에 가까워요.
          글을 쓸 때 시점을 정하면 어조와 정보 공개 속도가 자동으로 정해져요. 일기는 1인칭, 신문 기사는 3인칭 관찰자가 자연스러워요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <NarratorPerspectiveExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
