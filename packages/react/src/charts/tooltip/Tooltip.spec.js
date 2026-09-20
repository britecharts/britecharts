import React from 'react';
import { mount } from 'enzyme';

import { act } from 'react-dom/test-utils';

import Tooltip from './Tooltip';
import Line from '../line/Line';
import lineData from '../line/lineChart.fixtures';
import Donut from '../donut/Donut';
import donutData from '../donut/donutChart.fixtures';
import { LineWrapper, TooltipWrapper } from '@britecharts/wrappers';

const FakeChart = () => (
    <div className="metadata-group">
        <div className="vertical-marker-container" />
    </div>
);

const FakeChartNoMarker = () => <div className="metadata-group" />;

const renderFakeChart = () => <FakeChart />;

const renderFakeChartNoMarker = () => <FakeChartNoMarker />;

/**
 * Wraps a render prop so a test can reach what the tooltip hands its child
 * chart (the data and the handlers). The latest props always land on
 * `holder.props`: read it when you need it, never keep a copy, because the
 * tooltip builds a new set of handlers whenever it builds its child again.
 */
/**
 * The names of the spies, in the order their first call happened. A spy that
 * was never called is left out, so a missing call and a call in the wrong
 * place both show up as a diff naming the wrappers involved.
 * @param  {Object} spies   Spies by the name to report them under
 * @return {string[]}
 */
const namesInCallOrder = (spies) =>
    Object.entries(spies)
        .filter(([, spy]) => spy.mock.invocationCallOrder.length)
        .sort(
            ([, a], [, b]) =>
                a.mock.invocationCallOrder[0] - b.mock.invocationCallOrder[0]
        )
        .map(([name]) => name);

const captureChildProps = (holder, render) => (props) => {
    holder.props = props;

    return render(props);
};

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
                .getDOMNode();
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

            const expected = wrapper.find('.metadata-group').getDOMNode();
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
                const child = {};

                mount(
                    <Tooltip
                        chart={TooltipWrapper}
                        render={captureChildProps(child, renderFakeChart)}
                        data={[]}
                    />
                );
                const expected = true;

                // The pointer entering the chart is how state changes, through
                // the handler the tooltip hands its child chart
                act(() => child.props.customMouseOver());

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
            const child = {};
            const wrapper = mount(
                <Tooltip
                    data={lineData.oneSet()}
                    render={captureChildProps(child, renderLine)}
                    topicLabel="topics"
                />
            );

            // One render per event, as real pointer events arrive. The
            // handlers are read from `child.props` at the moment of each call:
            // they can be replaced whenever the tooltip builds its child again
            act(() => child.props.customMouseOver());
            [10, 30, 50].forEach((x) => {
                act(() =>
                    child.props.customMouseMove(
                        dataPoint,
                        [x, 20],
                        [600, 300],
                        colorMap
                    )
                );
            });
            wrapper.update();

            const expected = 1;
            const actual = wrapper
                .getDOMNode()
                .querySelectorAll('.britechart-tooltip').length;

            expect(actual).toEqual(expected);
        });

        // The tooltip re-renders on every pointer move, since its state
        // changes. The chart it wraps is built from the props only, so it must
        // be handed the same element and left alone: rebuilding it there would
        // redraw the whole chart underneath on each move.
        it('should not redraw the chart underneath while the pointer moves', () => {
            const child = {};
            const updateSpy = jest.spyOn(LineWrapper, 'update');

            mount(
                <Tooltip
                    data={lineData.oneSet()}
                    render={captureChildProps(child, renderLine)}
                    topicLabel="topics"
                />
            );

            act(() => child.props.customMouseOver());
            [10, 30, 50].forEach((x) => {
                act(() =>
                    child.props.customMouseMove(
                        dataPoint,
                        [x, 20],
                        [600, 300],
                        colorMap
                    )
                );
            });

            expect(updateSpy).not.toHaveBeenCalled();

            updateSpy.mockRestore();
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

    describe('configuration', () => {
        // Tooltip's own callbacks are handled by the component; the wrapper it
        // creates the tooltip with has no `on` accessor to hand them to, so
        // they must never reach it.
        describe('when the mouse handlers are passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(TooltipWrapper, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should not throw', () => {
                expect(() =>
                    mount(
                        <Tooltip
                            customMouseMove={jest.fn()}
                            customMouseOut={jest.fn()}
                            customMouseOver={jest.fn()}
                            render={renderFakeChart}
                            data={[]}
                        />
                    )
                ).not.toThrow();
            });

            ['customMouseMove', 'customMouseOut', 'customMouseOver'].forEach(
                (handler) => {
                    it(`should not pass ${handler} to the tooltip wrapper`, () => {
                        mount(
                            <Tooltip
                                {...{ [handler]: jest.fn() }}
                                render={renderFakeChart}
                                data={[]}
                            />
                        );

                        expect(createSpy.mock.calls[0][1]).not.toHaveProperty(
                            handler
                        );
                    });
                }
            );
        });
    });

    describe('wrapping a donut', () => {
        it('should render without throwing', () => {
            expect(() =>
                mount(
                    <Tooltip
                        data={donutData.with4Slices()}
                        render={(props) => <Donut {...props} />}
                    />
                )
            ).not.toThrow();
        });
    });

    // The tooltip lives inside the chart it decorates, so who runs first
    // matters: the chart has to exist before the tooltip can be drawn into it.
    // React runs a child's mount and update effects before its parent's, and
    // the parent's cleanup before the child's; converting only one of the two
    // components to another effect kind (or scheduling one of them later)
    // breaks these orders.
    describe('lifecycle order between the tooltip and the chart it wraps', () => {
        const renderLine = (props) => <Line {...props} />;
        let spies;

        beforeEach(() => {
            spies = {
                'LineWrapper.create': jest.spyOn(LineWrapper, 'create'),
                'TooltipWrapper.create': jest.spyOn(TooltipWrapper, 'create'),
                'LineWrapper.update': jest.spyOn(LineWrapper, 'update'),
                'TooltipWrapper.update': jest.spyOn(TooltipWrapper, 'update'),
                'LineWrapper.destroy': jest.spyOn(LineWrapper, 'destroy'),
                'TooltipWrapper.destroy': jest.spyOn(TooltipWrapper, 'destroy'),
            };
        });

        afterEach(() => {
            Object.values(spies).forEach((spy) => spy.mockRestore());
        });

        const only = (...names) =>
            Object.fromEntries(names.map((name) => [name, spies[name]]));

        it('should create the chart before the tooltip', () => {
            mount(<Tooltip data={lineData.oneSet()} render={renderLine} />);

            expect(
                namesInCallOrder(
                    only('LineWrapper.create', 'TooltipWrapper.create')
                )
            ).toEqual(['LineWrapper.create', 'TooltipWrapper.create']);
        });

        it('should update the chart before the tooltip', () => {
            const wrapper = mount(
                <Tooltip data={lineData.oneSet()} render={renderLine} />
            );

            wrapper.setProps({ title: 'New title' });

            expect(
                namesInCallOrder(
                    only('LineWrapper.update', 'TooltipWrapper.update')
                )
            ).toEqual(['LineWrapper.update', 'TooltipWrapper.update']);
        });

        it('should destroy the tooltip before the chart', () => {
            const wrapper = mount(
                <Tooltip data={lineData.oneSet()} render={renderLine} />
            );

            wrapper.unmount();

            expect(
                namesInCallOrder(
                    only('LineWrapper.destroy', 'TooltipWrapper.destroy')
                )
            ).toEqual(['TooltipWrapper.destroy', 'LineWrapper.destroy']);
        });

        it('should hand the chart handlers that update the tooltip and call the callbacks', () => {
            const child = {};
            const customMouseMove = jest.fn();
            const dataPoint = {
                date: '2017-01-16T16:00:00-08:00',
                topics: [{ name: 'a', value: 1, topicName: 'A' }],
            };
            const colorMap = { A: '#000' };

            mount(
                <Tooltip
                    data={lineData.oneSet()}
                    render={captureChildProps(child, renderLine)}
                    customMouseMove={customMouseMove}
                    topicLabel="topics"
                />
            );

            act(() => child.props.customMouseOver());
            act(() =>
                child.props.customMouseMove(
                    dataPoint,
                    [10, 20],
                    [600, 300],
                    colorMap
                )
            );

            const tooltipState =
                spies['TooltipWrapper.update'].mock.calls.pop()[2];

            expect(customMouseMove).toHaveBeenCalledWith(
                dataPoint,
                [10, 20],
                [600, 300],
                colorMap
            );
            expect(tooltipState).toMatchObject({
                isActive: true,
                dataPoint,
                x: 10,
                y: 20,
            });
        });
    });
});
