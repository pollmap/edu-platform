import { createSubjectUnitContent } from './factory';
import type { SubjectContentFrame } from './types';

const socialFrame: SubjectContentFrame = {
  subject: 'social',
  easy: (unit, domain) =>
    `${unit.title} 단원은 ${domain}에서 사람, 공간, 제도, 사건이 서로 영향을 주고받는 방식을 살피는 단원입니다. 먼저 누가, 어디서, 어떤 조건에서 영향을 받는지 나누어 봅니다.`,
  standard: (unit, domain) =>
    `${unit.title} 학습에서는 사실을 나열하는 데서 멈추지 않고 원인, 과정, 결과, 관점을 연결합니다. ${unit.interactiveTitle || unit.title} 활동으로 자료를 비교하고, 어떤 근거가 사회 현상을 설명하는지 정리합니다.`,
  advanced: (unit, domain) =>
    `${unit.title} 단원을 깊게 이해하려면 한 가지 관점으로만 결론을 내리지 않아야 합니다. ${domain} 자료를 공간, 시간, 제도, 이해관계 관점에서 다시 읽으면 같은 사건도 다르게 해석될 수 있습니다.`,
  examples: (unit, domain) => [
    {
      title: '관점 나누기',
      setup: `${unit.title}과 관련된 상황에서 관련된 사람이나 집단을 둘 이상 고릅니다.`,
      walkthrough: `각 집단이 얻는 이익, 겪는 어려움, 중요하게 보는 가치를 비교합니다.`,
      takeaway: '사회 현상은 여러 관점을 비교할 때 원인과 결과가 더 분명해집니다.',
    },
    {
      title: '자료 근거 찾기',
      setup: `${domain} 자료에서 지도, 표, 연표, 사례 중 하나를 봅니다.`,
      walkthrough: `자료가 말하는 사실과 그 사실로부터 추론할 수 있는 설명을 분리해 적습니다.`,
      takeaway: `${unit.title}에서는 자료와 의견을 구분해야 설득력 있는 설명을 만들 수 있습니다.`,
    },
    {
      title: '오늘의 생활로 옮기기',
      setup: `${unit.title}의 개념을 학교, 지역, 뉴스 중 하나와 연결합니다.`,
      walkthrough: `비슷한 원인이나 제도가 어떻게 작동하는지 찾고 차이점도 함께 적습니다.`,
      takeaway: '사회 개념은 과거와 먼 곳의 이야기가 아니라 오늘의 선택을 이해하는 도구입니다.',
    },
  ],
  miniQuiz: (unit, domain) => [
    {
      kind: 'concept-check',
      question: `${unit.title}에서 사회 현상을 설명할 때 연결해야 하는 네 요소는 무엇인가요?`,
      answer: '원인, 과정, 결과, 관점입니다.',
      explanation: `${domain} 학습은 사실 암기만으로 끝나지 않습니다. 왜 일어났고 어떤 과정을 거쳐 누구에게 어떤 영향을 주었는지 연결해야 합니다.`,
    },
    {
      kind: 'application',
      question: `${unit.interactiveTitle || unit.title} 활동에서 자료를 비교할 때 무엇을 먼저 구분해야 하나요?`,
      answer: '자료가 보여 주는 사실과 내가 해석한 의견을 구분합니다.',
      explanation: '사실과 해석을 섞으면 근거가 약해집니다. 먼저 확인 가능한 사실을 잡고 그다음 설명을 붙입니다.',
    },
    {
      kind: 'mistake-or-transfer',
      question: `${unit.title}을 한 집단의 입장만으로 보면 어떤 문제가 생기나요?`,
      answer: '다른 이해관계와 결과를 놓쳐 설명이 편향될 수 있습니다.',
      explanation: `사회 현상은 여러 사람이 영향을 주고받습니다. ${domain}에서는 복수의 관점을 비교해야 균형 있는 판단을 할 수 있습니다.`,
    },
  ],
  commonMistakes: (unit) => [
    {
      mistake: `${unit.title}을 사건이나 제도 이름 암기로만 끝내는 경우`,
      correction: '원인, 과정, 결과, 영향을 받은 집단을 함께 연결해 설명합니다.',
    },
    {
      mistake: '자료의 숫자나 지도 표시를 의견과 섞어 말하는 경우',
      correction: '먼저 자료가 직접 보여 주는 사실을 말하고, 그다음 해석을 덧붙입니다.',
    },
  ],
  realLifeApplications: (unit, domain) => [
    {
      context: '뉴스 읽기',
      description: `${unit.title} 단원은 뉴스에서 정책, 지역, 경제, 역사 문제가 누구에게 어떤 영향을 주는지 판단하는 데 쓰입니다.`,
    },
    {
      context: '지역과 학교 문제 해결',
      description: `${domain}의 관점은 학교나 지역의 문제를 볼 때 이해관계자, 근거 자료, 선택 결과를 정리하는 틀이 됩니다.`,
    },
  ],
};

export const SOCIAL_UNIT_CONTENT = createSubjectUnitContent(socialFrame);
