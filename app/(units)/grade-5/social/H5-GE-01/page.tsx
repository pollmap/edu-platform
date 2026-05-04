import { notFound } from 'next/navigation';
import { KoreaTerritoryExplorer } from '@/components/interactive/social/KoreaTerritoryExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H5-GE-01';

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
          우리나라가 지구 위 어디에 있는지를 두 가지 방법으로 말할 수 있어요. 숫자로 정확히 짚는
          <strong> 수리적 위치(위도·경도)</strong>, 그리고 주변과의 관계로 표현하는
          <strong> 지리적 위치(반도·대륙·바다)</strong>예요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 왜 알아야 해">
        <p>
          한반도는 <strong>북위 33°~43°, 동경 124°~132°</strong> 사이에 있어요. 위도는 추위·더위(기후)에,
          경도는 시간대에 영향을 줘요. 같은 위도 안에서도 동쪽에 있는 우리나라는 일본보다 일출이 조금
          이르고, 영국보다 9시간 빨라요.
        </p>
        <p>
          또 한반도는 <strong>유라시아 대륙 동쪽 끝, 삼면이 바다인 반도</strong>예요. 이 위치는 옛날부터
          대륙으로 가는 통로이자 바다로 나가는 길목이었어요. 그래서 다른 나라와 영향을 많이 주고받았습니다.
        </p>
        <p>
          나라의 영역은 <strong>영토(땅) + 영해(바다) + 영공(하늘)</strong>로 이루어져요. 영해는 보통
          해안선에서 12해리(약 22km), 영공은 영토와 영해 위 공중까지가 일반적입니다. 독도·마라도 같은
          섬도 우리 영토에 포함돼요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「한반도 = 남한」 이라고 생각하기. → 한반도는 남한·북한 모두를
            포함한 땅 모양이에요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「영해 = 모든 바다」 라고 생각하기. → 영해는 해안선 가까운
            정해진 범위까지예요. 그 바깥은 공해(누구나 다닐 수 있는 바다)에 가까워요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「위도가 같으면 기후도 같다」. → 비슷하지만 같지 않아요. 바다와의
            거리·산맥·해류에 따라 같은 위도에서도 기후가 달라집니다.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 위치 이야기">
        <p>
          비행기 표를 사면 <strong>출발지·도착지의 위경도</strong> 차이로 비행 시간이 정해지고, 시차가
          생겨요. 인천 → 뉴욕은 약 14시간, 인천 → 도쿄는 2시간이에요. 위치는 「몇 시에 출발하고 도착할지」
          를 결정하는 실용 정보입니다.
        </p>
        <p>
          한반도가 반도라는 사실 덕분에 <strong>항구 도시(부산·인천·울산)</strong>가 무역의 중심이 돼요.
          원유·반도체 수출입은 대부분 바다로 오갑니다.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <KoreaTerritoryExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
