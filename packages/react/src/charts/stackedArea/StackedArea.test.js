import React from 'react';
import { mount } from 'enzyme';

import StackedArea from './StackedArea';
import stackedAreaData from './stackedAreaChart.fixtures';

import stackedArea from './stackedAreaChart';

describe('stacked Area Chart', () => {
    describe('render', () => {
        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(stackedArea, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method or the chart', () => {
                mount(
                    <StackedArea
                        chart={stackedArea}
                        data={stackedAreaData.with3Sources()}
                    />
                );

                const expected = 1;
                const actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the container as the first argument', () => {
                const wrapper = mount(
                    <StackedArea
                        chart={stackedArea}
                        data={stackedAreaData.with3Sources()}
                    />
                );

                const expected = wrapper
                    .find('.stacked-area-container')
                    .instance();
                const actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the configuration object as the second argument', () => {
                const dataSet = stackedAreaData.with3Sources();

                mount(<StackedArea chart={stackedArea} data={dataSet} />);

                const expectedData = dataSet;
                const actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = stackedAreaData.with3Sources();
                const expected = 500;

                mount(
                    <StackedArea
                        chart={stackedArea}
                        data={dataSet}
                        width={expected}
                    />
                );

                const actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = stackedAreaData.with3Sources();
                const expected = 500;

                mount(
                    <StackedArea
                        chart={stackedArea}
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
                updateSpy = jest.spyOn(stackedArea, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method or the chart', () => {
                const wrapper = mount(
                    <StackedArea
                        chart={stackedArea}
                        data={stackedAreaData.with3Sources()}
                    />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: stackedAreaData.with2Sources(),
                });

                const expected = 1;
                const actual = updateSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new data to the update method', () => {
                const wrapper = mount(
                    <StackedArea
                        chart={stackedArea}
                        data={stackedAreaData.with3Sources()}
                    />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: stackedAreaData.with2Sources(),
                });

                const expected = stackedAreaData.with2Sources().length;
                const actual = updateSpy.mock.calls[0][1].length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const wrapper = mount(
                    <StackedArea
                        chart={stackedArea}
                        data={stackedAreaData.with3Sources()}
                    />
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
            createSpy = jest.spyOn(stackedArea, 'destroy');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const wrapper = mount(
                <StackedArea
                    chart={stackedArea}
                    data={stackedAreaData.with3Sources()}
                />
            );

            wrapper.unmount();

            const expected = 1;
            const actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });
});
