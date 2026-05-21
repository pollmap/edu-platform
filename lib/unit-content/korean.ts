import { createSubjectUnitContent } from './factory';
import type { SubjectContentFrame } from './types';

const koreanFrame: SubjectContentFrame = {
  subject: 'korean',
  easy: (unit, domain) =>
    `${unit.title} 단원은 ${domain}에서 말과 글의 의미가 어떻게 만들어지는지 살피는 단원입니다. 먼저 표현, 구조, 근거 중 무엇을 봐야 하는지 정하면 읽기와 쓰기가 쉬워집니다.`,
  standard: (unit, domain) =>
    `${unit.title} 학습에서는 텍스트나 대화의 표면 내용만 확인하지 않고, 선택된 표현이 독자와 청자에게 어떤 효과를 만드는지 설명합니다. ${unit.interactiveTitle || unit.title} 활동으로 구조를 나누고 근거를 붙여 해석합니다.`,
  advanced: (unit, domain) =>
    `${unit.title} 단원을 깊게 이해하려면 같은 내용도 목적, 매체, 독자에 따라 다르게 구성될 수 있음을 비교해야 합니다. ${domain}의 관점에서 표현의 효과와 한계를 함께 말할 수 있어야 합니다.`,
  examples: (unit, domain) => [
    {
      title: '근거 표시하기',
      setup: `${unit.title}과 관련된 짧은 문장이나 글 구조를 봅니다.`,
      walkthrough: `주장, 정보, 표현 효과, 감정 단서 중 무엇을 판단 근거로 쓸 수 있는지 표시합니다.`,
      takeaway: '국어 학습에서는 느낌만 말하기보다 텍스트 안의 근거를 함께 제시해야 합니다.',
    },
    {
      title: '표현 바꿔 보기',
      setup: `${domain} 상황에서 같은 뜻을 더 분명하게 전달할 방법을 생각합니다.`,
      walkthrough: `낱말, 문장 순서, 매체 형식 중 하나를 바꾸고 독자가 받는 인상이 어떻게 달라지는지 비교합니다.`,
      takeaway: `${unit.title}은 표현 선택이 의미와 효과를 바꾼다는 점을 확인하는 학습입니다.`,
    },
    {
      title: '한 문장 해석 만들기',
      setup: `${unit.title}에서 중요한 장면이나 문장을 고릅니다.`,
      walkthrough: `무엇을 근거로 그렇게 읽었는지 짧게 붙여 해석 문장을 완성합니다.`,
      takeaway: '좋은 해석은 결론과 근거가 함께 있는 문장입니다.',
    },
  ],
  miniQuiz: (unit, domain) => [
    {
      kind: 'concept-check',
      question: `${unit.title}에서 해석이나 판단을 할 때 먼저 찾아야 하는 것은 무엇인가요?`,
      answer: '텍스트 안의 근거입니다.',
      explanation: `국어의 ${domain} 학습은 감상이나 의견만 말하는 것이 아니라, 말과 글 안에서 확인되는 단서를 근거로 삼는 과정입니다.`,
    },
    {
      kind: 'application',
      question: `${unit.interactiveTitle || unit.title} 활동에서 표현을 바꾸면 무엇을 비교해야 하나요?`,
      answer: '의미, 분위기, 전달 효과가 어떻게 달라졌는지 비교합니다.',
      explanation: '표현 변화는 단순한 말바꾸기가 아닙니다. 독자나 청자가 받는 효과까지 설명해야 학습 목표에 닿습니다.',
    },
    {
      kind: 'mistake-or-transfer',
      question: `${unit.title}에서 흔히 하는 실수는 무엇인가요?`,
      answer: '근거 없이 느낌이나 정답만 말하는 것입니다.',
      explanation: `느낌은 출발점이 될 수 있지만 ${domain}에서는 왜 그렇게 판단했는지 텍스트 근거를 붙여야 설득력이 생깁니다.`,
    },
  ],
  commonMistakes: (unit) => [
    {
      mistake: `${unit.title}에서 정답 문장만 외우고 근거를 찾지 않는 경우`,
      correction: '주장, 정보, 표현 효과를 뒷받침하는 낱말이나 문장을 먼저 표시합니다.',
    },
    {
      mistake: '문학·매체·문법 용어를 실제 텍스트와 연결하지 못하는 경우',
      correction: '용어가 보이는 구체적 장면이나 문장을 함께 적어 의미를 확인합니다.',
    },
  ],
  realLifeApplications: (unit, domain) => [
    {
      context: '읽기와 대화',
      description: `${unit.title} 단원은 뉴스, 댓글, 발표, 대화에서 상대가 무엇을 근거로 말하는지 판단하는 데 쓰입니다.`,
    },
    {
      context: '글쓰기 개선',
      description: `${domain}에서 익힌 구조와 표현 효과는 보고서, 메시지, 발표문을 더 분명하게 고치는 기준이 됩니다.`,
    },
  ],
};

export const KOREAN_UNIT_CONTENT = createSubjectUnitContent(koreanFrame);
