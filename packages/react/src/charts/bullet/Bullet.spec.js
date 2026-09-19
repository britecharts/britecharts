import React from 'react';
import { mount } from 'enzyme';

import Bullet from './Bullet';
import bulletData from './bulletChart.fixtures';
import { BulletWrapper } from '@britecharts/wrappers';

describe('bullet Chart', () => {
    describe('render', () => {
        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(BulletWrapper, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method of the chart', () => {
                mount(
                    <Bullet
                        chart={BulletWrapper}
                        data={bulletData.fullTestData()}
                    />
                );

                expect(createSpy).toHaveBeenCalledTimes(1);
            });

            it('should call the create method of the chart with the container as the first argument', () => {
                const wrapper = mount(
                    <Bullet
                        chart={BulletWrapper}
                        data={bulletData.fullTestData()}
                    />
                );

                const expected = wrapper.find('.bullet-container').getDOMNode();
                const actual = createSpy.mock.calls[0][0];

                expect(actual).toBe(expected);
            });

            it('should call the create method of the chart with the data as the second argument', () => {
                const dataSet = bulletData.fullTestData();

                mount(<Bullet chart={BulletWrapper} data={dataSet} />);

                expect(createSpy.mock.calls[0][1]).toEqual(dataSet);
            });

            it('should allow setting width', () => {
                const expected = 500;

                mount(
                    <Bullet
                        chart={BulletWrapper}
                        data={bulletData.fullTestData()}
                        width={expected}
                    />
                );

                expect(createSpy.mock.calls[0][2].width).toEqual(expected);
            });

            it('should allow setting height', () => {
                const expected = 100;

                mount(
                    <Bullet
                        chart={BulletWrapper}
                        data={bulletData.fullTestData()}
                        height={expected}
                    />
                );

                expect(createSpy.mock.calls[0][2].height).toEqual(expected);
            });

            it('should not pass the component-only props to the wrapper', () => {
                mount(
                    <Bullet
                        chart={BulletWrapper}
                        data={bulletData.fullTestData()}
                        createTooltip={jest.fn()}
                    />
                );

                const configuration = createSpy.mock.calls[0][2];

                expect(configuration).not.toHaveProperty('createTooltip');
                expect(configuration).not.toHaveProperty('chart');
                expect(configuration).not.toHaveProperty('data');
            });

            it('should draw the chart', () => {
                const wrapper = mount(
                    <Bullet
                        chart={BulletWrapper}
                        data={bulletData.fullTestData()}
                    />
                );

                expect(
                    wrapper.getDOMNode().querySelectorAll('svg')
                ).toHaveLength(1);
            });
        });

        describe('when there is no data yet', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(BulletWrapper, 'create');
            });

            afterEach(() => {
                createSpy.mockRestore();
            });

            it('should not call the create method of the chart', () => {
                mount(<Bullet chart={BulletWrapper} data={null} />);

                expect(createSpy).not.toHaveBeenCalled();
            });

            it('should create the chart when the data arrives', () => {
                const wrapper = mount(
                    <Bullet chart={BulletWrapper} data={null} />
                );

                wrapper.setProps({ data: bulletData.fullTestData() });

                expect(createSpy).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('update', () => {
        let updateSpy;
        let createTooltip;

        beforeEach(() => {
            updateSpy = jest.spyOn(BulletWrapper, 'update');
            createTooltip = jest.fn();
        });

        afterEach(() => {
            updateSpy.mockReset();
            updateSpy.mockRestore();
        });

        it('should call the update method of the chart', () => {
            const wrapper = mount(
                <Bullet
                    chart={BulletWrapper}
                    data={bulletData.fullTestData()}
                />
            );

            wrapper.setProps({ data: bulletData.partialTestData() });

            expect(updateSpy).toHaveBeenCalledTimes(1);
        });

        it('should pass in the new data to the update method', () => {
            const wrapper = mount(
                <Bullet
                    chart={BulletWrapper}
                    data={bulletData.fullTestData()}
                />
            );

            wrapper.setProps({ data: bulletData.partialTestData() });

            expect(updateSpy.mock.calls[0][1]).toEqual(
                bulletData.partialTestData()
            );
        });

        it('should pass in the new configuration to the update method', () => {
            const wrapper = mount(
                <Bullet
                    chart={BulletWrapper}
                    data={bulletData.fullTestData()}
                />
            );
            const expected = 20;

            wrapper.setProps({ width: expected });

            expect(updateSpy.mock.calls[0][2].width).toEqual(expected);
        });

        it('should ask for the tooltip again after the chart updated', () => {
            const wrapper = mount(
                <Bullet
                    chart={BulletWrapper}
                    data={bulletData.fullTestData()}
                    createTooltip={createTooltip}
                />
            );

            expect(createTooltip).not.toHaveBeenCalled();

            wrapper.setProps({ data: bulletData.partialTestData() });

            expect(createTooltip).toHaveBeenCalledTimes(1);
            expect(createTooltip.mock.invocationCallOrder[0]).toBeGreaterThan(
                updateSpy.mock.invocationCallOrder[0]
            );
        });
    });

    describe('unmount', () => {
        let destroySpy;

        beforeEach(() => {
            destroySpy = jest.spyOn(BulletWrapper, 'destroy');
        });

        afterEach(() => {
            destroySpy.mockReset();
            destroySpy.mockRestore();
        });

        it('should call the destroy method of the chart with the container', () => {
            const wrapper = mount(
                <Bullet
                    chart={BulletWrapper}
                    data={bulletData.fullTestData()}
                />
            );
            const container = wrapper.find('.bullet-container').getDOMNode();

            wrapper.unmount();

            expect(destroySpy).toHaveBeenCalledTimes(1);
            expect(destroySpy.mock.calls[0][0]).toBe(container);
        });
    });
});
