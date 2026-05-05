import { notFound } from 'next/navigation';
import { PostwarKoreaTimeline } from '@/components/interactive/social/PostwarKoreaTimeline';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';

const UNIT_ID = 'H-KH2-01';

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
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          1948년 정부 수립부터 현재까지의 한국 현대 정치사는 <strong>「권위주의에서 민주주의로 가는 굴곡진 여정」</strong>이에요.
          한국전쟁·4·19·5·16·유신·5·18·6월 항쟁·평화적 정권교체 — 굵직한 사건마다 시민의 선택이 결정적이었어요.
        </p>
      </SectionCard>
      <SectionCard title="핵심 — 다섯 시기의 흐름">
        <p>
          ① <strong>제1공화국(1948~60)</strong>: 정부 수립과 한국전쟁, 권위주의의 첫 제도화. 4·19로 막을 내려요.
          ② <strong>제2공화국(1960~61)</strong>: 짧은 의회 민주주의 실험. 5·16으로 단명.
          ③ <strong>제3·4공화국(1961~79)</strong>: 군사정변 후 경제개발과 유신 체제. 압축 성장과 정치 자유의 강한 제약이 공존.
          ④ <strong>제5공화국(1980~88)</strong>: 5·18 광주민주화운동의 비극과 6월 항쟁의 승리.
          ⑤ <strong>제6공화국(1988~)</strong>: 직선제 정착, 평화적 정권교체. 양극화·지역 갈등은 새 과제.
        </p>
      </SectionCard>
      <SectionCard title="흔한 오개념">
        <p>
          ❌ "민주주의는 한 번에 왔다" — 4·19, 6·10, 6월 항쟁 등 여러 차례의 시민 투쟁이 누적된 결과예요.
          ❌ "경제 성장 = 권위주의의 정당화" — 경제 성장과 민주주의는 단순한 trade-off가 아니에요. 87년 이후에도 성장은 계속됐어요.
          ❌ "정치사 = 대통령 이야기" — 노동·시민·여성·지방 자치 운동 등 풀뿌리 흐름이 공식 정치를 바꿔 왔어요.
        </p>
      </SectionCard>
      <SectionCard title="실생활·시험 응용">
        <p>
          수능 한국사 후반부는 「유신 체제의 특징」, 「6월 항쟁의 결과」 같은 핵심 사건의 인과 분석이 중심이에요.
          현재의 정치 제도(5년 단임·직선제·헌법재판소)가 어떤 역사적 맥락에서 만들어졌는지 이해하면 시민으로서의 판단력도 함께 자라요.
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
