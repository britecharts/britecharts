import React from 'react';
import { mount } from 'enzyme';

import Tooltip from './Tooltip';
import tooltip from './tooltipChart';

const FakeChart = () => (
    <div className="metadata-group">
        <div className="vertical-marker-container" />
    </div>
);

const FakeChartNoMarker = () => <div className="metadata-group" />;

const renderFakeChart = () => <FakeChart />;

const renderFakeChartNoMarker = () => <FakeChartNoMarker />;

describe('tooltip', () => {
    describe('render', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(tooltip, 'create');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the create method of the chart', () => {
            mount(
                <Tooltip chart={tooltip} render={renderFakeChart} data={[]} />
            );

            const expected = 1;
            const actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });

        it('should call the create method or the chart with the container as the first argument', () => {
            const wrapper = mount(
                <Tooltip chart={tooltip} render={renderFakeChart} data={[]} />
            );

            const expected = wrapper
                .find('.vertical-marker-container')
                .instance();
            const actual = createSpy.mock.calls[0][0];

            expect(actual).toEqual(expected);
        });

        it('should call the create method or the chart with the container as the first argument when no vertical marker is present', () => {
            const wrapper = mount(
                <Tooltip
                    chart={tooltip}
                    render={renderFakeChartNoMarker}
                    data={[]}
                />
            );

            const expected = wrapper.find('.metadata-group').instance();
            const actual = createSpy.mock.calls[0][0];

            expect(actual).toEqual(expected);
        });

        it('should allow setting locale', () => {
            const expected = 'en-US';

            mount(
                <Tooltip
                    chart={tooltip}
                    locale={expected}
                    render={renderFakeChart}
                    data={[]}
                />
            );

            const actual = createSpy.mock.calls[0][1].locale;

            expect(actual).toEqual(expected);
        });

        it('should allow setting title', () => {
            const expected = 'title';

            mount(
                <Tooltip
                    chart={tooltip}
                    title={expected}
                    render={renderFakeChart}
                    data={[]}
                />
            );

            const actual = createSpy.mock.calls[0][1].title;

            expect(actual).toEqual(expected);
        });
    });

    describe('update', () => {
        describe('when data changes', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(tooltip, 'update');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the update method on the chart', () => {
                const wrapper = mount(
                    <Tooltip
                        chart={tooltip}
                        render={renderFakeChart}
                        data={[]}
                    />
                );

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    title: 'DummyTitle',
                });

                const expected = 1;
                const actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const wrapper = mount(
                    <Tooltip
                        chart={tooltip}
                        render={renderFakeChart}
                        data={[]}
                    />
                );
                const expected = 'title';

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    title: expected,
                });

                const actual = createSpy.mock.calls[0][1].title;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new state to the update method', () => {
                const wrapper = mount(
                    <Tooltip
                        chart={tooltip}
                        render={renderFakeChart}
                        data={[]}
                    />
                );
                const expected = true;

                // Changing properties should trigger a componentDidUpdate
                wrapper.setState({
                    isActive: expected,
                });

                const actual = createSpy.mock.calls[0][2].isActive;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('unmount', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(tooltip, 'destroy');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const wrapper = mount(
                <Tooltip chart={tooltip} render={renderFakeChart} data={[]} />
            );

            wrapper.unmount();

            const expected = 1;
            const actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });
});
