import { min, max } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { dispatch } from 'd3-dispatch';
import { easeCircleIn } from 'd3-ease';
import * as d3Format from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { scaleSqrt, scaleOrdinal, scaleLinear } from 'd3-scale';
import { curveBasis, line } from 'd3-shape';
import { select, pointer } from 'd3-selection';
import { Delaunay } from 'd3-delaunay';
import { zoom as d3Zoom } from 'd3-zoom';
import type { Axis } from 'd3-axis';
import type { Dispatch } from 'd3-dispatch';
import type { FormatLocaleObject } from 'd3-format';
import type {
    NumberValue,
    ScaleLinear,
    ScaleOrdinal,
    ScalePower,
} from 'd3-scale';
import type { BaseType, Selection } from 'd3-selection';
import type { CurveFactory, Line } from 'd3-shape';
import type { D3ZoomEvent } from 'd3-zoom';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import { scatterPlotLoadingMarkup } from '../helpers/load';
import colorHelper from '../helpers/color';
import {
    createFilterContainer,
    createGlowWithMatrix,
    bounceCircleHighlight,
} from '../helpers/filter';
import { calcLinearRegression } from '../helpers/number';
import { setDefaultLocale } from '../helpers/locale';
import { motion } from '../helpers/constants';
import { gridHorizontal, gridVertical } from '../helpers/grid';

import type { LocalObject } from '../../typings/common/local';
import type { ChartMarginParams } from '../../typings/common/margin';
import type { GridTypes } from '../../typings/common/grid';
import type { ColorsSchemasType } from '../../typings/helpers/colors';
import type {
    ScatterPlotDataShape,
    ScatterPlotModule,
} from '../../typings/charts/scatter-plot';

const DEFAULT_ANIMATION_DELAY = 300;
const DEFAULT_TREND_LINE_ANIMATION_DELAY = 1500;

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are the migration plan's bounded `any`, as in the bar charts: these
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
 * `xKey`/`yKey`/`nameKey` reads, which name the members this chart takes its
 * positions from.
 */
type ScatterPlotDatum = ScatterPlotDataShape & {
    [key: string]: unknown;
};

/**
 * The two ends of the trendline, as `calcLinearRegression` gives them and
 * `drawTrendline` reads them.
 */
type TrendLineData = {
    x1?: number;
    y1: number;
    x2?: number;
    y2: number;
};

/**
 * One end of the trendline's path, which the line generator is built over.
 *
 * `x` is optional because `calcLinearRegression` leaves `x1` and `x2` so: it
 * returns them only when the slope is finite. The generator is given
 * `defined`-free data, so an undefined x reaches `xScale` and produces a path
 * with NaN in it -- the chart's existing behaviour for a degenerate
 * regression, and not something a conversion decides.
 */
type TrendLinePoint = {
    x?: number;
    y: number;
};

/**
 * Reusable Scatter Plot API class that renders a
 * simple and configurable scatter chart.
 *
 * @module Scatter-plot
 * @tutorial scatter-plot
 * @requires d3-array, d3-axis, d3-dispatch, d3-format, d3-ease, d3-scale, d3-selection, d3-shape, d3-voronoi
 *
 * @example
 * let scatterPlot = scatterPlot();
 *
 * scatterPlot
 *     .grid('horizontal')
 *     .width(500);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(scatterPlot);
 */

/**
 * @typedef ScatterPlotData
 * @type {Object[]}
 * @property {String} name      Name of the category or topic for data point
 * @property {Number} x         Data point's position value relative to x-axis
 * @property {Number} y         Data point's position value relative to y-axis
 *
 * @example
 * [
 *     {
 *         name: 'topic',
 *         x: 123,
 *         y: 24,
 *     },
 *     {
 *         name: 'topic1',
 *         x: 53,
 *         y: 31,
 *     },
 *     {
 *         name: 'topic2',
 *         x: 631,
 *         y: 321,
 *     },
 *     {
 *         name: 'topic1',
 *         x: 231,
 *         y: 111,
 *     }
 * ]
 */
export default function module(): ScatterPlotModule {
    // Split into `let` and `const` rather than the one `let` chain the
    // JavaScript had: the TypeScript ESLint override runs `prefer-const` as an
    // error, and the bindings below it are never reassigned.
    let margin: ChartMarginParams = {
            top: 20,
            right: 10,
            bottom: 20,
            left: 40,
        },
        width = 960,
        height = 500,
        isLoading = false,
        nameToColorMap: Record<string, string> | null = null,
        dataPoints: ScatterPlotDatum[],
        xTicks = 6,
        // Null by default, which the chart hands straight to d3's `axis.ticks`
        // to mean "use the scale's own tick count". `xTicks` above is a plain
        // number, so the two differ on the same chart.
        yTicks: number | null = null,
        grid: GridTypes | null = null,
        maskGridLines: ChartSelection<SVGRectElement>,
        delaunayMesh: Delaunay<ScatterPlotDatum>,
        xAxis: Axis<NumberValue>,
        xAxisFormatType = 'number',
        xAxisFormat = '',
        xScale: ScaleLinear<number, number>,
        xOriginalScale: ScaleLinear<number, number>,
        yAxis: Axis<NumberValue>,
        yAxisFormat = '',
        yScale: ScaleLinear<number, number>,
        yOriginalScale: ScaleLinear<number, number>,
        areaScale: ScalePower<number, number>,
        colorScale: ScaleOrdinal<string, string>,
        // No default: the chart appends no label element until one is set,
        // which is what the declarations now say for both axes.
        yAxisLabel: string | undefined,
        yAxisLabelEl: ChartSelection<SVGTextElement>,
        yAxisLabelOffset = -50,
        xAxisLabel: string | undefined,
        xAxisLabelEl: ChartSelection<SVGTextElement>,
        xAxisLabelOffset = -50,
        trendLinePath: ChartSelection<SVGPathElement>,
        // Only set once a point has been hovered, which is why the zoom
        // handler guards on it -- see 3c45ee50.
        highlightPointData: ScatterPlotDatum | undefined,
        highlightFilter: ChartSelection<SVGFilterElement>,
        highlightFilterId: string,
        highlightCrossHairContainer: ChartSelection<SVGGElement>,
        highlightCrossHairLabelsContainer: ChartSelection<SVGGElement>,
        highlightTextLegendOffset = -45,
        circleOpacity = 0.24,
        circleStrokeOpacity = 1,
        circleStrokeWidth = 1,
        highlightCircle: ChartSelection<SVGCircleElement> | null = null,
        maxCircleArea = 10,
        maskingRectangle: ChartSelection<SVGRectElement>,
        colorSchema: ColorsSchemasType = colorHelper.colorSchemas.britecharts,
        isAnimated = false,
        hasCrossHairs = false,
        hasTrendline = false,
        enableZoom = false,
        hasHollowCircles = false,
        locale: LocalObject | null = null,
        // The d3-format namespace to start with, replaced by a locale-specific
        // formatter once `valueLocale` is set. Both carry `format`, which is
        // all `buildAxis` reads off it.
        localeFormatter: FormatLocaleObject = d3Format,
        svg: ChartSelection<SVGSVGElement>,
        chartWidth: number,
        chartHeight: number,
        // Reassigned by the `animationDuration` accessor, so it stays a `let`.
        duration = motion.mediumDuration;

    const highlightCircleOpacity = circleOpacity;
    const xKey = 'x';
    const yKey = 'y';
    const nameKey = 'name';
    const tickPadding = 5;
    const hollowColor = '#fff';
    const minZoom = 0.5;
    const maxZoom = 20;
    const trendLineCurve: CurveFactory = curveBasis;
    const trendLineStrokWidth = '2';
    const trendLineDelay = DEFAULT_TREND_LINE_ANIMATION_DELAY;
    const trendLineDuration = 2000;
    const highlightStrokeWidth = 10;
    const xAxisPadding = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    };
    const maskingRectangleId = 'scatter-clip-path';
    const ease = easeCircleIn;
    const delay = DEFAULT_ANIMATION_DELAY;

    const dispatcher: Dispatch<object> = dispatch(
        'customClick',
        'customMouseMove',
        'customMouseOver',
        'customMouseOut'
    );
    /**
     * The colour a point's category is drawn in.
     *
     * `buildScales` fills `nameToColorMap` before anything is drawn, so it is
     * non-null everywhere this is reached -- the same reasoning, and the same
     * shape, as `colorForGroup` in grouped-bar.ts.
     */
    const colorForName = (name: string) =>
        (nameToColorMap as Record<string, string>)[name];
    const getName = ({ name }: ScatterPlotDatum) => name;
    const getPointData = ({ data }: { data: ScatterPlotDatum }) => data;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {ScatterPlotData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            ScatterPlotDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        if (locale) {
            localeFormatter = setDefaultLocale(locale);
        }

        _selection.each(function (_data) {
            dataPoints = cleanData(_data);

            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);

            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildScales();
            buildAxis(localeFormatter);
            buildVoronoi();
            drawAxis();
            drawGridLines();
            initHighlightComponents();
            drawDataPoints();
            drawMaskingClip();
            initZoom();

            if (hasTrendline) {
                drawTrendline(calcLinearRegression(dataPoints));
            }

            addMouseEvents();
        });
    }

    /**
     * Add mouse event handlers over svg
     * @return {void}
     * @private
     */
    function addMouseEvents() {
        svg.on('mousemove', function (event, d) {
            handleMouseMove(this, d, event);
        })
            .on('mouseover', function (event, d) {
                handleMouseOver(this, d, event);
            })
            .on('mouseout', function (event, d) {
                handleMouseOut(this, d, event);
            })
            .on('click', function (event) {
                handleClick(this, event);
            });
    }

    /**
     * Creates the x-axis and y-axis with proper orientations
     * @return {void}
     * @private
     */
    function buildAxis(localeFormatter: FormatLocaleObject) {
        xAxis = axisBottom(xScale)
            .ticks(xTicks)
            .tickPadding(tickPadding)
            .tickFormat(getXAxisFormat());

        yAxis = axisLeft(yScale)
            // Null by default, which d3 reads as "use the scale's own count".
            .ticks(yTicks as number)
            .tickPadding(tickPadding)
            .tickFormat(localeFormatter.format(yAxisFormat));
    }

    /**
     * Cleans the loading state
     * @return {void}
     * @private
     */
    function cleanLoadingState() {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Draws the loading state
     * @return {void}
     * @private
     */
    function drawLoadingState() {
        svg.select('.loading-state-group').html(scatterPlotLoadingMarkup);
    }

    /**
     * Builds containers for the chart, including the chart axis,
     * chart, and metadata groups.
     * @return {void}
     * @private
     */
    function buildContainerGroups() {
        const container = svg
            .append('g')
            .classed('container-group', true)
            .attr(
                'transform',
                `translate(${margin.left ?? 0}, ${margin.top ?? 0})`
            );

        container.append('g').classed('grid-lines-group', true);
        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('chart-group', true);
        container
            .append('g')
            .classed('x-axis-group', true)
            .append('g')
            .classed('axis x', true);
        container
            .append('g')
            .classed('y-axis-group', true)
            .append('g')
            .classed('axis y', true);
        container.append('g').classed('axis-labels-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Builds the Delaunay triangulation used to find the point nearest the
     * cursor. Replaces d3-voronoi, which is deprecated; the extent that
     * diagram took only clipped its cells and did not affect find().
     * @return {void}
     * @private
     */
    function buildVoronoi() {
        delaunayMesh = Delaunay.from(
            dataPoints,
            (d) => xScale(d.x),
            (d) => yScale(d.y)
        );
    }

    /**
     * Creates the x and y scales of the chart
     * @return {void}
     * @private
     */
    function buildScales() {
        const [minX, minY] = [
            min(dataPoints, ({ x }) => x),
            min(dataPoints, ({ y }) => y),
        ];
        const [maxX, maxY] = [
            max(dataPoints, ({ x }) => x),
            max(dataPoints, ({ y }) => y),
        ];
        // `Math.abs` is never negative, so this condition is always false and
        // the bottom of the value scale is always 0. Preserved as it stands --
        // a conversion is the wrong place to change where a chart's axis
        // starts. `?? 0` keeps the same answer for empty data, where `minY` is
        // undefined and `Math.abs(undefined) < 0` was already false.
        const yScaleBottomValue =
            Math.abs(minY ?? 0) < 0 ? Math.abs(minY ?? 0) : 0;

        xOriginalScale = xScale = scaleLinear()
            .domain([minX as number, maxX as number])
            .rangeRound([0, chartWidth])
            .nice();

        yOriginalScale = yScale = scaleLinear()
            .domain([yScaleBottomValue, maxY as number])
            .rangeRound([chartHeight, 0])
            .nice();

        colorScale = scaleOrdinal<string, string>()
            .domain(dataPoints.map(getName))
            .range(colorSchema);

        areaScale = scaleSqrt<number, number>()
            .domain([yScaleBottomValue, maxY as number])
            .range([0, maxCircleArea]);

        const colorRange = colorScale.range();

        /**
         * Maps data point category name to
         * each color of the given color scheme
         * {
         *     name1: 'color1',
         *     name2: 'color2',
         *     name3: 'color3',
         *     ...
         * }
         */
        nameToColorMap =
            nameToColorMap ||
            colorScale
                .domain()
                .reduce<Record<string, string>>((accum, item, i) => {
                    accum[item] = colorRange[i];

                    return accum;
                }, {});
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param {HTMLElement} container A DOM element that will work as
     * the container of the chart
     * @return {void}
     * @private
     */
    function buildSVG(container: Element) {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart scatter-plot', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Cleaning data casting the values and names to the proper type while keeping
     * the rest of properties on the data
     * @param  {ScatterPlotData} originalData  Raw data as passed to the container
     * @return  {ScatterPlotData}              Clean data
     * @private
     */
    function cleanData(
        originalData: ScatterPlotDataShape[]
    ): ScatterPlotDatum[] {
        return originalData.reduce<ScatterPlotDatum[]>((acc, datum) => {
            // Written onto the caller's own objects rather than copies, which
            // is the runtime this preserves. The cast covers the three reads
            // by key name.
            const d = datum as ScatterPlotDatum;

            d.name = String(d[nameKey]);
            d.x = d[xKey] as number;
            d.y = d[yKey] as number;

            return [...acc, d];
        }, []);
    }

    /**
     * Draws the x and y axis on the svg object within their
     * respective groups along with their axis labels
     * @return {void}
     * @private
     */
    function drawAxis() {
        svg.select<SVGGElement>('.x-axis-group .axis.x')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis);

        svg.select<SVGGElement>('.y-axis-group .axis.y').call(yAxis);

        drawAxisLabels();
    }

    /**
     * Draws axis labels next to x and y axis to
     * represent data value labels on the chart
     * @return {void}
     * @private
     */
    function drawAxisLabels() {
        // If y-axis label is given, draw it
        if (yAxisLabel) {
            if (yAxisLabelEl) {
                svg.selectAll('.y-axis-label-text').remove();
            }

            yAxisLabelEl = svg
                .select('.axis-labels-group')
                .append('g')
                .attr('class', 'y-axis-label')
                .append('text')
                .classed('y-axis-label-text', true)
                .attr('x', -chartHeight / 2)
                .attr('y', yAxisLabelOffset - xAxisPadding.left)
                .attr('text-anchor', 'middle')
                .attr('transform', 'rotate(270 0 0)')
                .text(yAxisLabel);
        }

        // If x-axis label is given, draw it
        if (xAxisLabel) {
            if (xAxisLabelEl) {
                svg.selectAll('.x-axis-label-text').remove();
            }

            xAxisLabelEl = svg
                .selectAll('.axis-labels-group')
                .append('g')
                .attr('class', 'x-axis-label')
                .append('text')
                .classed('x-axis-label-text', true)
                .attr('x', chartWidth / 2)
                .attr('y', chartHeight - xAxisLabelOffset)
                .attr('text-anchor', 'middle')
                .text(xAxisLabel);
        }
    }

    /**
     * Draws a masking clip for data points/circles
     * to refer to. This will allow dots to have lower priority
     * in the DOM.
     * @return {void}
     * @private
     */
    function drawMaskingClip() {
        maskingRectangle = svg
            .selectAll('.chart-group')
            .append('clipPath')
            .attr('id', maskingRectangleId)
            .append('rect')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .attr('x', 0)
            .attr('y', -1 * maxCircleArea);
    }

    /**
     * Add Zoom control and event handling
     * @return {void}
     * @private
     */
    function initZoom() {
        if (!enableZoom) {
            return;
        }

        const zoom = d3Zoom<SVGRectElement, unknown>();
        zoom.scaleExtent([minZoom, maxZoom]) // This control how much you can unzoom (x0.5) and zoom (x20)
            .extent([
                [0, 0],
                [width, height],
            ])
            .on('zoom', updateChartAfterZoom);

        // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
        svg.append('rect')
            .attr('class', 'zoom')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .attr(
                'transform',
                `translate(${margin.left ?? 0}, ${margin.top ?? 0})`
            )
            .call(zoom);
    }

    /**
     * Update chart elements after zoom events
     * @return {void}
     * @private
     */
    function updateChartAfterZoom(event: D3ZoomEvent<SVGRectElement, unknown>) {
        // d3-zoom calls this with (event, datum) and the event carries the
        // transform. It used to read `zoomTransform(elements[0])` from a third
        // parameter, which is d3 v5's `(d, i, nodes)` signature -- v6 and
        // later pass no such argument, so the line threw on the first zoom
        // event and the whole feature was dead.
        const transform = event.transform;

        //update scale
        xScale = transform.rescaleX(xOriginalScale);
        yScale = transform.rescaleY(yOriginalScale);
        //update axes
        xAxis.scale(xScale);
        yAxis.scale(yScale);
        svg.select<SVGGElement>('.x-axis-group .axis.x').call(xAxis);
        svg.select<SVGGElement>('.y-axis-group .axis.y').call(yAxis);

        // update circle position
        svg.select('.chart-group')
            .selectAll('circle')
            .attr('cx', (d) => xScale((d as ScatterPlotDatum).x))
            .attr('cy', (d) => yScale((d as ScatterPlotDatum).y));

        // update highlight location
        //
        // Guarded because `highlightCircle` is bound to a single placeholder
        // datum by initHighlightComponents, so its accessors always run, while
        // `highlightPointData` is only set once a point has been hovered.
        // Before the first hover there is no highlight to move, and reading
        // `.x` off it threw.
        if (highlightCircle && highlightPointData) {
            const hovered = highlightPointData;

            highlightCircle
                .attr('cx', () => xScale(hovered.x))
                .attr('cy', () => yScale(hovered.y));
        }
    }

    /**
     * Draws a trend line given the data that contains
     * and y params from calculated y-intercept and slope
     * using linear regression formula.
     * @param {Object} linearData
     * @returns {void}
     * @private
     */
    function drawTrendline(linearData: TrendLineData) {
        if (trendLinePath) {
            trendLinePath.remove();
        }

        const params = [
            {
                x: linearData.x1,
                y: linearData.y1,
            },
            {
                x: linearData.x2,
                y: linearData.y2,
            },
        ];

        const trendLine: Line<TrendLinePoint> = line<TrendLinePoint>()
            .curve(trendLineCurve)
            .x(({ x }) => xScale(x as number))
            .y(({ y }) => yScale(y));

        trendLinePath = svg
            .selectAll('.chart-group')
            .append('path')
            .attr('class', 'scatter-trendline')
            .attr('d', trendLine(params))
            .attr('stroke', colorSchema[0])
            .attr('stroke-width', trendLineStrokWidth)
            .attr('fill', 'none');

        // pathLength is the SVGAnimatedNumber for the attribute, not the
        // computed length; getTotalLength() is the geometry API.
        const trendLineNode = trendLinePath.node();
        const totalLength =
            trendLineNode && typeof trendLineNode.getTotalLength === 'function'
                ? trendLineNode.getTotalLength()
                : 0;

        trendLinePath
            .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .delay(trendLineDelay)
            .duration(trendLineDuration)
            .ease(ease)
            .attr('stroke-dashoffset', 0);
    }

    /**
     * Draws vertical gridlines of the chart
     * These gridlines are parallel to y-axis
     * @return {void}
     * @private
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
     * Draws the points for each data element on the chart group
     * @return {void}
     * @private
     */
    function drawDataPoints() {
        const circles = svg
            .select('.chart-group')
            .attr('clip-path', `url(#${maskingRectangleId})`)
            .selectAll('circle')
            .data(dataPoints)
            .enter();

        if (isAnimated) {
            circles
                .append('circle')
                .attr('class', 'data-point')
                .transition()
                .delay(delay)
                .duration(duration)
                .ease(ease)
                .attr('stroke-opacity', circleStrokeOpacity)
                .attr('stroke-width', circleStrokeWidth)
                .style('stroke', (d) => colorForName(d.name))
                .attr('fill', (d) =>
                    hasHollowCircles ? hollowColor : colorForName(d.name)
                )
                .attr('fill-opacity', circleOpacity)
                .attr('r', (d) => areaScale(d.y))
                .attr('cx', (d) => xScale(d.x))
                .attr('cy', (d) => yScale(d.y))
                .style('cursor', 'pointer');
        } else {
            circles
                .append('circle')
                .attr('class', 'data-point')
                .attr('stroke-opacity', circleStrokeOpacity)
                .attr('stroke-width', circleStrokeWidth)
                .style('stroke', (d) => colorForName(d.name))
                .attr('fill', (d) =>
                    hasHollowCircles ? hollowColor : colorForName(d.name)
                )
                .attr('fill-opacity', circleOpacity)
                .attr('r', (d) => areaScale(d.y))
                .attr('cx', (d) => xScale(d.x))
                .attr('cy', (d) => yScale(d.y))
                .style('cursor', 'pointer');
        }

        // Exit
        circles.exit().remove();
    }

    /**
     * Draws the crosshair lines and label components
     * given the coordinates and name of the data point
     * @param {Object} dataPoint
     * @return {void}
     * @private
     */
    function drawDataPointsValueHighlights(data: ScatterPlotDatum) {
        showCrossHairComponentsWithLabels(true);

        // Draw line perpendicular to y-axis
        highlightCrossHairContainer
            .selectAll('line.highlight-y-line')
            .attr('stroke', colorForName(data.name))
            .attr('class', 'highlight-y-line')
            .attr('x1', xScale(data.x) - areaScale(data.y))
            .attr('x2', 0)
            .attr('y1', yScale(data.y))
            .attr('y2', yScale(data.y));

        // Draw line perpendicular to x-axis
        highlightCrossHairContainer
            .selectAll('line.highlight-x-line')
            .attr('stroke', colorForName(data.name))
            .attr('class', 'highlight-x-line')
            .attr('x1', xScale(data.x))
            .attr('x2', xScale(data.x))
            .attr('y1', yScale(data.y) + areaScale(data.y))
            .attr('y2', chartHeight);

        // Draw data label for y value
        highlightCrossHairLabelsContainer
            .selectAll('text.highlight-y-legend')
            .attr('text-anchor', 'middle')
            .attr('fill', colorForName(data.name))
            .attr('class', 'highlight-y-legend')
            .attr('y', yScale(data.y) + areaScale(data.y) / 2)
            .attr('x', highlightTextLegendOffset)
            .text(`${localeFormatter.format(yAxisFormat)(data.y)}`);

        // Draw data label for x value
        highlightCrossHairLabelsContainer
            .selectAll('text.highlight-x-legend')
            .attr('text-anchor', 'middle')
            .attr('fill', colorForName(data.name))
            .attr('class', 'highlight-x-legend')
            .attr(
                'transform',
                `translate(0, ${chartHeight - highlightTextLegendOffset})`
            )
            .attr('x', xScale(data.x) - areaScale(data.y) / 2)
            .text(`${getXAxisFormat()(data.x)}`);
    }

    /**
     * Draws grid lines on the background of the chart
     * @return {void}
     * @private
     */
    function drawGridLines() {
        svg.select('.grid-lines-group').selectAll('grid').remove();

        if (grid === 'horizontal' || grid === 'full') {
            drawHorizontalGridLines();
        }

        if (grid === 'vertical' || grid === 'full') {
            drawVerticalGridLines();
        }
    }

    /**
     * Draw horizontal gridles of the chart
     * These gridlines are parallel to x-axis
     * @return {void}
     * @private
     */
    function drawHorizontalGridLines() {
        const grid = gridHorizontal(yScale)
            .range([0, chartWidth])
            .hideEdges('first')
            // `yTicks` is null by default, which the grid passes on to the
            // scale the same way the axis does.
            .ticks(yTicks as number)
            .extendedLine(xAxisPadding.left);

        grid(svg.select('.grid-lines-group'));
    }

    /**
     * Finds the closest point to the current mouse position
     * @param {SVGHtmlElement} svg
     * @private
     */
    function getClosestPoint(svg: SVGSVGElement, event: Event) {
        const [pointerX, pointerY] = pointer(event, svg);

        // A synthetic event carries no clientX/clientY, so the position comes
        // back non-finite. d3-voronoi's find() returned the first site in that
        // case; Delaunay's returns nothing usable, so match the old result
        // rather than crash. Only reachable from dispatched events -- a real
        // pointer always has coordinates.
        if (!Number.isFinite(pointerX) || !Number.isFinite(pointerY)) {
            return { data: dataPoints[0] };
        }

        // d3-delaunay's find() returns an index, where d3-voronoi returned a
        // site object; wrap it back into the { data } shape getPointData reads.
        const index = delaunayMesh.find(
            pointerX - (margin.left ?? 0),
            pointerY - (margin.top ?? 0)
        );

        return { data: dataPoints[index] };
    }

    /**
     * Gets the formatter function for x-Axis based on `xAxisFormatType` setter
     * Applies `timeFormat` formatter function if custom `xAxisFormatType`
     * that is not equal to 'number' is provided
     * @return {function(String): String}
     * @private
     */
    function getXAxisFormat(): (value: NumberValue) => string {
        if (xAxisFormatType === 'number') {
            return d3Format.format(xAxisFormat);
        } else {
            // `timeFormat` takes a Date, and every caller here passes a
            // number: the x scale is linear, so both the axis's tick values
            // and the cross-hair label are numbers. Setting
            // `xAxisFormatType` to anything but 'number' therefore hands a
            // number to a formatter that reads Date methods off it.
            // Preserved as it stands and typed at the boundary -- the default
            // is 'number', so the branch is dormant, and changing what it
            // accepts is a published-behaviour decision.
            return timeFormat(xAxisFormat) as unknown as (
                value: NumberValue
            ) => string;
        }
    }

    /**
     * Handler called on mousemove event
     * @return {void}
     * @private
     */
    function handleMouseMove(e: SVGSVGElement, d: unknown, event: Event) {
        const closestPoint = getClosestPoint(e, event);
        const pointData = getPointData(closestPoint);

        if (hasCrossHairs) {
            drawDataPointsValueHighlights(pointData);
        }

        highlightDataPoint(pointData);

        dispatcher.call(
            'customMouseMove',
            e,
            pointData,
            getPointPosition(pointData),
            [chartWidth, chartHeight]
        );
    }

    /**
     * Where a point is drawn, in the coordinate space of the chart's
     * drawing area -- the space the tooltip lives in. The tooltip is
     * anchored to the point itself rather than to the pointer, so it sits
     * beside the point and stays put while the pointer moves within it.
     * @param  {Object} pointData   The point, with x and y in data units
     * @return {Number[]}           [x, y] in pixels
     * @private
     */
    function getPointPosition(pointData: ScatterPlotDatum) {
        return [xScale(pointData.x), yScale(pointData.y)];
    }

    /**
     * Handler called on mouseover event
     * @return {void}
     * @private
     */
    function handleMouseOver(e: SVGSVGElement, d: unknown, event: Event) {
        const pointData = getPointData(getClosestPoint(e, event));

        dispatcher.call(
            'customMouseOver',
            e,
            pointData,
            getPointPosition(pointData)
        );
    }

    /**
     * Handler called on mouseout event
     * @return {void}
     * @private
     */
    function handleMouseOut(e: SVGSVGElement, d: unknown, event: Event) {
        removePointHighlight();

        if (hasCrossHairs) {
            showCrossHairComponentsWithLabels(false);
        }
        dispatcher.call('customMouseOut', e, d, pointer(event, e));
    }

    /**
     * Custom onClick event handler
     * @return {void}
     * @private
     */
    function handleClick(e: SVGSVGElement, event: Event) {
        const closestPoint = getClosestPoint(e, event);
        const d = getPointData(closestPoint);

        handleClickAnimation(d);

        dispatcher.call('customClick', e, d, pointer(event, e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Applies animation on data point click
     * @param {Object} dataPoint
     * @return {void}
     * @private
     */
    function handleClickAnimation(dataPoint: ScatterPlotDatum) {
        bounceCircleHighlight(
            // Created by `initHighlightComponents` on every render, before any
            // handler can reach it. The `= null` initialiser is never read:
            // nothing tests it.
            highlightCircle!,
            ease,
            areaScale(dataPoint.y),
            areaScale(dataPoint.y * 2)
        );
    }

    /**
     * Applies glow to hovered data point
     * @return {void}
     * @private
     */
    function highlightDataPoint(data: ScatterPlotDatum) {
        highlightPointData = data;

        removePointHighlight();

        if (!highlightFilter) {
            highlightFilter = createFilterContainer(
                svg.select('.metadata-group')
            );
            highlightFilterId = createGlowWithMatrix(highlightFilter);
        }

        highlightCircle!
            .attr('opacity', 1)
            .attr('stroke', () => colorForName(data.name))
            .attr('fill', () => colorForName(data.name))
            .attr('fill-opacity', circleOpacity)
            .attr('cx', () => xScale(data.x))
            .attr('cy', () => yScale(data.y))
            .attr('r', () => areaScale(data.y))
            .style('stroke-width', highlightStrokeWidth)
            .style('stroke-opacity', highlightCircleOpacity);

        // apply glow container overlay
        highlightCircle!.attr('filter', `url(#${highlightFilterId})`);
    }

    /**
     * Places the highlighter point to the DOM
     * to be used once one of the data points is
     * highlighted
     * @return {void}
     * @private
     */
    function initHighlightComponents() {
        highlightCircle = svg
            .select('.metadata-group')
            .selectAll('circle.highlight-circle')
            .data([1])
            .enter()
            .append('circle')
            .attr('class', 'highlight-circle')
            .attr('cursor', 'pointer');

        if (hasCrossHairs) {
            // initialize cross hair lines container
            highlightCrossHairContainer = svg
                .select('.chart-group')
                .append('g')
                .attr('class', 'crosshair-lines-container');

            // initialize corss hair labels container
            highlightCrossHairLabelsContainer = svg
                .select('.metadata-group')
                .append('g')
                .attr('class', 'crosshair-labels-container');

            highlightCrossHairContainer
                .selectAll('line.highlight-y-line')
                .data([1])
                .enter()
                .append('line')
                .attr('class', 'highlight-y-line');

            highlightCrossHairContainer
                .selectAll('line.highlight-x-line')
                .data([1])
                .enter()
                .append('line')
                .attr('class', 'highlight-x-line');

            highlightCrossHairLabelsContainer
                .selectAll('text.highlight-y-legend')
                .data([1])
                .enter()
                .append('text')
                .attr('class', 'highlight-y-legend');

            highlightCrossHairLabelsContainer
                .selectAll('text.highlight-x-legend')
                .data([1])
                .enter()
                .append('text')
                .attr('class', 'highlight-x-legend');

            highlightCrossHairLabelsContainer
                .selectAll('text.highlight-x-legend')
                .data([1])
                .enter()
                .append('text')
                .attr('class', 'highlight-x-legend');
        }

        highlightCircle.exit().remove();
    }

    /**
     * Removes higlight data point from chart
     * @return {void}
     * @private
     */
    function removePointHighlight() {
        svg.selectAll('circle.highlight-circle').attr('opacity', 0);
    }

    /**
     * Sets the visibility of cross hair lines
     * if 1, it sets lines to visible,
     * if 0, it hides lines
     * @param {boolean}
     * @return {void}
     * @private
     */
    function showCrossHairComponentsWithLabels(status = false) {
        const opacityIndex = status ? 1 : 0;

        highlightCrossHairContainer.attr('opacity', opacityIndex);
        highlightCrossHairLabelsContainer.attr('opacity', opacityIndex);
    }

    // API
    /**
     * Gets or Sets the duration of the circle animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).animationDuration = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return duration;
        }
        duration = _x;

        return this;
    } as ScatterPlotModule['animationDuration'];

    /**
     * Gets or Sets each circle's border opacity value of the chart.
     * It makes each circle border transparent if it's less than 1.
     * @param  {Number} _x=1            Desired border opacity of circles of the chart
     * @return {Number | module}           Current circleStrokeOpacity or Chart module to chain calls
     * @public
     * @example
     * scatterPlot.circleStrokeOpacity(0.6)
     */
    (exports as ScatterPlotModule).circleStrokeOpacity = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return circleStrokeOpacity;
        }
        circleStrokeOpacity = _x;

        return this;
    } as ScatterPlotModule['circleStrokeOpacity'];

    /**
     * Gets or Sets each circle's border width value of the chart.
     * It makes each circle border transparent if it's less than 1.
     * @param  {Number} _x=1            Desired border width of circles of the chart
     * @return {Number | module}           Current circleStrokeWidth or Chart module to chain calls
     * @public
     * @example
     * scatterPlot.circleStrokeWidth(10)
     */
    (exports as ScatterPlotModule).circleStrokeWidth = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return circleStrokeWidth;
        }
        circleStrokeWidth = _x;

        return this;
    } as ScatterPlotModule['circleStrokeWidth'];

    /**
     * Gets or Sets the circles opacity value of the chart.
     * Use this to set opacity of a circle for each data point of the chart.
     * It makes the area of each data point more transparent if it's less than 1.
     * @param  {Number} _x=0.24            Desired opacity of circles of the chart
     * @return {Number | module}    Current circleOpacity or Chart module to chain calls
     * @public
     * @example
     * scatterPlot.circleOpacity(0.6)
     */
    (exports as ScatterPlotModule).circleOpacity = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return circleOpacity;
        }
        circleOpacity = _x;

        return this;
    } as ScatterPlotModule['circleOpacity'];

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {object | module}     Current colorMap or Chart module to chain calls
     * @example scatterPlot.colorMap({name: 'colorHex', name2: 'colorString'})
     * @public
     */
    (exports as ScatterPlotModule).colorMap = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return nameToColorMap;
        }
        nameToColorMap = _x;

        return this;
    } as ScatterPlotModule['colorMap'];

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {String[]} _x         Desired colorSchema for the chart
     * @return {String[] | module}   Current colorSchema or Chart module to chain calls
     * @public
     * @example
     * scatterPlot.colorSchema(['#fff', '#bbb', '#ccc'])
     */
    (exports as ScatterPlotModule).colorSchema = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as ScatterPlotModule['colorSchema'];

    /**
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as ScatterPlotModule).exportChart = function (filename, title) {
        return exportChart.call(
            exports as ScatterPlotModule,
            svg,
            filename,
            title
        );
    } as ScatterPlotModule['exportChart'];

    /**
     * Gets or Sets the grid mode.
     * @param  {String} _x          Desired mode for the grid ('vertical'|'horizontal'|'full')
     * @return {String | module}    Current mode of the grid or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).grid = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return grid;
        }
        grid = _x;

        return this;
    } as ScatterPlotModule['grid'];

    /**
     * Gets or Sets the hasCrossHairs status. If true,
     * the hovered data point will be highlighted with lines
     * and legend from both x and y axis. The user will see
     * values for x under x axis line and y under y axis. Lines
     * will be drawn with respect to highlighted data point
     * @param  {boolean} _x=false   Desired hasCrossHairs status for chart
     * @return {boolean | module}   Current hasCrossHairs or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).hasCrossHairs = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return hasCrossHairs;
        }
        hasCrossHairs = _x;

        return this;
    } as ScatterPlotModule['hasCrossHairs'];

    /**
     * Gets or Sets the hasHollowCircles value of the chart area
     * @param  {boolean} _x=false    Choose whether chart's data points/circles should be hollow
     * @return {boolean | module}    Current hasHollowCircles value or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).hasHollowCircles = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return hasHollowCircles;
        }
        hasHollowCircles = _x;

        return this;
    } as ScatterPlotModule['hasHollowCircles'];

    /**
     * Gets or Sets the hasTrendline value of the chart area
     * If true, the trendline calculated based off linear regression
     * formula will be drawn
     * @param  {boolean} _x=false       Choose whether chart's trendline should be drawn
     * @return {boolean | module}       Current hasTrendline value or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).hasTrendline = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return hasTrendline;
        }
        hasTrendline = _x;

        return this;
    } as ScatterPlotModule['hasTrendline'];

    /**
     * Gets or Sets weather the chart support zoom controls
     * If true, zoom event handling will be added to the chart.
     * @param  {boolean} _x=false       Choose whether chart should support zoom controls
     * @return {boolean | module}       Current enableZoom value or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).enableZoom = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return enableZoom;
        }
        enableZoom = _x;

        return this;
    } as ScatterPlotModule['enableZoom'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} _flag          Desired value for the loading state
     * @return {boolean | module}       Current loading state flag or Chart module to chain calls
     * @public
     * @example chart.isLoading(true)
     */
    (exports as ScatterPlotModule).isLoading = function (
        this: ScatterPlotModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as ScatterPlotModule['isLoading'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x          Desired height for the chart
     * @return {Number | module}    Current height or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).height = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as ScatterPlotModule['height'];

    /**
     * Sets a custom distance between legend
     * values with respect to both axises. The legends
     * show up when hasCrossHairs is true.
     * @param  {Number} _x          Desired highlightTextLegendOffset for the chart
     * @return {Number | module}    Current highlightTextLegendOffset or Chart module to chain calls
     * @public
     * @example
     * scatterPlot.highlightTextLegendOffset(-55)
     */
    (exports as ScatterPlotModule).highlightTextLegendOffset = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return highlightTextLegendOffset;
        }
        highlightTextLegendOffset = _x;

        return this;
    } as ScatterPlotModule['highlightTextLegendOffset'];

    /**
     * Gets or Sets isAnimated value. If set to true,
     * the chart will be initialized or updated with animation.
     * @param  {boolean} _x=false    Desired isAnimated properties for each side
     * @return {boolean | module}    Current isAnimated or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).isAnimated = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    } as ScatterPlotModule['isAnimated'];

    /**
     * Gets or Sets the margin object of the chart
     * @param  {Object} _x          Desired margin object properties for each side
     * @return {Object | module}    Current margin or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).margin = function (
        this: ScatterPlotModule,
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
    } as ScatterPlotModule['margin'];

    /**
     * Gets or Sets the maximum value of the chart area
     * @param  {Number} _x=10       Desired margin object properties for each side
     * @return {Number | module}    Current maxCircleArea or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).maxCircleArea = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return maxCircleArea;
        }
        maxCircleArea = _x;

        return this;
    } as ScatterPlotModule['maxCircleArea'];

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customClick, customMouseOut, customMouseOver, and customMouseMove
     * @return {module} Scatter Plot
     * @public
     */
    (exports as ScatterPlotModule).on = function (
        ...args: [string] | [string, () => void]
    ) {
        // Rest parameters and a spread where this read `arguments` and used
        // `.apply`, following the other converted charts.
        const value = dispatcher.on(
            ...(args as Parameters<typeof dispatcher.on>)
        );

        return value === dispatcher ? exports : value;
    } as unknown as ScatterPlotModule['on'];

    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     * @example
     * scatterPlot
     *  .locale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
     * @param  {LocaleObject}  [_x=null]  _x        Desired locale object format.
     * @return {LocaleObject | module}              Current locale object or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).valueLocale = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    } as ScatterPlotModule['valueLocale'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x           Desired height for the chart
     * @return {Number | module}     Current width or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).width = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as ScatterPlotModule['width'];

    /**
     * Gets or Sets the xAxisLabel of the chart. Adds a
     * label bellow x-axis for better clarify of data representation.
     * @param  {String} _x              Desired string for x-axis label of the chart
     * @return {String | module}        Current xAxisLabel or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).xAxisLabel = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisLabel;
        }
        xAxisLabel = _x;

        return this;
    } as ScatterPlotModule['xAxisLabel'];

    /**
     * Gets or Sets the offset of the xAxisLabel of the chart.
     * The method accepts both positive and negative values.
     * @param  {Number} _x=-40          Desired offset for the label
     * @return {Number | module}        Current xAxisLabelOffset or Chart module to chain calls
     * @public
     * @example scatterPlot.xAxisLabelOffset(-55)
     */
    (exports as ScatterPlotModule).xAxisLabelOffset = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisLabelOffset;
        }
        xAxisLabelOffset = _x;

        return this;
    } as ScatterPlotModule['xAxisLabelOffset'];

    /**
     * Exposes ability to set the format of x-axis values
     * @param  {String} _x        Desired xAxisFormat for the chart
     * @return {String | module}  Current xAxisFormat or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).xAxisFormat = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisFormat;
        }
        xAxisFormat = _x;

        return this;
    } as ScatterPlotModule['xAxisFormat'];

    /**
     * Exposes ability to set the formatter of x-axis values
     * @param  {string} _x          type of x-axis formatter
     * @value 'number'
     * @value 'time'
     * @return {string | module}    current xAxisFormatType or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).xAxisFormatType = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisFormatType;
        }
        xAxisFormatType = _x;

        return this;
    } as ScatterPlotModule['xAxisFormatType'];

    /**
     * Gets or Sets the xTicks of the chart
     * @param  {Number} _x         Desired xTicks for the chart
     * @return {Number | module}   Current xTicks or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).xTicks = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return xTicks;
        }
        xTicks = _x;

        return this;
    } as ScatterPlotModule['xTicks'];

    /**
     * Exposes ability to set the format of y-axis values
     * @param  {String} _x          Desired yAxisForma for the chart
     * @return {String | module}    Current yAxisFormat or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).yAxisFormat = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisFormat;
        }
        yAxisFormat = _x;

        return this;
    } as ScatterPlotModule['yAxisFormat'];

    /**
     * Gets or Sets the y-axis label of the chart
     * @param  {String} _x          Desired label string
     * @return {String | module}    Current yAxisLabel or Chart module to chain calls
     * @public
     * @example scatterPlot.yAxisLabel('Ice Cream Consmuption Growth')
     */
    (exports as ScatterPlotModule).yAxisLabel = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabel;
        }
        yAxisLabel = _x;

        return this;
    } as ScatterPlotModule['yAxisLabel'];

    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     * @param  {Number} _x=-40      Desired offset for the label
     * @return {Number | module}    Current yAxisLabelOffset or Chart module to chain calls
     * @public
     * @example scatterPlot.yAxisLabelOffset(-55)
     */
    (exports as ScatterPlotModule).yAxisLabelOffset = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabelOffset;
        }
        yAxisLabelOffset = _x;

        return this;
    } as ScatterPlotModule['yAxisLabelOffset'];

    /**
     * Gets or Sets the xTicks of the chart
     * @param  {Number} _x          Desired height for the chart
     * @return {Number | module}    Current yTicks or Chart module to chain calls
     * @public
     */
    (exports as ScatterPlotModule).yTicks = function (
        this: ScatterPlotModule,
        _x
    ) {
        if (!arguments.length) {
            return yTicks;
        }
        yTicks = _x;

        return this;
    } as ScatterPlotModule['yTicks'];

    return exports as unknown as ScatterPlotModule;
}
