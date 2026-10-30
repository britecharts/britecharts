import { extent } from 'd3-array';
import { easeQuadInOut } from 'd3-ease';
import { scaleLinear } from 'd3-scale';
import { area, line, curveBasis } from 'd3-shape';
import { select } from 'd3-selection';
import type { BaseType, Selection } from 'd3-selection';
import type { ScaleLinear } from 'd3-scale';
import type { Area, Line } from 'd3-shape';
import 'd3-transition';

import { exportChart } from '../helpers/export.js';
import { renderChart } from '../helpers/render.js';
import colorHelper from '../helpers/color.js';
import { sparkLineLoadingMarkup } from '../helpers/load.js';
import { uniqueId } from '../helpers/number.js';
import { motion } from '../helpers/constants.js';
import type { ChartMarginParams } from '../../typings/common/margin.js';
import type { ColorGradientType } from '../../typings/helpers/colors.js';
import type {
    AccessibleChartAPI,
    RenderableChartAPI,
    DataTableChartAPI,
    AnimatedChartAPI,
    ChartDimensionsAPI,
    ExportableChartAPI,
} from '../../typings/common/base.js';
import {
    labelChart,
    prefersReducedMotion,
    renderDataTable,
} from '../helpers/a11y.js';
import type { DataTable } from '../helpers/a11y.js';
import type { ChartModuleSelection } from '../../typings/common/selection.js';

export declare enum SparklineChartKeys {
    Value = 'value',
    Date = 'date',
}

export type SparklineChartDataShape = {
    [SparklineChartKeys.Value]: number;
    [SparklineChartKeys.Date]: string;
};

export type SparklineSelection = Selection<
    BaseType,
    SparklineChartDataShape,
    HTMLElement,
    // The parent datum, which a consumer of this type binds and this chart
    // never reads -- the same bounded `any` as `ChartSelection` below, for the
    // same reason: `Selection` is invariant in it, so naming one shape would
    // reject every other caller's.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
>;

export interface SparklineChartAPI
    extends
        AccessibleChartAPI<SparklineChartModule>,
        RenderableChartAPI<SparklineChartModule, SparklineChartDataShape[]>,
        DataTableChartAPI<SparklineChartModule>,
        ChartDimensionsAPI<SparklineChartModule>,
        AnimatedChartAPI<SparklineChartModule>,
        ExportableChartAPI {
    /** Gets or Sets the areaGradient of the chart */
    areaGradient(): [string, string];
    areaGradient(gradient: [string, string]): SparklineChartModule;
    /** Gets or Sets the lineGradient of the chart */
    lineGradient(): [string, string];
    lineGradient(gradient: [string, string]): SparklineChartModule;
    /** Gets or Sets the loading state of the chart */
    isLoading(): boolean;
    isLoading(value: boolean): SparklineChartModule;
}

export type SparklineChartModule = ChartModuleSelection<
    SparklineChartDataShape[]
> &
    SparklineChartAPI;

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are a bounded `any`, as in `bullet.ts`: these are
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

/**
 * What `cleanData` hands the drawing functions. The published
 * `SparklineChartDataShape` describes the chart's *input*, where `date` is a
 * string; `cleanData` replaces it with a Date in place, and every drawing
 * function downstream reads that Date.
 */
type SparklineDatum = {
    date: Date;
    value: number;
};

/**
 * Sparkline Chart reusable API module that allows us
 * rendering a sparkline configurable chart.
 *
 * @module Sparkline
 * @tutorial sparkline
 *
 * @example
 * import { select } from 'd3-selection';
 * import { sparkline } from '@britecharts/core';
 *
 * // dataset: [{ date, value }]
 * const sparklineChart = sparkline();
 *
 * sparklineChart
 *     .width(200)
 *     .height(100);
 *
 * select('.css-selector')
 *     .datum(dataset)
 *     .call(sparklineChart);
 */

/**
 * @typedef SparklineChartData
 * @type {Object[]}
 * @property {number} value        Value of the group (required)
 * @property {string} name         Name of the group (required)
 *
 * @example
 * [
 *     {
 *         value: 1,
 *         date: '2011-01-06T00:00:00Z'
 *     },
 *     {
 *         value: 2,
 *         date: '2011-01-07T00:00:00Z'
 *     }
 * ]
 */

export default function module(): SparklineChartModule {
    // Split into `let` and `const`: the TypeScript ESLint override runs
    // `prefer-const` as an error, and the bindings below it are never
    // reassigned.
    // The data's keys, fixed: the accessors that renamed them are gone
    const dateLabel = 'date';
    const valueLabel = 'value';
    let margin: ChartMarginParams = {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5,
        },
        width = 100,
        height = 30,
        isLoading = false,
        xScale: ScaleLinear<number, number>,
        yScale: ScaleLinear<number, number>,
        areaGradient: ColorGradientType = [
            'var(--bc-sparkline-area-start, #f5fdff)',
            'var(--bc-sparkline-area-end, #f6fefc)',
        ],
        areaGradientEl: ChartSelection<SVGStopElement>,
        lineGradient: ColorGradientType = colorHelper.colorGradients.greenBlue,
        lineGradientEl: ChartSelection<SVGStopElement>,
        maskingClip: ChartSelection<SVGRectElement>,
        svg: ChartSelection<SVGSVGElement>,
        chartWidth: number,
        chartHeight: number,
        data: SparklineDatum[],
        isAnimated = false,
        clipDuration = motion.duration,
        // `| undefined` on these two where the selections above do without
        // it: both guards below read them before the first assignment, and
        // TypeScript reports a truthiness test on a function type that cannot
        // be undefined (TS2774) where it says nothing about an object one.
        topLine: Line<SparklineDatum> | undefined,
        areaBelow: Area<SparklineDatum> | undefined,
        circle: ChartSelection<SVGCircleElement>;

    const areaGradientId = uniqueId('sparkline-area-gradient');
    const lineGradientId = uniqueId('sparkline-line-gradient');
    const maskingClipId = uniqueId('maskingClip');
    const lineStrokeWidth = 2;
    const ease = easeQuadInOut;
    const markerSize = 1.5;
    // getters
    const getDate = ({ date }: SparklineDatum) => date;
    const getValue = ({ value }: SparklineDatum) => value;

    /**
     * This function creates the graph using the selection and data provided
     *
     * @param {D3Selection} _selection A d3 selection that represents
     * the container(s) where the chart(s) will be rendered
     * @param {SparklineChartData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            SparklineChartDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (_data) {
            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);
            data = cleanData(_data);

            buildSVG(this);
            renderDataTable(
                svg.node(),
                a11yDataTable && !isLoading ? dataTable() : null
            );
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildScales();
            createGradients();
            createMaskingClip();
            drawArea();
            drawLine();
            drawEndMarker();
        });
    }

    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * NOTE: The order of drawing of this group elements is really important,
     * as everything else will be drawn on top of them
     * @private
     */
    function buildContainerGroups(): void {
        const container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${margin.left},${margin.top})`);

        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('chart-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Creates the x, y and color scales of the chart
     * @private
     */
    function buildScales(): void {
        // `extent` is typed `[T, T] | [undefined, undefined]` for the
        // empty-input case, which this chart does not guard against -- it
        // reads `data[data.length - 1]` unconditionally too. Asserted rather
        // than guarded, as the rest of the chart assumes the data is not
        // empty.
        xScale = scaleLinear()
            .domain(extent(data, getDate) as [Date, Date])
            .range([0, chartWidth]);

        yScale = scaleLinear()
            .domain(extent(data, getValue) as [number, number])
            .range([chartHeight, 0]);
    }

    let a11yTitle: string | null = null;
    let a11yDescription: string | null = null;
    let a11yDataTable = true;

    /**
     * The chart's data as a table, for screen readers: each date and its value
     * @private
     */
    function dataTable(): DataTable {
        return {
            columns: ['Date', 'Value'],
            rows: data.map((d) => [d.date, d.value]),
        };
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element): void {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart sparkline', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);

        labelChart(svg.node(), {
            a11yTitle,
            a11yDescription,
            fallbackTitle: 'Sparkline',
        });
    }

    /**
     * Cleaning data casting the values and dates to the proper type while keeping
     * the rest of properties on the data
     * @param  {SparklineChartData} originalData    Raw data from the container
     * @return {SparklineChartData}                 Clean data
     * @private
     */
    function cleanData(
        originalData: SparklineChartDataShape[]
    ): SparklineDatum[] {
        return originalData.reduce<SparklineDatum[]>((acc, d) => {
            // The same object, mutated in place -- `date` goes from the
            // input's string to a Date and every other key the datum carries
            // survives. The cast says that rather than rebuilding the object,
            // which would drop those keys.
            const datum = d as unknown as SparklineDatum;

            datum.date = new Date(datum[dateLabel]);
            datum.value = +datum[valueLabel];

            return [...acc, datum];
        }, []);
    }

    /**
     * Cleans the loading state
     * @private
     */
    function cleanLoadingState(): void {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Creates the gradient on the area below the line
     * @return {void}
     */
    function createGradients(): void {
        const metadataGroup = svg.select('.metadata-group');

        if (areaGradientEl || lineGradientEl) {
            svg.selectAll(`#${areaGradientId}`).remove();
            svg.selectAll(`#${lineGradientId}`).remove();
        }

        areaGradientEl = metadataGroup
            .append('linearGradient')
            .attr('id', areaGradientId)
            .attr('class', 'area-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('x2', xScale(data[data.length - 1].date))
            .attr('y1', 0)
            .attr('y2', 0)
            .selectAll('stop')
            .data([
                { offset: '0%', color: areaGradient[0] },
                { offset: '100%', color: areaGradient[1] },
            ])
            .enter()
            .append('stop')
            .attr('offset', ({ offset }) => offset)
            .style('stop-color', ({ color }) => color);

        lineGradientEl = metadataGroup
            .append('linearGradient')
            .attr('id', lineGradientId)
            .attr('class', 'line-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('x2', xScale(data[data.length - 1].date))
            .attr('y1', 0)
            .attr('y2', 0)
            .selectAll('stop')
            .data([
                { offset: '0%', color: lineGradient[0] },
                { offset: '100%', color: lineGradient[1] },
            ])
            .enter()
            .append('stop')
            .attr('offset', ({ offset }) => offset)
            .style('stop-color', ({ color }) => color);
    }

    /**
     * Creates a masking clip that would help us fake an animation if the
     * proper flag is true
     *
     * @return {void}
     */
    function createMaskingClip(): void {
        if (maskingClip) {
            svg.selectAll(`#${maskingClipId}`).remove();
        }

        if (isAnimated && !prefersReducedMotion()) {
            maskingClip = svg
                .select('.metadata-group')
                .append('clipPath')
                .attr('id', maskingClipId)
                .attr('class', 'clip-path')
                .append('rect')
                .attr('width', 0)
                .attr('height', height);

            select(`#${maskingClipId} rect`)
                .transition()
                .ease(ease)
                .duration(clipDuration)
                .attr('width', width);
        }
    }

    /**
     * Draws the area that will be placed below the line
     * @private
     */
    function drawArea(): void {
        if (areaBelow) {
            svg.selectAll('.sparkline-area').remove();
        }

        areaBelow = area<SparklineDatum>()
            .x(({ date }) => xScale(date))
            .y0(() => yScale(0) + lineStrokeWidth / 2)
            .y1(({ value }) => yScale(value))
            .curve(curveBasis);

        svg.select('.chart-group')
            .append('path')
            .datum(data)
            .attr('class', 'sparkline-area')
            .attr('fill', `url(#${areaGradientId})`)
            .attr('d', areaBelow)
            .attr('clip-path', `url(#${maskingClipId})`);
    }

    /**
     * Draws the line element within the chart group
     * @private
     */
    function drawLine(): void {
        if (topLine) {
            svg.selectAll('.line').remove();
        }

        topLine = line<SparklineDatum>()
            .curve(curveBasis)
            .x(({ date }) => xScale(date))
            .y(({ value }) => yScale(value));

        svg.select('.chart-group')
            .append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('stroke', `url(#${lineGradientId})`)
            .attr('d', topLine)
            .attr('clip-path', `url(#${maskingClipId})`)
            .attr('fill', 'none');
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState(): void {
        svg.select('.loading-state-group').html(sparkLineLoadingMarkup);
    }

    /**
     * Draws a marker at the end of the sparkline
     */
    function drawEndMarker(): void {
        if (circle) {
            svg.selectAll('.sparkline-circle').remove();
        }

        circle = svg
            .selectAll('.chart-group')
            .append('circle')
            .attr('class', 'sparkline-circle')
            .attr('cx', xScale(data[data.length - 1].date))
            .attr('cy', yScale(data[data.length - 1].value))
            .attr('r', markerSize);
    }

    // API
    /**
     * Gets or Sets the name screen readers announce for the chart. It is
     * set as the svg's `aria-label`. Unset, the chart is announced as
     * "Sparkline".
     * @param  {String | null} _x     Desired accessible title for the chart
     * @return {String | null | module} Current a11yTitle or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).a11yTitle = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return a11yTitle;
        }
        a11yTitle = _x;

        return this;
    } as SparklineChartModule['a11yTitle'];

    /**
     * Gets or Sets a longer description screen readers announce after the
     * chart's name, such as what the data shows. It is rendered as the svg's
     * `<desc>`. Unset, the chart has no description.
     * @param  {String | null} _x     Desired accessible description for the chart
     * @return {String | null | module} Current a11yDescription or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).a11yDescription = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return a11yDescription;
        }
        a11yDescription = _x;

        return this;
    } as SparklineChartModule['a11yDescription'];

    /**
     * Gets or Sets whether the chart renders its data as a visually hidden
     * table after its svg, which screen readers can read cell by cell. On by
     * default; set it to false when the app gives the data its own accessible
     * form.
     * @param  {Boolean} _x     Whether to render the data table
     * @return {Boolean | module} Current a11yDataTable or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).a11yDataTable = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return a11yDataTable;
        }
        a11yDataTable = _x;

        return this;
    } as SparklineChartModule['a11yDataTable'];

    /**
     * Gets or Sets the duration of the animation
     * @param  {number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).animationDuration = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return clipDuration;
        }
        clipDuration = _x;

        return this;
    } as SparklineChartModule['animationDuration'];

    /**
     * Gets or Sets the areaGradient of the chart
     * @param  {string[]} _x = ['#F5FDFF', '#F6FEFC']   Desired areaGradient for the graph
     * @return {areaGradient | module}                  Current areaGradient or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).areaGradient = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return areaGradient;
        }
        areaGradient = _x;

        return this;
    } as SparklineChartModule['areaGradient'];

    /**
     * Exports the chart and fires a download: an svg file when the filename
     * ends in `.svg`, and a png otherwise
     * @param {string} filename     Name of the downloaded file, whose extension picks the format
     * @param {string} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as SparklineChartModule).exportChart = function (filename, title) {
        // The module, not the bare function: `exportChart` needs `this` to
        // answer `width()`, `height()` and `margin()`.
        return exportChart.call(
            exports as SparklineChartModule,
            svg,
            filename,
            title
        );
    } as SparklineChartModule['exportChart'];

    /**
     * Gets or Sets the height of the chart
     * @param  {number} _x=30       Desired height for the graph
     * @return { height | module}   Current height or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).height = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as SparklineChartModule['height'];

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * The chart draws without animation when the reader's system asks for
     * reduced motion (`prefers-reduced-motion`), whatever this is set to.
     * By default this is 'false'
     *
     * @param  {boolean} _x=false       Desired animation flag
     * @return {isAnimated | module}    Current isAnimated flag or Chart module
     * @public
     */
    (exports as SparklineChartModule).isAnimated = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    } as SparklineChartModule['isAnimated'];

    /**
     * Gets or Sets the lineGradient of the chart
     * @param  {string[]} _x = colorHelper.colorGradients.greenBlue     Desired lineGradient for the graph
     * @return {lineGradient | module}                                  Current lineGradient or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).lineGradient = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return lineGradient;
        }
        lineGradient = _x;

        return this;
    } as SparklineChartModule['lineGradient'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).isLoading = function (
        this: SparklineChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as SparklineChartModule['isLoading'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {object} _x          Margin object to get/set
     * @return {object | module}    Current margin or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).margin = function (
        this: SparklineChartModule,
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
    } as SparklineChartModule['margin'];

    /**
     * Gets or Sets the width of the chart
     * @param  {number} _x=100      Desired width for the graph
     * @return {width | module}     Current width or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).width = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as SparklineChartModule['width'];

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
     * sparkline().width(600).render('#chart', data);
     */
    (exports as SparklineChartModule).render = function (
        this: SparklineChartModule,
        target,
        data
    ) {
        return renderChart(this, target, data);
    } as SparklineChartModule['render'];

    return exports as unknown as SparklineChartModule;
}
