import { max } from 'd3-array';
import { easeQuadInOut } from 'd3-ease';
import { axisBottom, axisLeft } from 'd3-axis';
import { color } from 'd3-color';
import { dispatch } from 'd3-dispatch';
import * as d3Format from 'd3-format';
import { scaleLinear, scaleBand } from 'd3-scale';
import { pointer, select } from 'd3-selection';
import type { Axis, AxisDomain } from 'd3-axis';
import type { Dispatch } from 'd3-dispatch';
import type { FormatLocaleObject } from 'd3-format';
import type { BaseType, Selection } from 'd3-selection';
import 'd3-transition';

import { wrapTextWithEllipses } from '../helpers/text';
import { exportChart } from '../helpers/export';
import { getBaselineExtent, getValueDomain } from '../helpers/domain';
import colorHelper from '../helpers/color';
import { barLoadingMarkup } from '../helpers/load';
import { uniqueId } from '../helpers/number';
import { setDefaultLocale } from '../helpers/locale';
import { dataKeyDeprecationMessage } from '../helpers/project';
import { motion } from '../helpers/constants';
import { gridHorizontal, gridVertical } from '../helpers/grid';
import { asCategoryScale, asValueScale } from '../helpers/scale';
import type { AxisScale } from '../helpers/scale';
import type { LocalObject } from '../../typings/common/local';
import type { ChartMarginParams } from '../../typings/common/margin';
import type { ColorsSchemasType } from '../../typings/helpers/colors';
import type {
    BarChartDataShape,
    BarChartModule,
    BarSelection,
} from '../../typings/charts/bar-chart';

const PERCENTAGE_FORMAT = '%';
const NUMBER_FORMAT = ',f';

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are the migration plan's bounded `any`, as in grouped-bar.ts and
 * stacked-bar.ts: these are module-level variables reassigned from several
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
 * deprecated `nameLabel`/`valueLabel` accessors: they let the data carry those
 * two values under any key, so the reads in `cleanData` really are dynamic.
 */
type BarDatum = BarChartDataShape & {
    [key: string]: unknown;
};

/**
 * What `cleanData` returns and `sortData` passes on: the data itself and a
 * zeroed copy of it, which the animated paths grow from.
 */
type BarData = {
    data: BarDatum[];
    dataZeroed: BarDatum[];
};

/**
 * The data join the four drawing functions receive: rects bound to the chart's
 * own data, which is what gives their `this` and their accessors a type.
 */
type BarJoin = Selection<
    SVGRectElement,
    BarDatum,
    BaseType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
>;

/**
 * One entry of the per-bar colour list, which `drawBars` reads by index rather
 * than by name.
 */
type BarColorEntry = {
    name: string;
    color: string;
};

/**
 * Bar Chart reusable API class that renders a
 * simple and configurable bar chart.
 *
 * @module Bar
 * @tutorial bar
 * @requires d3-array, d3-ease, d3-axis, d3-color, d3-dispatch, d3-format, d3-scale, d3-selection, d3-transition
 *
 * @example
 * const barChart = bar();
 *
 * barChart
 *     .height(500)
 *     .width(800);
 *
 * d3.select('.css-selector')
 *     .datum(dataset)
 *     .call(barChart);
 *
 */

/**
 * @typedef BarChartData
 * @type {Object[]}
 * @property {Number} value        Value of the group (required)
 * @property {String} name         Name of the group (required)
 *
 * @example
 * [
 *     {
 *         value: 1,
 *         name: 'glittering'
 *     },
 *     {
 *         value: 1,
 *         name: 'luminous'
 *     }
 * ]
 */

/**
 * @typedef LocaleObject
 * @type {Object}
 * @property {String} decimal       the decimal point(e.g., ".")
 * @property {String} thousands     the group separator(e.g., ",")
 * @property {Number[]} grouping    the array of group sizes(e.g., [3]), cycled as needed
 * @property {String[]} currency    the currency prefix and suffix(e.g., ["$", ""])
 * @property {String[]} numerals    optional; an array of ten strings to replace the numerals 0 - 9.
 * @property {String} percent       optional; the percent sign(defaults to "%")
 * @property {String} minus         optional; the minus sign(defaults to hyphen - minus, "-")
 * @property {String} nan           optional; the not - a - number value(defaults "NaN")
 *
 * See some standard locale object values [here]{@link https://cdn.jsdelivr.net/npm/d3-format/locale/}.
 * @example
 * {
 *     "decimal": ",",
 *     "thousands": ".",
 *     "grouping": [3],
 *     "currency": ["", "\u00a0€"]
 * }
 */
export default function module(): BarChartModule {
    // Split into `let` and `const` rather than the one `let` chain the
    // JavaScript had: the TypeScript ESLint override runs `prefer-const` as an
    // error, and the bindings below it are never reassigned.
    let margin: ChartMarginParams = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40,
        },
        width = 960,
        height = 500,
        isLoading = false,
        data: BarDatum[],
        dataZeroed: BarDatum[],
        chartWidth: number,
        chartHeight: number,
        xScale: AxisScale,
        yScale: AxisScale,
        colorSchema: ColorsSchemasType = colorHelper.singleColors.aloeGreen,
        colorList: BarColorEntry[],
        nameToColorMap: Record<string, string> | null = null,
        chartGradientColors: [string, string] | null = null,
        // The selection this ends on is the gradient's `stop` elements, not
        // the `linearGradient` the chain starts from -- the name is the
        // chart's, kept as it stands.
        chartGradientEl: ChartSelection<SVGStopElement>,
        yTicks = 5,
        xTicks = 5,
        percentageAxisToMaxRatio = 1,
        numberFormat = NUMBER_FORMAT,
        enableLabels = false,
        labelsMargin = 7,
        labelsNumberFormat = NUMBER_FORMAT,
        labelsSize = 12,
        betweenBarsPadding = 0.1,
        xAxis: Axis<AxisDomain>,
        yAxis: Axis<AxisDomain>,
        yAxisPaddingBetweenChart = 10,
        isHorizontal = false,
        svg: ChartSelection<SVGSVGElement>,
        hasSingleBarHighlight = true,
        isAnimated = false,
        animationDuration = motion.duration,
        // The default darkens the hovered bar. `null` goes in to disable the
        // effect, which is why the declaration's getter is nullable -- and the
        // first hover then replaces a null with a no-op, so it does not stay
        // null. `BarSelection` is the published type, which is what a
        // consumer's own replacement receives.
        highlightBarFunction: ((barSelection: BarSelection) => void) | null = (
            barSelection
        ) =>
            barSelection.attr('fill', ({ name }) =>
                String(
                    color(
                        chartGradientColors
                            ? chartGradientColors[1]
                            : (nameToColorMap as Record<string, string>)[name]
                    )!.darker()
                )
            ),
        // No default: the chart sorts nothing until a comparator arrives, which
        // is what the declaration now says.
        orderingFunction:
            | ((a: BarChartDataShape, b: BarChartDataShape) => number)
            | undefined,
        // To Deprecate
        valueLabel = 'value',
        nameLabel = 'name',
        // The selection this ends on is the label `text` elements, not the
        // group the chain starts from -- again the chart's own name.
        labelEl: ChartSelection<SVGTextElement>,
        xAxisLabelEl: ChartSelection<SVGTextElement> | null = null,
        xAxisLabel: string | null = null,
        xAxisLabelOffset = 30,
        yAxisLabelEl: ChartSelection<SVGTextElement> | null = null,
        yAxisLabel: string | null = null,
        yAxisLabelOffset = -30,
        shouldReverseColorList = true,
        locale: LocalObject | null = null,
        // The d3-format namespace to start with, replaced by a locale-specific
        // formatter once `valueLocale` is set. Both carry `format`, which is
        // all `buildAxis` and `drawLabels` read off it.
        localeFormatter: FormatLocaleObject = d3Format;

    const chartGradientId = uniqueId('bar-gradient');
    const xAxisPadding = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    };
    const yAxisLineWrapLimit = 1;
    const ease = easeQuadInOut;
    const animationStepRatio = 70;
    const interBarDelay = (d: BarDatum, i: number) => animationStepRatio * i;
    // Dispatcher object to broadcast the mouse events
    // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
    const dispatcher: Dispatch<object> = dispatch(
        'customMouseOver',
        'customMouseOut',
        'customMouseMove',
        'customClick'
    );
    // extractors
    const getName = ({ name }: BarDatum) => name;
    const getValue = ({ value }: BarDatum) => value;
    const _labelsHorizontalX = ({ value }: BarDatum) =>
        asValueScale(xScale)(value) + labelsMargin;
    const _labelsHorizontalY = ({ name }: BarDatum) =>
        asCategoryScale(yScale)(name) +
        asCategoryScale(yScale).bandwidth() / 2 +
        labelsSize * (3 / 8);
    const _labelsVerticalX = ({ name }: BarDatum) =>
        asCategoryScale(xScale)(name);
    const _labelsVerticalY = ({ value }: BarDatum) =>
        asValueScale(yScale)(value) - labelsMargin;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {BarChartData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            BarChartDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        if (locale) {
            localeFormatter = setDefaultLocale(locale);
        }

        _selection.each(function (_data) {
            chartWidth =
                width -
                (margin.left ?? 0) -
                (margin.right ?? 0) -
                yAxisPaddingBetweenChart * 1.2;
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);
            ({ data, dataZeroed } = sortData(cleanData(_data)));

            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildScales();
            buildAxis(localeFormatter);
            buildGradient();
            drawGridLines();
            drawAxis();
            drawBars();

            if (enableLabels) {
                drawLabels(localeFormatter);
            }
        });
    }

    /**
     * Creates the d3 x and y axis, setting orientations
     * @private
     */
    function buildAxis(locale: FormatLocaleObject) {
        if (isHorizontal) {
            xAxis = axisBottom(xScale)
                .ticks(xTicks, locale.format(numberFormat))
                // An array where d3 wants a number. `tickSizeInner` assigns
                // `+_`, and `+[-n]` is `-n` for a one-element array, so this
                // has always produced the inner size it looks like it does.
                // Preserved, with the coercion written where it happens.
                .tickSizeInner(+[-chartHeight]);

            yAxis = axisLeft(yScale).ticks(yTicks, locale.format(numberFormat));
        } else {
            xAxis = axisBottom(xScale);

            yAxis = axisLeft(yScale).ticks(yTicks, locale.format(numberFormat));
        }
    }
    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * Also applies the Margin convention
     * @private
     */
    function buildContainerGroups() {
        const container = svg
            .append('g')
            .classed('container-group', true)
            .attr(
                'transform',
                `translate(${(margin.left ?? 0) + yAxisPaddingBetweenChart}, ${
                    margin.top
                })`
            );

        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('grid-lines-group', true);
        container.append('g').classed('chart-group', true);
        container
            .append('g')
            .classed('x-axis-group axis', true)
            .append('g')
            .classed('x-axis-label', true);
        container
            .append('g')
            .attr('transform', `translate(${-1 * yAxisPaddingBetweenChart}, 0)`)
            .classed('y-axis-group axis', true)
            .append('g')
            .classed('y-axis-label', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Builds the gradient element to be used later
     * @return {void}
     * @private
     */
    function buildGradient() {
        if (!chartGradientEl && chartGradientColors) {
            chartGradientEl = svg
                .select('.metadata-group')
                .append('linearGradient')
                .attr('id', chartGradientId)
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '100%')
                .attr('y2', '100%')
                .attr('gradientUnits', 'userSpaceOnUse')
                .selectAll('stop')
                .data([
                    { offset: '0%', color: chartGradientColors[0] },
                    { offset: '50%', color: chartGradientColors[1] },
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
        const valueDomain = getValueAxisDomain();

        if (isHorizontal) {
            xScale = scaleLinear()
                .domain(valueDomain)
                .rangeRound([0, chartWidth]);

            yScale = scaleBand()
                .domain(data.map(getName))
                .rangeRound([0, chartHeight])
                .padding(betweenBarsPadding);
        } else {
            xScale = scaleBand()
                .domain(data.map(getName))
                .rangeRound([0, chartWidth])
                .padding(betweenBarsPadding);

            yScale = scaleLinear()
                .domain(valueDomain)
                .rangeRound([chartHeight, 0]);
        }

        if (shouldReverseColorList) {
            colorList = data
                .map((d) => d)
                .reverse()
                .map(({ name }, i) => ({
                    name,
                    color: colorSchema[i % colorSchema.length],
                }));
        } else {
            colorList = data
                .map((d) => d)
                .map(({ name }, i) => ({
                    name,
                    color: colorSchema[i % colorSchema.length],
                }));
        }

        nameToColorMap =
            nameToColorMap ||
            data
                .map((d) => d)
                .reduce(
                    (acc, { name }, i) => ({
                        ...acc,
                        [name]: colorSchema[i % colorSchema.length],
                    }),
                    {}
                );
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element) {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart bar-chart', true);

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
     * It also creates a set of zeroed data (for animation purposes)
     * @param  {BarChartData} originalData  Raw data as passed to the container
     * @return  {BarChartData}              Clean data
     * @private
     */
    function cleanData(originalData: BarChartDataShape[]): BarData {
        // Written onto the caller's own objects rather than copies, which is
        // the runtime this preserves. The cast covers the two reads the label
        // accessors make dynamic: the data may carry its value and name under
        // any key.
        const data = originalData.reduce<BarDatum[]>((acc, datum) => {
            const d = datum as BarDatum;

            d.value = +(d[valueLabel] as number);
            d.name = String(d[nameLabel]);

            return [...acc, d];
        }, []);

        const dataZeroed = data.map(
            (d) =>
                ({
                    value: 0,
                    name: String(d[nameLabel]),
                }) as BarDatum
        );

        return { data, dataZeroed };
    }

    /**
     * A utility function that checks if custom gradient
     * color map should be applied if specified by the user
     * @param {String} name - bar's data point name
     * @return {void}
     * @private
     */
    function computeColor(name: string) {
        // `buildScales` fills `nameToColorMap` before anything is drawn, so it
        // is non-null everywhere this is reached.
        return chartGradientColors
            ? `url(#${chartGradientId})`
            : (nameToColorMap as Record<string, string>)[name];
    }

    /**
     * Sorts data if orderingFunction is specified
     * @param  {BarChartData}     clean unordered data
     * @return  {BarChartData}    clean ordered data
     * @private
     */
    function sortData(unorderedData: BarData): BarData {
        const { data, dataZeroed } = unorderedData;

        if (orderingFunction) {
            data.sort(orderingFunction);
            dataZeroed.sort(orderingFunction);
        }

        return { data, dataZeroed };
    }

    /**
     * Utility function that wraps a text into the given width
     * @param  {D3Selection} text         Text to write
     * @param  {Number} containerWidth
     * @private
     */
    function wrapText(text: ChartSelection<BaseType>, containerWidth: number) {
        wrapTextWithEllipses(text, containerWidth, 0, yAxisLineWrapLimit);
    }

    /**
     * Cleans the loading state
     * @private
     */
    function cleanLoadingState() {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Returns the sibling bar nodes of the given element. d3 v6 dropped
     * the third `nodes` argument that used to be passed to event handlers,
     * so the list is derived from the DOM instead.
     * @param  {SVGElement} node  The element the event fired on
     * @return {SVGElement[]}     Its siblings, including itself
     * @private
     */
    function siblingNodes(node: Element) {
        return select(node.parentNode as Element)
            .selectAll<SVGRectElement, BarDatum>('.bar')
            .nodes();
    }

    /**
     * Draws the x and y axis on the svg object within their
     * respective groups
     * @private
     */
    function drawAxis() {
        svg.select<SVGGElement>('.x-axis-group.axis')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis);

        svg.select<SVGGElement>('.y-axis-group.axis').call(yAxis);

        svg.selectAll('.y-axis-group .tick text').call(
            wrapText,
            (margin.left ?? 0) - yAxisPaddingBetweenChart
        );

        drawAxisLabels();
    }

    /**
     * Draws the x and y axis custom labels respective groups
     * @private
     */
    function drawAxisLabels() {
        if (yAxisLabel) {
            if (yAxisLabelEl) {
                yAxisLabelEl.remove();
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

        if (xAxisLabel) {
            if (xAxisLabelEl) {
                xAxisLabelEl.remove();
            }
            xAxisLabelEl = svg
                .select('.x-axis-label')
                .append('text')
                .attr('y', xAxisLabelOffset)
                .attr('text-anchor', 'middle')
                .classed('x-axis-label-text', true)
                .attr('x', chartWidth / 2)
                .text(xAxisLabel);
        }
    }

    /**
     * Draws the bars along the x axis
     * @param  {D3Selection} bars Selection of bars
     * @return {void}
     */
    function drawHorizontalBars(bars: BarJoin) {
        // Enter + Update
        bars.enter()
            .append('rect')
            .classed('bar', true)
            .attr('y', chartHeight)
            .attr(
                'x',
                ({ value }) =>
                    getBaselineExtent(asValueScale(xScale), value).start
            )
            .attr('height', asCategoryScale(yScale).bandwidth())
            .attr(
                'width',
                ({ value }) =>
                    getBaselineExtent(asValueScale(xScale), value).size
            )
            .on('mouseover', function (event, d) {
                handleMouseOver(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('mousemove', function (event, d) {
                handleMouseMove(this, d, chartWidth, chartHeight, event);
            })
            .on('mouseout', function (event, d) {
                handleMouseOut(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('click', function (event, d) {
                handleClick(this, d, chartWidth, chartHeight, event);
            })
            .merge(bars)
            .attr(
                'x',
                ({ value }) =>
                    getBaselineExtent(asValueScale(xScale), value).start
            )
            .attr('y', ({ name }) => asCategoryScale(yScale)(name))
            .attr('height', asCategoryScale(yScale).bandwidth())
            .attr(
                'width',
                ({ value }) =>
                    getBaselineExtent(asValueScale(xScale), value).size
            )
            .attr('fill', ({ name }) => computeColor(name));
    }

    /**
     * Draws and animates the bars along the x axis
     * @param  {D3Selection} bars Selection of bars
     * @return {void}
     */
    function drawAnimatedHorizontalBars(bars: BarJoin) {
        // Enter + Update
        bars.enter()
            .append('rect')
            .classed('bar', true)
            .attr(
                'x',
                ({ value }) =>
                    getBaselineExtent(asValueScale(xScale), value).start
            )
            .attr('y', chartHeight)
            .attr('height', asCategoryScale(yScale).bandwidth())
            .attr(
                'width',
                ({ value }) =>
                    getBaselineExtent(asValueScale(xScale), value).size
            )
            .on('mouseover', function (event, d) {
                handleMouseOver(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('mousemove', function (event, d) {
                handleMouseMove(this, d, chartWidth, chartHeight, event);
            })
            .on('mouseout', function (event, d) {
                handleMouseOut(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('click', function (event, d) {
                handleClick(this, d, chartWidth, chartHeight, event);
            });

        bars.attr(
            'x',
            ({ value }) => getBaselineExtent(asValueScale(xScale), value).start
        )
            .attr('y', ({ name }) => asCategoryScale(yScale)(name))
            .attr('height', asCategoryScale(yScale).bandwidth())
            .attr('fill', ({ name }) => computeColor(name))
            .transition()
            .duration(animationDuration)
            .delay(interBarDelay)
            .ease(ease)
            .attr(
                'width',
                ({ value }) =>
                    getBaselineExtent(asValueScale(xScale), value).size
            );
    }

    /**
     * Draws and animates the bars along the y axis
     * @param  {D3Selection} bars Selection of bars
     * @return {void}
     */
    function drawAnimatedVerticalBars(bars: BarJoin) {
        // Enter + Update
        bars.enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', chartWidth)
            .attr(
                'y',
                ({ value }) =>
                    getBaselineExtent(asValueScale(yScale), value).start
            )
            .attr('width', asCategoryScale(xScale).bandwidth())
            .attr(
                'height',
                ({ value }) =>
                    getBaselineExtent(asValueScale(yScale), value).size
            )
            .on('mouseover', function (event, d) {
                handleMouseOver(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('mousemove', function (event, d) {
                handleMouseMove(this, d, chartWidth, chartHeight, event);
            })
            .on('mouseout', function (event, d) {
                handleMouseOut(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('click', function (event, d) {
                handleClick(this, d, chartWidth, chartHeight, event);
            })
            .merge(bars)
            .attr('x', ({ name }) => asCategoryScale(xScale)(name))
            .attr('width', asCategoryScale(xScale).bandwidth())
            .attr('fill', ({ name }) => computeColor(name))
            .transition()
            .duration(animationDuration)
            .delay(interBarDelay)
            .ease(ease)
            .attr(
                'y',
                ({ value }) =>
                    getBaselineExtent(asValueScale(yScale), value).start
            )
            .attr(
                'height',
                ({ value }) =>
                    getBaselineExtent(asValueScale(yScale), value).size
            );
    }

    /**
     * Draws the bars along the y axis
     * @param  {D3Selection} bars Selection of bars
     * @return {void}
     */
    function drawVerticalBars(bars: BarJoin) {
        // Enter + Update
        bars.enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', chartWidth)
            .attr(
                'y',
                ({ value }) =>
                    getBaselineExtent(asValueScale(yScale), value).start
            )
            .attr('width', asCategoryScale(xScale).bandwidth())
            .attr(
                'height',
                ({ value }) =>
                    getBaselineExtent(asValueScale(yScale), value).size
            )
            .on('mouseover', function (event, d) {
                handleMouseOver(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('mousemove', function (event, d) {
                handleMouseMove(this, d, chartWidth, chartHeight, event);
            })
            .on('mouseout', function (event, d) {
                handleMouseOut(
                    this,
                    d,
                    siblingNodes(this),
                    chartWidth,
                    chartHeight,
                    event
                );
            })
            .on('click', function (event, d) {
                handleClick(this, d, chartWidth, chartHeight, event);
            })
            .merge(bars)
            .attr('x', ({ name }) => asCategoryScale(xScale)(name))
            .attr(
                'y',
                ({ value }) =>
                    getBaselineExtent(asValueScale(yScale), value).start
            )
            .attr('width', asCategoryScale(xScale).bandwidth())
            .attr(
                'height',
                ({ value }) =>
                    getBaselineExtent(asValueScale(yScale), value).size
            )
            .attr('fill', ({ name }) => computeColor(name));
    }

    /**
     * Draws labels at the end of each bar
     * @private
     * @return {void}
     */
    function drawLabels(locale: FormatLocaleObject) {
        const labelXPosition = isHorizontal
            ? _labelsHorizontalX
            : _labelsVerticalX;
        const labelYPosition = isHorizontal
            ? _labelsHorizontalY
            : _labelsVerticalY;
        const textFormatter = ({ value }: BarDatum) =>
            locale.format(labelsNumberFormat)(value);

        if (labelEl) {
            svg.selectAll('.percentage-label-group').remove();
        }

        labelEl = svg
            .select('.metadata-group')
            .append('g')
            .classed('percentage-label-group', true)
            .selectAll('text')
            .data(data.reverse())
            .enter()
            .append('text');

        labelEl
            .classed('percentage-label', true)
            .attr('x', labelXPosition)
            .attr('y', labelYPosition)
            .text(textFormatter)
            .attr('font-size', labelsSize + 'px');
    }

    /**
     * Draws the bar elements within the chart group
     * @private
     */
    function drawBars() {
        let bars: BarJoin;

        if (isAnimated) {
            bars = svg
                .select('.chart-group')
                .selectAll<SVGRectElement, BarDatum>('.bar')
                .data(dataZeroed);

            if (isHorizontal) {
                drawHorizontalBars(bars);
            } else {
                drawVerticalBars(bars);
            }

            bars = svg
                .select('.chart-group')
                .selectAll<SVGRectElement, BarDatum>('.bar')
                .data(data);

            if (isHorizontal) {
                drawAnimatedHorizontalBars(bars);
            } else {
                drawAnimatedVerticalBars(bars);
            }

            // Exit
            bars.exit().transition().style('opacity', 0).remove();
        } else {
            bars = svg
                .select('.chart-group')
                .selectAll<SVGRectElement, BarDatum>('.bar')
                .data(data);

            if (isHorizontal) {
                drawHorizontalBars(bars);
            } else {
                drawVerticalBars(bars);
            }

            // Exit
            bars.exit().remove();
        }
    }

    /**
     * Draws grid lines on the background of the chart
     * @return void
     */
    function drawGridLines() {
        svg.select('.grid-lines-group').selectAll('grid').remove();

        if (isHorizontal) {
            drawVerticalGridLines();
        } else {
            drawHorizontalGridLines();
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
     * Draws the loading state
     * @private
     */
    function drawLoadingState() {
        svg.select('.loading-state-group').html(barLoadingMarkup);
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
     * Custom OnMouseOver event handler
     * @return {void}
     * @private
     */
    function handleMouseOver(
        e: Element,
        d: unknown,
        barList: Element[],
        chartWidth: number,
        chartHeight: number,
        event: Event
    ) {
        dispatcher.call('customMouseOver', e, d, pointer(event, e), [
            chartWidth,
            chartHeight,
        ]);
        // A null disables the effect, and this is where that is turned into a
        // no-op -- which also means the accessor stops reading back the null
        // that was set, as its declaration says.
        highlightBarFunction = highlightBarFunction || function () {};

        // Held locally because the module-level binding is mutable, so the
        // non-null the line above establishes does not survive into the
        // callback below.
        const highlightBar = highlightBarFunction;

        // `BarSelection` names `HTMLElement` as the parent, where `select(node)`
        // gives one with a null parent. The casts are that difference and
        // nothing else: what a consumer's own callback receives is the bar's
        // selection either way.
        if (hasSingleBarHighlight) {
            highlightBar(select(e) as unknown as BarSelection);

            return;
        }

        barList.forEach((barRect) => {
            if (barRect === e) {
                return;
            }
            highlightBar(select(barRect) as unknown as BarSelection);
        });
    }

    /**
     * Custom OnMouseMove event handler
     * @return {void}
     * @private
     */
    function handleMouseMove(
        e: Element,
        d: unknown,
        chartWidth: number,
        chartHeight: number,
        event: Event
    ) {
        dispatcher.call('customMouseMove', e, d, pointer(event, e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Custom OnMouseOver event handler
     * @return {void}
     * @private
     */
    function handleMouseOut(
        e: Element,
        d: unknown,
        barList: Element[],
        chartWidth: number,
        chartHeight: number,
        event: Event
    ) {
        dispatcher.call('customMouseOut', e, d, pointer(event, e), [
            chartWidth,
            chartHeight,
        ]);

        barList.forEach((barRect) => {
            select<Element, BarDatum>(barRect).attr('fill', ({ name }) =>
                computeColor(name)
            );
        });
    }

    /**
     * Custom onClick event handler
     * @return {void}
     * @private
     */
    function handleClick(
        e: Element,
        d: unknown,
        chartWidth: number,
        chartHeight: number,
        event: Event
    ) {
        dispatcher.call('customClick', e, d, pointer(event, e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Gets the percentageAxis, sets it to `percentageAxisToMaxRatio` if all data points are 0
     * @return {number} Calculated percentageAxis
     * @private
     */
    function getValueAxisDomain() {
        return getValueDomain(data.map(getValue), {
            ratio: percentageAxisToMaxRatio,
            emptyDomainMax: percentageAxisToMaxRatio,
        });
    }

    // API
    /**
     * Gets or Sets the duration of the animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).animationDuration = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return animationDuration;
        }
        animationDuration = _x;

        return this;
    } as BarChartModule['animationDuration'];

    /**
     * Gets or Sets the padding of the chart (Default is 0.1)
     * @param  { Number | module } _x   Padding value to get/set
     * @return {padding | module}       Current padding or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).betweenBarsPadding = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return betweenBarsPadding;
        }
        betweenBarsPadding = _x;

        return this;
    } as BarChartModule['betweenBarsPadding'];

    /**
     * Gets or Sets the gradient colors of a bar in the chart
     * @param  {String[]} _x            Desired color gradient for the line (array of two hexadecimal numbers)
     * @return {String[] | module}      Current color gradient or Line Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).chartGradient = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return chartGradientColors;
        }
        chartGradientColors = _x;

        return this;
    } as BarChartModule['chartGradient'];

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {object | module}     Current colorMap or Chart module to chain calls
     * @example barChart.colorMap({name: 'colorHex', name2: 'colorString'})
     * @public
     */
    (exports as BarChartModule).colorMap = function (this: BarChartModule, _x) {
        if (!arguments.length) {
            return nameToColorMap;
        }
        nameToColorMap = _x;

        return this;
    } as BarChartModule['colorMap'];

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {String[]} _x Desired colorSchema for the graph
     * @return { colorSchema | module} Current colorSchema or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).colorSchema = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as BarChartModule['colorSchema'];

    /**
     * If true, adds labels at the end of the bars
     * @param  {Boolean} [_x=false]
     * @return {Boolean | module}    Current value of enableLabels or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).enableLabels = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return enableLabels;
        }
        enableLabels = _x;

        return this;
    } as BarChartModule['enableLabels'];

    /**
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as BarChartModule).exportChart = function (filename, title) {
        return exportChart.call(
            exports as BarChartModule,
            svg,
            filename,
            title
        );
    } as BarChartModule['exportChart'];

    /**
     * Gets or Sets the hasPercentage status
     * @param  {boolean} _x         Should use percentage as value format
     * @return {boolean | module}   Is percentage used or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).hasPercentage = function (
        this: BarChartModule,
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
    } as BarChartModule['hasPercentage'];

    /**
     * Gets or Sets the hasSingleBarHighlight status.
     * If the value is true (default), only the hovered bar is considered to
     * be highlighted and will be darkened by default. If the value is false,
     * all the bars but the hovered bar are considered to be highlighted
     * and will be darkened (by default). To customize the bar highlight or
     * remove it completely, use highlightBarFunction instead.
     * @param  {boolean} _x        Should highlight the hovered bar
     * @return {boolean | module} Is hasSingleBarHighlight used or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).hasSingleBarHighlight = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return hasSingleBarHighlight;
        }
        hasSingleBarHighlight = _x;

        return this;
    } as BarChartModule['hasSingleBarHighlight'];

    /**
     * Gets or Sets the height of the chart
     * @param  {number} _x Desired width for the graph
     * @return {height | module} Current height or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).height = function (this: BarChartModule, _x) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as BarChartModule['height'];

    /**
     * Gets or Sets the highlightBarFunction function. The callback passed to
     * this function returns a bar selection from the bar chart. Use this function
     * if you want to apply a custom behavior to the highlighted bar on hover.
     * When hasSingleBarHighlight is true the highlighted bar will be the
     * one that was hovered by the user. When hasSingleBarHighlight is false
     * the highlighted bars are all the bars but the hovered one. The default
     * highlight effect on a bar is darkening the highlighted bar(s) color.
     * @param  {Function} _x        Desired operation operation on a hovered bar passed through callback
     * @return {highlightBarFunction | module} Is highlightBarFunction used or Chart module to chain calls
     * @public
     * @example barChart.highlightBarFunction(bar => bar.attr('fill', 'blue'))
     * barChart.highlightBarFunction(null) // will disable the default highlight effect
     */
    (exports as BarChartModule).highlightBarFunction = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return highlightBarFunction;
        }
        highlightBarFunction = _x;

        return this;
    } as BarChartModule['highlightBarFunction'];

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * By default this is 'false'
     *
     * @param  {Boolean} _x             Desired animation flag
     * @return {isAnimated | module}    Current isAnimated flag or Chart module
     * @public
     */
    (exports as BarChartModule).isAnimated = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    } as BarChartModule['isAnimated'];

    /**
     * Gets or Sets the horizontal direction of the chart
     * @param  {number} _x              Desired horizontal direction for the graph
     * @return { isHorizontal | module} If it is horizontal or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).isHorizontal = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isHorizontal;
        }
        isHorizontal = _x;

        return this;
    } as BarChartModule['isHorizontal'];

    /**
     * Offset between end of bar and start of the percentage bars
     * @param  {number} [_x=7]      Margin offset from end of bar
     * @return {number | module}    Current offset or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).labelsMargin = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return labelsMargin;
        }
        labelsMargin = _x;

        return this;
    } as BarChartModule['labelsMargin'];

    /**
     * Gets or Sets the labels number format
     * @param  {string} [_x=",f"] desired label number format for the bar chart
     * @return {string | module} Current labelsNumberFormat or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).labelsNumberFormat = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return labelsNumberFormat;
        }
        labelsNumberFormat = _x;

        return this;
    } as BarChartModule['labelsNumberFormat'];

    /**
     * Get or Sets the labels text size
     * @param  {number} [_x=12] label font size
     * @return {number | module}    Current text size or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).labelsSize = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return labelsSize;
        }
        labelsSize = _x;

        return this;
    } as BarChartModule['labelsSize'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).isLoading = function (
        this: BarChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as BarChartModule['isLoading'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {object} _x Margin object to get/set
     * @return {margin | module} Current margin or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).margin = function (this: BarChartModule, _x) {
        if (!arguments.length) {
            return margin;
        }
        margin = {
            ...margin,
            ..._x,
        };

        return this;
    } as BarChartModule['margin'];

    /**
     * Gets or Sets the nameLabel of the chart
     * @param  {number} _x Desired nameLabel for the graph
     * @return {number | module} Current nameLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as BarChartModule).nameLabel = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return nameLabel;
        }
        nameLabel = _x;
        dataKeyDeprecationMessage('name');

        return this;
    } as BarChartModule['nameLabel'];

    /**
     * Gets or Sets the number format of the bar chart
     * @param  {string} _x = ',f'     Desired numberFormat for the chart. See examples [here]{@link https://d3js.org/d3-format}
     * @return {string | module}      Current numberFormat or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).numberFormat = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as BarChartModule['numberFormat'];

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove, customMouseOut, and customClick
     *
     * @return {module} Bar Chart
     * @public
     */
    (exports as BarChartModule).on = function (
        ...args: [string] | [string, () => void]
    ) {
        // Rest parameters and a spread where this read `arguments` and used
        // `.apply`, following the other converted charts: the TypeScript lint
        // override makes `prefer-spread` an error, and the two shapes `on` is
        // called with -- a lookup and a registration -- are what the tuple
        // says.
        const value = dispatcher.on(
            ...(args as Parameters<typeof dispatcher.on>)
        );

        return value === dispatcher ? exports : value;
    } as unknown as BarChartModule['on'];

    /**
     * Configurable extension of the x axis. If your max point was 50% you might want to show x axis to 60%, pass 1.2
     * @param  {number} _x ratio to max data point to add to the x axis
     * @return {ratio | module} Current ratio or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).percentageAxisToMaxRatio = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return percentageAxisToMaxRatio;
        }
        percentageAxisToMaxRatio = _x;

        return this;
    } as BarChartModule['percentageAxisToMaxRatio'];

    /**
     * Gets or Sets whether the color list should be reversed or not
     * @param  {boolean} _x     Should reverse the color list
     * @return {boolean | module} Is color list being reversed or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).shouldReverseColorList = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return shouldReverseColorList;
        }
        shouldReverseColorList = _x;

        return this;
    } as BarChartModule['shouldReverseColorList'];

    /**
     * Changes the order of items given the custom function
     * @param  {Function} _x             A custom function that sets logic for ordering
     * @return {(Function | Module)}   A custom ordering function or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).orderingFunction = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return orderingFunction;
        }
        orderingFunction = _x;

        return this;
    } as BarChartModule['orderingFunction'];

    /**
     * Gets or Sets the valueLabel of the chart
     * @param  {Number} _x Desired valueLabel for the graph
     * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as BarChartModule).valueLabel = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return valueLabel;
        }
        valueLabel = _x;
        dataKeyDeprecationMessage('value');

        return this;
    } as BarChartModule['valueLabel'];

    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     * @example
     *  barChart
     *  .valueLocale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
     * @param  {LocaleObject}  [_x=null]  _x    Desired locale object format.
     * @return {LocaleObject | module}          Current locale object or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).valueLocale = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    } as BarChartModule['valueLocale'];

    /**
     * Gets or Sets the width of the chart
     * @param  {number} _x Desired width for the graph
     * @return {width | module} Current width or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).width = function (this: BarChartModule, _x) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as BarChartModule['width'];

    /**
     * Gets or Sets the text of the xAxisLabel on the chart
     * @param  {String} _x          Desired text for the label
     * @return {String | module}    Label or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).xAxisLabel = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisLabel;
        }
        xAxisLabel = _x;

        return this;
    } as BarChartModule['xAxisLabel'];

    /**
     * Gets or Sets the offset of the xAxisLabel on the chart
     * @param  {Number} _x Desired offset for the label
     * @return {Number | module} label or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).xAxisLabelOffset = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisLabelOffset;
        }
        xAxisLabelOffset = _x;

        return this;
    } as BarChartModule['xAxisLabelOffset'];

    /**
     * Gets or Sets the number of ticks of the x axis on the chart
     * @param  {Number} _x = 5          Desired horizontal ticks
     * @return {Number | module}        Current xTicks or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).xTicks = function (this: BarChartModule, _x) {
        if (!arguments.length) {
            return xTicks;
        }
        xTicks = _x;

        return this;
    } as BarChartModule['xTicks'];

    /**
     * Gets or Sets the text of the yAxisLabel on the chart
     * @param  {String} _x          Desired text for the label
     * @return {String | module}    Label or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).yAxisLabel = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabel;
        }
        yAxisLabel = _x;

        return this;
    } as BarChartModule['yAxisLabel'];

    /**
     * Gets or Sets the offset of the yAxisLabel on the chart
     * @param  {Number} _x          Desired offset for the label
     * @return {Number | module}    Label or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).yAxisLabelOffset = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisLabelOffset;
        }
        yAxisLabelOffset = _x;

        return this;
    } as BarChartModule['yAxisLabelOffset'];

    /**
     * Space between y axis and chart
     * @param  {Number} _x = 10     Space between y axis and chart
     * @return {Number| module}     Current value of yAxisPaddingBetweenChart or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).yAxisPaddingBetweenChart = function (
        this: BarChartModule,
        _x
    ) {
        if (!arguments.length) {
            return yAxisPaddingBetweenChart;
        }
        yAxisPaddingBetweenChart = _x;

        return this;
    } as BarChartModule['yAxisPaddingBetweenChart'];

    /**
     * Gets or Sets the number of vertical ticks on the chart
     * @param  {Number} _x = 6         Desired number of vertical ticks for the graph
     * @return {Number | module}       Current yTicks or Chart module to chain calls
     * @public
     */
    (exports as BarChartModule).yTicks = function (this: BarChartModule, _x) {
        if (!arguments.length) {
            return yTicks;
        }
        yTicks = _x;

        return this;
    } as BarChartModule['yTicks'];

    return exports as unknown as BarChartModule;
}
