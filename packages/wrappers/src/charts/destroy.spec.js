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

// The lifecycle React drives: create, destroy, create again on the same
// container (StrictMode does exactly this to every component in development).
const CHARTS = [
    ['bar', bar, () => barData.withLetters()],
    ['bullet', bullet, () => bulletData.fullTestData()],
    ['donut', donut, () => donutData.with4Slices()],
    ['groupedBar', groupedBar, () => groupedBarData.with3Groups()],
    ['legend', legend, () => legendData.with6Points()],
    ['line', line, () => lineData.flatData.a],
    ['scatterPlot', scatterPlot, () => scatterPlotData.withFourNames()],
    ['sparkline', sparkline, () => sparklineData.with1Source()],
    ['stackedArea', stackedArea, () => stackedAreaData.with3Sources()],
    ['stackedBar', stackedBar, () => stackedBarData.with3Sources()],
];

describe('chart wrappers destroy', () => {
    let parent;
    let anchor;

    beforeEach(() => {
        parent = document.createElement('div');
        anchor = document.createElement('div');
        parent.appendChild(anchor);
    });

    describe.each(CHARTS)('%s', (name, wrapper, getData) => {
        it('should leave one svg after create, destroy and create', () => {
            wrapper.create(anchor, getData());
            wrapper.destroy(anchor);
            wrapper.create(anchor, getData());

            expect(anchor.querySelectorAll('svg')).toHaveLength(1);
        });

        it('should remove the chart svg', () => {
            wrapper.create(anchor, getData());
            wrapper.destroy(anchor);

            expect(anchor.querySelectorAll('svg')).toHaveLength(0);
        });

        it('should leave the container in the document', () => {
            wrapper.create(anchor, getData());
            wrapper.destroy(anchor);

            expect(anchor.parentNode).toBe(parent);
        });

        it('should leave everything else in the container alone', () => {
            const sibling = document.createElement('span');

            anchor.appendChild(sibling);
            wrapper.create(anchor, getData());
            wrapper.destroy(anchor);

            expect(Array.from(anchor.children)).toEqual([sibling]);
        });

        it('should not throw when the container is gone', () => {
            expect(() => wrapper.destroy(undefined)).not.toThrow();
        });
    });
});

describe('tooltip wrapper destroy', () => {
    let root;

    // The tooltip is created into a descendant of the chart it decorates, and
    // destroyed against the outermost node, whose svg belongs to the chart.
    beforeEach(() => {
        root = document.createElement('div');
        line.create(root, lineData.flatData.a);
        tooltip.create(root.querySelector('.metadata-group'));
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
        tooltip.create(root.querySelector('.metadata-group'), {
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
