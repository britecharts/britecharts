import { axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import type { BaseType, Selection } from 'd3-selection';
import type { Axis } from 'd3-axis';
import type { NumberValue } from 'd3-scale';
import type { ScaleLinear } from 'd3-scale';
import 'd3-transition';

import { exportChart } from '../helpers/export.js';
import { renderChart } from '../helpers/render.js';
import { bulletLoadingMarkup } from '../helpers/load.js';
import colorHelper from '../helpers/color.js';
import type { ChartMarginParams } from '../../typings/common/margin.js';
import type {
    AccessibleChartAPI,
    RenderableChartAPI,
    DataTableChartAPI,
    ChartBaseAPI,
    ExportableChartAPI,
} from '../../typings/common/base.js';
import { labelChart, renderDataTable } from '../helpers/a11y.js';
import type { DataTable } from '../helpers/a11y.js';
import type { ChartModuleSelection } from '../../typings/common/selection.js';
import type { ColorsSchemasType } from '../../typings/helpers/colors.js';

export declare enum BulletChartKeys {
    Ranges = 'ranges',
    Measures = 'measures',
    Markers = 'markers',
}

export type BulletChartDataShape = {
    [BulletChartKeys.Ranges]: [number?, number?, number?];
    [BulletChartKeys.Measures]: [number?, number?, number?];
    [BulletChartKeys.Markers]: number[];
};

export type BulletChartBaseAPI = ChartBaseAPI<BulletChartModule>;

export interface BulletChartAPI
    extends
        AccessibleChartAPI<BulletChartModule>,
        RenderableChartAPI<BulletChartModule, BulletChartDataShape>,
        DataTableChartAPI<BulletChartModule>,
        BulletChartBaseAPI,
        ExportableChartAPI {
    /** Gets or Sets the colorSchema of the chart */
    colorSchema(): ColorsSchemasType;
    colorSchema(schema: ColorsSchemasType): BulletChartModule;
    /**
     * Gets or Sets the isReverse status of the chart. If true,
     * the elements will be rendered in reverse order.
     */
    isReverse(): boolean;
    isReverse(isReverse: boolean): BulletChartModule;
    /** Space between axis and chart */
    paddingBetweenAxisAndChart(): number;
    paddingBetweenAxisAndChart(padding: number): BulletChartModule;
    /** Gets or Sets the starting point of the capacity range. */
    startMaxRangeOpacity(): number;
    startMaxRangeOpacity(opacity: number): BulletChartModule;
    /** Gets or Sets the number of ticks of the x axis on the chart */
    ticks(): number;
    ticks(ticks: number): BulletChartModule;
}

export type BulletChartModule = ChartModuleSelection<BulletChartDataShape> &
    BulletChartAPI;

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are a bounded `any`, as in `filter.ts`: these are
 * module-level variables reassigned from several differently-shaped selections,
 * so naming one concrete datum would reject the others.
 */
type ChartSelection<TElement extends BaseType> = Selection<
    TElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
>;

/** What `cleanData` hands the drawing functions. */
type BulletData = {
    ranges: number[];
    measures: number[];
    markers: number[];
};

/**
 * Reusable Bullet Chart API class that renders a
 * simple and configurable Bullet Chart.
 *
 * @module Bullet
 * @tutorial bullet-chart
 *
 * @example
 * import { select } from 'd3-selection';
 * import { bullet } from '@britecharts/core';
 *
 * // dataset: one object: { ranges, measures, markers }
 * const bulletChart = bullet();
 *
 * bulletChart
 *     .width(containerWidth);
 *
 * select('.css-selector')
 *     .datum(dataset)
 *     .call(bulletChart);
 */

/**
 * @typedef BulletChartData
 * @type {Object}
 * @property {Number[]} ranges      Range that encodes the qualitative measure
 * @property {Number[]} measures    Range that encodes the performance measure
 * @property {Number[]} markers     Marker lines that encode the comparative measure
 *
 * @example
 * {
 *      ranges: [130, 160, 250],
 *      measures: [150, 180],
 *      markers: [175]
 * }
 */

export default function module(): BulletChartModule {
    // Split into `let` and `const`: the TypeScript ESLint override runs
    // `prefer-const` as an error, and the constants below are never
    // reassigned.
    let margin: ChartMarginParams = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 20,
        },
        width = 960,
        height = 150,
        isLoading = false,
        chartWidth: number,
        chartHeight: number,
        xScale: ScaleLinear<number, number>,
        rangeOpacityScale: number[],
        measureOpacityScale: number[],
        colorSchema: string[] = colorHelper.colorSchemas.britecharts,
        rangeColor: string,
        measureColor: string,
        markerColor: string,
        numberFormat = '',
        baseLine: ChartSelection<SVGLineElement>,
        ticks = 6,
        // `Axis<NumberValue>`, which is what `axisBottom` on a numeric scale
        // produces -- d3 types a scale's accepted input as `NumberValue`
        // (`number | { valueOf(): number }`), not `number`.
        axis: Axis<NumberValue>,
        paddingBetweenAxisAndChart = 5,
        startMaxRangeOpacity = 0.5,
        // Derived from the x scale: the width of one bullet for a given datum.
        barWidth: (d: number) => number,
        isReverse = false,
        rangesEl: ChartSelection<SVGRectElement>,
        measuresEl: ChartSelection<SVGRectElement>,
        markersEl: ChartSelection<SVGLineElement>,
        ranges: number[] = [],
        markers: number[] = [],
        measures: number[] = [],
        svg: ChartSelection<SVGSVGElement>;

    const rangeOpacifyDiff = 0.2;
    const measureOpacifyDiff = 0.3;
    const tickPadding = 5;
    const markerStrokeWidth = 5;
    const getMeasureBarHeight = () => chartHeight / 3;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {BulletChartData} _data   The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            BulletChartDataShape,
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (_data) {
            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);

            // The loading state stands in for data that has not arrived, so it
            // has to be drawn before cleanData(), which expects a real datum
            // with ranges, measures and markers.
            buildSVG(this);
            renderDataTable(
                svg.node(),
                a11yDataTable && !isLoading ? dataTable(_data) : null
            );
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            ({ ranges, measures, markers } = cleanData(_data));

            buildScales();
            buildAxis();
            drawBullet();
            drawAxis();
        });
    }

    /**
     * Creates the d3 x and y axis, setting orientations
     * @private
     */
    function buildAxis(): void {
        axis = axisBottom(xScale)
            .ticks(ticks)
            .tickPadding(tickPadding)
            .tickFormat(format(numberFormat));
    }

    /**
     * Cleans the loading state
     * @return {void}
     * @private
     */
    function cleanLoadingState(): void {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Draws the loading state
     * @return {void}
     * @private
     */
    function drawLoadingState(): void {
        svg.select('.loading-state-group').html(bulletLoadingMarkup);
    }

    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * Also applies the Margin convention
     * @return {void}
     * @private
     */
    function buildContainerGroups(): void {
        const container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('chart-group', true);
        container.append('g').classed('axis-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Creates the x scales of the chart
     * @return {void}
     * @private
     */
    function buildScales(): void {
        const decidedRange = isReverse ? [chartWidth, 0] : [0, chartWidth];
        const domain = [0, Math.max(...ranges, ...markers, ...measures)];

        xScale = scaleLinear().domain(domain).rangeRound(decidedRange).nice();

        // Derive width scales from x scales
        barWidth = bulletWidth(xScale);

        // set up opacity scale based on ranges and measures
        rangeOpacityScale = ranges
            .map((d, i) => startMaxRangeOpacity - i * rangeOpacifyDiff)
            .reverse();
        measureOpacityScale = ranges
            .map((d, i) => 0.9 - i * measureOpacifyDiff)
            .reverse();

        // initialize range and measure bars and marker line colors
        rangeColor = colorSchema[0];
        measureColor = colorSchema[1];
        markerColor = colorSchema[2];
    }

    let a11yTitle: string | null = null;
    let a11yDescription: string | null = null;
    let a11yDataTable = true;

    /**
     * The chart's data as a table, for screen readers: its ranges, measures
     * and markers, each listed in a row
     * @private
     */
    function dataTable(datum: BulletChartDataShape): DataTable {
        const cleaned = cleanData(datum);
        const series: [string, number[]][] = [
            ['Ranges', cleaned.ranges],
            ['Measures', cleaned.measures],
            ['Markers', cleaned.markers],
        ];

        return {
            columns: ['Series', 'Values'],
            rows: series
                .filter(([, values]) => values.length)
                .map(([name, values]) => [name, values.join(', ')]),
        };
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @return {void}
     * @private
     */
    function buildSVG(container: Element): void {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart bullet-chart', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);

        labelChart(svg.node(), {
            a11yTitle,
            a11yDescription,
            fallbackTitle: 'Bullet chart',
        });
    }

    /**
     * Calculates width for each bullet using scale
     * @return {void}
     * @private
     */
    function bulletWidth(x: ScaleLinear<number, number>) {
        const x0 = x(0);

        return function (d: number) {
            return Math.abs(x(d) - x0);
        };
    }

    /**
     * Cleaning data casting the values and names to the proper
     * type while keeping the rest of properties on the data. It
     * also creates a set of zeroed data (for animation purposes)
     * @param   {BulletChartData} originalData  Raw data as passed to the container
     * @return  {BulletChartData}               Clean data
     * @private
     */
    function cleanData(originalData: BulletChartDataShape): BulletData {
        // The declared shape spells these as tuples of optional numbers,
        // `[number?, number?, number?]`, so spreading one yields
        // `(number | undefined)[]`. The assertions do not filter: a hole in
        // the data reaches `Math.max(...)` and produces a NaN domain. The
        // documented `@typedef` above says `Number[]`, which is what the
        // implementation actually requires.
        const newData = {
            ranges: ([...originalData.ranges] as number[]).sort().reverse(),
            measures: ([...originalData.measures] as number[]).sort().reverse(),
            markers: originalData.markers.length
                ? ([...originalData.markers] as number[]).sort().reverse()
                : [],
        };

        return newData;
    }

    /**
     * Draws the x and y axis on the svg object within their
     * respective groups along with their axis labels
     * @return {void}
     * @private
     */
    function drawAxis(): void {
        svg.select('.axis-group')
            .attr(
                'transform',
                `translate(0, ${chartHeight + paddingBetweenAxisAndChart})`
            )
            // Cast because `svg.select` hands back a `Selection<BaseType, ...>`
            // while an axis renders into an SVG container; `BaseType` admits
            // `Document` and `Window`, which have no geometry.
            .call(
                axis as unknown as (selection: ChartSelection<BaseType>) => void
            );

        drawHorizontalExtendedLine();
    }

    /**
     * Draws the measures of the bullet chart
     * @return {void}
     * @private
     */
    function drawBullet(): void {
        if (rangesEl) {
            rangesEl.remove();
        }
        if (measuresEl) {
            measuresEl.remove();
        }
        if (markersEl) {
            markersEl.remove();
        }

        rangesEl = svg
            .select('.chart-group')
            .selectAll('rect.range')
            .data(ranges)
            .enter()
            .append('rect')
            .attr('fill', rangeColor)
            .attr('opacity', (d, i) => rangeOpacityScale[i])
            .attr('class', (d, i) => `range r${i}`)
            .attr('width', barWidth)
            .attr('height', chartHeight)
            .attr('x', isReverse ? xScale : 0);

        measuresEl = svg
            .select('.chart-group')
            .selectAll('rect.measure')
            .data(measures)
            .enter()
            .append('rect')
            .attr('fill', measureColor)
            .attr('fill-opacity', (d, i) => measureOpacityScale[i])
            .attr('class', (d, i) => `measure m${i}`)
            .attr('width', barWidth)
            .attr('height', getMeasureBarHeight)
            .attr('x', isReverse ? xScale : 0)
            .attr('y', getMeasureBarHeight);

        if (markers.length) {
            markersEl = svg
                .select('.chart-group')
                .selectAll('line.marker-line')
                .data(markers)
                .enter()
                .append('line')
                .attr('class', 'marker-line')
                .attr('stroke', markerColor)
                .attr('stroke-width', markerStrokeWidth)
                .attr('opacity', measureOpacityScale[0])
                .attr('x1', xScale)
                .attr('x2', xScale)
                .attr('y1', 0)
                .attr('y2', chartHeight);
        }
    }

    /**
     * Draws a vertical line to extend x-axis till the edges
     * @return {void}
     * @private
     */
    function drawHorizontalExtendedLine(): void {
        if (baseLine) {
            baseLine.remove();
        }

        baseLine = svg
            .select('.axis-group')
            .selectAll('line.extended-x-line')
            .data([0])
            .enter()
            .append('line')
            .attr('class', 'extended-x-line')
            .attr('x1', 0)
            .attr('x2', chartWidth);
    }

    // API
    /**
     * Gets or Sets the name screen readers announce for the chart. It is
     * set as the svg's `aria-label`. Unset, the chart is announced as
     * "Bullet chart".
     * @param  {String | null} _x     Desired accessible title for the chart
     * @return {String | null | module} Current a11yTitle or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).a11yTitle = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return a11yTitle;
        }
        a11yTitle = _x;

        return this;
    } as BulletChartModule['a11yTitle'];

    /**
     * Gets or Sets a longer description screen readers announce after the
     * chart's name, such as what the data shows. It is rendered as the svg's
     * `<desc>`. Unset, the chart has no description.
     * @param  {String | null} _x     Desired accessible description for the chart
     * @return {String | null | module} Current a11yDescription or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).a11yDescription = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return a11yDescription;
        }
        a11yDescription = _x;

        return this;
    } as BulletChartModule['a11yDescription'];

    /**
     * Gets or Sets whether the chart renders its data as a visually hidden
     * table after its svg, which screen readers can read cell by cell. On by
     * default; set it to false when the app gives the data its own accessible
     * form.
     * @param  {Boolean} _x     Whether to render the data table
     * @return {Boolean | module} Current a11yDataTable or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).a11yDataTable = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return a11yDataTable;
        }
        a11yDataTable = _x;

        return this;
    } as BulletChartModule['a11yDataTable'];

    /**
     * Gets or Sets the colorSchema of the chart.
     * The first color from the array will be applied to range bars (the wider bars).
     * The second color from the array will be applied to measure bars (the narrow bars) and
     * the third color will be applied to the marker lines.
     * @param  {String[]} _x        Desired colorSchema for the graph
     * @return {String[] | module}  Current colorSchema or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).colorSchema = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as BulletChartModule['colorSchema'];

    /**
     * Exports the chart and fires a download: an svg file when the filename
     * ends in `.svg`, and a png otherwise
     * @param {String} filename     Name of the downloaded file, whose extension picks the format
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as BulletChartModule).exportChart = function (filename, title) {
        // The module, not the bare function: `exportChart` needs `this` to
        // answer `width()`, `height()` and `margin()`.
        return exportChart.call(
            exports as BulletChartModule,
            svg,
            filename,
            title
        );
    } as BulletChartModule['exportChart'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} _flag          Desired value for the loading state
     * @return {boolean | module}       Current loading state flag or Chart module to chain calls
     * @public
     * @example chart.isLoading(true)
     */
    (exports as BulletChartModule).isLoading = function (
        this: BulletChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as BulletChartModule['isLoading'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x          Desired height for the chart
     * @return {Number | module}    Current height or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).height = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as BulletChartModule['height'];

    /**
     * Gets or Sets the isReverse status of the chart. If true,
     * the elements will be rendered in reverse order.
     * @param  {Boolean} _x=false       Desired height for the chart
     * @return {Boolean | module}       Current height or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).isReverse = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isReverse;
        }
        isReverse = _x;

        return this;
    } as BulletChartModule['isReverse'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return {margin | module}    Current margin or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).margin = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return margin;
        }
        margin = {
            ...margin,
            ..._x,
        };

        return this;
    } as BulletChartModule['margin'];

    /**
     * Gets or Sets the number format of the bar chart
     * @param  {string} _x = ',f'       Desired numberFormat for the chart. See examples [here]{@link https://d3js.org/d3-format}
     * @return {string | module}        Current numberFormat or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).numberFormat = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as BulletChartModule['numberFormat'];

    /**
     * Space between axis and chart
     * @param  {Number} _x=5            Space between y axis and chart
     * @return {Number| module}         Current value of paddingBetweenAxisAndChart or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).paddingBetweenAxisAndChart = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return paddingBetweenAxisAndChart;
        }
        paddingBetweenAxisAndChart = _x;

        return this;
    } as BulletChartModule['paddingBetweenAxisAndChart'];

    /**
     * Gets or Sets the starting point of the capacity range.
     * @param  {Number} _x=0.5          Desired startMaxRangeOpacity for chart
     * @return {Number | module}        current startMaxRangeOpacity or Chart module to chain calls
     * @public
     * @example bulletChart.startMaxRangeOpacity(0.8)
     */
    (exports as BulletChartModule).startMaxRangeOpacity = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return startMaxRangeOpacity;
        }
        startMaxRangeOpacity = _x;

        return this;
    } as BulletChartModule['startMaxRangeOpacity'];

    /**
     * Gets or Sets the number of ticks of the x axis on the chart
     * @param  {Number} _x = 5      Desired horizontal ticks
     * @return {Number | module}    Current ticks or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).ticks = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return ticks;
        }
        ticks = _x;

        return this;
    } as BulletChartModule['ticks'];

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x           Desired width for the chart
     * @return {Number | module}     Current width or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).width = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as BulletChartModule['width'];

    /**
     * Draws the chart into a target: a CSS selector, an element or a d3
     * selection, as `select(target).datum(data).call(chart)` does. A selector
     * draws into the first element it matches. Without data, the chart
     * redraws with the data it last drew there.
     * @param  {String | Element | D3Selection} target Where to draw the chart
     * @param  {Object} [data]  The data to draw
     * @return {module} The chart module, to chain calls
     * @throws {Error} When the target matches no element
     * @public
     * @example
     * bullet().width(600).render('#chart', data);
     */
    (exports as BulletChartModule).render = function (
        this: BulletChartModule,
        target,
        data
    ) {
        return renderChart(this, target, data);
    } as BulletChartModule['render'];

    return exports as unknown as BulletChartModule;
}
