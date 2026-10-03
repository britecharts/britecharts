import type { BarChartDataShape } from '@britecharts/core';

import barData from './barChart.fixtures';
import bar from './barChart';

// d3 stashes the bound datum on the node itself, which is how these tests read
// back what was drawn. Unlike bullet, bar binds the whole array.
type NodeWithDatum = HTMLElement & { __data__?: BarChartDataShape[] };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('bar Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        // Each of these passes something the types already reject, so the
        // ts-expect-error keeps the runtime guard covered and also fails the
        // build if the wrapper's typing ever loosens enough to accept it.
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        // @ts-expect-error el is required
                        bar.create(undefined, barData.withLetters(), {});
                    }).toThrow('A root container is required');
                });
            });
            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        bar.create(anchor, barData.withLetters(), {
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
                        bar.create(anchor, barData.withLetters(), {
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
                const expected = barData.withColors().length;

                bar.create(anchor, barData.withColors());

                const actual = datumOf(anchor)?.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = bar.create(anchor, barData.withColors(), {
                    width: expected,
                });

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

                const chart = bar.create(anchor, barData.withColors(), {
                    margin: expected,
                });

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {
        describe('when updating data', () => {
            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = barData.withColors();
                    const secondDataSet = [
                        {
                            name: 'Shining',
                            value: 5,
                        },
                    ];
                    const chart = bar.create(anchor, firstDataSet, {});

                    bar.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = datumOf(anchor)?.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = barData.withColors();
                    const chart = bar.create(anchor, dataSet, {});

                    bar.update(anchor, dataSet, {}, chart);

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
                    const chart = bar.create(anchor, barData.withColors(), {
                        width: firstWidth,
                    });

                    bar.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
