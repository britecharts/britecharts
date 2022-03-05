import React from 'react';
import { mount } from 'enzyme';

import Sparkline from './Sparkline';
import sparklineData from './sparklineChart.fixtures';

import sparkline from './sparklineChart';

describe('sparkline Chart', () => {
    describe('render', () => {
        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(sparkline, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method or the chart', () => {
                const dataSet = sparklineData.with1Source();

                mount(<Sparkline chart={sparkline} data={dataSet} />);

                const expected = 1;
                const actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the container as the first argument', () => {
                const dataSet = sparklineData.with1Source();

                const wrapper = mount(
                    <Sparkline chart={sparkline} data={dataSet} />
                );

                const expected = wrapper
                    .find('.sparkline-container')
                    .instance();
                const actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the configuration object as the second argument', () => {
                const dataSet = sparklineData.with1Source();

                mount(<Sparkline chart={sparkline} data={dataSet} />);

                const expectedData = dataSet;
                const actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = sparklineData.with1Source();
                const expected = 500;

                mount(
                    <Sparkline
                        chart={sparkline}
                        data={dataSet}
                        width={expected}
                    />
                );

                const actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = sparklineData.with1Source();
                const expected = 500;

                mount(
                    <Sparkline
                        chart={sparkline}
                        data={dataSet}
                        height={expected}
                    />
                );

                const actual = createSpy.mock.calls[0][2].height;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {
        describe('when data changes', () => {
            let updateSpy;

            beforeEach(() => {
                updateSpy = jest.spyOn(sparkline, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method or the chart', () => {
                const dataSet = sparklineData.with1Source();
                const wrapper = mount(
                    <Sparkline chart={sparkline} data={dataSet} />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: sparklineData.withLowValues(),
                });

                const expected = 1;
                const actual = updateSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new data to the update method', () => {
                const dataSet = sparklineData.with1Source();
                const wrapper = mount(
                    <Sparkline chart={sparkline} data={dataSet} />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: sparklineData.withLowValues(),
                });

                const expected = sparklineData.withLowValues().length;
                const actual = updateSpy.mock.calls[0][1].length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const dataSet = sparklineData.with1Source();
                const wrapper = mount(
                    <Sparkline chart={sparkline} data={dataSet} />
                );
                const expected = 20;

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    width: expected,
                });

                const actual = updateSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('unmount', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(sparkline, 'destroy');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const dataSet = sparklineData.with1Source();
            const wrapper = mount(
                <Sparkline chart={sparkline} data={dataSet} />
            );

            wrapper.unmount();

            const expected = 1;
            const actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });
});
