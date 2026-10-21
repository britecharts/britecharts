import type { HeatmapChartDataShape } from '@britecharts/core';

import heatmapData from './heatmapChart.fixtures';
import heatmap from './heatmapChart';

// d3 stashes the bound datum on the node itself, which is how these tests read
// back what was drawn. This wrapper binds the whole array.
type NodeWithDatum = HTMLElement & { __data__?: HeatmapChartDataShape[] };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('heatmap Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        heatmap.create(
                            // @ts-expect-error el is required
                            undefined,
                            heatmapData.withTwoDays(),
                            {}
                        );
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        heatmap.create(anchor, heatmapData.withTwoDays(), {
                            // @ts-expect-error not an accessor on the chart
                            test: 'test',
                        });
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when a misspelt accessor is passed', () => {
                it('should link the heatmap API page', () => {
                    expect(() => {
                        heatmap.create(anchor, heatmapData.withTwoDays(), {
                            // @ts-expect-error not an accessor on the chart
                            heigth: 300,
                        });
                    }).toThrow(
                        'https://britecharts.github.io/britecharts/docs/API/heatmap'
                    );
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw an error', () => {
                    const callback = vi.fn();

                    expect(() => {
                        heatmap.create(anchor, heatmapData.withTwoDays(), {
                            // @ts-expect-error not a britecharts custom event
                            customFakeEvent: callback,
                        });
                    }).toThrow(
                        'Method not supported by Britechart: customFakeEvent'
                    );
                });
            });
        });

        describe('when proper arguments are passed', () => {
            it('should set data as a DOM property', () => {
                const expected = heatmapData.withTwoOtherDays().length;

                heatmap.create(anchor, heatmapData.withTwoOtherDays());

                const actual = datumOf(anchor)?.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = heatmap.create(
                    anchor,
                    heatmapData.withTwoOtherDays(),
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

                const chart = heatmap.create(
                    anchor,
                    heatmapData.withTwoOtherDays(),
                    {
                        margin: expected,
                    }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });

            it('should set the heatmap options', () => {
                const yAxisLabels = ['Sun', 'Mon'];
                const chart = heatmap.create(
                    anchor,
                    heatmapData.withTwoDays(),
                    {
                        boxSize: 20,
                        yAxisLabels,
                    }
                );

                expect(chart.boxSize()).toEqual(20);
                expect(chart.yAxisLabels()).toEqual(yAxisLabels);
            });

            it('should register the event handlers', () => {
                const callback = vi.fn();

                const chart = heatmap.create(
                    anchor,
                    heatmapData.withTwoOtherDays(),
                    {
                        customMouseOver: callback,
                    }
                );

                expect(chart.on('customMouseOver')).toBe(callback);
            });
        });
    });

    describe('update', () => {
        describe('when updating data', () => {
            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = heatmapData.withTwoOtherDays();
                    const secondDataSet = [{ day: 0, hour: 0, value: 4 }];
                    const chart = heatmap.create(anchor, firstDataSet, {});

                    heatmap.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = datumOf(anchor)?.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = heatmapData.withTwoOtherDays();
                    const chart = heatmap.create(anchor, dataSet, {});

                    heatmap.update(anchor, null, {}, chart);

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
                    const chart = heatmap.create(
                        anchor,
                        heatmapData.withTwoOtherDays(),
                        {
                            width: firstWidth,
                        }
                    );

                    heatmap.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
