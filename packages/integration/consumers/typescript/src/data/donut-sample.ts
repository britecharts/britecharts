import { DonutChartDataShape } from '@britecharts/core';

export const SAMPLE_DONUT_DATA: DonutChartDataShape[] = [
  {
    name: 'Shiny',
    id: 11,
    quantity: 200,
    percentage: 25,
  },
  {
    name: 'Radiant',
    id: 12,
    quantity: 0,
    percentage: 0,
  },
  {
    name: 'Sparkling',
    id: 13,
    quantity: 600,
    percentage: 75,
  },
];

// The control for core's corrected data shape: the donut's own `@typedef`
// documents `percentage` as optional (the chart computes it from the
// quantities) and `id` as needed only by the legend feature, and the published
// shape used to require both -- so the data the chart documents did not
// compile. Quantity and name alone have to be enough, or that correction was
// not made.
export const SAMPLE_DONUT_MINIMAL: DonutChartDataShape[] = [
  { name: 'Shiny', quantity: 200 },
  { name: 'Radiant', quantity: 0 },
];
