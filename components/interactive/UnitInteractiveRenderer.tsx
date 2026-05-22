import { getUnitBlueprint } from '@/lib/unit-blueprints';
import { getUnitInteractiveRenderPlan } from '@/lib/unit-blueprints/render-plan';
import { PATTERN_ENGINE_COMPONENTS } from './pattern-engines/registry';

interface UnitInteractiveRendererProps {
  unitId: string;
}

export function UnitInteractiveRenderer({ unitId }: UnitInteractiveRendererProps) {
  const blueprint = getUnitBlueprint(unitId);
  const plan = getUnitInteractiveRenderPlan(unitId);

  if (!blueprint || !plan) {
    throw new Error(`UnitBlueprint is missing for ${unitId}.`);
  }

  if (plan.mode !== 'pattern-engine') {
    throw new Error(`${unitId} is not configured for a pattern engine renderer.`);
  }

  const Engine = PATTERN_ENGINE_COMPONENTS[plan.engineId];
  if (!Engine) {
    throw new Error(`Pattern engine ${plan.engineId} is not registered.`);
  }

  return (
    <Engine
      unitId={unitId}
      title={blueprint.interaction.title}
      variables={blueprint.interaction.variables}
      initialState={blueprint.interaction.initialState}
      feedbackRules={blueprint.interaction.feedbackRules}
      contentHints={blueprint.interaction.contentHints}
      engineData={blueprint.interaction.engineData}
    />
  );
}
