import { axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import type { BaseType, Selection } from 'd3-selection';
import type { Axis } from 'd3-axis';
import type { NumberValue } from 'd3-scale';
import type { ScaleLinear } from 'd3-scale';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import { bulletLoadingMarkup } from '../helpers/load';
import colorHelper from '../helpers/color';
import type { ChartMarginParams } from '../../typings/common/margin';
import type {
    BulletChartDataShape,
    BulletChartModule,
} from '../../typings/charts/bullet-chart';

/**
 * The chart's own svg, and the selections derived from it. The datum and parent
 * generics are the migration plan's bounded `any`, as in `filter.ts`: these are
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

/** What `cleanData` hands the drawing functions. */
type BulletData = {
    ranges: number[];
    measures: number[];
    markers: number[];
    title?: string;
    subtitle?: string;
};

/**
 * Reusable Bullet Chart API class that renders a
 * simple and configurable Bullet Chart.
 *
 * @module Bullet
 * @tutorial bullet-chart
 * @requires d3-axis, d3-format, d3-scale, d3-selection, d3-transition
 *
 * @example
 * let bulletChart = bullet();
 *
 * bulletChart
 *     .width(containerWidth);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(bulletChart);
 */

/**
 * @typedef BulletChartData
 * @type {Object}
 * @property {Number[]} ranges      Range that encodes the qualitative measure
 * @property {Number[]} measures    Range that encodes the performance measure
 * @property {Number[]} markers     Marker lines that encode the comparative measure
 * @property {String}   [title]     String that sets identification for the measure
 * @property {String}   [subtitle]  String that provides more details on measure identification
 *
 * @example
 * {
 *      ranges: [130, 160, 250],
 *      measures: [150, 180],
 *      markers: [175],
 *      title: 'Title for Bullet',
 *      subtitle: 'Subtitle'
 * }
 *
 */

export default function module(): BulletChartModule {
    // Split into `let` and `const` rather than the one `let` chain the
    // JavaScript had: the TypeScript ESLint override runs `prefer-const` as an
    // error, and the constants below are never reassigned.
    let margin: ChartMarginParams = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 20,
        },
        width = 960,
        height = 150,
        isLoading = false,
        chartWidth: number,
        chartHeight: number,
        xScale: ScaleLinear<number, number>,
        rangeOpacityScale: number[],
        measureOpacityScale: number[],
        colorSchema: string[] = colorHelper.colorSchemas.britecharts,
        rangeColor: string,
        measureColor: string,
        markerColor: string,
        numberFormat = '',
        baseLine: ChartSelection<SVGLineElement>,
        ticks = 6,
        // `Axis<NumberValue>`, which is what `axisBottom` on a numeric scale
        // produces -- d3 types a scale's accepted input as `NumberValue`
        // (`number | { valueOf(): number }`), not `number`.
        axis: Axis<NumberValue>,
        paddingBetweenAxisAndChart = 5,
        startMaxRangeOpacity = 0.5,
        // Derived from the x scale: the width of one bullet for a given datum.
        barWidth: (d: number) => number,
        isReverse = false,
        legendGroup: ChartSelection<SVGGElement>,
        titleEl: ChartSelection<SVGTextElement>,
        subtitleEl: ChartSelection<SVGTextElement>,
        rangesEl: ChartSelection<SVGRectElement>,
        measuresEl: ChartSelection<SVGRectElement>,
        markersEl: ChartSelection<SVGLineElement>,
        // No defaults: a title arrives with the data, a customTitle through the
        // accessor, and reading either before it is set gives undefined -- which
        // is what the declaration says.
        title: string | undefined,
        customTitle: string | undefined,
        subtitle: string | undefined,
        customSubtitle: string | undefined,
        ranges: number[] = [],
        markers: number[] = [],
        measures: number[] = [],
        svg: ChartSelection<SVGSVGElement>;

    const rangeOpacifyDiff = 0.2;
    const measureOpacifyDiff = 0.3;
    const tickPadding = 5;
    const markerStrokeWidth = 5;
    const legendSpacing = 100;
    const subtitleSpacing = 15;
    const hasTitle = () => title || customTitle;
    const getMeasureBarHeight = () => chartHeight / 3;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {BulletChartData} _data   The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            BulletChartDataShape,
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (_data) {
            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);

            // The loading state stands in for data that has not arrived, so it
            // has to be drawn before cleanData(), which expects a real datum
            // with ranges, measures and markers.
            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            ({ title, subtitle, ranges, measures, markers } = cleanData(_data));

            if (hasTitle()) {
                chartWidth -= legendSpacing;
            }

            buildScales();
            buildAxis();
            drawBullet();
            drawTitles();
            drawAxis();
        });
    }

    /**
     * Creates the d3 x and y axis, setting orientations
     * @private
     */
    function buildAxis(): void {
        axis = axisBottom(xScale)
            .ticks(ticks)
            .tickPadding(tickPadding)
            .tickFormat(format(numberFormat));
    }

    /**
     * Cleans the loading state
     * @return {void}
     * @private
     */
    function cleanLoadingState(): void {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Draws the loading state
     * @return {void}
     * @private
     */
    function drawLoadingState(): void {
        svg.select('.loading-state-group').html(bulletLoadingMarkup);
    }

    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * Also applies the Margin convention
     * @return {void}
     * @private
     */
    function buildContainerGroups(): void {
        const container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('chart-group', true);
        container.append('g').classed('axis-group', true);
        container.append('g').classed('metadata-group', true);

        if (hasTitle()) {
            container
                .selectAll('.chart-group')
                .attr('transform', `translate(${legendSpacing}, 0)`);
        }
    }

    /**
     * Creates the x scales of the chart
     * @return {void}
     * @private
     */
    function buildScales(): void {
        const decidedRange = isReverse ? [chartWidth, 0] : [0, chartWidth];
        const domain = [0, Math.max(...ranges, ...markers, ...measures)];

        xScale = scaleLinear().domain(domain).rangeRound(decidedRange).nice();

        // Derive width scales from x scales
        barWidth = bulletWidth(xScale);

        // set up opacity scale based on ranges and measures
        rangeOpacityScale = ranges
            .map((d, i) => startMaxRangeOpacity - i * rangeOpacifyDiff)
            .reverse();
        measureOpacityScale = ranges
            .map((d, i) => 0.9 - i * measureOpacifyDiff)
            .reverse();

        // initialize range and measure bars and marker line colors
        rangeColor = colorSchema[0];
        measureColor = colorSchema[1];
        markerColor = colorSchema[2];
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @return {void}
     * @private
     */
    function buildSVG(container: Element): void {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart bullet-chart', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Calculates width for each bullet using scale
     * @return {void}
     * @private
     */
    function bulletWidth(x: ScaleLinear<number, number>) {
        const x0 = x(0);

        return function (d: number) {
            return Math.abs(x(d) - x0);
        };
    }

    /**
     * Cleaning data casting the values and names to the proper
     * type while keeping the rest of properties on the data. It
     * also creates a set of zeroed data (for animation purposes)
     * @param   {BulletChartData} originalData  Raw data as passed to the container
     * @return  {BulletChartData}               Clean data
     * @private
     */
    function cleanData(originalData: BulletChartDataShape): BulletData {
        // The declared shape spells these as tuples of optional numbers,
        // `[number?, number?, number?]`, so spreading one yields
        // `(number | undefined)[]`. The assertions keep the behaviour exactly as
        // it is rather than filtering: a hole in the data already reaches
        // `Math.max(...)` and already produces a NaN domain, and inventing a
        // meaning for it is not this conversion's to decide. Recorded in the
        // migration plan -- the documented `@typedef` above says `Number[]`,
        // which is what the implementation actually requires.
        const newData = {
            ranges: ([...originalData.ranges] as number[]).sort().reverse(),
            measures: ([...originalData.measures] as number[]).sort().reverse(),
            markers: originalData.markers.length
                ? ([...originalData.markers] as number[]).sort().reverse()
                : [],
            subtitle: originalData.subtitle,
            title: originalData.title,
        };

        return newData;
    }

    /**
     * Draws the x and y axis on the svg object within their
     * respective groups along with their axis labels
     * @return {void}
     * @private
     */
    function drawAxis(): void {
        const translateX = hasTitle() ? legendSpacing : 0;

        svg.select('.axis-group')
            .attr(
                'transform',
                `translate(${translateX}, ${
                    chartHeight + paddingBetweenAxisAndChart
                })`
            )
            // Cast because `svg.select` hands back a `Selection<BaseType, ...>`
            // while an axis renders into an SVG container; `BaseType` admits
            // `Document` and `Window`, which have no geometry. Same invariance
            // as everywhere else in this migration.
            .call(
                axis as unknown as (selection: ChartSelection<BaseType>) => void
            );

        drawHorizontalExtendedLine();
    }

    /**
     * Draws the measures of the bullet chart
     * @return {void}
     * @private
     */
    function drawBullet(): void {
        if (rangesEl) {
            rangesEl.remove();
        }
        if (measuresEl) {
            measuresEl.remove();
        }
        if (markersEl) {
            markersEl.remove();
        }

        rangesEl = svg
            .select('.chart-group')
            .selectAll('rect.range')
            .data(ranges)
            .enter()
            .append('rect')
            .attr('fill', rangeColor)
            .attr('opacity', (d, i) => rangeOpacityScale[i])
            .attr('class', (d, i) => `range r${i}`)
            .attr('width', barWidth)
            .attr('height', chartHeight)
            .attr('x', isReverse ? xScale : 0);

        measuresEl = svg
            .select('.chart-group')
            .selectAll('rect.measure')
            .data(measures)
            .enter()
            .append('rect')
            .attr('fill', measureColor)
            .attr('fill-opacity', (d, i) => measureOpacityScale[i])
            .attr('class', (d, i) => `measure m${i}`)
            .attr('width', barWidth)
            .attr('height', getMeasureBarHeight)
            .attr('x', isReverse ? xScale : 0)
            .attr('y', getMeasureBarHeight);

        if (markers.length) {
            markersEl = svg
                .select('.chart-group')
                .selectAll('line.marker-line')
                .data(markers)
                .enter()
                .append('line')
                .attr('class', 'marker-line')
                .attr('stroke', markerColor)
                .attr('stroke-width', markerStrokeWidth)
                .attr('opacity', measureOpacityScale[0])
                .attr('x1', xScale)
                .attr('x2', xScale)
                .attr('y1', 0)
                .attr('y2', chartHeight);
        }
    }

    /**
     * Draws a vertical line to extend x-axis till the edges
     * @return {void}
     * @private
     */
    function drawHorizontalExtendedLine(): void {
        if (baseLine) {
            baseLine.remove();
        }

        baseLine = svg
            .select('.axis-group')
            .selectAll('line.extended-x-line')
            .data([0])
            .enter()
            .append('line')
            .attr('class', 'extended-x-line')
            .attr('x1', 0)
            .attr('x2', chartWidth);
    }

    /**
     * Draws the title and subtitle components of chart
     * @return {void}
     * @private
     */
    function drawTitles(): void {
        if (hasTitle()) {
            // either use title provided from the data
            // or customTitle provided via API method call
            if (legendGroup) {
                legendGroup.remove();
            }

            legendGroup = svg
                .select('.metadata-group')
                .append('g')
                .classed('legend-group', true)
                .attr('transform', `translate(0, ${chartHeight / 2})`);

            // override title with customTitle if given
            if (customTitle) {
                title = customTitle;
            }

            if (titleEl) {
                titleEl.remove();
            }

            titleEl = legendGroup
                .selectAll('text.bullet-title')
                .data([1])
                .enter()
                .append('text')
                .attr('class', 'bullet-title x-axis-label')
                .text(title ?? null);

            // either use subtitle provided from the data
            // or customSubtitle provided via API method call
            if (subtitle || customSubtitle) {
                // override subtitle with customSubtitle if given
                if (customSubtitle) {
                    subtitle = customSubtitle;
                }

                if (subtitleEl) {
                    subtitleEl.remove();
                }

                subtitleEl = legendGroup
                    .selectAll('text.bullet-subtitle')
                    .data([1])
                    .enter()
                    .append('text')
                    .attr('class', 'bullet-subtitle x-axis-label')
                    .attr('y', subtitleSpacing)
                    .text(subtitle ?? null);
            }
        }
    }

    // API
    /**
     * Gets or Sets the colorSchema of the chart.
     * The first color from the array will be applied to range bars (the wider bars).
     * The second color from the array will be applied to measure bars (the narrow bars) and
     * the third color will be applied to the marker lines.
     * @param  {String[]} _x        Desired colorSchema for the graph
     * @return {String[] | module}  Current colorSchema or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).colorSchema = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as BulletChartModule['colorSchema'];

    /**
     * Gets or Sets the title for measure identifier
     * range.
     * @param  {String} _x              Desired customTitle for chart
     * @return {String | module}        Current customTitle or Chart module to chain calls
     * @public
     * @example bulletChart.customTitle('CPU Usage')
     */
    (exports as BulletChartModule).customTitle = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return customTitle;
        }
        customTitle = _x;

        return this;
    } as BulletChartModule['customTitle'];

    /**
     * Gets or Sets the subtitle for measure identifier range.
     * @param  {String} _x              Desired customSubtitle for chart
     * @return {String | module}        current customSubtitle or Chart module to chain calls
     * @public
     * @example bulletChart.customSubtitle('GHz')
     */
    (exports as BulletChartModule).customSubtitle = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return customSubtitle;
        }
        customSubtitle = _x;

        return this;
    } as BulletChartModule['customSubtitle'];

    /**
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    (exports as BulletChartModule).exportChart = function (filename, title) {
        // The module, not the bare function: `exportChart` needs `this` to
        // answer `width()`, `height()` and `margin()`.
        return exportChart.call(
            exports as BulletChartModule,
            svg,
            filename,
            title
        );
    } as BulletChartModule['exportChart'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} _flag          Desired value for the loading state
     * @return {boolean | module}       Current loading state flag or Chart module to chain calls
     * @public
     * @example chart.isLoading(true)
     */
    (exports as BulletChartModule).isLoading = function (
        this: BulletChartModule,
        _flag
    ) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    } as BulletChartModule['isLoading'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x          Desired height for the chart
     * @return {Number | module}    Current height or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).height = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as BulletChartModule['height'];

    /**
     * Gets or Sets the isReverse status of the chart. If true,
     * the elements will be rendered in reverse order.
     * @param  {Boolean} _x=false       Desired height for the chart
     * @return {Boolean | module}       Current height or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).isReverse = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return isReverse;
        }
        isReverse = _x;

        return this;
    } as BulletChartModule['isReverse'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return {margin | module}    Current margin or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).margin = function (
        this: BulletChartModule,
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
    } as BulletChartModule['margin'];

    /**
     * Gets or Sets the number format of the bar chart
     * @param  {string} _x = ',f'       Desired numberFormat for the chart. See examples [here]{@link https://d3js.org/d3-format}
     * @return {string | module}        Current numberFormat or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).numberFormat = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as BulletChartModule['numberFormat'];

    /**
     * Space between axis and chart
     * @param  {Number} _x=5            Space between y axis and chart
     * @return {Number| module}         Current value of paddingBetweenAxisAndChart or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).paddingBetweenAxisAndChart = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return paddingBetweenAxisAndChart;
        }
        paddingBetweenAxisAndChart = _x;

        return this;
    } as BulletChartModule['paddingBetweenAxisAndChart'];

    /**
     * Gets or Sets the starting point of the capacity range.
     * @param  {Number} _x=0.5          Desired startMaxRangeOpacity for chart
     * @return {Number | module}        current startMaxRangeOpacity or Chart module to chain calls
     * @public
     * @example bulletChart.startMaxRangeOpacity(0.8)
     */
    (exports as BulletChartModule).startMaxRangeOpacity = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return startMaxRangeOpacity;
        }
        startMaxRangeOpacity = _x;

        return this;
    } as BulletChartModule['startMaxRangeOpacity'];

    /**
     * Gets or Sets the number of ticks of the x axis on the chart
     * @param  {Number} _x = 5      Desired horizontal ticks
     * @return {Number | module}    Current ticks or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).ticks = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return ticks;
        }
        ticks = _x;

        return this;
    } as BulletChartModule['ticks'];

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x           Desired width for the chart
     * @return {Number | module}     Current width or Chart module to chain calls
     * @public
     */
    (exports as BulletChartModule).width = function (
        this: BulletChartModule,
        _x
    ) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as BulletChartModule['width'];

    return exports as unknown as BulletChartModule;
}
