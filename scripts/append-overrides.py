"""Append override entries to lib/curriculum/overrides.ts."""
import re
from pathlib import Path

MAPPINGS = """E-CE1-01|SituationalDialogueSimulator
E-CE1-02|KeySentenceHighlighter
E-CE1-03|EnglishWritingBuilder
E-CE1-04|TenseTimelineExplorer
H-IS1-01|MultiPerspectiveAnalyzer
H-IS1-02|HappinessFactorsExplorer
H-IS1-03|ClimateLifestyleSimulator
H-IS1-04|UrbanizationSimulator
H-IS1-05|HumanRightsCaseExplorer
H-IS1-06|SupplyDemandExplorer
H-IS2-01|GiniCoefficientExplorer
H-IS2-02|CultureComparisonMatrix
H-IS2-03|GlobalizationIndicatorsExplorer
H-IS2-04|SDGsExplorer
K-CK1-01|DebateStructureExplorer
K-CK1-02|TextStructureTree
K-CK1-03|OutlinePlannerExplorer
K-CK1-04|PhonemeChangeExplorer
K-CK1-05|LiteraryGenreExplorer
K-CK1-06|MediaComparisonMatrix
K-CK2-01|DebateStructureExplorer
K-CK2-02|FactOpinionSorter
K-CK2-03|ArgumentStructureBuilder
K-CK2-04|SentenceComponentTree
K-CK2-05|KoreanLiteraryHistoryTimeline
K-CK2-06|MediaLiteracyExplorer
M-AL-01|ExponentLogExplorer
M-AL-02|ExponentLogFunctionExplorer
M-AL-03|UnitCircleExplorer
M-AL-04|TrigGraphExplorer
M-AL-06|ArithmeticSequenceExplorer
M-AL-07|GeometricSequenceExplorer
M-AL-08|DominoInductionExplorer
M-AM-01|DataDistributionExplorer
M-AM-02|TfidfVectorExplorer
M-AM-03|ImageFilterExplorer
M-AM-04|MatrixTransformExplorer
M-AM-05|GradientDescentExplorer
M-AM-06|NaiveBayesClassifier
M-CA1-01|FunctionLimitExplorer
M-CA1-03|DerivativeExplorer
M-CA1-06|RiemannSumExplorer
M-CA2-01|SequenceLimitExplorer
M-CA2-05|MotionDerivativeExplorer
M-CM1-01|PolynomialOperationsExplorer
M-CM1-02|RemainderTheoremExplorer
M-CM1-03|AreaModelMultiplication
M-CM1-04|ComplexPlaneExplorer
M-CM1-05|QuadraticFunctionExplorer
M-CM1-06|QuadraticFunctionExplorer
M-CM1-07|HigherDegreeEquationExplorer
M-CM1-08|PermutationCombinationTree
M-CM2-01|PlaneCoordinateExplorer
M-CM2-02|LinearFunctionExplorer
M-CM2-03|CircleEquationExplorer
M-CM2-04|TransformationExplorer
M-CM2-05|VennDiagramExplorer
M-CM2-06|TruthTableExplorer
M-CM2-07|FunctionBoxExplorer
M-CM2-08|RationalIrrationalFunctionExplorer
M-EM-01|CompoundInterestExplorer
M-EM-02|AnnuityCalculator
M-EM-03|ElasticityExplorer
M-EM-04|MarginalAnalysisExplorer
M-EM-05|KosisDataExplorer
M-GE-01|ConicSectionExplorer
M-GE-03|VectorPlaneExplorer
M-GE-04|VectorDotProductExplorer
M-PS-01|PermutationCombinationExplorer
M-PS-02|PascalTriangleExplorer
M-PS-03|ProbabilityVennExplorer
M-PS-04|BayesTheoremSimulator
M-PS-05|DiscreteDistributionExplorer
M-PS-06|NormalDistributionExplorer
M-PS-07|ConfidenceIntervalSimulator
S-BIO-01|CharacteristicsOfLifeMatrix
S-BIO-02|HumanMetabolismFlow
S-BIO-03|HumanBodySystems
S-BIO-04|ImmuneResponseSimulator
S-BIO-05|PunnettSquareExplorer
S-BIO-06|NaturalSelectionSimulator
S-BIO-07|FoodWebExplorer
S-CHE-01|MoleConverterExplorer
S-CHE-02|PeriodicTableExplorer
S-CHE-03|ChemicalBondExplorer
S-CHE-04|MolecularGeometryExplorer
S-CHE-05|ReactionEnergyDiagram
S-CHE-06|PHIndicator
S-CHE-07|ReactionRateExplorer
S-EAR-01|RockCyclePlateExplorer
S-EAR-02|GlobalCirculationExplorer
S-EAR-03|SolarSystemExplorer
S-EAR-04|GeologicTimescaleExplorer
S-EAR-05|EarthquakeWaveSimulator
S-IS1-01|UnitConversionExplorer
S-IS1-02|PeriodicTableExplorer
S-IS1-03|PhotosynthesisExplorer
S-IS1-04|PendulumFreefallSimulator
S-IS2-01|ChemicalEquilibriumSimulator
S-IS2-02|HumanBodySystems
S-IS2-03|BiologyClassificationTree
S-IS2-04|CarbonCycleExplorer
S-PHY-01|TimeDistanceGraph
S-PHY-02|ForceVectorExplorer
S-PHY-03|EnergyTransformExplorer
S-PHY-04|MomentumCollisionExplorer
S-PHY-05|CircuitBuilder
S-PHY-06|WaveInterferenceExplorer
S-PHY-07|ModernPhysicsExplorer"""


def main() -> int:
    ov = Path('lib/curriculum/overrides.ts')
    text = ov.read_text(encoding='utf-8')
    existing = set(re.findall(r"'([A-Za-z0-9-]+)':\s*\{", text))

    new_entries: list[str] = []
    for line in MAPPINGS.strip().splitlines():
        if '|' not in line:
            continue
        uid, comp = line.split('|', 1)
        if uid in existing:
            continue
        new_entries.append(
            f"  '{uid}': {{\n"
            f"    status: 'draft',\n"
            f"    prerequisites: [],\n"
            f"    achievementStandards: [],\n"
            f"    componentName: '{comp}',\n"
            f"    patternIds: [1],\n"
            f"  }},"
        )

    print(f"existing: {len(existing)} entries · adding: {len(new_entries)}")
    if not new_entries:
        return 0

    block = '\n'.join(new_entries) + '\n'
    last = text.rstrip().rfind('};')
    new_text = text[:last] + block + text[last:]
    ov.write_text(new_text, encoding='utf-8', newline='\n')
    print(f"wrote: {ov}")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
