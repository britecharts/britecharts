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
            expect(svg().getAttribute('aria-label')).toBe(fallbackTitle);
            // Not a <title>: browsers show that as a tooltip on hover
            expect(svg().querySelector(':scope > title')).toBeNull();
        });

        it('should render the title it is given as the label, and its description linked by id', () => {
            instance
                .a11yTitle('Visits')
                .a11yDescription('Visits doubled in May');
            render();

            const desc = svg().querySelector(':scope > desc');

            expect(svg().getAttribute('aria-label')).toBe('Visits');
            expect(desc.textContent).toBe('Visits doubled in May');
            expect(svg().getAttribute('aria-describedby')).toBe(desc.id);
        });

        it('should update the text on the next render without adding elements', () => {
            instance.a11yTitle('First');
            render();
            instance.a11yTitle('Second').a11yDescription(null);
            render();

            expect(svg().getAttribute('aria-label')).toBe('Second');
            expect(svg().querySelector(':scope > desc')).toBeNull();
        });
    }
);

// Every chart above but the legend, whose entries are already text
const TABLE_CHARTS = CHARTS.filter(([name]) => name !== 'legend');

describe.each(TABLE_CHARTS)('%s chart data table', (_name, chart, data) => {
    let container, instance;

    const render = (datum = data()) => container.datum(datum).call(instance);
    const svg = () => container.select('svg.britechart').node();
    const wrapper = () => container.select('div.britechart-data-table').node();
    const table = () =>
        container.select('div.britechart-data-table > table').node();

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

    it('should be on by default, and chain from its setter', () => {
        expect(instance.a11yDataTable()).toBe(true);
        expect(instance.a11yDataTable(false)).toBe(instance);
        expect(instance.a11yDataTable()).toBe(false);
    });

    it('should render the data as a table right after the svg, linked with aria-details', () => {
        render();

        expect(table()).not.toBeNull();
        expect(svg().nextElementSibling).toBe(wrapper());
        expect(svg().getAttribute('aria-details')).toBe(wrapper().id);
    });

    it('should caption the table with the chart name, and head its columns', () => {
        instance.a11yTitle('Visits');
        render();

        const headings = table().querySelectorAll('thead th[scope="col"]');

        expect(table().caption.textContent).toBe('Visits, data');
        expect(headings.length).toBeGreaterThan(1);
        expect(table().tBodies[0].rows.length).toBeGreaterThan(0);
        // Every row is headed by its first cell, and has a cell per column
        Array.from(table().tBodies[0].rows).forEach((row) => {
            expect(row.cells[0].tagName).toBe('TH');
            expect(row.cells[0].getAttribute('scope')).toBe('row');
            expect(row.cells.length).toBe(headings.length);
        });
    });

    it('should hide the table visually with inline styles on its wrapper', () => {
        render();

        expect(wrapper().style.position).toBe('absolute');
        expect(wrapper().style.width).toBe('1px');
        expect(wrapper().style.overflow).toBe('hidden');
    });

    it('should reuse its table on the next render', () => {
        render();
        const first = wrapper();

        render();

        expect(wrapper()).toBe(first);
        expect(container.selectAll('table').size()).toBe(1);
    });

    it('should render no table when it is turned off, and remove one it drew', () => {
        render();
        instance.a11yDataTable(false);
        render();

        expect(wrapper()).toBeNull();
        expect(svg().hasAttribute('aria-details')).toBe(false);
    });

    it('should render no table while loading', () => {
        instance.isLoading(true);
        render();

        expect(table()).toBeNull();
    });
});

describe('data table content', () => {
    let container;

    const cells = (row) =>
        Array.from(row.cells).map((cell) => cell.textContent);
    const tableOf = () =>
        container.select('div.britechart-data-table > table').node();

    beforeEach(() => {
        document.body.insertAdjacentHTML(
            'afterbegin',
            '<div id="fixture"><div class="test-container"></div></div>'
        );
        container = d3.select('.test-container');
    });

    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    it('should list each bar with its value', () => {
        container
            .datum([
                { name: 'Pro', value: 412 },
                { name: 'Free', value: 1200 },
            ])
            .call(bar());

        const table = tableOf();

        expect(cells(table.tHead.rows[0])).toEqual(['Name', 'Value']);
        expect(cells(table.tBodies[0].rows[0])).toEqual(['Pro', '412']);
        expect(cells(table.tBodies[0].rows[1])).toEqual(['Free', '1200']);
    });

    it('should lay a line chart out wide: a row per date, a column per topic', () => {
        container
            .datum({
                data: [
                    {
                        topicName: 'San Francisco',
                        name: 1,
                        date: '2017-01-16T16:00:00-08:00',
                        value: 1,
                    },
                    {
                        topicName: 'San Francisco',
                        name: 1,
                        date: '2017-01-17T16:00:00-08:00',
                        value: 2,
                    },
                    {
                        topicName: 'Oakland',
                        name: 2,
                        date: '2017-01-16T16:00:00-08:00',
                        value: 3,
                    },
                    {
                        topicName: 'Oakland',
                        name: 2,
                        date: '2017-01-17T16:00:00-08:00',
                        value: 4,
                    },
                ],
            })
            .call(line());

        const table = tableOf();
        const rows = Array.from(table.tBodies[0].rows).map(cells);

        expect(cells(table.tHead.rows[0])).toEqual([
            'Date',
            'San Francisco',
            'Oakland',
        ]);
        expect(rows.map((row) => row.slice(1))).toEqual([
            ['1', '3'],
            ['2', '4'],
        ]);
        // One date per row, without a time: no two fall on the same day
        expect(rows[0][0]).not.toMatch(/:/);
    });

    it('should lay a heatmap out with a row per day and a column per hour', () => {
        container
            .datum([
                { day: 0, hour: 0, value: 5 },
                { day: 0, hour: 1, value: 6 },
                { day: 1, hour: 0, value: 7 },
            ])
            .call(heatmap());

        const table = tableOf();

        expect(cells(table.tHead.rows[0])).toEqual(['Day', '00h', '01h']);
        expect(cells(table.tBodies[0].rows[1])).toEqual(['Tu', '7', '']);
    });
});
