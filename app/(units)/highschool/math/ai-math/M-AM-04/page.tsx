import { notFound } from 'next/navigation';
import { MatrixTransformExplorer } from '@/components/interactive/math/highschool/MatrixTransformExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'M-AM-04';

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
          행렬은 <strong>「공간 자체를 회전·확대·찌그러뜨리는 함수」</strong>예요.
          2×2 행렬 하나면 좌표 평면 전체를 한 번에 변환할 수 있고, 이게 그래픽·게임·AI의 모든 변환의 기본이에요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 선형변환과 행렬식">
        <p>
          (a b; c d) · (x; y) = (ax+by; cx+dy). 회전은 (cos θ, −sin θ; sin θ, cos θ),
          크기 s 확대는 (s, 0; 0, s), 전단(shear)은 (1, k; 0, 1).
          행렬식 det = ad − bc는 「면적이 몇 배가 됐나」를 알려줘요. det &lt; 0이면 좌우/상하가 뒤집힌 거예요(반사).
          여러 변환을 잇따라 하면 행렬을 곱한 새로운 행렬 하나로 표현돼요.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ 「행렬 곱은 교환법칙 성립」 — AB ≠ BA. 「먼저 회전 후 확대」와 「먼저 확대 후 회전」이 다른 결과예요.
          ❌ 「det = 0이면 그냥 작아진 모양」 — 「면적이 0」이라는 뜻. 평면이 직선·점으로 무너져 역행렬이 존재하지 않아요.
          ❌ 「행렬은 표일 뿐」 — 행렬은 「함수」예요. 표가 아니라 변환이라는 관점이 AI에서 핵심.
        </p>
      </SectionCard>
      <SectionCard title="실생활·AI 응용">
        <p>
          3D 게임의 카메라 회전, 영화의 CGI 장면 변환, 신경망의 「가중치 곱」(딥러닝의 핵심 연산)도 모두 행렬 연산이에요.
          PCA(주성분 분석) 같은 차원 축소도 행렬의 고유값 분해를 이용해요.
          AI 모델의 가중치는 모두 행렬·텐서, 학습은 곧 「행렬을 조정하는」 일이에요.
        </p>
      </SectionCard>
      <SectionCard>
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <MatrixTransformExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
