import lineData from './lineChart.fixtures';
import line from './lineChart';

describe('Line Chart', () => {
    let anchor;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        let chartData;

        beforeEach(() => {
            chartData = lineData.flatData.a;
        });

        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        line.create(undefined, chartData, {});
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        line.create(anchor, chartData, { test: 'test' });
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw an error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        line.create(anchor, chartData, {
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

                const actual = anchor.__data__;

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
                    const actual = anchor.__data__;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = lineData.flatData.a;
                    const chart = line.create(anchor, dataSet, {});

                    line.update(anchor, dataSet, {}, chart);

                    const expected = dataSet;
                    const actual = anchor.__data__;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when updating data - dataByTopic structure', () => {
            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = lineData.dataByTopic.a;
                    const secondDataSet = lineData.dataByTopic.b;
                    const chart = line.create(anchor, firstDataSet, {});

                    line.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = anchor.__data__.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = lineData.dataByTopic.a;
                    const chart = line.create(anchor, dataSet, {});

                    line.update(anchor, dataSet, {}, chart);

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
                    const chart = line.create(anchor, lineData.flatData.a, {
                        width: firstWidth,
                    });

                    line.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
