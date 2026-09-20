import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Line from '../line/Line';
import lineData from '../line/lineChart.fixtures';
import ResponsiveContainer from './responsiveContainer';
import withResponsiveness from './withResponsiveness';
import { LineWrapper } from '@britecharts/wrappers';

// The two components that hand a chart the width of the element around it, and
// keep doing so when the window is resized. Neither had a spec before.
describe('responsive helpers', () => {
    let containerWidth;
    let spies;

    // jsdom lays nothing out: every element measures 0. The width the tests
    // set is the one the components read.
    const setContainerWidth = (width) => {
        containerWidth = width;
    };

    // What the browser does: the window changes size, then the registry
    // notices on the next animation frame
    const resizeWindowTo = (width, elementWidth = width) => {
        containerWidth = elementWidth;
        window.innerWidth = width;
        act(() => {
            window.dispatchEvent(new Event('resize'));
        });
    };

    const mounted = [];
    const mountTracked = (element) => {
        const wrapper = mount(element);

        mounted.push(wrapper);

        return wrapper;
    };

    beforeEach(() => {
        containerWidth = 640;
        window.innerWidth = 1000;
        spies = [
            jest
                .spyOn(Element.prototype, 'clientWidth', 'get')
                .mockImplementation(() => containerWidth),
            jest
                .spyOn(window, 'requestAnimationFrame')
                .mockImplementation((callback) => {
                    callback(0);

                    return 0;
                }),
        ];
    });

    // Only what this spec spied on: jest.restoreAllMocks() would also undo the
    // console spies the setup file installs for its fail-on-console check
    afterEach(() => {
        mounted.splice(0).forEach((wrapper) => {
            if (wrapper.length) {
                wrapper.unmount();
            }
        });
        spies.forEach((spy) => spy.mockRestore());
    });

    describe('ResponsiveContainer', () => {
        it('should render inside a container element', () => {
            const wrapper = mountTracked(
                <ResponsiveContainer render={() => <span />} />
            );

            expect(wrapper.getDOMNode().className).toEqual(
                'responsive-container'
            );
        });

        it('should hand the render prop the measured width', () => {
            const render = jest.fn(() => <span />);

            mountTracked(<ResponsiveContainer render={render} />);

            expect(render).toHaveBeenLastCalledWith({ width: 640 });
        });

        // defaults to 500 until it has measured, which it does in the same commit
        it('should not draw its content at the default width once measured', () => {
            const render = jest.fn(() => <span />);

            mountTracked(<ResponsiveContainer render={render} />);

            expect(render.mock.calls.pop()[0].width).not.toBe(500);
        });

        it('should hand the render prop the new width when the window is resized', () => {
            const render = jest.fn(() => <span />);

            mountTracked(<ResponsiveContainer render={render} />);
            resizeWindowTo(600, 420);

            expect(render).toHaveBeenLastCalledWith({ width: 420 });
        });

        it('should not render again when the window is resized but the element is not', () => {
            const render = jest.fn(() => <span />);

            mountTracked(<ResponsiveContainer render={render} />);
            const rendersBefore = render.mock.calls.length;

            resizeWindowTo(600, 640);

            expect(render).toHaveBeenCalledTimes(rendersBefore);
        });

        // The end-to-end case: a chart inside a container has to end up with
        // the real width, whichever order the two commit in
        it('should give a chart inside it a non-zero, measured width', () => {
            const createSpy = jest.spyOn(LineWrapper, 'create');
            const updateSpy = jest.spyOn(LineWrapper, 'update');

            spies.push(createSpy, updateSpy);

            mountTracked(
                <ResponsiveContainer
                    render={({ width }) => (
                        <Line
                            chart={LineWrapper}
                            data={lineData.flatData.a}
                            width={width}
                        />
                    )}
                />
            );

            const widthOf = (spy) =>
                spy.mock.calls.map((call) => call[2].width);
            const widths = [...widthOf(createSpy), ...widthOf(updateSpy)];

            expect(widths.length).toBeGreaterThan(0);
            expect(widths.pop()).toBe(640);
        });

        it('should keep resizing a chart inside it', () => {
            const updateSpy = jest.spyOn(LineWrapper, 'update');

            spies.push(updateSpy);
            mountTracked(
                <ResponsiveContainer
                    render={({ width }) => (
                        <Line
                            chart={LineWrapper}
                            data={lineData.flatData.a}
                            width={width}
                        />
                    )}
                />
            );
            resizeWindowTo(500, 320);

            expect(updateSpy.mock.calls.pop()[2].width).toBe(320);
        });

        // The leak: the first unmount used to end resizing for every container
        // still on the page
        it('should keep resizing after another container unmounted', () => {
            const remaining = jest.fn(() => <span />);
            const leaving = mountTracked(
                <ResponsiveContainer render={() => <span />} />
            );

            mountTracked(<ResponsiveContainer render={remaining} />);
            leaving.unmount();
            resizeWindowTo(600, 420);

            expect(remaining).toHaveBeenLastCalledWith({ width: 420 });
        });

        it('should keep resizing a container mounted after all the others unmounted', () => {
            mountTracked(
                <ResponsiveContainer render={() => <span />} />
            ).unmount();

            const later = jest.fn(() => <span />);

            mountTracked(<ResponsiveContainer render={later} />);
            resizeWindowTo(600, 420);

            expect(later).toHaveBeenLastCalledWith({ width: 420 });
        });

        it('should not render after it unmounted', () => {
            const render = jest.fn(() => <span />);
            const wrapper = mountTracked(
                <ResponsiveContainer render={render} />
            );
            const rendersBefore = render.mock.calls.length;

            wrapper.unmount();
            resizeWindowTo(600, 420);

            expect(render).toHaveBeenCalledTimes(rendersBefore);
        });

        // `render` is optional in its propTypes
        it('should render without a render prop', () => {
            expect(() => mountTracked(<ResponsiveContainer />)).not.toThrow();
        });
    });

    describe('withResponsiveness', () => {
        const Chart = jest.fn(({ width }) => (
            <span className="chart">{width}</span>
        ));
        let Responsive;

        beforeEach(() => {
            Chart.mockClear();
            Responsive = withResponsiveness(Chart);
        });

        it('should render the component inside a container element', () => {
            const wrapper = mountTracked(<Responsive />);

            expect(
                wrapper.find('div.responsive-container').hostNodes()
            ).toHaveLength(1);
            expect(wrapper.find('.chart')).toHaveLength(1);
        });

        it('should hand the component the measured width', () => {
            const wrapper = mountTracked(<Responsive />);

            expect(wrapper.find('.chart').text()).toEqual('640');
        });

        it('should hand the component the new width when the window is resized', () => {
            const wrapper = mountTracked(<Responsive />);

            resizeWindowTo(600, 420);
            wrapper.update();

            expect(wrapper.find('.chart').text()).toEqual('420');
        });

        it('should pass the other props on', () => {
            mountTracked(<Responsive title="a title" />);

            expect(Chart.mock.calls.pop()[0].title).toEqual('a title');
        });

        // The props are spread after the width, so an explicit width wins
        it('should let an explicit width win over the measured one', () => {
            const wrapper = mountTracked(<Responsive width={300} />);

            expect(wrapper.find('.chart').text()).toEqual('300');
        });

        // A pure component: a parent re-rendering with the same props costs
        // nothing, and must keep costing nothing
        it('should not render again when its parent re-renders with the same props', () => {
            const wrapper = mountTracked(<Responsive title="a title" />);
            const rendersBefore = Chart.mock.calls.length;

            wrapper.setProps({ title: 'a title' });

            expect(Chart).toHaveBeenCalledTimes(rendersBefore);
        });

        it('should render again when a prop changes', () => {
            const wrapper = mountTracked(<Responsive title="a title" />);
            const rendersBefore = Chart.mock.calls.length;

            wrapper.setProps({ title: 'another title' });

            expect(Chart.mock.calls.length).toBeGreaterThan(rendersBefore);
        });

        it('should not render again when the window is resized but the element is not', () => {
            mountTracked(<Responsive />);
            const rendersBefore = Chart.mock.calls.length;

            resizeWindowTo(600, 640);

            expect(Chart).toHaveBeenCalledTimes(rendersBefore);
        });

        it('should keep resizing after another container unmounted', () => {
            const leaving = mountTracked(<Responsive />);
            const remaining = mountTracked(<Responsive />);

            leaving.unmount();
            resizeWindowTo(600, 420);
            remaining.update();

            expect(remaining.find('.chart').text()).toEqual('420');
        });

        it('should not throw when the window is resized after it unmounted', () => {
            mountTracked(<Responsive />).unmount();
            // another container keeps the registry alive, so any callback the
            // first one left behind is called
            mountTracked(<Responsive />);

            expect(() => resizeWindowTo(600, 420)).not.toThrow();
        });
    });
});
