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

// Every chart that draws its own svg, with the data its own spec renders and
// the name it is announced by when no a11yTitle is set.
const CHARTS = [
    [
        'bar',
        bar,
        () => new BarDataBuilder().withLettersFrequency().build(),
        'Bar chart',
    ],
    [
        'brush',
        brush,
        () => new BrushDataBuilder().withSimpleData().build(),
        'Brush chart',
    ],
    [
        'bullet',
        bullet,
        () => new BulletDataBuilder().withCpuData().build()[0],
        'Bullet chart',
    ],
    [
        'donut',
        donut,
        () => new DonutDataBuilder().withFivePlusOther().build(),
        'Donut chart',
    ],
    [
        'grouped bar',
        groupedBar,
        () => new GroupedBarDataBuilder().with3Sources().build(),
        'Grouped bar chart',
    ],
    [
        'heatmap',
        heatmap,
        () => new HeatmapDataBuilder().withWeeklyData().build(),
        'Heatmap',
    ],
    [
        'legend',
        legend,
        () => new DonutDataBuilder().withFivePlusOther().build(),
        'Legend',
    ],
    [
        'line',
        line,
        () => new LineDataBuilder().with5Topics().build(),
        'Line chart',
    ],
    [
        'scatter plot',
        scatterPlot,
        () => new ScatterPlotDataBuilder().withFourNames().build(),
        'Scatter plot',
    ],
    [
        'sparkline',
        sparkline,
        () => new SparklineDataBuilder().with1Source().build(),
        'Sparkline',
    ],
    [
        'stacked area',
        stackedArea,
        () => new StackedAreaDataBuilder().withReportData().build(),
        'Stacked area chart',
    ],
    [
        'stacked bar',
        stackedBar,
        () => new StackedBarDataBuilder().with3Sources().build(),
        'Stacked bar chart',
    ],
];

describe.each(CHARTS)(
    '%s chart accessibility',
    (_name, chart, data, fallbackTitle) => {
        let container, instance;

        const render = () => container.datum(data()).call(instance);
        const svg = () => container.select('svg.britechart').node();

        beforeEach(() => {
            document.body.insertAdjacentHTML(
                'afterbegin',
                '<div id="fixture"><div class="test-container"></div></div>'
            );
            container = d3.select('.test-container');
            instance = chart();
        });

        afterEach(() => {
            document.body.removeChild(document.getElementById('fixture'));
        });

        it('should read null from both getters before they are set', () => {
            expect(instance.a11yTitle()).toBeNull();
            expect(instance.a11yDescription()).toBeNull();
        });

        it('should chain from both setters and read the values back', () => {
            expect(instance.a11yTitle('A title')).toBe(instance);
            expect(instance.a11yDescription('A description')).toBe(instance);
            expect(instance.a11yTitle()).toBe('A title');
            expect(instance.a11yDescription()).toBe('A description');
        });

        it('should give the svg a role and announce it by type when no title is set', () => {
            render();

            expect(svg().getAttribute('role')).toBe(
                fallbackTitle === 'Legend' ? 'group' : 'img'
            );
            expect(svg().firstElementChild.tagName).toBe('title');
            expect(svg().firstElementChild.textContent).toBe(fallbackTitle);
        });

        it('should render the title and description it is given, linked by id', () => {
            instance
                .a11yTitle('Visits')
                .a11yDescription('Visits doubled in May');
            render();

            const title = svg().querySelector(':scope > title');
            const desc = svg().querySelector(':scope > desc');

            expect(title.textContent).toBe('Visits');
            expect(desc.textContent).toBe('Visits doubled in May');
            expect(svg().getAttribute('aria-labelledby')).toBe(title.id);
            expect(svg().getAttribute('aria-describedby')).toBe(desc.id);
        });

        it('should update the text on the next render without adding elements', () => {
            instance.a11yTitle('First');
            render();
            instance.a11yTitle('Second').a11yDescription(null);
            render();

            expect(svg().querySelectorAll(':scope > title')).toHaveLength(1);
            expect(svg().querySelector(':scope > title').textContent).toBe(
                'Second'
            );
            expect(svg().querySelector(':scope > desc')).toBeNull();
        });
    }
);
