import React from 'react';
import { mount } from 'enzyme';

import Donut from './Donut';
import donutData from './donutChart.fixtures';

import { DonutWrapper } from '@britecharts/wrappers';

describe('donut Chart', () => {
    describe('render', () => {
        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(DonutWrapper, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method or the chart', () => {
                mount(
                    <Donut
                        chart={DonutWrapper}
                        data={donutData.with4Slices()}
                    />
                );

                const expected = 1;
                const actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the container as the first argument', () => {
                const wrapper = mount(
                    <Donut
                        chart={DonutWrapper}
                        data={donutData.with4Slices()}
                    />
                );

                const expected = wrapper.find('.donut-container').instance();
                const actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the configuration object as the second argument', () => {
                const dataSet = donutData.with4Slices();

                mount(<Donut chart={DonutWrapper} data={dataSet} />);

                const expectedData = dataSet;
                const actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = donutData.with4Slices();
                const expected = 500;

                mount(
                    <Donut
                        chart={DonutWrapper}
                        data={dataSet}
                        width={expected}
                    />
                );

                const actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = donutData.with4Slices();
                const expected = 500;

                mount(
                    <Donut
                        chart={DonutWrapper}
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
                updateSpy = jest.spyOn(DonutWrapper, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method or the chart', () => {
                const wrapper = mount(
                    <Donut
                        chart={DonutWrapper}
                        data={donutData.with4Slices()}
                    />
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
                    <Donut
                        chart={DonutWrapper}
                        data={donutData.with4Slices()}
                    />
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
                    <Donut
                        chart={DonutWrapper}
                        data={donutData.with4Slices()}
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
        let destroySpy;

        beforeEach(() => {
            destroySpy = jest.spyOn(DonutWrapper, 'destroy');
        });

        afterEach(() => {
            destroySpy.mockReset();
            destroySpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const wrapper = mount(
                <Donut chart={DonutWrapper} data={donutData.with4Slices()} />
            );

            wrapper.unmount();

            const expected = 1;
            const actual = destroySpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });

    describe('configuration', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(DonutWrapper, 'create');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        // A Tooltip hands its child chart `createTooltip`. It is the chart
        // component's business, never a configuration key of the wrapper,
        // which rejects keys the chart does not have.
        it('should not pass createTooltip to the wrapper', () => {
            mount(
                <Donut
                    chart={DonutWrapper}
                    data={donutData.with4Slices()}
                    createTooltip={jest.fn()}
                />
            );

            expect(createSpy.mock.calls[0][2]).not.toHaveProperty(
                'createTooltip'
            );
        });
    });

    // The only behavioural defaultProp in the package: `isAnimated` reaches the
    // chart through the defaultProps -> props merge, so a conversion that
    // destructures the rest of the props would silently stop animating the
    // donut. Pinned here so that shows up as one named failure.
    describe('animation', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(DonutWrapper, 'create');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should be animated by default', () => {
            mount(
                <Donut chart={DonutWrapper} data={donutData.with4Slices()} />
            );

            expect(createSpy.mock.calls[0][2].isAnimated).toBe(true);
        });

        it('should let isAnimated be turned off', () => {
            mount(
                <Donut
                    chart={DonutWrapper}
                    data={donutData.with4Slices()}
                    isAnimated={false}
                />
            );

            expect(createSpy.mock.calls[0][2].isAnimated).toBe(false);
        });
    });
});
