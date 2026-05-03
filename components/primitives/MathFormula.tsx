'use client';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathFormulaProps {
  tex: string;
  block?: boolean;
}

export function MathFormula({ tex, block = false }: MathFormulaProps) {
  return block ? <BlockMath math={tex} /> : <InlineMath math={tex} />;
}
