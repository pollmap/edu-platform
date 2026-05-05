import { notFound } from 'next/navigation';
import { PostwarKoreaTimeline } from '@/components/interactive/social/PostwarKoreaTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H-HI-08';

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
          1945년 광복부터 오늘날까지, 약 80년 동안 대한민국은 「<strong>분단 → 전쟁 → 산업화 → 민주화 → 정보화</strong>」의
          큰 흐름을 거쳐 왔어요. 그 어떤 단계도 자동으로 굴러간 적이 없어요. 매 단계 사람들의 선택과 갈등이 쌓여 만든
          결과예요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 5단계로 보는 현대사">
        <p>
          <strong>① 정부 수립과 한국 전쟁(1948~1953)</strong>. 5·10 총선 → 헌법 제정 → 정부 수립이 1948년의 흐름이고,
          1950년 한국 전쟁이 발발해 약 200만 명 이상의 인명 피해를 남기고 1953년 정전됐어요. 분단은 이때 사실상 굳어졌어요.
        </p>
        <p>
          <strong>② 4·19 혁명과 민주화의 첫 시도(1960)</strong>. 학생·시민이 부정 선거에 저항해 정권을 교체했어요. 한국
          현대사에서 시민 저항이 정치 변동을 만든 첫 사례예요. 그러나 이듬해 5·16(1961)으로 군부가 정권을 잡으면서
          긴 권위주의 시기가 시작돼요.
        </p>
        <p>
          <strong>③ 산업화의 시기(1960~70년대)</strong>. 정부 주도의 경제 개발 5개년 계획, 수출 중심 산업화로 한국은
          농업 사회에서 공업 사회로 빠르게 이동해요. 동시에 노동·인권 문제, 도시 빈민 문제도 함께 커져요. 「압축 성장」은
          빛과 그림자가 함께 있는 단어예요.
        </p>
        <p>
          <strong>④ 민주화 운동과 6월 항쟁(1980년대)</strong>. 1980년 5·18 광주 민주화 운동, 1987년 6월 항쟁을 거쳐
          대통령 직선제 개헌(9차 개헌)이 이뤄졌어요. 시민이 자신의 손으로 대통령을 뽑는 시대가 시작된 것이에요.
        </p>
        <p>
          <strong>⑤ 정보화·세계화(1990년대~현재)</strong>. IMF 외환위기(1997), 인터넷 보급, 한류, 글로벌 기업의 부상,
          저출생·고령화·양극화 같은 새로운 과제가 함께 등장해요. 「민주화 이후의 민주주의」가 풀어야 할 과제도 같이 늘어나요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「산업화는 정부 한 사람의 결정」 → 정부의 역할이 컸던 것은 사실이지만, 노동자·기업·
            농촌의 변화가 함께 작동한 결과예요. 한 사람의 영웅사가 아니에요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「민주화 = 1987년에 끝났다」 → 6월 항쟁은 매우 중요한 분기점이지만, 그 이후의
            정착·절차 정비·시민 사회 성장이 모두 「민주화의 일부」예요. 끝난 사건이 아니라 진행 중인 과정.
          </li>
          <li>
            <strong>오개념 3.</strong> 「IMF 외환위기는 단순한 외부 충격」 → 글로벌 금융 흐름과 함께 국내 기업 부채·금융
            감독 문제도 같이 작동했어요. 한 가지 원인의 사건이 아니에요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 현대사의 흔적">
        <p>
          광주 5·18 민주묘지, 서울 시청 광장, 거리의 공휴일 풍경(현충일·6월 항쟁 기념일·한글날 등)은 현대사의 자취예요.
          가족 안에 「전쟁 세대 - 산업화 세대 - 민주화 세대 - 정보화 세대」가 함께 있다는 것 자체가 80년 한국 현대사의
          압축이에요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <PostwarKoreaTimeline />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
