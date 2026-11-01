import { select } from 'd3-selection';

import bar from './bar/barChart';
import barData from './bar/barChart.fixtures';
import brush from './brush/brushChart';
import brushData from './brush/brushChart.fixtures';
import bullet from './bullet/bulletChart';
import bulletData from './bullet/bulletChart.fixtures';
import donut from './donut/donutChart';
import donutData from './donut/donutChart.fixtures';
import groupedBar from './groupedBar/groupedBarChart';
import groupedBarData from './groupedBar/groupedBarChart.fixtures';
import heatmap from './heatmap/heatmapChart';
import heatmapData from './heatmap/heatmapChart.fixtures';
import legend from './legend/legendChart';
import legendData from './legend/legendChart.fixtures';
import line from './line/lineChart';
import lineData from './line/lineChart.fixtures';
import scatterPlot from './scatterPlot/scatterPlotChart';
import scatterPlotData from './scatterPlot/scatterPlotChart.fixtures';
import sparkline from './sparkline/sparklineChart';
import sparklineData from './sparkline/sparklineChart.fixtures';
import stackedArea from './stackedArea/stackedAreaChart';
import stackedAreaData from './stackedArea/stackedAreaChart.fixtures';
import stackedBar from './stackedBar/stackedBarChart';
import stackedBarData from './stackedBar/stackedBarChart.fixtures';
import treemap from './treemap/treemapChart';
import treemapData from './treemap/treemapChart.fixtures';
import type { Wrapper } from '../helpers/wrapper';

// As in destroy.spec.ts, each row resolves its wrapper and data types where
// both are known and carries closures, so one table can hold every data shape.
// `drawThenUpdate` draws the chart, updates it with the value given, and
// returns the datum bound to the container before and after the update.
type EmptyDataCase = [
    name: string,
    drawThenUpdate: (
        el: HTMLElement,
        data: 'empty' | null | undefined
    ) => [before: unknown, after: unknown],
];

const emptyDataCase = <TData, TChart extends object>(
    name: string,
    wrapper: Wrapper<TData, TChart>,
    getData: () => TData,
    empty: TData
): EmptyDataCase => [
    name,
    (el, data) => {
        const chart = wrapper.create(el, getData());
        const before = select(el).datum();

        wrapper.update(el, data === 'empty' ? empty : data, {}, chart);

        return [before, select(el).datum()];
    },
];

// Every wrapper keeps what it has drawn when an update brings no data:
// empty, null or undefined. Line's data is an object, so its empty is one
// with no rows.
const CHARTS: EmptyDataCase[] = [
    emptyDataCase('bar', bar, () => barData.withLetters(), []),
    emptyDataCase('brush', brush, () => brushData.withShortData(), []),
    emptyDataCase('bullet', bullet, () => bulletData.fullTestData(), []),
    emptyDataCase('donut', donut, () => donutData.with4Slices(), []),
    emptyDataCase(
        'groupedBar',
        groupedBar,
        () => groupedBarData.with3Groups(),
        []
    ),
    emptyDataCase('heatmap', heatmap, () => heatmapData.withTwoDays(), []),
    emptyDataCase('legend', legend, () => legendData.with6Points(), []),
    emptyDataCase('line', line, () => lineData.flatData.a, { data: [] }),
    emptyDataCase(
        'scatterPlot',
        scatterPlot,
        () => scatterPlotData.withFourNames(),
        []
    ),
    emptyDataCase(
        'sparkline',
        sparkline,
        () => sparklineData.with1Source(),
        []
    ),
    emptyDataCase(
        'stackedArea',
        stackedArea,
        () => stackedAreaData.with3Sources(),
        []
    ),
    emptyDataCase(
        'stackedBar',
        stackedBar,
        () => stackedBarData.with3Sources(),
        []
    ),
    emptyDataCase('treemap', treemap, () => treemapData.withBudget(), []),
];

describe('chart wrappers update with no data', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe.each(CHARTS)('%s', (name, drawThenUpdate) => {
        it.each(['empty', null, undefined] as const)(
            'should keep the data it drew when updated with %s',
            (data) => {
                const [before, after] = drawThenUpdate(anchor, data);

                expect(before).toBeDefined();
                expect(after).toBe(before);
            }
        );
    });
});
