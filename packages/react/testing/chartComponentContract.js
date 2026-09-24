import React from 'react';
import { mount } from './mount';

/**
 * The contract every chart component shares, because every chart component is
 * the same thing: a container element driven by useChart. Called from inside
 * each component's own spec, so a chart breaking the contract fails in its own
 * file, and whatever is particular to that chart stays written next to it.
 *
 * It only holds what is identical across charts. Anything that is not (a
 * loading state, a default prop, chart-specific options) belongs in the
 * component's spec, not behind another option here.
 *
 * @param {Object} options
 * @param {Function} options.Component      The chart component
 * @param {Object} options.wrapper          The wrapper it draws through
 * @param {string} options.containerSelector    Selector of the element the chart is drawn into
 * @param {Function} options.data           Returns the data to draw
 * @param {Function} options.nextData       Returns different data to update to
 * @param {boolean} [options.redrawsTooltip=true]   Whether createTooltip is asked for again after an
 *                                          update. Donut and Legend accept the prop only so a
 *                                          Tooltip can hand it to any chart, and never call it.
 */
const describeChartComponent = ({
    Component,
    wrapper: chart,
    containerSelector,
    data,
    nextData,
    redrawsTooltip = true,
}) => {
    const mountChart = (props) =>
        mount(<Component chart={chart} data={data()} {...props} />);
    const spyOn = (method) => {
        let spy;

        beforeEach(() => {
            spy = jest.spyOn(chart, method);
        });

        afterEach(() => {
            spy.mockRestore();
        });

        return () => spy;
    };

    describe('render', () => {
        describe('when data passed in', () => {
            const createSpy = spyOn('create');

            it('should call the create method of the chart', () => {
                mountChart();

                expect(createSpy()).toHaveBeenCalledTimes(1);
            });

            it('should call the create method of the chart with the container as the first argument', () => {
                const wrapper = mountChart();

                const expected = wrapper.find(containerSelector);
                const actual = createSpy().mock.calls[0][0];

                expect(actual).toBe(expected);
            });

            it('should call the create method of the chart with the data as the second argument', () => {
                const dataSet = data();

                mountChart({ data: dataSet });

                const actual = createSpy().mock.calls[0][1];

                expect(actual).toBe(dataSet);
            });

            it('should allow setting width', () => {
                const expected = 500;

                mountChart({ width: expected });

                const actual = createSpy().mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const expected = 500;

                mountChart({ height: expected });

                const actual = createSpy().mock.calls[0][2].height;

                expect(actual).toEqual(expected);
            });

            // A Tooltip hands its child chart `createTooltip`. It is the chart
            // component's business, never a configuration key of the wrapper,
            // which rejects keys the chart does not have.
            it('should not pass the component-only props to the wrapper', () => {
                mountChart({ createTooltip: jest.fn() });

                const configuration = createSpy().mock.calls[0][2];

                expect(configuration).not.toHaveProperty('createTooltip');
                expect(configuration).not.toHaveProperty('chart');
                expect(configuration).not.toHaveProperty('data');
            });

            it('should draw the chart', () => {
                const wrapper = mountChart();

                expect(
                    wrapper.getDOMNode().querySelectorAll('svg')
                ).toHaveLength(1);
            });
        });

        describe('when there is no data yet', () => {
            const createSpy = spyOn('create');
            const updateSpy = spyOn('update');

            it('should not throw', () => {
                expect(() => mountChart({ data: null })).not.toThrow();
            });

            it('should not call the create method of the chart', () => {
                mountChart({ data: null });

                expect(createSpy()).not.toHaveBeenCalled();
            });

            it('should not draw anything', () => {
                const wrapper = mountChart({ data: null });

                expect(
                    wrapper.getDOMNode().querySelectorAll('svg')
                ).toHaveLength(0);
            });

            describe('and the data arrives', () => {
                it('should call the create method of the chart', () => {
                    const wrapper = mountChart({ data: null });

                    wrapper.setProps({ data: data() });

                    expect(createSpy()).toHaveBeenCalledTimes(1);
                });

                it('should not call the update method of the chart', () => {
                    const wrapper = mountChart({ data: null });

                    wrapper.setProps({ data: data() });

                    expect(updateSpy()).not.toHaveBeenCalled();
                });

                it('should draw the chart', () => {
                    const wrapper = mountChart({ data: null });

                    wrapper.setProps({ data: data() });

                    expect(
                        wrapper.getDOMNode().querySelectorAll('svg')
                    ).toHaveLength(1);
                });

                it('should update the chart on the next change', () => {
                    const wrapper = mountChart({ data: null });

                    wrapper.setProps({ data: data() });
                    wrapper.setProps({ width: 300 });

                    expect(updateSpy()).toHaveBeenCalledTimes(1);
                });
            });
        });
    });

    describe('update', () => {
        describe('when data changes', () => {
            const updateSpy = spyOn('update');

            it('should call the update method of the chart', () => {
                const wrapper = mountChart();

                wrapper.setProps({ data: nextData() });

                expect(updateSpy()).toHaveBeenCalledTimes(1);
            });

            it('should pass in the container to the update method', () => {
                const wrapper = mountChart();

                wrapper.setProps({ data: nextData() });

                const expected = wrapper.find(containerSelector);
                const actual = updateSpy().mock.calls[0][0];

                expect(actual).toBe(expected);
            });

            it('should pass in the new data to the update method', () => {
                const wrapper = mountChart();
                const expected = nextData();

                wrapper.setProps({ data: expected });

                const actual = updateSpy().mock.calls[0][1];

                expect(actual).toBe(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const wrapper = mountChart();
                const expected = 20;

                wrapper.setProps({ width: expected });

                const actual = updateSpy().mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            if (redrawsTooltip) {
                it('should ask for the tooltip again after the chart updated', () => {
                    const createTooltip = jest.fn();
                    const wrapper = mountChart({ createTooltip });

                    // Never after the creation
                    expect(createTooltip).not.toHaveBeenCalled();

                    wrapper.setProps({ data: nextData() });

                    expect(createTooltip).toHaveBeenCalledTimes(1);
                    expect(
                        createTooltip.mock.invocationCallOrder[0]
                    ).toBeGreaterThan(updateSpy().mock.invocationCallOrder[0]);
                });
            } else {
                it('should not ask for the tooltip after the chart updated', () => {
                    const createTooltip = jest.fn();
                    const wrapper = mountChart({ createTooltip });

                    wrapper.setProps({ data: nextData() });

                    expect(createTooltip).not.toHaveBeenCalled();
                });
            }
        });
    });

    describe('unmount', () => {
        const destroySpy = spyOn('destroy');

        it('should call the destroy method of the chart with the container', () => {
            const wrapper = mountChart();
            const container = wrapper.find(containerSelector);

            wrapper.unmount();

            expect(destroySpy()).toHaveBeenCalledTimes(1);
            expect(destroySpy().mock.calls[0][0]).toBe(container);
        });
    });
};

export default describeChartComponent;
