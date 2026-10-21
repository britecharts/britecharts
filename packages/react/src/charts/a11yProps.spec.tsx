import React from 'react';
import type { ComponentType } from 'react';
import type { MockInstance } from 'vitest';
import { mount } from '../../testing/mount';

import {
    BarWrapper,
    BrushWrapper,
    BulletWrapper,
    DonutWrapper,
    GroupedBarWrapper,
    HeatmapWrapper,
    LegendWrapper,
    LineWrapper,
    ScatterPlotWrapper,
    SparklineWrapper,
    StackedAreaWrapper,
    StackedBarWrapper,
} from '@britecharts/wrappers';

import Bar from './bar/Bar';
import barData from './bar/barChart.fixtures';
import Brush from './brush/Brush';
import brushData from './brush/brushChart.fixtures';
import Bullet from './bullet/Bullet';
import bulletData from './bullet/bulletChart.fixtures';
import Donut from './donut/Donut';
import donutData from './donut/donutChart.fixtures';
import GroupedBar from './groupedBar/GroupedBar';
import groupedBarData from './groupedBar/groupedBarChart.fixtures';
import Heatmap from './heatmap/Heatmap';
import heatmapData from './heatmap/heatmapChart.fixtures';
import Legend from './legend/Legend';
import legendData from './legend/legendChart.fixtures';
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

interface A11yProps {
    a11yTitle?: string | null;
    a11yDescription?: string | null;
}

type SpiedCreate = (...args: never[]) => unknown;

interface SpiedWrapper {
    create: SpiedCreate;
}

type ChartCase = [
    name: string,
    Component: ComponentType<A11yProps>,
    wrapper: SpiedWrapper,
    getProps: () => A11yProps,
];

const chartCase = <TProps extends A11yProps & { chart?: SpiedWrapper }>(
    name: string,
    Component: ComponentType<TProps>,
    wrapper: NonNullable<NoInfer<TProps>['chart']>,
    getProps: () => NoInfer<TProps>
): ChartCase => [
    name,
    Component as ComponentType<A11yProps>,
    wrapper,
    getProps,
];

const CHARTS: ChartCase[] = [
    chartCase('Bar', Bar, BarWrapper, () => ({ data: barData.withLetters() })),
    chartCase('Brush', Brush, BrushWrapper, () => ({
        data: brushData.withShortData(),
    })),
    chartCase('Bullet', Bullet, BulletWrapper, () => ({
        data: bulletData.fullTestData(),
    })),
    chartCase('Donut', Donut, DonutWrapper, () => ({
        data: donutData.with4Slices(),
    })),
    chartCase('GroupedBar', GroupedBar, GroupedBarWrapper, () => ({
        data: groupedBarData.with3Groups(),
    })),
    chartCase('Heatmap', Heatmap, HeatmapWrapper, () => ({
        data: heatmapData.withWeeklyData(),
    })),
    chartCase('Legend', Legend, LegendWrapper, () => ({
        data: legendData.with6Points(),
    })),
    chartCase('Line', Line, LineWrapper, () => ({ data: lineData.flatData.a })),
    chartCase('ScatterPlot', ScatterPlot, ScatterPlotWrapper, () => ({
        data: scatterPlotData.withFourNames(),
    })),
    chartCase('Sparkline', Sparkline, SparklineWrapper, () => ({
        data: sparklineData.with1Source(),
    })),
    chartCase('StackedArea', StackedArea, StackedAreaWrapper, () => ({
        data: stackedAreaData.with3Sources(),
    })),
    chartCase('StackedBar', StackedBar, StackedBarWrapper, () => ({
        data: stackedBarData.with3Sources(),
    })),
];

// Each component hands both props to its chart by name, so a prop without an
// accessor behind it would make the wrapper throw "Method not supported".
describe('accessibility props', () => {
    describe.each(CHARTS)('%s', (name, Component, wrapper, getProps) => {
        let createSpy: MockInstance<SpiedCreate>;

        beforeEach(() => {
            createSpy = vi.spyOn(wrapper, 'create');
        });

        afterEach(() => {
            createSpy.mockRestore();
        });

        it('should pass a11yTitle and a11yDescription to the chart', () => {
            mount(
                <Component
                    {...getProps()}
                    a11yTitle="Monthly visits"
                    a11yDescription="Visits doubled in May"
                />
            );

            const chart = createSpy.mock.results[0].value;

            expect(chart.a11yTitle()).toBe('Monthly visits');
            expect(chart.a11yDescription()).toBe('Visits doubled in May');
        });

        it('should render them as the svg label and description', () => {
            const wrapper = mount(
                <Component
                    {...getProps()}
                    a11yTitle="Monthly visits"
                    a11yDescription="Visits doubled in May"
                />
            );
            const svg = wrapper.find('svg.britechart');

            expect(svg?.getAttribute('aria-label')).toBe('Monthly visits');
            expect(svg?.querySelector(':scope > desc')?.textContent).toBe(
                'Visits doubled in May'
            );
        });
    });
});
