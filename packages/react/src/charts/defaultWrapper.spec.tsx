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
    TooltipWrapper,
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
import Tooltip from './tooltip/Tooltip';

type SpiedCreate = (...args: never[]) => unknown;

interface SpiedWrapper {
    create: SpiedCreate;
}

type ChartCase = [
    name: string,
    Component: ComponentType<object>,
    wrapper: SpiedWrapper,
    getProps: () => object,
];

const chartCase = <TProps extends { chart?: SpiedWrapper }>(
    name: string,
    Component: ComponentType<TProps>,
    wrapper: NonNullable<NoInfer<TProps>['chart']>,
    getProps: () => NoInfer<TProps>
): ChartCase => [name, Component as ComponentType<object>, wrapper, getProps];

// Every component draws through its own wrapper unless a `chart` prop says
// otherwise. That default is a destructured default, not a `defaultProps`,
// which React 19 ignores on a function component. The colocated specs always
// pass `chart` themselves, so nothing else would notice a wrong or missing
// one.
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
    chartCase(
        'Tooltip',
        Tooltip,
        TooltipWrapper,
        // The tooltip is drawn into the chart it wraps, so it needs one to exist
        () => ({
            data: [],
            render: () => <div className="metadata-group" />,
        })
    ),
];

describe('default wrapper', () => {
    describe.each(CHARTS)('%s', (name, Component, wrapper, getProps) => {
        let createSpy: MockInstance<SpiedCreate>;

        beforeEach(() => {
            createSpy = vi.spyOn(wrapper, 'create');
        });

        afterEach(() => {
            createSpy.mockRestore();
        });

        it('should draw through its own wrapper when no chart prop is given', () => {
            mount(<Component {...getProps()} />);

            expect(createSpy).toHaveBeenCalledTimes(1);
        });
    });
});
