import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import useChart from './useChart';

/**
 * The hook is the one place eleven components get their lifecycle from, so it
 * is tested directly against a fake wrapper of spies. The cases named "defect
 * N" are the twelve ways the abandoned hooks port of Bullet
 * (it was packages/react/TS-wip/ComponentDemo.tsx, since removed: see
 * `git show f6c738d8:packages/react/TS-wip/ComponentDemo.tsx`) went wrong, so
 * the same mistakes fail here by name.
 */
const makeWrapper = () => {
    const instance = { name: 'the chart instance' };

    return {
        instance,
        create: jest.fn(() => instance),
        update: jest.fn(),
        destroy: jest.fn(),
    };
};

// Renders the hook into a container, and counts how often it renders
const Harness = ({ wrapper, data, configuration = {}, options, onRender }) => {
    if (onRender) {
        onRender();
    }

    const rootNode = useChart(wrapper, data, configuration, options);

    return <div className="harness" ref={rootNode} />;
};

Harness.propTypes = {
    wrapper: PropTypes.object.isRequired,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    configuration: PropTypes.object,
    options: PropTypes.object,
    onRender: PropTypes.func,
};

const mountHarness = (props) => mount(<Harness {...props} />);

describe('useChart', () => {
    let wrapper;
    let data;

    beforeEach(() => {
        wrapper = makeWrapper();
        data = [{ value: 1 }];
    });

    describe('on mount', () => {
        it('should create the chart with the node, the data and the configuration', () => {
            const configuration = { width: 300 };
            const mounted = mountHarness({ wrapper, data, configuration });

            expect(wrapper.create).toHaveBeenCalledTimes(1);
            expect(wrapper.create.mock.calls[0][0]).toBe(mounted.getDOMNode());
            expect(wrapper.create.mock.calls[0][1]).toBe(data);
            expect(wrapper.create.mock.calls[0][2]).toEqual(configuration);
        });

        // defect 8: passive effects paint an empty container first
        it('should have created the chart by the time mount returns', () => {
            mountHarness({ wrapper, data });

            expect(wrapper.create).toHaveBeenCalledTimes(1);
        });

        // defect 3: the instance lived in state, costing a render nothing used
        it('should not render again after creating the chart', () => {
            const onRender = jest.fn();

            mountHarness({ wrapper, data, onRender });

            expect(onRender).toHaveBeenCalledTimes(1);
        });

        it('should not call update or the tooltip callback', () => {
            const createTooltip = jest.fn();

            mountHarness({ wrapper, data, options: { createTooltip } });

            expect(wrapper.update).not.toHaveBeenCalled();
            expect(createTooltip).not.toHaveBeenCalled();
        });

        describe('when there is no data yet', () => {
            it('should not create the chart', () => {
                mountHarness({ wrapper, data: null });

                expect(wrapper.create).not.toHaveBeenCalled();
            });

            it('should create the chart anyway when the component does not require data', () => {
                mountHarness({
                    wrapper,
                    data: null,
                    options: { requiresData: false },
                });

                expect(wrapper.create).toHaveBeenCalledTimes(1);
                expect(wrapper.create.mock.calls[0][1]).toBeNull();
            });
        });
    });

    describe('on a later render', () => {
        // defect 6: no create-if-missing path left a chart blank forever
        describe('once the data arrives', () => {
            it('should create the chart', () => {
                const mounted = mountHarness({ wrapper, data: null });

                mounted.setProps({ data });

                expect(wrapper.create).toHaveBeenCalledTimes(1);
                expect(wrapper.create.mock.calls[0][1]).toBe(data);
            });

            it('should not call update or the tooltip callback for the creation', () => {
                const createTooltip = jest.fn();
                const mounted = mountHarness({
                    wrapper,
                    data: null,
                    options: { createTooltip },
                });

                mounted.setProps({ data });

                expect(wrapper.update).not.toHaveBeenCalled();
                expect(createTooltip).not.toHaveBeenCalled();
            });
        });

        it('should not create the chart on renders that still have no data', () => {
            const mounted = mountHarness({ wrapper, data: null });

            mounted.setProps({ configuration: { width: 1 } });
            mounted.setProps({ configuration: { width: 2 } });

            expect(wrapper.create).not.toHaveBeenCalled();
        });
    });

    describe('on update', () => {
        it('should pass update the same node create received', () => {
            const mounted = mountHarness({ wrapper, data });

            mounted.setProps({ configuration: { width: 2 } });

            expect(wrapper.update.mock.calls[0][0]).toBe(
                wrapper.create.mock.calls[0][0]
            );
        });

        it('should pass update the new data and configuration', () => {
            const mounted = mountHarness({ wrapper, data });
            const newData = [{ value: 2 }];
            const configuration = { width: 2 };

            mounted.setProps({ data: newData, configuration });

            expect(wrapper.update.mock.calls[0][1]).toBe(newData);
            expect(wrapper.update.mock.calls[0][2]).toEqual(configuration);
        });

        // the eleven component specs only ever read calls[0][2]
        it('should pass the chart instance as the fourth argument to update', () => {
            const mounted = mountHarness({ wrapper, data });

            mounted.setProps({ configuration: { width: 2 } });

            expect(wrapper.update.mock.calls[0][3]).toBe(wrapper.instance);
        });

        it('should update when a configuration value changes', () => {
            const mounted = mountHarness({
                wrapper,
                data,
                configuration: { width: 1 },
            });

            mounted.setProps({ configuration: { width: 2 } });

            expect(wrapper.update).toHaveBeenCalledTimes(1);
        });

        it('should update when the data is a different object', () => {
            const mounted = mountHarness({ wrapper, data });

            mounted.setProps({ data: [...data] });

            expect(wrapper.update).toHaveBeenCalledTimes(1);
        });

        it('should update when a configuration key is added or removed', () => {
            const mounted = mountHarness({
                wrapper,
                data,
                configuration: { width: 1 },
            });

            mounted.setProps({
                configuration: { width: 1, height: undefined },
            });
            mounted.setProps({ configuration: { width: 1 } });

            expect(wrapper.update).toHaveBeenCalledTimes(2);
        });

        // defect 2: a deps array of [data, ref, props] is decorative, since
        // props is a new object on every render and so always "changed"
        describe('when the previous drawing is identical', () => {
            it('should not update, even with a new configuration object holding the same values', () => {
                const mounted = mountHarness({
                    wrapper,
                    data,
                    configuration: { width: 1, margin: 5 },
                });

                mounted.setProps({ configuration: { width: 1, margin: 5 } });

                expect(wrapper.update).not.toHaveBeenCalled();
            });

            it('should not update when the data was mutated in place', () => {
                const mounted = mountHarness({ wrapper, data });

                data[0].value = 999;
                mounted.setProps({ data });

                expect(wrapper.update).not.toHaveBeenCalled();
            });

            it('should compare with Object.is, so NaN equals NaN', () => {
                const mounted = mountHarness({
                    wrapper,
                    data,
                    configuration: { ratio: NaN },
                });

                mounted.setProps({ configuration: { ratio: NaN } });

                expect(wrapper.update).not.toHaveBeenCalled();
            });
        });

        // defect 5: the demo never called createTooltip, so the tooltip was
        // gone after the first update
        describe('the tooltip callback', () => {
            it('should be called after update, and after nothing else', () => {
                const createTooltip = jest.fn();
                const mounted = mountHarness({
                    wrapper,
                    data,
                    options: { createTooltip },
                });

                mounted.setProps({ configuration: { width: 2 } });

                expect(createTooltip).toHaveBeenCalledTimes(1);
                expect(
                    createTooltip.mock.invocationCallOrder[0]
                ).toBeGreaterThan(wrapper.update.mock.invocationCallOrder[0]);
            });

            it('should not be called when the update was skipped', () => {
                const createTooltip = jest.fn();
                const mounted = mountHarness({
                    wrapper,
                    data,
                    options: { createTooltip },
                });

                mounted.setProps({ data });

                expect(createTooltip).not.toHaveBeenCalled();
            });

            it('should default to doing nothing', () => {
                const mounted = mountHarness({ wrapper, data });

                expect(() =>
                    mounted.setProps({ configuration: { width: 2 } })
                ).not.toThrow();
            });
        });

        it('should update with the latest wrapper', () => {
            const latest = makeWrapper();
            const mounted = mountHarness({ wrapper, data });

            mounted.setProps({ wrapper: latest, configuration: { width: 2 } });

            expect(latest.update).toHaveBeenCalledTimes(1);
            expect(wrapper.update).not.toHaveBeenCalled();
        });
    });

    describe('on unmount', () => {
        // defect 1: the cleanup closed over the initial null instance, so
        // destroy never ran
        it('should destroy the chart exactly once', () => {
            const mounted = mountHarness({ wrapper, data });

            mounted.unmount();

            expect(wrapper.destroy).toHaveBeenCalledTimes(1);
        });

        // toBe, not toEqual: precisely where a []-deps effect passes a stale node
        it('should pass destroy the same node create received', () => {
            const mounted = mountHarness({ wrapper, data });

            mounted.unmount();

            expect(wrapper.destroy.mock.calls[0][0]).toBe(
                wrapper.create.mock.calls[0][0]
            );
        });

        it('should destroy even when the chart was never created', () => {
            const mounted = mountHarness({ wrapper, data: null });

            mounted.unmount();

            expect(wrapper.destroy).toHaveBeenCalledTimes(1);
        });

        it('should destroy with the latest wrapper, not the first', () => {
            const latest = makeWrapper();
            const mounted = mountHarness({ wrapper, data });

            mounted.setProps({ wrapper: latest });
            mounted.unmount();

            expect(latest.destroy).toHaveBeenCalledTimes(1);
            expect(wrapper.destroy).not.toHaveBeenCalled();
        });

        it('should not call update or the tooltip callback', () => {
            const createTooltip = jest.fn();
            const mounted = mountHarness({
                wrapper,
                data,
                options: { createTooltip },
            });

            mounted.unmount();

            expect(wrapper.update).not.toHaveBeenCalled();
            expect(createTooltip).not.toHaveBeenCalled();
        });
    });

    // defect 9: under StrictMode the demo created a second chart. React 16's
    // StrictMode does not double-invoke effects, so the cycle is driven by hand
    // here; the React 19 development-build page covers the real thing
    describe('mounting again after an unmount', () => {
        it('should create a chart for the new node', () => {
            mountHarness({ wrapper, data }).unmount();
            const second = mountHarness({ wrapper, data });

            expect(wrapper.create).toHaveBeenCalledTimes(2);
            expect(wrapper.create.mock.calls[1][0]).toBe(second.getDOMNode());
            expect(wrapper.destroy).toHaveBeenCalledTimes(1);
        });
    });
});
