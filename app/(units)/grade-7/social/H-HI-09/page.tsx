import { notFound } from 'next/navigation';
import { WorldHistoryTimeline } from '@/components/interactive/social/WorldHistoryTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H-HI-09';

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
          한국사를 잘 이해하려면 「<strong>같은 시기에 다른 곳에서 무슨 일이 벌어졌나</strong>」를 같이 봐야 해요. 세계사
          통사는 한국사라는 한 줄을 「세계라는 큰 무대 위의 한 줄」로 다시 보여주는 단원이에요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 시대 단위로 묶어 보기">
        <p>
          <strong>고대(BC 3000~AD 500)</strong>는 4대 문명의 형성, 그리스·로마, 중국 진·한, 인도 마우리아·굽타 같은
          큰 문명들이 자리잡는 시기예요. 한반도에서는 고조선이 청동기·철기 사회로 자리잡고 삼국 시대로 이어져요.
        </p>
        <p>
          <strong>중세(500~1500)</strong>는 동·서로마의 분리 이후 유럽이 봉건제와 기독교 중심으로 묶이고, 중국에서는
          당·송·원·명이, 이슬람권은 우마이야·압바스 칼리프국이 등장해요. 한반도에서는 통일 신라 → 고려 → 조선 초기로
          이어지고, 이 시기에 동아시아·이슬람·유럽 사이 교류(실크로드, 몽골 제국)가 활발했어요.
        </p>
        <p>
          <strong>근대(1500~1900)</strong>는 대항해 시대·종교 개혁·과학 혁명·산업 혁명·시민 혁명·국민국가 형성이 차례로
          진행되며 세계사의 중심이 빠르게 이동해요. 한반도는 조선 후기 사회 변동과 19세기 말 개항·국권 침탈을 겪어요.
        </p>
        <p>
          <strong>현대(1900~ )</strong>는 두 차례의 세계 대전, 냉전, 탈냉전, 세계화, 정보 혁명, 기후 위기 같은 사건이
          이어져요. 한반도의 광복·분단·전쟁·산업화·민주화는 모두 이 큰 흐름과 깊이 연결돼 있어요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「세계사는 서양사」 → 동아시아·이슬람·아프리카·아메리카가 함께 있어야 「세계」사예요.
            특정 지역만 강조하는 시각은 균형이 깨진 시각이에요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「과거의 사건은 단순한 사실 나열」 → 같은 사건도 누가 어디서 보느냐에 따라 의미가
            달라질 수 있어요. 사실(事實)과 해석(解釋)을 구분해서 읽는 습관이 필요해요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「세계사와 한국사는 따로 떨어진 이야기」 → 거의 모든 한국사 사건은 동아시아·세계의
            흐름과 같이 움직였어요. 「내 동네 + 그 시간 동안 세계」를 같이 보면 더 또렷이 보여요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 세계사의 흔적">
        <p>
          내가 쓰는 시간 단위(60분·24시간·7요일), 한자·알파벳, 인도-아라비아 숫자, 종교 명절, 음식 이름 등은 모두 세계사
          여러 문명의 흔적이에요. 「세계는 한 번도 단절된 적 없는 큰 그물」이라는 감각으로 보면 사회 시간이 더 흥미로워져요.
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
