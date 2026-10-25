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
// From core's bullet data builder: withAllElements, withNoMarker and
// withManyCPUData. Each item is one bullet.
const withAllElements = (): BulletChartDataShape[] => [
    {
        ranges: [1500, 2100, 3500],
        measures: [1800, 2200],
        markers: [2600],
    },
];
const withNoMarker = (): BulletChartDataShape[] => [
    {
        ranges: [1500, 2100, 3500],
        measures: [1800, 2200],
        markers: [],
    },
];
const withManyCPUData = (): BulletChartDataShape[] => [
    {
        ranges: [1500, 2100, 3500],
        measures: [1800, 2200],
        markers: [2600, 3000],
    },
    {
        ranges: [1300, 1900, 3000],
        measures: [1700, 2000],
        markers: [1600],
    },
    {
        ranges: [1300, 1500, 2000],
        measures: [1500, 1800],
        markers: [1950],
    },
    {
        ranges: [1000, 2000],
        measures: [1500],
        markers: [],
    },
    {
        ranges: [1000, 2000],
        measures: [500],
        markers: [],
    },
];

export default {
    fullTestData,
    partialTestData,
    withAllElements,
    withNoMarker,
    withManyCPUData,
};
