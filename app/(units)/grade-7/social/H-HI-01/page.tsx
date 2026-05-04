import { notFound } from 'next/navigation';
import { AncientCivilizationsMap } from '@/components/interactive/social/AncientCivilizationsMap';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H-HI-01';

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
          약 5,000년 전쯤, 큰 강 가에서 사람이 모여 마을 → 도시 → 나라가 되는 「<strong>문명</strong>」이
          시작됐어요. 4대 문명(메소포타미아·이집트·인더스·황허)이 대표적이고, 비슷한 시기 한반도 북쪽에서는
          <strong> 고조선</strong>이 일어났어요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 왜 강 가에서 시작됐을까">
        <p>
          농사에는 물과 기름진 흙이 꼭 필요해요. 큰 강은 둘 다 가져다 줘요. 강이 정기적으로 넘쳤다
          빠지면서 흙에 영양분을 채워 줬거든요. 농사가 안정되니 식량이 쌓이고, 사람이 모이고, 나누어 일을
          맡고, 글자가 만들어지고, 도시가 세워졌어요. 이 과정의 결과물이 「문명」입니다.
        </p>
        <p>
          <strong>메소포타미아 문명</strong>은 티그리스·유프라테스 강 사이에서 시작됐어요. 쐐기 모양의
          글자(설형문자)와 60진법(시간 60분 단위의 뿌리)이 이곳에서 만들어졌어요. 함무라비 법전 같은
          오래된 법도 유명하고요.
        </p>
        <p>
          <strong>이집트 문명</strong>은 나일 강 가에서 자랐어요. 상형문자, 피라미드, 미라(死後 세계
          신앙) 같은 특징이 잘 알려져 있어요. <strong>인도(인더스) 문명</strong>은 모헨조다로처럼 잘 짜인
          계획 도시와 하수도가 인상적이에요. <strong>황허 문명</strong>에서는 갑골문자(점치는 데 쓴 한자
          뿌리)와 청동기 그릇이 만들어졌어요.
        </p>
        <p>
          한편 한반도 북부와 만주 일대에서는 <strong>고조선</strong>이 등장했어요. 단군 건국 이야기는
          신화 형태로 전해지지만, 실제로 청동기·철기 시대에 이 지역에 정치 공동체가 있었다는 것은
          유물·기록을 통해 확인돼요. 「8조법」 중 살인·상해·도둑에 관한 3개 조항이 전해져요. 이는
          공동체에 이미 「법」이 있었다는 증거예요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「문명은 한 사람이 만든 것」. → 문명은 수많은 사람의 농사·기록·
            건축·의식이 오랜 시간 쌓여 만들어진 결과예요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「단군 신화 = 단군이 진짜 1908세까지 살았다」. → 신화는 사실의
            기록이 아니라 그 공동체가 자신의 시작을 어떻게 의미 있게 기억할지를 담은 이야기예요. 사실과
            상징을 구분해서 읽어요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「인더스 문명은 사라져서 인도와 무관」. → 인더스 문명의 사람·문화
            요소 일부는 이후 인도 문명으로 이어졌다고 여겨져요. 「갑자기 끊긴 다른 세계」가 아니에요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 고대 문명의 흔적">
        <p>
          시계의 60분, 각도의 360도는 메소포타미아의 60진법에서 왔어요. 우리가 매일 쓰는 시간 단위가
          5,000년 전 강 가에서 만들어진 셈이에요.
        </p>
        <p>
          한자는 황허 문명의 갑골문자에서 자라났고, 한국·일본·베트남까지 영향을 줬어요. 한국 한자어 어휘는
          이 긴 흐름의 결과예요. 「과거가 멀리 있다」가 아니라 「내 책가방·내 시계 안에 살아 있다」는
          감각으로 보면 더 가깝게 다가와요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <AncientCivilizationsMap />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
