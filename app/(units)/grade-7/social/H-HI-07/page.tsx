import { notFound } from 'next/navigation';
import { IndependenceMovementExplorer } from '@/components/interactive/social/IndependenceMovementExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H-HI-07';

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
          1910년부터 1945년까지의 35년간, 한반도는 일본의 식민 지배 아래 있었어요. 그 안에서 「<strong>독립을 되찾기 위한
          여러 갈래의 운동</strong>」이 동시에 진행됐어요. 한 가지 길이 아니라 국내·국외·무장·문화 등 여러 길이 함께
          움직인 시기예요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 4 갈래의 독립운동">
        <p>
          <strong>국내 운동</strong>은 합법·비합법을 넘나들며 진행됐어요. 1919년 <strong>3·1 운동</strong>은 약 두 달간
          전국에서 200만 명 이상이 참가한 것으로 추산되는 평화 시위였고, 이 운동은 곧 임시정부 수립의 동력이 됐어요.
          1929년 <strong>광주 학생 항일 운동</strong>은 학생층의 조직된 저항으로 전국으로 확산됐어요.
        </p>
        <p>
          <strong>국외·임시정부</strong> 흐름은 1919년 상하이에서 시작돼요. 한국사 최초의 민주공화제 정부인 대한민국 임시
          정부가 수립됐고, 광복 직전에는 충칭에서 한국광복군(1940)이 정규군 형태로 활동해요. <strong>무장 독립운동</strong>은
          만주·연해주를 무대로 했어요. 1920년 봉오동·청산리 전투의 승리가 대표적이고, 이후 한·중 연합 부대 형태로 이어져요.
          <strong>문화·교육 운동</strong>으로는 조선어학회의 한글 맞춤법 통일안(1933), 신간회의 합법 운동(1927~1931),
          민립대학 설립 운동, 물산 장려 운동 같은 흐름이 있어요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「독립운동 = 무장 투쟁만」 → 무장 독립운동은 한 갈래일 뿐이에요. 학생·문인·교사·종교
            지도자·해외 동포 등 매우 다양한 사람들이 다양한 방식으로 참여했어요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「3·1 운동은 실패한 운동」 → 즉시 독립이 이뤄지지는 않았지만, 임시정부 수립과 일제
            통치 방식의 변화(이른바 「문화 통치」), 비폭력 저항의 국제적 모범 같은 큰 결과를 만든 운동이에요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「임시정부는 활동이 미미했다」 → 군사력·재정에서 어려움은 있었지만, 헌법 제정·외교
            활동·광복군 운영 등 망명 정부로서 할 수 있는 활동을 폭넓게 수행했어요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 이 시기의 흔적">
        <p>
          서대문 형무소 역사관, 천안 독립기념관, 광주의 옛 광주역 일대, 임시정부 청사가 있던 상하이 마당로 등은 모두 이
          시기의 자취예요. 매년 3월 1일 공휴일은 3·1 운동을, 8월 15일은 광복을, 11월 17일 「순국선열의 날」은 독립운동에서
          희생된 분들을 기리는 날이에요. 이런 기념일은 단순한 휴일이 아니라 「기억」의 장치예요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <IndependenceMovementExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
