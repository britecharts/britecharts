import React from 'react';
import type { MockInstance } from 'vitest';
import type { DonutChartDataShape } from '@britecharts/core';
import { mount } from '../../../testing/mount';

import Donut from './Donut';
import type { DonutChartProps } from './Donut';
import donutData from './donutChart.fixtures';
import { DonutWrapper } from '@britecharts/wrappers';

// What Donut does with its wrapper over its life, beyond what the colocated
// Donut.spec.js pins.
describe('Donut lifecycle', () => {
    let data: DonutChartDataShape[];
    let createSpy: MockInstance<typeof DonutWrapper.create>;
    let updateSpy: MockInstance<typeof DonutWrapper.update>;
    let destroySpy: MockInstance<typeof DonutWrapper.destroy>;

    beforeEach(() => {
        data = donutData.with4Slices();
        createSpy = vi.spyOn(DonutWrapper, 'create');
        updateSpy = vi.spyOn(DonutWrapper, 'update');
        destroySpy = vi.spyOn(DonutWrapper, 'destroy');
    });

    afterEach(() => {
        [createSpy, updateSpy, destroySpy].forEach((spy) => {
            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('render', () => {
        it('should render its container', () => {
            const wrapper = mount<DonutChartProps>(<Donut data={data} />);

            expect(wrapper.getDOMNode().className).toEqual('donut-container');
        });

        // The container centres the chart; it is the one element with an inline
        // style, which is why the hook returns a ref and does not own the JSX
        it('should render its container with its inline style', () => {
            const wrapper = mount<DonutChartProps>(<Donut data={data} />);

            expect(wrapper.getDOMNode().style.textAlign).toEqual('center');
        });

        it('should use its own wrapper when no chart prop is given', () => {
            mount(<Donut data={data} />);

            expect(createSpy).toHaveBeenCalledTimes(1);
        });

        it('should not pass data, chart or createTooltip in the configuration', () => {
            mount(
                <Donut
                    chart={DonutWrapper}
                    data={data}
                    createTooltip={vi.fn()}
                    width={300}
                />
            );

            expect(createSpy.mock.calls[0][2]).toEqual({
                isAnimated: true,
                width: 300,
            });
        });

        it('should not create the chart while there is no data', () => {
            mount(<Donut data={null} />);

            expect(createSpy).not.toHaveBeenCalled();
        });

        it('should create the chart when the data arrives after mount', () => {
            const wrapper = mount<DonutChartProps>(<Donut data={null} />);

            wrapper.setProps({ data });

            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).not.toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('should pass the chart instance as the fourth argument', () => {
            const wrapper = mount<DonutChartProps>(<Donut data={data} />);
            const instance = createSpy.mock.results[0].value;

            wrapper.setProps({ width: 300 });

            expect(updateSpy.mock.calls[0][3]).toBe(instance);
        });

        // As for Line: a re-render with props that did not change is compared
        // with the last drawing and skipped
        it('should not redraw when a re-render brings props that did not change', () => {
            const wrapper = mount<DonutChartProps>(
                <Donut data={data} width={300} />
            );

            wrapper.setProps({ data, width: 300 });

            expect(updateSpy).not.toHaveBeenCalled();
        });

        it('should redraw when isAnimated is turned off', () => {
            const wrapper = mount<DonutChartProps>(<Donut data={data} />);

            wrapper.setProps({ isAnimated: false });

            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy.mock.calls[0][2]!.isAnimated).toBe(false);
        });
    });

    describe('unmount', () => {
        it('should destroy the chart once, with the node it was created in', () => {
            const wrapper = mount<DonutChartProps>(<Donut data={data} />);

            wrapper.unmount();

            expect(destroySpy).toHaveBeenCalledTimes(1);
            expect(destroySpy.mock.calls[0][0]).toBe(
                createSpy.mock.calls[0][0]
            );
        });
    });
});
