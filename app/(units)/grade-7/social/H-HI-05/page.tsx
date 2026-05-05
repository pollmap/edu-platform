import { notFound } from 'next/navigation';
import { JoseonLateChangesExplorer } from '@/components/interactive/social/JoseonLateChangesExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { GRADE_LABEL, SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'H-HI-05';

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
          조선 후기는 「<strong>전기의 안정이 흔들리는</strong>」 시기예요. 임진왜란·병자호란이라는 두 전쟁의 충격이
          농업·신분제·사상·정치·문화 거의 모든 영역에 변화를 일으켜요. 이 변화의 누적이 19세기 말 개항으로 이어지는
          출발점이에요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 무엇이 어떻게 흔들렸나">
        <p>
          농업에서는 모내기(이앙법)가 전국으로 퍼지면서 한 사람이 더 넓은 땅을 부치는 「광작」이 가능해졌어요. 이 과정에서
          소수의 부유한 농민과 대다수의 빈농 사이의 간격이 벌어졌어요. 동시에 대동법(1608~1708)이 확대되면서 세금이
          쌀·돈으로 단일화돼 시장과 화폐의 사용이 활성화돼요. <strong>상평통보</strong>는 이 시기에 전국 화폐로 자리잡았고,
          송상·만상·내상 같은 거상이 전국적 유통망을 구축해요.
        </p>
        <p>
          신분제도 흔들려요. 전쟁 후 호적과 토지대장이 훼손되고, 정부가 재정 부족을 메우려고 「공명첩」을 팔면서 평민이
          양반이 되는 길이 열렸어요. 노비종모법(1731)·공노비 해방(1801) 같은 제도 변화도 이어져요. 한편 사상에서는
          현실 문제 해결에 초점을 둔 <strong>실학</strong>이 등장하고, 청을 거쳐 들어온 <strong>서학(천주교)</strong>도
          일부 지식층에 퍼져요.
        </p>
        <p>
          정치는 17세기 「예송 논쟁」을 거쳐 한 붕당이 권력을 독점하는 환국 정치로 흘러요. 영조·정조의 탕평책으로 잠시
          균형이 회복되지만, 19세기에는 외척 가문이 권력을 독점하는 <strong>세도 정치</strong>가 자리잡고 삼정의 문란이
          심해져요. 문화에서는 <strong>한글 소설·판소리·풍속화</strong> 같은 「서민 문화」가 활성화돼요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「조선 후기 = 무조건 침체기」 → 정치적으로는 긴장이 컸지만, 농업 생산성·상업·문화는
            오히려 발전한 면이 많았어요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「실학자가 한 가지 학파였다」 → 실학자는 서로 다른 문제 의식을 가진 여러 갈래의
            학자들을 묶어 부르는 말이에요. 토지·상공업·역사 등 관심사가 달랐어요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「공명첩으로 양반이 늘어 신분제가 사실상 사라졌다」 → 형식상 양반 비율은 늘었지만,
            「진짜 권력에 접근할 수 있는 양반」과 「이름만 양반인 사람」 사이에는 격차가 컸어요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 속 후기의 흔적">
        <p>
          판소리·탈춤은 지금도 무형문화재로 남아 있고, 정선의 진경산수화나 김홍도·신윤복의 풍속화는 미술 교과서에서 자주
          만나는 작품이에요. 거리에서 보이는 「장터」 문화나 시장 풍경 역시 후기 상업 발달의 흐름이 만든 자취예요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <JoseonLateChangesExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
