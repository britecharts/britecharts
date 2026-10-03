import type { BulletChartDataShape } from '@britecharts/core';

import bulletData from './bulletChart.fixtures';
import bullet from './bulletChart';

// d3 stashes the bound datum on the node itself. That is how these tests read
// back what was drawn, and it is not part of the DOM lib's typings.
type NodeWithDatum = HTMLElement & { __data__?: BulletChartDataShape };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('bullet Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        // Each of these passes something the types already reject, so the
        // ts-expect-error is doing double duty: it keeps the runtime guard
        // covered, and it fails the build if the wrapper's own typing ever
        // loosens to the point of accepting these.
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        // @ts-expect-error el is required
                        bullet.create(undefined, bulletData.fullTestData(), {});
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        bullet.create(anchor, bulletData.fullTestData(), {
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
                        bullet.create(anchor, bulletData.fullTestData(), {
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
                const expected = bulletData.fullTestData()[0];

                bullet.create(anchor, bulletData.fullTestData());

                const actual = datumOf(anchor);

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = bullet.create(anchor, bulletData.fullTestData(), {
                    width: expected,
                });

                const actual = chart.width();

                expect(actual).toEqual(expected);
            });

            it('should set the height', () => {
                const expected = 600;

                const chart = bullet.create(anchor, bulletData.fullTestData(), {
                    height: expected,
                });

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

                const chart = bullet.create(anchor, bulletData.fullTestData(), {
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
                    const firstDataSet = bulletData.fullTestData();
                    const secondDataSet = bulletData.partialTestData();

                    const chart = bullet.create(anchor, firstDataSet, {});

                    bullet.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet[0];
                    const actual = datumOf(anchor);

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = bulletData.fullTestData();

                    const chart = bullet.create(anchor, dataSet, {});

                    bullet.update(anchor, [], {}, chart);

                    const expected = dataSet[0];
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
                    const chart = bullet.create(
                        anchor,
                        bulletData.fullTestData(),
                        { width: firstWidth }
                    );

                    bullet.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
