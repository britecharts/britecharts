import type { StackedAreaChartDataShape } from '@britecharts/core';

import stackedAreaData from './stackedAreaChart.fixtures';
import stackedArea from './stackedAreaChart';

// d3 stashes the bound datum on the node itself, which is how these tests read
// back what was drawn. This wrapper binds the whole array.
type NodeWithDatum = HTMLElement & { __data__?: StackedAreaChartDataShape[] };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('stacked Area Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        stackedArea.create(
                            // @ts-expect-error el is required
                            undefined,
                            stackedAreaData.with3Sources(),
                            {}
                        );
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        stackedArea.create(
                            anchor,
                            stackedAreaData.with3Sources(),
                            // @ts-expect-error not an accessor on the chart
                            { test: 'test' }
                        );
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw ane error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        stackedArea.create(
                            anchor,
                            stackedAreaData.with3Sources(),
                            // @ts-expect-error not a britecharts custom event
                            { customFakeEvent: callback }
                        );
                    }).toThrow(
                        'Method not supported by Britechart: customFakeEvent'
                    );
                });
            });
        });

        describe('when proper arguments are passed', () => {
            it('should set data as a DOM property', () => {
                const expected = stackedAreaData.with3Sources().length;

                stackedArea.create(anchor, stackedAreaData.with3Sources());

                const actual = datumOf(anchor)?.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = stackedArea.create(
                    anchor,
                    stackedAreaData.with3Sources(),
                    { width: expected }
                );

                const actual = chart.width();

                expect(actual).toEqual(expected);
            });

            it('should set the height', () => {
                const expected = 600;

                const chart = stackedArea.create(
                    anchor,
                    stackedAreaData.with3Sources(),
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

                const chart = stackedArea.create(
                    anchor,
                    stackedAreaData.with3Sources(),
                    { margin: expected }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });

            it('should set the grid', () => {
                const expected = 'vertical';

                const chart = stackedArea.create(
                    anchor,
                    stackedAreaData.with3Sources(),
                    { grid: expected }
                );

                const actual = chart.grid();

                expect(actual).toEqual(expected);
            });

            describe('when event handlers are passed', () => {
                it('should set customMouseOver callback', () => {
                    const expected = jest.fn();

                    const chart = stackedArea.create(
                        anchor,
                        stackedAreaData.with3Sources(),
                        { customMouseOver: expected }
                    );

                    const actual = chart.on('customMouseOver');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseMove callback', () => {
                    const expected = jest.fn();

                    const chart = stackedArea.create(
                        anchor,
                        stackedAreaData.with3Sources(),
                        { customMouseMove: expected }
                    );

                    const actual = chart.on('customMouseMove');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseOut callback', () => {
                    const expected = jest.fn();

                    const chart = stackedArea.create(
                        anchor,
                        stackedAreaData.with3Sources(),
                        { customMouseOut: expected }
                    );

                    const actual = chart.on('customMouseOut');

                    expect(actual).toEqual(expected);
                });
            });
        });
    });

    describe('update', () => {
        describe('when updating data', () => {
            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = stackedAreaData.with3Sources();
                    const secondDataSet = stackedAreaData.with2Sources();
                    const chart = stackedArea.create(anchor, firstDataSet, {});

                    stackedArea.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = datumOf(anchor)?.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = stackedAreaData.with3Sources();
                    const chart = stackedArea.create(anchor, dataSet, {});

                    stackedArea.update(anchor, [], {}, chart);

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
                    const chart = stackedArea.create(
                        anchor,
                        stackedAreaData.with3Sources(),
                        { width: firstWidth }
                    );

                    stackedArea.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
