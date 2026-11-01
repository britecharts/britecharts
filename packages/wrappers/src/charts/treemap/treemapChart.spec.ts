import type { TreemapChartDataShape } from '@britecharts/core';

import treemapData from './treemapChart.fixtures';
import treemap from './treemapChart';

// d3 stashes the bound datum on the node itself, which is how these tests read
// back what was drawn. This wrapper binds the whole array.
type NodeWithDatum = HTMLElement & { __data__?: TreemapChartDataShape[] };

const datumOf = (el: HTMLElement) => (el as NodeWithDatum).__data__;

describe('treemap Chart', () => {
    let anchor: HTMLElement;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        treemap.create(
                            // @ts-expect-error el is required
                            undefined,
                            treemapData.withBudget(),
                            {}
                        );
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        treemap.create(anchor, treemapData.withBudget(), {
                            // @ts-expect-error not an accessor on the chart
                            test: 'test',
                        });
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when a misspelt accessor is passed', () => {
                it('should link the treemap API page', () => {
                    expect(() => {
                        treemap.create(anchor, treemapData.withBudget(), {
                            // @ts-expect-error not an accessor on the chart
                            heigth: 300,
                        });
                    }).toThrow(
                        'https://britecharts.github.io/britecharts/docs/API/treemap'
                    );
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw an error', () => {
                    const callback = vi.fn();

                    expect(() => {
                        treemap.create(anchor, treemapData.withBudget(), {
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
                const expected = treemapData.withUpdatedBudget().length;

                treemap.create(anchor, treemapData.withUpdatedBudget());

                const actual = datumOf(anchor)?.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = treemap.create(
                    anchor,
                    treemapData.withUpdatedBudget(),
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

                const chart = treemap.create(
                    anchor,
                    treemapData.withUpdatedBudget(),
                    {
                        margin: expected,
                    }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });

            it('should set the treemap options', () => {
                const chart = treemap.create(
                    anchor,
                    treemapData.withUpdatedBudget(),
                    {
                        enableLabels: false,
                        labelsNumberFormat: '$,',
                    }
                );

                expect(chart.enableLabels()).toEqual(false);
                expect(chart.labelsNumberFormat()).toEqual('$,');
            });

            it('should register the event handlers', () => {
                const callback = vi.fn();

                const chart = treemap.create(
                    anchor,
                    treemapData.withUpdatedBudget(),
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
                    const firstDataSet = treemapData.withUpdatedBudget();
                    const secondDataSet = [{ name: 'Rent', value: 4 }];
                    const chart = treemap.create(anchor, firstDataSet, {});

                    treemap.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = datumOf(anchor)?.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = treemapData.withUpdatedBudget();
                    const chart = treemap.create(anchor, dataSet, {});

                    treemap.update(anchor, null, {}, chart);

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
                    const chart = treemap.create(
                        anchor,
                        treemapData.withUpdatedBudget(),
                        {
                            width: firstWidth,
                        }
                    );

                    treemap.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
