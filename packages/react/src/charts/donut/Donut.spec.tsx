import React from 'react';
import type { MockInstance } from 'vitest';
import { mount } from '../../../testing/mount';

import Donut from './Donut';
import donutData from './donutChart.fixtures';

import { DonutWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('donut Chart', () => {
    describeChartComponent({
        Component: Donut,
        wrapper: DonutWrapper,
        containerSelector: '.donut-container',
        data: donutData.with4Slices,
        nextData: () => donutData.with4Slices().slice(1),
        // Accepted so a Tooltip can hand it to any chart, and never called
        redrawsTooltip: false,
    });

    // The only behavioural default among the props: `isAnimated` reaches the
    // chart because Donut puts it back into the configuration, so a change
    // that destructures the rest of the props would silently stop animating
    // the donut. Pinned here so that shows up as one named failure.
    describe('animation', () => {
        let createSpy: MockInstance<typeof DonutWrapper.create>;

        beforeEach(() => {
            createSpy = vi.spyOn(DonutWrapper, 'create');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should be animated by default', () => {
            mount(
                <Donut chart={DonutWrapper} data={donutData.with4Slices()} />
            );

            expect(createSpy.mock.calls[0][2]!.isAnimated).toBe(true);
        });

        it('should let isAnimated be turned off', () => {
            mount(
                <Donut
                    chart={DonutWrapper}
                    data={donutData.with4Slices()}
                    isAnimated={false}
                />
            );

            expect(createSpy.mock.calls[0][2]!.isAnimated).toBe(false);
        });
    });

    describe('center legend', () => {
        let createSpy: MockInstance<typeof DonutWrapper.create>;

        beforeEach(() => {
            createSpy = vi.spyOn(DonutWrapper, 'create');
        });

        afterEach(() => {
            createSpy.mockRestore();
        });

        it('should let hasCenterLegend be turned off', () => {
            mount(
                <Donut
                    chart={DonutWrapper}
                    data={donutData.with4Slices()}
                    hasCenterLegend={false}
                />
            );

            expect(createSpy.mock.results[0].value.hasCenterLegend()).toBe(
                false
            );
        });
    });
});
