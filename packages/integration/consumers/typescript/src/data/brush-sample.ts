import { BrushChartDataShape } from '@britecharts/core';

export const SAMPLE_BRUSH_DATA: BrushChartDataShape[] = [
    {
        date: "2015-06-27T07:00:00.000Z",
        value: 4,
    },
    // A gap in the series, which is a case the brush chart draws: the area
    // breaks rather than dropping to the baseline. This row is the assertion --
    // against the old `value: number` shape it did not compile, so a consumer
    // could not pass the data `brushMissingData.json` ships.
    {
        date: "2015-06-27T19:00:00.000Z",
        value: null,
    },
    {
        date: "2015-06-28T07:00:00.000Z",
        value: 12,
    },
    {
        date: "2015-06-29T07:00:00.000Z",
        value: 33,
    },
    {
        date: "2015-06-30T07:00:00.000Z",
        value: 17,
    },
    {
        date: "2015-07-01T07:00:00.000Z",
        value: 17,
    },
    {
        date: "2015-07-02T07:00:00.000Z",
        value: 16,
    },
];
