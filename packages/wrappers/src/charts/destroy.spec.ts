import bar from './bar/barChart';
import barData from './bar/barChart.fixtures';
import bullet from './bullet/bulletChart';
import bulletData from './bullet/bulletChart.fixtures';
import donut from './donut/donutChart';
import donutData from './donut/donutChart.fixtures';
import groupedBar from './groupedBar/groupedBarChart';
import groupedBarData from './groupedBar/groupedBarChart.fixtures';
import legend from './legend/legendChart';
import legendData from './legend/legendChart.fixtures';
import line from './line/lineChart';
import lineData from './line/lineChart.fixtures';
import scatterPlot from './scatterPlot/scatterPlotChart';
import scatterPlotData from './scatterPlot/scatterPlotChart.fixtures';
import sparkline from './sparkline/sparklineChart';
import sparklineData from './sparkline/sparklineChart.fixtures';
import stackedArea from './stackedArea/stackedAreaChart';
import stackedAreaData from './stackedArea/stackedAreaChart.fixtures';
import stackedBar from './stackedBar/stackedBarChart';
import stackedBarData from './stackedBar/stackedBarChart.fixtures';
import tooltip from './tooltip/tooltipChart';
import type { Wrapper } from '../helpers/wrapper';

// Each row pairs a wrapper with data of its own shape -- nine over an array,
// line over an object -- and only the row knows which. Holding the wrapper and
// its data builder as separate columns loses that pairing: the table's element
// type has to name one data type for all ten, and then no builder's return
// value is assignable to any wrapper's `create`.
//
// So the pairing is resolved here, where both types are still known, and each
// row carries closures instead. `drawInto` is all these tests need a wrapper
// for; nothing here inspects the chart it returns.
type DestroyCase = [
    name: string,
    drawInto: (el: HTMLElement) => void,
    destroy: (el?: HTMLElement | null) => void,
];

const destroyCase = <TData, TChart extends object>(
    name: string,
    wrapper: Wrapper<TData, TChart>,
    getData: () => TData
): DestroyCase => [
    name,
    (el) => {
        wrapper.create(el, getData());
    },
    (el) => wrapper.destroy(el),
];

// The lifecycle React drives: create, destroy, create again on the same
// container (StrictMode does exactly this to every component in development).
const CHARTS: DestroyCase[] = [
    destroyCase('bar', bar, () => barData.withLetters()),
    destroyCase('bullet', bullet, () => bulletData.fullTestData()),
    destroyCase('donut', donut, () => donutData.with4Slices()),
    destroyCase('groupedBar', groupedBar, () => groupedBarData.with3Groups()),
    destroyCase('legend', legend, () => legendData.with6Points()),
    destroyCase('line', line, () => lineData.flatData.a),
    destroyCase('scatterPlot', scatterPlot, () =>
        scatterPlotData.withFourNames()
    ),
    destroyCase('sparkline', sparkline, () => sparklineData.with1Source()),
    destroyCase('stackedArea', stackedArea, () =>
        stackedAreaData.with3Sources()
    ),
    destroyCase('stackedBar', stackedBar, () => stackedBarData.with3Sources()),
];

describe('chart wrappers destroy', () => {
    let parent: HTMLElement;
    let anchor: HTMLElement;

    beforeEach(() => {
        parent = document.createElement('div');
        anchor = document.createElement('div');
        parent.appendChild(anchor);
    });

    describe.each(CHARTS)('%s', (name, drawInto, destroy) => {
        it('should leave one svg after create, destroy and create', () => {
            drawInto(anchor);
            destroy(anchor);
            drawInto(anchor);

            expect(anchor.querySelectorAll('svg')).toHaveLength(1);
        });

        it('should remove the chart svg', () => {
            drawInto(anchor);
            destroy(anchor);

            expect(anchor.querySelectorAll('svg')).toHaveLength(0);
        });

        it('should leave the container in the document', () => {
            drawInto(anchor);
            destroy(anchor);

            expect(anchor.parentNode).toBe(parent);
        });

        it('should leave everything else in the container alone', () => {
            const sibling = document.createElement('span');

            anchor.appendChild(sibling);
            drawInto(anchor);
            destroy(anchor);

            expect(Array.from(anchor.children)).toEqual([sibling]);
        });

        it('should not throw when the container is gone', () => {
            expect(() => destroy(undefined)).not.toThrow();
        });
    });
});

// The group line draws its tooltip into. Asserted rather than threading
// `Element | null` through every call: if line ever stops drawing it, these
// tests should fail saying so.
const metadataGroupOf = (root: HTMLElement) => {
    const group = root.querySelector<HTMLElement>('.metadata-group');

    if (!group) {
        throw new Error('the line chart drew no .metadata-group to attach to');
    }

    return group;
};

describe('tooltip wrapper destroy', () => {
    let root: HTMLElement;

    // The tooltip is created into a descendant of the chart it decorates, and
    // destroyed against the outermost node, whose svg belongs to the chart.
    beforeEach(() => {
        root = document.createElement('div');
        line.create(root, lineData.flatData.a);
        tooltip.create(metadataGroupOf(root));
    });

    it('should remove the tooltip', () => {
        tooltip.destroy(root);

        expect(root.querySelectorAll('.britechart-tooltip')).toHaveLength(0);
    });

    it('should never remove the svg of the chart it decorates', () => {
        tooltip.destroy(root);

        expect(root.querySelectorAll('svg.line-chart')).toHaveLength(1);
    });

    it('should remove the tooltip of the single layout too', () => {
        tooltip.create(metadataGroupOf(root), {
            layout: 'single',
        });
        tooltip.destroy(root);

        expect(
            root.querySelectorAll(
                '.britechart-tooltip, .britechart-mini-tooltip'
            )
        ).toHaveLength(0);
    });

    it('should not throw when the container is gone', () => {
        expect(() => tooltip.destroy(undefined)).not.toThrow();
    });
});
