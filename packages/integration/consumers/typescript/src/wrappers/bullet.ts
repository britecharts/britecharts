// @britecharts/wrappers publishes generated declarations beside a built
// dist/esm. This file proves its `types` field resolves and that those
// declarations are usable -- `attw` checks the package's shape, not whether a
// consumer can type a call.
import { BulletWrapper } from '@britecharts/wrappers';
import type { BulletChartModule } from '@britecharts/core';

import { SAMPLE_BULLET_DATA } from '../data/bullet-sample';

export const draw = (node: HTMLElement) => {
  // What comes back is core's BulletChartModule, not `any` -- annotating it
  // explicitly is the assertion.
  const chart: BulletChartModule = BulletWrapper.create(
    node,
    [SAMPLE_BULLET_DATA],
    { width: 500, height: 300 }
  );

  // Accessors are chainable, and each setter's value type is checked.
  chart.width(600).height(400);

  // The chart the wrapper hands back reads its accessors with their own value
  // types, the same as one made directly (see ../charts/accessors.ts).
  const width: number = chart.width();
  const height: number = chart.height();

  BulletWrapper.update(node, [SAMPLE_BULLET_DATA], { width: 600 }, chart);
  BulletWrapper.destroy(node);

  return { chart, width, height };
};

export const rejectsWrongConfiguration = () =>
  BulletWrapper.create(document.createElement('div'), [SAMPLE_BULLET_DATA], {
    // @ts-expect-error width takes a number, not a string
    width: 'wide',
  });
