import React from 'react';
import { mount } from 'enzyme';

import {
    BarWrapper,
    BulletWrapper,
    DonutWrapper,
    GroupedBarWrapper,
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
import Bullet from './bullet/Bullet';
import bulletData from './bullet/bulletChart.fixtures';
import Donut from './donut/Donut';
import donutData from './donut/donutChart.fixtures';
import GroupedBar from './groupedBar/GroupedBar';
import groupedBarData from './groupedBar/groupedBarChart.fixtures';
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

// Every component draws through its own wrapper unless a `chart` prop says
// otherwise. That default used to be a `defaultProps`, which React 19 ignores on
// a function component, and it is now a destructured default. The colocated
// specs always pass `chart` themselves, so nothing else would notice a wrong or
// missing one.
const CHARTS = [
    ['Bar', Bar, BarWrapper, () => ({ data: barData.withLetters() })],
    [
        'Bullet',
        Bullet,
        BulletWrapper,
        () => ({ data: bulletData.fullTestData() }),
    ],
    ['Donut', Donut, DonutWrapper, () => ({ data: donutData.with4Slices() })],
    [
        'GroupedBar',
        GroupedBar,
        GroupedBarWrapper,
        () => ({ data: groupedBarData.with3Groups() }),
    ],
    [
        'Legend',
        Legend,
        LegendWrapper,
        () => ({ data: legendData.with6Points() }),
    ],
    ['Line', Line, LineWrapper, () => ({ data: lineData.flatData.a })],
    [
        'ScatterPlot',
        ScatterPlot,
        ScatterPlotWrapper,
        () => ({ data: scatterPlotData.withFourNames() }),
    ],
    [
        'Sparkline',
        Sparkline,
        SparklineWrapper,
        () => ({ data: sparklineData.with1Source() }),
    ],
    [
        'StackedArea',
        StackedArea,
        StackedAreaWrapper,
        () => ({ data: stackedAreaData.with3Sources() }),
    ],
    [
        'StackedBar',
        StackedBar,
        StackedBarWrapper,
        () => ({ data: stackedBarData.with3Sources() }),
    ],
    [
        'Tooltip',
        Tooltip,
        TooltipWrapper,
        // The tooltip is drawn into the chart it wraps, so it needs one to exist
        () => ({
            data: [],
            render: () => <div className="metadata-group" />,
        }),
    ],
];

describe('default wrapper', () => {
    describe.each(CHARTS)('%s', (name, Component, wrapper, getProps) => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(wrapper, 'create');
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
