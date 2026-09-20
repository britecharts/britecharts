import React from 'react';
import { mount } from 'enzyme';

import Tooltip from './Tooltip';

// What Tooltip does with the wrapper it draws the tooltip through, over its
// life. The colocated Tooltip.spec.js is frozen for the hooks migration, so what
// the conversion adds lives here.
const makeWrapper = () => {
    const instance = { name: 'the tooltip instance' };

    return {
        instance,
        create: jest.fn(() => instance),
        update: jest.fn(() => instance),
        destroy: jest.fn(),
    };
};

const renderChart = () => (
    <div className="metadata-group">
        <div className="vertical-marker-container" />
    </div>
);

describe('Tooltip lifecycle', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = makeWrapper();
    });

    describe('when the chart it wraps has no group to draw into yet', () => {
        it('should not create the tooltip', () => {
            mount(<Tooltip chart={wrapper} render={() => <div />} data={[]} />);

            expect(wrapper.create).not.toHaveBeenCalled();
        });

        it('should not update it either', () => {
            const mounted = mount(
                <Tooltip chart={wrapper} render={() => <div />} data={[]} />
            );

            mounted.setProps({ title: 'a title' });

            expect(wrapper.update).not.toHaveBeenCalled();
        });
    });

    describe('on update', () => {
        it('should pass the tooltip instance as the fourth argument', () => {
            const mounted = mount(
                <Tooltip chart={wrapper} render={renderChart} data={[]} />
            );

            mounted.setProps({ title: 'a title' });

            expect(wrapper.update.mock.calls[0][3]).toBe(wrapper.instance);
        });

        it('should update with the latest wrapper, not the first', () => {
            const latest = makeWrapper();
            const mounted = mount(
                <Tooltip chart={wrapper} render={renderChart} data={[]} />
            );

            mounted.setProps({ chart: latest });

            expect(latest.update).toHaveBeenCalledTimes(1);
            expect(wrapper.update).not.toHaveBeenCalled();
        });
    });

    describe('on unmount', () => {
        it('should destroy with the element that wraps the chart', () => {
            const mounted = mount(
                <Tooltip chart={wrapper} render={renderChart} data={[]} />
            );
            const node = mounted.getDOMNode();

            mounted.unmount();

            expect(wrapper.destroy).toHaveBeenCalledTimes(1);
            expect(wrapper.destroy.mock.calls[0][0]).toBe(node);
            expect(node.className).toEqual('tooltip-chart-wrapper');
        });

        it('should destroy with the latest wrapper, not the first', () => {
            const latest = makeWrapper();
            const mounted = mount(
                <Tooltip chart={wrapper} render={renderChart} data={[]} />
            );

            mounted.setProps({ chart: latest });
            mounted.unmount();

            expect(latest.destroy).toHaveBeenCalledTimes(1);
            expect(wrapper.destroy).not.toHaveBeenCalled();
        });
    });
});
