import { notFound } from 'next/navigation';
import { ClimateLifestyleSimulator } from '@/components/interactive/social/ClimateLifestyleSimulator';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-CSW';

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
          기후변화와 지속 가능한 세계는 「<strong>지구의 자원·생태계의 한계 안에서 어떻게 함께 살아갈까</strong>」를 묻는
          융합 과목이에요. 과학적 사실, 사회·경제 구조, 국제 협력, 개인 행동 ─ 4개의 층위를 같이 봐야 풀리는 문제예요.
        </p>
      </SectionCard>

      <SectionCard title="큰 흐름 / 4 층위로 본 기후 문제">
        <p>
          ① <strong>과학</strong> — IPCC(기후변화에 관한 정부간 협의체) 보고서는 산업화 이후 인간 활동(주로 화석 연료
          연소·산림 감소)이 지구 온난화의 주된 원인임을 일관되게 보고하고 있어요. 평균 기온이 1℃, 1.5℃, 2℃ 오르는
          시나리오마다 폭염·해수면·생태계의 변화 폭이 단계적으로 커져요.
        </p>
        <p>
          ② <strong>사회·경제</strong> — 같은 기후 변화에도 영향은 평등하지 않게 분포돼요. 저지대 도시·도서 국가·노약자·
          저소득층이 더 큰 위험에 노출되는 「<em>기후 불평등</em>」이 핵심 개념이에요. 산업 구조·에너지 정책·도시 설계도
          이 문제와 깊게 얽혀 있어요.
        </p>
        <p>
          ③ <strong>국제 협력</strong> — 1992년 유엔기후변화협약, 1997년 교토 의정서, 2015년 파리 협정으로 이어지는 국제
          틀은 「산업화 이전 대비 기온 상승을 1.5℃ 이내로」 라는 목표를 공유해요. 각국이 「국가별 자발적 기여(NDC)」를
          제출해 감축 경로를 보고하는 구조예요.
        </p>
        <p>
          ④ <strong>지속 가능한 발전(SDGs)</strong> — 환경만이 아니라 빈곤·교육·성평등·일자리·도시·정의 같은 17개 목표가
          서로 맞물려 있어요. 「환경 vs 경제」가 아니라 「<em>둘 다 같이</em>」를 풀어야 한다는 시각이에요.
        </p>
      </SectionCard>

      <SectionCard title="흔한 오개념">
        <ul className="list-disc list-inside space-y-1.5 text-sm">
          <li>
            <strong>오개념 1.</strong> 「과학자들 사이에 의견이 갈려 있다」 → 인간 활동이 현재 온난화의 주된 원인이라는
            점에 대해서는 기후 과학계 내부의 합의 수준이 매우 높아요. 「논쟁 중」으로 표현하는 것은 정확하지 않아요.
          </li>
          <li>
            <strong>오개념 2.</strong> 「선진국이 다 책임져야 한다 / 개발 도상국이 다 책임져야 한다」 → 누적 배출량은 선진국이,
            현재 증가 속도는 일부 신흥국이 큰 비중을 가지고 있어요. 「공동의, 그러나 차별화된 책임」이라는 원칙이 국제 협상의
            기본 틀이에요.
          </li>
          <li>
            <strong>오개념 3.</strong> 「개인 행동은 의미 없다 / 정부 정책만 의미 있다」 → 둘 다 필요해요. 가계의 행동
            변화도 통계적으로 의미 있는 감축이 가능하고, 동시에 산업·전력·교통 시스템의 전환은 정책 없이 불가능해요.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="실생활 / 진로">
        <p>
          ESG 보고, 탄소 회계, 신재생 에너지, 도시 재생, 농업·식량 시스템, 기후 적응 도시계획, 재난 관리 등 「기후 직무」가
          빠르게 늘고 있어요. 사회 과학·자연 과학·공학·법·경영을 가로지르는 융합 분야라서, 한 전공만으로는 풀리지 않아요.
          일상에서는 가전 에너지 등급 보기, 대중 교통·자전거 이용, 음식 폐기물 줄이기, 친환경 인증 제품 보기 등이 입구가 돼요.
        </p>
      </SectionCard>

      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <ClimateLifestyleSimulator />
        </InteractiveErrorBoundary>
      </SectionCard>

      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
