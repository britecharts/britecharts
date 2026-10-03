import type { LineChartData } from '@britecharts/core';

import lineData from './lineChart.fixtures';
import line from './lineChart';

// d3 stashes the bound datum on the node itself, which is how these tests read
// back what was drawn. line binds its data object whole, not an array, so this
// is the object rather than a list.
type NodeWithDatum = HTMLElement & { __data__?: LineChartData };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('line Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        let chartData: LineChartData;

        beforeEach(() => {
            chartData = lineData.flatData.a;
        });

        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        // @ts-expect-error el is required
                        line.create(undefined, chartData, {});
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        // @ts-expect-error not an accessor on the chart
                        line.create(anchor, chartData, { test: 'test' });
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw an error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        line.create(anchor, chartData, {
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
                line.create(anchor, chartData);

                const actual = datumOf(anchor);

                expect(actual).toEqual(chartData);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = line.create(anchor, chartData, {
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

                const chart = line.create(anchor, chartData, {
                    margin: expected,
                });

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {
        describe('when updating data - flat data structure', () => {
            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = lineData.flatData.a;
                    const secondDataSet = lineData.flatData.b;
                    const chart = line.create(anchor, firstDataSet, {});

                    line.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet;
                    const actual = datumOf(anchor);

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = lineData.flatData.a;
                    const chart = line.create(anchor, dataSet, {});

                    line.update(anchor, dataSet, {}, chart);

                    const expected = dataSet;
                    const actual = datumOf(anchor);

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when updating configuration', () => {
            describe('when new configuration is passed', () => {
                it('should update the configuration in the chart', () => {
                    const expected = 500;
                    const firstWidth = 200;
                    const chart = line.create(anchor, lineData.flatData.a, {
                        width: firstWidth,
                    });

                    // This passes `[]` where line's data is an object, copied
                    // from the other wrappers' specs where the data really is
                    // an array. It happens not to matter: `[].data` is
                    // undefined, so the guard takes the same branch it would
                    // for `undefined` and the datum is left alone. Kept
                    // exactly as it was rather than quietly corrected, since a
                    // conversion should not change what a test feeds in.
                    // @ts-expect-error line takes a LineChartData object
                    line.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
