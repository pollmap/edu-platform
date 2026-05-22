import type {
  UnitInteractionContentHints,
  UnitInteractionFeedbackRule,
  UnitInteractionVariable,
} from '@/lib/unit-blueprints';

export interface PatternEngineProps {
  unitId: string;
  title: string;
  variables: UnitInteractionVariable[];
  initialState: Record<string, string | number | boolean>;
  feedbackRules: UnitInteractionFeedbackRule[];
  contentHints: UnitInteractionContentHints;
  engineData: Record<string, unknown>;
}

export type PatternEngineState = Record<string, string | number | boolean>;
