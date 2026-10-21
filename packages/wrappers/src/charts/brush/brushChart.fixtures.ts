import type { BrushChartDataShape } from '@britecharts/core';

// From core's brushShortData.json: eight days, one value each
const withShortData = (): BrushChartDataShape[] => [
    { value: 2, date: '2011-01-05T00:00:00Z' },
    { value: 5, date: '2011-01-06T00:00:00Z' },
    { value: 16, date: '2011-01-07T00:00:00Z' },
    { value: 23, date: '2011-01-08T00:00:00Z' },
    { value: 18, date: '2011-01-09T00:00:00Z' },
    { value: 25, date: '2011-01-10T00:00:00Z' },
    { value: 28, date: '2011-01-11T00:00:00Z' },
    { value: 2, date: '2011-01-12T00:00:00Z' },
];

// The start of core's brushMissingData.json, which has nulls in it: a gap
// in the series is a case the brush is built for
const withMissingData = (): BrushChartDataShape[] => [
    { value: 4, date: '2015-06-27T07:00:00.000Z' },
    { value: 12, date: '2015-06-28T07:00:00.000Z' },
    { value: 33, date: '2015-06-29T07:00:00.000Z' },
    { value: 17, date: '2015-06-30T07:00:00.000Z' },
    { value: 17, date: '2015-07-01T07:00:00.000Z' },
    { value: 16, date: '2015-07-02T07:00:00.000Z' },
    { value: 8, date: '2015-07-03T07:00:00.000Z' },
    { value: null, date: '2015-07-04T07:00:00.000Z' },
    { value: null, date: '2015-07-05T07:00:00.000Z' },
    { value: null, date: '2015-07-06T07:00:00.000Z' },
    { value: null, date: '2015-07-07T07:00:00.000Z' },
    { value: null, date: '2015-07-08T07:00:00.000Z' },
];

export default { withShortData, withMissingData };
