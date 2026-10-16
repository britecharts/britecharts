import React from 'react';
import type { TooltipModule } from '@britecharts/core';
import type { TooltipWrapperShape } from '@britecharts/wrappers';
import { mount } from '../../../testing/mount';

import Tooltip from './Tooltip';
import type { TooltipProps } from './Tooltip';

// What Tooltip does with the wrapper it draws the tooltip through, over its
// life, beyond what the colocated Tooltip.spec.js pins.
const makeWrapper = () => {
    // A stand-in the tests only compare by identity, never call into
    const instance = {
        name: 'the tooltip instance',
    } as unknown as TooltipModule;

    return {
        instance,
        create: vi.fn<TooltipWrapperShape['create']>(() => instance),
        update: vi.fn<TooltipWrapperShape['update']>(() => instance),
        destroy: vi.fn<TooltipWrapperShape['destroy']>(),
    };
};

const renderChart = () => (
    <div className="metadata-group">
        <div className="vertical-marker-container" />
    </div>
);

describe('Tooltip lifecycle', () => {
    let wrapper: ReturnType<typeof makeWrapper>;

    beforeEach(() => {
        wrapper = makeWrapper();
    });

    describe('when the chart it wraps has no group to draw into yet', () => {
        it('should not create the tooltip', () => {
            mount(<Tooltip chart={wrapper} render={() => <div />} data={[]} />);

            expect(wrapper.create).not.toHaveBeenCalled();
        });

        it('should not update it either', () => {
            const mounted = mount<TooltipProps>(
                <Tooltip chart={wrapper} render={() => <div />} data={[]} />
            );

            mounted.setProps({ title: 'a title' });

            expect(wrapper.update).not.toHaveBeenCalled();
        });
    });

    describe('on update', () => {
        it('should pass the tooltip instance as the fourth argument', () => {
            const mounted = mount<TooltipProps>(
                <Tooltip chart={wrapper} render={renderChart} data={[]} />
            );

            mounted.setProps({ title: 'a title' });

            expect(wrapper.update.mock.calls[0][3]).toBe(wrapper.instance);
        });

        it('should update with the latest wrapper, not the first', () => {
            const latest = makeWrapper();
            const mounted = mount<TooltipProps>(
                <Tooltip chart={wrapper} render={renderChart} data={[]} />
            );

            mounted.setProps({ chart: latest });

            expect(latest.update).toHaveBeenCalledTimes(1);
            expect(wrapper.update).not.toHaveBeenCalled();
        });
    });

    describe('on unmount', () => {
        it('should destroy with the element that wraps the chart', () => {
            const mounted = mount<TooltipProps>(
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
            const mounted = mount<TooltipProps>(
                <Tooltip chart={wrapper} render={renderChart} data={[]} />
            );

            mounted.setProps({ chart: latest });
            mounted.unmount();

            expect(latest.destroy).toHaveBeenCalledTimes(1);
            expect(wrapper.destroy).not.toHaveBeenCalled();
        });
    });
});
