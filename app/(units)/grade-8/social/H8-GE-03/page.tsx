import { notFound } from 'next/navigation';
import { CarbonFootprintExplorer } from '@/components/interactive/social/CarbonFootprintExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H8-GE-03';

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
          환경 문제는 「<strong>한 사람의 잘못</strong>」보다는 「<strong>모든 사람의 작은 행동이 쌓여 만든 문제</strong>」예요.
          기후 변화·대기 오염·생물 다양성 감소·플라스틱 같은 큰 주제가 모두 일상 생활의 선택과 연결돼 있어요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 환경 문제 4 갈래">
        <p>
          ① <strong>기후 변화</strong> — 산업화 이후 화석 연료(석탄·석유·천연가스) 사용이 늘어나며 대기 중 이산화탄소
          농도가 빠르게 올라갔어요. 이 결과 지구 평균 기온이 상승하면서 폭염·집중 호우·산불·해수면 상승 같은 현상이 함께
          잦아지고 있어요.
        </p>
        <p>
          ② <strong>대기·수질 오염</strong> — 자동차·공장에서 나오는 미세 먼지, 산업 폐수, 농약·비료가 강·바다로 흘러
          드는 문제예요. 호흡기·심혈관 건강에 영향을 주고, 수생 생태계에도 큰 부담을 줘요.
        </p>
        <p>
          ③ <strong>자원 고갈과 폐기물</strong> — 종이·금속·플라스틱·전자 폐기물이 매년 늘어나요. 특히 플라스틱은 바다로
          흘러 들어 미세 플라스틱이 되어 다시 물고기·소금·물에 섞여 들어와요.
        </p>
        <p>
          ④ <strong>생물 다양성 감소</strong> — 도시·농지 확장으로 서식지가 줄어들고, 기후 변화로 분포 지역이 바뀌면서
          많은 종이 위협받고 있어요. 「한 종이 사라지면 그 종이 맡던 역할」도 함께 사라져요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「개인이 아무리 노력해도 의미가 없다」 → 한 사람의 영향은 작지만, 수십억 명의 작은
            선택이 쌓이면 큰 흐름이 돼요. 동시에 사회·기업·정부의 역할이 같이 가야 한다는 것이 핵심이에요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「재활용이 모든 답」 → 재활용도 에너지·자원이 들어요. 「<em>줄이기(Reduce)</em>」가
            가장 윗 단계, 그 다음이 「<em>다시 쓰기(Reuse)</em>」, 마지막이 「<em>재활용(Recycle)</em>」이에요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「기후 변화는 미래 일」 → 이미 폭염·집중 호우·태풍 같은 형태로 일상에 들어와 있어요.
            「먼 미래」가 아니라 「현재 진행형」이에요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 환경 행동">
        <p>
          가까운 거리는 걷거나 자전거로 이동하기, 일회용품 줄이기, 플러그 뽑기, 음식물 남기지 않기, 분리 배출 정확히 하기.
          작은 행동이지만 「선택의 빈도」가 곧 누적 효과예요. 자기가 사는 도시·학교의 환경 정책에 관심을 가지는 것도 큰
          역할이에요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <CarbonFootprintExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
