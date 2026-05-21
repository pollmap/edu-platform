import { createSubjectUnitContent } from './factory';
import type { SubjectContentFrame } from './types';

const scienceFrame: SubjectContentFrame = {
  subject: 'science',
  easy: (unit, domain) =>
    `${unit.title} 단원은 ${domain} 현상을 조건과 결과로 나누어 보는 단원입니다. 먼저 무엇을 바꾸고 무엇을 관찰할지 정하면 과학 원리가 훨씬 선명해집니다.`,
  standard: (unit, domain) =>
    `${unit.title} 학습에서는 관찰 사실, 추론, 설명을 구분합니다. ${unit.interactiveTitle || unit.title} 활동으로 조건을 바꾸고 결과를 기록한 뒤, 그 결과를 물질·힘·에너지·생명·지구 시스템 중 알맞은 원리와 연결합니다.`,
  advanced: (unit, domain) =>
    `${unit.title} 단원을 깊게 이해하려면 현상을 단순 암기가 아니라 모델로 설명해야 합니다. 같은 ${domain} 현상이라도 규모, 시간, 에너지 흐름이 달라지면 설명 방식이 달라질 수 있음을 비교합니다.`,
  examples: (unit, domain) => [
    {
      title: '변인 하나 정하기',
      setup: `${unit.title}에서 바꿀 수 있는 조건 하나를 고릅니다.`,
      walkthrough: `조건을 바꾸기 전 결과를 예측하고, ${unit.interactiveTitle || '관찰 도구'}에서 실제 변화가 예측과 맞는지 확인합니다.`,
      takeaway: '과학 탐구는 조절한 조건과 관찰한 결과를 분리할 때 신뢰할 수 있습니다.',
    },
    {
      title: '증거와 설명 연결',
      setup: `${domain} 현상에서 눈으로 확인한 변화를 한 문장으로 적습니다.`,
      walkthrough: `그 변화가 왜 일어났는지 입자, 힘, 에너지, 생명 활동, 지구 시스템 중 하나의 관점으로 설명합니다.`,
      takeaway: `${unit.title}에서는 관찰한 사실과 과학적 설명을 구분하는 습관이 중요합니다.`,
    },
    {
      title: '모델로 다시 말하기',
      setup: `${unit.title}의 현상을 그림이나 흐름도로 간단히 표현합니다.`,
      walkthrough: `원인에서 결과로 이어지는 화살표를 그리고, 각 단계에서 무엇이 변하는지 표시합니다.`,
      takeaway: '모델은 복잡한 현상을 한 번에 외우지 않고 구조로 이해하게 해 줍니다.',
    },
  ],
  miniQuiz: (unit, domain) => [
    {
      kind: 'concept-check',
      question: `${unit.title} 탐구에서 조절 변인과 관찰 결과를 왜 나누어야 하나요?`,
      answer: '무엇 때문에 결과가 달라졌는지 판단하기 위해서입니다.',
      explanation: `조건과 결과가 섞이면 ${domain} 현상의 원인을 설명할 수 없습니다. 둘을 나누어야 증거 기반 설명이 됩니다.`,
    },
    {
      kind: 'application',
      question: `${unit.interactiveTitle || unit.title} 활동에서 예측과 실제 결과가 다르면 어떻게 해야 하나요?`,
      answer: '기록을 비교하고 조건, 측정, 설명 중 어디가 달랐는지 확인합니다.',
      explanation: '예측이 틀린 것은 실패가 아니라 모델을 고칠 단서입니다. 과학은 그 차이를 근거로 설명을 다듬습니다.',
    },
    {
      kind: 'mistake-or-transfer',
      question: `${unit.title}을 외운 용어만으로 설명하면 어떤 문제가 생기나요?`,
      answer: '새로운 상황에서 같은 원리를 적용하기 어렵습니다.',
      explanation: `용어는 출발점입니다. 실제 ${domain} 상황에서는 조건, 증거, 원리를 함께 말해야 다른 현상으로 옮겨 쓸 수 있습니다.`,
    },
  ],
  commonMistakes: (unit) => [
    {
      mistake: `${unit.title}의 결과만 보고 원인을 바로 단정하는 경우`,
      correction: '바꾼 조건, 같게 둔 조건, 관찰 결과를 먼저 분리해 원인을 좁힙니다.',
    },
    {
      mistake: '그림이나 모형을 실제 현상과 완전히 같다고 생각하는 경우',
      correction: '모형은 핵심 관계를 단순화한 도구이므로 무엇을 생략했는지도 함께 확인합니다.',
    },
  ],
  realLifeApplications: (unit, domain) => [
    {
      context: '생활 속 현상 설명',
      description: `${unit.title} 단원은 날씨, 몸의 변화, 물질의 성질, 에너지 사용처럼 매일 보는 현상의 까닭을 설명하는 데 쓰입니다.`,
    },
    {
      context: '탐구 보고서',
      description: `${domain} 탐구를 정리할 때 조건-관찰-설명 구조를 쓰면 주장과 근거가 분명해집니다.`,
    },
  ],
};

export const SCIENCE_UNIT_CONTENT = createSubjectUnitContent(scienceFrame);
