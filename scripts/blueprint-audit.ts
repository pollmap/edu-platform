import { auditUnitBlueprints } from '../lib/unit-blueprints/audits';
import {
  OFFICIAL_VERIFIED_UNIT_TARGET,
  UNVERIFIED_EXPANSION_CANDIDATE_COUNT,
} from '../lib/unit-content';

const report = auditUnitBlueprints();

console.log('[blueprint-audit] UnitBlueprint coverage');
console.log(`[blueprint-audit] units checked: ${report.checked}`);
console.log(`[blueprint-audit] verified target: ${OFFICIAL_VERIFIED_UNIT_TARGET}`);
console.log(`[blueprint-audit] unverified expansion candidates held out: ${UNVERIFIED_EXPANSION_CANDIDATE_COUNT}`);
console.log('[blueprint-audit] required sections: full sourceRefs provenance, 1200+ chars, 3 examples, 3 miniProblems, answers, mistakes, applications, authored content status, pattern renderer status');
console.log(`[blueprint-audit] blockers: ${report.blockers.length}`);

for (const blocker of report.blockers.slice(0, 50)) {
  console.error(`  ERROR: ${blocker}`);
}
if (report.blockers.length > 50) {
  console.error(`  ... ${report.blockers.length - 50} more`);
}

process.exit(report.blockers.length > 0 ? 1 : 0);
