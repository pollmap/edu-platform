import type { HighSchoolUnit, Subject, Unit } from '../types';

export type UnitContentSourceRef = {
  sourceType: 'official-primary' | 'official-secondary' | 'local-ledger' | 'local-metadata';
  title: string;
  document?: string;
  url?: string;
  officialUrl?: string;
  documentTitle: string;
  documentDate: string;
  locator: string;
  evidenceText: string;
  retrievedAt: string;
  verificationStatus: 'verified' | 'blocked' | 'needs-review';
  note: string;
};

export type UnitContentExample = {
  title: string;
  setup: string;
  walkthrough: string;
  takeaway: string;
};

export type MiniQuizKind = 'concept-check' | 'application' | 'mistake-or-transfer';

export type UnitContentQuizItem = {
  kind: MiniQuizKind;
  question: string;
  answer: string;
  explanation: string;
};

export type UnitContentCommonMistake = {
  mistake: string;
  correction: string;
};

export type UnitContentRealLifeApplication = {
  context: string;
  description: string;
};

export interface UnitContent {
  unitId: string;
  sourceRefs: UnitContentSourceRef[];
  explanations: {
    easy: string;
    standard: string;
    advanced: string;
  };
  examples: UnitContentExample[];
  miniQuiz: UnitContentQuizItem[];
  commonMistakes: UnitContentCommonMistake[];
  realLifeApplications: UnitContentRealLifeApplication[];
  nextUnitIds: string[];
}

export type AnyUnit = Unit | HighSchoolUnit;

export type SubjectContentFrame = {
  subject: Subject;
  easy: (unit: AnyUnit, domainLabel: string) => string;
  standard: (unit: AnyUnit, domainLabel: string) => string;
  advanced: (unit: AnyUnit, domainLabel: string) => string;
  examples: (unit: AnyUnit, domainLabel: string) => UnitContentExample[];
  miniQuiz: (unit: AnyUnit, domainLabel: string) => UnitContentQuizItem[];
  commonMistakes: (unit: AnyUnit, domainLabel: string) => UnitContentCommonMistake[];
  realLifeApplications: (unit: AnyUnit, domainLabel: string) => UnitContentRealLifeApplication[];
};
