import { extent } from 'd3-array';
import { select, pointer } from 'd3-selection';
import type { BaseType, Selection } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import type { ScaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { dispatch } from 'd3-dispatch';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import { heatmapLoadingMarkup } from '../helpers/load';
import colorHelper from '../helpers/color';
import { hoursHuman, motion } from '../helpers/constants';
import type { ChartMarginParams } from '../../typings/common/margin';
import type {
    HeatmapChartDataShape,
    HeatmapChartModule,
} from '../../typings/charts/heatmap-chart';

/**
 * Reusable Heatmap API module that renders a
 * simple and configurable heatmap chart.
 *
 * @module Heatmap
 * @tutorial heatmap
 * @requires d3-array, d3-selection, d3-scale, d3-interpolate, d3-transition
 *
 * @example
 * let heatmap = heatmap();
 *
 * heatmap
 *     .width(500);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(heatmap);
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
 * The datum and parent generics are the migration plan's bounded `any`, for the
 * reason `filter.ts` set out: `Selection` is invariant in them, and these are
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
    // Split into `let` and `const` rather than left as the one `let` chain the
    // JavaScript had. The TypeScript ESLint override runs `prefer-const` as an
    // error, and ten of these are never reassigned -- only the accessors'
    // targets and the drawing state are. Same treatment as `grid.ts`.
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
        // No default: `drawDayLabels` falls back to `daysHuman`, so reading
        // this accessor before setting it gives undefined, which is what the
        // declaration says.
        yAxisLabels: string[] | undefined,
        dayLabels: Selection<BaseType, string, BaseType, unknown>,
        hourLabels: Selection<BaseType, string, BaseType, unknown>;

    // One statement each rather than a second comma chain: `one-var` asks for
    // that, and the JavaScript never tripped it because everything here was a
    // single `let`.
    const boxBorderSize = 2;
    const boxInitialOpacity = 0.2;
    const boxFinalOpacity = 1;
    const boxInitialColor = '#BBBBBB';
    const boxBorderColor = '#FFFFFF';
    const daysHuman = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const dayLabelWidth = 30;
    const hourLabelHeight = 20;
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
    // the page is for readers. The original's second tag, `@param {HeatmapData}
    // _data`, is gone: `d3.call` passes no second argument and this function has
    // never taken one, which is the same phantom parameter Phase 1 removed from
    // `ChartModuleSelection`.
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
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildScales();
            drawDayLabels();
            drawHourLabels();
            drawBoxes();
        });
        // One assertion for the whole module, because the accessors below are
        // properties assigned onto this function inside the closure and
        // TypeScript does not widen a function's type that way -- its
        // expando-function inference does not reach here, so even
        // `exports.width = ...` is an error without this. Each accessor is then
        // checked against the declaration individually on assignment.
    } as unknown as HeatmapChartModule;

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

        // `.join(',')` where this passed the array itself and let
        // `setAttribute` coerce it. d3's `attr` types its value as a string,
        // number or boolean, so the array needs spelling out -- and `','` is
        // what `Array.prototype.toString` produced, so the attribute is
        // byte-identical to before. A space-separated viewBox renders the same
        // but is not the same string, which is not this commit's call to make.
        svg.attr('viewBox', [0, 0, width, height].join(','))
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
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
        container.append('g').classed('day-labels-group', true);
        container.append('g').classed('hour-labels-group', true);
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
            // `[undefined, undefined]`, which this has always handed straight
            // to `domain()` and which yields a NaN domain. No caller draws an
            // empty heatmap, and preserving that is the conversion's job
            // rather than inventing a meaning for it.
            .domain(extent(data, getValue) as [number, number])
            .interpolate(interpolateHcl);
    }

    /**
     * Returns the sibling box nodes of the given element. d3 v6 dropped
     * the third `nodes` argument that used to be passed to event handlers,
     * so the list is derived from the DOM instead.
     * @param  node  The element the event fired on
     * @return       Its siblings, including itself
     * @private
     */
    function siblingNodes(node: SVGRectElement): SVGRectElement[] {
        // `parentNode` is a `ParentNode`, which d3's `select` does not accept
        // and which the JavaScript passed anyway. The assertion says "this is
        // an element", which for a rect inside the chart group it is.
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

        if (isAnimated) {
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
        // enter selection has no exit groups. Preserved as it stands -- making
        // it `boxes.exit()` would start removing elements that are not being
        // removed today, which is a behaviour change and not this commit's.
        boxElements.exit().remove();
    }

    /**
     * Draws the day labels
     * @private
     */
    function drawDayLabels(): void {
        const dayLabelsGroup = svg.select('.day-labels-group');
        const arrayForYAxisLabels = yAxisLabels || daysHuman;

        dayLabels = svg
            .select('.day-labels-group')
            .selectAll<BaseType, string>('.day-label')
            .data(arrayForYAxisLabels);

        dayLabels
            .enter()
            .append('text')
            .text((label) => label)
            .attr('x', 0)
            .attr('y', (d, i) => i * boxSize)
            .style('text-anchor', 'start')
            .style('dominant-baseline', 'central')
            .attr('class', 'day-label y-axis-label');

        dayLabelsGroup.attr(
            'transform',
            `translate(-${dayLabelWidth}, ${boxSize / 2})`
        );
    }

    /**
     * Draws the hour labels
     * @private
     */
    function drawHourLabels(): void {
        const hourLabelsGroup = svg.select('.hour-labels-group');

        hourLabels = svg
            .select('.hour-labels-group')
            .selectAll<BaseType, string>('.hour-label')
            .data(hoursHuman);

        hourLabels
            .enter()
            .append('text')
            .text((label) => label)
            .attr('y', 0)
            .attr('x', (d, i) => i * boxSize)
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'central')
            .attr('class', 'hour-label');

        hourLabelsGroup.attr(
            'transform',
            `translate(${boxSize / 2}, -${hourLabelHeight})`
        );
    }

    /**
     * `boxList` is unused by every one of these, as it was before: the
     * dispatcher only forwards the datum, the pointer and the chart size. It
     * stays in the signature because `drawBoxes` passes it and removing a
     * parameter is a change of its own.
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
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @public
     */
    exports.exportChart = function (filename: string, title: string) {
        exportChart.call(exports, svg, filename, title);
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
        // Rest parameters and a spread where this read `arguments` and used
        // `.apply`. The TypeScript lint override makes `prefer-spread` an
        // error, and the two shapes `on` is called with -- a lookup and a
        // registration -- are exactly what the tuple says, so this forwards
        // the same arguments it always did.
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

    return exports;
}
