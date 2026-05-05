import { notFound } from 'next/navigation';
import { InterKoreanTimeline } from '@/components/interactive/social/InterKoreanTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H6-GE-02';

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
          한반도는 1945년 광복 직후부터 「<strong>두 나라로 나뉜 상태</strong>」가 이어져 왔어요. 통일은 이 분단을 평화롭게
          풀어 가는 긴 과정이고, 「<strong>지구촌 평화</strong>」는 그보다 더 넓은 세계 차원의 노력이에요. 한 가지 사건이
          아니라 오랜 노력의 모음이에요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 분단과 대화의 80년">
        <p>
          1945년 광복 직후 미국과 소련이 38선을 기준으로 한반도를 분할 점령했고, 1948년 두 정부가 따로 수립되면서 분단이
          공식화됐어요. 1950년 한국 전쟁은 이 분단을 더욱 굳혔어요.
        </p>
        <p>
          이후에도 대화는 끊긴 적이 없어요. 1972년 7·4 남북 공동성명, 1985년 이산가족 첫 상봉, 1991년 유엔 동시 가입과
          남북 기본합의서, 2000년 첫 정상회담(6·15 공동선언), 2018년 정상회담 같은 흐름이 이어졌어요. 한편 1994년·2017년
          핵 위기처럼 긴장이 높아진 시기도 함께 있었어요. 「대화 - 긴장」이 번갈아 나타나는 패턴이에요.
        </p>
        <p>
          지구촌 평화는 분단 문제를 넘는 더 큰 그림이에요. 유엔(UN), 유네스코(UNESCO), 국제 적십자, 국경 없는 의사회 같은
          국제 기구가 분쟁 지역의 평화 유지·인도 지원·교육·보건 활동을 해요. 한국도 PKO(평화 유지 활동)에 부대를 보내며
          국제 사회의 한 구성원으로 활동하고 있어요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「통일 = 한 번의 사건」 → 통일은 갑자기 일어나는 사건이 아니라, 교류·신뢰·제도가
            천천히 쌓이는 「과정」으로 이해돼요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「평화 = 전쟁이 없는 상태」 → 「전쟁이 없는」 상태(소극적 평화)와 「갈등의 원인이
            줄어든」 상태(적극적 평화)는 달라요. 정의·인권·복지 같은 조건이 같이 갖춰져야 진짜 평화에 가까워져요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「국제 기구는 한 사람·한 나라가 만든다」 → 유엔·유네스코 같은 기구는 여러 나라가
            합의해서 만든 것이고, 회비·인력도 여러 나라가 나누어 부담해요. 한국도 일부분을 책임지고 있어요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 평화의 흔적">
        <p>
          1월 1일·5월 5일 같은 공휴일과 달리, 6월 25일은 한국 전쟁이 일어난 날을 기억하기 위한 날(6·25일)이에요. 매년
          이산 가족 상봉 행사 뉴스, 학교의 통일 교육 시간, 봉사 활동을 보내는 PKO 부대 뉴스 등이 모두 이 단원의 실생활
          입구예요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <InterKoreanTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
