// @ts-nocheck -- typed in a follow-up; the rename is for the JSX transform
import React from 'react';
import { mount } from '../../../testing/mount';

import Bar from './Bar';
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
                const wrapper = mount(<Bar data={[]} isLoading={true} />);

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
    describe('re-rendering with props that did not change', () => {
        let updateSpy;

        beforeEach(() => {
            updateSpy = vi.spyOn(BarWrapper, 'update');
        });

        afterEach(() => {
            updateSpy.mockReset();
            updateSpy.mockRestore();
        });

        it('should not redraw the data mutated in place', () => {
            const data = barData.withLetters();
            const wrapper = mount(<Bar chart={BarWrapper} data={data} />);

            data[0].value = 999;
            wrapper.setProps({ chart: BarWrapper, data });

            expect(updateSpy).not.toHaveBeenCalled();
        });
    });
});
