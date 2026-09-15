import React from 'react';
import { mount } from 'enzyme';

import ScatterPlot from './ScatterPlot';
import scatterPlotData from './scatterPlotChart.fixtures';
import { ScatterPlotWrapper } from '@britecharts/wrappers';

describe('scatterPlot Chart', () => {
    describe('render', () => {
        describe('when isLoading is true', () => {
            it('should render the loading state', () => {
                const wrapper = mount(
                    <ScatterPlot data={[]} isLoading={true} />
                );

                const expected = 1;
                const actual = wrapper
                    .render()
                    .find('.scatter-plot-load-state').length;

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

            it('should call the create method of the chart', () => {
                mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={scatterPlotData.withOneSource()}
                    />
                );

                const expected = 1;
                const actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method of the chart with the container as the first argument', () => {
                const wrapper = mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={scatterPlotData.withOneSource()}
                    />
                );

                const expected = wrapper
                    .find('.scatter-plot-container')
                    .instance();
                const actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method of the chart with the data as the second argument', () => {
                const dataSet = scatterPlotData.withOneSource();

                mount(
                    <ScatterPlot chart={ScatterPlotWrapper} data={dataSet} />
                );

                const expectedData = dataSet;
                const actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = scatterPlotData.withOneSource();
                const expected = 500;

                mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={dataSet}
                        width={expected}
                    />
                );

                const actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = scatterPlotData.withOneSource();
                const expected = 500;

                mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={dataSet}
                        height={expected}
                    />
                );

                const actual = createSpy.mock.calls[0][2].height;

                expect(actual).toEqual(expected);
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

            it('should not pass the data, chart or createTooltip props as configuration', () => {
                mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={scatterPlotData.withOneSource()}
                    />
                );

                const configuration = createSpy.mock.calls[0][2];

                expect(configuration.data).toBeUndefined();
                expect(configuration.chart).toBeUndefined();
                expect(configuration.createTooltip).toBeUndefined();
            });
        });
    });

    describe('update', () => {
        describe('when data changes', () => {
            let updateSpy;

            beforeEach(() => {
                updateSpy = jest.spyOn(ScatterPlotWrapper, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method of the chart', () => {
                const wrapper = mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={scatterPlotData.withOneSource()}
                    />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: scatterPlotData.withFourNames(),
                });

                const expected = 1;
                const actual = updateSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new data to the update method', () => {
                const wrapper = mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={scatterPlotData.withOneSource()}
                    />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: scatterPlotData.withFourNames(),
                });

                const expected = scatterPlotData.withFourNames().length;
                const actual = updateSpy.mock.calls[0][1].length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const wrapper = mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={scatterPlotData.withOneSource()}
                    />
                );
                const expected = 20;

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    width: expected,
                });

                const actual = updateSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should call createTooltip after the update', () => {
                const createTooltip = jest.fn();
                const wrapper = mount(
                    <ScatterPlot
                        chart={ScatterPlotWrapper}
                        data={scatterPlotData.withOneSource()}
                        createTooltip={createTooltip}
                    />
                );

                wrapper.setProps({
                    data: scatterPlotData.withFourNames(),
                });

                expect(createTooltip).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('unmount', () => {
        let destroySpy;

        beforeEach(() => {
            destroySpy = jest.spyOn(ScatterPlotWrapper, 'destroy');
        });

        afterEach(() => {
            destroySpy.mockReset();
            destroySpy.mockRestore();
        });

        it('should call the destroy method of the chart', () => {
            const wrapper = mount(
                <ScatterPlot
                    chart={ScatterPlotWrapper}
                    data={scatterPlotData.withOneSource()}
                />
            );

            wrapper.unmount();

            const expected = 1;
            const actual = destroySpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });
});
