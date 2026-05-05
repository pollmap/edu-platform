import { notFound } from 'next/navigation';
import { HonorificTenseExplorer } from '@/components/interactive/korean/HonorificTenseExplorer';
import { InteractiveErrorBoundary } from '@/components/primitives/InteractiveErrorBoundary';
import { PrerequisiteList } from '@/components/primitives/PrerequisiteList';
import { SectionCard } from '@/components/primitives/SectionCard';
import { UnitHeader } from '@/components/primitives/UnitHeader';
import { UnitProgressControls } from '@/components/primitives/UnitProgressControls';
import { findUnit } from '@/lib/curriculum';
import { makeUnitMetadata } from '@/lib/metadata';
import { SUBJECT_LABEL } from '@/lib/types';

const UNIT_ID = 'K-GR-07';

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
          { label: `학년 공통 / ${SUBJECT_LABEL[unit.subject]}`, href: `/common/${unit.subject}` },
          { label: unit.title },
        ]}
      />
      <UnitProgressControls unitId={UNIT_ID} />
      <SectionCard title="한마디로">
        <p>
          한국어는 같은 의미라도 <strong>누가 누구에게 어떻게 말하느냐</strong>에 따라 형태가 달라져요. 핵심은 네 가지:
          <strong>높임</strong>(존중) · <strong>시제</strong>(때) · <strong>피동</strong>(당함) · <strong>사동</strong>(시킴).
        </p>
      </SectionCard>
      <SectionCard title="네 가지 문법 한 줄 정리">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>높임법</strong> — 주체(말 속 주어), 객체(말 속 목적어/부사어), 상대(듣는 사람)를 누구를 높이느냐로 갈려요. 어미 -시-, 조사 께서/께, 어휘 드리다·여쭙다.</li>
          <li><strong>시제</strong> — 일이 일어난 때를 표시. 과거 -았/었-, 현재 -는/ㄴ-, 미래 -겠-·-(으)ㄹ 것이다.</li>
          <li><strong>피동</strong> — 주어가 동작을 당함. 어미 -이/히/리/기-, 또는 -되다·-받다·-당하다.</li>
          <li><strong>사동</strong> — 남에게 동작을 시킴. 어미 -이/히/리/기/우/구/추-, 또는 -게 하다.</li>
        </ul>
      </SectionCard>
      <SectionCard title="피동과 사동을 구별하는 법">
        <p>
          어미가 똑같이 -이/히/리/기-라서 헷갈리기 쉬워요. <strong>의미로 구별</strong>하는 게 안전해요. 주어가 <strong>당하면</strong> 피동
          (도둑이 잡혔다 = 잡힘을 당함), 주어가 누군가에게 <strong>시키면</strong> 사동(엄마가 아기에게 옷을 입혔다 = 입게 시킴)이에요.
          또 같은 동사라도 둘 다 가능해요. 보다 → 보이다(피동: 보이게 됨 / 사동: 보게 함). 문맥을 봐야 해요.
        </p>
      </SectionCard>
      <SectionCard title="자주 틀리는 표현">
        <ul className="list-disc pl-5 space-y-1">
          <li>이중 피동 — '잡혀지다·놓여지다·세워지다'는 어색해요. <strong>잡히다·놓이다·세워지다(X) → 세워지다(X) → 세워두다·세우다</strong>.</li>
          <li>'커피 나오셨습니다' — 사물을 높이는 잘못된 높임. <strong>'커피 나왔습니다'</strong>가 맞아요.</li>
          <li>시제 일치 — '내일 학교에 갔다'(X) → '내일 학교에 간다/갈 것이다'.</li>
          <li>객체 높임 어휘 — 선생님께 '말했다'보다 <strong>'말씀드렸다'</strong>가 자연스러워요.</li>
        </ul>
      </SectionCard>
      <SectionCard title="문법 변환 연습">
        <InteractiveErrorBoundary unitId={UNIT_ID}>
          <HonorificTenseExplorer />
        </InteractiveErrorBoundary>
      </SectionCard>
      <SectionCard>
        <PrerequisiteList ids={unit.prerequisites} achievementStandards={unit.achievementStandards} />
      </SectionCard>
    </main>
  );
}
