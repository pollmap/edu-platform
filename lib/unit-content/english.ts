import { createSubjectUnitContent } from './factory';
import type { SubjectContentFrame } from './types';

const englishFrame: SubjectContentFrame = {
  subject: 'english',
  easy: (unit, domain) =>
    `${unit.title} 단원은 영어 표현을 상황, 형태, 의미로 나누어 익히는 단원입니다. 먼저 어떤 상황에서 쓰는 표현인지 잡고, 그 다음 단어 순서와 문장 모양을 확인합니다.`,
  standard: (unit, domain) =>
    `${unit.title} 학습에서는 한국어 뜻만 외우지 않고 영어가 의미를 만드는 순서를 봅니다. ${unit.interactiveTitle || unit.title} 활동으로 표현을 바꾸며 시제, 역할, 연결어, 어휘 선택이 의미를 어떻게 바꾸는지 확인합니다.`,
  advanced: (unit, domain) =>
    `${unit.title} 단원을 깊게 이해하려면 같은 뜻을 다른 문맥에 맞게 다시 말할 수 있어야 합니다. ${domain}의 목적, 청자, 글의 장르에 따라 표현의 직접성, 공손함, 정보 배열이 달라집니다.`,
  examples: (unit, domain) => [
    {
      title: '문장 틀 확인하기',
      setup: `${unit.title}에 맞는 짧은 영어 문장 하나를 봅니다.`,
      walkthrough: `주어, 동사, 핵심 표현, 꾸며 주는 말의 위치를 표시하고 문장의 의미가 어디에서 정해지는지 확인합니다.`,
      takeaway: '영어 문장은 단어 뜻만큼 순서와 역할이 중요합니다.',
    },
    {
      title: '상황 바꿔 말하기',
      setup: `${domain} 상황을 친구, 선생님, 글쓰기 상황 중 하나로 바꿉니다.`,
      walkthrough: `같은 핵심 의미를 유지하되 어휘, 공손함, 연결 표현을 상황에 맞게 조정합니다.`,
      takeaway: `${unit.title}은 문장 형태와 실제 사용 상황을 함께 연결해야 오래 남습니다.`,
    },
    {
      title: '오류 고치기',
      setup: `${unit.title}에서 자주 틀리는 어순이나 형태를 하나 고릅니다.`,
      walkthrough: `왜 틀렸는지 역할을 기준으로 표시하고, 올바른 문장으로 바꾸어 읽습니다.`,
      takeaway: '오류 교정은 암기가 아니라 문장 구조를 다시 보는 연습입니다.',
    },
  ],
  miniQuiz: (unit, domain) => [
    {
      kind: 'concept-check',
      question: `${unit.title}에서 영어 표현을 볼 때 함께 확인해야 하는 세 가지는 무엇인가요?`,
      answer: '상황, 형태, 의미입니다.',
      explanation: `영어의 ${domain} 학습에서는 단어 뜻만 알면 부족합니다. 어떤 상황에서 어떤 형태로 쓰여 어떤 의미를 만드는지 함께 봐야 합니다.`,
    },
    {
      kind: 'application',
      question: `${unit.interactiveTitle || unit.title} 활동에서 문장을 바꾼 뒤 무엇을 확인해야 하나요?`,
      answer: '문장 의미와 상황 적절성이 유지되는지 확인합니다.',
      explanation: '형태만 맞아도 상황에 어색할 수 있습니다. 실제 사용 가능성을 함께 확인해야 표현으로 쓸 수 있습니다.',
    },
    {
      kind: 'mistake-or-transfer',
      question: `${unit.title}을 한국어 직역으로만 익히면 어떤 문제가 생기나요?`,
      answer: '어순과 표현 선택이 어색해질 수 있습니다.',
      explanation: `직역은 빠른 이해에는 도움 되지만 ${domain} 상황에서는 영어의 정보 배열과 관용적 표현을 함께 맞추어야 합니다.`,
    },
  ],
  commonMistakes: (unit) => [
    {
      mistake: `${unit.title}에서 한국어 단어 순서를 그대로 영어에 옮기는 경우`,
      correction: '주어와 동사, 핵심 표현의 위치를 먼저 잡고 나머지 정보를 붙입니다.',
    },
    {
      mistake: '문법 형태만 맞추고 실제 상황의 공손함이나 목적을 놓치는 경우',
      correction: '누가 누구에게 어떤 목적으로 말하는지 먼저 정한 뒤 표현을 고릅니다.',
    },
  ],
  realLifeApplications: (unit, domain) => [
    {
      context: '일상 표현',
      description: `${unit.title} 단원은 짧은 대화, 메시지, 발표, 온라인 검색에서 정확한 영어 표현을 고르는 데 쓰입니다.`,
    },
    {
      context: '읽기와 쓰기',
      description: `${domain}에서 익힌 구조는 긴 글을 읽을 때 핵심 문장을 찾고, 직접 문장을 쓸 때 오류를 줄이는 기준이 됩니다.`,
    },
  ],
};

export const ENGLISH_UNIT_CONTENT = createSubjectUnitContent(englishFrame);
