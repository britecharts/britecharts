import { sum, range, permute, rollups } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { color } from 'd3-color';
import { dispatch } from 'd3-dispatch';
import * as d3Format from 'd3-format';
import { easeQuadInOut } from 'd3-ease';
import { interpolateNumber, interpolateRound } from 'd3-interpolate';
import { scaleOrdinal, scaleBand, scaleLinear } from 'd3-scale';
import { stack, stackOffsetDiverging } from 'd3-shape';
import { select, pointer } from 'd3-selection';
import type { Axis, AxisDomain } from 'd3-axis';
import type { Dispatch } from 'd3-dispatch';
import type { FormatLocaleObject } from 'd3-format';
import type { ScaleOrdinal } from 'd3-scale';
import type { BaseType, Selection } from 'd3-selection';
import type { Series, SeriesPoint } from 'd3-shape';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import { getValueDomain } from '../helpers/domain';
import { dataKeyDeprecationMessage } from '../helpers/project';
import { isDefined } from '../helpers/type';
import colorHelper from '../helpers/color';
import { barLoadingMarkup } from '../helpers/load';
import { setDefaultLocale } from '../helpers/locale';
import { motion } from '../helpers/constants';
import { gridHorizontal, gridVertical } from '../helpers/grid';
import { asCategoryScale, asValueScale } from '../helpers/scale';
import type { AxisScale } from '../helpers/scale';
import type { GridTypes } from '../../typings/common/grid';
import type { LocalObject } from '../../typings/common/local';
import type { ChartMarginParams } from '../../typings/common/margin';
import type { ColorsSchemasType } from '../../typings/helpers/colors';
import type {
    StackedBarChartDataShape,
    StackedBarChartModule,
} from '../../typings/charts/stacked-bar-chart';

const PERCENTAGE_FORMAT = '%';
const NUMBER_FORMAT = ',f';
const uniq = <T>(arrArg: T[]) =>
    arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are the migration plan's bounded `any`, as in grouped-bar.ts: these
 * are module-level variables reassigned from several differently-shaped
 * selections, so naming one concrete datum would reject the others.
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
 * What `cleanData` hands the drawing functions. The index signature is the
 * deprecated `nameLabel`/`valueLabel`/`stackLabel` accessors: they let the data
 * carry those three values under any key, so the reads in `cleanData` and
 * `prepareData` really are dynamic.
 *
 * `topicName` is `cleanData`'s own addition, a copy of the stack under the name
 * the tooltip reads, and it is not part of the published data shape.
 */
type StackedBarDatum = StackedBarChartDataShape & {
    topicName: string;
    [key: string]: unknown;
};

/**
 * One column, as `prepareData` builds it: a key naming it, the total across its
 * stacks, every stack's value as its own member, and the entries themselves
 * under `values` for the tooltip.
 *
 * The numeric index signature is what `d3.stack()` reads: it looks each key up
 * on the column, so the members have to be numbers as far as the layout is
 * concerned. `key` and `values` are the two that are not, which is why this is
 * the shape the stack generator is parameterised with rather than a plain
 * `Record<string, number>`.
 */
type StackedBarColumn = {
    key: string;
    total: number;
    values: StackedBarDatum[];
    [stackName: string]: unknown;
};

/**
 * One stacked segment: the `[lower, upper]` pair d3's stack produces, carrying
 * the column it came from as `data`.
 */
type StackedBarPoint = SeriesPoint<StackedBarColumn>;

/**
 * Stacked Area Chart reusable API module that allows us
 * rendering a multi area and configurable chart.
 *
 * @module Stacked-bar
 * @tutorial stacked-bar
 * @requires d3-array, d3-axis, d3-color, d3-collection, d3-dispatch, d3-ease,
 *  d3-interpolate, d3-scale, d3-shape, d3-selection, d3-transition
 *
 * @example
 * let stackedBar = stackedBar();
 *
 * stackedBar
 *     .width(containerWidth);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset.data)
 *     .call(stackedBar);
 *
 */

/**
 * @typdef D3Layout
 * @type function
 */

/**
 * @typedef StackedBarData
 * @type {Object[]}
 * @property {String} name         Name of the entry
 * @property {String} stack        Stack of the entry
 * @property {Number} value        Value of the entry
 *
 * @example
 * [
 *     {
 *         name: "2011-01",
 *         stack: "Direct",
 *         value: 0
 *     }
 * ]
 */
export default function module(): StackedBarChartModule {
    // Split into `let` and `const` rather than the one `let` chain the
    // JavaScript had: the TypeScript ESLint override runs `prefer-const` as an
    // error, and the bindings below it are never reassigned.
    let margin: ChartMarginParams = {
            top: 40,
            right: 30,
            bottom: 60,
            left: 70,
        },
        width = 960,
        height = 500,
        isLoading = false,
        xScale: AxisScale,
        xAxis: Axis<AxisDomain>,
        yScale: AxisScale,
        yAxis: Axis<AxisDomain>,
        betweenBarsPadding = 0.1,
        locale: LocalObject | null = null,
        // The d3-format namespace to start with, replaced by a locale-specific
        // formatter once `valueLocale` is set. Both carry `format`, which is
        // all `buildAxis` reads off it.
        localeFormatter: FormatLocaleObject = d3Format,
        yTicks = 5,
        xTicks = 5,
        // Set and read by its own accessor and by nothing else in the chart.
        // Vestigial, like the donut's `tweenArc` pair: preserved because
        // removing a published accessor is a breaking change and not a thing a
        // conversion decides.
        percentageAxisToMaxRatio = 1,
        colorSchema: ColorsSchemasType = colorHelper.colorSchemas.britecharts,
        nameToColorMap: Record<string, string> | null = null,
        // Whether the pointer is over one of the bars (not the empty space
        // of the chart), which is when the tooltip events are dispatched
        isPointerOverBars = false,
        colorScale: ScaleOrdinal<string, string>,
        layers: Series<StackedBarColumn, string>[],
        isHorizontal = false,
        svg: ChartSelection<SVGSVGElement>,
        chartWidth: number,
        chartHeight: number,
        data: StackedBarDatum[],
        transformedData: StackedBarColumn[],
        stacks: string[],
        layerElements: ChartSelection<SVGGElement>,
        hasReversedStacks = false,
        tooltipThreshold = 480,
        // No default: the chart appends no label element until one is set,
        // which is what the declaration now says.
        yAxisLabel: string | undefined,
        yAxisLabelEl: ChartSelection<SVGTextElement>,
        yAxisLabelOffset = -60,
        animationDuration = motion.duration,
        animationDelays: number[],
        grid: GridTypes | null = null,
        nameLabel = 'name',
        valueLabel = 'value',
        stackLabel = 'stack',
        numberFormat = NUMBER_FORMAT,
        isAnimated = false;

    const yTickTextYOffset = -8;
    const yTickTextXOffset = -20;
    const ease = easeQuadInOut;
    const xAxisPadding = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    };
    const barOpacity = 0.24;
    const animationDelayStep = 20;
    // getters
    /**
     * The colour a stack's layer is filled with.
     *
     * `buildScales` fills `nameToColorMap` before anything is drawn, so it is
     * non-null everywhere this is reached -- the same reasoning, and the same
     * shape, as `colorForGroup` in grouped-bar.ts.
     */
    const colorForStack = (stackName: string) =>
        (nameToColorMap as Record<string, string>)[stackName];
    const getName = (data: StackedBarDatum) => data[nameLabel] as string;
    const getValue = (data: StackedBarDatum) => data[valueLabel] as number;
    const getStack = (data: StackedBarDatum) => data[stackLabel] as string;
    const getValOrDefaultToZero = (val: number) => (isNaN(val) ? 0 : val);
    // events
    const dispatcher: Dispatch<object> = dispatch(
        'customMouseOver',
        'customMouseOut',
        'customMouseMove',
        'customClick'
    );

    /**
     * This function creates the graph using the selection and data provided
     * @param {D3Selection} _selection A d3 selection that represents
     * the container(s) where the chart(s) will be rendered
     * @param {StackedBarData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            StackedBarChartDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        if (locale) {
            localeFormatter = setDefaultLocale(locale);
        }

        _selection.each(function (_data) {
            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);
            data = cleanData(_data);

            prepareData(data);
            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildLayers();
            buildScales();
            drawGridLines();
            buildAxis(localeFormatter);
            drawAxis();
            drawStackedBar();
            addMouseEvents();
        });
    }

    /**
     * Adds events to the container group if the environment is not mobile
     * Adding: mouseover, mouseout and mousemove
     */
    function addMouseEvents() {
        if (shouldShowTooltip()) {
            // Listen on the svg, not on `.chart-group`: a <g> has no geometry
            // of its own, so it only receives events where its children are --
            // the gaps between bars and the empty space above them would be dead.
            // This is also the node getMousePosition measures against.
            svg.on('mouseenter', function (event, d) {
                handleMouseOver(this, d, event);
            })
                .on('mouseleave', function (event, d) {
                    handleMouseOut(this, d, event);
                })
                .on('mousemove', function (event, d) {
                    handleMouseMove(this, d, event);
                })
                .on('click', function (event, d) {
                    handleClick(this, d, event);
                });
        }

        svg.selectAll<SVGRectElement, unknown>('.bar')
            .on('mouseover', handleBarsMouseOver)
            .on('mouseout', handleBarsMouseOut);
    }

    /**
     * Adjusts the position of the y axis' ticks
     * @param  {D3Selection} selection Y axis group
     * @return void
     */
    function adjustYTickLabels(selection: ChartSelection<SVGGElement>) {
        selection
            .selectAll('.tick text')
            .attr(
                'transform',
                `translate(${yTickTextXOffset}, ${yTickTextYOffset})`
            );
    }

    /**
     * Creates the d3 x and y axis, setting orientations
     * @private
     */
    function buildAxis(locale: FormatLocaleObject) {
        if (isHorizontal) {
            xAxis = axisBottom(xScale).ticks(
                xTicks,
                locale.format(numberFormat)
            );
            yAxis = axisLeft(yScale);
        } else {
            xAxis = axisBottom(xScale);
            yAxis = axisLeft(yScale).ticks(yTicks, locale.format(numberFormat));
        }
    }

    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * NOTE: The order of drawing of this group elements is really important,
     * as everything else will be drawn on top of them
     * @private
     */
    function buildContainerGroups() {
        const container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${margin.left},${margin.top})`);

        svg.append('g').classed('loading-state-group', true);

        container
            .append('g')
            .classed('x-axis-group', true)
            .append('g')
            .classed('x axis', true);
        container.append('g').classed('y-axis-group axis', true);
        container.append('g').classed('grid-lines-group', true);
        container.append('g').classed('chart-group', true);
        container.append('g').classed('y-axis-label', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Builds the stacked layers layout
     * @return {D3Layout} Layout for drawing the chart
     * @private
     */
    function buildLayers() {
        const stack3 = stack<StackedBarColumn, string>()
            .keys(stacks)
            .offset(stackOffsetDiverging);
        const dataInitial = transformedData.map((item) => {
            const ret: Record<string, unknown> = {};

            stacks.forEach((key) => {
                ret[key] = item[key];
            });

            return Object.assign({}, item, ret);
        });

        layers = stack3(dataInitial);
    }

    /**
     * Creates the x, y and color scales of the chart
     * @private
     */
    function buildScales() {
        const valueDomain = getValueAxisDomain();

        if (isHorizontal) {
            xScale = scaleLinear()
                .domain(valueDomain)
                .rangeRound([0, chartWidth - 1]);
            // 1 pix for edge tick

            yScale = scaleBand()
                .domain(data.map(getName))
                .rangeRound([chartHeight, 0])
                .padding(betweenBarsPadding);
        } else {
            xScale = scaleBand()
                .domain(data.map(getName))
                .rangeRound([0, chartWidth])
                .padding(betweenBarsPadding);

            yScale = scaleLinear()
                .domain(valueDomain)
                .rangeRound([chartHeight, 0])
                .nice();
        }

        colorScale = scaleOrdinal<string, string>()
            .range(colorSchema)
            .domain(data.map(getStack));

        nameToColorMap =
            nameToColorMap ||
            colorScale
                .domain(data.map(getStack))
                .domain()
                .reduce<Record<string, string>>((memo, item) => {
                    memo[item] = colorScale(item);

                    return memo;
                }, {});
    }

    /**
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element) {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart stacked-bar', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Cleaning data casting the values, stacks, names and topic names to the proper type while keeping
     * the rest of properties on the data
     * @param  {StackedBarData} originalData   Raw data from the container
     * @return {StackedBarData}                Parsed data with values and dates
     * @private
     */
    function cleanData(originalData: StackedBarChartDataShape[]) {
        return originalData.reduce<StackedBarDatum[]>((acc, datum) => {
            // Written onto the caller's own objects rather than copies, which
            // is the runtime this preserves. The cast covers the reads the
            // label accessors make dynamic -- the data may carry its value,
            // stack and name under any key -- and `topicName`, which is this
            // function's own addition for the tooltip.
            const d = datum as StackedBarDatum;

            d.value = +(d[valueLabel] as number);
            d.stack = d[stackLabel] as string;

            // for tooltip
            d.topicName = d[stackLabel] as string;
            d.name = d[nameLabel] as string;

            return [...acc, d];
        }, []);
    }

    /**
     * Cleans the loading state
     * @private
     */
    function cleanLoadingState() {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Draws the x and y axis on the svg object within their
     * respective groups
     * @private
     */
    function drawAxis() {
        if (isHorizontal) {
            svg.select<SVGGElement>('.x-axis-group .axis.x')
                .attr('transform', `translate( 0, ${chartHeight} )`)
                .call(xAxis);

            svg.select<SVGGElement>('.y-axis-group.axis')
                .attr('transform', `translate( ${-xAxisPadding.left}, 0)`)
                .call(yAxis);
        } else {
            svg.select<SVGGElement>('.x-axis-group .axis.x')
                .attr('transform', `translate( 0, ${chartHeight} )`)
                .call(xAxis);

            svg.select<SVGGElement>('.y-axis-group.axis')
                .attr('transform', `translate( ${-xAxisPadding.left}, 0)`)
                .call(yAxis)
                .call(adjustYTickLabels);
        }

        if (yAxisLabel) {
            if (yAxisLabelEl) {
                svg.selectAll('.y-axis-label-text').remove();
            }

            yAxisLabelEl = svg
                .select('.y-axis-label')
                .append('text')
                .classed('y-axis-label-text', true)
                .attr('x', -chartHeight / 2)
                .attr('y', yAxisLabelOffset)
                .attr('text-anchor', 'middle')
                .attr('transform', 'rotate(270 0 0)')
                .text(yAxisLabel);
        }
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState() {
        svg.select('.loading-state-group').html(barLoadingMarkup);
    }

    /**
     * Draws grid lines on the background of the chart
     * @return void
     */
    function drawGridLines() {
        svg.select('.grid-lines-group').selectAll('grid').remove();

        if (grid === 'horizontal' || grid === 'full') {
            drawHorizontalGridLines();
        }

        if (grid === 'vertical' || grid === 'full') {
            drawVerticalGridLines();
        }

        if (isHorizontal) {
            drawVerticalGridLines();
        } else {
            drawHorizontalGridLines();
        }
    }

    /**
     * Draws the bars along the x axis
     * @param  {D3Selection} layersSelection Selection of bars
     * @return {void}
     */
    function drawHorizontalBars(layersSelection: ChartSelection<BaseType>) {
        const valueScale = asValueScale(xScale);
        const categoryScale = asCategoryScale(yScale);
        const layerJoin = layersSelection.data(layers);

        layerElements = layerJoin
            .enter()
            .append('g')
            .attr('fill', ({ key }) => colorForStack(key))
            .classed('layer', true);

        const barJoin = layerElements
            .selectAll<SVGRectElement, StackedBarPoint>('.bar')
            .data((d: Series<StackedBarColumn, string>) =>
                filterOutUnkownValues(d)
            );

        // Enter + Update
        const bars = barJoin
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', (d) => valueScale(d[0]))
            .attr('y', (d) => categoryScale(d.data.key))
            .attr('height', categoryScale.bandwidth());

        if (isAnimated) {
            bars.style('opacity', barOpacity)
                .transition()
                .delay((_, i) => animationDelays[i])
                .duration(animationDuration)
                .ease(ease)
                .tween('attr.width', horizontalBarsTween);
        } else {
            bars.attr('width', (d) => valueScale(d[1]) - valueScale(d[0]));
        }
    }

    /**
     * Draws the grid lines for a vertical bar chart
     * @return {void}
     */
    function drawHorizontalGridLines() {
        const grid = gridHorizontal(yScale)
            .range([0, chartWidth])
            .hideEdges('first')
            .ticks(yTicks)
            .extendedLine(xAxisPadding.left);

        grid(svg.select('.grid-lines-group'));
    }

    /**
     * Draws the bars along the y axis
     * @param  {D3Selection} layersSelection Selection of bars
     * @return {void}
     */
    function drawVerticalBars(layersSelection: ChartSelection<BaseType>) {
        const categoryScale = asCategoryScale(xScale);
        const valueScale = asValueScale(yScale);
        const layerJoin = layersSelection.data(layers);

        layerElements = layerJoin
            .enter()
            .append('g')
            .attr('fill', ({ key }) => colorForStack(key))
            .classed('layer', true);

        const barJoin = layerElements
            .selectAll<SVGRectElement, StackedBarPoint>('.bar')
            .data((d: Series<StackedBarColumn, string>) =>
                filterOutUnkownValues(d)
            );

        // Enter + Update
        const bars = barJoin
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', (d) => categoryScale(d.data.key))
            .attr('y', (d) => valueScale(d[1]))
            // The function itself, not a call: d3 invokes a value accessor per
            // element, which is how this has always read the band width. Its
            // sibling in `drawHorizontalBars` calls it instead, and the two
            // produce the same number.
            .attr('width', categoryScale.bandwidth);

        if (isAnimated) {
            bars.style('opacity', barOpacity)
                .transition()
                .delay((_, i) => animationDelays[i])
                .duration(animationDuration)
                .ease(ease)
                .tween('attr.height', verticalBarsTween);
        } else {
            bars.attr('height', (d) => valueScale(d[0]) - valueScale(d[1]));
        }
    }

    /**
     * Draws the grid lines for an horizontal bar chart
     * @return {void}
     */
    function drawVerticalGridLines() {
        const grid = gridVertical(xScale)
            .range([0, chartHeight])
            .hideEdges('first')
            .ticks(xTicks)
            .extendedLine(xAxisPadding.bottom);

        grid(svg.select('.grid-lines-group'));
    }

    /**
     * Draws the different areas into the chart-group element
     * @private
     */
    function drawStackedBar() {
        // Not ideal, we need to figure out how to call exit for nested elements
        if (layerElements) {
            svg.selectAll('.layer').remove();
        }

        const series = svg.select('.chart-group').selectAll('.layer');

        animationDelays = range(
            animationDelayStep,
            (layers[0].length + 1) * animationDelayStep,
            animationDelayStep
        );

        if (isHorizontal) {
            drawHorizontalBars(series);
        } else {
            drawVerticalBars(series);
        }
        // Exit
        series.exit().transition().style('opacity', 0).remove();
    }

    /**
     * Filter out unkown stacks/values in the bar layers
     * @param {Object[]} d
     * @return {Object[]} filteredData
     * @private
     */
    function filterOutUnkownValues(d: Series<StackedBarColumn, string>) {
        return d.map((layerEls) => {
            for (let i = 0; i < layerEls.length; i++) {
                layerEls[i] = getValOrDefaultToZero(layerEls[i]);
            }

            return layerEls;
        });
    }

    /**
     * Extract X position on the chart from a given mouse event
     * @param  {obj} event D3 mouse event
     * @return {Number}       Position on the x axis of the mouse
     * @private
     */
    /**
     * Returns the mouse position relative to the chart's svg root.
     *
     * The listeners live on `.chart-group`, which is already translated by the
     * margins, but getNearestDataPoint subtracts the margin itself -- so the
     * coordinates have to come from the svg root, not from the node the event
     * fired on. Passing the event as its own container (the previous
     * `pointer(event, event)`) made d3 read `clientX` off a non-event and throw
     * "Failed to set the 'x' property on 'SVGPoint'".
     *
     * @param {Event} event  The d3 v6 event handed to the handler
     * @return {Number[]}    [x, y] in the svg's coordinate space
     * @private
     */
    function getMousePosition(event: Event) {
        return pointer(event, svg.node());
    }

    /**
     * Finds out the data entry that is closer to the given position on pixels
     * @param  {Number} mouseX  X position of the mouse
     * @return {obj}            Data entry that is closer to that x axis position
     */
    function getNearestDataPoint(mouseX: number) {
        const adjustedMouseX = mouseX - (margin.left ?? 0);
        const categoryScale = asCategoryScale(xScale);

        const nearest = transformedData.find(({ key }) => {
            const barStart = categoryScale(key);
            const barEnd = barStart + categoryScale.bandwidth();

            // If mouseX is between barStart & barEnd
            return adjustedMouseX >= barStart && adjustedMouseX < barEnd;
        });

        return nearest;
    }

    /**
     * Finds out the data entry that is closer to the given position on pixels (horizontal)
     * @param  {Number} mouseY  Y position of the mouse
     * @return {obj}            Data entry that is closer to that y axis position
     */
    function getNearestDataPoint2(mouseY: number) {
        const adjustedMouseY = mouseY - (margin.top ?? 0);
        const categoryScale = asCategoryScale(yScale);

        const nearest = transformedData.find(({ key }) => {
            const barStart = categoryScale(key);
            const barEnd = barStart + categoryScale.bandwidth();

            // If mouseY is between barStart & barEnd
            return adjustedMouseY >= barStart && adjustedMouseY < barEnd;
        });

        return nearest;
    }

    /**
     * Gets the yMax, sets it to 1 if all data points are 0
     * @return {number} Calculated yMax
     * @private
     */
    function getValueAxisDomain() {
        // The axis has to cover both ends of every stacked segment, which with
        // negatives is not the same as the largest total.
        const bounds = layers.reduce<number[]>(
            (acc, layer) => [
                ...acc,
                ...layer.map(([lower, upper]) => [lower, upper]).flat(),
            ],
            []
        );

        return getValueDomain(bounds.filter((value) => !isNaN(value)));
    }

    /**
     * Handles a mouseover event on top of a bar
     * @return {void}
     */
    function handleBarsMouseOver(this: SVGRectElement) {
        select(this).attr('fill', () =>
            // `color` gives null for a string it cannot parse; what it is
            // handed here is the layer's own fill, set from the colour map.
            // `String` is what d3's `attr` does to the result anyway.
            String(
                color(
                    select(this.parentNode as SVGGElement).attr('fill')
                )!.darker()
            )
        );
    }

    /**
     * Handles a mouseout event out of a bar
     * @return {void}
     */
    function handleBarsMouseOut(this: SVGRectElement) {
        select(this).attr('fill', () =>
            select(this.parentNode as SVGGElement).attr('fill')
        );
    }

    /**
     * MouseMove handler, calculates the nearest dataPoint to the cursor
     * and updates metadata related to it
     * @private
     */
    function handleMouseMove(e: Element, d: unknown, event: Event) {
        // The listener is on the svg, so it sees every move; the tooltip
        // is only for the bars, not the empty space around them. Entering
        // a bar from that space is a mouse over; leaving the bars for it
        // is a mouse out.
        if (!isPointerOverBar(event)) {
            if (isPointerOverBars) {
                handleMouseOut(e, d, event);
            }

            return;
        }

        if (!isPointerOverBars) {
            handleMouseOver(e, d, event);
        }

        const [mouseX, mouseY] = getMousePosition(event);
        const dataPoint = isHorizontal
            ? getNearestDataPoint2(mouseY)
            : getNearestDataPoint(mouseX);
        let x, y;

        if (dataPoint) {
            // The tooltip follows the pointer, like on every other chart.
            // The pointer is measured on the root svg; the tooltip lives in
            // the margin-translated container, hence the offsets.
            x = mouseX - (margin.left ?? 0);
            y = mouseY - (margin.top ?? 0);
            moveTooltipOriginXY(x, y);

            // Emit event with xPosition for tooltip or similar feature
            // The same payload as every chart: the data point, its anchor,
            // the chart's size and the topic colours
            dispatcher.call(
                'customMouseMove',
                e,
                dataPoint,
                [x, y],
                [chartWidth, chartHeight],
                nameToColorMap
            );
        }
    }

    /**
     * Click handler, passes the data point of the clicked bar
     * (or it's nearest point)
     * @private
     */
    function handleClick(e: Element, d: unknown, event: Event) {
        // Like the hover, clicks are for the bars only
        if (!isPointerOverBar(event)) {
            return;
        }

        const [mouseX, mouseY] = getMousePosition(event);
        const dataPoint = isHorizontal
            ? getNearestDataPoint2(mouseY)
            : getNearestDataPoint(mouseX);

        dispatcher.call(
            'customClick',
            e,
            dataPoint,
            pointer(event, e),
            getSegment(event.target as Element)
        );
    }

    /**
     * The data of one bar (one segment of a stack): its stack's name, its
     * value and the key of the column it belongs to. The rect's layer
     * carries the stack's name; the column is the rect's position within
     * the layer, which follows the order of the data (the stacked point
     * itself carries the column as `data` when d3 bound it)
     * @param  {Element} bar    The clicked rect
     * @return {Object | undefined}
     * @private
     */
    function getSegment(bar: Element) {
        const layerNode = bar.parentNode as SVGGElement | null;
        // The layer's datum is the whole series, which carries the stack's name
        // as `key`; the rect's own datum is one point of it.
        const layer = layerNode
            ? (select(layerNode).datum() as
                  | Series<StackedBarColumn, string>
                  | undefined)
            : null;

        if (!layer || !isDefined(layer.key)) {
            return undefined;
        }

        const point = select(bar).datum() as StackedBarPoint | undefined;
        const column: StackedBarColumn | undefined =
            point && point.data
                ? point.data
                : transformedData[
                      Array.from(
                          (layerNode as SVGGElement).querySelectorAll('.bar')
                      ).indexOf(bar)
                  ];

        if (!column) {
            return undefined;
        }

        return {
            name: layer.key,
            value: column[layer.key] as number,
            key: column.key,
        };
    }

    /**
     * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
     * It also resets the container of the vertical marker
     * @private
     */
    function handleMouseOut(e: Element, d: unknown, event: Event) {
        if (!isPointerOverBars) {
            return;
        }
        isPointerOverBars = false;
        svg.select('.metadata-group').attr('transform', 'translate(9999, 0)');
        dispatcher.call('customMouseOut', e, d, pointer(event, e));
    }

    /**
     * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
     * @private
     */
    function handleMouseOver(e: Element, d: unknown, event: Event) {
        if (isPointerOverBars || !isPointerOverBar(event)) {
            return;
        }
        isPointerOverBars = true;
        dispatcher.call('customMouseOver', e, d, pointer(event, e));
    }

    /**
     * Whether a pointer event happened over one of the bars
     * @param  {Event} event    The pointer event, listened on the svg
     * @return {Boolean}
     * @private
     */
    function isPointerOverBar(event: Event) {
        return (
            !!event &&
            !!event.target &&
            select(event.target as Element).classed('bar')
        );
    }

    /**
     * Animation tween of horizontal bars
     * @param  {obj} d data of bar
     * @return {void}
     */
    function horizontalBarsTween(this: SVGRectElement, d: StackedBarPoint) {
        const valueScale = asValueScale(xScale);
        const node = select(this);
        const i = interpolateRound(0, valueScale(d[1]) - valueScale(d[0]));
        const j = interpolateNumber(0, 1);

        return function (t: number) {
            node.attr('width', i(t)).style('opacity', j(t));
        };
    }

    /**
     * Helper method to update the x position of the vertical marker
     * @param  {obj} dataPoint Data entry to extract info
     * @return void
     */
    function moveTooltipOriginXY(
        originXPosition: number,
        originYPosition: number
    ) {
        svg.select('.metadata-group').attr(
            'transform',
            `translate(${originXPosition},${originYPosition})`
        );
    }

    /**
     * Prepare data for create chart.
     * @private
     */
    function prepareData(data: StackedBarDatum[]) {
        stacks = uniq(data.map(({ stack }) => stack));

        if (hasReversedStacks) {
            stacks = stacks.reverse();
        }

        // See the grouped-bar chart: nest() replaced by rollups().
        transformedData = rollups(
            data,
            function (values) {
                // Every stack's value goes on under its own name, which is
                // what `permute` and `d3.stack` read back, so this is a bag of
                // dynamic keys rather than a fixed shape.
                const ret: Record<string, unknown> = {};

                values.forEach((entry) => {
                    if (entry && entry[stackLabel]) {
                        ret[entry[stackLabel] as string] = getValue(entry);
                    }
                });
                //for tooltip
                ret.values = values;

                return ret;
            },
            (d) => String(getName(d))
        )
            .map(([key, value]) => ({ key, value }))
            .map(function (data) {
                // `total`, `key` and the stack members, which together are what
                // `StackedBarColumn` describes -- `values` arrives with the
                // spread rather than being named here.
                return Object.assign(
                    {},
                    {
                        total: sum(
                            permute(
                                data.value as Record<string, number>,
                                stacks
                            )
                        ),
                        key: data.key,
                    },
                    data.value
                ) as StackedBarColumn;
            });
    }

    /**
     * Determines if we should add the tooltip related logic depending on the
     * size of the chart and the tooltipThreshold variable value
     * @return {boolean} Should we build the tooltip?
     * @private
     */
    function shouldShowTooltip() {
        return width > tooltipThreshold;
    }

    /**
     * Animation tween of vertical bars
     * @param  {obj} d data of bar
     * @return {void}
     */
    function verticalBarsTween(this: SVGRectElement, d: StackedBarPoint) {
        const valueScale = asValueScale(yScale);
        const vertDiff = valueScale(d[0]) - valueScale(d[1]);

        const node = select(this);
        const i = interpolateRound(0, getValOrDefaultToZero(vertDiff));
        const j = interpolateNumber(0, 1);

        return function (t: number) {
            node.attr('height', i(t)).style('opacity', j(t));
        };
    }

    // API
    /**
     * Gets or Sets the duration of the animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).animationDuration = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return animationDuration;
        }
        animationDuration = _x;

        return this;
    } as StackedBarChartModule['animationDuration'];

    /**
     * Gets or Sets the padding of the stacked bar chart
     * @param  {Number} _x = 0.1    Padding value to get/set
     * @return {Number | module}    Current padding or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).betweenBarsPadding = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return betweenBarsPadding;
        }
        betweenBarsPadding = _x;

        return this;
    } as StackedBarChartModule['betweenBarsPadding'];

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {object | module}     Current colorMap or Chart module to chain calls
     * @example stackedBar.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
     * @public
     */
    (exports as StackedBarChartModule).colorMap = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return nameToColorMap;
        }
        nameToColorMap = _x;

        return this;
    } as StackedBarChartModule['colorMap'];

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {String[]} _x = colorSchemas.britecharts     Desired colorSchema for the graph
     * @return {String[] | module}                          Current colorSchema or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).colorSchema = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as StackedBarChartModule['colorSchema'];

    /**
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as StackedBarChartModule).exportChart = function (
        filename,
        title
    ) {
        return exportChart.call(
            exports as StackedBarChartModule,
            svg,
            filename,
            title
        );
    } as StackedBarChartModule['exportChart'];

    /**
     * Gets or Sets the grid mode
     * @param  {String} _x          Desired mode for the grid ('vertical'|'horizontal'|'full')
     * @return {String | module}    Current mode of the grid or Area Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).grid = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return grid;
        }
        grid = _x;

        return this;
    } as StackedBarChartModule['grid'];

    /**
     * Gets or Sets the hasPercentage status
     * @param  {Boolean} _x         Should use percentage as value format
     * @return {Boolean | module}   Is percentage used or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).hasPercentage = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat === PERCENTAGE_FORMAT;
        }
        if (_x) {
            numberFormat = PERCENTAGE_FORMAT;
        } else {
            numberFormat = NUMBER_FORMAT;
        }

        return this;
    } as StackedBarChartModule['hasPercentage'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x          Desired width for the graph
     * @return {Number | module}    Current height or Area Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).height = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as StackedBarChartModule['height'];

    /**
     * Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks
     * @param  {Boolean} _x = false     Desired hasReversedStacks flag
     * @return {Boolean | module}       Current hasReversedStacks or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).hasReversedStacks = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return hasReversedStacks;
        }
        hasReversedStacks = _x;

        return this;
    } as StackedBarChartModule['hasReversedStacks'];

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * By default this is 'false'
     *
     * @param  {Boolean} _x = false     Desired animation flag
     * @return {Boolean | module} Current isAnimated flag or Chart module
     * @public
     */
    (exports as StackedBarChartModule).isAnimated = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    } as StackedBarChartModule['isAnimated'];

    /**
     * Gets or Sets the horizontal direction of the chart
     * @param  {Boolean} _x = false     Desired horizontal direction for the graph
     * @return {Boolean | module}       If it is horizontal or Bar Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).isHorizontal = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isHorizontal;
        }
        isHorizontal = _x;

        return this;
    } as StackedBarChartModule['isHorizontal'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).isLoading = function (
        this: StackedBarChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as StackedBarChartModule['isLoading'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return {Object | module}    Current margin or Area Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).margin = function (
        this: StackedBarChartModule,
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
    } as StackedBarChartModule['margin'];

    /**
     * Gets or Sets the nameLabel of the chart
     * @param  {Number} _x          Desired dateLabel for the graph
     * @return {Number | module}    Current nameLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as StackedBarChartModule).nameLabel = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return nameLabel;
        }
        nameLabel = _x;
        dataKeyDeprecationMessage('name');

        return this;
    } as StackedBarChartModule['nameLabel'];

    /**
     * Gets or Sets the numberFormat of the chart
     * @param  {String} _x = ',f'     Desired numberFormat for the graph. See examples [here]{@link https://d3js.org/d3-format}
     * @return {String | module}      Current numberFormat or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).numberFormat = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as StackedBarChartModule['numberFormat'];

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove, customMouseOut, and customClick
     *
     * @return {module} Bar Chart
     * @public
     */
    (exports as StackedBarChartModule).on = function (
        ...args: [string] | [string, () => void]
    ) {
        // Rest parameters and a spread where this read `arguments` and used
        // `.apply`, following grouped-bar.ts and donut.ts: the TypeScript lint
        // override makes `prefer-spread` an error, and the two shapes `on` is
        // called with -- a lookup and a registration -- are what the tuple
        // says.
        const value = dispatcher.on(
            ...(args as Parameters<typeof dispatcher.on>)
        );

        return value === dispatcher ? exports : value;
    } as unknown as StackedBarChartModule['on'];

    /**
     * Configurable extension of the x axis
     * If your max point was 50% you might want to show x axis to 60%, pass 1.2
     * @param  {Number} _x          Ratio to max data point to add to the x axis
     * @return {Number | module}    Current ratio or Bar Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).percentageAxisToMaxRatio = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return percentageAxisToMaxRatio;
        }
        percentageAxisToMaxRatio = _x;

        return this;
    } as StackedBarChartModule['percentageAxisToMaxRatio'];

    /**
     * Gets or Sets the stackLabel of the chart
     * @param  {String} _x          Desired stackLabel for the graph
     * @return {String | module}    Current stackLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as StackedBarChartModule).stackLabel = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return stackLabel;
        }
        stackLabel = _x;
        dataKeyDeprecationMessage('stack');

        return this;
    } as StackedBarChartModule['stackLabel'];

    /**
     * Gets or Sets the minimum width of the graph in order to show the tooltip
     * NOTE: This could also depend on the aspect ratio
     * @param  {Number} [_x=480]    Minimum width of the graph
     * @return {Number | module}    Current tooltipThreshold or Area Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).tooltipThreshold = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return tooltipThreshold;
        }
        tooltipThreshold = _x;

        return this;
    } as StackedBarChartModule['tooltipThreshold'];

    /**
     * Gets or Sets the valueLabel of the chart
     * @param  {Number} _x          Desired valueLabel for the graph
     * @return {Number | module}    Current valueLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as StackedBarChartModule).valueLabel = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return valueLabel;
        }
        valueLabel = _x;
        dataKeyDeprecationMessage('value');

        return this;
    } as StackedBarChartModule['valueLabel'];

    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     * @example
     *  stackedBarChart
     *  .valueLocale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
     * @param  {LocaleObject}  [_x=null]  _x    Desired locale object format.
     * @return {LocaleObject | module}          Current locale object or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).valueLocale = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    } as StackedBarChartModule['valueLocale'];

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x = 960    Desired width for the graph
     * @return {Number | module}    Current width or Area Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).width = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as StackedBarChartModule['width'];

    /**
     * Gets or Sets the number of ticks of the x axis on the chart
     * @param  {Number} _x = 5      Desired horizontal ticks
     * @return {Number | module}    Current xTicks or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).xTicks = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xTicks;
        }
        xTicks = _x;

        return this;
    } as StackedBarChartModule['xTicks'];

    /**
     * Gets or Sets the y-axis label of the chart
     * @param  {String} _x          Desired label string
     * @return {String | module}    Current yAxisLabel or Chart module to chain calls
     * @public
     * @example stackedBar.yAxisLabel('Ticket Sales')
     */
    (exports as StackedBarChartModule).yAxisLabel = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabel;
        }
        yAxisLabel = _x;

        return this;
    } as StackedBarChartModule['yAxisLabel'];

    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     * @param  {Number} _x = -60        Desired offset for the label
     * @return {Number | module}        Current yAxisLabelOffset or Chart module to chain calls
     * @public
     * @example stackedBar.yAxisLabelOffset(-55)
     */
    (exports as StackedBarChartModule).yAxisLabelOffset = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabelOffset;
        }
        yAxisLabelOffset = _x;

        return this;
    } as StackedBarChartModule['yAxisLabelOffset'];

    /**
     * Gets or Sets the number of vertical ticks of the axis on the chart
     * @param  {Number} _x = 5      Desired vertical ticks
     * @return {Number | module}    Current yTicks or Chart module to chain calls
     * @public
     */
    (exports as StackedBarChartModule).yTicks = function (
        this: StackedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yTicks;
        }
        yTicks = _x;

        return this;
    } as StackedBarChartModule['yTicks'];

    return exports as unknown as StackedBarChartModule;
}
