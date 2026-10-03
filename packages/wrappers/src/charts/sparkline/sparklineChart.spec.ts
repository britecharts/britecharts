import type { SparklineChartDataShape } from '@britecharts/core';

import sparklineData from './sparklineChart.fixtures';
import sparkline from './sparklineChart';

// d3 stashes the bound datum on the node itself, which is how these tests read
// back what was drawn. This wrapper binds the whole array.
type NodeWithDatum = HTMLElement & { __data__?: SparklineChartDataShape[] };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('sparkline Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        sparkline.create(
                            // @ts-expect-error el is required
                            undefined,
                            sparklineData.with1Source(),
                            {}
                        );
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        sparkline.create(anchor, sparklineData.with1Source(), {
                            // @ts-expect-error not an accessor on the chart
                            test: 'test',
                        });
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw ane error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        sparkline.create(anchor, sparklineData.with1Source(), {
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
                const expected = sparklineData.with1Source().length;

                sparkline.create(anchor, sparklineData.with1Source());

                const actual = datumOf(anchor)?.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = sparkline.create(
                    anchor,
                    sparklineData.with1Source(),
                    { width: expected }
                );

                const actual = chart.width();

                expect(actual).toEqual(expected);
            });

            it('should set the height', () => {
                const expected = 600;

                const chart = sparkline.create(
                    anchor,
                    sparklineData.with1Source(),
                    { height: expected }
                );

                const actual = chart.height();

                expect(actual).toEqual(expected);
            });

            it('should set the margin', () => {
                const expected = {
                    top: 0,
                    bottom: 1,
                    left: 2,
                    right: 3,
                };

                const chart = sparkline.create(
                    anchor,
                    sparklineData.with1Source(),
                    { margin: expected }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {
        describe('when updating data', () => {
            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = sparklineData.with1Source();
                    const secondDataSet = sparklineData.withLowValues();
                    const chart = sparkline.create(anchor, firstDataSet, {});

                    sparkline.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = datumOf(anchor)?.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = sparklineData.with1Source();
                    const chart = sparkline.create(anchor, dataSet, {});

                    sparkline.update(anchor, [], {}, chart);

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
                    const chart = sparkline.create(
                        anchor,
                        sparklineData.with1Source(),
                        { width: firstWidth }
                    );

                    sparkline.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
