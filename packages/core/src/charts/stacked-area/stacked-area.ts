import { min, max, sum, range, extent, groups } from 'd3-array';
import { axisRight, axisBottom } from 'd3-axis';
import { dispatch } from 'd3-dispatch';
import { easeQuadInOut } from 'd3-ease';
import { format } from 'd3-format';
import { scaleLinear, scaleTime, scaleLog } from 'd3-scale';
import { line, area, stackOffsetNone, stackOrderNone, stack } from 'd3-shape';
import { select, pointer } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import type { Axis, AxisDomain } from 'd3-axis';
import type { Dispatch } from 'd3-dispatch';
import type {
    NumberValue,
    ScaleLinear,
    ScaleLogarithmic,
    ScaleTime,
} from 'd3-scale';
import type { BaseType, Selection } from 'd3-selection';
import type { Area, Line, Series, SeriesPoint } from 'd3-shape';
import 'd3-transition';

import { exportChart } from '../helpers/export.js';
import colorHelper from '../helpers/color.js';
import { getTimeSeriesAxis, getSortedNumberAxis } from '../helpers/axis.js';
import type { AxisDatumSorted, AxisTickSettings } from '../helpers/axis.js';
import { castValueToType } from '../helpers/type.js';
import {
    axisTimeCombinations,
    curveMap,
    motion,
} from '../helpers/constants.js';
import type { AxisTimeCombinationValue } from '../helpers/constants.js';
import {
    formatIntegerValue,
    formatDecimalValue,
    isInteger,
} from '../helpers/number.js';
import {
    createFilterContainer,
    createGlowWithMatrix,
    bounceCircleHighlight,
} from '../helpers/filter.js';
import { addDays, diffDays } from '../helpers/date.js';
import { stackedAreaLoadingMarkup } from '../helpers/load.js';
import { gridHorizontal, gridVertical } from '../helpers/grid.js';

import type { GridTypes } from '../../typings/common/grid.js';
import type { LocaleString } from '../../typings/common/local.js';
import type { ChartMarginParams } from '../../typings/common/margin.js';
import type { ColorsSchemasType } from '../../typings/helpers/colors.js';
import type {
    AccessibleChartAPI,
    DataTableChartAPI,
    AnimatedChartAPI,
    ChartBaseAPI,
    ExportableChartAPI,
    InteractiveChartAPI,
    ThemableChartAPI,
    TimeSeriesChartAPI,
} from '../../typings/common/base.js';
import {
    ascending,
    labelChart,
    pivotTable,
    prefersReducedMotion,
    renderDataTable,
} from '../helpers/a11y.js';
import type { DataTable } from '../helpers/a11y.js';
import type { ChartModuleSelection } from '../../typings/common/selection.js';
import { withCustomColors } from '../helpers/color.js';

export declare enum StackedAreaChartKeys {
    Date = 'date',
    Name = 'name',
    Value = 'value',
}

export type StackedAreaChartDataShape = {
    [StackedAreaChartKeys.Date]: string;
    [StackedAreaChartKeys.Name]: string;
    [StackedAreaChartKeys.Value]: number;
};

/**
 * The window the chart draws over when it has no data of its own.
 *
 * `minY` is required. The chart's own default carries it and `getMinValue`
 * reads it, so a config without one would give the value scale an undefined
 * lower bound -- a NaN domain, and nothing drawn.
 */
export interface StackedAreaEmptyDataConfig {
    minDate: Date;
    maxDate: Date;
    minY: number;
    maxY: number;
}

/**
 * Whether the x axis carries dates or plain numbers.
 *
 * `'number'`, not `'numeric'`: the chart compares this against `'number'` in
 * three places, and that is the value that switches the axis. The JSDoc below
 * says `'number'` too.
 */
export type StackedAreaXAxisValueType = 'date' | 'number';

/** Whether a numeric x axis is scaled linearly or logarithmically. */
export type StackedAreaXAxisScale = 'linear' | 'logarithmic';

// Each accessor below is a getter/setter overload pair, getter first and
// setter last, with the getter typed from the implementation's own default.
export interface StackedAreaChartAPI
    extends
        AccessibleChartAPI<StackedAreaChartModule>,
        DataTableChartAPI<StackedAreaChartModule>,
        Omit<ChartBaseAPI<StackedAreaChartModule>, 'numberFormat'>,
        InteractiveChartAPI<StackedAreaChartModule>,
        ExportableChartAPI,
        AnimatedChartAPI<StackedAreaChartModule>,
        TimeSeriesChartAPI<StackedAreaChartModule>,
        ThemableChartAPI<StackedAreaChartModule> {
    /**
     * Gets or Sets the number format of the chart. Null until one is set,
     * where the shared declaration promises a string: this chart has no
     * default format.
     */
    numberFormat(): string | null;
    numberFormat(format: string): StackedAreaChartModule;
    /** Gets or Sets the area curve of the stacked area. */
    areaCurve(): string;
    areaCurve(curveType: string): StackedAreaChartModule;
    /** Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity) */
    areaOpacity(): number;
    areaOpacity(opacity: number): StackedAreaChartModule;
    /** Gets or Sets the emptyDataConfig of the chart */
    emptyDataConfig(): StackedAreaEmptyDataConfig;
    emptyDataConfig(config: StackedAreaEmptyDataConfig): StackedAreaChartModule;
    /**
     * Gets or Sets the grid mode
     *
     * The getter is `null` until one is set, and the setter takes `null` to
     * put the default back, as on the other grid-drawing charts.
     */
    grid(): GridTypes | null;
    grid(gridType: GridTypes | null): StackedAreaChartModule;
    /** Enables or disables the outline at the top of the areas */
    hasOutline(): boolean;
    hasOutline(hasOutline: boolean): StackedAreaChartModule;
    /** Gets or Sets the minimum width of the graph in order to show the tooltip */
    tooltipThreshold(): number;
    tooltipThreshold(threshold: number): StackedAreaChartModule;
    /**
     * Pass an override for the ordering of the topics
     *
     * The getter is `undefined` until one is set: the chart orders by each
     * topic's total until then. The elements are this chart's own topic names,
     * which are strings.
     */
    topicsOrder(): string[] | undefined;
    topicsOrder(orderList: string[]): StackedAreaChartModule;
    /**
     * Gets or Sets the `xAxisScale`.
     * Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
     * 'number' as well, otherwise it won't influence the visualization.
     */
    xAxisScale(): StackedAreaXAxisScale;
    xAxisScale(scale: StackedAreaXAxisScale): StackedAreaChartModule;
    /**
     * Gets or Sets the `xAxisValueType`.
     * Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
     * be dates anymore, but can be arbitrary numbers.
     */
    xAxisValueType(): StackedAreaXAxisValueType;
    xAxisValueType(
        valueType: StackedAreaXAxisValueType
    ): StackedAreaChartModule;
    /**
     * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
     * how many and where the ticks will appear.
     */
    xTicks(): number | null;
    xTicks(ticks: number): StackedAreaChartModule;
    /**
     * Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction
     * (default is 0). Change this value if you don't want to start your area from y=0.
     */
    yAxisBaseline(): number;
    yAxisBaseline(baseLine: number): StackedAreaChartModule;
    /**
     * Gets or Sets the y-axis label of the chart
     *
     * The getter is `undefined` until one is set: the chart appends no label
     * element until then.
     */
    yAxisLabel(): string | null;
    yAxisLabel(label: string): StackedAreaChartModule;
    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     */
    yAxisLabelOffset(): number;
    yAxisLabelOffset(offset: number): StackedAreaChartModule;
    /** Gets or Sets the number of ticks of the y axis on the chart */
    yTicks(): number;
    yTicks(ticks: number): StackedAreaChartModule;
}

export type StackedAreaChartModule = ChartModuleSelection<
    StackedAreaChartDataShape[]
> &
    StackedAreaChartAPI;

const uniq = <T>(arrArg: T[]) =>
    arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are a bounded `any`, as in the other charts:
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
 * consumer passes in.
 *
 * The index signature is the `dateLabel`, `valueLabel` and `keyLabel`
 * accessors: a chart's data may carry those three under any key, so the reads
 * really are dynamic.
 */
type StackedAreaDatum = Omit<StackedAreaChartDataShape, 'date'> & {
    date: Date | number;
    [key: string]: unknown;
};

/**
 * One date's worth of rows, as `getSortedData` groups them: the grouping key as
 * a string, the rows themselves, and the key cast to what the x axis places.
 */
type StackedAreaDateGroup = {
    key: string;
    values: StackedAreaDatum[];
    date: Date | number;
};

/**
 * One column handed to d3's stack: a date plus every topic's value on it under
 * the topic's own name.
 */
type StackedAreaColumn = {
    date: Date | number;
    [topicName: string]: unknown;
};

/** One stacked band's point, carrying the column it came from. */
type StackedAreaPoint = SeriesPoint<StackedAreaColumn>;

/**
 * The x axis' scale: time by default, and linear or logarithmic when
 * `xAxisValueType` is 'number'. All three are called with a value and report a
 * pixel, which is all the drawing code asks of them.
 */
type StackedAreaXScale =
    | ScaleTime<number, number>
    | ScaleLinear<number, number>
    | ScaleLogarithmic<number, number>;

/**
 * Stacked Area Chart reusable API module that allows us
 * rendering a multi area and configurable chart.
 *
 * @module Stacked-area
 * @tutorial stacked-area
 *
 * @example
 * import { select } from 'd3-selection';
 * import { stackedArea } from '@britecharts/core';
 *
 * // dataset: [{ date, name, value }]
 * const stackedAreaChart = stackedArea();
 *
 * stackedAreaChart
 *     .width(containerWidth);
 *
 * select('.css-selector')
 *     .datum(dataset)
 *     .call(stackedAreaChart);
 */

/**
 * @typdef D3Layout
 * @type function
 */

/**
 * @typedef AreaChartData
 * @type {Object[]}
 * @property {String} date         Date of the entry in ISO8601 format (required)
 * @property {String} name         Name of the entry (required)
 * @property {Number} value        Value of the entry (required)
 *
 * @example
 * [
 *     {
 *         date: "2011-01-05T00:00:00Z",
 *         name: "Direct",
 *         value: 0
 *     }
 * ]
 */
export default function module(): StackedAreaChartModule {
    // Split into `let` and `const`: the TypeScript ESLint override runs
    // `prefer-const` as an error, and the bindings below it are never
    // reassigned.
    // The data's keys, fixed: the accessors that renamed them are gone
    const dateLabel = 'date';
    const keyLabel = 'name';
    const valueLabel = 'value';
    let margin: ChartMarginParams = {
            top: 70,
            right: 30,
            bottom: 60,
            left: 70,
        },
        width = 960,
        height = 500,
        isLoading = false,
        xScale: StackedAreaXScale,
        xAxis: Axis<AxisDomain>,
        xSubAxis: Axis<AxisDomain>,
        yScale: ScaleLinear<number, number>,
        yAxis: Axis<NumberValue>,
        xAxisValueType: StackedAreaXAxisValueType = 'date',
        xAxisScale: StackedAreaXAxisScale = 'linear',
        yTicks = 5,
        yAxisBaseline = 0,
        // Null until one is set, and the chart appends no label element until
        // then -- `null` like every other chart's unset accessor.
        yAxisLabel: string | null = null,
        yAxisLabelEl: ChartSelection<SVGTextElement>,
        yAxisLabelOffset = -60,
        colorSchema: ColorsSchemasType = colorHelper.colorSchemas.britecharts,
        nameToColorMap: Record<string, string> | null = null,
        // The map the consumer set, if any; nameToColorMap is what is drawn
        customColorMap: Record<string, string> | null = null,
        highlightFilter: ChartSelection<SVGFilterElement> | null = null,
        highlightFilterId: string | null = null,
        areaOpacity = 0.24,
        order: string[],
        // No default: the chart orders by each topic's total until one is set.
        topicsOrder: string[] | undefined,
        xAxisFormat: string | null = null,
        // Null by default, which d3 reads as "use the scale's own count".
        xTicks: number | null = null,
        xAxisCustomFormat: string | null = null,
        numberFormat: string | null = null,
        locale: LocaleString | null = null,
        areaCurve = 'monotoneX',
        layers: Series<StackedAreaColumn, string>[],
        series: ChartSelection<SVGGElement>,
        layersInitial: Series<StackedAreaColumn, string>[],
        areaShape: Area<StackedAreaPoint>,
        areaOutline: Line<StackedAreaPoint>,
        overlay: ChartSelection<SVGRectElement>,
        verticalMarkerContainer: ChartSelection<SVGGElement>,
        verticalMarkerLine: ChartSelection<SVGLineElement>,
        epsilon: number,
        isAnimated = false,
        areaAnimationDuration = motion.duration,
        hasOutline = true,
        svg: ChartSelection<SVGSVGElement>,
        chartWidth: number,
        chartHeight: number,
        data: StackedAreaDatum[],
        dataSorted: StackedAreaDateGroup[],
        dataSortedFormatted: StackedAreaColumn[],
        dataSortedZeroed: StackedAreaColumn[],
        grid: GridTypes | null = null,
        tooltipThreshold = 480,
        emptyDataConfig: StackedAreaEmptyDataConfig = {
            minDate: new Date(new Date().setDate(new Date().getDate() - 30)),
            maxDate: new Date(),
            minY: 0,
            maxY: 500,
        },
        isUsingFakeData = false;

    const monthAxisPadding = 30;
    const yTickTextYOffset = -8;
    const yTickTextXOffset = -20;
    const tickPadding = 5;
    const lineGradient = colorHelper.colorGradients.greenBlue;
    const highlightCircleSize = 12;
    const highlightCircleRadius = 5;
    const highlightCircleStroke = 1.2;
    const highlightCircleActiveRadius = highlightCircleRadius + 2;
    const highlightCircleActiveStrokeWidth = 5;
    const highlightCircleActiveStrokeOpacity = 0.6;
    const maxAreaNumber = 10;
    const areaAnimationDelayStep = 20;
    const areaAnimationDelays = range(
        areaAnimationDelayStep,
        maxAreaNumber * areaAnimationDelayStep,
        areaAnimationDelayStep
    );
    const overlayColor = 'rgba(0, 0, 0, 0)';
    const ease = easeQuadInOut;
    const xAxisPadding = {
        top: 0,
        left: 15,
        bottom: 0,
        right: 0,
    };
    // getters
    /**
     * The colour a topic is drawn in.
     *
     * `buildScales` fills `nameToColorMap` before anything is drawn, so it is
     * non-null everywhere this is reached -- the same reasoning, and the same
     * shape, as `colorForGroup` in grouped-bar.ts.
     */
    const colorForName = (name: string) =>
        (nameToColorMap as Record<string, string>)[name];
    const getName = ({ name }: StackedAreaDatum) => name;
    const getDate = ({ date }: StackedAreaDatum) => date;
    // events
    const dispatcher: Dispatch<object> = dispatch(
        'customMouseOver',
        'customMouseOut',
        'customMouseMove',
        'customDataEntryClick',
        'customTouchMove'
    );

    /**
     * This function creates the graph using the selection and data provided
     * @param {D3Selection} _selection A d3 selection that represents
     * the container(s) where the chart(s) will be rendered
     * @param {AreaChartData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            StackedAreaChartDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (_data) {
            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);
            data = cleanData(_data);
            dataSorted = getSortedData(data);

            buildSVG(this);
            // With no data the chart draws placeholder areas, which aren't data
            renderDataTable(
                svg.node(),
                a11yDataTable && !isLoading && _data.length ? dataTable() : null
            );
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildLayers();
            buildScales();
            buildAxis();
            drawAxis();
            drawStackedAreas();

            addTouchEvents();

            if (shouldShowTooltip()) {
                drawHoverOverlay();
                drawVerticalMarker();
                addMouseEvents();
            }
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

        bounceCircleHighlight(glowEl, ease, highlightCircleActiveRadius);
    }

    /**
     * Adds events to the container group if the environment is not mobile
     * Adding: mouseover, mouseout and mousemove
     * @private
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
     * Formats the value depending on its characteristics
     * @param  {Number} value Value to format
     * @return {Number}       Formatted value
     */
    function getFormattedValue(value: NumberValue) {
        // d3's `tickFormat` declares the value as `NumberValue`, which is a
        // number or anything with `valueOf`. Coerced once here, where the
        // helpers below want a number.
        const numeric = Number(value);
        let formatFn;

        if (isInteger(numeric)) {
            formatFn = formatIntegerValue;
        } else {
            formatFn = formatDecimalValue;
        }

        // Same precedence as the line chart, whose equivalent function this is
        // otherwise a copy of: an explicit numberFormat overrides the
        // integer/decimal choice.
        //
        // It reaches both axes, as the line chart's does: the y axis always,
        // and the x axis when `xAxisValueType` is 'number'.
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
        // than every call on it being narrowed downstream.
        const asAxis = (axis: unknown) => axis as Axis<AxisDomain>;
        let minor: AxisTickSettings;
        let major: AxisTickSettings | null;

        if (xAxisValueType === 'number') {
            // `date` holds a number on this path: `castValueToType` returns
            // `Number(...)` for it when `xAxisValueType` is 'number', which is
            // what the helper's own `AxisDatumSorted` describes.
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
                    locale
                ));

                xSubAxis = asAxis(
                    axisBottom(xScale as ScaleTime<number, number>)
                        .ticks(major.tick as number)
                        // One argument: d3's `tickSize` sets both the inner
                        // and the outer size from it.
                        .tickSize(0)
                        .tickFormat(
                            major.format as (
                                domainValue: unknown
                            ) => string as (
                                domainValue: NumberValue | Date,
                                index: number
                            ) => string
                        )
                );
            }

            xAxis = asAxis(
                axisBottom(xScale as ScaleTime<number, number>)
                    .ticks(minor.tick as number)
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

        yAxis = axisRight(yScale)
            .ticks(yTicks)
            // An array where d3 wants a number, as in bar.ts: `tickSize`
            // assigns `+_`, and `+[0]` is 0 for a one-element array, so this
            // sets the size it looks like it does.
            .tickSize(+[0])
            .tickPadding(tickPadding)
            .tickFormat(getFormattedValue);

        // `drawGridLines` takes no parameters: it reads `xTicks` and `yTicks`
        // off the module.
        drawGridLines();
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
        container
            .selectAll('.x-axis-group')
            .append('g')
            .classed('axis sub-x', true);
        container.append('g').classed('y-axis-group axis', true);
        container.append('g').classed('grid-lines-group', true);
        container.append('g').classed('y-axis-label', true);
        container.append('g').classed('chart-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Builds the stacked layers layout
     * @return {D3Layout} Layout for drawing the chart
     * @private
     */
    function buildLayers() {
        // Each group's rows are spread onto the group itself, so the column
        // carries numeric indices alongside `key`, `values` and `date`. The
        // loop then puts every row's value under its own topic name, which is
        // what `d3.stack` reads by key. `StackedAreaColumn`'s index signature
        // is that bag of names.
        const toColumn = (zeroed: boolean) => (group: StackedAreaDateGroup) => {
            const column = Object.assign(
                {},
                group,
                group.values
            ) as unknown as Record<string, unknown>;

            Object.keys(column).forEach((k) => {
                const entry = column[k] as StackedAreaDatum | undefined;

                if (entry && entry.name) {
                    column[entry.name] = zeroed ? 0 : entry.value;
                }
            });

            return Object.assign({}, column, {
                date: castValueToType(column['key'] as string, xAxisValueType),
            }) as StackedAreaColumn;
        };

        dataSortedFormatted = dataSorted.map(toColumn(false));
        dataSortedZeroed = dataSorted.map(toColumn(true));

        const initialTotalsObject = uniq(data.map(getName)).reduce<
            Record<string, number>
        >((memo, key) => Object.assign({}, memo, { [key]: 0 }), {});

        const totals = data.reduce<Record<string, number>>(
            (memo, item) =>
                Object.assign({}, memo, {
                    [item.name]: (memo[item.name] += item.value),
                }),
            initialTotalsObject
        );

        order = topicsOrder || formatOrder(totals);

        const stack3 = stack<StackedAreaColumn, string>()
            .keys(order)
            .order(stackOrderNone)
            .offset(stackOffsetNone);

        layersInitial = stack3(dataSortedZeroed);
        layers = moveLayersByBaseline(stack3(dataSortedFormatted));
    }

    /**
     * Takes the layers and moves them by the yAxisBaseline
     * Returns the original layers if yAxisBaseline equals zero, because nothing to do then
     * @param layers
     * @return Manipulated Layers
     */
    function moveLayersByBaseline(layers: Series<StackedAreaColumn, string>[]) {
        if (yAxisBaseline === 0) {
            return layers;
        }

        layers = layers.map((section) => {
            section.map((entry) => {
                entry[0] = yAxisBaseline;

                return entry;
            });

            return section;
        });

        return layers;
    }

    /**
     * Takes an object with all topics as keys and their aggregate totals as values,
     * sorts them into a list by descending total value and
     * moves "Other" to the end
     * @param  {Object} totals  Keys of all the topics and their corresponding totals
     * @return {Array}          List of topic names in aggregate order
     */
    function formatOrder(totals: Record<string, number>) {
        let order = Object.keys(totals).sort((a, b) => {
            if (totals[a] > totals[b]) return -1;
            if (totals[a] === totals[b]) return 0;

            return 1;
        });

        const otherIndex = order.indexOf('Other');

        if (otherIndex >= 0) {
            const other = order.splice(otherIndex, 1);

            order = order.concat(other);
        }

        return order;
    }

    /**
     * Creates the x, y and color scales of the chart
     * @private
     */
    function buildScales() {
        xScale = buildXAxisScale();
        yScale = buildYAxisScale();

        nameToColorMap = withCustomColors(
            order.reduce(
                (memo, topic, index) =>
                    Object.assign({}, memo, { [topic]: colorSchema[index] }),
                {}
            ),
            customColorMap
        );
    }

    /**
     * Creates the xScale depending on the settings of
     * xAxisValueType and xAxisScale
     * @private
     */
    function buildXAxisScale() {
        // `extent` reports `[undefined, undefined]` for empty data, which the
        // chart never reaches here: `cleanData` substitutes fake data for an
        // empty set, so `dataSorted` always has at least one group.
        const dateExtent = () =>
            extent(dataSorted, ({ date }) => Number(date)) as [number, number];

        if (xAxisValueType === 'number') {
            if (xAxisScale === 'logarithmic') {
                return scaleLog()
                    .domain(dateExtent())
                    .rangeRound([0, chartWidth]);
            } else {
                return scaleLinear()
                    .domain(dateExtent())
                    .rangeRound([0, chartWidth]);
            }
        } else {
            return scaleTime().domain(dateExtent()).rangeRound([0, chartWidth]);
        }
    }

    /**
     * Creates the yScale
     * @private
     */
    function buildYAxisScale() {
        const minY = Number(getMinYAxisScale());
        const maxY = Number(getMaxYAxisScale());

        return scaleLinear()
            .domain([minY, maxY])
            .rangeRound([chartHeight, 0])
            .nice();
    }

    let a11yTitle: string | null = null;
    let a11yDescription: string | null = null;
    let a11yDataTable = true;

    /**
     * The chart's data as a table, for screen readers: a row per date and a
     * column per name
     * @private
     */
    function dataTable(): DataTable {
        return pivotTable(data, {
            heading: 'Date',
            row: (d) => d.date,
            column: (d) => String(d[keyLabel]),
            value: (d) => d.value,
            sortRows: ascending,
        });
    }

    /**
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element) {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart stacked-area', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);

        labelChart(svg.node(), {
            a11yTitle,
            a11yDescription,
            fallbackTitle: 'Stacked area chart',
        });
    }

    /**
     * Creates fake data for when data is an empty array
     * @return {array}      Fake data built from emptyDataConfig settings
     */
    function createFakeData() {
        const numDays = diffDays(
            emptyDataConfig.minDate,
            emptyDataConfig.maxDate
        );
        // `[...Array(n)]` rather than `Array.apply(null, Array(n))`: both give
        // an n-length array of undefined, and the lint override makes
        // `prefer-spread` an error.
        const emptyArray = [...Array(numDays)];

        isUsingFakeData = true;

        // Keyed by the label accessors, and `date` holds a Date where the
        // published shape describes the string a consumer passes -- which is
        // what `cleanData` then casts either way.
        return [
            ...emptyArray.map((el, i) => ({
                [dateLabel]: addDays(emptyDataConfig.minDate, i),
                [valueLabel]: 0,
                [keyLabel]: '1',
            })),
            ...emptyArray.map((el, i) => ({
                [dateLabel]: addDays(emptyDataConfig.minDate, i),
                [valueLabel]: 0,
                [keyLabel]: '2',
            })),
        ];
    }

    /**
     * Cleaning data casting the values and dates to the proper type while keeping
     * the rest of properties on the data. It creates fake data is the data is empty.
     * @param  {AreaChartData} originalData   Raw data from the container
     * @return {AreaChartData}                Parsed data with values and dates
     * @private
     */
    function cleanData(
        originalData: StackedAreaChartDataShape[]
    ): StackedAreaDatum[] {
        originalData =
            originalData.length === 0
                ? (createFakeData() as unknown as StackedAreaChartDataShape[])
                : originalData;

        return originalData.reduce<StackedAreaDatum[]>((acc, datum) => {
            // Written onto the caller's own objects rather than copies. The
            // cast covers `date` becoming a Date or a number where the
            // published shape has the string that went in, so the reads come
            // from `datum` first.
            const date = castValueToType(datum[dateLabel], xAxisValueType);
            const value = +datum[valueLabel];
            const d = datum as unknown as StackedAreaDatum;

            d.date = date;
            d.value = value;

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
        svg.select<SVGGElement>('.x-axis-group .axis.x')
            .attr('transform', `translate( 0, ${chartHeight} )`)
            .call(xAxis);

        if (xAxisFormat !== 'custom' && xAxisValueType !== 'number') {
            svg.select<SVGGElement>('.x-axis-group .axis.sub-x')
                .attr(
                    'transform',
                    `translate(0, ${chartHeight + monthAxisPadding})`
                )
                .call(xSubAxis);
        }

        svg.select<SVGGElement>('.y-axis-group.axis')
            .attr('transform', `translate( ${-xAxisPadding.left}, 0)`)
            .call(yAxis)
            .call(adjustYTickLabels);

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

        // Moving the YAxis tick labels to the right side
        // selectAll('.y-axis-group .tick text')
        //     .attr('transform', `translate( ${-chartWidth - yTickTextXOffset}, ${yTickTextYOffset})` );
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
     * Draws grid lines on the background of the chart
     * @return void
     */
    function drawGridLines() {
        svg.select('.grid-lines-group').selectAll('grid').remove();

        const shouldHighlightXAxis = Number(getMinYAxisScale()) < 0;

        if (grid === 'horizontal' || grid === 'full') {
            drawHorizontalGridLines(shouldHighlightXAxis);
        }

        if (grid === 'vertical' || grid === 'full') {
            drawVerticalGridLines();
        }
    }

    /**
     * Draws the grid lines for a vertical bar chart
     * @return {void}
     */
    function drawHorizontalGridLines(highlightZero = false) {
        const grid = gridHorizontal(yScale)
            .range([0, chartWidth])
            .hideEdges('first')
            .ticks(yTicks)
            .extendedLine(0)
            .highlight(highlightZero ? 0 : null);

        grid(svg.select('.grid-lines-group'));
    }

    /**
     * Draws the grid lines for an horizontal bar chart
     * @return {void}
     */
    function drawVerticalGridLines() {
        const grid = gridVertical(xScale)
            .range([0, chartHeight])
            .hideEdges('first')
            .ticks(xTicks as number)
            .extendedLine(xAxisPadding.bottom);

        grid(svg.select('.grid-lines-group'));
    }

    /**
     * Draws an overlay element over the graph
     * @private
     */
    function drawHoverOverlay() {
        // Not ideal, we need to figure out how to call exit for nested elements
        if (overlay) {
            svg.selectAll('.overlay').remove();
        }

        overlay = svg
            .select('.metadata-group')
            .append('rect')
            .attr('class', 'overlay')
            .attr('y1', 0)
            .attr('y2', chartHeight)
            .attr('height', chartHeight)
            .attr('width', chartWidth)
            .attr('fill', overlayColor)
            .style('display', 'none');
    }

    /**
     * Draws an empty line when the data is all zero
     * @private
     */
    function drawEmptyDataLine() {
        const emptyDataLine = line<StackedAreaColumn>()
            .x((d) => xScale(Number(d.date)))
            .y(() => yScale(0) - 1);

        const chartGroup = svg.select('.chart-group');

        chartGroup
            .append('path')
            .attr('class', 'empty-data-line')
            .attr('d', emptyDataLine(dataSortedFormatted))
            .style('stroke', 'url(#empty-data-line-gradient)');

        chartGroup
            .append('linearGradient')
            .attr('id', 'empty-data-line-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('x2', xScale(Number(data[data.length - 1].date)))
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
            .attr('stop-color', ({ color }) => color);
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState() {
        svg.select('.loading-state-group').html(stackedAreaLoadingMarkup);
    }

    /**
     * Draws the different areas into the chart-group element
     * @private
     */
    function drawStackedAreas() {
        // Not ideal, we need to figure out how to call exit for nested elements
        if (series) {
            svg.selectAll('.layer-container').remove();
            svg.selectAll('.layer').remove();
            svg.selectAll('.area-outline').remove();
        }

        if (isUsingFakeData) {
            drawEmptyDataLine();

            return;
        }

        areaShape = area<StackedAreaPoint>()
            .curve(curveMap[areaCurve])
            .x(({ data }) => xScale(Number(data.date)))
            .y0((d) => yScale(d[0]))
            .y1((d) => yScale(d[1]));

        areaOutline = line<StackedAreaPoint>()
            .curve(areaShape.curve())
            .x(({ data }) => xScale(Number(data.date)))
            .y((d) => yScale(d[1]));

        if (isAnimated && !prefersReducedMotion()) {
            series = svg
                .select('.chart-group')
                .selectAll('.layer')
                // Keyed by `name`, which a d3 `Series` does not have: its
                // topic is under `key`. So every layer keys to "undefined"
                // and the join collapses them. Keying by `key` instead would
                // change what the animated path draws, and the animated path
                // has no spec beyond its getter and setter. Typed as the read
                // it really performs.
                .data(
                    layersInitial,
                    (layer) =>
                        (layer as { name?: string }).name as unknown as string
                )
                .enter()
                .append('g')
                .classed('layer-container', true);

            series
                .append('path')
                .attr('class', 'layer')
                .attr('d', areaShape)
                .style('opacity', areaOpacity)
                .attr('fill', ({ key }) => colorForName(key));

            series
                .append('path')
                .attr('class', 'area-outline')
                .attr('d', areaOutline)
                .style('stroke', ({ key }) => colorForName(key))
                .attr('fill', 'none');

            // Update
            svg.select('.chart-group')
                .selectAll('.layer')
                .data(layers)
                .transition()
                .delay((_, i) => areaAnimationDelays[i])
                .duration(areaAnimationDuration)
                .ease(ease)
                .attr('d', areaShape)
                .style('opacity', areaOpacity)
                .attr('fill', ({ key }) => colorForName(key));

            svg.select('.chart-group')
                .selectAll('.area-outline')
                .data(layers)
                .transition()
                .delay((_, i) => areaAnimationDelays[i])
                .duration(areaAnimationDuration)
                .ease(ease)
                .attr('d', areaOutline)
                .attr('fill', 'none');
        } else {
            series = svg
                .select('.chart-group')
                .selectAll('.layer')
                .data(layers)
                .enter()
                .append('g')
                .classed('layer-container', true);

            series
                .append('path')
                .attr('class', 'layer')
                .attr('d', areaShape)
                .style('opacity', areaOpacity)
                .attr('fill', ({ key }) => colorForName(key));

            series
                .append('path')
                .attr('class', 'area-outline')
                .attr('d', areaOutline)
                .style('stroke', ({ key }) => colorForName(key));

            // Update
            svg.select('.chart-group')
                .selectAll<SVGPathElement, Series<StackedAreaColumn, string>>(
                    '.layer'
                )
                .attr('d', areaShape)
                .style('opacity', areaOpacity)
                .attr('fill', ({ key }) => colorForName(key));

            svg.select('.chart-group')
                .selectAll<SVGPathElement, Series<StackedAreaColumn, string>>(
                    '.area-outline'
                )
                .attr('class', 'area-outline')
                .attr('d', areaOutline)
                .style('stroke', ({ key }) => colorForName(key));
        }

        if (!hasOutline) {
            svg.select('.chart-group')
                .selectAll('.area-outline')
                .style('display', 'none');
        }

        // Exit
        series.exit().transition().style('opacity', 0).remove();
    }

    /**
     * Creates the vertical marker
     * @return void
     */
    function drawVerticalMarker() {
        // Not ideal, we need to figure out how to call exit for nested elements
        if (verticalMarkerContainer) {
            svg.selectAll('.vertical-marker-container').remove();
        }

        verticalMarkerContainer = svg
            .select('.metadata-group')
            .append('g')
            .attr('class', 'vertical-marker-container')
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

    /**
     * Removes all the datapoints highlighter circles added to the marker container
     * @return void
     * @private
     */
    function cleanDataPointHighlights() {
        verticalMarkerContainer.selectAll('.circle-container').remove();
    }

    /**
     * Orders the data by date for consumption on the chart tooltip
     * @param  {AreaChartData} data    Chart data
     * @return {Object[]}               Chart data ordered by date
     * @private
     */
    function getSortedData(data: StackedAreaDatum[]): StackedAreaDateGroup[] {
        // groups() yields [key, values] pairs. String() makes every key a
        // string.
        return groups(
            // Dates coerce to numbers in a subtraction, which the types do not
            // allow implicitly; `Number` is that coercion written out, as the
            // axis helper's own sort spells it.
            data.sort((a, b) => Number(a.date) - Number(b.date)),
            (d) => String(getDate(d))
        )
            .map(([key, values]) => ({ key, values }))
            .map((d) => {
                return Object.assign({}, d, {
                    date: castValueToType(d.key, xAxisValueType),
                });
            });
    }

    /**
     * Computes the minimum value
     *
     * @return {Number} Min value
     */
    function getMinValue() {
        return min(data.map((d) => d.value));
    }

    /**
     * Computes the minimal sum of values for any date
     *
     * @return {Number} Min value
     */
    function getMinValueByDate() {
        const keys = uniq(data.map((o) => o.name));
        const minValueByDate = min(dataSortedFormatted, function (d) {
            const vals = keys.map((key) => Number(d[key]));

            return sum(vals);
        });

        return minValueByDate;
    }

    /**
     * Computes the maximum sum of values for any date
     *
     * @return {Number} Max value
     */
    function getMaxValueByDate() {
        const keys = uniq(data.map((o) => o.name));
        const maxValueByDate = max(dataSortedFormatted, function (d) {
            const vals = keys.map((key) => Number(d[key]));

            return sum(vals);
        });

        return maxValueByDate;
    }

    /**
     * Computes the mininmal value for the Y-axis scale
     *
     * @return {Number} minY value
     */
    function getMinYAxisScale() {
        if (isUsingFakeData) {
            return emptyDataConfig.minY;
        }

        return min([
            Number(getMinValue()),
            Number(getMinValueByDate()),
            yAxisBaseline,
            0,
        ]);
    }

    /**
     * Computes the maximal value for the Y-axis scale
     *
     * @return {Number} maxY value
     */
    function getMaxYAxisScale() {
        if (isUsingFakeData) {
            return emptyDataConfig.maxY;
        }

        return max([Number(getMaxValueByDate()), yAxisBaseline]);
    }

    /**
     * Finds out the data entry that is closer to the given position on pixels
     * @param  {Number} mouseX X position of the mouse
     * @return {obj}        Data entry that is closer to that x axis position
     */
    function getNearestDataPoint(mouseX: number) {
        const points = dataSorted.filter(
            ({ date }) => Math.abs(xScale(date) - mouseX) <= epsilon
        );

        if (points.length) {
            return points[0];
        }
    }

    /**
     * Epsilon is the value given to the number representing half of the distance in
     * pixels between two date data points
     * @return {Number} half distance between any two points
     */
    function setEpsilon() {
        const dates = dataSorted.map(({ date }) => date);

        epsilon = (xScale(dates[1]) - xScale(dates[0])) / 2;
    }

    /**
     * MouseMove handler, calculates the nearest dataPoint to the cursor
     * and updates metadata related to it
     * @private
     */
    function handleMouseMove(e: Element, d: unknown, event: Event) {
        // An `if` rather than `epsilon || setEpsilon()` as a statement, which
        // the lint override reads as an unused expression.
        if (!epsilon) {
            setEpsilon();
        }

        // The listener is on the root svg, so the pointer arrives in svg
        // coordinates; everything the chart draws (the tooltip included)
        // lives inside the margin-translated container, hence the offsets.
        const [xPosition, yPosition] = pointer(event, e);
        const dataPoint = getNearestDataPoint(xPosition - (margin.left ?? 0));
        const pointerYPosition = yPosition - (margin.top ?? 0);
        let dataPointXPosition;

        if (dataPoint) {
            dataPointXPosition = xScale(new Date(dataPoint.key));
            // Move verticalMarker to that datapoint
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
     * Touchmove highlighted points
     * It will only pass the information with the event
     * @private
     */
    function handleTouchMove(e: Element, d: unknown, event: Event) {
        dispatcher.call('customTouchMove', e, d, pointer(event, e));
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
     * Creates coloured circles marking where the exact data y value is for a given data point
     * @param  {obj} dataPoint Data point to extract info from
     * @private
     */
    function highlightDataPoints({ values }: StackedAreaDateGroup) {
        let accumulator = 0;

        cleanDataPointHighlights();

        // ensure order stays constant
        // One entry per topic in `order`, and `find` reports undefined for a
        // topic with no row at this date -- which is why the reads below are
        // guarded by the type rather than assumed.
        const sortedValues = order.reduce<(StackedAreaDatum | undefined)[]>(
            (acc, current) => {
                return [...acc, values.find(({ name }) => name === current)];
            },
            []
        );

        sortedValues.forEach((d, index) => {
            if (!d) {
                return;
            }

            // Before the tooltip, when it is mounted in this container: the
            // later sibling paints on top, and the markers belong under it.
            const marker = verticalMarkerContainer
                .insert('g', ':scope > .britechart')
                .classed('circle-container', true)
                .append('circle')
                .classed('data-point-highlighter', true)
                .attr('cx', highlightCircleSize)
                .attr('cy', 0)
                .attr('r', highlightCircleRadius)
                .style('stroke-width', highlightCircleStroke)
                .style('stroke', colorForName(d.name))
                .style('cursor', 'pointer')
                .on('click', function (event) {
                    addGlowFilter(this);
                    handleHighlightClick(this, d, event);
                })
                .on('mouseout', function (event) {
                    removeFilter(this);
                });

            accumulator =
                accumulator + Number(sortedValues[index]?.[valueLabel]);

            marker.attr(
                'transform',
                `translate( ${-highlightCircleSize}, ${yScale(accumulator)} )`
            );
        });
    }

    /**
     * Helper method to update the x position of the vertical marker
     * @param  {obj} dataPoint Data entry to extract info
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
     * @private
     */
    function shouldShowTooltip() {
        return width > tooltipThreshold && !isUsingFakeData;
    }

    // API
    /**
     * Gets or Sets the name screen readers announce for the chart. It is
     * set as the svg's `aria-label`. Unset, the chart is announced as
     * "Stacked area chart".
     * @param  {String | null} _x     Desired accessible title for the chart
     * @return {String | null | module} Current a11yTitle or Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).a11yTitle = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return a11yTitle;
        }
        a11yTitle = _x;

        return this;
    } as StackedAreaChartModule['a11yTitle'];

    /**
     * Gets or Sets a longer description screen readers announce after the
     * chart's name, such as what the data shows. It is rendered as the svg's
     * `<desc>`. Unset, the chart has no description.
     * @param  {String | null} _x     Desired accessible description for the chart
     * @return {String | null | module} Current a11yDescription or Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).a11yDescription = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return a11yDescription;
        }
        a11yDescription = _x;

        return this;
    } as StackedAreaChartModule['a11yDescription'];

    /**
     * Gets or Sets whether the chart renders its data as a visually hidden
     * table after its svg, which screen readers can read cell by cell. On by
     * default; set it to false when the app gives the data its own accessible
     * form.
     * @param  {Boolean} _x     Whether to render the data table
     * @return {Boolean | module} Current a11yDataTable or Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).a11yDataTable = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return a11yDataTable;
        }
        a11yDataTable = _x;

        return this;
    } as StackedAreaChartModule['a11yDataTable'];

    /**
     * Gets or Sets the duration of the area animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).animationDuration = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return areaAnimationDuration;
        }
        areaAnimationDuration = _x;

        return this;
    } as StackedAreaChartModule['animationDuration'];

    /**
     * Gets or Sets the area curve of the stacked area.
     * @param {String} [_x='monotoneX']     Desired curve for the stacked area, default 'monotoneX'. Other options are:
     * basis, natural, linear, monotoneY, step, stepAfter, stepBefore, cardinal, and
     * catmullRom. Visit https://github.com/d3/d3-shape#curves for more information.
     * @return {String | module}            Current area curve setting or Chart module to chain calls
     * @public
     * @example stackedArea.areaCurve('step')
     */
    (exports as StackedAreaChartModule).areaCurve = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return areaCurve;
        }
        areaCurve = _x;

        return this;
    } as StackedAreaChartModule['areaCurve'];

    /**
     * Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity)
     * @param  {Number} _x          Opacity to get/set
     * @return {Number | module}    Current opacity or Area Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).areaOpacity = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return areaOpacity;
        }
        areaOpacity = _x;

        return this;
    } as StackedAreaChartModule['areaOpacity'];

    /**
     * Exposes the constants to be used to force the x axis to respect a certain granularity
     * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     * @example
     *     area.xAxisCustomFormat(area.axisTimeCombinations.HOUR_DAY)
     */
    (exports as StackedAreaChartModule).axisTimeCombinations =
        axisTimeCombinations as StackedAreaChartModule['axisTimeCombinations'];

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {object | module}     Current colorMap or Chart module to chain calls
     * @example stackedArea.colorMap({name: 'colorHex', name2: 'colorString'})
     * @public
     */
    (exports as StackedAreaChartModule).colorMap = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return customColorMap;
        }
        customColorMap = _x;

        return this;
    } as StackedAreaChartModule['colorMap'];

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {String[]} _x        Desired colorSchema for the graph
     * @return {String[] | module}  Current colorSchema or Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).colorSchema = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as StackedAreaChartModule['colorSchema'];

    /**
     * Gets or Sets the emptyDataConfig of the chart
     * @param  {Object} _x          emptyDataConfig object to get/set
     * @return {Object | module}    Current config for when chart data is an empty array
     * @public
     */
    (exports as StackedAreaChartModule).emptyDataConfig = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return emptyDataConfig;
        }
        emptyDataConfig = _x;

        return this;
    } as StackedAreaChartModule['emptyDataConfig'];

    /**
     * Gets or Sets the grid mode
     * @param  {String} _x          Desired mode for the grid ('vertical'|'horizontal'|'full')
     * @return {String | module}    Current mode of the grid or Area Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).grid = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return grid;
        }
        grid = _x;

        return this;
    } as StackedAreaChartModule['grid'];

    /**
     * Enables or disables the outline at the top of the areas
     * @param {Boolean} _x = true   Whether if the areas in the chart have an outline at the top
     * @return {Boolean | module}   Current state of the flag
     * @public
     */
    (exports as StackedAreaChartModule).hasOutline = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return hasOutline;
        }
        hasOutline = _x;

        return this;
    } as StackedAreaChartModule['hasOutline'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x          Desired width for the graph
     * @return {Number | module}    Current height or Area Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).height = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as StackedAreaChartModule['height'];

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * The chart draws without animation when the reader's system asks for
     * reduced motion (`prefers-reduced-motion`), whatever this is set to.
     * @param  {Boolean} _x = false     Desired animation flag
     * @return {Boolean | module}       Current isAnimated flag or Chart module
     * @public
     */
    (exports as StackedAreaChartModule).isAnimated = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    } as StackedAreaChartModule['isAnimated'];

    /**
     * Gets or Sets the number format of the stacked area chart
     * @param  {string} _x = ',f'       Desired numberFormat for the chart. See examples [here]{@link https://d3js.org/d3-format}
     * @return {string | module}        Current numberFormat or Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).numberFormat = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as StackedAreaChartModule['numberFormat'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return {Object | module}    Current margin or Area Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).margin = function (
        this: StackedAreaChartModule,
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
    } as StackedAreaChartModule['margin'];

    /**
     * Gets or Sets the minimum width of the graph in order to show the tooltip
     * NOTE: This could also depend on the aspect ratio
     * @param  {Number} _x          Minimum width of the graph
     * @return {Number | module}    Current tooltipThreshold or Area Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).tooltipThreshold = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return tooltipThreshold;
        }
        tooltipThreshold = _x;

        return this;
    } as StackedAreaChartModule['tooltipThreshold'];

    /**
     * Pass an override for the ordering of the topics
     * @param  {String[]} _x          Array of the names of your tooltip items
     * @return {String[] | module}    Current override order or Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).topicsOrder = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return topicsOrder;
        }
        topicsOrder = _x;

        return this;
    } as StackedAreaChartModule['topicsOrder'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).isLoading = function (
        this: StackedAreaChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as StackedAreaChartModule['isLoading'];

    /**
     * Pass language tag for the tooltip to localize the date.
     * Feature uses Intl.DateTimeFormat, for compatability and support, refer to
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param  {String} _x          A language tag (BCP 47) like 'en-US' or 'fr-FR'
     * @return {String | Module}    Current locale or module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).locale = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    } as StackedAreaChartModule['locale'];

    /**
     * Exports the chart and fires a download: an svg file when the filename
     * ends in `.svg`, and a png otherwise
     * @param {String} filename     Name of the downloaded file, whose extension picks the format
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as StackedAreaChartModule).exportChart = function (
        filename,
        title
    ) {
        return exportChart.call(
            exports as StackedAreaChartModule,
            svg,
            filename,
            title
        );
    } as StackedAreaChartModule['exportChart'];

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove, customMouseOut,
     * customDataEntryClick and customTouchMove
     * @return {module}     Stacked Area
     * @public
     */
    (exports as StackedAreaChartModule).on = function (
        ...args: [string] | [string, () => void]
    ) {
        // Rest parameters and a spread rather than `arguments` and `.apply`,
        // as in the other charts.
        const value = dispatcher.on(
            ...(args as Parameters<typeof dispatcher.on>)
        );

        return value === dispatcher ? exports : value;
    } as unknown as StackedAreaChartModule['on'];

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x          Desired width for the graph
     * @return {Number | module}    Current width or Area Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).width = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as StackedAreaChartModule['width'];

    /**
     * Exposes the ability to force the chart to show a certain x format
     * It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: localization not supported
     * @param  {String} _x            Desired format for x axis, one of the d3.js date formats [here]{@link https://github.com/d3/d3-time-format#locale_format}
     * @return {String | Module}      Current format or module to chain calls
     * @public
     * @example
     *     stackedArea.xAxisCustomFormat(stackedArea.axisTimeCombinations.HOUR_DAY)
     */
    (exports as StackedAreaChartModule).xAxisCustomFormat = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisCustomFormat;
        }
        xAxisCustomFormat = _x;

        return this;
    } as StackedAreaChartModule['xAxisCustomFormat'];

    /**
     * Exposes the ability to force the chart to show a certain x axis grouping
     * @param  {String} _x          Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR)
     * Set it to 'custom' to make use of specific formats with xAxisCustomFormat
     * @return { String|Module }      Current format or module to chain calls
     * @public
     * @example
     *     stackedArea.xAxisCustomFormat(stackedArea.axisTimeCombinations.HOUR_DAY)
     */
    (exports as StackedAreaChartModule).xAxisFormat = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisFormat;
        }
        xAxisFormat = _x;

        return this;
    } as StackedAreaChartModule['xAxisFormat'];

    /**
     * Gets or Sets the `xAxisValueType`.
     * Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
     * be dates anymore, but can be arbitrary numbers.
     * @param  {string} [_x='date']     Desired value type of the x-axis
     * @return {string | module}        Current value type of the x-axis or Chart module to chain calls
     * @public
     * @example stackedArea.xAxisValueType('number')
     */
    (exports as StackedAreaChartModule).xAxisValueType = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisValueType;
        }
        xAxisValueType = _x;

        return this;
    } as StackedAreaChartModule['xAxisValueType'];

    /**
     * Gets or Sets the `xAxisScale`.
     * Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
     * 'number' as well, otherwise it won't influence the visualization.
     * @param  {string} [_x='linear']   Desired value type of the x-axis
     * @return {string | module}        Current value type of the x-axis or Chart module to chain calls
     * @public
     * @example stackedArea.xAxisValueType('number').xAxisScale('logarithmic')
     */
    (exports as StackedAreaChartModule).xAxisScale = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisScale;
        }
        xAxisScale = _x;

        return this;
    } as StackedAreaChartModule['xAxisScale'];

    /**
     * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
     * how many and where the ticks will appear.
     * @param  {Number} _x            Desired number of x axis ticks (multiple of 2, 5 or 10)
     * @return {Number | Module}      Current number or ticks or module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).xTicks = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xTicks;
        }
        xTicks = _x;

        return this;
    } as StackedAreaChartModule['xTicks'];

    /**
     * Gets or Sets the y-axis label of the chart
     * @param  {String} _x Desired label string
     * @return {String | module} Current yAxisLabel or Chart module to chain calls
     * @public
     * @example stackedArea.yAxisLabel('Ticket Sales')
     */
    (exports as StackedAreaChartModule).yAxisLabel = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabel;
        }
        yAxisLabel = _x;

        return this;
    } as StackedAreaChartModule['yAxisLabel'];

    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     * @param  {Number} [_x=-60]    Desired offset for the label
     * @return {Number | module}    Current yAxisLabelOffset or Chart module to chain calls
     * @public
     * @example stackedArea.yAxisLabelOffset(-55)
     */
    (exports as StackedAreaChartModule).yAxisLabelOffset = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabelOffset;
        }
        yAxisLabelOffset = _x;

        return this;
    } as StackedAreaChartModule['yAxisLabelOffset'];

    /**
     * Gets or Sets the number of ticks of the y axis on the chart
     * @param  {Number} [_x=5]      Desired vertical ticks
     * @return {Number | module}    Current vertical ticks or Chart module to chain calls
     * @public
     */
    (exports as StackedAreaChartModule).yTicks = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yTicks;
        }
        yTicks = _x;

        return this;
    } as StackedAreaChartModule['yTicks'];

    /**
     * Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction
     * (default is 0). Change this value if you don't want to start your area from y=0.
     * @param  {Number} [_x=0]      Desired baseline of the y axis
     * @return {Number | module}    Current baseline or Chart module to chain calls
     * @public
     * @example stackedArea.yAxisBaseline(20)
     */
    (exports as StackedAreaChartModule).yAxisBaseline = function (
        this: StackedAreaChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisBaseline;
        }
        yAxisBaseline = _x;

        return this;
    } as StackedAreaChartModule['yAxisBaseline'];

    return exports as unknown as StackedAreaChartModule;
}
