import { select } from 'd3-selection';

import bar from './bar/barChart';
import barData from './bar/barChart.fixtures';
import donut from './donut/donutChart';
import donutData from './donut/donutChart.fixtures';
import line from './line/lineChart';
import lineData from './line/lineChart.fixtures';

// The configuration a consumer passes is applied to the real core chart. A
// value of false, 0 or '' is a setting like any other: it used to be skipped,
// so a chart could never have a flag turned back off (isLoading={false} could
// not end a loading state).
describe('falsy configuration values', () => {
    let anchor;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('false', () => {
        it('should end the loading state', () => {
            const chart = bar.create(anchor, [], { isLoading: true });

            expect(anchor.querySelectorAll('.bar-load-state')).toHaveLength(1);

            bar.update(
                anchor,
                barData.withLetters(),
                { isLoading: false },
                chart
            );

            expect(anchor.querySelectorAll('.bar-load-state')).toHaveLength(0);
            expect(chart.isLoading()).toBe(false);
        });

        it('should turn a flag back off', () => {
            const chart = bar.create(anchor, barData.withLetters(), {
                isHorizontal: true,
            });

            bar.update(
                anchor,
                barData.withLetters(),
                { isHorizontal: false },
                chart
            );

            expect(chart.isHorizontal()).toBe(false);
        });

        it('should turn animation off', () => {
            const chart = donut.create(anchor, donutData.with4Slices(), {
                isAnimated: true,
            });

            donut.update(
                anchor,
                donutData.with4Slices(),
                { isAnimated: false },
                chart
            );

            expect(chart.isAnimated()).toBe(false);
        });
    });

    describe('zero', () => {
        it('should replace the default', () => {
            const chart = line.create(anchor, lineData.flatData.a, {
                tooltipThreshold: 0,
            });

            // The default is 480
            expect(chart.tooltipThreshold()).toBe(0);
        });
    });

    describe('a value that is not set', () => {
        it.each([
            ['undefined', undefined],
            ['null', null],
        ])('should leave the default alone when it is %s', (name, value) => {
            const defaultWidth = bar
                .create(document.createElement('div'), barData.withLetters())
                .width();
            const chart = bar.create(anchor, barData.withLetters(), {
                width: value,
            });

            expect(chart.width()).toBe(defaultWidth);
        });
    });

    it('should draw into the anchor it was given', () => {
        bar.create(anchor, barData.withLetters(), { isHorizontal: false });

        expect(select(anchor).selectAll('svg').size()).toBe(1);
    });
});
