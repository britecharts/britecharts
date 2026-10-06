import { dispatch } from 'd3-dispatch';
import { easeCubicInOut } from 'd3-ease';
import { interpolate } from 'd3-interpolate';
import { scaleOrdinal } from 'd3-scale';
import { pie, arc } from 'd3-shape';
import { select, pointer } from 'd3-selection';
import type { Dispatch } from 'd3-dispatch';
import type { ScaleOrdinal } from 'd3-scale';
import type { BaseType, Selection } from 'd3-selection';
import type { Arc, Pie, PieArcDatum } from 'd3-shape';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import * as textHelper from '../helpers/text';
import colorHelper from '../helpers/color';
import { calculatePercent } from '../helpers/number';
import { emptyDonutData } from '../helpers/constants';
import { donutLoadingMarkup } from '../helpers/load';
import { motion } from '../helpers/constants';
import type { ChartMarginParams } from '../../typings/common/margin';
import type { ColorsSchemasType } from '../../typings/helpers/colors';
import type {
    DonutChartDataShape,
    DonutChartModule,
    DonutEmptyDataConfig,
} from '../../typings/charts/donut-chart';

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are the migration plan's bounded `any`, as in `bullet.ts`: these are
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
 * The datum mid-clean, after the quantity/name coercion and before the
 * percentage pass: `cleanData` sets `percentage` to `d[percentageLabel] ||
 * null` and fills it in on the next map.
 */
type DonutCleanDatum = Omit<DonutChartDataShape, 'percentage'> & {
    percentage: number | null;
};

/**
 * What `cleanData` returns and every drawing function reads.
 *
 * `percentage` is a **string** here, where the published `DonutChartDataShape`
 * declares a number. That is the runtime: `cleanData` ends with
 * `d.percentage = String(...)`, and the default `centeredTextFunction`
 * interpolates it into `${d.percentage}%`. So the datum handed to a consumer's
 * own `centeredTextFunction` has a string in that field while the declaration
 * promises a number -- a real mismatch, left alone here because it changes a
 * published callback's parameter rather than this conversion.
 */
type DonutDatum = Omit<DonutChartDataShape, 'percentage'> & {
    percentage: string;
};

/**
 * One slice, as d3's pie layout produces it, plus the two radii this chart
 * mutates onto the datum itself. `reduceOuterRadius` and the growth tween both
 * write `outerRadius`, and `tweenLoading` writes `innerRadius`, which is how
 * the hover and loading animations work -- the arc generator reads them back
 * off the datum rather than from its own accessors.
 */
type DonutArcDatum = PieArcDatum<DonutDatum> & {
    outerRadius?: number;
    innerRadius?: number;
};

/**
 * A slice's path element -- the thing the hover handlers receive and the thing
 * `initHighlightSlice` picks out.
 *
 * `__data__` is d3's own property: it stores a node's bound datum on the node,
 * and `initHighlightSlice` reads it back that way rather than through a
 * selection, so it is part of how this chart works.
 */
type SliceElement = SVGPathElement & { __data__?: DonutArcDatum };

/**
 * The `g.arc` wrapper each slice sits in, which is what `storeAngle` writes
 * `_current` onto.
 *
 * Nothing reads it. d3's own examples stash the previous angles on the node so
 * the next transition can interpolate from them, and `tweenArc` below is the
 * function that would -- but it is never called, so `storeAngle` and `tweenArc`
 * are a vestigial pair. Preserved rather than removed, since a conversion is
 * the wrong place to delete behaviour, even behaviour that does nothing.
 */
type ArcGroupElement = SVGGElement & { _current?: DonutArcDatum };

/**
 * Reusable Donut Chart API class that renders a
 * simple and configurable donut chart.
 *
 * @module Donut
 * @tutorial donut
 * @requires d3-dispatch, d3-ease, d3-interpolate, d3-scale, d3-shape, d3-selection, d3-transition
 *
 * @example
 * const donutChart = donut();
 *
 * donutChart
 *     .externalRadius(500)
 *     .internalRadius(200);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(donutChart);
 *
 */

/**
 * @typedef DonutChartData
 * @type {Object[]}
 * @property {Number} quantity     Quantity of the group (required)
 * @property {Number} percentage   Percentage of the total (optional)
 * @property {String} name         Name of the group (required)
 * @property {Number} id           Identifier for the group required for legend feature (optional)
 *
 * @example
 * [
 *     {
 *         quantity: 1,
 *         percentage: 50,
 *         name: 'glittering',
 *         id: 1
 *     },
 *     {
 *         quantity: 1,
 *         percentage: 50,
 *         name: 'luminous',
 *         id: 2
 *     }
 * ]
 */
export default function module(): DonutChartModule {
    // Split into `let` and `const` rather than the one `let` chain the
    // JavaScript had: the TypeScript ESLint override runs `prefer-const` as an
    // error, and the bindings below it are never reassigned.
    let margin: ChartMarginParams = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        width = 300,
        height = 300,
        isLoading = false,
        radiusHoverOffset = 12,
        // Reassigned by the `animationDuration` accessor, so it stays a `let`.
        pieDrawingTransitionDuration = motion.duration,
        data: DonutDatum[],
        chartWidth: number,
        chartHeight: number,
        externalRadius = 140,
        internalRadius = 45.5,
        layout: Pie<unknown, DonutDatum>,
        shape: Arc<unknown, DonutArcDatum>,
        slices: ChartSelection<ArcGroupElement>,
        svg: ChartSelection<SVGSVGElement>,
        isAnimated = false,
        isEmpty = false,
        // No default: the chart highlights nothing until an id arrives, which
        // is what the declaration now says.
        highlightedSliceId: number | undefined,
        // A DOM element, not a datum: `initHighlightSlice` assigns it from
        // `.node()` and the hover handlers compare it against `el`.
        highlightedSlice: SliceElement | null,
        hasFixedHighlightedSlice = false,
        hasHoverAnimation = true,
        hasLastHoverSliceHighlighted = false,
        lastHighlightedSlice: SliceElement | null = null,
        emptyDataConfig: DonutEmptyDataConfig = {
            emptySliceColor: '#EFF2F5',
            showEmptySlice: false,
        },
        percentageFormat = '.1f',
        numberFormat: string | undefined,
        hasCenterLegend = true,
        // colors
        colorScale: ScaleOrdinal<string, string>,
        nameToColorMap: Record<string, string> | null = null,
        colorSchema: ColorsSchemasType = colorHelper.colorSchemas.britecharts,
        centeredTextFunction: (d: DonutDatum) => string = (d) =>
            `${d.percentage}% ${d.name}`,
        orderingFunction: (a: DonutDatum, b: DonutDatum) => number = (a, b) =>
            b.quantity - a.quantity;

    const ease = easeCubicInOut;
    const pieHoverTransitionDuration = 150;
    const paddingAngle = 0;
    const legendWidth = externalRadius + internalRadius;
    // Donut exposes no accessor for any of the three, unlike the charts that
    // let the data name its own keys, so all three are constants.
    const quantityLabel = 'quantity';
    const nameLabel = 'name';
    const percentageLabel = 'percentage';

    // utils
    const storeAngle = function (this: ArcGroupElement, d: DonutArcDatum) {
        this._current = d;
    };
    const reduceOuterRadius = (d: DonutArcDatum) => {
        d.outerRadius = externalRadius - radiusHoverOffset;
    };
    const sumValues = (data: DonutCleanDatum[]) =>
        data.reduce((total, d) => d.quantity + total, 0);
    // extractors
    const getQuantity = ({ quantity }: DonutDatum) => quantity;

    const getName = ({ name }: DonutDatum) => name;
    // `buildColorScale` fills `nameToColorMap` before any slice is drawn, so
    // it is non-null everywhere this runs.
    const getSliceFill = ({ data }: DonutArcDatum) =>
        (nameToColorMap as Record<string, string>)[data.name];
    // events
    const dispatcher: Dispatch<object> = dispatch(
        'customMouseOver',
        'customMouseOut',
        'customMouseMove',
        'customClick'
    );

    /**
     * This function creates the graph using the selection as container
     *
     * @param {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {DonutChartData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            DonutChartDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (_data) {
            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);
            data = cleanData(_data);

            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildLayout();
            buildColorScale();
            buildShape();
            drawSlices();
            initTooltip();

            if (highlightedSliceId) {
                initHighlightSlice();
            }
            if (isEmpty && emptyDataConfig.showEmptySlice) {
                drawEmptySlice();
            }
        });
    }

    /**
     * Builds color scale for chart, if any colorSchema was defined
     * @private
     */
    function buildColorScale(): void {
        if (colorSchema) {
            colorScale = scaleOrdinal<string, string>().range(colorSchema);

            nameToColorMap =
                nameToColorMap ||
                colorScale
                    .domain(data.map(getName))
                    .domain()
                    .reduce<Record<string, string>>((memo, item) => {
                        memo[item] = colorScale(item);

                        return memo;
                    }, {});
        }
    }

    /**
     * Builds containers for the chart, the legend and a wrapper for all of them
     * @private
     */
    function buildContainerGroups(): void {
        const container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('chart-group', true);
        container.append('g').classed('legend-group', true);
    }

    /**
     * Builds the pie layout that will produce data ready to draw
     * @private
     */
    function buildLayout(): void {
        layout = pie<DonutDatum>()
            .padAngle(paddingAngle)
            .value(getQuantity)
            .sort(orderingFunction);
    }

    /**
     * Builds the shape function
     * @private
     */
    function buildShape(): void {
        shape = arc<DonutArcDatum>()
            .innerRadius(internalRadius)
            .padRadius(externalRadius);
    }

    /**
     * Builds the SVG element that will contain the chart
     *
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element): void {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart donut-chart', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Cleaning data casting the quantities, names and percentages to the proper type while keeping
     * the rest of properties on the data. It also calculates the percentages if not present.
     * @param  {DonutChartData} data    Data as passed to the container
     * @return {DonutChartData}         Clean data with percentages
     * @private
     */
    function cleanData(data: DonutChartDataShape[]): DonutDatum[] {
        const cleanData = data.reduce<DonutCleanDatum[]>((acc, d) => {
            // Skip data without quantity
            if (d[quantityLabel] === undefined || d[quantityLabel] === null) {
                return acc;
            }

            // Read through `d`, which is typed as the input, and write through
            // the mid-clean view of the same object.
            const datum = d as unknown as DonutCleanDatum;

            datum.quantity = +d[quantityLabel];
            datum.name = String(d[nameLabel]);
            datum.percentage = d[percentageLabel] || null;

            return [...acc, datum];
        }, []);

        const totalQuantity = sumValues(cleanData);

        if (totalQuantity === 0 && emptyDataConfig.showEmptySlice) {
            isEmpty = true;
        }

        return cleanData.map((d) => {
            const datum = d as unknown as DonutDatum;

            datum.percentage = String(
                d.percentage ||
                    calculatePercent(
                        d[quantityLabel],
                        totalQuantity,
                        percentageFormat
                    )
            );

            return datum;
        });
    }

    /**
     * Cleans any value that could be on the legend text element
     * @private
     */
    function cleanLegend(): void {
        svg.select('.donut-text').text('');
    }

    /**
     * Cleans the loading state
     * @private
     */
    function cleanLoadingState(): void {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Draw an empty slice
     * @private
     */
    function drawEmptySlice(): void {
        if (slices) {
            svg.selectAll('g.arc').remove();
        }
        slices = svg
            .select('.chart-group')
            .selectAll<ArcGroupElement, DonutArcDatum>('g.arc')
            // `emptyDonutData` is the placeholder slice pair from `constants`,
            // whose `percentage` is a number where a cleaned datum's is a
            // string. It never reaches `centeredTextFunction`, which is the
            // only thing that reads the field.
            .data(layout(emptyDonutData as unknown as DonutDatum[]));

        const newSlices = slices
            .enter()
            .append('g')
            .each(storeAngle)
            .each(reduceOuterRadius)
            .classed('arc', true)
            .append('path');

        newSlices
            .merge(
                // The enter selection holds the appended paths while `slices`
                // holds their `g` wrappers. Merging across the two element
                // types is what this chart has always done; d3 only cares that
                // the groups line up.
                slices as unknown as ChartSelection<SVGPathElement>
            )
            .attr('fill', emptyDataConfig.emptySliceColor)
            .attr('d', shape)
            .transition()
            .ease(ease)
            .duration(pieDrawingTransitionDuration)
            .attrTween('d', tweenLoading);

        slices.exit().remove();
    }

    /**
     * Draws the values on the donut slice inside the text element
     *
     * @param  {Object} obj Data object
     * @private
     */
    function drawLegend(obj: DonutArcDatum): void {
        if (obj.data && hasCenterLegend) {
            svg.select('.donut-text')
                .text(() => centeredTextFunction(obj.data))
                .attr('dy', '.2em')
                .attr('text-anchor', 'middle');

            svg.select('.donut-text').call(wrapText, legendWidth);
        }
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState(): void {
        svg.select('.loading-state-group').html(donutLoadingMarkup);
    }

    /**
     * Draws the slices of the donut
     * @private
     */
    function drawSlices(): void {
        // Not ideal, we need to figure out how to call exit for nested elements
        if (slices) {
            svg.selectAll('g.arc').remove();
        }

        slices = svg
            .select('.chart-group')
            .selectAll<ArcGroupElement, DonutArcDatum>('g.arc')
            .data(layout(data));

        const newSlices = slices
            .enter()
            .append('g')
            .each(storeAngle)
            .each(reduceOuterRadius)
            .classed('arc', true)
            .append('path');

        if (isAnimated) {
            newSlices
                .merge(
                    // The enter selection holds the appended paths while `slices`
                    // holds their `g` wrappers. Merging across the two element
                    // types is what this chart has always done; d3 only cares that
                    // the groups line up.
                    slices as unknown as ChartSelection<SVGPathElement>
                )
                .attr('fill', getSliceFill)
                .on('mouseover', function (event, d) {
                    handleMouseOver(this, d, chartWidth, chartHeight, event);
                })
                .on('mousemove', function (event, d) {
                    handleMouseMove(this, d, chartWidth, chartHeight, event);
                })
                .on('mouseout', function (event, d) {
                    handleMouseOut(this, d, chartWidth, chartHeight, event);
                })
                .on('click', function (event, d) {
                    handleClick(this, d, chartWidth, chartHeight, event);
                })
                .transition()
                .ease(ease)
                .duration(pieDrawingTransitionDuration)
                .attrTween('d', tweenLoading);
        } else {
            newSlices
                .merge(
                    // The enter selection holds the appended paths while `slices`
                    // holds their `g` wrappers. Merging across the two element
                    // types is what this chart has always done; d3 only cares that
                    // the groups line up.
                    slices as unknown as ChartSelection<SVGPathElement>
                )
                .attr('fill', getSliceFill)
                .attr('d', shape)
                .on('mouseover', function (event, d) {
                    handleMouseOver(this, d, chartWidth, chartHeight, event);
                })
                .on('mousemove', function (event, d) {
                    handleMouseMove(this, d, chartWidth, chartHeight, event);
                })
                .on('mouseout', function (event, d) {
                    handleMouseOut(this, d, chartWidth, chartHeight, event);
                })
                .on('click', function (event, d) {
                    handleClick(this, d, chartWidth, chartHeight, event);
                });
        }

        slices.exit().remove();
    }

    /**
     * Checks if the given element id is the same as the highlightedSliceId and returns the
     * element if that's the case
     * @param  {DOMElement} options.data Dom element to check
     * @return {DOMElement}              Dom element if it has the same id
     */
    function filterHighlightedSlice(
        this: SliceElement,
        { data }: DonutArcDatum
    ): SliceElement | undefined {
        // Returns the element rather than a boolean, which is what `.select()`
        // takes: a function giving the descendant to select, or nothing. The
        // JSDoc above has always said so.
        if (data.id === highlightedSliceId) {
            return this;
        }

        return undefined;
    }

    /**
     * Handles a path mouse over
     * @return {void}
     * @private
     */
    function handleMouseOver(
        el: SliceElement,
        d: DonutArcDatum,
        chartWidth: number,
        chartHeight: number,
        event: MouseEvent
    ): void {
        drawLegend(d);
        dispatcher.call('customMouseOver', el, d, pointer(event, el), [
            chartWidth,
            chartHeight,
        ]);

        if (hasHoverAnimation) {
            // if the hovered slice is not the same as the last slice hovered
            // after mouseout event, then shrink the last slice that was highlighted
            if (lastHighlightedSlice && el !== lastHighlightedSlice) {
                tweenGrowth(
                    lastHighlightedSlice,
                    externalRadius - radiusHoverOffset,
                    pieHoverTransitionDuration
                );
            }
            if (highlightedSlice && el !== highlightedSlice) {
                tweenGrowth(
                    highlightedSlice,
                    externalRadius - radiusHoverOffset
                );
            }
            tweenGrowth(el, externalRadius);
        }
    }

    /**
     * Handles a path mouse move
     * @return {void}
     * @private
     */
    function handleMouseMove(
        el: SliceElement,
        d: DonutArcDatum,
        chartWidth: number,
        chartHeight: number,
        event: MouseEvent
    ): void {
        dispatcher.call('customMouseMove', el, d, pointer(event, el), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Handles a path mouse out
     * @return {void}
     * @private
     */
    function handleMouseOut(
        el: SliceElement,
        d: DonutArcDatum,
        chartWidth: number,
        chartHeight: number,
        event: MouseEvent
    ): void {
        cleanLegend();

        // When there is a fixed highlighted slice,
        // we will always highlight it and render legend
        if (
            highlightedSlice &&
            hasFixedHighlightedSlice &&
            !hasLastHoverSliceHighlighted
        ) {
            drawLegend(highlightedSlice.__data__ as DonutArcDatum);
            tweenGrowth(highlightedSlice, externalRadius);
        }

        // When the current slice is not the highlighted, or there isn't a fixed highlighted slice and it is the highlighted
        // we will shrink the slice
        if (
            el !== highlightedSlice ||
            (!hasFixedHighlightedSlice && el === highlightedSlice)
        ) {
            tweenGrowth(
                el,
                externalRadius - radiusHoverOffset,
                pieHoverTransitionDuration
            );
        }

        if (hasLastHoverSliceHighlighted) {
            drawLegend(el.__data__ as DonutArcDatum);
            tweenGrowth(el, externalRadius);
            lastHighlightedSlice = el;
        }

        dispatcher.call('customMouseOut', el, d, pointer(event, el), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Handles a path click
     * @return {void}
     * @private
     */
    function handleClick(
        el: SliceElement,
        d: DonutArcDatum,
        chartWidth: number,
        chartHeight: number,
        event: MouseEvent
    ): void {
        dispatcher.call('customClick', el, d, pointer(event, el), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Find the slice by id and growth it if needed
     * @private
     */
    function initHighlightSlice(): void {
        highlightedSlice = svg
            .selectAll<SliceElement, DonutArcDatum>('.chart-group .arc path')
            // d3 types `.select(fn)` as returning an element rather than
            // "element or nothing", while its implementation skips a node the
            // function declines. That is what this filter relies on.
            .select(
                filterHighlightedSlice as unknown as (
                    this: SliceElement,
                    d: DonutArcDatum
                ) => SliceElement
            )
            .node();

        if (highlightedSlice) {
            drawLegend(highlightedSlice.__data__ as DonutArcDatum);
            tweenGrowth(
                highlightedSlice,
                externalRadius,
                pieDrawingTransitionDuration
            );
        }
    }

    /**
     * Creates the text element that will hold the legend of the chart
     */
    function initTooltip(): void {
        svg.select('.legend-group').append('text').attr('class', 'donut-text');
    }

    /**
     * Stores current angles and interpolates with new angles
     * Check out {@link http://bl.ocks.org/mbostock/1346410| this example}
     *
     * @param  {Object}     a   New data for slice
     * @return {Function}       Tweening function for the donut shape
     * @private
     */
    function tweenArc(this: ArcGroupElement, a: DonutArcDatum) {
        const i = interpolate(this._current, a);

        this._current = i(0);

        return function (t: number) {
            return shape(i(t));
        };
    }

    /**
     * Animate slice with tweens depending on the attributes given
     *
     * @param  {DOMElement} slice   Slice to growth
     * @param  {Number} outerRadius Final outer radius value
     * @param  {Number} delay       Delay of animation
     * @private
     */
    function tweenGrowth(
        slice: SliceElement,
        outerRadius: number,
        delay = 0
    ): void {
        // The datum generic has to be named: `select(node)` on its own leaves
        // it `unknown`, and the tween below reads `outerRadius` off it.
        select<SliceElement, DonutArcDatum>(slice)
            .transition()
            .delay(delay)
            .attrTween('d', function (d: DonutArcDatum) {
                // `outerRadius` is optional on the datum because the chart
                // writes it rather than the layout, and `reduceOuterRadius`
                // has always run before this tween.
                const i = interpolate(d.outerRadius as number, outerRadius);

                return (t: number) => {
                    d.outerRadius = i(t);

                    return shape(d) as string;
                };
            });
    }

    /**
     * Animation for chart loading
     * Check out {@link http://bl.ocks.org/mbostock/4341574| this example}
     *
     * @param  {Object} b   Data point
     * @return {Function}   Tween function
     * @private
     */
    function tweenLoading(b: DonutArcDatum) {
        b.innerRadius = 0;

        const i = interpolate({ startAngle: 0, endAngle: 0 }, b);

        return function (t: number) {
            return shape(i(t)) as string;
        };
    }

    /**
     * Utility function that wraps a text into the given width
     *
     * @param  {D3Selection} text       Text to write
     * @param  {Number} legendWidth     Width of the container
     * @private
     */
    function wrapText(
        // A selection, despite the name: the body calls `text.node()`.
        text: ChartSelection<BaseType>,
        legendWidth: number
    ): void {
        const fontSize = externalRadius / 5;

        textHelper.wrapText.call(null, 0, fontSize, legendWidth, text.node());
    }

    // API
    /**
     * Gets or Sets the duration of the animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).animationDuration = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return pieDrawingTransitionDuration;
        }
        pieDrawingTransitionDuration = _x;

        return this;
    } as DonutChartModule['animationDuration'];

    /**
     * Gets or Sets the centeredTextFunction of the chart. If function is provided
     * the format will be changed by the custom function's value format.
     * The default format function value is "${d.percentage}% ${d.name}".
     * The callback will provide the data object with id, name, percentage, and quantity.
     * Also provides the component added by the user in each data entry.
     * @param  {Function} _x        Custom function that returns a formatted string
     * @return {Function | module}  Current centeredTextFunction or Chart module to chain calls
     * @public
     * @example donutChart.centeredTextFunction(d => `${d.id} ${d.quantity}`)
     */
    (exports as DonutChartModule).centeredTextFunction = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return centeredTextFunction;
        }
        // The declaration types the callback against `DonutChartDataShape`,
        // whose `percentage` is a number, while the datum this chart hands it
        // has the string `cleanData` produced. That mismatch is the deferred
        // finding noted on `DonutDatum`; the cast is where it surfaces.
        centeredTextFunction = _x as unknown as (d: DonutDatum) => string;

        return this;
    } as DonutChartModule['centeredTextFunction'];

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {number | module}     Current colorMap or Chart module to chain calls
     * @example stackedBar.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
     * @public
     */
    (exports as DonutChartModule).colorMap = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return nameToColorMap;
        }
        nameToColorMap = _x;

        return this;
    } as DonutChartModule['colorMap'];

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {String[]} _x        Desired colorSchema for the graph
     * @return { String | module}   Current colorSchema or Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).colorSchema = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as DonutChartModule['colorSchema'];

    /**
     * Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity
     * adds up to zero or there are no entries), the chart will render an empty slice
     * with a given color (light gray by default)
     * @param  {Object} _x          EmptyDataConfig object to get/set
     * @return { Object | module}   Current config for when chart data is an empty array
     * @public
     * @example donutChart.emptyDataConfig({showEmptySlice: true, emptySliceColor: '#000000'})
     */
    (exports as DonutChartModule).emptyDataConfig = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return emptyDataConfig;
        }
        emptyDataConfig = _x;

        return this;
    } as DonutChartModule['emptyDataConfig'];

    /**
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as DonutChartModule).exportChart = function (filename, title) {
        // The module, not the bare function: `exportChart` needs `this` to
        // answer `width()`, `height()` and `margin()`.
        return exportChart.call(
            exports as DonutChartModule,
            svg,
            filename,
            title
        );
    } as DonutChartModule['exportChart'];

    /**
     * Gets or Sets the externalRadius of the chart
     * @param  {Number} _x              ExternalRadius number to get/set
     * @return { (Number | Module) }    Current externalRadius or Donut Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).externalRadius = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return externalRadius;
        }
        externalRadius = _x;

        return this;
    } as DonutChartModule['externalRadius'];

    /**
     * Gets or Sets the hasCenterLegend property of the chart, making it display
     * legend at the center of the donut.
     *
     * @param  {boolean} _x         If we want to show legent at the center of the donut
     * @return {boolean | Module}   Current hasCenterLegend flag or Chart module
     * @public
     */
    (exports as DonutChartModule).hasCenterLegend = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return hasCenterLegend;
        }
        hasCenterLegend = _x;

        return this;
    } as DonutChartModule['hasCenterLegend'];

    /**
     * Gets or Sets the hasHoverAnimation property of the chart. By default,
     * donut chart highlights the hovered slice. This property explicitly
     * disables this hover behavior.
     * @param  {boolean} _x         Decide whether hover slice animation should be enabled
     * @return {boolean | module}   Current hasHoverAnimation flag or Chart module
     * @public
     */
    (exports as DonutChartModule).hasHoverAnimation = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return hasHoverAnimation;
        }
        hasHoverAnimation = _x;

        return this;
    } as DonutChartModule['hasHoverAnimation'];

    /**
     * Gets or Sets the hasFixedHighlightedSlice property of the chart, making it to
     * highlight the selected slice id set with `highlightSliceById` all the time.
     *
     * @param  {boolean} _x         If we want to make the highlighted slice permanently highlighted
     * @return {boolean | module}   Current hasFixedHighlightedSlice flag or Chart module
     * @public
     */
    (exports as DonutChartModule).hasFixedHighlightedSlice = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return hasFixedHighlightedSlice;
        }
        hasFixedHighlightedSlice = _x;

        return this;
    } as DonutChartModule['hasFixedHighlightedSlice'];

    /**
     * Gets or sets the hasLastHoverSliceHighlighted property.
     * If property is true, the last hovered slice will be highlighted
     * after 'mouseout` event is triggered. The last hovered slice will remain
     * in highlight state.
     * Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted
     * are true, the latter property will override the former.
     * @param {boolean} _x          Decide whether the last hovered slice should be highlighted
     * @return {boolean | module}   Current hasLastHoverSliceHighlighted value or Chart module
     * @public
     */
    (exports as DonutChartModule).hasLastHoverSliceHighlighted = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return hasLastHoverSliceHighlighted;
        }
        hasLastHoverSliceHighlighted = _x;

        return this;
    } as DonutChartModule['hasLastHoverSliceHighlighted'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x              Desired width for the graph
     * @return { (Number | Module) }    Current height or Donut Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).height = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as DonutChartModule['height'];

    /**
     * Gets or Sets the id of the slice to highlight
     * @param  {Number} _x              Slice id
     * @return { (Number | Module) }    Current highlighted slice id or Donut Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).highlightSliceById = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return highlightedSliceId;
        }
        highlightedSliceId = _x;

        return this;
    } as DonutChartModule['highlightSliceById'];

    /**
     * Gets or Sets the internalRadius of the chart
     * @param  {Number} _x              InternalRadius number to get/set
     * @return { (Number | Module) }    Current internalRadius or Donut Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).internalRadius = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return internalRadius;
        }
        internalRadius = _x;

        return this;
    } as DonutChartModule['internalRadius'];

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * By default this is 'false'
     *
     * @param  {Boolean} _x             Desired animation flag
     * @return { Boolean | module}      Current isAnimated flag or Chart module
     * @public
     */
    (exports as DonutChartModule).isAnimated = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    } as DonutChartModule['isAnimated'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).isLoading = function (
        this: DonutChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as DonutChartModule['isLoading'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x              Margin object to get/set
     * @return { (Object | Module) }    Current margin or Donut Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).margin = function (
        this: DonutChartModule,
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
    } as DonutChartModule['margin'];

    /**
     * Gets or Sets the number format of the donut chart
     * @param  {string} _x          Desired numberFormat for the chart. See examples [here]{@link https://d3js.org/d3-format}
     * @return {string | module}    Current numberFormat or Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).numberFormat = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as DonutChartModule['numberFormat'];

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove, customMouseOut and customClick
     *
     * @return {module} Bar Chart
     * @public
     */
    (exports as DonutChartModule).on = function (
        ...args: [string] | [string, () => void]
    ) {
        // Rest parameters and a spread where this read `arguments` and used
        // `.apply`, following `heatmap.ts`: the TypeScript lint override makes
        // `prefer-spread` an error, and the two shapes `on` is called with --
        // a lookup and a registration -- are exactly what the tuple says.
        const value = dispatcher.on(
            ...(args as Parameters<typeof dispatcher.on>)
        );

        return value === dispatcher ? exports : value;
    } as unknown as DonutChartModule['on'];

    /**
     * Changes the order of items given custom function
     * @param  {Function} _x              A custom function that sets logic for ordering
     * @return { (Function | Module) }    Void function with no return
     * @public
     */
    (exports as DonutChartModule).orderingFunction = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return orderingFunction;
        }
        orderingFunction = _x as unknown as (
            a: DonutDatum,
            b: DonutDatum
        ) => number;

        return this;
    } as DonutChartModule['orderingFunction'];

    /**
     * Gets or Sets the percentage format for the percentage label
     * @param  {String} _x              Format for the percentage label (e.g. '.1f')
     * @return { (Number | Module) }    Current format or Donut Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).percentageFormat = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return percentageFormat;
        }
        percentageFormat = _x;

        return this;
    } as DonutChartModule['percentageFormat'];

    /**
     * Gets or Sets the radiusHoverOffset of the chart
     * @param  {Number} _x              Desired offset for the hovered slice
     * @return { (Number | Module) }    Current offset or Donut Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).radiusHoverOffset = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return radiusHoverOffset;
        }
        radiusHoverOffset = _x;

        return this;
    } as DonutChartModule['radiusHoverOffset'];

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x              Desired width for the graph
     * @return { (Number | Module) }    Current width or Donut Chart module to chain calls
     * @public
     */
    (exports as DonutChartModule).width = function (
        this: DonutChartModule,
        _x
    ) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as DonutChartModule['width'];

    return exports as unknown as DonutChartModule;
}
