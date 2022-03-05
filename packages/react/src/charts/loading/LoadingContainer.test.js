import React from 'react';
import { shallow, mount } from 'enzyme';

import LoadingContainer from './LoadingContainer';

import barData from '../bar/barChart.fixtures';
import bar from '../bar/barChart';

describe.skip('loading Container', () => {
    it('should render without errors', () => {
        expect(() =>
            mount(
                <LoadingContainer data={barData} loadingState=".load-state">
                    <div className="chart" />
                </LoadingContainer>
            ).unmount()
        ).not.toThrow();
    });

    describe('loading States', () => {
        describe('when data is not null', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(
                    <LoadingContainer data={barData} loadingState=".load-state">
                        <div className="chart" />
                    </LoadingContainer>
                );
            });

            it('should not show the loadingState after mounting', () => {
                const expected = false;
                const actual = wrapper.html().indexOf('load-state') > -1;

                expect(actual).toEqual(expected);

                wrapper.unmount();
            });
        });

        describe('when shouldShowLoadingState is passed', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = shallow(
                    <LoadingContainer
                        data={null}
                        loadingState={bar.loading()}
                        shouldShowLoadingState
                    >
                        <div className="chart" />
                    </LoadingContainer>
                );
            });

            it('should render the loading state', () => {
                const expected = true;
                const actual = wrapper.html().indexOf('load-state') > -1;

                expect(actual).toEqual(expected);

                wrapper.unmount();
            });

            it('should include the loading class on the chart', () => {
                const expected = 'display:none';

                const childContainer = wrapper.find(
                    '.loading-container__children'
                );

                const actual = childContainer
                    .html()
                    .match(/style="([^"]*)"/i)[1];

                expect(actual).toEqual(expected);

                wrapper.unmount();
            });
        });
    });
});
