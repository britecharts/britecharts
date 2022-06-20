import stepData from './stepChart.fixtures';
import step from './stepChart';

describe('step Chart', () => {
    let anchor;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {
        describe('when incorrect arguments are used', () => {
            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        step.create(undefined, stepData.firstDataMethod(), {});
                    }).toThrow('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        step.create(anchor, stepData.firstDataMethod(), {
                            test: 'test',
                        });
                    }).toThrow('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw ane error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        step.create(anchor, stepData.firstDataMethod(), {
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
                const expected = stepData.firstDataMethod().length;

                step.create(anchor, stepData.firstDataMethod());

                const actual = anchor.__data__.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = step.create(anchor, stepData.firstDataMethod(), {
                    width: expected,
                });

                const actual = chart.width();

                expect(actual).toEqual(expected);
            });

            it('should set the height', () => {
                const expected = 600;

                const chart = step.create(anchor, stepData.firstDataMethod(), {
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

                const chart = step.create(anchor, stepData.firstDataMethod(), {
                    margin: expected,
                });

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });

            describe('when event handlers are passed', () => {
                it('should set customMouseOver callback', () => {
                    const expected = jest.fn();

                    const chart = step.create(
                        anchor,
                        stepData.firstDataMethod(),
                        { customMouseOver: expected }
                    );

                    const actual = chart.on('customMouseOver');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseMove callback', () => {
                    const expected = jest.fn();

                    const chart = step.create(
                        anchor,
                        stepData.firstDataMethod(),
                        { customMouseMove: expected }
                    );

                    const actual = chart.on('customMouseMove');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseOut callback', () => {
                    const expected = jest.fn();

                    const chart = step.create(
                        anchor,
                        stepData.firstDataMethod(),
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
                    const firstDataSet = stepData.firstDataMethod();
                    const secondDataSet = stepData.secondDataMethod();
                    const chart = step.create(anchor, firstDataSet, {});

                    step.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = anchor.__data__.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = stepData.firstDataMethod();
                    const chart = step.create(anchor, dataSet, {});

                    step.update(anchor, [], {}, chart);

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
                    const chart = step.create(
                        anchor,
                        stepData.firstDataMethod(),
                        { width: firstWidth }
                    );

                    step.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
