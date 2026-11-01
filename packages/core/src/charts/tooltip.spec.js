import * as d3 from 'd3';

import bar from './bar/bar';
import { BarDataBuilder } from './bar/barChartDataBuilder';
import groupedBar from './grouped-bar/grouped-bar';
import { GroupedBarDataBuilder } from './grouped-bar/groupedBarChartDataBuilder';
import heatmap from './heatmap/heatmap';
import { HeatmapDataBuilder } from './heatmap/heatmapChartDataBuilder';
import line from './line/line';
import { LineDataBuilder } from './line/lineChartDataBuilder';
import miniTooltip from './mini-tooltip/mini-tooltip';
import scatterPlot from './scatter-plot/scatter-plot';
import { ScatterPlotDataBuilder } from './scatter-plot/scatterPlotDataBuilder';
import stackedArea from './stacked-area/stacked-area';
import { StackedAreaDataBuilder } from './stacked-area/stackedAreaDataBuilder';
import stackedBar from './stacked-bar/stacked-bar';
import { StackedBarDataBuilder } from './stacked-bar/stackedBarDataBuilder';
import tooltip from './tooltip/tooltip';
import treemap from './treemap/treemap';
import { TreemapDataBuilder } from './treemap/treemapDataBuilder';

// Every chart with a tooltip: its data, the tooltip it takes, and the labels
// it sets on that tooltip
const CHARTS = [
    [
        'bar',
        bar,
        () => new BarDataBuilder().withLettersFrequency().build(),
        miniTooltip,
        {},
    ],
    [
        'grouped bar',
        groupedBar,
        () => new GroupedBarDataBuilder().with3Sources().build(),
        tooltip,
        { topicLabel: 'values', nameLabel: 'group' },
    ],
    [
        'heatmap',
        heatmap,
        () => new HeatmapDataBuilder().withWeeklyData().build(),
        miniTooltip,
        {},
    ],
    [
        'line',
        line,
        () => new LineDataBuilder().with5Topics().build(),
        tooltip,
        { topicLabel: 'topics' },
    ],
    [
        'scatter plot',
        scatterPlot,
        () => new ScatterPlotDataBuilder().withFourNames().build(),
        miniTooltip,
        { valueLabel: 'y' },
    ],
    [
        'stacked area',
        stackedArea,
        () => new StackedAreaDataBuilder().withReportData().build(),
        tooltip,
        { topicLabel: 'values' },
    ],
    [
        'stacked bar',
        stackedBar,
        () => new StackedBarDataBuilder().with3Sources().build(),
        tooltip,
        { topicLabel: 'values', nameLabel: 'stack' },
    ],
    [
        'treemap',
        treemap,
        () => new TreemapDataBuilder().withBudget().build(),
        tooltip,
        {},
    ],
];

const TOOLTIP_GROUP = '.britechart-tooltip, .britechart-mini-tooltip';

describe.each(CHARTS)(
    '%s chart tooltip',
    (_name, chart, data, makeTooltip, labels) => {
        let instance, chartTooltip;

        const tooltipGroups = () =>
            document.querySelectorAll(`.test-container ${TOOLTIP_GROUP}`);

        beforeEach(() => {
            document.body.insertAdjacentHTML(
                'afterbegin',
                '<div id="fixture"><div class="test-container"></div></div>'
            );
            instance = chart();
            chartTooltip = makeTooltip();
        });

        afterEach(() => {
            document.body.removeChild(document.getElementById('fixture'));
        });

        it('should have no tooltip until one is set, and chain from the setter', () => {
            expect(instance.tooltip()).toBeNull();
            expect(instance.tooltip(chartTooltip)).toBe(instance);
            expect(instance.tooltip()).toBe(chartTooltip);
        });

        it('should draw the tooltip inside the chart', () => {
            instance.tooltip(chartTooltip).render('.test-container', data());

            const [group] = tooltipGroups();

            expect(tooltipGroups().length).toBe(1);
            expect(group.closest('.metadata-group')).not.toBeNull();
        });

        it('should keep one attached tooltip across redraws', () => {
            instance.tooltip(chartTooltip).render('.test-container', data());
            instance.render('.test-container', data());

            const groups = tooltipGroups();

            expect(groups.length).toBe(1);
            expect(groups[0].isConnected).toBe(true);
        });

        it('should connect the tooltip to the chart events, beside the user handlers', () => {
            const onMouseOver = () => undefined;
            const onNamespaced = () => undefined;

            chartTooltip.show = vi.fn();
            chartTooltip.update = vi.fn();
            chartTooltip.hide = vi.fn();
            instance
                .on('customMouseOver', onMouseOver)
                .on('customMouseOver.tooltip', onNamespaced)
                .tooltip(chartTooltip)
                .render('.test-container', data());

            // The tooltip hides itself once when it is first drawn
            vi.clearAllMocks();
            instance.on('customMouseOver.britechartsTooltip')({ value: 1 });
            instance.on('customMouseMove.britechartsTooltip')({ value: 1 });
            instance.on('customMouseOut.britechartsTooltip')();

            expect(chartTooltip.show).toHaveBeenCalledTimes(1);
            expect(chartTooltip.update).toHaveBeenCalledTimes(1);
            expect(chartTooltip.hide).toHaveBeenCalledTimes(1);
            expect(instance.on('customMouseOver')).toBe(onMouseOver);
            expect(instance.on('customMouseOver.tooltip')).toBe(onNamespaced);
        });

        it('should set the labels the chart needs', () => {
            instance.tooltip(chartTooltip).render('.test-container', data());

            Object.entries(labels).forEach(([labelName, value]) => {
                expect(chartTooltip[labelName]()).toBe(value);
            });
        });

        it('should keep the labels set on the tooltip', () => {
            chartTooltip
                .topicLabel('mine')
                .nameLabel('mine')
                .valueLabel('mine');
            instance.tooltip(chartTooltip).render('.test-container', data());

            expect(chartTooltip.topicLabel()).toBe('mine');
            expect(chartTooltip.nameLabel()).toBe('mine');
            expect(chartTooltip.valueLabel()).toBe('mine');
        });

        it('should remove the tooltip and disconnect it when it is set to null', () => {
            instance.tooltip(chartTooltip).render('.test-container', data());
            instance.tooltip(null);

            expect(tooltipGroups().length).toBe(0);
            expect(
                instance.on('customMouseOver.britechartsTooltip')
            ).toBeUndefined();
            expect(
                instance.on('customMouseMove.britechartsTooltip')
            ).toBeUndefined();
            expect(
                instance.on('customMouseOut.britechartsTooltip')
            ).toBeUndefined();
        });

        it('should replace the tooltip it had with a new one', () => {
            const nextTooltip = makeTooltip();

            instance.tooltip(chartTooltip).render('.test-container', data());
            instance.tooltip(nextTooltip).render('.test-container', data());

            expect(tooltipGroups().length).toBe(1);
        });

        it('should draw a tooltip set after the chart has drawn', () => {
            instance.render('.test-container', data());
            instance.tooltip(chartTooltip);

            expect(tooltipGroups().length).toBe(1);
            expect(instance.on('customMouseOver.britechartsTooltip')).toEqual(
                expect.any(Function)
            );
        });

        it('should refuse a tooltip set on another chart', () => {
            chart().tooltip(chartTooltip);

            expect(() => instance.tooltip(chartTooltip)).toThrow(
                'Britecharts: this tooltip is already set on another chart'
            );
        });

        it('should free a tooltip for another chart once it is taken off', () => {
            const other = chart().tooltip(chartTooltip);

            other.tooltip(null);

            expect(() => instance.tooltip(chartTooltip)).not.toThrow();
        });
    }
);

describe('chart tooltip containers', () => {
    beforeEach(() => {
        document.body.insertAdjacentHTML(
            'afterbegin',
            '<div id="fixture"><div class="test-container"></div></div>'
        );
    });

    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    it('should keep one tooltip when the line chart grows its vertical marker', () => {
        const lineChart = line().width(100).tooltip(tooltip());
        const data = new LineDataBuilder().with5Topics().build();

        lineChart.render('.test-container', data);
        lineChart.width(800).render('.test-container', data);

        const groups = document.querySelectorAll(
            '.test-container .britechart-tooltip'
        );

        expect(groups.length).toBe(1);
        expect(groups[0].closest('.vertical-marker-container')).not.toBeNull();
    });

    it('should show a single value on a bar chart, with the same tooltip', () => {
        const barChart = bar().tooltip(tooltip());

        barChart.render('.test-container', [{ name: 'Radiant', value: 3 }]);
        barChart.on('customMouseMove.britechartsTooltip')(
            { name: 'Radiant', value: 3 },
            [10, 10],
            [100, 100]
        );

        expect(
            document.querySelector(
                '.test-container .britechart-mini-tooltip .mini-tooltip-value'
            ).textContent
        ).toBe('3.00');
    });

    it('should name a heatmap box by its row and column', () => {
        const chartTooltip = tooltip();
        const heatmapChart = heatmap().tooltip(chartTooltip);

        chartTooltip.show = vi.fn();
        heatmapChart.render(
            '.test-container',
            new HeatmapDataBuilder().withWeeklyData().build()
        );
        heatmapChart.on('customMouseOver.britechartsTooltip')({
            day: 1,
            hour: 3,
            value: 42,
        });

        expect(chartTooltip.show).toHaveBeenCalledWith({
            name: 'Tu, 03h',
            value: 42,
        });
    });
});
