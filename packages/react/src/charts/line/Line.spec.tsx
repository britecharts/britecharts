// @ts-nocheck -- typed in a follow-up; the rename is for the JSX transform
import Line from './Line';
import React from 'react';
import { mount } from '../../../testing/mount';
import lineData from './lineChart.fixtures';
import { LineWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('Line', () => {
    describeChartComponent({
        Component: Line,
        wrapper: LineWrapper,
        containerSelector: '.line-container',
        data: () => lineData.flatData.a,
        nextData: () => lineData.flatData.b,
    });

    // Each prop reaches the chart by name: a prop with no accessor behind it
    // makes the wrapper throw "Method not supported", so this also proves the
    // names match.
    describe('chart settings', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = vi.spyOn(LineWrapper, 'create');
        });

        afterEach(() => {
            createSpy.mockRestore();
        });

        it('should pass lines, shouldShowAllDataPoints and hasMinimumValueScale to the chart', () => {
            const lines = [{ y: 2, name: 'Threshold', color: '#ff0000' }];

            mount(
                <Line
                    chart={LineWrapper}
                    data={lineData.flatData.a}
                    lines={lines}
                    shouldShowAllDataPoints={true}
                    hasMinimumValueScale={true}
                />
            );

            const chart = createSpy.mock.results[0].value;

            expect(chart.lines()).toEqual(lines);
            expect(chart.shouldShowAllDataPoints()).toBe(true);
            expect(chart.hasMinimumValueScale()).toBe(true);
        });
    });
});
