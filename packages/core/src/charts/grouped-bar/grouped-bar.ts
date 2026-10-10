import { range, permute, rollups, sum } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { color } from 'd3-color';
import { dispatch } from 'd3-dispatch';
import * as d3Format from 'd3-format';
import { easeQuadInOut } from 'd3-ease';
import { interpolateNumber, interpolateRound } from 'd3-interpolate';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import { select, pointer } from 'd3-selection';
import type { Axis, AxisDomain } from 'd3-axis';
import type { Dispatch } from 'd3-dispatch';
import type { FormatLocaleObject } from 'd3-format';
import type { ScaleOrdinal } from 'd3-scale';
import type { BaseType, Selection } from 'd3-selection';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import { getBaselineExtent, getValueDomain } from '../helpers/domain';
import { dataKeyDeprecationMessage } from '../helpers/project';
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
import type { Offset } from '../../typings/common/position';
import type { ColorsSchemasType } from '../../typings/helpers/colors';
import type {
    GroupedBarChartDataShape,
    GroupedBarChartModule,
} from '../../typings/charts/grouped-bar-chart';

const NUMBER_FORMAT = ',f';
const uniq = <T>(arrArg: T[]) =>
    arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are the migration plan's bounded `any`, as in `bullet.ts` and
 * `donut.ts`: these are module-level variables reassigned from several
 * differently-shaped selections, so naming one concrete datum would reject the
 * others.
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
 * deprecated `nameLabel`/`valueLabel`/`groupLabel` accessors: they let the data
 * carry those three values under any key, so the reads in `cleanData`,
 * `prepareData` and the two nearest-point searches really are dynamic.
 *
 * `topicName` is `cleanData`'s own addition, a copy of the group under the name
 * the tooltip reads, and it is not part of the published data shape.
 */
type GroupedBarDatum = GroupedBarChartDataShape & {
    topicName: string;
    [key: string]: unknown;
};

/**
 * One group of bars, as `prepareData` builds it: a key naming the group, the
 * total across it, every group name as its own member, and the entries
 * themselves under `values` for the tooltip.
 */
type GroupedBarLayer = {
    key: string;
    total: number;
    values: GroupedBarDatum[];
    [groupName: string]: unknown;
};

/**
 * An entry the nearest-point search found, which it mutates before returning:
 * `values` is the whole group it belongs to and `key` its own name, both read
 * by the tooltip.
 */
type NearestDatum = GroupedBarDatum & {
    values: GroupedBarDatum[];
    key: string;
};

/**
 * Grouped Bar Chart reusable API module that allows us
 * rendering a multi grouped bar and configurable chart.
 *
 * @module Grouped-bar
 * @tutorial grouped-bar
 * @requires d3-array, d3-axis, d3-color, d3-collection, d3-dispatch, d3-ease,
 *  d3-interpolate, d3-scale, d3-selection, d3-transition
 *
 * @example
 * let groupedBar = GroupedBar();
 *
 * groupedBar
 *     .width(containerWidth);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset.data)
 *     .call(groupedBar);
 *
 */

/**
 * @typdef D3Layout
 * @type function
 */

/**
 * @typedef GroupedBarChartData
 * @type {Object[]}
 * @property {String} name         Name of the entry
 * @property {String} group        group of the entry
 * @property {Number} value        Value of the entry
 *
 * @example
 * [
 *     {
 *         name: "2011-01",
 *         group: "Direct",
 *         value: 0
 *     }
 * ]
 */

export default function module(): GroupedBarChartModule {
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
        xScale2: AxisScale,
        xAxis: Axis<AxisDomain>,
        yScale: AxisScale,
        yScale2: AxisScale,
        yAxis: Axis<AxisDomain>,
        yTickTextOffset: Offset = {
            y: -8,
            x: -20,
        },
        yTicks = 5,
        xTicks = 5,
        colorSchema: ColorsSchemasType = colorHelper.colorSchemas.britecharts,
        nameToColorMap: Record<string, string> | null = null,
        // Whether the pointer is over one of the bars (not the empty space
        // of the chart), which is when the tooltip events are dispatched
        isPointerOverBars = false,
        colorScale: ScaleOrdinal<string, string>,
        layers: GroupedBarLayer[],
        locale: LocalObject | null = null,
        // The d3-format namespace to start with, replaced by a locale-specific
        // formatter once `valueLocale` is set. Both carry `format`, which is
        // all `buildAxis` reads off it.
        localeFormatter: FormatLocaleObject = d3Format,
        isHorizontal = false,
        svg: ChartSelection<SVGSVGElement>,
        chartWidth: number,
        chartHeight: number,
        data: GroupedBarDatum[],
        groups: string[],
        layerElements: ChartSelection<SVGGElement>,
        transformedData: GroupedBarLayer[],
        tooltipThreshold = 480,
        // No default: the chart appends no label element until one is set,
        // which is what the declaration now says.
        yAxisLabel: string | undefined,
        yAxisLabelEl: ChartSelection<SVGTextElement>,
        yAxisLabelOffset = -60,
        animationDelays: number[],
        animationDuration = motion.duration,
        grid: GridTypes | null = null,
        nameLabel = 'name',
        valueLabel = 'value',
        groupLabel = 'group',
        numberFormat = NUMBER_FORMAT,
        betweenBarsPadding = 0.1,
        betweenGroupsPadding = 0.1,
        isAnimated = false;

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
     * The colour a group's bars are filled with.
     *
     * `buildScales` fills `nameToColorMap` before anything is drawn, so it is
     * non-null everywhere this is reached -- the same reasoning, and the same
     * shape, as `getSliceFill` in donut.ts.
     */
    const colorForGroup = (group: string) =>
        (nameToColorMap as Record<string, string>)[group];
    const getName = ({ name }: GroupedBarDatum) => name;
    const getValue = ({ value }: GroupedBarDatum) => value;
    const getGroup = ({ group }: GroupedBarDatum) => group;
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
     * @param {GroupedBarChartData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            GroupedBarChartDataShape[],
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

            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            prepareData(data);
            buildScales();
            buildLayers();
            cleanLoadingState();
            drawGridLines();
            buildAxis(localeFormatter);
            drawAxis();
            drawGroupedBar();
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
                    handleCustomClick(this, d, event);
                });
        }

        svg.selectAll<SVGRectElement, GroupedBarDatum>('.bar')
            .on('mouseover', function (event, d) {
                handleBarsMouseOver(this, d, event);
            })
            .on('mouseout', function (event, d) {
                handleBarsMouseOut(this, d, event);
            });
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
                `translate(${yTickTextOffset['x']}, ${yTickTextOffset['y']})`
            );
    }

    /**
     * Picks an evenly-spaced subset of up to `numTicks` values from a
     * categorical domain. d3's axis `.ticks(count)` is ignored for
     * band/ordinal scales (it always renders one tick per domain value),
     * so this is used to honor `xTicks` on the vertical grouped-bar's
     * categorical x axis via `.tickValues()` instead.
     * @param  {Array}  domainValues Full list of category values (xScale.domain())
     * @param  {Number} numTicks     Desired number of ticks to display
     * @return {Array}               Subset of domainValues to pass to tickValues
     * @private
     */
    function getEvenlySpacedTickValues<T>(domainValues: T[], numTicks: number) {
        const total = domainValues.length;

        if (!numTicks || numTicks >= total) {
            return domainValues;
        }

        if (numTicks <= 1) {
            return [domainValues[0]];
        }

        const step = (total - 1) / (numTicks - 1);

        return uniq(
            range(numTicks).map((i) => domainValues[Math.round(i * step)])
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
            xAxis = axisBottom(xScale).tickValues(
                getEvenlySpacedTickValues(xScale.domain(), xTicks)
            );
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
        container.append('g').classed('y-axis-label', true);
        container.append('g').classed('grid-lines-group', true);
        container.append('g').classed('chart-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Builds the grouped layers layout
     * @return {D3Layout} Layout for drawing the chart
     * @private
     */
    function buildLayers() {
        layers = transformedData.map((item) => {
            const ret: Record<string, unknown> = {};

            groups.forEach((key) => {
                ret[key] = item[key];
            });

            return Object.assign({}, item, ret);
        });
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
                .padding(betweenGroupsPadding);

            yScale2 = scaleBand()
                .domain(data.map(getGroup))
                .rangeRound([asCategoryScale(yScale).bandwidth(), 0])
                .padding(betweenBarsPadding);
        } else {
            xScale = scaleBand()
                .domain(data.map(getName))
                .rangeRound([0, chartWidth])
                .padding(betweenGroupsPadding);
            xScale2 = scaleBand()
                .domain(data.map(getGroup))
                .rangeRound([0, asCategoryScale(xScale).bandwidth()])
                .padding(betweenGroupsPadding);

            yScale = scaleLinear()
                .domain(valueDomain)
                .rangeRound([chartHeight, 0])
                .nice();
        }

        colorScale = scaleOrdinal<string, string>()
            .range(colorSchema)
            .domain(data.map(getGroup));

        nameToColorMap =
            nameToColorMap ||
            colorScale
                .domain(data.map(getName))
                .domain()
                .reduce<Record<string, string>>((memo, item) => {
                    data.forEach(({ name, group }) => {
                        if (name == item) {
                            memo[group] = colorScale(group);
                        }
                    });

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
                .classed('britechart grouped-bar', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Cleaning data casting the values, groups, topic names and names to the proper type while keeping
     * the rest of properties on the data
     * @param  {GroupedBarChartData} originalData   Raw data from the container
     * @return {GroupedBarChartData}                Parsed data with values and dates
     * @private
     */
    function cleanData(originalData: GroupedBarChartDataShape[]) {
        return originalData.reduce<GroupedBarDatum[]>((acc, datum) => {
            // Written onto the caller's own objects rather than copies, which
            // is the runtime this preserves. The cast covers the reads the
            // label accessors make dynamic -- the data may carry its value,
            // group and name under any key -- and `topicName`, which is this
            // function's own addition for the tooltip.
            const d = datum as GroupedBarDatum;

            d.value = +(d[valueLabel] as number);
            d.group = d[groupLabel] as string;

            // for tooltip
            d.topicName = d[groupLabel] as string;
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
     * @param  {D3Selection} layersSelection Selection of layers
     * @return {void}
     */
    function drawHorizontalBars(layersSelection: ChartSelection<BaseType>) {
        const layerJoin = layersSelection.data(layers);

        layerElements = layerJoin
            .enter()
            .append('g')
            .attr(
                'transform',
                ({ key }) => `translate(0,${asCategoryScale(yScale)(key)})`
            )
            .classed('layer', true);

        const barJoin = layerElements
            .selectAll<SVGRectElement, GroupedBarDatum>('.bar')
            .data((layer: GroupedBarLayer) => layer.values);

        // Enter + Update
        const bars = barJoin
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr(
                'x',
                (d) =>
                    getBaselineExtent(asValueScale(xScale), getValue(d)).start
            )
            .attr('y', (d) => asCategoryScale(yScale2)(getGroup(d)))
            .attr('height', asCategoryScale(yScale2).bandwidth())
            .attr('fill', ({ group }) => colorForGroup(group));

        if (isAnimated) {
            bars.style('opacity', barOpacity)
                .transition()
                .delay((_, i) => animationDelays[i])
                .duration(animationDuration)
                .ease(ease)
                .tween('attr.width', horizontalBarsTween);
        } else {
            bars.attr(
                'width',
                (d) => getBaselineExtent(asValueScale(xScale), getValue(d)).size
            );
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
     * @param  {D3Selection} layersSelection Selection of layers
     * @return {void}
     */
    function drawVerticalBars(layersSelection: ChartSelection<BaseType>) {
        const layerJoin = layersSelection.data(layers);

        layerElements = layerJoin
            .enter()
            .append('g')
            .attr(
                'transform',
                ({ key }) => `translate(${asCategoryScale(xScale)(key)},0)`
            )
            .classed('layer', true);

        const barJoin = layerElements
            .selectAll<SVGRectElement, GroupedBarDatum>('.bar')
            .data((layer: GroupedBarLayer) => layer.values);

        const bars = barJoin
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', (d) => asCategoryScale(xScale2)(getGroup(d)))
            .attr(
                'y',
                ({ value }) =>
                    getBaselineExtent(asValueScale(yScale), value).start
            )
            // The function itself, not a call: d3 invokes a value accessor per
            // element, which is how this has always read the band width. Its
            // sibling in `drawHorizontalBars` calls it instead, and the two
            // produce the same number.
            .attr('width', asCategoryScale(xScale2).bandwidth)
            .attr('fill', ({ group }) => colorForGroup(group));

        if (isAnimated) {
            bars.style('opacity', barOpacity)
                .transition()
                .delay((_, i) => animationDelays[i])
                .duration(animationDuration)
                .ease(ease)
                .tween('attr.height', verticalBarsTween);
        } else {
            bars.attr(
                'height',
                (d) => getBaselineExtent(asValueScale(yScale), getValue(d)).size
            );
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
    function drawGroupedBar() {
        // Not ideal, we need to figure out how to call exit for nested elements
        if (layerElements) {
            svg.selectAll('.layer').remove();
        }
        const series = svg.select('.chart-group').selectAll('.layer');

        animationDelays = range(
            animationDelayStep,
            (groups.length + 1) * animationDelayStep,
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
     * @param  {Number} mouseX X position of the mouse
     * @return {obj}        Data entry that is closer to that x axis position
     */
    function getNearestDataPoint(mouseX: number) {
        const adjustedMouseX = mouseX - (margin.left ?? 0);
        const epsilon = asCategoryScale(xScale2).bandwidth();
        const nearest: NearestDatum[] = [];

        layers.forEach(function (data) {
            const found = data.values.find(
                (d2) =>
                    // `Math.abs` of a comparison, which is a boolean: it comes
                    // back 1 for true and 0 for false, so each half of this
                    // reads as the plain test it looks like. Preserved as it
                    // stands, `Number` where the booleans are, because a
                    // conversion is the wrong place to change what a chart
                    // finds under the pointer. `Number(x)` is the coercion
                    // `Math.abs` already performs.
                    Math.abs(
                        Number(
                            adjustedMouseX >=
                                asCategoryScale(xScale)(
                                    d2[nameLabel] as string
                                ) +
                                    asCategoryScale(xScale2)(
                                        d2[groupLabel] as string
                                    )
                        )
                    ) &&
                    Math.abs(
                        Number(
                            adjustedMouseX -
                                asCategoryScale(xScale2)(
                                    d2[groupLabel] as string
                                ) -
                                asCategoryScale(xScale)(
                                    d2[nameLabel] as string
                                ) <=
                                epsilon
                        )
                    )
            );

            if (found) {
                const entry = found as NearestDatum;

                entry.values = data.values;
                entry.key = entry.name;
                nearest.push(entry);
            }
        });

        return nearest.length ? nearest[0] : undefined;
    }

    /**
     * Finds out the data entry that is closer to the given position on pixels
     * @param  {Number} mouseX X position of the mouse
     * @return {obj}        Data entry that is closer to that x axis position
     */
    function getNearestDataPoint2(mouseY: number) {
        const adjustedMouseY = mouseY - (margin.bottom ?? 0);
        const epsilon = asCategoryScale(yScale).bandwidth();
        const nearest: NearestDatum[] = [];

        layers.map(function (data) {
            const found = data.values.find(
                (d2) =>
                    // The same `Math.abs` of a boolean as the function above.
                    Math.abs(
                        Number(
                            adjustedMouseY >=
                                asCategoryScale(yScale)(d2[nameLabel] as string)
                        )
                    ) &&
                    Math.abs(
                        Number(
                            adjustedMouseY -
                                asCategoryScale(yScale)(
                                    d2[nameLabel] as string
                                ) <=
                                epsilon * 2
                        )
                    )
            );

            if (found) {
                const entry = found as NearestDatum;

                entry.values = data.values;
                entry.key = entry.name;
                nearest.push(entry);
            }
        });

        return nearest.length ? nearest[0] : undefined;
    }

    /**
     * Handles a mouseover event on top of a bar
     * @param  {obj} e the fired event
     * @param  {obj} d data of bar
     * @return {void}
     */
    function handleBarsMouseOver(e: Element, d: GroupedBarDatum, event: Event) {
        select(e).attr('fill', () =>
            // `color` gives null for a string it cannot parse; what it is
            // handed here is the colour scale's own output, so it parses.
            // `String` is what d3's `attr` does to the result anyway.
            String(color(colorForGroup(d.group))!.darker())
        );
    }

    /**
     * Handles a mouseout event out of a bar
     * @param  {obj} e the fired event
     * @param  {obj} d data of bar
     * @return {void}
     */
    function handleBarsMouseOut(e: Element, d: GroupedBarDatum, event: Event) {
        select(e).attr('fill', () => colorForGroup(d.group));
    }

    /**
     * MouseMove handler, calculates the nearest dataPoint to the cursor
     * and updates metadata related to it
     * @param  {obj} e the fired event
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
     * Click handler, shows data that was clicked and passes to the user
     * @private
     */
    function handleCustomClick(e: Element, d: unknown, event: Event) {
        // Like the hover, clicks are for the bars only
        if (!isPointerOverBar(event)) {
            return;
        }

        const [mouseX, mouseY] = getMousePosition(event);
        const dataPoint = isHorizontal
            ? getNearestDataPoint2(mouseY)
            : getNearestDataPoint(mouseX);

        // The rect carries the clicked bar's own entry (group, name, value)
        dispatcher.call(
            'customClick',
            e,
            dataPoint,
            pointer(event, e),
            select(event.target as Element).datum()
        );
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
    function horizontalBarsTween(this: SVGRectElement, d: GroupedBarDatum) {
        const valueScale = asValueScale(xScale);
        const { start, size } = getBaselineExtent(valueScale, getValue(d));
        const node = select(this);
        const x = interpolateRound(valueScale(0), start);
        const i = interpolateRound(0, size);
        const j = interpolateNumber(0, 1);

        return function (t: number) {
            node.attr('x', x(t)).attr('width', i(t)).style('opacity', j(t));
        };
    }

    /**
     * Gets the yMax, sets it to 1 if all data points are 0
     * @return {number} Calculated yMax
     * @private
     */
    function getValueAxisDomain() {
        return getValueDomain(data.map(getValue));
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
    function prepareData(data: GroupedBarDatum[]) {
        groups = uniq(data.map(getGroup));

        // d3-collection's nest() is gone; rollups() is the d3-array
        // equivalent, returning [key, value] pairs rather than objects.
        // The key accessor is String()-wrapped to keep nest's coercion.
        transformedData = rollups(
            data,
            function (values) {
                // Every group's own value goes on under its own name, which is
                // what `permute` reads back below, so this is a bag of dynamic
                // keys rather than a fixed shape.
                const ret: Record<string, unknown> = {};

                values.forEach((entry) => {
                    if (entry && entry[groupLabel]) {
                        ret[entry[groupLabel] as string] = getValue(entry);
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
                // `total`, `key` and the group members, which together are
                // what `GroupedBarLayer` describes -- `values` arrives with the
                // spread rather than being named here.
                return Object.assign(
                    {},
                    {
                        total: sum(
                            permute(
                                data.value as Record<string, number>,
                                groups
                            )
                        ),
                        key: data.key,
                    },
                    data.value
                ) as GroupedBarLayer;
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
    function verticalBarsTween(this: SVGRectElement, d: GroupedBarDatum) {
        const valueScale = asValueScale(yScale);
        const { start, size } = getBaselineExtent(valueScale, getValue(d));
        // One statement each, matching its horizontal twin: the `let` chain
        // this replaced is a `one-var` warning once it becomes `const`.
        const node = select(this);
        const i = interpolateRound(0, size);
        const y = interpolateRound(valueScale(0), start);
        const j = interpolateNumber(0, 1);

        return function (t: number) {
            node.attr('y', y(t)).attr('height', i(t)).style('opacity', j(t));
        };
    }

    // API
    /**
     * Gets or Sets the duration of the animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).animationDuration = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return animationDuration;
        }
        animationDuration = _x;

        return this;
    } as GroupedBarChartModule['animationDuration'];

    /**
     * Gets or Sets the padding between bars.
     * @param  {Number} [_x = 0.1] Padding value to get/set
     * @return {Number | module} Current padding or Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).betweenBarsPadding = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return betweenBarsPadding;
        }
        betweenBarsPadding = _x;

        return this;
    } as GroupedBarChartModule['betweenBarsPadding'];

    /**
     * Gets or Sets the padding between groups of bars.
     * @param  {Number} [_x = 0.1] Padding value to get/set
     * @return {Number | module} Current group padding or Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).betweenGroupsPadding = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return betweenGroupsPadding;
        }
        betweenGroupsPadding = _x;

        return this;
    } as GroupedBarChartModule['betweenGroupsPadding'];

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {object | module}     Current colorMap or Chart module to chain calls
     * @example groupedBar.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
     * @public
     */
    (exports as GroupedBarChartModule).colorMap = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return nameToColorMap;
        }
        nameToColorMap = _x;

        return this;
    } as GroupedBarChartModule['colorMap'];

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {String[]} _x            Desired colorSchema for the graph
     * @return { colorSchema | module}  Current colorSchema or Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).colorSchema = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as GroupedBarChartModule['colorSchema'];

    /**
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as GroupedBarChartModule).exportChart = function (
        filename,
        title
    ) {
        return exportChart.call(
            exports as GroupedBarChartModule,
            svg,
            filename,
            title
        );
    } as GroupedBarChartModule['exportChart'];

    /**
     * Gets or Sets the groupLabel of the chart
     * @param  {String} _x              Desired groupLabel for the graph
     * @return { groupLabel | module}   Current groupLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as GroupedBarChartModule).groupLabel = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return groupLabel;
        }
        groupLabel = _x;
        dataKeyDeprecationMessage('group');

        return this;
    } as GroupedBarChartModule['groupLabel'];

    /**
     * Gets or Sets the grid mode.
     * @param  {String} [_x=null]   Desired mode for the grid ('vertical'|'horizontal'|'full')
     * @return { String | module}   Current mode of the grid or Area Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).grid = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return grid;
        }
        grid = _x;

        return this;
    } as GroupedBarChartModule['grid'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} [_x=500] Desired width for the graph
     * @return { height | module} Current height or Area Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).height = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as GroupedBarChartModule['height'];

    /**
     * Gets or Sets the horizontal direction of the chart
     * @param  {number} [_x=false]          Desired horizontal direction for the graph
     * @return { isHorizontal | module}     If it is horizontal or Bar Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).isHorizontal = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isHorizontal;
        }
        isHorizontal = _x;

        return this;
    } as GroupedBarChartModule['isHorizontal'];

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * By default this is 'false'
     *
     * @param  {Boolean} [_x=false]     Desired animation flag
     * @return { isAnimated | module}   Current isAnimated flag or Chart module
     * @public
     */
    (exports as GroupedBarChartModule).isAnimated = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    } as GroupedBarChartModule['isAnimated'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls     * @public
     */
    (exports as GroupedBarChartModule).isLoading = function (
        this: GroupedBarChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as GroupedBarChartModule['isLoading'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return { margin | module}   Current margin or Area Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).margin = function (
        this: GroupedBarChartModule,
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
    } as GroupedBarChartModule['margin'];

    /**
     * Gets or Sets the nameLabel of the chart
     * @param  {Number} _x              Desired dateLabel for the graph
     * @return { nameLabel | module}    Current nameLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as GroupedBarChartModule).nameLabel = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return nameLabel;
        }
        nameLabel = _x;
        dataKeyDeprecationMessage('name');

        return this;
    } as GroupedBarChartModule['nameLabel'];

    /**
     * Gets or Sets the numberFormat of the chart
     * @param  {string[]} _x = ',f'     Desired numberFormat for the chart. See examples [here]{@link https://d3js.org/d3-format}
     * @return {string[] | module}      Current numberFormat or Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).numberFormat = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as GroupedBarChartModule['numberFormat'];

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove, customMouseOut, and customClick
     *
     * @return {module} Bar Chart
     * @public
     */
    (exports as GroupedBarChartModule).on = function (
        ...args: [string] | [string, () => void]
    ) {
        // Rest parameters and a spread where this read `arguments` and used
        // `.apply`, following donut.ts and heatmap.ts: the TypeScript lint
        // override makes `prefer-spread` an error, and the two shapes `on` is
        // called with -- a lookup and a registration -- are what the tuple
        // says.
        const value = dispatcher.on(
            ...(args as Parameters<typeof dispatcher.on>)
        );

        return value === dispatcher ? exports : value;
    } as unknown as GroupedBarChartModule['on'];

    /**
     * Gets or Sets the minimum width of the graph in order to show the tooltip
     * NOTE: This could also depend on the aspect ratio
     *
     * @param  {Number} [_x=480]    Minimum width of chart to show the tooltip
     * @return {Number | module}    Current tooltipThreshold or Area Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).tooltipThreshold = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return tooltipThreshold;
        }
        tooltipThreshold = _x;

        return this;
    } as GroupedBarChartModule['tooltipThreshold'];

    /**
     * Gets or Sets the valueLabel of the chart
     * @param  {Number} _x          Desired valueLabel for the graph
     * @return {Number | module}    Current valueLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as GroupedBarChartModule).valueLabel = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return valueLabel;
        }
        valueLabel = _x;
        dataKeyDeprecationMessage('value');

        return this;
    } as GroupedBarChartModule['valueLabel'];

    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     * @example
     *  groupedBarChart
     *  .locale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
     *
     * @param  {LocaleObject}  [_x=null]  _x     Desired locale object format.
     * @return {LocaleObject | module}           Current locale object or Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).valueLocale = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    } as GroupedBarChartModule['valueLocale'];

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} [_x=960]    Desired width for the graph
     * @return {Number | module}    Current width or Area Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).width = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as GroupedBarChartModule['width'];

    /**
     * Gets or Sets the number of ticks of the x axis on the chart
     * @param  {Number} [_x=5]      Desired xTicks
     * @return {Number | module}    Current xTicks or Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).xTicks = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xTicks;
        }
        xTicks = _x;

        return this;
    } as GroupedBarChartModule['xTicks'];

    /**
     * Gets or Sets the y-axis label of the chart
     * @param  {String} _x          Desired label string
     * @return {String | module}    Current yAxisLabel or Chart module to chain calls
     * @public
     * @example groupedBar.yAxisLabel('Ticket Sales')
     */
    (exports as GroupedBarChartModule).yAxisLabel = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabel;
        }
        yAxisLabel = _x;

        return this;
    } as GroupedBarChartModule['yAxisLabel'];

    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     * @param  {Number} [_x=-60]    Desired offset for the label
     * @return {Number | module}    Current yAxisLabelOffset or Chart module to chain calls
     * @public
     * @example groupedBar.yAxisLabelOffset(-55)
     */
    (exports as GroupedBarChartModule).yAxisLabelOffset = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabelOffset;
        }
        yAxisLabelOffset = _x;

        return this;
    } as GroupedBarChartModule['yAxisLabelOffset'];

    /**
     * Gets or Sets the number of ticks of the y axis on the chart
     * @param  {Number} [_x=5]      Desired vertical ticks
     * @return {Number | module}    Current yTicks or Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).yTicks = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yTicks;
        }
        yTicks = _x;

        return this;
    } as GroupedBarChartModule['yTicks'];

    /**
     * Gets or Sets the x and y offset of ticks of the y axis on the chart
     * @param  {Object} [_x={ y: -8, x: -20 }]      Desired offset
     * @return {Object | module}                    Current offset or Chart module to chain calls
     * @public
     */
    (exports as GroupedBarChartModule).yTickTextOffset = function (
        this: GroupedBarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yTickTextOffset;
        }
        yTickTextOffset = _x;

        return this;
    } as GroupedBarChartModule['yTickTextOffset'];

    return exports as unknown as GroupedBarChartModule;
}
