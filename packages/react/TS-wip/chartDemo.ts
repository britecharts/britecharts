import { format } from 'd3-format';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { select, Selection, BaseType } from 'd3-selection';
import 'd3-transition';

import { COLORS } from '@lyft/dpl-design-attributes';

export interface BulletChartData {
    ranges: number[];
    measure: number;
    title?: string;
    subtitle?: string;
}

type MarginType = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};

export interface BulletChartType {
    (selection: any): any;
    height(): number;
    height(_x: number): BulletChartType;
    margin(): MarginType;
    margin(_x: Partial<MarginType>): BulletChartType;
    numberFormat(): string;
    numberFormat(_x: string): BulletChartType;
    paddingBetweenLabelsAndChart(): number;
    paddingBetweenLabelsAndChart(_x: number): BulletChartType;
    width(): number;
    width(_x: number): BulletChartType;
}

/**
 * @typedef BulletChartData
 * @type {Object}
 * @property {Number[]} ranges      Range that encodes the qualitative measure
 * @property {Number[]} measure    Range that encodes the performance measure
 *
 * @example
 * {
 *      ranges: [130, 160, 250],
 *      measure: [150, 180],
 * }
 *
 */

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
const module = (): BulletChartType => {
    let margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 20,
    };
    let width = 960;
    let height = 150;
    let chartWidth: number;
    let chartHeight: number;
    let xScale: ScaleLinear<number, number, never>;
    const MAX_ZERO_MAX_VALUE = 10;
    const MIN_RANGE_SIZE = 2;
    const DOMAIN_REDUCTION_RATIO = 0.9;
    const DOMAIN_INCREASE_RATIO = 1.1;
    const successColor = COLORS.dataSeverityPositive.color; // severity / Data Positive
    const errorColor = COLORS.dataSeverityNegative.color; // severity / Data Negative
    const rangeColor = COLORS.mint5.color; // Mint 5
    const baseLineColor = COLORS.gray100.color;
    const textColor = COLORS.textPrimary.color;
    let numberFormat = ',';
    let paddingBetweenLabelsAndChart = 13;
    let baseLine: Selection<SVGLineElement, number, BaseType, any>;
    const BASE_LINE_STROKE_WIDTH = 2;
    const BASE_LINE_OPACITY = 0.45;
    let rangeBarWidth: (d: any) => number;
    let rangesEl: Selection<SVGRectElement, number, BaseType, any>;
    let rangeLowLabel: Selection<SVGTextElement, number, BaseType, any>;
    let rangeHighLabel: Selection<SVGTextElement, number, BaseType, any>;
    let measureEl: Selection<SVGCircleElement, number, BaseType, any>;
    let ranges: number[] = [];
    let measure = 0;
    const MEASURE_RADIUS = 4.5;
    let svg: Selection<SVGSVGElement, any, null, any>;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {BulletChartData} _data   The data to attach and generate the chart
     */
    const bullet = ((
        _selection: Selection<HTMLElement, BulletChartData, any, any>
    ) => {
        _selection.each(function chart(_data: BulletChartData) {
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;
            ({ ranges, measure } = cleanData(_data));

            buildScales();
            buildSVG(this);
            drawBullet();
            drawRangeLabels();
        });
    }) as BulletChartType;

    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * Also applies the Margin convention
     * @return {void}
     * @private
     */
    function buildContainerGroups() {
        const container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        container.append('g').classed('chart-group', true);
        container.append('g').classed('range-labels', true);
    }

    /**
     * Creates the x scales of the chart
     * @return {void}
     * @private
     */
    function buildScales() {
        const range = [0, chartWidth];

        let domain: number[];
        if (ranges.length === 1) {
            // Only min range
            domain = [
                Math.min(
                    measure * DOMAIN_REDUCTION_RATIO,
                    ranges[0] * DOMAIN_REDUCTION_RATIO
                ),
                Math.max(
                    ranges[0] * DOMAIN_INCREASE_RATIO,
                    measure * DOMAIN_INCREASE_RATIO
                ),
            ];
        } else if (ranges[0] === 0 && ranges[1] === 0) {
            domain = [0, MAX_ZERO_MAX_VALUE];
        } else {
            domain = [
                Math.min(
                    measure * DOMAIN_REDUCTION_RATIO,
                    ranges[0] * DOMAIN_REDUCTION_RATIO
                ),
                Math.max(
                    ranges[1] * DOMAIN_INCREASE_RATIO,
                    measure * DOMAIN_INCREASE_RATIO
                ),
            ];
        }

        xScale = scaleLinear().domain(domain).rangeRound(range).nice();

        // Derive width scales from x scales
        rangeBarWidth = bulletRangeWidth(xScale);
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @return {void}
     * @private
     */
    function buildSVG(container: HTMLElement) {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart bullet-chart', true);

            buildContainerGroups();
        }

        svg.attr('width', width).attr('height', height);
    }

    /**
     * Calculates width for each bullet using scale
     * @return {void}
     * @private
     */
    function bulletRangeWidth(
        xScale: ScaleLinear<number, number, never>
    ): (d: any) => number {
        const x0 = xScale(ranges[0]);

        if (ranges[1]) {
            return (d) => Math.abs(xScale(d) - x0);
        }
        if (ranges[0] === 0 && ranges[1] === 0) {
            return (_) => MIN_RANGE_SIZE;
        }

        return (d) => Math.abs(xScale(xScale.domain()[1]) - xScale(d));
    }

    /**
     * Cleaning data casting the values and names to the proper
     * type while keeping the rest of properties on the data. It
     * also creates a set of zeroed data (for animation purposes)
     * @param   {BulletChartData} originalData  Raw data as passed to the container
     * @return  {BulletChartData}               Clean data
     * @private
     */
    function cleanData(originalData: BulletChartData) {
        return {
            ranges: [...originalData.ranges].sort(),
            measure: originalData.measure,
        };
    }

    /**
     * Draws the measure, ranges and line of the bullet chart
     * @return {void}
     * @private
     */
    function drawBullet() {
        if (rangesEl) {
            rangesEl.remove();
        }
        if (baseLine) {
            baseLine.remove();
        }
        if (measureEl) {
            measureEl.remove();
        }

        rangesEl = svg
            .select('.chart-group')
            .selectAll('rect.range')
            .data(ranges)
            .enter()
            .append('rect')
            .attr('class', 'range')
            .attr('fill', rangeColor)
            .attr('width', rangeBarWidth)
            .attr('height', chartHeight)
            .attr('x', xScale(ranges[0]));

        baseLine = svg
            .select('.chart-group')
            .selectAll('line.extended-x-line')
            .data([0])
            .enter()
            .append('line')
            .attr('class', 'extended-x-line')
            .attr('fill', 'none')
            .attr('shape-rendering', 'crispEdges')
            .attr('stroke', baseLineColor)
            .attr('opacity', BASE_LINE_OPACITY)
            .attr('stroke-width', BASE_LINE_STROKE_WIDTH)
            .attr('x1', 0)
            .attr('x2', chartWidth)
            .attr('transform', `translate(0, ${chartHeight / 2})`);

        measureEl = svg
            .select('.chart-group')
            .selectAll('circle.marker-circle')
            .data([measure])
            .enter()
            .append('circle')
            .attr('class', 'marker-circle')
            .attr('fill', getMeasureColor)
            .attr('cx', xScale)
            .attr('cy', chartHeight / 2)
            .attr('r', MEASURE_RADIUS);
    }

    /**
     * Draws the range labels and positions them
     * @return {void}
     * @private
     */
    function drawRangeLabels() {
        if (rangeLowLabel) {
            rangeLowLabel.remove();
        }

        svg.select('.range-labels').attr(
            'transform',
            `translate(0, ${chartHeight + paddingBetweenLabelsAndChart})`
        );

        rangeLowLabel = svg
            .select('.range-labels')
            .append('text')
            .attr('y', 0)
            .attr('x', xScale(ranges[0]))
            .attr('text-anchor', 'middle')
            .style('font-family', '"Roboto",Helvetica,Arial,sans-serif')
            .style('font-weight', 400)
            .style('font-size', '14px')
            .style('fill', textColor)
            .attr('class', 'low-range-label-text')
            .text(format(numberFormat)(ranges[0]));

        if (rangeHighLabel) {
            rangeHighLabel.remove();
        }
        if (ranges[1] !== 0 && ranges[1] !== undefined) {
            rangeHighLabel = svg
                .select('.range-labels')
                .append('text')
                .attr('y', 0)
                .attr('x', xScale(ranges[1]))
                .attr('text-anchor', 'middle')
                .style('font-family', '"Roboto",Helvetica,Arial,sans-serif')
                .style('font-weight', 400)
                .style('font-size', '14px')
                .style('fill', textColor)
                .attr('class', 'high-range-label-text')
                .text(format(numberFormat)(ranges[1]));
        }
    }

    /**
     * Figures out the measure color given the value and the ranges
     * @param value
     * @return {String}     Measure color
     */
    function getMeasureColor(value: number): string {
        if (value < Math.min(...ranges)) {
            return errorColor;
        }

        if (ranges[1] !== undefined && value > Math.max(...ranges)) {
            return errorColor;
        }

        return successColor;
    }

    // API
    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x          Desired height for the chart
     * @return {Number | module}    Current height or Chart module to chain calls
     * @public
     */
    bullet.height = function (_x?: number): any {
        if (_x !== undefined) {
            height = _x;

            return bullet;
        }

        return height;
    };

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return {margin | module}    Current margin or Chart module to chain calls
     * @public
     */
    bullet.margin = function (_x?: Partial<MarginType>): any {
        if (_x !== undefined) {
            margin = {
                ...margin,
                ..._x,
            };

            return bullet;
        }

        return margin;
    };

    /**
     * Gets or Sets the number format of the bar chart
     * @param  {string} _x = ','        Desired numberFormat for the chart. See examples [here]{@link https://observablehq.com/@d3/d3-format}
     * @return {string | module}        Current numberFormat or Chart module to chain calls
     * @public
     */
    bullet.numberFormat = function (_x?: string): any {
        if (_x !== undefined) {
            numberFormat = _x;

            return bullet;
        }

        return numberFormat;
    };

    /**
     * Space between bullet range labels and chart
     * @param  {Number} _x=13           Space between bullet range labels and chart
     * @return {Number| module}         Current value of paddingBetweenLabelsAndChart or Chart module to chain calls
     * @public
     */
    bullet.paddingBetweenLabelsAndChart = function (_x?: number): any {
        if (_x !== undefined) {
            paddingBetweenLabelsAndChart = _x;

            return bullet;
        }

        return paddingBetweenLabelsAndChart;
    };

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x           Desired width for the chart
     * @return {Number | module}     Current width or Chart module to chain calls
     * @public
     */
    bullet.width = function (_x?: number): any {
        if (_x !== undefined) {
            width = _x;

            return bullet;
        }

        return width;
    };

    return bullet;
};

export default module;
