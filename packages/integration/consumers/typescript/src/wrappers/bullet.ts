// @britecharts/wrappers gained a published type surface when its ESM entry
// moved from authored TypeScript in src/ to a built dist/esm with generated
// declarations. Nothing here imported it before, so nothing proved the
// `types` field resolves or that the generated declarations are usable --
// `attw` checks the package's shape, not whether a consumer can type a call.
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

  BulletWrapper.update(node, [SAMPLE_BULLET_DATA], { width: 600 }, chart);
  BulletWrapper.destroy(node);

  return chart;
};

// Note: `chart.width()` as a *getter* does not type as `number` -- core models
// every accessor as a single `width(width?: number): T & ChartBaseAPI<T>`
// signature, so the no-argument call is typed as returning the chart. That is
// a known consequence of the mixin style core's typings deliberately use (an
// overload pair would type the getter but defeats the mapped type the wrapper
// configuration depends on), and it is core's to resolve when it converts.

export const rejectsWrongConfiguration = () =>
  BulletWrapper.create(document.createElement('div'), [SAMPLE_BULLET_DATA], {
    // @ts-expect-error width takes a number, not a string
    width: 'wide',
  });
