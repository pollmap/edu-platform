import { expect, test } from '@playwright/test';
import type { Locator } from '@playwright/test';
import { findUnit, unitPath } from '../../lib/curriculum';
import { ENGINE_REPRESENTATIVE_UNITS } from '../../lib/unit-blueprints';

async function moveFirstControl(surface: Locator) {
  const slider = surface.getByRole('slider').first();
  if (await slider.count()) {
    await slider.focus();
    await slider.press('ArrowRight');
    return;
  }

  const combo = surface.getByRole('combobox').first();
  if (await combo.count()) {
    const values = await combo.locator('option').evaluateAll((options) =>
      options.map((option) => (option as HTMLOptionElement).value),
    );
    if (values[1]) await combo.selectOption(values[1]);
  }
}

for (const representative of ENGINE_REPRESENTATIVE_UNITS) {
  test(`renders representative ${representative.engineId} unit`, async ({ page }) => {
    const unit = findUnit(representative.unitId);
    expect(unit, representative.unitId).toBeDefined();

    await page.goto(unitPath(unit!));

    const surface = page.locator(`[data-pattern-engine="${representative.engineId}"]`).first();
    await expect(surface).toBeVisible();
    await expect(surface.getByText('Pattern engine').first()).toBeVisible();

    const box = await surface.boundingBox();
    expect(box?.width, `${representative.engineId} width`).toBeGreaterThan(280);
    expect(box?.height, `${representative.engineId} height`).toBeGreaterThan(180);

    await moveFirstControl(surface);
    await expect(surface.getByRole('button', { name: 'Reset' })).toBeVisible();
    await surface.getByRole('button', { name: 'Reset' }).click();
  });
}
