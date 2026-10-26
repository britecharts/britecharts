import React from 'react';
import type { MockInstance } from 'vitest';
import { mount } from '../../../testing/mount';

import Heatmap from './Heatmap';
import heatmapData from './heatmapChart.fixtures';
import { HeatmapWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('heatmap Chart', () => {
    describeChartComponent({
        Component: Heatmap,
        wrapper: HeatmapWrapper,
        containerSelector: '.heatmap-container',
        data: heatmapData.withWeeklyData,
        nextData: heatmapData.withAlternativeWeeklyData,
    });

    describe('render', () => {
        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const wrapper = mount(<Heatmap data={[]} isLoading={true} />);

                const expected = 1;
                const actual = wrapper.findAll('.heatmap-load-state').length;

                expect(actual).toEqual(expected);
            });
        });

        describe('when data passed in', () => {
            let createSpy: MockInstance<typeof HeatmapWrapper.create>;

            beforeEach(() => {
                createSpy = vi.spyOn(HeatmapWrapper, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should pass the heatmap options to the chart', () => {
                const yAxisLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                const xAxisLabels = ['Morning', 'Evening'];

                mount(
                    <Heatmap
                        chart={HeatmapWrapper}
                        data={heatmapData.withWeeklyData()}
                        boxSize={20}
                        yAxisLabels={yAxisLabels}
                        xAxisLabels={xAxisLabels}
                    />
                );

                const configuration = createSpy.mock.calls[0][2]!;

                expect(configuration.boxSize).toEqual(20);
                expect(configuration.yAxisLabels).toEqual(yAxisLabels);
                expect(configuration.xAxisLabels).toEqual(xAxisLabels);
            });
        });
    });
});
