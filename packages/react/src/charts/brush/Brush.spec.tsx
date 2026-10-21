import React from 'react';
import type { MockInstance } from 'vitest';
import { mount } from '../../../testing/mount';

import Brush from './Brush';
import brushData from './brushChart.fixtures';
import { BrushWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('brush Chart', () => {
    describeChartComponent({
        Component: Brush,
        wrapper: BrushWrapper,
        containerSelector: '.brush-container',
        data: brushData.withShortData,
        nextData: brushData.withSimpleData,
    });

    describe('render', () => {
        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const wrapper = mount(<Brush data={[]} isLoading={true} />);

                const expected = 1;
                const actual = wrapper.findAll('.brush-load-state').length;

                expect(actual).toEqual(expected);
            });
        });

        describe('when data passed in', () => {
            let createSpy: MockInstance<typeof BrushWrapper.create>;

            beforeEach(() => {
                createSpy = vi.spyOn(BrushWrapper, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should pass the brush options to the chart', () => {
                const onBrushEnd = vi.fn();

                mount(
                    <Brush
                        chart={BrushWrapper}
                        data={brushData.withShortData()}
                        dateRange={[
                            '2011-01-06T00:00:00Z',
                            '2011-01-09T00:00:00Z',
                        ]}
                        isLocked={true}
                        customBrushEnd={onBrushEnd}
                    />
                );

                const configuration = createSpy.mock.calls[0][2]!;

                expect(configuration.dateRange).toEqual([
                    '2011-01-06T00:00:00Z',
                    '2011-01-09T00:00:00Z',
                ]);
                expect(configuration.isLocked).toEqual(true);
                expect(configuration.customBrushEnd).toBe(onBrushEnd);
            });
        });
    });
});
