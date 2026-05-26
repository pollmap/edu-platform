import { describe, expect, it } from 'vitest';
import { findUnit } from '@/lib/curriculum';
import { buildRoadmapPreview } from '@/lib/roadmap';

describe('roadmap preview model', () => {
  it('builds M9-CR-03 from verified prerequisite and next-unit metadata', () => {
    const unit = findUnit('M9-CR-03');
    expect(unit).toBeDefined();

    const roadmap = buildRoadmapPreview(unit!);

    expect(roadmap.current).toMatchObject({
      id: 'M9-CR-03',
      available: true,
      role: 'current',
    });
    expect(roadmap.prerequisites.map((node) => node.id)).toEqual(['M8-CR-04', 'M9-CR-01']);
    expect(roadmap.prerequisites.every((node) => node.available)).toBe(true);
    expect(roadmap.next.length).toBeGreaterThan(0);
    expect(roadmap.missingIds).toEqual([]);
  });

  it('keeps missing next-unit ids visible instead of dropping them', () => {
    const unit = findUnit('M9-CR-03');
    expect(unit).toBeDefined();

    const roadmap = buildRoadmapPreview(unit!, { nextUnitIds: ['MISSING-UNIT'] });

    expect(roadmap.next).toEqual([
      {
        id: 'MISSING-UNIT',
        title: '등록 대기 중',
        role: 'next',
        available: false,
      },
    ]);
    expect(roadmap.missingIds).toEqual(['MISSING-UNIT']);
  });
});
