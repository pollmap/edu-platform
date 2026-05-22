import { getUnitBlueprint } from '@/lib/unit-blueprints';
import { getUnitInteractiveRenderPlan } from '@/lib/unit-blueprints/render-plan';
import { SliderGraphPatternEngine } from './pattern-engines/SliderGraphPatternEngine';

interface UnitInteractiveRendererProps {
  unitId: string;
}

export function UnitInteractiveRenderer({ unitId }: UnitInteractiveRendererProps) {
  const blueprint = getUnitBlueprint(unitId);
  const plan = getUnitInteractiveRenderPlan(unitId);

  if (!blueprint || !plan) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-100">
        UnitBlueprint is missing for {unitId}.
      </div>
    );
  }

  if (plan.mode === 'pattern-engine' && plan.engineId === 'slider-graph') {
    return (
      <SliderGraphPatternEngine
        unitId={unitId}
        title={blueprint.interaction.title}
        variables={blueprint.interaction.variables}
        feedbackRules={blueprint.interaction.feedbackRules}
      />
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
      <div className="font-semibold text-zinc-950 dark:text-zinc-50">{blueprint.interaction.title}</div>
      <p className="mt-1">
        This unit is blueprint-ready and still rendered by legacy component{' '}
        <span className="font-mono">{plan.legacyComponentName}</span>.
      </p>
    </div>
  );
}
