import React from 'react';
import type { MockInstance } from 'vitest';
import { mount } from '../../../testing/mount';

import Bar from './Bar';
import type { BarChartProps } from './Bar';
import barData from './barChart.fixtures';
import { BarWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('bar Chart', () => {
    describeChartComponent({
        Component: Bar,
        wrapper: BarWrapper,
        containerSelector: '.bar-container',
        data: barData.withLetters,
        nextData: barData.withColors,
    });

    describe('render', () => {
        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const wrapper = mount(<Bar data={[]} isLoading={true} />);

                const expected = 1;
                const actual = wrapper.findAll('.bar-load-state').length;

                expect(actual).toEqual(expected);
            });
        });

        // A flag that is turned back off has to reach the chart: skipping false
        // would mean isLoading={false} could never end a loading state
        describe('when isLoading turns false', () => {
            it('should end the loading state', () => {
                const wrapper = mount<BarChartProps>(
                    <Bar data={[]} isLoading={true} />
                );

                wrapper.setProps({
                    data: barData.withLetters(),
                    isLoading: false,
                });

                const expected = 0;
                const actual = wrapper.findAll('.bar-load-state').length;

                expect(actual).toEqual(expected);
            });
        });
    });

    // The props are compared with the last drawing, so a re-render with
    // referentially identical props makes no update: a consumer who mutates
    // their data array in place gets no redraw, and needs a new array or
    // object.
    describe('when hasLabels is passed', () => {
        it('should draw the labels', () => {
            const wrapper = mount(
                <Bar data={barData.withLetters()} hasLabels={true} />
            );

            expect(wrapper.findAll('.percentage-label').length).toBeGreaterThan(
                0
            );
        });
    });

    describe('re-rendering with props that did not change', () => {
        let updateSpy: MockInstance<typeof BarWrapper.update>;

        beforeEach(() => {
            updateSpy = vi.spyOn(BarWrapper, 'update');
        });

        afterEach(() => {
            updateSpy.mockReset();
            updateSpy.mockRestore();
        });

        it('should not redraw the data mutated in place', () => {
            const data = barData.withLetters();
            const wrapper = mount<BarChartProps>(
                <Bar chart={BarWrapper} data={data} />
            );

            data[0].value = 999;
            wrapper.setProps({ chart: BarWrapper, data });

            expect(updateSpy).not.toHaveBeenCalled();
        });
    });
});
