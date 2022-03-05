import React from 'react';
import { mount } from 'enzyme';

import Donut from './Donut';
import donutData from './donutChart.fixtures';

import donut from './donutChart';

describe('donut Chart', () => {
    describe('render', () => {
        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(donut, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method or the chart', () => {
                mount(<Donut chart={donut} data={donutData.with4Slices()} />);

                const expected = 1;
                const actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the container as the first argument', () => {
                const wrapper = mount(
                    <Donut chart={donut} data={donutData.with4Slices()} />
                );

                const expected = wrapper.find('.donut-container').instance();
                const actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the configuration object as the second argument', () => {
                const dataSet = donutData.with4Slices();

                mount(<Donut chart={donut} data={dataSet} />);

                const expectedData = dataSet;
                const actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = donutData.with4Slices();
                const expected = 500;

                mount(<Donut chart={donut} data={dataSet} width={expected} />);

                const actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = donutData.with4Slices();
                const expected = 500;

                mount(<Donut chart={donut} data={dataSet} height={expected} />);

                const actual = createSpy.mock.calls[0][2].height;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {
        describe('when data changes', () => {
            let updateSpy;

            beforeEach(() => {
                updateSpy = jest.spyOn(donut, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method or the chart', () => {
                const wrapper = mount(
                    <Donut chart={donut} data={donutData.with4Slices()} />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: donutData.with4Slices(),
                });

                const expected = 1;
                const actual = updateSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new data to the update method', () => {
                const wrapper = mount(
                    <Donut chart={donut} data={donutData.with4Slices()} />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: donutData.with4Slices(),
                });

                const expected = donutData.with4Slices().length;
                const actual = updateSpy.mock.calls[0][1].length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the createTooltip method', () => {
                const wrapper = mount(
                    <Donut chart={donut} data={donutData.with4Slices()} />
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
        let destroySpy;

        beforeEach(() => {
            destroySpy = jest.spyOn(donut, 'destroy');
        });

        afterEach(() => {
            destroySpy.mockReset();
            destroySpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const wrapper = mount(
                <Donut chart={donut} data={donutData.with4Slices()} />
            );

            wrapper.unmount();

            const expected = 1;
            const actual = destroySpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });
});
