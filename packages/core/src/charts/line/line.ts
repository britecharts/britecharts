import { min, max, bisector, groups } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { dispatch } from 'd3-dispatch';
import { easeQuadInOut } from 'd3-ease';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { scaleOrdinal, scaleTime, scaleLinear, scaleLog } from 'd3-scale';
import { line } from 'd3-shape';
import { select, pointer } from 'd3-selection';
import type { Axis, AxisDomain } from 'd3-axis';
import type { Dispatch } from 'd3-dispatch';
import type {
    NumberValue,
    ScaleLinear,
    ScaleLogarithmic,
    ScaleOrdinal,
    ScaleTime,
} from 'd3-scale';
import type { BaseType, Selection } from 'd3-selection';
import type { Line } from 'd3-shape';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import colorHelper from '../helpers/color';
import { lineLoadingMarkup } from '../helpers/load';
import { getTimeSeriesAxis, getSortedNumberAxis } from '../helpers/axis';
import { dataKeyDeprecationMessage } from '../helpers/project';
import { axisTimeCombinations, curveMap, motion } from '../helpers/constants';
import {
    createFilterContainer,
    createGlowWithMatrix,
    bounceCircleHighlight,
} from '../helpers/filter';
import {
    formatIntegerValue,
    formatDecimalValue,
    isInteger,
    uniqueId,
} from '../helpers/number';
import { castValueToType } from '../helpers/type';
import { gridHorizontal, gridVertical } from '../helpers/grid';
import type { AxisDatumSorted, AxisTickSettings } from '../helpers/axis';
import type { AxisTimeCombinationValue } from '../helpers/constants';

import type { GridTypes } from '../../typings/common/grid';
import type { LocaleString } from '../../typings/common/local';
import type { ChartMarginParams } from '../../typings/common/margin';
import type {
    ColorGradientType,
    ColorsSchemasType,
} from '../../typings/helpers/colors';
import type {
    CustomLine,
    LineChartData,
    LineChartDataShape,
    LineChartModule,
    LineChartXAxisScale,
    LineChartXAxisValueType,
} from '../../typings/charts/line-chart';

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are the migration plan's bounded `any`, as in the other charts:
 * these are module-level variables reassigned from several differently-shaped
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
 * What `cleanData` hands the drawing functions. `date` is a Date or a number
 * once `castValueToType` has run over it -- which of the two depends on
 * `xAxisValueType` -- where the published shape describes the string a
 * consumer passes in. `value` is nullable because `acceptNullValue` preserves
 * a null rather than coercing it to zero: the line is broken at that point
 * rather than dropped to the axis.
 *
 * Only the two fields: `cleanData` builds these points itself and the drawing
 * code reads nothing else off them. A row still in the consumer's own shape is
 * a `LabelledRow`.
 */
type LineDatum = {
    date: Date | number;
    value: number | null;
};

/**
 * A row read through the label accessors -- `dateLabel`, `valueLabel`,
 * `topicLabel`, `topicNameLabel`. A chart's data may carry those under any
 * key, so the reads really are dynamic, and what comes back is one of the
 * things `castValueToType` and `acceptNullValue` accept.
 */
type LabelledRow = Record<string, string | number | Date | null>;

/**
 * One date's rows, as `cleanData` nests them: the x value cast to the axis'
 * own type, and every topic's row at that date, still in the shape the
 * consumer passed in. This is what the pointer handlers bisect over to find
 * the date nearest the mouse.
 */
type LineDateGroup = {
    date: Date | number;
    topics: LineChartDataShape[];
};

/**
 * A topic's row at one date, paired with the path node its line was drawn
 * into. The data point highlighters need both: the row for the value and the
 * colour, the node to measure the line's y at a given x.
 */
type TopicWithNode = {
    topic: LineChartDataShape;
    node: SVGPathElement;
};

/**
 * One topic's line, as `getDataByTopic` groups it: the topic's identifier and
 * label, and its points in date order.
 */
type LineTopic = {
    topic: number;
    topicName: string;
    dates: LineDatum[];
};

/**
 * The x axis' scale: time by default, and linear or logarithmic when
 * `xAxisValueType` is 'number'. All three are called with a value and report a
 * pixel, which is all the drawing code asks of them.
 */
type LineXScale =
    | ScaleTime<number, number>
    | ScaleLinear<number, number>
    | ScaleLogarithmic<number, number>;

/**
 * Line Chart reusable API module that allows us
 * rendering a multi line and configurable chart.
 *
 * @module Line
 * @tutorial line
 * @requires d3-array, d3-axis, d3-collection, d3-dispatch, d3-ease, d3-format, d3-time-format, d3-scale, d3-shape, d3-selection, d3-transition
 *
 * @example
 * let lineChart = line();
 *
 * lineChart
 *     .width(500);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(lineChart);
 *
 */

/**
 * @typedef D3Selection
 * @type {Array[]}
 * @property {number} length            Size of the selection
 * @property {DOMElement} parentNode    Parent of the selection
 */

/**
 * @typedef LineChartFlatData
 * @type {object}
 * @property {string} topicName    Topic name (required)
 * @property {number} topic        Topic identifier (required)
 * @property {object[]} dates      All date entries with values for that topic in ISO8601 format (required)
 *
 * @example
 * [
 *     {
 *         topicName: 'San Francisco',
 *         name: 123,
 *         date: '2017-01-16T16:00:00-08:00',
 *         value: 1
 *     }
 * ]
 */

/**
 * The Data Sorted is calculated internally in the chart in order to pass it to our tooltips
 * @typedef LineChartDataSorted
 * @type {object[]}
 * @property {string} date | number        Date in ISO8601 format or number (required)]
 * @property {object[]} topics     List of topics with values that date (required)
 *
 * @example
 * [
 *     {
 *         date: "2015-06-27T07:00:00.000Z",
 *         topics: [
 *             {
 *                 "name": 1,
 *                 "value": 1,
 *                 "topicName": "San Francisco"
 *             },
 *             {
 *                 "name": 2,
 *                 "value": 20,
 *                 "topicName": "Los Angeles"
 *             },
 *             {
 *                 "name": 3,
 *                 "value": 10,
 *                 "topicName": "Oakland"
 *             }
 *         ]
 *     },
 *     {...}
 * ]
 */

/**
 * The data shape for the line chart.
 * Up to version 2.10.1 this required a "dataByTopic" array. That shape was
 * removed in 3.0.0 -- pass the flat dataset described here instead.
 * @typedef LineChartData
 * @type {object}
 * @property {LineChartFlatData[]} data  Data values to chart (required)
 *
 * @example
 * {
 *     data: [
 *         {
 *             topicName: 'San Francisco',
 *             name: 1,
 *             date: '2017-01-16T16:00:00-08:00',
 *             value: 1
 *         },
 *         {
 *             topicName: 'San Francisco',
 *             name: 1,
 *             date: '2017-01-17T16:00:00-08:00',
 *             value: 2
 *         },
 *         {
 *             topicName: 'Oakland',
 *             name: 2,
 *             date: '2017-01-16T16:00:00-08:00',
 *             value: 3
 *         },
 *         {
 *             topicName: 'Oakland',
 *             name: 2,
 *             date: '2017-01-17T16:00:00-08:00',
 *             value: 7
 *         }
 *     ]
 * }
 */
export default function module(): LineChartModule {
    // Split into `let` and `const` rather than the one `let` chain the
    // JavaScript had: the TypeScript ESLint override runs `prefer-const` as an
    // error, and the bindings below it are never reassigned.
    let margin: ChartMarginParams = {
            top: 60,
            right: 30,
            bottom: 40,
            left: 70,
        },
        width = 960,
        height = 500,
        isLoading = false,
        tooltipThreshold = 480,
        svg: ChartSelection<SVGSVGElement>,
        paths: ChartSelection<SVGPathElement>,
        chartWidth: number,
        chartHeight: number,
        xScale: LineXScale,
        yScale: ScaleLinear<number, number>,
        colorScale: ScaleOrdinal<string, string>,
        xAxis: Axis<AxisDomain>,
        xSubAxis: Axis<AxisDomain>,
        yAxis: Axis<NumberValue>,
        colorSchema: ColorsSchemasType = colorHelper.colorSchemas.britecharts,
        nameToColorMap: Record<string, string> | null = null,
        singleLineGradientColors: ColorGradientType =
            colorHelper.colorGradients.greenBlue,
        linearGradient: ChartSelection<SVGStopElement>,
        highlightFilter: ChartSelection<SVGFilterElement> | null = null,
        highlightFilterId: string | null = null,
        xAxisValueType: LineChartXAxisValueType = 'date',
        xAxisScale: LineChartXAxisScale = 'linear',
        xAxisFormat: string | null = null,
        // Null by default, which d3 reads as "use the scale's own count".
        xTicks: number | null = null,
        xAxisCustomFormat: string | null = null,
        locale: LocaleString | null | undefined,
        shouldShowAllDataPoints = false,
        isAnimated = false,
        animationDuration = motion.duration,
        lineCurve = 'linear',
        dataByTopic: LineTopic[],
        dataSorted: LineDateGroup[],
        dateLabel = 'date',
        valueLabel = 'value',
        topicLabel = 'topic',
        // Null, not undefined: this chart initialises its axis labels where
        // the grouped and stacked bars leave theirs unset, which is what their
        // declarations each now say.
        xAxisLabel: string | null = null,
        xAxisLabelEl: ChartSelection<SVGTextElement> | null = null,
        yAxisLabel: string | null = null,
        yAxisLabelEl: ChartSelection<SVGTextElement> | null = null,
        yAxisLabelPadding = 36,
        yTicks = 5,
        hasMinimumValueScale = false,
        overlay: ChartSelection<SVGRectElement>,
        verticalMarkerContainer: ChartSelection<SVGGElement>,
        verticalMarkerLine: ChartSelection<SVGLineElement>,
        numberFormat: string | undefined,
        customLines: CustomLine[] = [],
        grid: GridTypes | null = null,
        pathYCache: Record<string, number> = {};

    const topicNameLabel = 'topicName';
    const xAxisLabelPadding = 36;
    const xAxisPadding = {
        top: 0,
        left: 15,
        bottom: 0,
        right: 0,
    };
    const verticalShift = 30;
    const monthAxisPadding = 30;
    const tickPadding = 5;
    const lineGradientId = uniqueId('one-line-gradient');
    const highlightCircleSize = 12;
    const highlightCircleRadius = 5;
    const highlightCircleStroke = 2;
    const highlightCircleStrokeAll = 5;
    const highlightCircleActiveRadius = highlightCircleRadius + 2;
    const highlightCircleActiveStrokeWidth = 5;
    const highlightCircleActiveStrokeOpacity = 0.6;
    const ease = easeQuadInOut;
    const strokeDashoffset = 10;
    const strokeDasharrayOffset = 3;
    const overlayColor = 'rgba(0, 0, 0, 0)';
    const defaultCustomLineColor = colorHelper.colorSchemas.grey[3];
    // extractors
    // These three read a single field, and they are reached with a row at
    // every stage of `cleanData`: the raw shape the consumer passed in, the
    // cast one it hands the drawing code, and the date groups it nests. So
    // each one asks for its own field and nothing else.
    const getDate = ({ date }: { date: Date | number | string }) => date;
    const getValue = ({ value }: { value: number | null }) => value;
    const getTopic = ({ topic }: LineTopic) => topic;
    const getVariableTopicName = (d: Record<string, unknown>) =>
        d[topicNameLabel] as string;
    /**
     * The colour a topic's line is drawn in.
     *
     * `buildColorScale` fills `nameToColorMap` before anything is drawn, so it
     * is non-null everywhere this is reached -- the same reasoning, and the
     * same shape, as `colorForGroup` in grouped-bar.ts.
     */
    const getLineColor = ({ topic }: { topic: number }) =>
        (nameToColorMap as Record<string, string>)[topic];
    /** The same read, where what is at hand is a topic's name. */
    const getTopicColor = (name: string | number) =>
        (nameToColorMap as Record<string, string>)[name];
    // events
    const dispatcher: Dispatch<object> = dispatch(
        'customMouseOver',
        'customMouseOut',
        'customMouseMove',
        'customDataEntryClick',
        'customTouchMove'
    );

    // A null stays null rather than becoming zero: the line is broken at that
    // point rather than dropped to the axis.
    const acceptNullValue = (value: unknown) =>
        value === null ? null : +(value as number);

    /**
     * This function creates the graph using the selection and data provided
     *
     * @param {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {LineChartData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(_selection: Selection<TElement, LineChartData, TParent, TParentDatum>) {
        _selection.each(function (_data) {
            ({ dataByTopic, dataSorted: dataSorted } = cleanData(_data));

            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);

            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildScales();
            buildAxis();
            drawAxis();
            buildGradient();
            drawLines();
            animateLine();

            if (shouldShowTooltip()) {
                drawHoverOverlay();
                drawVerticalMarker();
                addMouseEvents();
            }

            if (shouldShowAllDataPoints) {
                drawAllDataPoints();
            }

            addTouchEvents();
        });
    }

    /**
     * Adds a filter to the element
     * @param {DOMElement} el
     * @private
     */
    function addGlowFilter(el: BaseType) {
        if (!highlightFilter) {
            highlightFilter = createFilterContainer(
                svg.select('.metadata-group')
            );
            highlightFilterId = createGlowWithMatrix(highlightFilter);
        }

        const glowEl = select(el);

        glowEl
            .style('stroke-width', highlightCircleActiveStrokeWidth)
            .style('stroke-opacity', highlightCircleActiveStrokeOpacity)
            .attr('filter', `url(#${highlightFilterId})`);

        bounceCircleHighlight(glowEl, ease, highlightCircleRadius);
    }

    /**
     * Adds events to the container group if the environment is not mobile
     * Adding: mouseover, mouseout and mousemove
     */
    function addMouseEvents() {
        svg.on('mouseenter', function (event, d) {
            handleMouseOver(this, d, event);
        })
            .on('mouseleave', function (event, d) {
                handleMouseOut(this, d, event);
            })
            .on('mousemove', function (event, d) {
                handleMouseMove(this, d, event);
            });
    }

    /**
     * Adds events to the container group for the mobile environment
     * Adding: touchmove
     * @private
     */
    function addTouchEvents() {
        svg.on('touchmove', function (event, d) {
            handleTouchMove(this, d, event);
        });
    }

    /**
     * Adjusts the position of the y axis' ticks
     * @param  {D3Selection} selection Y axis group
     * @return void
     */
    function adjustYTickLabels(selection: ChartSelection<SVGGElement>) {
        selection.selectAll('.tick text').attr('transform', 'translate(0, -7)');
    }

    /**
     * Formats the value depending on its characteristics
     * @param  {number} value Value to format
     * @return {number}       Formatted value
     */
    function getFormattedValue(value: NumberValue) {
        // d3's `tickFormat` declares the value as `NumberValue`. Coerced once
        // here, where the helpers below want a number.
        const numeric = Number(value);
        let formatFn;

        if (isInteger(numeric)) {
            formatFn = formatIntegerValue;
        } else {
            formatFn = formatDecimalValue;
        }

        if (numberFormat) {
            formatFn = format(numberFormat);
        }

        return formatFn(numeric);
    }

    /**
     * Creates the d3 x and y axis, setting orientations
     * @private
     */
    function buildAxis() {
        // d3's axis generics follow the scale it is built over, and this chart
        // builds its x axis over three different scales. The axis is held as
        // `Axis<AxisDomain>`, so each construction is cast once here rather
        // than every call on it being narrowed downstream -- the same shape
        // the stacked area's `buildAxis` has.
        const asAxis = (axis: unknown) => axis as Axis<AxisDomain>;
        let minor: AxisTickSettings;
        let major: AxisTickSettings | null;

        if (xAxisValueType === 'number') {
            // `date` holds a number on this path: `castValueToType` returns
            // `Number(...)` for it when `xAxisValueType` is 'number'.
            minor = getSortedNumberAxis(
                dataSorted as unknown as AxisDatumSorted[],
                width
            );
            major = null;

            if (xAxisScale === 'logarithmic') {
                xAxis = asAxis(
                    axisBottom(xScale as ScaleLogarithmic<number, number>)
                        .ticks(minor.tick as number, 'e')
                        .tickFormat(function (d) {
                            const log = Math.log(Number(d)) / Math.LN10;

                            return Math.abs(Math.round(log) - log) < 1e-6
                                ? '10^' + Math.round(log)
                                : '';
                        })
                );
            } else {
                xAxis = asAxis(
                    axisBottom(xScale as ScaleLinear<number, number>)
                        .ticks(minor.tick as number)
                        .tickFormat(getFormattedValue)
                );
            }
        } else {
            if (
                xAxisFormat === 'custom' &&
                typeof xAxisCustomFormat === 'string'
            ) {
                minor = {
                    tick: xTicks,
                    format: timeFormat(xAxisCustomFormat),
                };
                major = null;
            } else {
                ({ minor, major } = getTimeSeriesAxis(
                    dataSorted,
                    width,
                    xAxisFormat as AxisTimeCombinationValue | null,
                    locale ?? null
                ));

                xSubAxis = asAxis(
                    axisBottom(xScale as ScaleTime<number, number>)
                        .ticks(major.tick as number)
                        // One argument: d3's `tickSize` sets both the inner
                        // and the outer size from it, and the second argument
                        // this used to pass has always been ignored.
                        .tickSize(0)
                        .tickFormat(
                            major.format as unknown as (
                                domainValue: NumberValue | Date,
                                index: number
                            ) => string
                        )
                );
            }

            xAxis = asAxis(
                axisBottom(xScale as ScaleTime<number, number>)
                    .ticks(minor.tick as number)
                    // One argument, as above: the second was ignored.
                    .tickSize(10)
                    .tickPadding(tickPadding)
                    .tickFormat(
                        minor.format as unknown as (
                            domainValue: NumberValue | Date,
                            index: number
                        ) => string
                    )
            );
        }

        yAxis = axisLeft(yScale)
            .ticks(yTicks)
            // An array where d3 wants a number, as in bar.ts and the stacked
            // area: `tickSize` assigns `+_`, and `+[0]` is 0.
            .tickSize(+[0])
            .tickPadding(tickPadding)
            .tickFormat(getFormattedValue);

        drawGridLines(minor.tick as number | null, yTicks);
        drawCustomLines();
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
            .classed('axis x', true);
        container
            .selectAll('.x-axis-group')
            .append('g')
            .classed('axis sub-x', true);
        container
            .append('g')
            .classed('y-axis-group', true)
            .append('g')
            .classed('axis y', true);
        container.append('g').classed('grid-lines-group', true);
        container.append('g').classed('custom-lines-group', true);
        container.append('g').classed('chart-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Builds the gradient element to be used later
     * @return {void}
     */
    function buildGradient() {
        if (!linearGradient) {
            linearGradient = svg
                .select('.metadata-group')
                .append('linearGradient')
                .attr('id', lineGradientId)
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '100%')
                .attr('y2', '0%')
                .attr('gradientUnits', 'userSpaceOnUse')
                .selectAll('stop')
                .data([
                    { offset: '0%', color: singleLineGradientColors[0] },
                    { offset: '100%', color: singleLineGradientColors[1] },
                ])
                .enter()
                .append('stop')
                .attr('offset', ({ offset }) => offset)
                .attr('stop-color', ({ color }) => color);
        }
    }

    /**
     * Creates the x and y scales of the graph
     * @private
     */
    function buildScales() {
        xScale = buildXAxisScale();
        yScale = buildYAxisScale();

        colorScale = scaleOrdinal<string, string>()
            .range(colorSchema)
            .domain(dataByTopic.map((topic) => String(getTopic(topic))));

        const range = colorScale.range();

        nameToColorMap =
            nameToColorMap ||
            colorScale
                .domain()
                .reduce<Record<string, string>>((memo, item, i) => {
                    memo[item] = range[i];

                    return memo;
                }, {});
    }

    /**
     * Creates the xScale depending on the settings of
     * xAxisValueType and xAxisScale
     * @private
     */
    function buildXAxisScale() {
        // Dates compare and coerce as numbers here, which is what made the
        // original work; `Number` is that coercion written out.
        const minX = Number(
            min(dataByTopic, ({ dates }) =>
                min(dates, (d) => Number(getDate(d)))
            )
        );
        const maxX = Number(
            max(dataByTopic, ({ dates }) =>
                max(dates, (d) => Number(getDate(d)))
            )
        );

        if (xAxisValueType === 'number') {
            if (xAxisScale === 'logarithmic') {
                return scaleLog()
                    .domain([minX, maxX])
                    .rangeRound([0, chartWidth]);
            } else {
                return scaleLinear()
                    .domain([minX, maxX])
                    .rangeRound([0, chartWidth]);
            }
        } else {
            return scaleTime().domain([minX, maxX]).rangeRound([0, chartWidth]);
        }
    }

    /**
     * Creates the yScale
     * @private
     */
    function buildYAxisScale() {
        // `getValue` is nullable -- a broken line keeps its nulls -- and d3's
        // `min`/`max` skip them, so the bounds are numbers once they are read.
        const maxY = Number(
            max(dataByTopic, ({ dates }) => max(dates, getValue))
        );
        const minY = Number(
            min(dataByTopic, ({ dates }) => min(dates, getValue))
        );
        const yScaleBottomValue = minY < 0 || hasMinimumValueScale ? minY : 0;
        const yScaleTopValue = minY === 0 && maxY === 0 ? 1 : maxY;

        return scaleLinear()
            .domain([yScaleBottomValue, yScaleTopValue])
            .rangeRound([chartHeight, 0])
            .nice();
    }

    /**
     * Builds the SVG element that will contain the chart
     *
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element) {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart line-chart', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Parses dates and values into JS Date objects and numbers
     * @param  {LineChartData} _data    Chart data with a flat `data` array
     * @return {obj}                    Parsed data, grouped by topic and by date
     */
    function cleanData({
        dataSorted,
        data,
    }: {
        dataSorted?: LineDateGroup[];
        data: LineChartDataShape[];
    }) {
        if (!data) {
            throw new Error(
                'Data needs to have a data property. See more in https://britecharts.github.io/britecharts/docs/API/line'
            );
        }

        // Group the flat data by topic for the internal accessors.
        // String() keeps the key coercion d3-collection's nest() used to do.
        const dataByTopic = groups(data, (d) =>
            String(getVariableTopicName(d))
        ).map(([key, values]) => ({
            topic: values[0]['name'],
            topicName: key,
            dates: values,
        }));

        // Nest data by date or number and format
        dataSorted = groups(data, (d) => String(getDate(d))).map(
            ([key, values]) => {
                return {
                    date: castValueToType(key, xAxisValueType),
                    topics: values,
                };
            }
        );

        const normalizedDataByTopic = dataByTopic.reduce((accum, topic) => {
            const { dates, ...restProps } = topic;

            const newDates = dates.map((d: LabelledRow) => {
                return {
                    date: castValueToType(
                        d[dateLabel] as string | number | Date,
                        xAxisValueType
                    ),
                    value: acceptNullValue(d[valueLabel]),
                };
            });

            accum.push({ dates: newDates, ...restProps });

            return accum;
        }, [] as LineTopic[]);

        return {
            dataByTopic: normalizedDataByTopic,
            dataSorted,
        };
    }

    /**
     * Removes all the datapoints highlighter circles added to the marker container
     * @return void
     */
    function cleanDataPointHighlights() {
        verticalMarkerContainer.selectAll('.circle-container').remove();
    }

    /**
     * Cleans the loading state
     * @private
     */
    function cleanLoadingState() {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Animates the lines by drawing their paths from start to end, if the
     * proper flag is true
     *
     * @return {void}
     */
    function animateLine() {
        if (isAnimated) {
            const totalLength = paths.nodes().reduce(findLongestPath, 0);

            paths
                .attr(
                    'stroke-dasharray',
                    totalLength + ' ' + strokeDasharrayOffset * totalLength
                )
                .style('will-change', 'stroke-dasharray')
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .duration(animationDuration)
                .ease(ease)
                .attr('stroke-dashoffset', strokeDashoffset);
        }
    }

    /**
     * Draws the x and y axis on the svg object within their
     * respective groups along with the axis labels if given
     * @private
     */
    function drawAxis() {
        svg.select<SVGGElement>('.x-axis-group .axis.x')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis);

        if (xAxisFormat !== 'custom' && xAxisValueType !== 'number') {
            svg.select<SVGGElement>('.x-axis-group .axis.sub-x')
                .attr(
                    'transform',
                    `translate(0, ${chartHeight + monthAxisPadding})`
                )
                .call(xSubAxis);
        }

        if (xAxisLabel) {
            if (xAxisLabelEl) {
                svg.selectAll('.x-axis-label').remove();
            }
            const xLabelXPosition = chartWidth / 2;
            const xLabelYPosition =
                chartHeight + monthAxisPadding + xAxisLabelPadding;

            xAxisLabelEl = svg
                .select('.x-axis-group')
                .append('text')
                .attr('x', xLabelXPosition)
                .attr('y', xLabelYPosition)
                .attr('text-anchor', 'middle')
                .attr('class', 'x-axis-label')
                .text(xAxisLabel);
        }

        svg.select<SVGGElement>('.y-axis-group .axis.y')
            .attr('transform', `translate(${-xAxisPadding.left}, 0)`)
            .call(yAxis)
            .call(adjustYTickLabels);

        if (yAxisLabel) {
            if (yAxisLabelEl) {
                svg.selectAll('.y-axis-label').remove();
            }
            // Note this coordinates are rotated, so they are not what they look
            const yLabelYPosition = -yAxisLabelPadding - xAxisPadding.left;
            const yLabelXPosition = -chartHeight / 2;

            yAxisLabelEl = svg
                .select('.y-axis-group')
                .append('text')
                .attr('x', yLabelXPosition)
                .attr('y', yLabelYPosition)
                .attr('text-anchor', 'middle')
                .attr('transform', 'rotate(270)')
                .attr('class', 'y-axis-label')
                .text(yAxisLabel);
        }
    }

    /**
     * Draws the line elements within the chart group
     * @private
     */
    function drawLines() {
        // clear tooltip chache on path redraw
        pathYCache = {};

        const topicLine = line<LineDatum>()
            .curve(curveMap[lineCurve])
            // Number() of a Date is the epoch milliseconds a time scale reads
            // anyway, and it is the one argument all three x scales accept.
            .x(({ date }) => xScale(Number(date)))
            .defined(({ value }) => value !== null)
            // `defined` above drops the null points, so this reads a number
            // wherever d3 reaches it.
            .y(({ value }) => yScale(value as number));

        const lines = svg
            .select('.chart-group')
            .selectAll<SVGPathElement, LineTopic>('.line')
            .data(dataByTopic, getTopic);

        paths = lines
            .enter()
            .append('g')
            .attr('class', 'topic')
            .append('path')
            .attr('class', 'line')
            .merge(lines)
            .attr('id', ({ topic }) => topic)
            .attr('d', ({ dates }) => topicLine(dates))
            .attr('stroke', (d) =>
                dataByTopic.length === 1
                    ? `url(#${lineGradientId})`
                    : getLineColor(d)
            )
            .attr('fill', 'none');

        lines.exit().remove();
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState() {
        svg.select('.loading-state-group').html(lineLoadingMarkup);
    }

    /**
     * Draws grid lines on the background of the chart
     * @return void
     */
    function drawGridLines(xTicks: number | null, yTicks: number) {
        svg.select('.grid-lines-group').selectAll('grid').remove();

        const minY = min(dataByTopic, ({ dates }) => min(dates, getValue));
        // No data at all leaves this undefined, and `undefined < 0` is false,
        // which is what the zero default reports too.
        const shouldHighlightXAxis = (minY ?? 0) < 0;

        if (grid === 'horizontal' || grid === 'full') {
            drawHorizontalGridLines(yTicks, shouldHighlightXAxis);
        }

        if (grid === 'vertical' || grid === 'full') {
            drawVerticalGridLines(xTicks);
        }
    }

    /**
     * Draws vertical gridlines of the chart
     * These gridlines are parallel to y-axis
     * @return {void}
     * @private
     */
    function drawVerticalGridLines(xTicks: number | null) {
        const grid = gridVertical(xScale)
            .range([0, chartHeight])
            .hideEdges('first')
            .ticks(xTicks as number)
            .extendedLine(xAxisPadding.bottom);

        grid(svg.select('.grid-lines-group'));
    }

    /**
     * Draw horizontal gridlinees of the chart
     * These gridlines are parallel to x-axis
     * @return {void}
     * @private
     */
    function drawHorizontalGridLines(yTicks: number, highlightZero = false) {
        const grid = gridHorizontal(yScale)
            .range([0, chartWidth])
            .hideEdges('first')
            .ticks(yTicks)
            .extendedLine(0)
            .highlight(highlightZero ? 0 : null);

        grid(svg.select('.grid-lines-group'));
    }

    /**
     * Draws custom user-defined lines onto the chart
     * @return void
     */
    function drawCustomLines() {
        svg.select('.custom-lines-group').selectAll('.custom-line').remove();
        svg.select('.custom-lines-group')
            .selectAll('.custom-line-annotation')
            .remove();

        const yValues = customLines.map((line) => line.y);

        const getColor = (yValue: number) => {
            // `yValues` is these very lines' own `y` values, so the lookup
            // always finds one -- and a miss threw here before, too.
            const definedColor = customLines.find(
                (line) => line.y === yValue
            )!.color;

            if (definedColor) {
                return definedColor;
            }

            return defaultCustomLineColor;
        };

        //draw a horizontal line to extend x-axis till the edges
        svg.select('.custom-lines-group')
            .selectAll('line.custom-line')
            .data(yValues)
            .enter()
            .append('line')
            .attr('class', 'custom-line')
            .attr('x1', 0)
            .attr('x2', chartWidth)
            .attr('y1', (d) => yScale(d))
            .attr('y2', (d) => yScale(d))
            .attr('stroke', (d) => getColor(d))
            .attr('fill', 'none');

        // draw the annotations right above the line at the right end of the chart
        for (const line of customLines) {
            if (line.name) {
                svg.select('.custom-lines-group')
                    .append('text')
                    .attr('x', chartWidth)
                    .attr('y', yScale(line.y) - 6)
                    .attr('class', 'custom-line-annotation')
                    .attr('text-anchor', 'end')
                    .attr('dominant-baseline', 'baseline')
                    .text(line.name);
            }
        }
    }

    /**
     * Draws an overlay element over the graph
     * @inner
     * @return void
     */
    function drawHoverOverlay() {
        if (!overlay) {
            overlay = svg
                .select('.metadata-group')
                .append('rect')
                .attr('class', 'overlay')
                .attr('y1', 0)
                .attr('y2', height)
                .attr('height', chartHeight)
                .attr('width', chartWidth)
                .attr('fill', overlayColor)
                .style('display', 'none');
        }
    }

    /**
     * Draws all data points of the chart
     * if shouldShowAllDataPoints is set to true
     * @private
     * @return void
     */
    function drawAllDataPoints() {
        svg.select('.chart-group').selectAll('.data-points-container').remove();

        const nodesById = paths.nodes().reduce(
            (acc, node) => {
                acc[node.id] = node;

                return acc;
            },
            {} as Record<string, SVGPathElement>
        );

        const allTopics = dataSorted.reduce((accum, dataPoint) => {
            const dataPointTopics = dataPoint.topics.map((topic) => ({
                topic,
                node: nodesById[topic.name],
            }));

            accum = [...accum, ...dataPointTopics];

            return accum;
        }, [] as TopicWithNode[]);

        const allDataPoints = svg
            .select('.chart-group')
            .append('g')
            .classed('data-points-container', true)
            .selectAll('circle')
            .data(allTopics)
            .enter()
            .append('circle')
            .classed('data-point-mark', true)
            .attr('r', highlightCircleRadius)
            .style('stroke-width', highlightCircleStroke)
            .style('stroke', (d) => getTopicColor(d.topic.name))
            .style('cursor', 'pointer')
            .attr('cx', (d) => xScale(new Date(d.topic.date)))
            .attr('cy', (d) =>
                getPathYFromX(
                    xScale(new Date(d.topic.date)),
                    d.node,
                    d.topic.name
                )
            );
    }

    /**
     * Creates the vertical marker
     * @return void
     */
    function drawVerticalMarker() {
        if (!verticalMarkerContainer) {
            verticalMarkerContainer = svg
                .select('.metadata-group')
                .append('g')
                .attr('class', 'hover-marker vertical-marker-container')
                .attr('transform', 'translate(9999, 0)');

            verticalMarkerLine = verticalMarkerContainer
                .selectAll('path')
                .data([
                    {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 0,
                    },
                ])
                .enter()
                .append('line')
                .classed('vertical-marker', true)
                .attr('x1', 0)
                .attr('y1', chartHeight)
                .attr('x2', 0)
                .attr('y2', 0);
        }
    }

    /**
     * Reduces a list of SVGPaths to their longest length
     * @param {number} acc          Longest path until the moment
     * @param {SVGElement} path     Path to examine
     * @returns {number}            Longest between the accumulated length or the current path's length
     * @private
     */
    function findLongestPath(acc: number, path: SVGPathElement) {
        const length = getPathLength(path);

        return acc > length ? acc : length;
    }

    /**
     * Measures a path. `pathLength` is the SVGAnimatedNumber reflecting the
     * *attribute* of the same name, never the computed length — reading it
     * yields NaN in arithmetic and false in comparisons. getTotalLength() is the
     * geometry API, and is absent in jsdom.
     * @param {SVGElement} path  Path to measure
     * @returns {number}         Length of the path, 0 when it cannot be measured
     * @private
     */
    function getPathLength(path: SVGPathElement) {
        return typeof path.getTotalLength === 'function'
            ? path.getTotalLength()
            : 0;
    }

    /**
     * Finds out which datapoint is closer to the given x position
     * @param  {number} x0 Date value for data point
     * @param  {object} d0 Previous datapoint
     * @param  {object} d1 Next datapoint
     * @return {object}    d0 or d1, the datapoint with closest date to x0
     */
    function findOutNearestDate(
        x0: Date | number,
        d0: LineDateGroup,
        d1: LineDateGroup
    ) {
        if (xAxisValueType === 'number') {
            // Both are numbers down this branch; Number() is what the
            // subtraction did implicitly.
            return Number(x0) - Number(d0.date) > Number(d1.date) - Number(x0)
                ? d0
                : d1;
        }

        return new Date(x0).getTime() - new Date(d0.date).getTime() >
            new Date(d1.date).getTime() - new Date(x0).getTime()
            ? d0
            : d1;
    }

    /**
     * Finds out the data entry that is closer to the given position on pixels
     * @param  {number} mouseX X position of the mouse
     * @return {object}        Data entry that is closer to that x axis position
     */
    function getNearestDataPoint(mouseX: number) {
        const dateFromInvertedX = xScale.invert(mouseX);
        const bisectDate = bisector(getDate).left;
        const dataEntryIndex = bisectDate(dataSorted, dateFromInvertedX, 1);
        const dataEntryForXPosition = dataSorted[dataEntryIndex];
        const previousDataEntryForXPosition = dataSorted[dataEntryIndex - 1];
        let nearestDataPoint;

        if (previousDataEntryForXPosition && dataEntryForXPosition) {
            nearestDataPoint = findOutNearestDate(
                dateFromInvertedX,
                dataEntryForXPosition,
                previousDataEntryForXPosition
            );
        } else {
            nearestDataPoint = dataEntryForXPosition;
        }

        return nearestDataPoint;
    }

    /**
     * MouseMove handler, calculates the nearest dataPoint to the cursor
     * and updates metadata related to it
     * @private
     */
    function handleMouseMove(e: Element, d: unknown, event: Event) {
        // The listener is on the root svg, so the pointer arrives in svg
        // coordinates; everything the chart draws (the tooltip included)
        // lives inside the margin-translated container, hence the offsets.
        const [xPosition, yPosition] = pointer(event, e);
        const dataPoint = getNearestDataPoint(xPosition - (margin.left ?? 0));
        const pointerYPosition = yPosition - (margin.top ?? 0);
        let dataPointXPosition;

        if (dataPoint) {
            dataPointXPosition = xScale(new Date(dataPoint.date));
            // More verticalMarker to that datapoint
            moveVerticalMarker(dataPointXPosition);
            // Add data points highlighting
            highlightDataPoints(dataPoint);
            // Emit event with xPosition for tooltip or similar feature
            // The same payload as every chart: the data point, its anchor,
            // the chart's size and the topic colours
            dispatcher.call(
                'customMouseMove',
                e,
                dataPoint,
                [dataPointXPosition, pointerYPosition],
                [chartWidth, chartHeight],
                nameToColorMap
            );
        }
    }

    /**
     * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
     * It also resets the container of the vertical marker
     * @private
     */
    function handleMouseOut(e: Element, d: unknown, event: Event) {
        overlay.style('display', 'none');
        verticalMarkerLine.classed('bc-is-active', false);
        verticalMarkerContainer.attr('transform', 'translate(9999, 0)');

        dispatcher.call('customMouseOut', e, d, pointer(event, e));
    }

    /**
     * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
     * @private
     */
    function handleMouseOver(e: Element, d: unknown, event: Event) {
        overlay.style('display', 'block');
        verticalMarkerLine.classed('bc-is-active', true);

        dispatcher.call('customMouseOver', e, d, pointer(event, e));
    }

    /**
     * Mouseclick handler over one of the highlight points
     * It will only pass the information with the event
     * @private
     */
    function handleHighlightClick(e: Element, d: unknown, event: Event) {
        dispatcher.call('customDataEntryClick', e, d, pointer(event, e));
    }

    /**
     * Touchmove highlighted points
     * It will only pass the information with the event
     * @private
     */
    function handleTouchMove(e: Element, d: unknown, event: Event) {
        dispatcher.call('customTouchMove', e, d, pointer(event, e));
    }

    /**
     * Creates coloured circles marking where the exact data y value is for a given data point
     * @param  {object} dataPoint Data point to extract info from
     * @private
     */
    function highlightDataPoints(dataPoint: LineDateGroup) {
        cleanDataPointHighlights();

        const nodes = paths.nodes();
        const nodesById = nodes.reduce(
            (acc, node) => {
                acc[node.id] = node;

                return acc;
            },
            {} as Record<string, SVGPathElement>
        );

        // Group corresponding path node with its topic, and
        // sorting the topics based on the order of the colors,
        // so that the order always stays constant
        const topicsWithNode = dataPoint.topics
            .map((topic) => ({
                topic,
                node: nodesById[topic.name],
            }))
            .filter(({ topic }) => !!topic)
            .sort(
                (a, b) =>
                    +(getTopicColor(a.topic.name) < getTopicColor(b.topic.name))
            );

        dataPoint.topics = topicsWithNode.map(({ topic }) => topic);

        dataPoint.topics.forEach((d, index) => {
            const marker = verticalMarkerContainer
                .append('g')
                .classed('circle-container', true)
                .append('circle')
                .classed('data-point-highlighter', true)
                .attr('cx', highlightCircleSize)
                .attr('cy', 0)
                .attr('r', highlightCircleRadius)
                .style('stroke-width', () =>
                    shouldShowAllDataPoints
                        ? highlightCircleStrokeAll
                        : highlightCircleStroke
                )
                .style('stroke', getTopicColor(d.name))
                .style('cursor', 'pointer')
                .on('click', function (event) {
                    addGlowFilter(this);
                    handleHighlightClick(this, d, event);
                })
                .on('mouseout', function (event) {
                    removeFilter(this);
                });

            const path = topicsWithNode[index].node;
            const x = xScale(new Date(dataPoint.topics[index].date));
            const y = getPathYFromX(x, path, d.name);

            marker.attr(
                'transform',
                `translate( ${-highlightCircleSize}, ${y} )`
            );
        });
    }

    /**
     * Finds the y coordinate of a path given an x coordinate and the line's path node.
     * @param  {number} x The x coordinate
     * @param  {node} path The path node element
     * @param {*} name - The name identifier of the topic
     * @param  {number} error The margin of error from the actual x coordinate. Default 0.01
     * @private
     */
    function getPathYFromX(
        x: number,
        path: SVGPathElement,
        name: string | number,
        error?: number
    ) {
        const key = `${name}-${x}`;

        if (key in pathYCache) {
            return pathYCache[key];
        }

        error = error || 0.01;

        const maxIterations = 100;

        let lengthStart = 0;
        let lengthEnd = getPathLength(path);
        let point;

        try {
            point = path.getPointAtLength((lengthEnd + lengthStart) / 2);
        } catch {
            point = { x: 0, y: 0 };
        }
        let iterations = 0;

        while (x < point.x - error || x > point.x + error) {
            const midpoint = (lengthStart + lengthEnd) / 2;

            try {
                point = path.getPointAtLength(midpoint);
            } catch {
                point = { x: 0, y: 0 };
            }

            if (x < point.x) {
                lengthEnd = midpoint;
            } else {
                lengthStart = midpoint;
            }

            iterations += 1;
            if (maxIterations < iterations) {
                break;
            }
        }

        pathYCache[key] = point.y;

        return pathYCache[key];
    }

    /**
     * Helper method to update the x position of the vertical marker
     * @param  {object} dataPoint Data entry to extract info
     * @return void
     */
    function moveVerticalMarker(verticalMarkerXPosition: number) {
        verticalMarkerContainer.attr(
            'transform',
            `translate(${verticalMarkerXPosition},0)`
        );
    }

    /**
     * Resets a point filter
     * @param {DOMElement} point  Point to reset
     */
    function removeFilter(point: BaseType) {
        select(point).attr('filter', 'none');
    }

    /**
     * Determines if we should add the tooltip related logic depending on the
     * size of the chart and the tooltipThreshold variable value
     * @return {boolean} Should we build the tooltip?
     */
    function shouldShowTooltip() {
        return width > tooltipThreshold;
    }

    // API
    /**
     * Gets or Sets the duration of the animation
     * @param  {number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).animationDuration = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return animationDuration;
        }
        animationDuration = _x;

        return this;
    } as LineChartModule['animationDuration'];

    /**
     * Exposes the constants to be used to force the x axis to respect a certain granularity
     * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     * @example
     *     line.xAxisFormat(line.axisTimeCombinations.HOUR_DAY)
     */
    (exports as LineChartModule).axisTimeCombinations =
        axisTimeCombinations as LineChartModule['axisTimeCombinations'];

    /**
     * Gets or Sets the label of the X axis of the chart
     * @param  {string} _x              Desired label for the X axis
     * @return { (string | module) }    Current label of the X axis or Line Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).xAxisLabel = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisLabel;
        }
        xAxisLabel = _x;

        return this;
    } as LineChartModule['xAxisLabel'];

    /**
     * Gets or Sets the label of the Y axis of the chart
     * @param  {string} _x              Desired label for the Y axis
     * @return { (String | module) }    Current label of the Y axis or Line Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).yAxisLabel = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabel;
        }
        yAxisLabel = _x;

        return this;
    } as LineChartModule['yAxisLabel'];

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {string[]} _x Desired colorSchema for the graph
     * @return { string[] | module} Current colorSchema or Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).colorSchema = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as LineChartModule['colorSchema'];

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {object | module}     Current colorMap or Chart module to chain calls
     * @example lineChart.colorMap({groupName: 'colorHex', groupName2: 'colorString'})
     * @public
     */
    (exports as LineChartModule).colorMap = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return nameToColorMap;
        }
        nameToColorMap = _x;

        return this;
    } as LineChartModule['colorMap'];

    /**
     * Gets or Sets the dateLabel of the chart
     * @param  {number} _x Desired dateLabel for the graph
     * @return { number | module} Current dateLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as LineChartModule).dateLabel = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return dateLabel;
        }
        dateLabel = _x;
        dataKeyDeprecationMessage('date');

        return this;
    } as LineChartModule['dateLabel'];

    /**
     * Exposes the ability to force the chart to show a certain x format
     * It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: localization not supported
     * @param  {string} _x              Desired format for x axis, one of the d3.js date formats [here]{@link https://github.com/d3/d3-time-format#locale_format}
     * @return { string|module }        Current format or module to chain calls
     * @public
     */
    (exports as LineChartModule).xAxisCustomFormat = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisCustomFormat;
        }
        xAxisCustomFormat = _x;

        return this;
    } as LineChartModule['xAxisCustomFormat'];

    /**
     * Exposes the ability to force the chart to show a certain x axis grouping
     * @param  {string} _x          Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR)
     * Set it to 'custom' to make use of specific formats with xAxisCustomFormat
     * @return { String|Module }      Current format or module to chain calls
     * @public
     * @example
     *     line.xAxisCustomFormat(line.axisTimeCombinations.HOUR_DAY)
     */
    (exports as LineChartModule).xAxisFormat = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisFormat;
        }
        xAxisFormat = _x;

        return this;
    } as LineChartModule['xAxisFormat'];

    /**
     * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
     * how many and where the ticks will appear.
     *
     * @param  {number} _x              Desired number of x axis ticks (multiple of 2, 5 or 10)
     * @return { (Number|module) }      Current number or ticks or module to chain calls
     * @public
     */
    (exports as LineChartModule).xTicks = function (this: LineChartModule, _x) {
        if (!arguments.length) {
            return xTicks;
        }
        xTicks = _x;

        return this;
    } as LineChartModule['xTicks'];

    /**
     * Gets or Sets the grid mode.
     *
     * @param  {string} _x          Desired mode for the grid ('vertical'|'horizontal'|'full')
     * @return { String | module}   Current mode of the grid or Line Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).grid = function (this: LineChartModule, _x) {
        if (!arguments.length) {
            return grid;
        }
        grid = _x;

        return this;
    } as LineChartModule['grid'];

    /**
     * Gets or Sets the hasMinimumValueScale property of the chart, making yAxix bottom value
     * to adjust to the minimum dataset value.
     * By default this is 'false'
     *
     * @param  {Boolean} _x Desired minimum value flag
     * @return { hasMinimumValueScale | module} Current hasMinimumValueScale flag or Chart module
     * @public
     */
    (exports as LineChartModule).hasMinimumValueScale = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return hasMinimumValueScale;
        }
        hasMinimumValueScale = _x;

        return this;
    } as LineChartModule['hasMinimumValueScale'];

    /**
     * Gets or Sets the height of the chart
     * @param  {number} _x              Desired width for the graph
     * @return { (Number | module) }    Current height or Line Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).height = function (this: LineChartModule, _x) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as LineChartModule['height'];

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * @param  {boolean} _x = false     Desired animation flag
     * @return { isAnimated | module}   Current isAnimated flag or Chart module
     * @public
     */
    (exports as LineChartModule).isAnimated = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    } as LineChartModule['isAnimated'];

    /**
     * Add custom horizontal lines to the Chart - this way you are able to plot arbitrary horizontal lines
     * onto the chart with a specific color and a text annotation over the line.
     * @param  {object[]} _x            Array of Objects describing the lines
     * @return { (Object[] | module) }  Current lines or module to chain calls
     * @public
     * @example line.lines([{
     *   y: 2,
     *   name: 'Maximum threshold',
     *   color: '#ff0000'
     * }])
     */
    (exports as LineChartModule).lines = function (this: LineChartModule, _x) {
        if (!arguments.length) {
            return customLines;
        }
        customLines = _x;

        return this;
    } as LineChartModule['lines'];

    /**
     * Gets or Sets the curve of the line chart
     * @param  {curve} _x Desired curve for the lines, default 'linear'. Other options are:
     * basis, natural, monotoneX, monotoneY, step, stepAfter, stepBefore, cardinal, and
     * catmullRom. Visit https://github.com/d3/d3-shape#curves for more information.
     * @return { (curve | module) } Current line curve or Line Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).lineCurve = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return lineCurve;
        }
        lineCurve = _x;

        return this;
    } as LineChartModule['lineCurve'];

    /**
     * Gets or Sets the gradient colors of the line chart when there is only one line
     * @param  {string[]} _x            Desired color gradient for the line (array of two hexadecimal numbers)
     * @return { (Number | module) }    Current color gradient or Line Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).lineGradient = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return singleLineGradientColors;
        }
        singleLineGradientColors = _x;

        return this;
    } as LineChartModule['lineGradient'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).isLoading = function (
        this: LineChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as LineChartModule['isLoading'];

    /**
     * Pass language tag for the tooltip to localize the date.
     * Uses Intl.DateTimeFormat, for compatability and support, refer to
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param  {string} _x            A language tag (BCP 47) like 'en-US' or 'fr-FR'
     * @return { (string|module) }    Current locale or module to chain calls
     * @public
     */
    (exports as LineChartModule).locale = function (this: LineChartModule, _x) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    } as LineChartModule['locale'];

    /**
     * Gets or Sets the margin object of the chart (top, bottom, left and right)
     * @param  {object} _x              Margin object to get/set
     * @return { (object | module) }    Current margin or Line Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).margin = function (this: LineChartModule, _x) {
        if (!arguments.length) {
            return margin;
        }
        margin = {
            ...margin,
            ..._x,
        };

        return this;
    } as LineChartModule['margin'];

    /**
     * Gets or Sets the number format of the line chart
     * @param  {string} _x = ',f'       Desired numberFormat for the chart. See examples [here]{@link https://d3js.org/d3-format}
     * @return {string | module}        Current numberFormat or Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).numberFormat = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as LineChartModule['numberFormat'];

    /**
     * Gets or Sets the topicLabel of the chart
     * @param  {boolean} _x=false                   Whether all data points should be drawn
     * @return {shouldShowAllDataPoints | module}   Current shouldShowAllDataPoints or Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).shouldShowAllDataPoints = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return shouldShowAllDataPoints;
        }
        shouldShowAllDataPoints = _x;

        return this;
    } as LineChartModule['shouldShowAllDataPoints'];

    /**
     * Gets or Sets the minimum width of the graph in order to show the tooltip
     * NOTE: This could also depend on the aspect ratio
     * @param  {number} _x              Desired tooltip threshold for the graph
     * @return { (Number | module) }    Current tooltip threshold or Line Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).tooltipThreshold = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return tooltipThreshold;
        }
        tooltipThreshold = _x;

        return this;
    } as LineChartModule['tooltipThreshold'];

    /**
     * Gets or Sets the topicLabel of the chart
     * @param  {number} _x              Desired topicLabel for the graph
     * @return {topicLabel | module}    Current topicLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as LineChartModule).topicLabel = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return topicLabel;
        }
        topicLabel = _x;
        dataKeyDeprecationMessage('topic');

        return this;
    } as LineChartModule['topicLabel'];

    /**
     * Gets or Sets the valueLabel of the chart
     * @param  {number} _x              Desired valueLabel for the graph
     * @return {valueLabel | module}    Current valueLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as LineChartModule).valueLabel = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return valueLabel;
        }
        valueLabel = _x;
        dataKeyDeprecationMessage('value');

        return this;
    } as LineChartModule['valueLabel'];

    /**
     * Gets or Sets the yAxisLabelPadding of the chart.
     * @param  {number} _x= -36                 Desired yAxisLabelPadding for the graph
     * @return {yAxisLabelPadding | module}     Current yAxisLabelPadding or Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).yAxisLabelPadding = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabelPadding;
        }
        yAxisLabelPadding = _x;

        return this;
    } as LineChartModule['yAxisLabelPadding'];

    /**
     * Gets or Sets the number of ticks of the y axis on the chart
     * @param  {number} _x = 5     Desired yTicks
     * @return {number | module}   Current yTicks or Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).yTicks = function (this: LineChartModule, _x) {
        if (!arguments.length) {
            return yTicks;
        }
        yTicks = _x;

        return this;
    } as LineChartModule['yTicks'];

    /**
     * Gets or Sets the width of the chart
     * @param  {number} _x          Desired width for the graph
     * @return {number | Module}    Current width or Line Chart module to chain calls
     * @public
     */
    (exports as LineChartModule).width = function (this: LineChartModule, _x) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as LineChartModule['width'];

    /**
     * Chart exported to png and a download action is fired
     * @param {string} filename     File title for the resulting picture
     * @param {string} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as LineChartModule).exportChart = function (filename, title) {
        return exportChart.call(
            exports as LineChartModule,
            svg,
            filename,
            title
        );
    } as LineChartModule['exportChart'];

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseHover, customMouseMove, customMouseOut,
     * customDataEntryClick, and customTouchMove
     *
     * @return {module} Bar Chart
     * @public
     */
    (exports as LineChartModule).on = function (
        ...args: [string] | [string, () => void]
    ) {
        // Rest parameters and a spread where this read `arguments` and used
        // `.apply`, following the other converted charts.
        const value = dispatcher.on(
            ...(args as Parameters<typeof dispatcher.on>)
        );

        return value === dispatcher ? exports : value;
    } as unknown as LineChartModule['on'];

    /**
     * Gets or Sets the `xAxisValueType`.
     * Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
     * be dates anymore, but can be arbitrary numbers.
     * @param  {string} [_x='date']     Desired value type of the x-axis
     * @return {string | module}        Current value type of the x-axis or Chart module to chain calls
     * @public
     * @example line.xAxisValueType('number')
     */
    (exports as LineChartModule).xAxisValueType = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisValueType;
        }
        xAxisValueType = _x;

        return this;
    } as LineChartModule['xAxisValueType'];

    /**
     * Gets or Sets the `xAxisScale`.
     * Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
     * 'number' as well, otherwise it won't influence the visualization.
     * @param  {string} [_x='linear']      Desired value type of the x-axis
     * @return {string | module}           Current value type of the x-axis or Chart module to chain calls
     * @public
     * @example line.xAxisValueType('number').xAxisScale('logarithmic')
     */
    (exports as LineChartModule).xAxisScale = function (
        this: LineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisScale;
        }
        xAxisScale = _x;

        return this;
    } as LineChartModule['xAxisScale'];

    return exports as unknown as LineChartModule;
}
