import { notFound } from 'next/navigation';
import { SocialStratificationExplorer } from '@/components/interactive/social/SocialStratificationExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-SC';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit || unit.schoolLevel !== 'highschool') notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: '고등학교', href: '/highschool' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />

      <SectionCard title="한마디로">
        <p>
          「사회와 문화」는 사회 현상을 「<strong>구조·계층·문화·미디어</strong>」 4 개의 입구로 분석하는 일반 선택 과목이에요.
          동일한 사건도 어느 입구로 들어가느냐에 따라 다르게 보여요. 한 가지 정답을 외우는 시간이 아니라, 다양한 시각으로
          사고하는 훈련 시간이에요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 3개의 이론과 5개의 단어">
        <p>
          ① <strong>기능론</strong> — 사회는 부분이 모여 전체 기능을 수행하는 「유기체」 같은 시스템이라고 봐요. 계층·역할·
          제도가 사회의 안정에 기여한다는 시각이에요.
        </p>
        <p>
          ② <strong>갈등론</strong> — 사회의 갈등·자원 배분의 불평등에 초점을 둬요. 기존 질서가 「누구의 이익을 위해」
          유지되는지 묻는 관점이에요.
        </p>
        <p>
          ③ <strong>상호작용론</strong> — 거대 구조보다 사람들 사이의 일상 상호작용·기호·의미 부여를 통해 사회가 만들어진다는
          미시적 관점이에요. 「구별 짓기」, 「라벨링 효과」 같은 개념이 여기서 나와요.
        </p>
        <p>
          이 3개의 이론은 「사회 구조 / 사회화 / 일탈 / 계층 / 문화·미디어」 같은 5개의 핵심 단어를 각자 다르게 해석해요.
          이 단원의 시험·논술은 「같은 현상을 두 이론으로 비교」하는 형식이 자주 나와요.
        </p>
      </SectionCard>

      <SectionCard title="계층과 사회 이동">
        <p>
          계층은 「소득·재산·권력·위신」 같은 자원의 분포 차이에서 비롯돼요. 한 사회가 계층 사이의 이동(<strong>사회 이동</strong>)이
          비교적 활발한지, 위·아래로 이동의 가능성이 어떻게 분포돼 있는지가 그 사회의 「개방성」을 보여줘요. 같은 부모 환경에서
          출발해 다른 결과가 나오는 「세대 내 이동」, 부모와 자녀 세대가 다른 위치에 있는 「세대 간 이동」으로 나누어 봐요.
        </p>
      </SectionCard>

      <SectionCard title="미디어와 사회">
        <p>
          미디어는 단순 정보 전달 도구가 아니라 「의제 설정·프레이밍·스테레오타입」 같은 방식으로 사회 인식에 영향을 줘요.
          SNS·알고리즘 시대에는 「누가 어떤 정보를 우선 노출시키느냐」가 더 큰 변수예요. 「<em>미디어 리터러시</em>」는
          정보의 양보다 「누가, 왜, 무엇을 빠뜨리고」 만들었는지 묻는 능력이에요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「기능론은 보수, 갈등론은 진보」 → 정치 입장의 라벨이 아니에요. 같은 현상을 다른
            각도에서 보는 분석 도구일 뿐이에요. 두 이론 모두 한계와 강점이 있어요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「계층 = 소득만 보면 된다」 → 소득은 한 축일 뿐이에요. 재산·권력·문화 자본·네트워크
            같은 다른 자원의 분포까지 봐야 「계층」이 보여요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「미디어는 거울처럼 사실을 보여준다」 → 어떤 사건을 「<em>어떻게 자르고, 어떻게
            묶고, 누구를 보여주느냐</em>」가 큰 변수예요. 미디어 분석은 「틀(frame)」을 보는 훈련이에요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 / 진로">
        <p>
          광고·마케팅·HR·정책 분석·사회 조사·공공 행정 등 직접 응용 가능한 분야가 넓어요. 일상에서는 학교·동아리·아르바이트
          공간을 「3 이론」으로 한 번씩 분석해 보는 연습이 사고력 훈련에 도움이 돼요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <SocialStratificationExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
