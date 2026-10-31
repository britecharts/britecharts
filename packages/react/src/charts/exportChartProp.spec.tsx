import React from 'react';
import type { ReactElement } from 'react';
import { mount } from '../../testing/mount';

import Bar from './bar/Bar';
import barData from './bar/barChart.fixtures';
import Bullet from './bullet/Bullet';
import bulletData from './bullet/bulletChart.fixtures';
import Donut from './donut/Donut';
import donutData from './donut/donutChart.fixtures';
import GroupedBar from './groupedBar/GroupedBar';
import groupedBarData from './groupedBar/groupedBarChart.fixtures';
import Heatmap from './heatmap/Heatmap';
import heatmapData from './heatmap/heatmapChart.fixtures';
import Line from './line/Line';
import lineData from './line/lineChart.fixtures';
import ScatterPlot from './scatterPlot/ScatterPlot';
import scatterPlotData from './scatterPlot/scatterPlotChart.fixtures';
import Sparkline from './sparkline/Sparkline';
import sparklineData from './sparkline/sparklineChart.fixtures';
import StackedArea from './stackedArea/StackedArea';
import stackedAreaData from './stackedArea/stackedAreaChart.fixtures';
import StackedBar from './stackedBar/StackedBar';
import stackedBarData from './stackedBar/stackedBarChart.fixtures';

// Every component whose chart has an exportChart command, each rendered with
// the prop set. An svg filename downloads without loading an image, which
// jsdom cannot do, so the whole path is checked: the prop reaches the
// wrapper, the wrapper calls the chart's exportChart once the chart has drawn,
// and a link is clicked with the chart's svg.
const CHARTS: [string, (filename: string) => ReactElement][] = [
    ['Bar', (f) => <Bar data={barData.withLetters()} exportChart={f} />],
    [
        'Bullet',
        (f) => <Bullet data={bulletData.fullTestData()} exportChart={f} />,
    ],
    ['Donut', (f) => <Donut data={donutData.with4Slices()} exportChart={f} />],
    [
        'GroupedBar',
        (f) => (
            <GroupedBar data={groupedBarData.with3Groups()} exportChart={f} />
        ),
    ],
    [
        'Heatmap',
        (f) => <Heatmap data={heatmapData.withWeeklyData()} exportChart={f} />,
    ],
    ['Line', (f) => <Line data={lineData.flatData.a} exportChart={f} />],
    [
        'ScatterPlot',
        (f) => (
            <ScatterPlot
                data={scatterPlotData.withFourNames()}
                exportChart={f}
            />
        ),
    ],
    [
        'Sparkline',
        (f) => <Sparkline data={sparklineData.with1Source()} exportChart={f} />,
    ],
    [
        'StackedArea',
        (f) => (
            <StackedArea
                data={stackedAreaData.with3Sources()}
                exportChart={f}
            />
        ),
    ],
    [
        'StackedBar',
        (f) => (
            <StackedBar data={stackedBarData.with3Sources()} exportChart={f} />
        ),
    ],
];

describe('the exportChart prop', () => {
    let downloads: { filename: string; href: string }[];
    let clickSpy: { mockRestore: () => void };

    beforeEach(() => {
        downloads = [];
        clickSpy = vi
            .spyOn(HTMLAnchorElement.prototype, 'click')
            .mockImplementation(function (this: HTMLAnchorElement) {
                downloads.push({ filename: this.download, href: this.href });
            });
    });

    afterEach(() => {
        // Only this spy: the test setup restores its own console.error mock
        clickSpy.mockRestore();
    });

    it.each(CHARTS)(
        'should download the %s chart as the file named',
        async (name, render) => {
            mount(render(`${name}.svg`));

            await vi.waitFor(() => expect(downloads).toHaveLength(1));

            const [{ filename, href }] = downloads;
            const content = decodeURIComponent(href);

            expect(filename).toBe(`${name}.svg`);
            expect(content).toContain('<svg');
            expect(content).not.toContain('undefined');
        }
    );
});
