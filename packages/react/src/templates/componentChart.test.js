import {{camelCase componentName}}Data from './{{camelCase componentName}}Chart.fixtures';
import {{camelCase componentName}} from './{{camelCase componentName}}Chart';

describe('{{titleCase componentName}} Chart', () => {
    let anchor;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {

        describe('when incorrect arguments are used', () => {

            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                      {{camelCase componentName}}.create(
                            undefined,
                            {{camelCase componentName}}Data.firstDataMethod(),
                            {}
                        );
                    }).toThrowError('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        {{camelCase componentName}}.create(
                            anchor,
                            {{camelCase componentName}}Data.firstDataMethod(),
                            { test: 'test' }
                        );
                    }).toThrowError('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw ane error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        {{camelCase componentName}}.create(
                            anchor,
                            {{camelCase componentName}}Data.firstDataMethod(),
                            { customFakeEvent: callback }
                        );
                    }).toThrowError('Method not supported by Britechart: customFakeEvent');
                });
            });
        });

        describe('when proper arguments are passed', () => {

            it('should set data as a DOM property', () => {
                const expected = {{camelCase componentName}}Data.firstDataMethod().length;

                {{camelCase componentName}}.create(anchor, {{camelCase componentName}}Data.firstDataMethod());

                const actual = anchor.__data__.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = {{camelCase componentName}}.create(
                    anchor,
                    {{camelCase componentName}}Data.firstDataMethod(),
                    { width: expected }
                );

                const actual = chart.width();

                expect(actual).toEqual(expected);
            });

            it('should set the height', () => {
                const expected = 600;

                const chart = {{camelCase componentName}}.create(
                    anchor,
                    {{camelCase componentName}}Data.firstDataMethod(),
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

                const chart = {{camelCase componentName}}.create(
                    anchor,
                    {{camelCase componentName}}Data.firstDataMethod(),
                    { margin: expected }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });

            /**
             * The grid is not supported by every chart, and this test should only be included if necessary
             */
            it('should set the grid', () => {
                const expected = 'vertical';

                const chart = {{camelCase componentName}}.create(
                    anchor,
                    {{camelCase componentName}}Data.firstDataMethod(),
                    { grid: expected }
                );

                const actual = chart.grid();

                expect(actual).toEqual(expected);
            });

            describe('when event handlers are passed', () => {

                it('should set customMouseOver callback', () => {
                    const expected = jest.fn();

                    const chart = {{camelCase componentName}}.create(
                        anchor,
                        {{camelCase componentName}}Data.firstDataMethod(),
                        { customMouseOver: expected }
                    );

                    const actual = chart.on('customMouseOver');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseMove callback', () => {
                    const expected = jest.fn();

                    const chart = {{camelCase componentName}}.create(
                        anchor,
                        {{camelCase componentName}}Data.firstDataMethod(),
                        { customMouseMove: expected }
                    );

                    const actual = chart.on('customMouseMove');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseOut callback', () => {
                    const expected = jest.fn();

                    const chart = {{camelCase componentName}}.create(
                        anchor,
                        {{camelCase componentName}}Data.firstDataMethod(),
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
                    const firstDataSet = {{camelCase componentName}}Data.firstDataMethod();
                    const secondDataSet = {{camelCase componentName}}Data.secondDataMethod();
                    let chart = {{camelCase componentName}}.create(anchor, firstDataSet, {});

                    {{camelCase componentName}}.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = anchor.__data__.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = {{camelCase componentName}}Data.firstDataMethod();
                    let chart = {{camelCase componentName}}.create(anchor, dataSet, {});

                    {{camelCase componentName}}.update(anchor, [], {}, chart);

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
                    const chart = {{camelCase componentName}}.create(
                        anchor,
                        {{camelCase componentName}}Data.firstDataMethod(),
                        { width: firstWidth }
                    );

                    {{camelCase componentName}}.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
