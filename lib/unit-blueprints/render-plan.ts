import { getUnitBlueprint, type PatternEngineId } from './index';

export interface UnitInteractiveRenderPlan {
  unitId: string;
  engineId: PatternEngineId;
  mode: 'pattern-engine' | 'legacy-component';
  legacyComponentName: string;
}

export function getUnitInteractiveRenderPlan(unitId: string): UnitInteractiveRenderPlan | undefined {
  const blueprint = getUnitBlueprint(unitId);
  if (!blueprint) return undefined;

  return {
    unitId,
    engineId: blueprint.interaction.engineId,
    mode: blueprint.implementationStatus.renderer,
    legacyComponentName: blueprint.interaction.componentName,
  };
}
