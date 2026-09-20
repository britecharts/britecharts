import React from 'react';
import { mount } from 'enzyme';

import Donut from './Donut';
import donutData from './donutChart.fixtures';
import { DonutWrapper } from '@britecharts/wrappers';

// What Donut does that the colocated Donut.spec.js does not pin. That spec is
// frozen for the hooks migration, so what the conversion adds lives here.
describe('Donut lifecycle', () => {
    let data;
    let createSpy;
    let updateSpy;
    let destroySpy;

    beforeEach(() => {
        data = donutData.with4Slices();
        createSpy = jest.spyOn(DonutWrapper, 'create');
        updateSpy = jest.spyOn(DonutWrapper, 'update');
        destroySpy = jest.spyOn(DonutWrapper, 'destroy');
    });

    afterEach(() => {
        [createSpy, updateSpy, destroySpy].forEach((spy) => {
            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('render', () => {
        it('should render its container', () => {
            const wrapper = mount(<Donut data={data} />);

            expect(wrapper.getDOMNode().className).toEqual('donut-container');
        });

        // The container centres the chart; it is the one element with an inline
        // style, which is why the hook returns a ref and does not own the JSX
        it('should render its container with its inline style', () => {
            const wrapper = mount(<Donut data={data} />);

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
                    createTooltip={jest.fn()}
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
            const wrapper = mount(<Donut data={null} />);

            wrapper.setProps({ data });

            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).not.toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('should pass the chart instance as the fourth argument', () => {
            const wrapper = mount(<Donut data={data} />);
            const instance = createSpy.mock.results[0].value;

            wrapper.setProps({ width: 300 });

            expect(updateSpy.mock.calls[0][3]).toBe(instance);
        });

        // Decision 04, as for Line: a re-render with props that did not
        // change is compared with the last drawing and skipped
        it('should not redraw when a re-render brings props that did not change', () => {
            const wrapper = mount(<Donut data={data} width={300} />);

            wrapper.setProps({ data, width: 300 });

            expect(updateSpy).not.toHaveBeenCalled();
        });

        it('should redraw when isAnimated is turned off', () => {
            const wrapper = mount(<Donut data={data} />);

            wrapper.setProps({ isAnimated: false });

            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy.mock.calls[0][2].isAnimated).toBe(false);
        });
    });

    describe('unmount', () => {
        it('should destroy the chart once, with the node it was created in', () => {
            const wrapper = mount(<Donut data={data} />);

            wrapper.unmount();

            expect(destroySpy).toHaveBeenCalledTimes(1);
            expect(destroySpy.mock.calls[0][0]).toBe(
                createSpy.mock.calls[0][0]
            );
        });
    });
});
