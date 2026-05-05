import { notFound } from 'next/navigation';
import { KoreanModernHistoryTimeline } from '@/components/interactive/social/KoreanModernHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H-HI-06';

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
          1876년 강화도조약(개항)부터 1910년 한일병합까지, 조선·대한제국이 「<strong>근대 국민국가로 가는 길</strong>」을
          시도했던 시기예요. 안에서 변화를 만들려는 시도와 밖에서 들어온 압력이 부딪히면서 정치·경제·사상이 빠르게 움직여요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 「개항 → 변혁 시도 → 좌절」">
        <p>
          시작은 <strong>1876년 강화도조약</strong>이에요. 일본의 압력으로 부산·원산·인천이 차례로 개항됐고, 이 과정에서
          서양·일본의 제도와 물건이 들어와요. 이후 1880년대에 「개화파」가 등장해 갑신정변(1884)으로 빠른 개혁을 시도하지만
          3일 만에 실패해요. 1894년에는 동학농민운동이 일어나 신분제 폐지·조세 개혁 같은 요구가 분출했고, 이 격동 속에서
          <strong> 갑오개혁(1894~1895)</strong>이 시행돼 신분제·과거제·태형 같은 제도가 사라져요.
        </p>
        <p>
          1896년부터는 <strong>독립협회</strong>가 만민공동회를 열어 의회 도입과 자주 외교를 주장했고, 1897년에는
          고종이 황제로 즉위해 <strong>대한제국</strong>이 선포돼요. 광무개혁으로 도시 정비·근대 산업·외국 자본 도입이
          시도되지만, 1904년 러일전쟁 이후 일본의 영향력이 결정적이 됐고, 을사늑약(1905)을 거쳐 1910년 한일병합으로
          국권이 사라져요. 의병 항쟁·국채보상운동(1907)·신민회(1907) 같은 저항도 이 시기에 활발해요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「개항 = 일본만의 침략」 → 일본의 압력이 결정적이었지만, 그 뒤로 미국·영국·러시아·
            프랑스 등 여러 나라와 차례로 조약을 맺어요. 「만국 외교의 시대」가 시작된 것이에요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「갑오개혁은 일본이 강요한 개혁」 → 일본의 영향이 있었던 것은 사실이지만,
            동학농민운동이 제기한 사회 개혁 요구가 함께 반영된 복합적 성격이에요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「대한제국은 무력했다」 → 광무개혁기에는 도시·통신·교육 분야에서 의미 있는 개혁
            시도가 있었어요. 외부 압력이 결정적이었던 것이지, 내부 시도가 아예 없었던 것은 아니에요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 이 시기의 흔적">
        <p>
          서울 정동의 옛 공사관 거리, 인천·부산·원산의 개항장 풍경, 「독립신문」의 한글 사용 등은 이 시기의 자취예요.
          한자만 쓰던 공식 문서에 한글이 들어오기 시작한 것도 이 시기 변화의 결과예요. 「<em>이름표 한국식 vs 일본식</em>」
          같은 문제도 이 시기 정치 변동과 연결돼요.
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
