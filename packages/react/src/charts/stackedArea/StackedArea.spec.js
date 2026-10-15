import StackedArea from './StackedArea';
import React from 'react';
import { mount } from '../../../testing/mount';
import stackedAreaData from './stackedAreaChart.fixtures';
import { StackedAreaWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('stacked Area Chart', () => {
    describeChartComponent({
        Component: StackedArea,
        wrapper: StackedAreaWrapper,
        containerSelector: '.stacked-area-container',
        data: stackedAreaData.with3Sources,
        nextData: stackedAreaData.with2Sources,
    });

    // Each prop reaches the chart by name: a prop with no accessor behind it
    // makes the wrapper throw "Method not supported", so this also proves the
    // names match.
    describe('chart settings', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(StackedAreaWrapper, 'create');
        });

        afterEach(() => {
            createSpy.mockRestore();
        });

        it('should pass hasOutline, xAxisValueType and xAxisScale to the chart', () => {
            mount(
                <StackedArea
                    chart={StackedAreaWrapper}
                    data={stackedAreaData.with3Sources()}
                    hasOutline={false}
                    xAxisValueType="date"
                    xAxisScale="logarithmic"
                />
            );

            const chart = createSpy.mock.results[0].value;

            expect(chart.hasOutline()).toBe(false);
            expect(chart.xAxisValueType()).toBe('date');
            expect(chart.xAxisScale()).toBe('logarithmic');
        });
    });
});
