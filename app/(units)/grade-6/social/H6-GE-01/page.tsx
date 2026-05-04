import { notFound } from 'next/navigation';
import { WorldContinentExplorer } from '@/components/interactive/social/WorldContinentExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H6-GE-01';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel === 'highschool' || unit.grade === undefined) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          {
            label: `${GRADE_LABEL[unit.grade]} / ${SUBJECT_LABEL[unit.subject]}`,
            href: `/grade-${unit.grade}/${unit.subject}`,
          },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          지구의 육지는 크게 <strong>6개 대륙(아시아·아프리카·유럽·북아메리카·남아메리카·오세아니아)</strong>
          로 나뉘고, 바다는 5대양(태평양·대서양·인도양·북극해·남극해)으로 나뉘어요. 각 대륙·바다는
          크기·기후·문화가 다 달라요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 왜 이렇게 나뉘었을까">
        <p>
          지구 위 땅은 한 덩어리가 아니라 거대한 판들 위에 있어요. 아주 오랜 시간 그 판들이 움직이면서
          오늘날의 6대륙 모양이 만들어졌어요. 그래서 대륙마다 산맥·기후·식생이 매우 다릅니다.
        </p>
        <p>
          가장 큰 대륙은 <strong>아시아</strong>(전체 육지의 약 30%)이고, 가장 작은 대륙은
          <strong> 오세아니아</strong>예요. 인구는 아시아가 압도적으로 많아 세계 전체의 약 60% 가까이
          살아요. 반면 오세아니아는 1%도 되지 않아요.
        </p>
        <p>
          나라는 약 200개 가까이 있어요. 면적이 가장 큰 나라는 <strong>러시아</strong>, 인구가 가장 많은
          나라는 <strong>인도와 중국</strong>이에요. 작은 섬나라부터 거대한 대륙 국가까지 모양과 크기가
          다양합니다.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「유럽은 아시아와 다른 큰 덩어리」. → 사실 유럽과 아시아는 한
            덩어리(유라시아 대륙)예요. 문화·역사 차이로 「대륙」을 따로 셀 뿐이에요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「아프리카 = 사막뿐」. → 아프리카는 적도부터 지중해까지 다양해요.
            열대우림(콩고)·초원(사바나)·사막(사하라)·온대 기후(남아공) 모두 있어요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「북극은 대륙」. → 북극은 거대한 「얼음 바다(북극해)」예요. 남극은
            얼음 아래 진짜 대륙이지만요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 세계 이야기">
        <p>
          식탁의 음식은 세계 여행자들이에요. 바나나는 중남미·동남아시아에서, 커피는 아프리카·중남미에서,
          밀은 북아메리카·유럽에서 와요. 우리가 매일 먹는 한 끼에도 6대륙이 같이 들어 있는 셈이에요.
        </p>
        <p>
          여행·교환학생·스포츠 대회·국제 회의도 모두 「대륙·나라가 다른 사람들이 만나는」 일이에요.
          그래서 다른 나라의 문화·인사·예절을 알아 두면 만남이 부드러워집니다.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <WorldContinentExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
