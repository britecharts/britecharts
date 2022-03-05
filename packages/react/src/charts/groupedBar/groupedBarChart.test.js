import groupedBarData from './groupedBarChart.fixtures';
import groupedBar from './groupedBarChart';

describe('grouped Bar Chart', () => {
    let anchor;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        groupedBar.create(
                            undefined,
                            groupedBarData.with3Groups(),
                            {}
                        );
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        groupedBar.create(
                            anchor,
                            groupedBarData.with3Groups(),
                            { test: 'test' }
                        );
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw ane error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        groupedBar.create(
                            anchor,
                            groupedBarData.with3Groups(),
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
                const expected = groupedBarData.with3Groups().length;

                groupedBar.create(anchor, groupedBarData.with3Groups());

                const actual = anchor.__data__.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = groupedBar.create(
                    anchor,
                    groupedBarData.with3Groups(),
                    { width: expected }
                );

                const actual = chart.width();

                expect(actual).toEqual(expected);
            });

            it('should set the height', () => {
                const expected = 600;

                const chart = groupedBar.create(
                    anchor,
                    groupedBarData.with3Groups(),
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

                const chart = groupedBar.create(
                    anchor,
                    groupedBarData.with3Groups(),
                    { margin: expected }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });

            it('should set the grid', () => {
                const expected = 'vertical';

                const chart = groupedBar.create(
                    anchor,
                    groupedBarData.with3Groups(),
                    { grid: expected }
                );

                const actual = chart.grid();

                expect(actual).toEqual(expected);
            });

            describe('when event handlers are passed', () => {
                it('should set customMouseOver callback', () => {
                    const expected = jest.fn();

                    const chart = groupedBar.create(
                        anchor,
                        groupedBarData.with3Groups(),
                        { customMouseOver: expected }
                    );

                    const actual = chart.on('customMouseOver');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseMove callback', () => {
                    const expected = jest.fn();

                    const chart = groupedBar.create(
                        anchor,
                        groupedBarData.with3Groups(),
                        { customMouseMove: expected }
                    );

                    const actual = chart.on('customMouseMove');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseOut callback', () => {
                    const expected = jest.fn();

                    const chart = groupedBar.create(
                        anchor,
                        groupedBarData.with3Groups(),
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
                    const firstDataSet = groupedBarData.with3Groups();
                    const secondDataSet = groupedBarData.with2Groups();
                    const chart = groupedBar.create(anchor, firstDataSet, {});

                    groupedBar.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = anchor.__data__.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = groupedBarData.with3Groups();
                    const chart = groupedBar.create(anchor, dataSet, {});

                    groupedBar.update(anchor, [], {}, chart);

                    const expected = dataSet.length;
                    const actual = anchor.__data__.length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when updating configuration', () => {
            describe('when new configuration is passed', () => {
                it('should update the configuration in the chart', () => {
                    const expected = 500;
                    const firstWidth = 200;
                    const chart = groupedBar.create(
                        anchor,
                        groupedBarData.with3Groups(),
                        { width: firstWidth }
                    );

                    groupedBar.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
