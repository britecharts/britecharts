import React from 'react';
import type { MockInstance } from 'vitest';
import { mount } from '../../../testing/mount';

import Line from './Line';
import type { LineProps } from './Line';
import lineData from './lineChart.fixtures';
import { LineWrapper } from '@britecharts/wrappers';

// What Line does with its wrapper over its life, beyond what the colocated
// Line.spec.js pins.
describe('Line lifecycle', () => {
    let chartData: typeof lineData.flatData.a;
    let createSpy: MockInstance<typeof LineWrapper.create>;
    let updateSpy: MockInstance<typeof LineWrapper.update>;
    let destroySpy: MockInstance<typeof LineWrapper.destroy>;

    beforeEach(() => {
        chartData = lineData.flatData.a;
        createSpy = vi.spyOn(LineWrapper, 'create');
        updateSpy = vi.spyOn(LineWrapper, 'update');
        destroySpy = vi.spyOn(LineWrapper, 'destroy');
    });

    afterEach(() => {
        [createSpy, updateSpy, destroySpy].forEach((spy) => {
            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('mount', () => {
        it('should use its own wrapper when no chart prop is given', () => {
            mount(<Line data={chartData} />);

            expect(createSpy).toHaveBeenCalledTimes(1);
        });

        it('should not pass data, chart or createTooltip in the configuration', () => {
            mount(
                <Line
                    chart={LineWrapper}
                    data={chartData}
                    createTooltip={vi.fn()}
                    width={300}
                />
            );

            const configuration = createSpy.mock.calls[0][2];

            expect(configuration).toEqual({ width: 300 });
        });

        it('should have drawn the chart by the time mount returns', () => {
            const wrapper = mount(<Line data={chartData} />);

            expect(
                wrapper.getDOMNode().querySelectorAll('svg.line-chart')
            ).toHaveLength(1);
        });

        it('should not create the chart while there is no data', () => {
            mount(<Line data={null} />);

            expect(createSpy).not.toHaveBeenCalled();
        });
    });

    describe('when the data arrives after mount', () => {
        it('should create the chart', () => {
            const wrapper = mount<LineProps>(<Line data={null} />);

            wrapper.setProps({ data: chartData });

            expect(createSpy).toHaveBeenCalledTimes(1);
        });

        it('should not call the update method of the chart', () => {
            const wrapper = mount<LineProps>(<Line data={null} />);

            wrapper.setProps({ data: chartData });

            expect(updateSpy).not.toHaveBeenCalled();
        });

        it('should not create the chart on renders that still have no data', () => {
            const wrapper = mount<LineProps>(<Line data={null} />);

            wrapper.setProps({ width: 300 });
            wrapper.setProps({ width: 400 });

            expect(createSpy).not.toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('should pass the chart instance as the fourth argument', () => {
            const wrapper = mount<LineProps>(<Line data={chartData} />);
            const instance = createSpy.mock.results[0].value;

            wrapper.setProps({ width: 300 });

            expect(updateSpy.mock.calls[0][3]).toBe(instance);
        });

        it('should pass update the same node create received', () => {
            const wrapper = mount<LineProps>(<Line data={chartData} />);

            wrapper.setProps({ width: 300 });

            expect(updateSpy.mock.calls[0][0]).toBe(createSpy.mock.calls[0][0]);
        });

        it('should update when a configuration value changes', () => {
            const wrapper = mount<LineProps>(
                <Line data={chartData} width={200} />
            );

            wrapper.setProps({ width: 300 });

            expect(updateSpy).toHaveBeenCalledTimes(1);
        });

        it('should update when the data is a new array or object', () => {
            const wrapper = mount<LineProps>(<Line data={chartData} />);

            wrapper.setProps({ data: { ...chartData } });

            expect(updateSpy).toHaveBeenCalledTimes(1);
        });

        // The configuration is rebuilt from props on every render, so a
        // re-render is compared to the last drawing field by field and skipped
        // when nothing changed.
        describe('when a re-render brings props that did not change', () => {
            it('should not call the update method of the chart', () => {
                const wrapper = mount<LineProps>(
                    <Line data={chartData} width={300} margin={{ top: 1 }} />
                );

                wrapper.setProps({ data: chartData, width: 300 });

                expect(updateSpy).not.toHaveBeenCalled();
            });

            // The behaviour the shallow compare deliberately takes away: a
            // consumer who mutates their data in place and re-renders with the
            // same reference gets no redraw. They have to pass a new one.
            it('should not redraw the data mutated in place', () => {
                const data = lineData.flatData.a;
                const wrapper = mount<LineProps>(<Line data={data} />);

                data.data[0].value = 999;
                wrapper.setProps({ data });

                expect(updateSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe('createTooltip', () => {
        it('should be called after the chart updated', () => {
            const createTooltip = vi.fn();
            const wrapper = mount<LineProps>(
                <Line data={chartData} createTooltip={createTooltip} />
            );

            wrapper.setProps({ width: 300 });

            expect(createTooltip).toHaveBeenCalledTimes(1);
            expect(createTooltip.mock.invocationCallOrder[0]).toBeGreaterThan(
                updateSpy.mock.invocationCallOrder[0]
            );
        });

        it('should not be called after the chart was created', () => {
            const createTooltip = vi.fn();

            mount(<Line data={chartData} createTooltip={createTooltip} />);

            expect(createTooltip).not.toHaveBeenCalled();
        });

        it('should not be called when the chart is created once the data arrives', () => {
            const createTooltip = vi.fn();
            const wrapper = mount<LineProps>(
                <Line data={null} createTooltip={createTooltip} />
            );

            wrapper.setProps({ data: chartData });

            expect(createTooltip).not.toHaveBeenCalled();
        });
    });

    describe('unmount', () => {
        it('should destroy the chart exactly once', () => {
            const wrapper = mount(<Line data={chartData} />);

            wrapper.unmount();

            expect(destroySpy).toHaveBeenCalledTimes(1);
        });

        it('should pass destroy the same node create received', () => {
            const wrapper = mount(<Line data={chartData} />);

            wrapper.unmount();

            // toBe, not toEqual: a stale or different node must fail
            expect(destroySpy.mock.calls[0][0]).toBe(
                createSpy.mock.calls[0][0]
            );
        });

        it('should destroy with the latest chart wrapper, not the first', () => {
            const latest = {
                create: vi.fn(),
                update: vi.fn(),
                destroy: vi.fn(),
            };
            const wrapper = mount<LineProps>(
                <Line chart={LineWrapper} data={chartData} />
            );

            wrapper.setProps({ chart: latest });
            wrapper.unmount();

            expect(latest.destroy).toHaveBeenCalledTimes(1);
            expect(destroySpy).not.toHaveBeenCalled();
        });

        it('should remove the chart it drew', () => {
            const wrapper = mount(<Line data={chartData} />);
            const container = wrapper.getDOMNode();

            wrapper.unmount();

            expect(container.querySelectorAll('svg')).toHaveLength(0);
        });
    });
});
