import type { ScatterPlotDataShape } from '@britecharts/core';

import scatterPlotData from './scatterPlotChart.fixtures';
import scatterPlot from './scatterPlotChart';

// d3 stashes the bound datum on the node itself, which is how these tests read
// back what was drawn. This wrapper binds the whole array.
type NodeWithDatum = HTMLElement & { __data__?: ScatterPlotDataShape[] };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('scatterPlot Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        scatterPlot.create(
                            // @ts-expect-error el is required
                            undefined,
                            scatterPlotData.withOneSource(),
                            {}
                        );
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        scatterPlot.create(
                            anchor,
                            scatterPlotData.withOneSource(),
                            {
                                // @ts-expect-error not an accessor on the chart
                                test: 'test',
                            }
                        );
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw an error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        scatterPlot.create(
                            anchor,
                            scatterPlotData.withOneSource(),
                            {
                                // @ts-expect-error not a britecharts custom event
                                customFakeEvent: callback,
                            }
                        );
                    }).toThrow(
                        'Method not supported by Britechart: customFakeEvent'
                    );
                });
            });
        });

        describe('when proper arguments are passed', () => {
            it('should set data as a DOM property', () => {
                const expected = scatterPlotData.withFourNames().length;

                scatterPlot.create(anchor, scatterPlotData.withFourNames());

                const actual = datumOf(anchor)?.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = scatterPlot.create(
                    anchor,
                    scatterPlotData.withFourNames(),
                    {
                        width: expected,
                    }
                );

                const actual = chart.width();

                expect(actual).toEqual(expected);
            });

            it('should set the margin', () => {
                const expected = {
                    top: 0,
                    bottom: 1,
                    left: 2,
                    right: 3,
                };

                const chart = scatterPlot.create(
                    anchor,
                    scatterPlotData.withFourNames(),
                    {
                        margin: expected,
                    }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });

            it('should set the scatter plot options', () => {
                const chart = scatterPlot.create(
                    anchor,
                    scatterPlotData.withFourNames(),
                    {
                        hasTrendline: true,
                        hasCrossHairs: true,
                        maxCircleArea: 15,
                    }
                );

                expect(chart.hasTrendline()).toEqual(true);
                expect(chart.hasCrossHairs()).toEqual(true);
                expect(chart.maxCircleArea()).toEqual(15);
            });

            it('should register the event handlers', () => {
                const callback = jest.fn();

                const chart = scatterPlot.create(
                    anchor,
                    scatterPlotData.withFourNames(),
                    {
                        customMouseMove: callback,
                    }
                );

                expect(chart.on('customMouseMove')).toBe(callback);
            });
        });
    });

    describe('update', () => {
        describe('when updating data', () => {
            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = scatterPlotData.withFourNames();
                    const secondDataSet = [
                        {
                            name: 'radiating',
                            x: 5,
                            y: 10,
                        },
                    ];
                    const chart = scatterPlot.create(anchor, firstDataSet, {});

                    scatterPlot.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = datumOf(anchor)?.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = scatterPlotData.withFourNames();
                    const chart = scatterPlot.create(anchor, dataSet, {});

                    scatterPlot.update(anchor, null, {}, chart);

                    const expected = dataSet.length;
                    const actual = datumOf(anchor)?.length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when updating configuration', () => {
            describe('when new configuration is passed', () => {
                it('should update the configuration in the chart', () => {
                    const expected = 500;
                    const firstWidth = 200;
                    const chart = scatterPlot.create(
                        anchor,
                        scatterPlotData.withFourNames(),
                        {
                            width: firstWidth,
                        }
                    );

                    scatterPlot.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
