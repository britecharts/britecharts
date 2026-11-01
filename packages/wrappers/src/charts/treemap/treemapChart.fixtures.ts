import type { TreemapChartDataShape } from '@britecharts/core';

// Core's treemapBudget.json, trimmed
const withBudget = (): TreemapChartDataShape[] => [
    { name: 'Rent', value: 1450 },
    { name: 'Groceries', value: 520 },
    { name: 'Car', value: 340 },
    { name: 'Holidays', value: 300 },
];

// The budget after a change: new values, and one entry fewer
const withUpdatedBudget = (): TreemapChartDataShape[] => [
    { name: 'Rent', value: 1160 },
    { name: 'Groceries', value: 780 },
    { name: 'Car', value: 272 },
];

export default { withBudget, withUpdatedBudget };
