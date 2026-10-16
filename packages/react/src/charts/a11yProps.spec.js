import React from 'react';
import { mount } from '../../testing/mount';

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
];

// Each component hands both props to its chart by name, so a prop without an
// accessor behind it would make the wrapper throw "Method not supported".
describe('accessibility props', () => {
    describe.each(CHARTS)('%s', (name, Component, wrapper, getProps) => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(wrapper, 'create');
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

        it('should render them as the svg title and description', () => {
            const wrapper = mount(
                <Component
                    {...getProps()}
                    a11yTitle="Monthly visits"
                    a11yDescription="Visits doubled in May"
                />
            );
            const svg = wrapper.find('svg.britechart');

            expect(svg.querySelector(':scope > title').textContent).toBe(
                'Monthly visits'
            );
            expect(svg.querySelector(':scope > desc').textContent).toBe(
                'Visits doubled in May'
            );
        });
    });
});
