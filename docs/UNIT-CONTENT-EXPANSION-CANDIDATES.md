# UnitContent 488 Expansion Candidates

**Last Updated:** 2026-05-22

## Status

The app currently exposes 392 verified units from `docs/00-MASTER-INDEX.md`.
The long-term 488-unit target implies 96 additional units, but those 96 are **not app data** yet.

## Admission Rule

An additional unit can be added only when the implementation records all of the following:

| Required field | Rule |
|----------------|------|
| Unit ID | Stable ID that does not collide with the current 392 |
| Subject | One of math, science, korean, english, social |
| School level / grade / course | Must match an official curriculum row or official course listing |
| Domain / area | Must be traceable to NCIC, official curriculum notices, or high-school credit-system material |
| Unit title | Must come from an official source or a repository document that cites one |
| Source | URL or document title, plus enough context to find the row again |
| UnitContent | sourceRefs, easy/standard/advanced explanations, 3 examples, fixed 3-question miniQuiz, answers/explanations, common mistakes, real-life applications, valid nextUnitIds |
| UnitBlueprint | sourceRefs with locator context, UnitContent adapter fields, interaction engine, variables, feedback rules, misconception responses, and mobile acceptance criteria |

## Blocked Candidates

| Bucket | Count | Status | Reason |
|--------|-------|--------|--------|
| Additional 488 target units | 96 | Blocked | No verified per-unit official rows have been recorded in this repository |

## Implementation Notes

- Do not add placeholder units to `lib/curriculum/`.
- Do not add synthetic unit IDs to satisfy the 488 count.
- Do not present inferred or draft titles as official curriculum data.
- The former `hscredit.kr` homepage must not be treated as sufficient evidence unless its official content is revalidated at the time of use. Current high-school credit-system context uses `https://www.hscredit.net/`; per-unit admission still requires a traceable official row.
- When a candidate is verified, update `docs/00-MASTER-INDEX.md`, regenerate curriculum metadata, add `UnitContent`, confirm `UnitBlueprint`, and then raise `OFFICIAL_VERIFIED_UNIT_TARGET`.
