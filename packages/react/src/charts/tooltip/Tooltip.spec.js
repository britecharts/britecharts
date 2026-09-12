import React from 'react';
import { mount } from 'enzyme';

import { act } from 'react-dom/test-utils';

import Tooltip from './Tooltip';
import Line from '../line/Line';
import lineData from '../line/lineChart.fixtures';
import { TooltipWrapper } from '@britecharts/wrappers';

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
            createSpy = jest.spyOn(TooltipWrapper, 'create');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the create method of the chart', () => {
            mount(
                <Tooltip
                    chart={TooltipWrapper}
                    render={renderFakeChart}
                    data={[]}
                />
            );

            const expected = 1;
            const actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });

        it('should call the create method or the chart with the container as the first argument', () => {
            const wrapper = mount(
                <Tooltip
                    chart={TooltipWrapper}
                    render={renderFakeChart}
                    data={[]}
                />
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
                    chart={TooltipWrapper}
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
                    chart={TooltipWrapper}
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
                    chart={TooltipWrapper}
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
                createSpy = jest.spyOn(TooltipWrapper, 'update');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the update method on the chart', () => {
                const wrapper = mount(
                    <Tooltip
                        chart={TooltipWrapper}
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
                        chart={TooltipWrapper}
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
                        chart={TooltipWrapper}
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
            createSpy = jest.spyOn(TooltipWrapper, 'destroy');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const wrapper = mount(
                <Tooltip
                    chart={TooltipWrapper}
                    render={renderFakeChart}
                    data={[]}
                />
            );

            wrapper.unmount();

            const expected = 1;
            const actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });

    describe('driven by a chart', () => {
        // The chart re-renders on every tooltip state change and asks the
        // wrapper to create the tooltip again; there must still be one.
        const renderLine = (props) => <Line {...props} />;
        const dataPoint = {
            date: '2017-01-16T16:00:00-08:00',
            topics: [{ name: 'a', value: 1, topicName: 'A' }],
        };
        const colorMap = { A: '#000' };

        it('should keep a single tooltip in the chart while the pointer moves', () => {
            const wrapper = mount(
                <Tooltip
                    data={lineData.oneSet()}
                    render={renderLine}
                    topicLabel="topics"
                />
            );
            const tooltip = wrapper.find(Tooltip).instance();

            // One render per event, as real pointer events arrive
            act(() => tooltip.handleMouseOver());
            [10, 30, 50].forEach((x) => {
                act(() => tooltip.handleMouseMove(dataPoint, colorMap, x, 20));
            });
            wrapper.update();

            const expected = 1;
            const actual = wrapper
                .getDOMNode()
                .querySelectorAll('.britechart-tooltip').length;

            expect(actual).toEqual(expected);
        });

        it('should keep a single tooltip when the chart receives new props', () => {
            const wrapper = mount(
                <Tooltip
                    data={lineData.oneSet()}
                    render={renderLine}
                    topicLabel="topics"
                />
            );

            wrapper.setProps({ title: 'One' });
            wrapper.setProps({ title: 'Two' });

            const expected = 1;
            const actual = wrapper
                .getDOMNode()
                .querySelectorAll('.britechart-tooltip').length;

            expect(actual).toEqual(expected);
        });
    });
});
