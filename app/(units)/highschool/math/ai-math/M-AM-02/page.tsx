import { notFound } from 'next/navigation';
import { TfidfVectorExplorer } from '@/components/interactive/math/highschool/TfidfVectorExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AM-02';

export function generateMetadata() {
  const unit = findUnit(UNIT_ID);
  return unit ? makeUnitMetadata(unit) : {};
}

export default function Page() {
  const unit = findUnit(UNIT_ID);
  if (!unit) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <UnitHeader
        unit={unit}
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: '고등학교', href: '/highschool' },
          { label: '인공지능 수학', href: '/highschool/math/ai-math' },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          텍스트는 그대로는 컴퓨터가 못 다뤄요. 단어를 <strong>「숫자 벡터로 바꿔」</strong> 비교 가능하게 만드는 일이 벡터화예요.
          가장 기본은 빈도(TF)와 희소성(IDF)을 곱한 TF-IDF.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — TF·IDF와 코사인 유사도">
        <p>
          TF(t,d) = 「문서 d 안에서 단어 t가 등장한 비율」.
          IDF(t) = log((N+1)/(df(t)+1)) + 1. 즉, 모든 문서에 다 나오는 단어는 IDF가 0에 가까워져 깎이고,
          한 문서에만 나오는 단어는 IDF가 커져 가중돼요. 두 문서를 「TF-IDF 벡터」로 만든 다음
          코사인 유사도 cos θ = u·v/(|u||v|)로 닮은 정도를 잴 수 있어요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「자주 나오는 단어가 중요」 — 「은,는,이,가」 같은 흔한 단어가 가장 자주 나와요. IDF가 그걸 걸러줘요.
          ❌ 「TF-IDF는 의미를 안다」 — 단어를 통계적으로 셀 뿐 의미·문맥은 몰라요. 그게 Word2Vec·BERT 같은 임베딩이 등장한 이유예요.
          ❌ 「벡터 길이가 다르면 비교 불가」 — 코사인 유사도는 「방향」만 보니 길이는 무관해요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·AI 응용">
        <p>
          검색 엔진 랭킹, 스팸 필터, 표절 탐지, 추천 시스템 — 모두 텍스트를 벡터로 바꾸는 데서 시작돼요.
          최신 LLM도 결국 「토큰을 벡터로 매핑하는 임베딩」이 첫 번째 층이에요.
          TF-IDF는 단순하지만 지금도 검색·문서 분류에서 강력한 베이스라인으로 쓰여요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <TfidfVectorExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
