import { extent } from 'd3-array';
import { select, pointer } from 'd3-selection';
import type { BaseType, Selection } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import type { ScaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { dispatch } from 'd3-dispatch';
import 'd3-transition';

import { exportChart } from '../helpers/export.js';
import { renderChart } from '../helpers/render.js';
import {
    claimTooltip,
    connectTooltip,
    releaseTooltip,
} from '../helpers/tooltip.js';
import type { TooltipLabels } from '../helpers/tooltip.js';
import type { TooltipModule } from '../tooltip/tooltip.js';
import { heatmapLoadingMarkup } from '../helpers/load.js';
import colorHelper from '../helpers/color.js';
import { hoursHuman, motion } from '../helpers/constants.js';
import type { ChartMarginParams } from '../../typings/common/margin.js';
import type {
    AccessibleChartAPI,
    RenderableChartAPI,
    TooltipChartAPI,
    DataTableChartAPI,
    KeyboardChartAPI,
    AnimatedChartAPI,
    BaseAPI,
    ExportableChartAPI,
    InteractiveChartAPI,
} from '../../typings/common/base.js';
import {
    labelChart,
    pivotTable,
    prefersReducedMotion,
    renderDataTable,
} from '../helpers/a11y.js';
import type { DataTable } from '../helpers/a11y.js';
import { enableKeyboardNavigation } from '../helpers/keyboard.js';
import type { KeyboardStop } from '../helpers/keyboard.js';
import type { ChartModuleSelection } from '../../typings/common/selection.js';

export declare enum HeatmapChartKeys {
    Day = 'day',
    Hour = 'hour',
    Value = 'value',
}

export type HeatmapChartDataShape = {
    [HeatmapChartKeys.Day]: number;
    [HeatmapChartKeys.Hour]: number;
    [HeatmapChartKeys.Value]: number;
};

export interface HeatmapChartAPI
    extends
        AccessibleChartAPI<HeatmapChartModule>,
        RenderableChartAPI<HeatmapChartModule, HeatmapChartDataShape[]>,
        TooltipChartAPI<HeatmapChartModule>,
        DataTableChartAPI<HeatmapChartModule>,
        KeyboardChartAPI<HeatmapChartModule>,
        BaseAPI<HeatmapChartModule>,
        // `isAnimated` and `animationDuration` are documented `@public` on the
        // chart.
        AnimatedChartAPI<HeatmapChartModule>,
        // `on` is how a consumer wires the mini tooltip to the chart, as in
        // `heatmap().on('customMouseOver', tooltip.show)` -- the pattern this
        // library's own examples show.
        InteractiveChartAPI<HeatmapChartModule>,
        ExportableChartAPI {
    /** Gets or Sets the y-axis labels of the chart */
    yAxisLabels(): string[] | undefined;
    yAxisLabels(labels: string[]): HeatmapChartModule;
    /** Gets or Sets the x-axis labels of the chart */
    xAxisLabels(): string[] | undefined;
    xAxisLabels(labels: string[]): HeatmapChartModule;
    /** Gets or Sets the boxSize of the chart */
    boxSize(): number;
    boxSize(size: number): HeatmapChartModule;
}

export type HeatmapChartModule = ChartModuleSelection<HeatmapChartDataShape[]> &
    HeatmapChartAPI;

/**
 * Reusable Heatmap API module that renders a
 * simple and configurable heatmap chart.
 *
 * @module Heatmap
 * @tutorial heatmap
 *
 * @example
 * import { select } from 'd3-selection';
 * import { heatmap } from '@britecharts/core';
 *
 * // dataset: [{ day, hour, value }], day 0-6 and hour 0-23, or indexes into
 * // yAxisLabels and xAxisLabels
 * const heatmapChart = heatmap();
 *
 * heatmapChart
 *     .width(500);
 *
 * select('.css-selector')
 *     .datum(dataset)
 *     .call(heatmapChart);
 */

/**
 * The data a heatmap takes: one entry per box.
 * @typedef {Object[]} HeatmapData
 * @property {Number} day
 * @property {Number} hour
 * @property {Number} value
 *
 * @example
 * [
 *     {
 *         day: 0,
 *         hour: 0,
 *         value: 7
 *     },
 *     {
 *         day: 0,
 *         hour: 1,
 *         value: 10
 *     }
 * ]
 */

/**
 * The chart's own svg, and the selections derived from it.
 *
 * The datum and parent generics are a bounded `any`, for the reason
 * `filter.ts` sets out: `Selection` is invariant in them, and these are
 * module-level variables reassigned from several different selections, so
 * naming one concrete shape would reject the others.
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

export default function module(): HeatmapChartModule {
    // Split into `let` and `const`. The TypeScript ESLint override runs
    // `prefer-const` as an error, and ten of these are never reassigned --
    // only the accessors' targets and the drawing state are.
    let margin: ChartMarginParams = {
            top: 40,
            right: 20,
            bottom: 20,
            left: 40,
        },
        width = 780,
        height = 270,
        isLoading = false,
        svg: ChartSelection<SVGSVGElement>,
        data: HeatmapChartDataShape[],
        chartWidth: number,
        chartHeight: number,
        boxes: Selection<
            SVGRectElement,
            HeatmapChartDataShape,
            BaseType,
            unknown
        >,
        boxSize = 30,
        // A linear scale whose range is two colours rather than two numbers,
        // which is what `interpolateHcl` makes possible.
        colorScale: ScaleLinear<string, string>,
        colorSchema: string[] = colorHelper.colorSchemas.red,
        animationDuration: number = motion.duration,
        isAnimated = false,
        // No default: `rowNames` falls back to `daysHuman`, so reading
        // this accessor before setting it gives undefined, which is what the
        // declaration says.
        yAxisLabels: string[] | undefined,
        // No default either: `columnNames` falls back to `hoursHuman`.
        xAxisLabels: string[] | undefined,
        rowLabels: Selection<BaseType, string, BaseType, unknown>,
        columnLabels: Selection<BaseType, string, BaseType, unknown>;

    // One statement each rather than a second comma chain: `one-var` asks for
    // that.
    const boxBorderSize = 2;
    const boxInitialOpacity = 0.2;
    const boxFinalOpacity = 1;
    const boxInitialColor = '#BBBBBB';
    const boxBorderColor = 'var(--bc-surface, #fff)';
    const daysHuman = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    // The row labels end this far left of the boxes, so a longer label grows
    // into the left margin rather than over the first column
    const rowLabelGap = 8;
    // Both axes' labels share one look, set here so the shared axis styles do
    // not make the rows lighter than the columns
    const labelFillColor = 'var(--bc-text-muted, #666a73)';
    const labelTextSize = 12;
    const columnLabelHeight = 20;
    // Dispatcher object to broadcast the mouse events
    // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
    const dispatcher = dispatch(
        'customMouseOver',
        'customMouseOut',
        'customMouseMove',
        'customClick'
    );
    const getValue = ({ value }: HeatmapChartDataShape) => value;

    // Generic in the element and parent types, not fixed, because that is what
    // `ChartModuleSelection` declares and d3's `Selection` is invariant in them
    // -- a caller's `Selection<HTMLDivElement, ...>` would not be assignable to
    // a `Selection<Element, ...>` parameter.
    //
    // The `@param` below keeps its `{D3Selection}` rather than letting the
    // generator inject the real signature. The injected form names `TElement`
    // and `TParent`, type parameters a reader of the page cannot resolve, and
    // the page is for readers. There is no `_data` parameter: `d3.call` passes
    // no second argument.
    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     */
    const exports = function <
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            HeatmapChartDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (_data) {
            data = cleanData(_data);

            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);

            buildSVG(this);
            renderDataTable(
                svg.node(),
                a11yDataTable && !isLoading ? dataTable() : null
            );
            enableKeyboardNavigation(svg.node(), {
                isEnabled: a11yKeyboardNavigation && !isLoading,
                stops: keyboardStops,
                rowLength: columnNames().length,
            });
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildScales();
            drawRowLabels();
            drawColumnLabels();
            drawBoxes();
            if (chartTooltip) {
                connectTooltip(
                    exports as unknown as HeatmapChartModule,
                    chartTooltip,
                    svg,
                    tooltipLabels,
                    tooltipDataPoint
                );
            }
        });
        // One assertion for the whole module, because the accessors below are
        // properties assigned onto this function inside the closure and
        // TypeScript does not widen a function's type that way -- its
        // expando-function inference does not reach here, so even
        // `exports.width = ...` is an error without this. Each accessor is then
        // checked against the declaration individually on assignment.
    } as unknown as HeatmapChartModule;

    let a11yTitle: string | null = null;
    let a11yDescription: string | null = null;
    let a11yDataTable = true;
    let a11yKeyboardNavigation = true;
    let chartTooltip: TooltipModule | null = null;
    // The labels this chart's data points need on a tooltip
    const tooltipLabels: TooltipLabels = {};
    // The heatmap sends a box's row and column indexes; the tooltip names the
    // box by its row and column labels instead
    const tooltipDataPoint = ({ day, hour, value }: HeatmapChartDataShape) => ({
        name: `${rowNames()[day]}, ${columnNames()[hour]}`,
        value,
    });

    /**
     * Where keyboard focus can rest: each box, by row and then by column, so
     * up and down move a row
     * @private
     */
    function keyboardStops(): KeyboardStop[] {
        return svg
            .selectAll<SVGRectElement, HeatmapChartDataShape>('.box')
            .nodes()
            .map((target) => ({
                target,
                datum: select<SVGRectElement, HeatmapChartDataShape>(
                    target
                ).datum(),
            }))
            .sort(
                (a, b) =>
                    a.datum.day - b.datum.day || a.datum.hour - b.datum.hour
            )
            .map(({ target }) => ({ target }));
    }

    /**
     * The names of the rows: `yAxisLabels`, or the days of the week
     * @private
     */
    function rowNames(): string[] {
        return yAxisLabels || daysHuman;
    }

    /**
     * The names of the columns: `xAxisLabels`, or the hours of the day
     * @private
     */
    function columnNames(): string[] {
        return xAxisLabels || hoursHuman;
    }

    /**
     * The chart's data as a table, for screen readers: a row per row label and
     * a column per column label
     * @private
     */
    function dataTable(): DataTable {
        const rows = rowNames();
        const columns = columnNames();

        return pivotTable(data, {
            heading: 'Day',
            row: (d) => rows[d.day],
            column: (d) => columns[d.hour],
            value: (d) => d.value,
        });
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element): void {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart heatmap', true);

            buildContainerGroups();
        }

        // `.join(',')` because d3's `attr` types its value as a string, number
        // or boolean, so the array needs spelling out. `','` is what
        // `Array.prototype.toString` gives, so the attribute is the string
        // `setAttribute` would make of the array itself.
        svg.attr('viewBox', [0, 0, width, height].join(','))
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);

        labelChart(svg.node(), {
            a11yTitle,
            a11yDescription,
            fallbackTitle: 'Heatmap',
        });
    }

    /**
     * Cleans the loading state
     * @private
     */
    function cleanLoadingState(): void {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState(): void {
        svg.select('.loading-state-group').html(heatmapLoadingMarkup);
    }

    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * Also applies the Margin convention
     * @private
     */
    function buildContainerGroups(): void {
        const container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('chart-group', true);
        container.append('g').classed('row-labels-group', true);
        container.append('g').classed('column-labels-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Cleaning data casting the values to the proper
     * type while keeping the rest of properties on the data. It
     * also creates a set of zeroed data (for animation purposes)
     * @param   originalData  Raw data as passed to the container
     * @return                Clean data
     * @private
     */
    function cleanData(
        originalData: HeatmapChartDataShape[]
    ): HeatmapChartDataShape[] {
        return originalData.reduce<HeatmapChartDataShape[]>(
            (acc, { day, hour, value }) => [
                ...acc,
                {
                    day: +day,
                    hour: +hour,
                    value: +value,
                },
            ],
            []
        );
    }

    /**
     * Creates the scales for the heatmap chart
     * @private
     */
    function buildScales(): void {
        colorScale = scaleLinear<string>()
            .range([colorSchema[0], colorSchema[colorSchema.length - 1]])
            // Asserted, not guarded: `extent` of an empty array is
            // `[undefined, undefined]`, which goes straight to `domain()` and
            // yields a NaN domain. No caller draws an empty heatmap.
            .domain(extent(data, getValue) as [number, number])
            .interpolate(interpolateHcl);
    }

    /**
     * Returns the sibling box nodes of the given element. d3 passes no
     * `nodes` argument to event handlers, so the list is derived from the
     * DOM instead.
     * @param  node  The element the event fired on
     * @return       Its siblings, including itself
     * @private
     */
    function siblingNodes(node: SVGRectElement): SVGRectElement[] {
        // `parentNode` is a `ParentNode`, which d3's `select` does not accept.
        // The assertion says "this is an element", which for a rect inside the
        // chart group it is.
        return select(node.parentNode as Element)
            .selectAll<SVGRectElement, unknown>('.box')
            .nodes();
    }

    /**
     * Draws the boxes of the heatmap
     * @private
     */
    function drawBoxes(): void {
        boxes = svg
            .select('.chart-group')
            .selectAll<SVGRectElement, HeatmapChartDataShape>('.box')
            .data(data);

        const boxElements = boxes
            .enter()
            .append('rect')
            .classed('box', true)
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr('x', ({ hour }) => hour * boxSize)
            .attr('y', ({ day }) => day * boxSize)
            .style('opacity', boxInitialOpacity)
            .style('fill', boxInitialColor)
            .style('stroke', boxBorderColor)
            .style('stroke-width', boxBorderSize)
            .on('mouseover', function (event: MouseEvent, d) {
                handleMouseOver(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('mousemove', function (event: MouseEvent, d) {
                handleMouseMove(this, d, chartWidth, chartHeight, event);
            })
            .on('mouseout', function (event: MouseEvent, d) {
                handleMouseOut(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('click', function (event: MouseEvent, d) {
                handleClick(this, d, chartWidth, chartHeight, event);
            });

        if (isAnimated && !prefersReducedMotion()) {
            boxElements
                .transition()
                .duration(animationDuration)
                .style('fill', ({ value }) => colorScale(value))
                .style('opacity', boxFinalOpacity);
        } else {
            boxElements
                .style('fill', ({ value }) => colorScale(value))
                .style('opacity', boxFinalOpacity);
        }

        // On the enter selection, not on `boxes`, so this removes nothing: an
        // enter selection has no exit groups. Left that way on purpose: making
        // it `boxes.exit()` would start removing elements the chart currently
        // keeps.
        boxElements.exit().remove();
    }

    /**
     * Draws the row labels
     * @private
     */
    function drawRowLabels(): void {
        const rowLabelsGroup = svg.select('.row-labels-group');

        rowLabels = svg
            .select('.row-labels-group')
            .selectAll<BaseType, string>('.row-label')
            .data(rowNames());

        rowLabels
            .enter()
            .append('text')
            .text((label) => label)
            .attr('x', 0)
            .attr('y', (d, i) => i * boxSize)
            .style('text-anchor', 'end')
            .style('dominant-baseline', 'central')
            .style('fill', labelFillColor)
            .style('font-size', labelTextSize)
            .attr('class', 'row-label y-axis-label');

        rowLabelsGroup.attr(
            'transform',
            `translate(-${rowLabelGap}, ${boxSize / 2})`
        );
    }

    /**
     * Draws the column labels
     * @private
     */
    function drawColumnLabels(): void {
        const columnLabelsGroup = svg.select('.column-labels-group');

        columnLabels = svg
            .select('.column-labels-group')
            .selectAll<BaseType, string>('.column-label')
            .data(columnNames());

        columnLabels
            .enter()
            .append('text')
            .text((label) => label)
            .attr('y', 0)
            .attr('x', (d, i) => i * boxSize)
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'central')
            .style('fill', labelFillColor)
            .style('font-size', labelTextSize)
            .attr('class', 'column-label');

        columnLabelsGroup.attr(
            'transform',
            `translate(${boxSize / 2}, -${columnLabelHeight})`
        );
    }

    /**
     * `boxList` is unused by every one of these: the dispatcher only forwards
     * the datum, the pointer and the chart size. It stays in the signature
     * because `drawBoxes` passes it.
     * @private
     */
    function handleMouseOver(
        e: SVGRectElement,
        d: HeatmapChartDataShape,
        boxList: SVGRectElement[],
        chartWidth: number,
        chartHeight: number,
        event: MouseEvent
    ): void {
        dispatcher.call('customMouseOver', e, d, pointer(event, e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /** @private */
    function handleMouseMove(
        e: SVGRectElement,
        d: HeatmapChartDataShape,
        chartWidth: number,
        chartHeight: number,
        event: MouseEvent
    ): void {
        dispatcher.call('customMouseMove', e, d, pointer(event, e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /** @private */
    function handleMouseOut(
        e: SVGRectElement,
        d: HeatmapChartDataShape,
        boxList: SVGRectElement[],
        chartWidth: number,
        chartHeight: number,
        event: MouseEvent
    ): void {
        dispatcher.call('customMouseOut', e, d, pointer(event, e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /** @private */
    function handleClick(
        e: SVGRectElement,
        d: HeatmapChartDataShape,
        chartWidth: number,
        chartHeight: number,
        event: MouseEvent
    ): void {
        dispatcher.call('customClick', e, d, pointer(event, e), [
            chartWidth,
            chartHeight,
        ]);
    }

    // API
    /**
     * Gets or Sets the name screen readers announce for the chart. It is
     * set as the svg's `aria-label`. Unset, the chart is announced as
     * "Heatmap".
     * @param  {String | null} _x     Desired accessible title for the chart
     * @return {String | null | module} Current a11yTitle or Chart module to chain calls
     * @public
     */
    exports.a11yTitle = function (
        this: HeatmapChartModule,
        _x?: string | null
    ) {
        if (!arguments.length) {
            return a11yTitle;
        }
        a11yTitle = _x as string | null;

        return this;
    } as HeatmapChartModule['a11yTitle'];

    /**
     * Gets or Sets a longer description screen readers announce after the
     * chart's name, such as what the data shows. It is rendered as the svg's
     * `<desc>`. Unset, the chart has no description.
     * @param  {String | null} _x     Desired accessible description for the chart
     * @return {String | null | module} Current a11yDescription or Chart module to chain calls
     * @public
     */
    exports.a11yDescription = function (
        this: HeatmapChartModule,
        _x?: string | null
    ) {
        if (!arguments.length) {
            return a11yDescription;
        }
        a11yDescription = _x as string | null;

        return this;
    } as HeatmapChartModule['a11yDescription'];

    /**
     * Gets or Sets whether the chart renders its data as a visually hidden
     * table after its svg, which screen readers can read cell by cell. On by
     * default; set it to false when the app gives the data its own accessible
     * form.
     * @param  {Boolean} _x     Whether to render the data table
     * @return {Boolean | module} Current a11yDataTable or Chart module to chain calls
     * @public
     */
    exports.a11yDataTable = function (this: HeatmapChartModule, _x?: boolean) {
        if (!arguments.length) {
            return a11yDataTable;
        }
        a11yDataTable = _x as boolean;

        return this;
    } as HeatmapChartModule['a11yDataTable'];

    /**
     * Gets or Sets whether a keyboard can move through the chart's data
     * points: the chart takes one tab stop, the arrow keys move between
     * points, Home and End go to the first and last, and Escape lets go. The
     * tooltip and highlights follow focus as they follow the pointer. On by
     * default.
     * @param  {Boolean} _x     Whether the keyboard can move through the data
     * @return {Boolean | module} Current a11yKeyboardNavigation or Chart module to chain calls
     * @public
     */
    exports.a11yKeyboardNavigation = function (
        this: HeatmapChartModule,
        _x?: boolean
    ) {
        if (!arguments.length) {
            return a11yKeyboardNavigation;
        }
        a11yKeyboardNavigation = _x as boolean;

        return this;
    } as HeatmapChartModule['a11yKeyboardNavigation'];

    /**
     * Gets or Sets the duration of the animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    exports.animationDuration = function (
        this: HeatmapChartModule,
        _x?: number
    ) {
        if (!arguments.length) {
            return animationDuration;
        }
        animationDuration = _x as number;

        return this;
    } as HeatmapChartModule['animationDuration'];

    /**
     * Gets or Sets the boxSize of the chart
     * @param  {Number} _x=30       Desired boxSize for the heatmap boxes
     * @return {Number | module}    Current boxSize or Chart module to chain calls
     * @public
     */
    exports.boxSize = function (this: HeatmapChartModule, _x?: number) {
        if (!arguments.length) {
            return boxSize;
        }
        boxSize = _x as number;

        return this;
    } as HeatmapChartModule['boxSize'];

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {String[]} _x=britecharts-red  Desired colorSchema for the heatma boxes
     * @return {String[] | module}            Current colorSchema or Chart module to chain calls
     * @public
     */
    exports.colorSchema = function (this: HeatmapChartModule, _x?: string[]) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x as string[];

        return this;
    } as HeatmapChartModule['colorSchema'];

    /**
     * Exports the chart and fires a download: an svg file when the filename
     * ends in `.svg`, and a png otherwise
     * @param {String} filename     Name of the downloaded file, whose extension picks the format
     * @param {String} title        Title to add at the top of the exported picture
     * @public
     */
    exports.exportChart = function (filename: string, title: string) {
        return exportChart.call(exports, svg, filename, title);
    } as HeatmapChartModule['exportChart'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} _flag          Desired value for the loading state
     * @return {boolean | module}       Current loading state flag or Chart module to chain calls
     * @public
     * @example chart.isLoading(true)
     */
    exports.isLoading = function (this: HeatmapChartModule, _flag?: boolean) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag as boolean;

        return this;
    } as HeatmapChartModule['isLoading'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x=270          Desired height for the chart
     * @return {Number | module}    Current height or Chart module to chain calls
     * @public
     */
    exports.height = function (this: HeatmapChartModule, _x?: number) {
        if (!arguments.length) {
            return height;
        }
        height = _x as number;

        return this;
    } as HeatmapChartModule['height'];

    /**
     * Gets or Sets the isAnimated value of the chart
     * The chart draws without animation when the reader's system asks for
     * reduced motion (`prefers-reduced-motion`), whatever this is set to.
     * @param  {Boolean} _x=false         Decide whether to show chart animation
     * @return {Boolean | module}         Current isAnimated value or Chart module to chain calls
     * @public
     */
    exports.isAnimated = function (this: HeatmapChartModule, _x?: boolean) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x as boolean;

        return this;
    } as HeatmapChartModule['isAnimated'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return {margin | module}    Current margin or Chart module to chain calls
     * @public
     */
    exports.margin = function (
        this: HeatmapChartModule,
        _x?: ChartMarginParams
    ) {
        if (!arguments.length) {
            return margin;
        }
        margin = {
            ...margin,
            ..._x,
        };

        return this;
    } as HeatmapChartModule['margin'];

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove, customMouseOut, and customClick
     *
     * @return {module} Bar Chart
     * @public
     */
    exports.on = function (...args: [string] | [string, () => void]) {
        // Rest parameters and a spread rather than `arguments` and `.apply`.
        // The TypeScript lint override makes `prefer-spread` an error, and the
        // two shapes `on` is called with -- a lookup and a registration -- are
        // exactly what the tuple says.
        const value = dispatcher.on(
            ...(args as Parameters<typeof dispatcher.on>)
        );

        return value === dispatcher ? exports : value;
    } as HeatmapChartModule['on'];

    /**
     * Gets or Sets the y-axis labels of the chart
     * @param  {String[]} _x=['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']     An array of string labels across the y-axis
     * @return {yAxisLabels | module}                                       Current yAxisLabels array or Chart module to chain calls
     * @public
     */
    exports.yAxisLabels = function (this: HeatmapChartModule, _x?: string[]) {
        if (!arguments.length) {
            return yAxisLabels;
        }
        yAxisLabels = _x;

        return this;
    } as HeatmapChartModule['yAxisLabels'];

    /**
     * Gets or Sets the x-axis labels of the chart. With them, `hour` indexes
     * these labels rather than the hours of the day, so together with
     * `yAxisLabels` the heatmap can show any two sets of categories.
     * @param  {String[]} _x=['00h','01h',...,'23h']     An array of string labels across the x-axis
     * @return {xAxisLabels | module}                       Current xAxisLabels array or Chart module to chain calls
     * @public
     */
    exports.xAxisLabels = function (this: HeatmapChartModule, _x?: string[]) {
        if (!arguments.length) {
            return xAxisLabels;
        }
        xAxisLabels = _x;

        return this;
    } as HeatmapChartModule['xAxisLabels'];

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x=780           Desired width for the chart
     * @return {Number | module}         Current width or Chart module to chain calls
     * @public
     */
    exports.width = function (this: HeatmapChartModule, _x?: number) {
        if (!arguments.length) {
            return width;
        }
        width = _x as number;

        return this;
    } as HeatmapChartModule['width'];

    /**
     * Gets or Sets the tooltip the chart shows: a `tooltip()` or a
     * `miniTooltip()`, set on this chart only. The chart connects it to its
     * pointer and keyboard events, draws it in place, and sets the labels its
     * data points need, unless they were set on the tooltip; it does so now
     * if the chart has drawn, and again on every draw. Its event handlers go
     * under the `britechartsTooltip` namespace. Null, or another tooltip,
     * removes the one it had.
     * @param  {module | null} _x  The tooltip to show
     * @return {module | null} Current tooltip or Chart module to chain calls
     * @throws {Error} When the tooltip is already set on another chart
     * @public
     * @example
     * heatmap().tooltip(miniTooltip()).render('#chart', data);
     */
    (exports as HeatmapChartModule).tooltip = function (
        this: HeatmapChartModule,
        _x
    ) {
        if (!arguments.length) {
            return chartTooltip;
        }
        if (_x === chartTooltip) {
            return this;
        }
        if (_x) {
            claimTooltip(this, _x);
        }
        if (chartTooltip) {
            releaseTooltip(this, chartTooltip);
        }
        chartTooltip = _x;

        // A chart that has drawn connects it now rather than on its next draw
        if (chartTooltip && svg) {
            connectTooltip(
                this,
                chartTooltip,
                svg,
                tooltipLabels,
                tooltipDataPoint
            );
        }

        return this;
    } as HeatmapChartModule['tooltip'];

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
     * heatmap().width(600).render('#chart', data);
     */
    (exports as HeatmapChartModule).render = function (
        this: HeatmapChartModule,
        target,
        data
    ) {
        return renderChart(this, target, data);
    } as HeatmapChartModule['render'];

    return exports;
}
