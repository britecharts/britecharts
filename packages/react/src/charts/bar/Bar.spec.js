import React from 'react';
import { mount } from 'enzyme';

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
                const actual = wrapper.render().find('.bar-load-state').length;

                expect(actual).toEqual(expected);
            });
        });

        // A flag that is turned back off has to reach the chart: false used to
        // be skipped, so isLoading={false} could never end a loading state
        describe('when isLoading turns false', () => {
            it('should end the loading state', () => {
                const wrapper = mount(<Bar data={[]} isLoading={true} />);

                wrapper.setProps({
                    data: barData.withLetters(),
                    isLoading: false,
                });

                const expected = 0;
                const actual = wrapper.render().find('.bar-load-state').length;

                expect(actual).toEqual(expected);
            });
        });
    });

    // Flipped by Bar's conversion to a function component (decision 04): it
    // used to redraw on every re-render, even with referentially identical
    // props, which is how a consumer who mutated their data array in place got a
    // redraw. The props are now compared with the last drawing, so no update is
    // made; a new array or object is needed. Named in the changeset.
    describe('re-rendering with props that did not change', () => {
        let updateSpy;

        beforeEach(() => {
            updateSpy = jest.spyOn(BarWrapper, 'update');
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
