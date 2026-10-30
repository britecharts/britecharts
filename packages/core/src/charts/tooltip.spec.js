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

            instance
                .on('customMouseOver', onMouseOver)
                .tooltip(chartTooltip)
                .render('.test-container', data());

            expect(instance.on('customMouseOver.tooltip')).toBe(
                chartTooltip.show
            );
            expect(instance.on('customMouseMove.tooltip')).toBe(
                chartTooltip.update
            );
            expect(instance.on('customMouseOut.tooltip')).toBe(
                chartTooltip.hide
            );
            expect(instance.on('customMouseOver')).toBe(onMouseOver);
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

        it('should disconnect the tooltip when it is set to null', () => {
            instance.tooltip(chartTooltip).render('.test-container', data());
            instance.tooltip(null);

            expect(instance.on('customMouseOver.tooltip')).toBeUndefined();
            expect(instance.on('customMouseMove.tooltip')).toBeUndefined();
            expect(instance.on('customMouseOut.tooltip')).toBeUndefined();
        });
    }
);
