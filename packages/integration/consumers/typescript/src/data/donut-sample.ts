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

// The control for core's data shape: the donut's own `@typedef` documents
// `percentage` as optional (the chart computes it from the quantities) and
// `id` as needed only by the legend feature. Quantity and name alone have to
// be enough, or the data the chart documents does not compile.
export const SAMPLE_DONUT_MINIMAL: DonutChartDataShape[] = [
  { name: 'Shiny', quantity: 200 },
  { name: 'Radiant', quantity: 0 },
];
