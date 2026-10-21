import type { BrushChartDataShape } from '@britecharts/core';

import brushData from './brushChart.fixtures';
import brush from './brushChart';

// d3 stashes the bound datum on the node itself, which is how these tests read
// back what was drawn. This wrapper binds the whole array.
type NodeWithDatum = HTMLElement & { __data__?: BrushChartDataShape[] };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('brush Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        brush.create(
                            // @ts-expect-error el is required
                            undefined,
                            brushData.withShortData(),
                            {}
                        );
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        brush.create(anchor, brushData.withShortData(), {
                            // @ts-expect-error not an accessor on the chart
                            test: 'test',
                        });
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw an error', () => {
                    const callback = vi.fn();

                    expect(() => {
                        brush.create(anchor, brushData.withShortData(), {
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
                const expected = brushData.withMissingData().length;

                brush.create(anchor, brushData.withMissingData());

                const actual = datumOf(anchor)?.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = brush.create(
                    anchor,
                    brushData.withMissingData(),
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

                const chart = brush.create(
                    anchor,
                    brushData.withMissingData(),
                    {
                        margin: expected,
                    }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });

            it('should set the brush options', () => {
                const chart = brush.create(anchor, brushData.withShortData(), {
                    areaCurve: 'step',
                    dateRange: ['2011-01-06T00:00:00Z', '2011-01-09T00:00:00Z'],
                    isLocked: true,
                });

                expect(chart.areaCurve()).toEqual('step');
                expect(chart.dateRange()).toEqual([
                    '2011-01-06T00:00:00Z',
                    '2011-01-09T00:00:00Z',
                ]);
                expect(chart.isLocked()).toEqual(true);
            });

            it('should register the event handlers', () => {
                const callback = vi.fn();

                const chart = brush.create(
                    anchor,
                    brushData.withMissingData(),
                    {
                        customBrushEnd: callback,
                    }
                );

                expect(chart.on('customBrushEnd')).toBe(callback);
            });
        });
    });

    describe('update', () => {
        describe('when updating data', () => {
            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = brushData.withMissingData();
                    const secondDataSet = [
                        { value: 4, date: '2011-01-05T00:00:00Z' },
                    ];
                    const chart = brush.create(anchor, firstDataSet, {});

                    brush.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = datumOf(anchor)?.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = brushData.withMissingData();
                    const chart = brush.create(anchor, dataSet, {});

                    brush.update(anchor, null, {}, chart);

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
                    const chart = brush.create(
                        anchor,
                        brushData.withMissingData(),
                        {
                            width: firstWidth,
                        }
                    );

                    brush.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
