import { auditUnitInteractions } from '../lib/unit-blueprints/audits';
import {
  PATTERN_ENGINE_CATALOG,
} from '../lib/unit-blueprints';

const report = auditUnitInteractions();

console.log('[interaction-audit] UnitBlueprint interaction coverage');
console.log(`[interaction-audit] units checked: ${report.checked}`);
console.log(`[interaction-audit] pattern engines: ${PATTERN_ENGINE_CATALOG.length}`);
console.log('[interaction-audit] required sections: 20 engine files, renderer registry, representative e2e suite, engineId, variables, initialState, engineData, feedbackRules, misconception responses, acceptance criteria, mobile 360px readiness');
console.log(`[interaction-audit] blockers: ${report.blockers.length}`);

for (const blocker of report.blockers.slice(0, 50)) {
  console.error(`  ERROR: ${blocker}`);
}
if (report.blockers.length > 50) {
  console.error(`  ... ${report.blockers.length - 50} more`);
}

process.exit(report.blockers.length > 0 ? 1 : 0);
