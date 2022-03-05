import React from 'react';
import { mount } from 'enzyme';

import Step from './Step';
import stepData from './stepChart.fixtures';

import step from './stepChart';

describe('step Chart', () => {
    describe('render', () => {
        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(step, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method or the chart', () => {
                const dataSet = stepData.firstDataMethod();

                mount(<Step chart={step} data={dataSet} />);

                const expected = 1;
                const actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the container as the first argument', () => {
                const dataSet = stepData.firstDataMethod();

                const wrapper = mount(<Step chart={step} data={dataSet} />);

                const expected = wrapper.find('.step-container').instance();
                const actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the configuration object as the second argument', () => {
                const dataSet = stepData.firstDataMethod();

                mount(<Step chart={step} data={dataSet} />);

                const expectedData = dataSet;
                const actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = stepData.firstDataMethod();
                const expected = 500;

                mount(<Step chart={step} data={dataSet} width={expected} />);

                const actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = stepData.firstDataMethod();
                const expected = 500;

                mount(<Step chart={step} data={dataSet} height={expected} />);

                const actual = createSpy.mock.calls[0][2].height;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {
        describe('when data changes', () => {
            let updateSpy;

            beforeEach(() => {
                updateSpy = jest.spyOn(step, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method or the chart', () => {
                const dataSet = stepData.firstDataMethod();
                const wrapper = mount(<Step chart={step} data={dataSet} />);

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: stepData.secondDataMethod(),
                });

                const expected = 1;
                const actual = updateSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new data to the update method', () => {
                const dataSet = stepData.firstDataMethod();
                const wrapper = mount(<Step chart={step} data={dataSet} />);

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: stepData.secondDataMethod(),
                });

                const expected = stepData.secondDataMethod().length;
                const actual = updateSpy.mock.calls[0][1].length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const dataSet = stepData.firstDataMethod();
                const wrapper = mount(<Step chart={step} data={dataSet} />);
                const expected = 20;

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    width: expected,
                });

                const actual = updateSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('unmount', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(step, 'destroy');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const dataSet = stepData.firstDataMethod();
            const wrapper = mount(<Step chart={step} data={dataSet} />);

            wrapper.unmount();

            const expected = 1;
            const actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });
});
