import React from 'react';
import { mount } from '../../../testing/mount';

import ScatterPlot from './ScatterPlot';
import scatterPlotData from './scatterPlotChart.fixtures';
import { ScatterPlotWrapper } from '@britecharts/wrappers';
import describeChartComponent from '../../../testing/chartComponentContract';

describe('scatterPlot Chart', () => {
    describeChartComponent({
        Component: ScatterPlot,
        wrapper: ScatterPlotWrapper,
        containerSelector: '.scatter-plot-container',
        data: scatterPlotData.withOneSource,
        nextData: scatterPlotData.withFourNames,
    });

    describe('render', () => {
        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const wrapper = mount(
                    <ScatterPlot data={[]} isLoading={true} />
                );

                const expected = 1;
                const actual = wrapper.findAll(
                    '.scatter-plot-load-state'
                ).length;

                expect(actual).toEqual(expected);
            });
        });

        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(ScatterPlotWrapper, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should pass the scatter plot options to the chart', () => {
                const dataSet = scatterPlotData.withFourNames();

                mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={dataSet}
                        hasTrendline={true}
                        hasCrossHairs={true}
                        maxCircleArea={15}
                    />
                );

                const configuration = createSpy.mock.calls[0][2];

                expect(configuration.hasTrendline).toEqual(true);
                expect(configuration.hasCrossHairs).toEqual(true);
                expect(configuration.maxCircleArea).toEqual(15);
            });
        });
    });
});
