import { extent } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { brushX } from 'd3-brush';
import { scaleLinear, scaleTime } from 'd3-scale';
import { area } from 'd3-shape';
import { dispatch } from 'd3-dispatch';
import { select } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import type { Axis } from 'd3-axis';
import type { BrushBehavior, D3BrushEvent } from 'd3-brush';
import type { Dispatch } from 'd3-dispatch';
import type { NumberValue, ScaleLinear, ScaleTime } from 'd3-scale';
import type { BaseType, Selection } from 'd3-selection';
import type { Area } from 'd3-shape';
import 'd3-transition';

import colorHelper from '../helpers/color';
import timeAxisHelper from '../helpers/axis';
import {
    axisTimeCombinations,
    timeIntervals,
    motion,
    curveMap,
} from '../helpers/constants';
import { getValueDomain } from '../helpers/domain';
import { uniqueId } from '../helpers/number';
import { brushLoadingMarkup } from '../helpers/load';
import type { ChartMarginParams } from '../../typings/common/margin';
import type { ColorGradientType } from '../../typings/helpers/colors';
import type { AxisTimeCombinationValue } from '../helpers/constants';
import type { AxisTickSettings } from '../helpers/axis';
import type {
    BrushChartDataShape,
    BrushChartModule,
} from '../../typings/charts/brush-chart';

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
 * What `cleanData` hands the drawing functions.
 *
 * It differs from the published `BrushChartDataShape` in one place: `date` is a
 * Date here where the input is a string, because `cleanData` replaces it.
 * `value` is nullable in both -- a gap in the series is a case this chart
 * draws, and the published shape says so now.
 */
type BrushDatum = {
    date: Date;
    value: number | null;
};

/**
 * Brush Chart reusable API class that renders a
 * simple and configurable brush chart.
 *
 * @module Brush
 * @tutorial brush
 * @requires d3-array
 * @requires d3-axis
 * @requires d3-brush
 * @requires d3-ease
 * @requires d3-scale
 * @requires d3-shape
 * @requires d3-dispatch
 * @requires d3-selection
 * @requires d3-time
 * @requires d3-transition
 * @requires d3-time-format
 *
 * @example
 * let brushChart = brush();
 *
 * brushChart
 *     .height(500)
 *     .width(800);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(brushChart);
 */

/**
 * @typedef BrushChartData
 * @type {Object[]}
 * @property {Number} value        Value to chart (required)
 * @property {Date} date           Date of the value in ISO8601 format (required)
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

export default function module(): BrushChartModule {
    // Split into `let` and `const` rather than the one `let` chain the
    // JavaScript had: the TypeScript ESLint override runs `prefer-const` as an
    // error, and the bindings below it are never reassigned.
    let margin: ChartMarginParams = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 20,
        },
        width = 960,
        height = 500,
        isLoading = false,
        data: BrushDatum[],
        dataZeroed: BrushDatum[],
        svg: ChartSelection<SVGSVGElement>,
        isAnimated = false,
        animationDuration = motion.duration,
        // `[null, null]` until both ends are set, which is what the
        // declaration now says.
        dateRange: [string | null, string | null] = [null, null],
        isLocked = false,
        chartWidth: number,
        chartHeight: number,
        xScale: ScaleTime<number, number>,
        yScale: ScaleLinear<number, number>,
        xAxis: Axis<Date | NumberValue>,
        xSubAxis: Axis<Date | NumberValue>,
        // `AxisTimeCombinationValue | null` is what `getTimeSeriesAxis` takes,
        // so the type comes from the helper rather than being restated. The
        // chart also compares it against `'custom'`, which the union includes.
        xAxisFormat: AxisTimeCombinationValue | null = null,
        xTicks: number | null = null,
        xAxisCustomFormat: string | null = null,
        locale: string | null = null,
        brush: BrushBehavior<BrushDatum>,
        chartBrush: ChartSelection<SVGGElement>,
        // `| undefined` where the selections beside it do without: the guard
        // in `drawArea` reads it before the first assignment, and TypeScript
        // reports a truthiness test on a function type that cannot be
        // undefined (TS2774) while saying nothing about an object one.
        brushArea: Area<BrushDatum> | undefined,
        areaCurve = 'monotoneX',
        handle: ChartSelection<BaseType>,
        chartGradientEl: ChartSelection<SVGStopElement>,
        gradient: ColorGradientType = colorHelper.colorGradients.greenBlue,
        roundingTimeInterval = 'timeDay';

    // Brush exposes no accessor for either, unlike the charts that let the
    // data name its own keys, so both are constants here.
    const dateLabel = 'date';
    const valueLabel = 'value';
    const monthAxisPadding = 30;
    const tickPadding = 5;
    const gradientId = uniqueId('brush-area-gradient');
    // Dispatcher object to broadcast the mouse events
    // @see {@link https://github.com/d3/d3/blob/master/API.md#dispatches-d3-dispatch}
    const dispatcher: Dispatch<object> = dispatch(
        'customBrushStart',
        'customBrushEnd'
    );
    // extractors
    const getValue = ({ value }: BrushDatum) => value;
    const getDate = ({ date }: BrushDatum) => date;

    const acceptNullValue = (value: number | null) =>
        value === null ? null : +value;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {BrushChartData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            BrushChartDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (_data) {
            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);
            data = cleanData(cloneData(_data));

            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            buildScales();
            buildAxis();
            cleanLoadingState();
            buildGradient();
            buildBrush();
            drawArea();
            drawAxis();
            drawBrush();
            drawHandles();
        });
    }

    /**
     * Creates the d3 x axis, setting orientation
     * @private
     */
    function buildAxis(): void {
        // `AxisTickSettings` comes from the helper rather than being restated,
        // the way `axis.ts` took `AxisTimeCombinationValue` from `constants`.
        let minor: AxisTickSettings;

        if (xAxisFormat === 'custom' && typeof xAxisCustomFormat === 'string') {
            minor = {
                tick: xTicks,
                format: timeFormat(xAxisCustomFormat),
            };
        } else {
            // Assigned through a local rather than destructured onto the outer
            // bindings: `major` is only read in this branch, and a destructuring
            // assignment does not narrow it out of `null` for the reader or the
            // compiler.
            const axes = timeAxisHelper.getTimeSeriesAxis(
                data,
                width,
                xAxisFormat,
                locale
            );

            minor = axes.minor;

            // `tickSize(0, 0)` and `tickSize(10, 0)` below each passed a second
            // argument that d3-axis does not take -- its signature is
            // `tickSize(size)`. The extra was discarded, so dropping it is
            // bit-identical.
            xSubAxis = axisBottom(xScale)
                .ticks(axes.major.tick)
                .tickSize(0)
                .tickFormat(
                    axes.major.format as (d: Date | NumberValue) => string
                );
        }

        xAxis = axisBottom(xScale)
            .ticks(minor.tick)
            .tickSize(10)
            // `tickPadding([tickPadding])` wrapped the number in an array, and
            // d3 does `+padding` on it -- `+[5]` is 5, so it worked by
            // coercion. Passing the number is the same value.
            .tickPadding(tickPadding)
            .tickFormat(minor.format as (d: Date | NumberValue) => string);

        drawHorizontalExtendedLine();
    }

    /**
     * Creates the brush element and attaches a listener
     * @return {void}
     */
    function buildBrush(): void {
        brush = brushX<BrushDatum>()
            .extent([
                [0, 0],
                [chartWidth, chartHeight],
            ])
            .on('brush', handleBrushStart)
            .on('end', handleBrushEnd);
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
        container
            .append('g')
            .classed('x-axis-group', true)
            .append('g')
            .classed('x axis', true);
        container
            .selectAll('.x-axis-group')
            .append('g')
            .classed('axis sub-x', true);
        container.append('g').classed('brush-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Creates the gradient on the area
     * @return {void}
     */
    function buildGradient(): void {
        if (!chartGradientEl) {
            chartGradientEl = svg
                .select('.metadata-group')
                .append('linearGradient')
                .attr('id', gradientId)
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0)
                .attr('x2', xScale(data[data.length - 1].date))
                .attr('y1', 0)
                .attr('y2', 0)
                .selectAll('stop')
                .data([
                    { offset: '0%', color: gradient[0] },
                    { offset: '100%', color: gradient[1] },
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
    function buildScales(): void {
        // `extent` is typed for the empty-input case, which this chart has
        // never guarded against -- it reads `data[data.length - 1]`
        // unconditionally too. Asserted rather than guarded, so the conversion
        // changes no behaviour.
        xScale = scaleTime()
            .domain(extent(data, getDate) as [Date, Date])
            .range([0, chartWidth]);

        // `getValueDomain` takes `Iterable<number>` and this chart really does
        // hand it nulls, from the missing-data case `acceptNullValue`
        // preserves. Filtering them would change the domain the chart draws,
        // so the cast keeps the arithmetic bit-identical: a null compares as 0
        // inside min/max, exactly as before.
        yScale = scaleLinear()
            .domain(getValueDomain(data.map(getValue) as number[]))
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
                .classed('britechart brush-chart', true);

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
     * @param  {BrushChartData} originalData        Raw data from the container
     * @return {BrushChartData}                     Clean data
     * @private
     */
    function cleanData(originalData: BrushChartDataShape[]): BrushDatum[] {
        const cleanData = originalData.reduce<BrushDatum[]>((acc, d) => {
            // The same object, mutated in place, which is what this chart has
            // always done. `cloneData` ran first, so these are already copies
            // of the caller's data rather than the caller's own objects.
            // Read through `d`, which is still typed as the input, and write
            // through `datum`, which is the post-clean view of the same
            // object. Reading through the cast would ask TypeScript for a Date
            // where a string is what actually arrives.
            const datum = d as unknown as BrushDatum;

            datum.date = new Date(d[dateLabel]);
            datum.value = acceptNullValue(d[valueLabel]);

            return [...acc, datum];
        }, []);

        dataZeroed = cleanData.map((d) => {
            return { ...d, value: d.value === null ? null : 0 };
        });

        return cleanData;
    }

    /**
     * Cleans the loading state
     * @private
     */
    function cleanLoadingState(): void {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Clones the passed array of data
     * @param  {Object[]} dataToClone Data to clone
     * @return {Object[]}             Cloned data
     */
    function cloneData(
        dataToClone: BrushChartDataShape[]
    ): BrushChartDataShape[] {
        return JSON.parse(JSON.stringify(dataToClone));
    }

    /**
     * Draws the x axis on the svg object within its group
     *
     * @private
     */
    function drawAxis(): void {
        svg.select<SVGGElement>('.x-axis-group .axis.x')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis);

        if (xAxisFormat !== 'custom') {
            svg.select<SVGGElement>('.x-axis-group .axis.sub-x')
                .attr(
                    'transform',
                    `translate(0, ${chartHeight + monthAxisPadding})`
                )
                .call(xSubAxis);
        }
    }

    /**
     * Draws the area that is going to represent the data
     *
     * @return {void}
     */
    function drawArea(): void {
        if (brushArea) {
            svg.selectAll('.brush-area').remove();
            svg.selectAll('.missing-brush-area').remove();
        }

        // Create and configure the area generator
        brushArea = area<BrushDatum>()
            // `parseInt` is declared to take a string and this chart hands it
            // `number | null` -- the missing-data case. Both coercions are the
            // point of the guard: `parseInt(null, 10)` is NaN, so a null point
            // is skipped, and a number is stringified first. The cast keeps
            // both bit-identical.
            .defined(
                ({ value }) => !isNaN(parseInt(value as unknown as string, 10))
            )
            .x(({ date }) => xScale(date))
            .y0(yScale(0))
            .y1(({ value }) => yScale(value as number))
            .curve(curveMap[areaCurve]);

        if (isAnimated) {
            // Add a missing brush area when there is missing data
            if (
                dataZeroed.filter(brushArea.defined()).length !==
                dataZeroed.length
            ) {
                svg.select('.chart-group')
                    .append('path')
                    .datum(dataZeroed.filter(brushArea.defined()))
                    .attr('class', 'missing-brush-area')
                    .attr('d', brushArea);

                svg.select('.chart-group')
                    .selectAll('.missing-brush-area')
                    .datum(data.filter(brushArea.defined()))
                    .transition()
                    .duration(animationDuration)
                    .attr('d', brushArea);
            }

            // Create the area path with zeroed data
            svg.select('.chart-group')
                .append('path')
                .datum(dataZeroed)
                .attr('class', 'brush-area')
                .attr('d', brushArea);

            // Create the area path
            svg.select('.chart-group')
                .selectAll('.brush-area')
                .datum(data)
                .transition()
                .duration(animationDuration)
                .attr('d', brushArea);
        } else {
            // Add a missing brush area when there is missing data
            if (data.filter(brushArea.defined()).length !== data.length) {
                svg.select('.chart-group')
                    .append('path')
                    .datum(data.filter(brushArea.defined()))
                    .attr('class', 'missing-brush-area')
                    .attr('d', brushArea);
            }

            // Create the area path
            svg.select('.chart-group')
                .append('path')
                .datum(data)
                .attr('class', 'brush-area')
                .attr('d', brushArea);
        }
    }

    /**
     * Draws the Brush components on its group
     * @return {void}
     */
    function drawBrush(): void {
        chartBrush = svg.select<SVGGElement>('.brush-group').call(brush);

        if (isAnimated) {
            chartBrush.style('opacity', 0);

            setTimeout(() => {
                chartBrush
                    .transition()
                    .duration(animationDuration)
                    .style('opacity', 1);
            }, 0);
        }

        // Update the height of the brushing rectangle
        chartBrush
            .selectAll('rect')
            .classed('brush-rect', true)
            .attr('height', chartHeight);

        chartBrush.selectAll('.selection').attr('fill', `url(#${gradientId})`);
    }

    /**
     * Draws a handle for the Brush section
     * @return {void}
     */
    function drawHandles(): void {
        const handleFillColor = colorHelper.colorSchemasHuman.grey[1];

        // Styling
        handle = chartBrush
            .selectAll('.handle.brush-rect')
            .style('fill', handleFillColor);
    }

    /**
     * Draws a horizontal line to extend x-axis till the edges
     * @return {void}
     * @private
     */
    function drawHorizontalExtendedLine(): void {
        svg.select('.x-axis-group')
            .selectAll('line.extended-x-line')
            .data([0])
            .enter()
            .append('line')
            .attr('class', 'extended-x-line')
            .attr('x1', 0)
            .attr('x2', chartWidth)
            .attr('y1', chartHeight)
            .attr('y2', chartHeight);
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState(): void {
        svg.select('.loading-state-group').html(brushLoadingMarkup);
    }

    /**
     * When a brush event starts, we can extract info from the extension
     * of the brush.
     *
     * @return {void}
     */
    function handleBrushStart(
        this: Element,
        event: D3BrushEvent<BrushDatum>
    ): void {
        const selection = event.selection as [number, number] | null;
        let newSelection: [number, number];

        if (!selection) {
            return;
        }

        if (isLocked) {
            // Reached only when `isLocked`, which the chart documents as
            // requiring a dateRange -- so both ends are set here. `new
            // Date(null)` would be the epoch rather than a throw, which is the
            // behaviour this preserves either way.
            const lockedSelectionSize = Math.floor(
                xScale(new Date(dateRange[1] as string)) -
                    xScale(new Date(dateRange[0] as string))
            );
            const selectedRange = Math.floor(selection[1] - selection[0]);

            if (
                selectedRange < lockedSelectionSize ||
                selectedRange > lockedSelectionSize
            ) {
                // We round values so we don't get into an infinite loop
                newSelection = [
                    Math.floor(selection[0]),
                    Math.floor(selection[0]) + lockedSelectionSize,
                ];
                brush.move(chartBrush, newSelection);
            } else {
                newSelection = selection;
            }
        } else {
            newSelection = selection;
        }
        dispatcher.call(
            'customBrushStart',
            this,
            newSelection.map(xScale.invert)
        );
    }

    /**
     * Processes the end brush event, snapping the boundaries to days
     * as showed on the example on https://bl.ocks.org/mbostock/6232537
     * @return {void}
     * @private
     */
    function handleBrushEnd(
        this: Element,
        event: D3BrushEvent<BrushDatum>
    ): void {
        if (!event.sourceEvent) {
            return; // Only transition after input.
        }

        // Starts as the empty pair and is replaced wholesale when there is a
        // selection, which is why it is typed as the pair rather than as
        // `Date[]` -- the dispatched payload is always two entries.
        let dateExtentRounded: [Date, Date] | [null, null] = [null, null];
        const selection = event.selection as [number, number] | null;

        if (selection) {
            const dateExtent = selection.map(xScale.invert);

            // `map` gives `Date[]`, and this pair is always two entries
            // because `selection` is. Asserted rather than restructured so the
            // rounding below reads as it did.
            const rounded = dateExtent.map(
                timeIntervals[roundingTimeInterval].round
            ) as [Date, Date];

            // If empty when rounded, use floor & ceil instead.
            if (rounded[0] >= rounded[1]) {
                rounded[0] = timeIntervals[roundingTimeInterval].floor(
                    dateExtent[0]
                );
                rounded[1] = timeIntervals[roundingTimeInterval].offset(
                    rounded[0]
                );
            }

            dateExtentRounded = rounded;

            select(this)
                .transition()
                .call(
                    // `brush.move` is typed for a selection or a transition of
                    // the brush's own element and datum; `select(this)` is the
                    // same node d3 just handed us.
                    event.target.move as never,
                    rounded.map(xScale) as never
                );
        } else {
            // When no selection (clicked on brush without dragging)
            if (isLocked) {
                setBrushByDates(...dateRange);
            }
        }

        dispatcher.call('customBrushEnd', this, dateExtentRounded);
    }

    /**
     * Sets a new brush extent within the passed dates
     * @param {String | Date} dateA Initial Date
     * @param {String | Date} dateB End Date
     */
    function setBrushByDates(
        dateA: string | Date | null,
        dateB: string | Date | null
    ): void {
        let selection: [number, number] | null = null;

        if (dateA !== null) {
            // `dateB` is non-null whenever `dateA` is: both come from
            // `dateRange`, which is set as a pair.
            if (new Date(dateA) < new Date(dateB as string | Date)) {
                selection = [
                    xScale(new Date(dateA)),
                    xScale(new Date(dateB as string | Date)),
                ];
            } else {
                // eslint-disable-next-line no-console
                console.error(
                    'dateRange Error: End date should be posterior to startDate!'
                );
            }
        }

        brush.move(chartBrush, selection);
    }

    // API
    /**
     * Gets or Sets the duration of the area animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    (exports as BrushChartModule).animationDuration = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return animationDuration;
        }
        animationDuration = _x;

        return this;
    } as BrushChartModule['animationDuration'];

    /**
     * Gets or Sets the area curve of the stacked area.
     * @param {String} [_x='basis']     Desired curve for the area. Other options are:
     * monotoneX, natural, linear, monotoneY, step, stepAfter, stepBefore, cardinal, and
     * catmullRom. Visit https://github.com/d3/d3-shape#curves for more information.
     * @return {String | module}            Current area curve setting or Chart module to chain calls
     * @public
     * @example brushChart.areaCurve('step')
     */
    (exports as BrushChartModule).areaCurve = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return areaCurve;
        }
        areaCurve = _x;

        return this;
    } as BrushChartModule['areaCurve'];

    /**
     * Exposes the constants to be used to force the x axis to respect a certain granularity
     * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     * @example
     *     brush.xAxisCustomFormat(brush.axisTimeCombinations.HOUR_DAY)
     */
    // `TimeSeriesChartAPI` models these as members of the `AxisTimeCombination`
    // enum, while `constants.ts` exports them as an `as const` object of string
    // literals -- and a string enum member is not assignable from its own
    // literal. The values are identical; only the nominality differs. Cast
    // here rather than changing the shared declaration, which line,
    // stacked-area and tooltip also depend on: that is its own change.
    (exports as BrushChartModule).axisTimeCombinations =
        axisTimeCombinations as BrushChartModule['axisTimeCombinations'];

    /**
     * Gets or Sets the dateRange for the selected part of the brush
     * @param  {String[]} [_x=[null, null]]     Desired dateRange for the graph
     * @return { dateRange | module}            Current dateRange or Chart module to chain calls
     * @public
     */
    (exports as BrushChartModule).dateRange = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return dateRange;
        }
        dateRange = _x;

        if (Array.isArray(dateRange)) {
            setBrushByDates(...dateRange);
        }

        return this;
    } as BrushChartModule['dateRange'];

    /**
     * Gets or Sets the gradient of the chart
     * @param  {String[]} [_x=colorHelper.colorGradients.greenBlue]    Desired gradient for the graph
     * @return {String | Module}    Current gradient or Chart module to chain calls
     * @public
     */
    (exports as BrushChartModule).gradient = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return gradient;
        }
        gradient = _x;

        return this;
    } as BrushChartModule['gradient'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x          Desired width for the graph
     * @return {Number | Module}    Current height or Chart module to chain calls
     * @public
     */
    (exports as BrushChartModule).height = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as BrushChartModule['height'];

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * @param  {Boolean} _x = false     Desired animation flag
     * @return {Boolean | module}       Current isAnimated flag or Chart module
     * @public
     */
    (exports as BrushChartModule).isAnimated = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    } as BrushChartModule['isAnimated'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls
     * @public
     */
    (exports as BrushChartModule).isLoading = function (
        this: BrushChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as BrushChartModule['isLoading'];

    /**
     * Gets or Sets the isLocked property of the brush, enforcing the initial brush size set with dateRange
     * @param  {Boolean} _x = false     Whether the brush window is locked, requires a value set with '.dateRange` when true
     * @return {Boolean | module}       Current isLocked flag or Chart module
     * @public
     */
    (exports as BrushChartModule).isLocked = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isLocked;
        }
        isLocked = _x;

        return this;
    } as BrushChartModule['isLocked'];

    /**
     * Pass language tag for the tooltip to localize the date.
     * Feature uses Intl.DateTimeFormat, for compatability and support, refer to
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param  {String} _x              Must be a language tag (BCP 47) like 'en-US' or 'fr-FR'
     * @return { (String|Module) }      Current locale or module to chain calls
     */
    (exports as BrushChartModule).locale = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    } as BrushChartModule['locale'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return {Object | Module}    Current margin or Chart module to chain calls
     * @public
     */
    (exports as BrushChartModule).margin = function (
        this: BrushChartModule,
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
    } as BrushChartModule['margin'];

    /**
     * Date range
     * @typedef DateExtent
     * @type {Date[]}
     * @property {Date} 0 Lower bound date selection
     * @property {Date} 1 Upper bound date selection
     * @see {@link https://github.com/d3/d3-brush#brushSelection|d3-brush:brushSelection}
     */

    /**
     * Event indicating when the brush moves
     * @event customBrushStart
     * @type {module:Brush~DateExtent}
     * @see {@link https://github.com/d3/d3-brush#brush_on|d3-brush:on(brush)}
     */

    /**
     * Event indicating the end of a brush gesture
     * @event customBrushEnd
     * @type {module:Brush~DateExtent}
     * @see {@link https://github.com/d3/d3-brush#brush_on|d3-brush:on(end)}
     */

    /**
     * @callback eventCallback
     * @param {module:Brush~DateExtent} dateExtent Date range
     */

    /**
     * Adds, removes, or gets the callback for the specified typenames.
     * @param {String} typenames One or more event type names, delimited by a space
     * @param {module:Brush~eventCallback} [callback] Callback to register
     * @return {module:Brush}
     * @listens customBrushStart
     * @listens customBrushEnd
     * @see {@link https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_on|d3-dispatch:on}
     * @public
     */
    (exports as BrushChartModule).on = function (
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
    } as unknown as BrushChartModule['on'];

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x          Desired width for the graph
     * @return {Number | Module}    Current width or Chart module to chain calls
     * @public
     */
    (exports as BrushChartModule).width = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as BrushChartModule['width'];

    /**
     * Exposes the ability to force the chart to show a certain x format
     * It requires a `xAxisFormat` of 'custom' in order to work.
     * @param  {String} _x              Desired format for x axis, one of the d3.js date formats [here]{@link https://github.com/d3/d3-time-format#locale_format}
     * @return {String | Module}        Current format or module to chain calls
     * @public
     */
    (exports as BrushChartModule).xAxisCustomFormat = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisCustomFormat;
        }
        xAxisCustomFormat = _x;

        return this;
    } as BrushChartModule['xAxisCustomFormat'];

    /**
     * Exposes the ability to force the chart to show a certain x axis grouping
     * @param  {String} _x          Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR)
     * Set it to 'custom' to make use of specific formats with xAxisCustomFormat
     * @return { String|Module }      Current format or module to chain calls
     * @public
     * @example
     *     brushChart.xAxisCustomFormat(brushChart.axisTimeCombinations.HOUR_DAY)
     */
    (exports as BrushChartModule).xAxisFormat = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisFormat;
        }
        xAxisFormat = _x;

        return this;
    } as BrushChartModule['xAxisFormat'];

    /**
     * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisCustomFormat` of 'custom' in order to work.
     * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
     * how many and where the ticks will appear.
     *
     * @param  {Number} [_x=null]       Desired number of x axis ticks (multiple of 2, 5 or 10)
     * @return {Number | Module}        Current number or ticks or module to chain calls
     * @public
     */
    (exports as BrushChartModule).xTicks = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return xTicks;
        }
        xTicks = _x;

        return this;
    } as BrushChartModule['xTicks'];

    /**
     * Gets or Sets the rounding time interval of the selection boundary
     * @param  {roundingTimeInterval} [_x='timeDay'] Desired time interval for the selection, default 'timeDay'.
     * @return { (roundingTimeInterval | Module) } Current time interval or module to chain calls
     * @see {@link https://github.com/d3/d3-time#intervals}
     * @public
     * @example
     * All options are:
     * timeMillisecond, utcMillisecond, timeSecond, utcSecond, timeMinute, utcMinute, timeHour, utcHour, timeDay, utcDay
     * timeWeek, utcWeek, timeSunday, utcSunday, timeMonday, utcMonday, timeTuesday, utcTuesday, timeWednesday,
     * utcWednesday, timeThursday, utcThursday, timeFriday, utcFriday, timeSaturday, utcSaturday, timeMonth, utcMonth,
     * timeYear and utcYear.
     */
    (exports as BrushChartModule).roundingTimeInterval = function (
        this: BrushChartModule,
        _x
    ) {
        if (!arguments.length) {
            return roundingTimeInterval;
        }
        roundingTimeInterval = _x;

        return this;
    } as BrushChartModule['roundingTimeInterval'];

    return exports as unknown as BrushChartModule;
}
