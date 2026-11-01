import * as d3 from 'd3';

import bar from './bar/bar';
import { BarDataBuilder } from './bar/barChartDataBuilder';
import brush from './brush/brush';
import { BrushDataBuilder } from './brush/brushChartDataBuilder';
import bullet from './bullet/bullet';
import { BulletDataBuilder } from './bullet/bulletChartDataBuilder';
import donut from './donut/donut';
import { DonutDataBuilder } from './donut/donutChartDataBuilder';
import groupedBar from './grouped-bar/grouped-bar';
import { GroupedBarDataBuilder } from './grouped-bar/groupedBarChartDataBuilder';
import heatmap from './heatmap/heatmap';
import { HeatmapDataBuilder } from './heatmap/heatmapChartDataBuilder';
import legend from './legend/legend';
import line from './line/line';
import { LineDataBuilder } from './line/lineChartDataBuilder';
import scatterPlot from './scatter-plot/scatter-plot';
import { ScatterPlotDataBuilder } from './scatter-plot/scatterPlotDataBuilder';
import sparkline from './sparkline/sparkline';
import { SparklineDataBuilder } from './sparkline/sparklineDataBuilder';
import stackedArea from './stacked-area/stacked-area';
import { StackedAreaDataBuilder } from './stacked-area/stackedAreaDataBuilder';
import stackedBar from './stacked-bar/stacked-bar';
import { StackedBarDataBuilder } from './stacked-bar/stackedBarDataBuilder';
import treemap from './treemap/treemap';
import { TreemapDataBuilder } from './treemap/treemapDataBuilder';

// Every chart that draws its own svg, with the data its own spec renders
const CHARTS = [
    ['bar', bar, () => new BarDataBuilder().withLettersFrequency().build()],
    ['brush', brush, () => new BrushDataBuilder().withSimpleData().build()],
    ['bullet', bullet, () => new BulletDataBuilder().withCpuData().build()[0]],
    ['donut', donut, () => new DonutDataBuilder().withFivePlusOther().build()],
    [
        'grouped bar',
        groupedBar,
        () => new GroupedBarDataBuilder().with3Sources().build(),
    ],
    [
        'heatmap',
        heatmap,
        () => new HeatmapDataBuilder().withWeeklyData().build(),
    ],
    [
        'legend',
        legend,
        () => new DonutDataBuilder().withFivePlusOther().build(),
    ],
    ['line', line, () => new LineDataBuilder().with5Topics().build()],
    [
        'scatter plot',
        scatterPlot,
        () => new ScatterPlotDataBuilder().withFourNames().build(),
    ],
    [
        'sparkline',
        sparkline,
        () => new SparklineDataBuilder().with1Source().build(),
    ],
    [
        'stacked area',
        stackedArea,
        () => new StackedAreaDataBuilder().withReportData().build(),
    ],
    [
        'stacked bar',
        stackedBar,
        () => new StackedBarDataBuilder().with3Sources().build(),
    ],
    ['treemap', treemap, () => new TreemapDataBuilder().withBudget().build()],
];

describe.each(CHARTS)('%s chart render', (_name, chart, data) => {
    let instance;

    const svgCount = (selector) =>
        document.querySelectorAll(`${selector} svg.britechart`).length;

    beforeEach(() => {
        document.body.insertAdjacentHTML(
            'afterbegin',
            '<div id="fixture"><div class="test-container"></div><div class="test-container"></div></div>'
        );
        instance = chart();
    });

    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    it('should draw into the first element a selector matches and return the chart', () => {
        expect(instance.render('.test-container', data())).toBe(instance);

        const [first, second] = document.querySelectorAll('.test-container');

        expect(first.querySelectorAll('svg.britechart').length).toBe(1);
        expect(second.querySelector('svg.britechart')).toBeNull();
    });

    it('should draw into an element', () => {
        const element = document.querySelector('.test-container');

        instance.render(element, data());

        expect(element.querySelectorAll('svg.britechart').length).toBe(1);
    });

    it('should draw into a d3 selection', () => {
        const element = document.querySelector('.test-container');

        instance.render(d3.select(element), data());

        expect(element.querySelectorAll('svg.britechart').length).toBe(1);
    });

    it('should bind the data to the target, as datum does', () => {
        const chartData = data();

        instance.render('.test-container', chartData);

        expect(d3.select('.test-container').datum()).toBe(chartData);
    });

    it('should redraw with the data it last drew when none is given', () => {
        const chartData = data();

        instance.render('.test-container', chartData);
        instance.render('.test-container');

        expect(d3.select('.test-container').datum()).toBe(chartData);
        expect(svgCount('.test-container')).toBe(1);
    });

    it('should throw when the selector matches no element', () => {
        expect(() => instance.render('.missing', data())).toThrow(
            'Britecharts: no element matches ".missing"'
        );
    });

    it('should throw when the selection is empty', () => {
        expect(() => instance.render(d3.selectAll('.missing'), data())).toThrow(
            'Britecharts: the selection passed to render is empty'
        );
    });
});
