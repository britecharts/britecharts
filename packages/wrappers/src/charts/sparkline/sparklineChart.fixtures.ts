import type { SparklineChartDataShape } from '@britecharts/core';

// Every row here carries a `name` that the chart never reads --
// `SparklineChartDataShape` is `{ date, value }`, and core's sparkline only
// ever touches those two (`sparkline.js`'s `.each`, which does
// `d.date = new Date(d[dateLabel])` and `d.value = +d[valueLabel]`).
//
// The annotation widens to admit the extra field rather than the data being
// edited to fit it: a conversion should not change what the tests feed in. If
// the stale field is dropped later, this intersection goes with it.
type SparklineFixture = SparklineChartDataShape & { name: string };

const withLowValues = (): SparklineFixture[] => [
    {
        name: 'Blazing',
        value: 2,
        date: '2011-01-05T00:00:00Z',
    },
    {
        name: 'Blazing',
        value: 2,
        date: '2011-01-06T00:00:00Z',
    },
    {
        name: 'Blazing',
        value: 3,
        date: '2011-01-07T00:00:00Z',
    },
    {
        name: 'Blazing',
        value: 5,
        date: '2011-01-08T00:00:00Z',
    },
    {
        name: 'Blazing',
        value: 3,
        date: '2011-01-09T00:00:00Z',
    },
    {
        name: 'Blazing',
        value: 6,
        date: '2011-01-10T00:00:00Z',
    },
    {
        name: 'Blazing',
        value: 7,
        date: '2011-01-11T00:00:00Z',
    },
    {
        name: 'Blazing',
        value: 1,
        date: '2011-01-12T00:00:00Z',
    },
];

const with1Source = (): SparklineFixture[] => [
    {
        name: 'Glittering',
        value: 2,
        date: '2011-01-05T00:00:00Z',
    },
    {
        name: 'Glittering',
        value: 5,
        date: '2011-01-06T00:00:00Z',
    },
    {
        name: 'Glittering',
        value: 16,
        date: '2011-01-07T00:00:00Z',
    },
    {
        name: 'Glittering',
        value: 23,
        date: '2011-01-08T00:00:00Z',
    },
    {
        name: 'Glittering',
        value: 18,
        date: '2011-01-09T00:00:00Z',
    },
    {
        name: 'Glittering',
        value: 25,
        date: '2011-01-10T00:00:00Z',
    },
    {
        name: 'Glittering',
        value: 28,
        date: '2011-01-11T00:00:00Z',
    },
    {
        name: 'Glittering',
        value: 2,
        date: '2011-01-12T00:00:00Z',
    },
];

export default {
    withLowValues,
    with1Source,
};
