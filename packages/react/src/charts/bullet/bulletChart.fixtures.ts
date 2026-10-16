import type { BulletChartDataShape } from '@britecharts/core';

const fullTestData = (): BulletChartDataShape[] => [
    {
        ranges: [130, 160, 250],
        measures: [150, 180],
        markers: [175],
    },
];
const partialTestData = (): BulletChartDataShape[] => [
    {
        ranges: [130],
        measures: [150],
        markers: [105],
    },
];
const underRangeNoMarker = (): BulletChartDataShape[] => [
    {
        ranges: [50, 100],
        measures: [25],
        markers: [],
    },
];

export default {
    fullTestData,
    partialTestData,
    underRangeNoMarker,
};
