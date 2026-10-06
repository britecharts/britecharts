import { extent } from 'd3-array';
import { easeQuadInOut } from 'd3-ease';
import { scaleLinear } from 'd3-scale';
import { area, line, curveBasis } from 'd3-shape';
import { select } from 'd3-selection';
import type { BaseType, Selection } from 'd3-selection';
import type { ScaleLinear } from 'd3-scale';
import type { Area, Line } from 'd3-shape';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import { dataKeyDeprecationMessage } from '../helpers/project';
import colorHelper from '../helpers/color';
import { sparkLineLoadingMarkup } from '../helpers/load';
import { uniqueId } from '../helpers/number';
import { motion } from '../helpers/constants';
import type { ChartMarginParams } from '../../typings/common/margin';
import type { ColorGradientType } from '../../typings/helpers/colors';
import type {
    SparkelineTitleTextStyle,
    SparklineChartDataShape,
    SparklineChartModule,
} from '../../typings/charts/sparkline-chart';

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
 * What `cleanData` hands the drawing functions. The published
 * `SparklineChartDataShape` describes the chart's *input*, where `date` is a
 * string; `cleanData` replaces it with a Date in place, and every drawing
 * function downstream reads that Date. The index signature is the deprecated
 * `dateLabel`/`valueLabel` accessors: they let the data carry those two values
 * under any key, so the two reads in `cleanData` really are dynamic.
 */
type SparklineDatum = {
    date: Date;
    value: number;
    [key: string]: string | number | Date;
};

// `satisfies` rather than an annotation, so each member stays a required
// string: the fallbacks below read them directly, and an optional member would
// hand `undefined` to `style()`.
const DEFAULT_TITLE_TEXT_STYLE = {
    'font-size': '22px',
    'font-family': 'sans-serif',
    'font-style': 'normal',
    'font-weight': 0,
} satisfies SparkelineTitleTextStyle;

/**
 * Sparkline Chart reusable API module that allows us
 * rendering a sparkline configurable chart.
 *
 * @module Sparkline
 * @tutorial sparkline
 * @requires d3-array, d3-ease, d3-scale, d3-shape, d3-selection, d3-transition
 *
 * @example
 * const sparkLineChart = sparkline();
 *
 * sparkLineChart
 *     .width(200)
 *     .height(100);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(sparkLineChart);
 *
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
    // Split into `let` and `const` rather than the one `let` chain the
    // JavaScript had: the TypeScript ESLint override runs `prefer-const` as an
    // error, and the bindings below it are never reassigned.
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
        areaGradient: ColorGradientType = ['#F5FDFF', '#F6FEFC'],
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
        circle: ChartSelection<SVGCircleElement>,
        titleEl: ChartSelection<SVGTextElement>,
        // No default: a title arrives through the accessor, and reading it
        // before it is set gives undefined -- which is what the declaration
        // now says.
        titleText: string | undefined,
        titleTextStyle: SparkelineTitleTextStyle = DEFAULT_TITLE_TEXT_STYLE,
        valueLabel = 'value',
        dateLabel = 'date';

    // `hasArea = true` sat in the `let` chain and is gone: nothing in this
    // chart, or anywhere else in the three packages, ever read it. A conversion
    // has to give every binding a type, and there is none for a value no code
    // consults.
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

            if (titleText) {
                drawSparklineTitle();
            }
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

        container.append('g').classed('text-group', true);
        container.append('g').classed('chart-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Creates the x, y and color scales of the chart
     * @private
     */
    function buildScales(): void {
        // `extent` is typed `[T, T] | [undefined, undefined]` for the
        // empty-input case, which this chart has never guarded against -- it
        // reads `data[data.length - 1]` unconditionally too. Asserted rather
        // than guarded, so the conversion changes no behaviour.
        xScale = scaleLinear()
            .domain(extent(data, getDate) as [Date, Date])
            .range([0, chartWidth]);

        yScale = scaleLinear()
            .domain(extent(data, getValue) as [number, number])
            .range([chartHeight, 0]);
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
            // The same object, mutated in place, which is what this chart has
            // always done -- `date` goes from the input's string to a Date and
            // every other key the datum carries survives. The cast says that
            // rather than rebuilding the object, which would drop those keys.
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
            .attr('stop-color', ({ color }) => color);

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
            .attr('stop-color', ({ color }) => color);
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

        if (isAnimated) {
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
     * Draws the text element within the text group
     * Is displayed at the top of sparked area
     * @private
     */
    function drawSparklineTitle(): void {
        if (titleEl) {
            svg.selectAll('.sparkline-text').remove();
        }

        titleEl = svg
            .selectAll('.text-group')
            .append('text')
            .attr('x', chartWidth / 2)
            .attr('y', chartHeight / 6)
            .attr('text-anchor', 'middle')
            .attr('class', 'sparkline-text')
            .style(
                'font-size',
                titleTextStyle['font-size'] ||
                    DEFAULT_TITLE_TEXT_STYLE['font-size']
            )
            .style('fill', titleTextStyle['fill'] || lineGradient[0])
            .style(
                'font-family',
                titleTextStyle['font-family'] ||
                    DEFAULT_TITLE_TEXT_STYLE['font-family']
            )
            .style(
                'font-weight',
                titleTextStyle['font-weight'] ||
                    DEFAULT_TITLE_TEXT_STYLE['font-weight']
            )
            .style(
                'font-style',
                titleTextStyle['font-style'] ||
                    DEFAULT_TITLE_TEXT_STYLE['font-style']
            )
            // `exports` only calls this when `titleText` is set, which is a
            // guard TypeScript cannot see from here.
            .text(titleText as string);
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
     * Gets or Sets the dateLabel of the chart
     * @param  {number} _x          Desired dateLabel for the graph
     * @return {dateLabel | module} Current dateLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as SparklineChartModule).dateLabel = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return dateLabel;
        }
        dateLabel = _x;
        dataKeyDeprecationMessage('date');

        return this;
    } as SparklineChartModule['dateLabel'];

    /**
     * Chart exported to png and a download action is fired
     * @param {string} filename     File title for the resulting picture
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
     * Gets or Sets the text of the title at the top of sparkline.
     * To style the title, use the titleTextStyle method below.
     * @param  {string} _x = null   String to set
     * @return {string | module}    Current titleText or Chart module to chain calls
     * @public
     */
    (exports as SparklineChartModule).titleText = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return titleText;
        }
        titleText = _x;

        return this;
    } as SparklineChartModule['titleText'];

    /**
     * Gets or Sets the text style object of the title at the top of sparkline.
     * Using this method, you can set font-family, font-size, font-weight, font-style,
     * and color (fill). The default text font settings:
     * @example
     * <pre>
     * <code>
     * {
     *    'font-family': 'sans-serif',
     *    'font-size': '22px',
     *    'font-weight': 0,
     *    'font-style': 'normal',
     *    'fill': linearGradient[0]
     * }
     * </code>
     * </pre>
     *
     * You can set attributes individually. Setting just 'font-family'
     * within the object will set custom 'font-family` while the rest
     * of the attributes will have the default values provided above.
     * @param  {object} _x          Object with text font configurations
     * @return {Object | module}    Current titleTextStyle or Chart module to chain calls
     * @public
     * @example
     * sparkline.titleTextStyle({
     *    'font-family': 'Roboto',
     *    'font-size': '1.5em',
     *    'font-weight': 600,
     *    'font-style': 'italic',
     *    'fill': 'lightblue'
     * })
     */
    (exports as SparklineChartModule).titleTextStyle = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return titleTextStyle;
        }
        titleTextStyle = _x;

        return this;
    } as SparklineChartModule['titleTextStyle'];

    /**
     * Gets or Sets the valueLabel of the chart
     * @param  {number} _x              Desired valueLabel for the graph
     * @return {valueLabel | module}    Current valueLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    (exports as SparklineChartModule).valueLabel = function (
        this: SparklineChartModule,
        _x
    ) {
        if (!arguments.length) {
            return valueLabel;
        }
        valueLabel = _x;
        dataKeyDeprecationMessage('value');

        return this;
    } as SparklineChartModule['valueLabel'];

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

    return exports as unknown as SparklineChartModule;
}
