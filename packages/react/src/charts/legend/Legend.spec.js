import React from 'react';
import { mount } from 'enzyme';

import Legend from './Legend';
import legendData from './legendChart.fixtures';
import { LegendWrapper } from '@britecharts/wrappers';

describe('legend Chart', () => {
    describe('render', () => {
        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(LegendWrapper, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method or the chart', () => {
                mount(
                    <Legend
                        chart={LegendWrapper}
                        data={legendData.with6Points()}
                    />
                );

                const expected = 1;
                const actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the container as the first argument', () => {
                const wrapper = mount(
                    <Legend
                        chart={LegendWrapper}
                        data={legendData.with6Points()}
                    />
                );

                const expected = wrapper.find('.legend-container').instance();
                const actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the configuration object as the second argument', () => {
                const dataSet = legendData.with6Points();

                mount(<Legend chart={LegendWrapper} data={dataSet} />);

                const expectedData = dataSet;
                const actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = legendData.with6Points();
                const expected = 500;

                mount(
                    <Legend
                        chart={LegendWrapper}
                        data={dataSet}
                        width={expected}
                    />
                );

                const actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = legendData.with6Points();
                const expected = 500;

                mount(
                    <Legend
                        chart={LegendWrapper}
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
                updateSpy = jest.spyOn(LegendWrapper, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method or the chart', () => {
                const wrapper = mount(
                    <Legend
                        chart={LegendWrapper}
                        data={legendData.with6Points()}
                    />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: legendData.with6Points(),
                });

                const expected = 1;
                const actual = updateSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new data to the update method', () => {
                const wrapper = mount(
                    <Legend
                        chart={LegendWrapper}
                        data={legendData.with6Points()}
                    />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: legendData.with6Points(),
                });

                const expected = legendData.with6Points().length;
                const actual = updateSpy.mock.calls[0][1].length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const wrapper = mount(
                    <Legend
                        chart={LegendWrapper}
                        data={legendData.with6Points()}
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
            destroySpy = jest.spyOn(LegendWrapper, 'destroy');
        });

        afterEach(() => {
            destroySpy.mockReset();
            destroySpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const wrapper = mount(
                <Legend chart={LegendWrapper} data={legendData.with6Points()} />
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
            createSpy = jest.spyOn(LegendWrapper, 'create');
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
                <Legend
                    chart={LegendWrapper}
                    data={legendData.with6Points()}
                    createTooltip={jest.fn()}
                />
            );

            expect(createSpy.mock.calls[0][2]).not.toHaveProperty(
                'createTooltip'
            );
        });
    });

    // Same lifecycle as every other chart: nothing is drawn until there is
    // data, and the chart is created as soon as it arrives.
    describe('when there is no data yet', () => {
        let createSpy;
        let updateSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(LegendWrapper, 'create');
            updateSpy = jest.spyOn(LegendWrapper, 'update');
        });

        afterEach(() => {
            createSpy.mockRestore();
            updateSpy.mockRestore();
        });

        it('should not throw', () => {
            expect(() =>
                mount(<Legend chart={LegendWrapper} data={null} />)
            ).not.toThrow();
        });

        it('should not call the create method of the chart', () => {
            mount(<Legend chart={LegendWrapper} data={null} />);

            expect(createSpy).not.toHaveBeenCalled();
        });

        it('should not draw anything', () => {
            const wrapper = mount(<Legend chart={LegendWrapper} data={null} />);

            expect(wrapper.getDOMNode().querySelectorAll('svg')).toHaveLength(
                0
            );
        });

        describe('and the data arrives', () => {
            it('should call the create method of the chart', () => {
                const wrapper = mount(
                    <Legend chart={LegendWrapper} data={null} />
                );

                wrapper.setProps({ data: legendData.with6Points() });

                expect(createSpy).toHaveBeenCalledTimes(1);
            });

            it('should not call the update method of the chart', () => {
                const wrapper = mount(
                    <Legend chart={LegendWrapper} data={null} />
                );

                wrapper.setProps({ data: legendData.with6Points() });

                expect(updateSpy).not.toHaveBeenCalled();
            });

            it('should draw the chart', () => {
                const wrapper = mount(
                    <Legend chart={LegendWrapper} data={null} />
                );

                wrapper.setProps({ data: legendData.with6Points() });

                expect(
                    wrapper.getDOMNode().querySelectorAll('svg')
                ).toHaveLength(1);
            });

            it('should update the chart on the next change', () => {
                const wrapper = mount(
                    <Legend chart={LegendWrapper} data={null} />
                );

                wrapper.setProps({ data: legendData.with6Points() });
                wrapper.setProps({ width: 300 });

                expect(updateSpy).toHaveBeenCalledTimes(1);
            });
        });
    });
});
