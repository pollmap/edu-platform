import { createSubjectUnitContent } from './factory';
import type { SubjectContentFrame } from './types';

const mathFrame: SubjectContentFrame = {
  subject: 'math',
  easy: (unit, domain) =>
    `${unit.title} 단원은 ${domain}에서 수, 식, 그림, 그래프가 같은 규칙을 말하는지 확인하는 단원입니다. 먼저 눈에 보이는 변화 하나를 잡고, 그 변화를 수학 말로 옮깁니다.`,
  standard: (unit, domain) =>
    `${unit.title} 학습에서는 조건, 값, 결과를 분리해 봅니다. ${unit.interactiveTitle || unit.title} 활동으로 한 조건만 바꾸며 결과를 비교하고, 표·식·그림 중 가장 잘 드러나는 표현으로 ${domain}의 핵심 관계를 정리합니다.`,
  advanced: (unit, domain) =>
    `${unit.title} 단원을 깊게 이해한다는 것은 풀이 절차를 외우는 데서 멈추지 않고, 같은 관계를 다른 표현으로 바꾸어도 의미가 유지되는지 점검하는 것입니다. 이 관점은 이후 ${domain} 문제에서 새 조건을 만나도 전략을 선택하는 기준이 됩니다.`,
  examples: (unit, domain) => [
    {
      title: '한 값만 바꾸어 보기',
      setup: `${unit.title} 문제에서 기준이 되는 값 하나를 정합니다.`,
      walkthrough: `그 값을 작게 또는 크게 바꾼 뒤 결과가 어느 방향으로 움직이는지 ${unit.interactiveTitle || '표와 그림'}으로 확인합니다.`,
      takeaway: `수학에서는 여러 값을 한꺼번에 바꾸기보다 한 조건만 바꾸어야 규칙을 정확히 볼 수 있습니다.`,
    },
    {
      title: '표현 바꾸기',
      setup: `${domain} 상황을 그림으로 먼저 나타냅니다.`,
      walkthrough: `그림의 반복, 길이, 넓이, 위치, 개수를 표나 식으로 바꾸고 서로 같은 내용을 말하는지 비교합니다.`,
      takeaway: `${unit.title}의 핵심은 답 하나보다 표현 사이의 연결을 설명하는 힘입니다.`,
    },
    {
      title: '검산 관점 만들기',
      setup: `구한 답이 ${unit.title}의 조건에 맞는지 되돌아봅니다.`,
      walkthrough: `답을 원래 상황에 넣었을 때 단위, 크기, 방향이 자연스러운지 확인합니다.`,
      takeaway: `검산은 마지막 절차가 아니라 관계를 이해했는지 확인하는 짧은 설명입니다.`,
    },
  ],
  miniQuiz: (unit, domain) => [
    {
      kind: 'concept-check',
      question: `${unit.title}에서 먼저 구분해야 하는 것은 무엇인가요?`,
      answer: '변하는 값, 변하지 않는 조건, 결과를 구분합니다.',
      explanation: `이 세 가지를 나누어야 ${domain} 상황에서 어떤 규칙이 작동하는지 안정적으로 설명할 수 있습니다.`,
    },
    {
      kind: 'application',
      question: `${unit.interactiveTitle || unit.title} 활동에서 조건 하나를 바꾸면 무엇을 기록해야 하나요?`,
      answer: '바꾼 조건과 달라진 결과를 함께 기록합니다.',
      explanation: `조건만 쓰거나 결과만 쓰면 관계를 설명할 수 없습니다. 두 항목을 나란히 두어야 규칙을 찾을 수 있습니다.`,
    },
    {
      kind: 'mistake-or-transfer',
      question: `${unit.title} 문제에서 답이 맞는지 확인하는 가장 좋은 방법은 무엇인가요?`,
      answer: '답을 원래 상황에 다시 넣어 조건과 단위가 맞는지 확인합니다.',
      explanation: `공식에 넣은 계산이 맞아도 상황의 단위나 크기가 맞지 않으면 수학적 의미가 깨질 수 있습니다.`,
    },
  ],
  commonMistakes: (unit) => [
    {
      mistake: `${unit.title}에서 공식을 먼저 외우고 왜 쓰는지 설명하지 못하는 경우`,
      correction: '그림, 표, 식 중 하나를 골라 공식이 나타내는 관계를 한 문장으로 말해 봅니다.',
    },
    {
      mistake: '여러 조건을 동시에 바꾸고 결과가 왜 달라졌는지 혼동하는 경우',
      correction: '한 번에 하나의 조건만 바꾸고 변화 전후를 나란히 비교합니다.',
    },
  ],
  realLifeApplications: (unit, domain) => [
    {
      context: '생활 속 계산',
      description: `${unit.title} 단원은 물건 개수, 시간, 거리, 비율처럼 실제 양을 비교하거나 예측할 때 쓰입니다.`,
    },
    {
      context: '자료 해석',
      description: `${domain}에서 배운 표현 전환은 표, 그래프, 안내문 속 숫자가 어떤 관계를 말하는지 읽는 데 도움을 줍니다.`,
    },
  ],
};

export const MATH_UNIT_CONTENT = createSubjectUnitContent(mathFrame);
