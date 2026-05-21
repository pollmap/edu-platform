import type { HighSchoolUnit, Subject, Unit } from './types';
import { getUnitContent, type UnitContent } from './unit-content';

export interface UnitLearningMaterial {
  gradeLabel: string;
  subjectLabel: string;
  coreQuestion: string;
  quickSummary: string;
  learningGoals: string[];
  loopSteps: Array<{
    label: string;
    title: string;
    description: string;
  }>;
  miniChallenge: string;
  misconception: string;
  application: string;
  studentOutput: string;
  reviewQuestions: string[];
  sourceNote: string;
  unitContent?: UnitContent;
}

const SUBJECT_LABELS: Record<Subject, string> = {
  math: '수학',
  science: '과학',
  korean: '국어',
  english: '영어',
  social: '사회',
};

const SUBJECT_FRAME: Record<
  Subject,
  {
    question: (title: string, domain: string) => string;
    summary: (title: string, domain: string, interactiveTitle: string) => string;
    goals: (title: string, interactiveTitle: string) => string[];
    predict: (title: string) => string;
    explain: (title: string) => string;
    challenge: (title: string, interactiveTitle: string) => string;
    misconception: (title: string) => string;
    application: (title: string, domain: string) => string;
    output: (title: string) => string;
    review: (title: string, domain: string) => string[];
  }
> = {
  math: {
    question: (title, domain) => `${title}에서 변하는 양과 변하지 않는 규칙은 무엇일까?`,
    summary: (title, domain, interactiveTitle) =>
      `${title}은 ${domain} 단원에서 수, 식, 그림 사이의 관계를 찾는 학습입니다. ${interactiveTitle}을 움직이며 규칙을 먼저 보고, 그 다음 식이나 용어로 정리합니다.`,
    goals: (title, interactiveTitle) => [
      `${title}의 핵심 용어를 그림이나 수식으로 설명한다.`,
      `${interactiveTitle}에서 값을 바꾸며 결과가 어떻게 달라지는지 관찰한다.`,
      `예측한 결과와 실제 결과를 비교해 규칙을 한 문장으로 말한다.`,
    ],
    predict: (title) => `${title}에서 값 하나를 바꾸면 모양, 크기, 위치, 비율 중 무엇이 먼저 달라질지 예측합니다.`,
    explain: (title) => `관찰한 변화를 식, 단위, 그래프, 표 중 하나와 연결해 ${title}의 규칙을 설명합니다.`,
    challenge: (title, interactiveTitle) =>
      `${title} 활동에서 ${interactiveTitle}을 사용해 조건을 하나 정한 뒤, 원하는 결과가 나오도록 값을 조절하고 왜 그렇게 되는지 말해 보세요.`,
    misconception: (title) =>
      `${title}은 공식을 외우는 단원이 아니라, 수·식·그림이 같은 규칙을 말한다는 점을 확인하는 단원입니다.`,
    application: (title, domain) =>
      `${domain} 문제를 풀 때 ${title}의 규칙을 표, 그래프, 식 중 가장 잘 보이는 표현으로 바꾸면 풀이가 짧아집니다.`,
    output: (title) => `${title}의 규칙을 예시 1개, 그림 1개, 설명 문장 1개로 남깁니다.`,
    review: (title, domain) => [
      `${title}에서 반드시 기억해야 할 양이나 기호는 무엇인가?`,
      `그 양이 커지거나 작아질 때 결과는 어떤 방향으로 변하는가?`,
      `${domain}의 이전 단원과 이어지는 규칙은 무엇인가?`,
    ],
  },
  science: {
    question: (title) => `${title}에서 어떤 조건이 현상을 바꾸고, 그 까닭은 무엇일까?`,
    summary: (title, domain, interactiveTitle) =>
      `${title}은 ${domain} 현상을 변수와 결과로 나누어 살피는 학습입니다. ${interactiveTitle}으로 조건을 바꿔 보고, 눈에 보이는 변화와 과학 원리를 연결합니다.`,
    goals: (title, interactiveTitle) => [
      `${title}에서 조절할 수 있는 조건과 관찰할 결과를 구분한다.`,
      `${interactiveTitle}을 조작하며 변화가 커지는 경우와 작아지는 경우를 찾는다.`,
      `관찰 결과를 입자, 힘, 에너지, 생명, 지구 시스템 중 알맞은 원리로 설명한다.`,
    ],
    predict: (title) => `${title}에서 조건을 하나 바꾸기 전에 결과가 커질지, 작아질지, 방향이 바뀔지 예측합니다.`,
    explain: (title) => `눈에 보이는 변화 뒤에 있는 원인을 찾아 ${title}의 현상을 원리 문장으로 정리합니다.`,
    challenge: (title, interactiveTitle) =>
      `${title} 활동에서 ${interactiveTitle}의 변수를 하나씩만 바꾸며, 가장 큰 변화가 나타나는 조건을 찾아 근거를 적어 보세요.`,
    misconception: (title) =>
      `${title}은 용어 암기가 아니라 조건을 바꾸었을 때 나타나는 결과를 근거로 설명하는 학습입니다.`,
    application: (title, domain) =>
      `${domain} 탐구에서는 ${title}의 변수를 하나씩만 바꾸어야 원인과 결과를 분명하게 말할 수 있습니다.`,
    output: (title) => `${title}에서 바꾼 조건, 관찰한 변화, 그렇게 생각한 까닭을 세 줄 실험 기록으로 남깁니다.`,
    review: (title, domain) => [
      `${title}에서 조작한 독립변수는 무엇인가?`,
      `관찰한 종속변수는 어떤 방향으로 변했는가?`,
      `${domain} 현상을 설명할 때 쓰는 핵심 원리는 무엇인가?`,
    ],
  },
  korean: {
    question: (title) => `${title}에서 의미를 판단하게 해 주는 단서는 무엇일까?`,
    summary: (title, domain, interactiveTitle) =>
      `${title}은 ${domain} 활동에서 말과 글의 구조를 확인하는 학습입니다. ${interactiveTitle}로 단서를 분류하고, 근거를 들어 해석하거나 표현합니다.`,
    goals: (title, interactiveTitle) => [
      `${title}의 핵심 개념을 예시 문장이나 글 구조와 연결한다.`,
      `${interactiveTitle}에서 단서, 근거, 효과를 직접 분류한다.`,
      `판단한 내용을 “왜냐하면”으로 시작하는 근거 문장으로 설명한다.`,
    ],
    predict: (title) => `${title}에서 단서 하나를 바꾸면 의미, 분위기, 설득력 중 무엇이 달라질지 예측합니다.`,
    explain: (title) => `선택한 단서가 독자나 청자에게 어떤 효과를 만드는지 ${title}의 개념어로 설명합니다.`,
    challenge: (title, interactiveTitle) =>
      `${title} 활동에서 ${interactiveTitle}의 가장 중요한 단서를 하나 고르고, 그 단서가 빠지면 해석이 어떻게 달라지는지 말해 보세요.`,
    misconception: (title) =>
      `${title}은 느낌을 맞히는 활동이 아니라, 말과 글 안의 단서를 근거로 판단하는 활동입니다.`,
    application: (title, domain) =>
      `${domain} 과제에서는 ${title}의 개념을 써서 주장, 근거, 표현 효과를 분리하면 답안이 분명해집니다.`,
    output: (title) => `${title}에 맞는 근거 문장 2개와 나의 해석 1문장을 짝지어 남깁니다.`,
    review: (title, domain) => [
      `${title}을 판단할 때 먼저 확인할 단서는 무엇인가?`,
      `근거가 충분한 해석과 느낌만 있는 해석은 어떻게 다른가?`,
      `${domain} 활동에서 이 개념을 적용할 수 있는 상황은 무엇인가?`,
    ],
  },
  english: {
    question: (title) => `${title}에서 형태가 바뀌면 의미와 쓰임은 어떻게 달라질까?`,
    summary: (title, domain, interactiveTitle) =>
      `${title}은 영어 표현을 상황, 형태, 의미로 나누어 익히는 학습입니다. ${interactiveTitle}로 문장을 바꿔 보며 실제로 쓸 수 있는 패턴을 만듭니다.`,
    goals: (title, interactiveTitle) => [
      `${title}의 기본 형태와 의미를 한국어 설명 없이도 구분한다.`,
      `${interactiveTitle}에서 단어 순서나 표현을 바꾸며 의미 차이를 확인한다.`,
      `짧은 상황에 맞는 영어 문장 하나를 직접 만들어 본다.`,
    ],
    predict: (title) => `${title}에서 시제, 어순, 조동사, 연결어 중 하나를 바꾸면 의미가 어떻게 달라질지 예측합니다.`,
    explain: (title) => `바뀐 영어 표현이 시간, 태도, 대상, 조건 중 무엇을 나타내는지 ${title}의 규칙으로 설명합니다.`,
    challenge: (title, interactiveTitle) =>
      `${title} 활동에서 ${interactiveTitle}의 예문 하나를 고른 뒤, 상황을 바꿔 같은 패턴의 새 문장을 만들어 보세요.`,
    misconception: (title) =>
      `${title}은 한국어 뜻을 단어별로 바꾸는 일이 아니라, 영어식 형태와 상황을 함께 고르는 일입니다.`,
    application: (title, domain) =>
      `${domain || '영어'} 과제에서는 ${title}의 패턴을 먼저 정하고, 주어·동사·시간·조건을 바꾸면 새 문장을 만들 수 있습니다.`,
    output: (title) => `${title} 패턴으로 기본 예문 1개와 내가 바꾼 예문 1개를 나란히 남깁니다.`,
    review: (title, domain) => [
      `${title}에서 가장 자주 쓰는 형태는 무엇인가?`,
      `그 형태가 문장 의미를 어떻게 바꾸는가?`,
      `${domain || '영어'} 학습에서 이 패턴을 실제로 쓸 수 있는 상황은 무엇인가?`,
    ],
  },
  social: {
    question: (title) => `${title}에서 사람, 공간, 제도는 서로 어떻게 영향을 주고받을까?`,
    summary: (title, domain, interactiveTitle) =>
      `${title}은 ${domain} 자료를 비교하며 원인, 과정, 결과를 연결하는 학습입니다. ${interactiveTitle}로 관점이나 조건을 바꾸며 사회 현상을 읽습니다.`,
    goals: (title, interactiveTitle) => [
      `${title}의 핵심 사건, 공간, 제도, 자료를 구분한다.`,
      `${interactiveTitle}에서 관점이나 조건을 바꾸며 결과 차이를 비교한다.`,
      `원인과 결과를 연결해 사회 현상을 한 문장으로 설명한다.`,
    ],
    predict: (title) => `${title}에서 조건이나 관점을 바꾸면 누구에게 어떤 영향이 생길지 예측합니다.`,
    explain: (title) => `자료 속 변화가 나타난 까닭을 원인, 과정, 결과 순서로 묶어 ${title}을 설명합니다.`,
    challenge: (title, interactiveTitle) =>
      `${title} 활동에서 ${interactiveTitle}의 두 사례를 비교하고, 공통점 1개와 차이점 1개를 근거와 함께 정리해 보세요.`,
    misconception: (title) =>
      `${title}은 사건이나 제도를 나열하는 단원이 아니라, 원인·과정·결과와 이해관계를 연결하는 단원입니다.`,
    application: (title, domain) =>
      `${domain} 자료를 읽을 때 ${title}의 관점으로 누가 영향을 받는지, 어떤 자료가 근거인지 먼저 표시합니다.`,
    output: (title) => `${title}의 원인 1개, 결과 1개, 오늘 생활과 이어지는 예 1개를 표로 남깁니다.`,
    review: (title, domain) => [
      `${title}에서 비교해야 할 대상은 무엇인가?`,
      `원인과 결과를 구분할 수 있는 근거 자료는 무엇인가?`,
      `${domain} 관점에서 이 개념이 오늘의 생활과 연결되는 지점은 무엇인가?`,
    ],
  },
};

function gradeLabel(unit: Unit | HighSchoolUnit): string {
  if ('course' in unit) {
    return unit.courseName ?? '고등학교';
  }
  if (unit.schoolLevel === 'cross-grade') {
    return '공통';
  }
  if (!unit.grade) return '공통';
  return unit.grade <= 6 ? `초${unit.grade}` : `중${unit.grade - 6}`;
}

function domainLabel(unit: Unit | HighSchoolUnit): string {
  if (unit.domain.trim()) return unit.domain;
  if ('course' in unit) return unit.courseName ?? unit.course;
  return SUBJECT_LABELS[unit.subject];
}

export function buildUnitLearningMaterial(unit: Unit | HighSchoolUnit): UnitLearningMaterial {
  const frame = SUBJECT_FRAME[unit.subject];
  const domain = domainLabel(unit);
  const interactiveTitle = unit.interactiveTitle || `${unit.title} 조작`;
  const unitContent = getUnitContent(unit.id);

  return {
    gradeLabel: gradeLabel(unit),
    subjectLabel: SUBJECT_LABELS[unit.subject],
    coreQuestion: frame.question(unit.title, domain),
    quickSummary: unitContent?.explanations.easy ?? frame.summary(unit.title, domain, interactiveTitle),
    learningGoals: frame.goals(unit.title, interactiveTitle),
    loopSteps: [
      {
        label: 'See',
        title: '먼저 보기',
        description: `${unit.title}의 핵심 질문과 오늘 다룰 개념어를 확인합니다.`,
      },
      {
        label: 'Touch',
        title: '손으로 바꾸기',
        description: `${interactiveTitle}에서 값을 움직이거나 카드를 분류해 결과를 직접 확인합니다.`,
      },
      {
        label: 'Predict',
        title: '결과 예측하기',
        description: frame.predict(unit.title),
      },
      {
        label: 'Explain',
        title: '이유 확인하기',
        description: frame.explain(unit.title),
      },
      {
        label: 'Challenge',
        title: '한 문제 도전하기',
        description: '이해했어요, 헷갈려요, 다시 볼래요 중 하나를 골라 복습 큐에 반영합니다.',
      },
    ],
    miniChallenge: unitContent?.miniQuiz[1]
      ? `${unit.title}: ${unitContent.miniQuiz[1].question}`
      : frame.challenge(unit.title, interactiveTitle),
    misconception: unitContent?.commonMistakes[0]
      ? `${unitContent.commonMistakes[0].mistake} ${unitContent.commonMistakes[0].correction}`
      : frame.misconception(unit.title),
    application: unitContent?.realLifeApplications[0]?.description ?? frame.application(unit.title, domain),
    studentOutput: frame.output(unit.title),
    reviewQuestions: unitContent?.miniQuiz.map((item) => item.question) ?? frame.review(unit.title, domain),
    sourceNote: unitContent
      ? `세부 콘텐츠 출처: ${unitContent.sourceRefs.map((ref) => ref.title).join(' · ')} · ${unit.id}`
      : `단원 기준: ${gradeLabel(unit)} ${SUBJECT_LABELS[unit.subject]} · ${domain} · ${unit.id}`,
    unitContent,
  };
}
