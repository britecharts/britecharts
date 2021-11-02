import { min, max } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { dispatch } from 'd3-dispatch';
import { easeCircleIn } from 'd3-ease';
import * as d3Format from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { scaleSqrt, scaleOrdinal, scaleLinear } from 'd3-scale';
import { curveBasis, line } from 'd3-shape';
import { select, mouse } from 'd3-selection';
import { voronoi } from 'd3-voronoi';
import { zoom as d3Zoom, zoomTransform } from 'd3-zoom';
import 'd3-transition';

import { exportChart } from '../helpers/export';
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
export default function module() {
    let margin = {
            top: 20,
            right: 10,
            bottom: 20,
            left: 40,
        },
        width = 960,
        height = 500,
        nameToColorMap = null,
        dataPoints,
        xKey = 'x',
        yKey = 'y',
        nameKey = 'name',
        xTicks = 6,
        yTicks = null,
        tickPadding = 5,
        hollowColor = '#fff',
        grid = null,
        baseLine,
        maskGridLines,
        voronoiMesh,
        xAxis,
        xAxisFormatType = 'number',
        xAxisFormat = '',
        xScale,
        xOriginalScale,
        yAxis,
        yAxisFormat = '',
        yScale,
        yOriginalScale,
        areaScale,
        colorScale,
        yAxisLabel,
        yAxisLabelEl,
        yAxisLabelOffset = -50,
        xAxisLabel,
        xAxisLabelEl,
        xAxisLabelOffset = -50,
        minZoom = 0.5,
        maxZoom = 20,
        trendLinePath,
        trendLineCurve = curveBasis,
        trendLineStrokWidth = '2',
        trendLineDelay = 1500,
        trendLineDuration = 2000,
        highlightPointData,
        highlightFilter,
        highlightFilterId,
        highlightStrokeWidth = 10,
        highlightCrossHairContainer,
        highlightCrossHairLabelsContainer,
        highlightTextLegendOffset = -45,
        xAxisPadding = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        circleOpacity = 0.24,
        circleStrokeOpacity = 1,
        circleStrokeWidth = 1,
        highlightCircle = null,
        highlightCircleOpacity = circleOpacity,
        maxCircleArea = 10,
        maskingRectangle,
        maskingRectangleId = 'scatter-clip-path',
        colorSchema = colorHelper.colorSchemas.britecharts,
        isAnimated = false,
        hasCrossHairs = false,
        hasTrendline = false,
        enableZoom = false,
        ease = easeCircleIn,
        delay = 500,
        duration = motion.duration,
        hasHollowCircles = false,
        locale = null,
        localeFormatter = d3Format,
        svg,
        chartWidth,
        chartHeight,
        dispatcher = dispatch(
            'customClick',
            'customMouseMove',
            'customMouseOver',
            'customMouseOut'
        ),
        getName = ({ name }) => name,
        getPointData = ({ data }) => data;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {ScatterPlotData} _data The data to attach and generate the chart
     */
    function exports(_selection) {
        if (locale) {
            localeFormatter = setDefaultLocale(locale);
        }

        _selection.each(function (_data) {
            dataPoints = cleanData(_data);

            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;

            buildScales();
            buildSVG(this);
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
        svg.on('mousemove', function (d) {
            handleMouseMove(this, d);
        })
            .on('mouseover', function (d) {
                handleMouseOver(this, d);
            })
            .on('mouseout', function (d) {
                handleMouseOut(this, d);
            })
            .on('click', function () {
                handleClick(this);
            });
    }

    /**
     * Creates the x-axis and y-axis with proper orientations
     * @return {void}
     * @private
     */
    function buildAxis(localeFormatter) {
        xAxis = axisBottom(xScale)
            .ticks(xTicks)
            .tickPadding(tickPadding)
            .tickFormat(getXAxisFormat());

        yAxis = axisLeft(yScale)
            .ticks(yTicks)
            .tickPadding(tickPadding)
            .tickFormat(localeFormatter.format(yAxisFormat));
    }

    /**
     * Builds containers for the chart, including the chart axis,
     * chart, and metadata groups.
     * @return {void}
     * @private
     */
    function buildContainerGroups() {
        let container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        container.append('g').classed('grid-lines-group', true);
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
     * Draws the voronoi component in the chart.
     * @return {void}
     * @private
     */
    function buildVoronoi() {
        voronoiMesh = voronoi()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y))
            .extent([
                [0, 0],
                [chartWidth, chartHeight],
            ])(dataPoints);
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
        const yScaleBottomValue = Math.abs(minY) < 0 ? Math.abs(minY) : 0;

        xOriginalScale = xScale = scaleLinear()
            .domain([minX, maxX])
            .rangeRound([0, chartWidth])
            .nice();

        yOriginalScale = yScale = scaleLinear()
            .domain([yScaleBottomValue, maxY])
            .rangeRound([chartHeight, 0])
            .nice();

        colorScale = scaleOrdinal()
            .domain(dataPoints.map(getName))
            .range(colorSchema);

        areaScale = scaleSqrt()
            .domain([yScaleBottomValue, maxY])
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
            colorScale.domain().reduce((accum, item, i) => {
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
    function buildSVG(container) {
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
    function cleanData(originalData) {
        return originalData.reduce((acc, d) => {
            d.name = String(d[nameKey]);
            d.x = d[xKey];
            d.y = d[yKey];

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
        svg.select('.x-axis-group .axis.x')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis);

        svg.select('.y-axis-group .axis.y').call(yAxis);

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

        const zoom = d3Zoom();
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
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(zoom);
    }

    /**
     * Update chart elements after zoom events
     * @return {void}
     * @private
     */
    function updateChartAfterZoom(data, index, elements) {
        //update scale
        const transform = zoomTransform(elements[0]);
        xScale = transform.rescaleX(xOriginalScale);
        yScale = transform.rescaleY(yOriginalScale);
        //update axes
        xAxis.scale(xScale);
        yAxis.scale(yScale);
        svg.select('.x-axis-group .axis.x').call(xAxis);
        svg.select('.y-axis-group .axis.y').call(yAxis);

        // update circle position
        svg.select('.chart-group')
            .selectAll('circle')
            .attr('cx', (d) => xScale(d.x))
            .attr('cy', (d) => yScale(d.y));

        // update highlight location
        highlightCircle
            .attr('cx', () => xScale(highlightPointData.x))
            .attr('cy', () => yScale(highlightPointData.y));
    }

    /**
     * Draws a trend line given the data that contains
     * and y params from calculated y-intercept and slope
     * using linear regression formula.
     * @param {Object} linearData
     * @returns {void}
     * @private
     */
    function drawTrendline(linearData) {
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

        let trendLine = line()
            .curve(trendLineCurve)
            .x(({ x }) => xScale(x))
            .y(({ y }) => yScale(y));

        trendLinePath = svg
            .selectAll('.chart-group')
            .append('path')
            .attr('class', 'scatter-trendline')
            .attr('d', trendLine(params))
            .attr('stroke', colorSchema[0])
            .attr('stroke-width', trendLineStrokWidth)
            .attr('fill', 'none');

        const totalLength = trendLinePath.node().getTotalLength();

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
            .ticks(xTicks);

        grid(svg.select('.grid-lines-group'));

        drawVerticalExtendedLine();
    }

    /**
     * Draws a vertical line to extend y-axis till the edges
     * @return {void}
     */
    function drawVerticalExtendedLine() {
        baseLine = svg
            .select('.grid-lines-group')
            .selectAll('line.extended-y-line')
            .data([0])
            .enter()
            .append('line')
            .attr('class', 'extended-y-line')
            .attr('y1', xAxisPadding.bottom)
            .attr('y2', chartHeight)
            .attr('x1', 0)
            .attr('x2', 0);
    }

    /**
     * Draws the points for each data element on the chart group
     * @return {void}
     * @private
     */
    function drawDataPoints() {
        let circles = svg
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
                .style('stroke', (d) => nameToColorMap[d.name])
                .attr('fill', (d) =>
                    hasHollowCircles ? hollowColor : nameToColorMap[d.name]
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
                .style('stroke', (d) => nameToColorMap[d.name])
                .attr('fill', (d) =>
                    hasHollowCircles ? hollowColor : nameToColorMap[d.name]
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
    function drawDataPointsValueHighlights(data) {
        showCrossHairComponentsWithLabels(true);

        // Draw line perpendicular to y-axis
        highlightCrossHairContainer
            .selectAll('line.highlight-y-line')
            .attr('stroke', nameToColorMap[data.name])
            .attr('class', 'highlight-y-line')
            .attr('x1', xScale(data.x) - areaScale(data.y))
            .attr('x2', 0)
            .attr('y1', yScale(data.y))
            .attr('y2', yScale(data.y));

        // Draw line perpendicular to x-axis
        highlightCrossHairContainer
            .selectAll('line.highlight-x-line')
            .attr('stroke', nameToColorMap[data.name])
            .attr('class', 'highlight-x-line')
            .attr('x1', xScale(data.x))
            .attr('x2', xScale(data.x))
            .attr('y1', yScale(data.y) + areaScale(data.y))
            .attr('y2', chartHeight);

        // Draw data label for y value
        highlightCrossHairLabelsContainer
            .selectAll('text.highlight-y-legend')
            .attr('text-anchor', 'middle')
            .attr('fill', nameToColorMap[data.name])
            .attr('class', 'highlight-y-legend')
            .attr('y', yScale(data.y) + areaScale(data.y) / 2)
            .attr('x', highlightTextLegendOffset)
            .text(`${localeFormatter.format(yAxisFormat)(data.y)}`);

        // Draw data label for x value
        highlightCrossHairLabelsContainer
            .selectAll('text.highlight-x-legend')
            .attr('text-anchor', 'middle')
            .attr('fill', nameToColorMap[data.name])
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
     * Draws a vertical line to extend x-axis till the edges
     * @return {void}
     * @private
     */
    function drawHorizontalExtendedLine() {
        baseLine = svg
            .select('.grid-lines-group')
            .selectAll('line.extended-x-line')
            .data([0])
            .enter()
            .append('line')
            .attr('class', 'extended-x-line')
            .attr('x1', xAxisPadding.left)
            .attr('x2', chartWidth)
            .attr('y1', chartHeight)
            .attr('y2', chartHeight);
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
            .ticks(yTicks);

        grid(svg.select('.grid-lines-group'));

        drawHorizontalExtendedLine();
    }

    /**
     * Finds the closest point to the current mouse position
     * @param {SVGHtmlElement} svg
     * @private
     */
    function getClosestPoint(svg) {
        let mousePos = mouse(svg);

        mousePos[0] -= margin.left;
        mousePos[1] -= margin.top;

        return voronoiMesh.find(mousePos[0], mousePos[1]);
    }

    /**
     * Gets the formatter function for x-Axis based on `xAxisFormatType` setter
     * Applies `timeFormat` formatter function if custom `xAxisFormatType`
     * that is not equal to 'number' is provided
     * @return {function(String): String}
     * @private
     */
    function getXAxisFormat() {
        if (xAxisFormatType === 'number') {
            return d3Format.format(xAxisFormat);
        } else {
            return timeFormat(xAxisFormat);
        }
    }

    /**
     * Handler called on mousemove event
     * @return {void}
     * @private
     */
    function handleMouseMove(e) {
        const closestPoint = getClosestPoint(e);
        const pointData = getPointData(closestPoint);

        if (hasCrossHairs) {
            drawDataPointsValueHighlights(pointData);
        }

        highlightDataPoint(pointData);

        dispatcher.call('customMouseMove', e, pointData, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Handler called on mouseover event
     * @return {void}
     * @private
     */
    function handleMouseOver(e, d) {
        dispatcher.call('customMouseOver', e, d, mouse(e));
    }

    /**
     * Handler called on mouseout event
     * @return {void}
     * @private
     */
    function handleMouseOut(e, d) {
        removePointHighlight();

        if (hasCrossHairs) {
            showCrossHairComponentsWithLabels(false);
        }
        dispatcher.call('customMouseOut', e, d, mouse(e));
    }

    /**
     * Custom onClick event handler
     * @return {void}
     * @private
     */
    function handleClick(e) {
        const closestPoint = getClosestPoint(e);
        const d = getPointData(closestPoint);

        handleClickAnimation(d);

        dispatcher.call('customClick', e, d, mouse(e), [
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
    function handleClickAnimation(dataPoint) {
        bounceCircleHighlight(
            highlightCircle,
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
    function highlightDataPoint(data) {
        highlightPointData = data;

        removePointHighlight();

        if (!highlightFilter) {
            highlightFilter = createFilterContainer(
                svg.select('.metadata-group')
            );
            highlightFilterId = createGlowWithMatrix(highlightFilter);
        }

        highlightCircle
            .attr('opacity', 1)
            .attr('stroke', () => nameToColorMap[data.name])
            .attr('fill', () => nameToColorMap[data.name])
            .attr('fill-opacity', circleOpacity)
            .attr('cx', () => xScale(data.x))
            .attr('cy', () => yScale(data.y))
            .attr('r', () => areaScale(data.y))
            .style('stroke-width', highlightStrokeWidth)
            .style('stroke-opacity', highlightCircleOpacity);

        // apply glow container overlay
        highlightCircle.attr('filter', `url(#${highlightFilterId})`);
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
    exports.animationDuration = function (_x) {
        if (!arguments.length) {
            return duration;
        }
        duration = _x;

        return this;
    };

    /**
     * Gets or Sets each circle's border opacity value of the chart.
     * It makes each circle border transparent if it's less than 1.
     * @param  {Number} _x=1            Desired border opacity of circles of the chart
     * @return {Number | module}           Current circleStrokeOpacity or Chart module to chain calls
     * @public
     * @example
     * scatterPlot.circleStrokeOpacity(0.6)
     */
    exports.circleStrokeOpacity = function (_x) {
        if (!arguments.length) {
            return circleStrokeOpacity;
        }
        circleStrokeOpacity = _x;

        return this;
    };

    /**
     * Gets or Sets each circle's border width value of the chart.
     * It makes each circle border transparent if it's less than 1.
     * @param  {Number} _x=1            Desired border width of circles of the chart
     * @return {Number | module}           Current circleStrokeWidth or Chart module to chain calls
     * @public
     * @example
     * scatterPlot.circleStrokeWidth(10)
     */
    exports.circleStrokeWidth = function (_x) {
        if (!arguments.length) {
            return circleStrokeWidth;
        }
        circleStrokeWidth = _x;

        return this;
    };

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
    exports.circleOpacity = function (_x) {
        if (!arguments.length) {
            return circleOpacity;
        }
        circleOpacity = _x;

        return this;
    };

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {object | module}     Current colorMap or Chart module to chain calls
     * @example scatterPlot.colorMap({name: 'colorHex', name2: 'colorString'})
     * @public
     */
    exports.colorMap = function (_x) {
        if (!arguments.length) {
            return nameToColorMap;
        }
        nameToColorMap = _x;

        return this;
    };

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {String[]} _x         Desired colorSchema for the chart
     * @return {String[] | module}   Current colorSchema or Chart module to chain calls
     * @public
     * @example
     * scatterPlot.colorSchema(['#fff', '#bbb', '#ccc'])
     */
    exports.colorSchema = function (_x) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    };

    /**
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    exports.exportChart = function (filename, title) {
        return exportChart.call(exports, svg, filename, title);
    };

    /**
     * Gets or Sets the grid mode.
     * @param  {String} _x          Desired mode for the grid ('vertical'|'horizontal'|'full')
     * @return {String | module}    Current mode of the grid or Chart module to chain calls
     * @public
     */
    exports.grid = function (_x) {
        if (!arguments.length) {
            return grid;
        }
        grid = _x;

        return this;
    };

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
    exports.hasCrossHairs = function (_x) {
        if (!arguments.length) {
            return hasCrossHairs;
        }
        hasCrossHairs = _x;

        return this;
    };

    /**
     * Gets or Sets the hasHollowCircles value of the chart area
     * @param  {boolean} _x=false    Choose whether chart's data points/circles should be hollow
     * @return {boolean | module}    Current hasHollowCircles value or Chart module to chain calls
     * @public
     */
    exports.hasHollowCircles = function (_x) {
        if (!arguments.length) {
            return hasHollowCircles;
        }
        hasHollowCircles = _x;

        return this;
    };

    /**
     * Gets or Sets the hasTrendline value of the chart area
     * If true, the trendline calculated based off linear regression
     * formula will be drawn
     * @param  {boolean} _x=false       Choose whether chart's trendline should be drawn
     * @return {boolean | module}       Current hasTrendline value or Chart module to chain calls
     * @public
     */
    exports.hasTrendline = function (_x) {
        if (!arguments.length) {
            return hasTrendline;
        }
        hasTrendline = _x;

        return this;
    };

    /**
     * Gets or Sets weather the chart support zoom controls
     * If true, zoom event handling will be added to the chart.
     * @param  {boolean} _x=false       Choose whether chart should support zoom controls
     * @return {boolean | module}       Current enableZoom value or Chart module to chain calls
     * @public
     */
    exports.enableZoom = function (_x) {
        if (!arguments.length) {
            return enableZoom;
        }
        enableZoom = _x;

        return this;
    };

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x          Desired height for the chart
     * @return {Number | module}    Current height or Chart module to chain calls
     * @public
     */
    exports.height = function (_x) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    };

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
    exports.highlightTextLegendOffset = function (_x) {
        if (!arguments.length) {
            return highlightTextLegendOffset;
        }
        highlightTextLegendOffset = _x;

        return this;
    };

    /**
     * Gets or Sets isAnimated value. If set to true,
     * the chart will be initialized or updated with animation.
     * @param  {boolean} _x=false    Desired isAnimated properties for each side
     * @return {boolean | module}    Current isAnimated or Chart module to chain calls
     * @public
     */
    exports.isAnimated = function (_x) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x;

        return this;
    };

    /**
     * Gets or Sets the margin object of the chart
     * @param  {Object} _x          Desired margin object properties for each side
     * @return {Object | module}    Current margin or Chart module to chain calls
     * @public
     */
    exports.margin = function (_x) {
        if (!arguments.length) {
            return margin;
        }
        margin = {
            ...margin,
            ..._x,
        };

        return this;
    };

    /**
     * Gets or Sets the maximum value of the chart area
     * @param  {Number} _x=10       Desired margin object properties for each side
     * @return {Number | module}    Current maxCircleArea or Chart module to chain calls
     * @public
     */
    exports.maxCircleArea = function (_x) {
        if (!arguments.length) {
            return maxCircleArea;
        }
        maxCircleArea = _x;

        return this;
    };

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customClick, customMouseOut, customMouseOver, and customMouseMove
     * @return {module} Scatter Plot
     * @public
     */
    exports.on = function () {
        let value = dispatcher.on.apply(dispatcher, arguments);

        return value === dispatcher ? exports : value;
    };

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
    exports.valueLocale = function (_x) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    };

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x           Desired height for the chart
     * @return {Number | module}     Current width or Chart module to chain calls
     * @public
     */
    exports.width = function (_x) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    };

    /**
     * Gets or Sets the xAxisLabel of the chart. Adds a
     * label bellow x-axis for better clarify of data representation.
     * @param  {String} _x              Desired string for x-axis label of the chart
     * @return {String | module}        Current xAxisLabel or Chart module to chain calls
     * @public
     */
    exports.xAxisLabel = function (_x) {
        if (!arguments.length) {
            return xAxisLabel;
        }
        xAxisLabel = _x;

        return this;
    };

    /**
     * Gets or Sets the offset of the xAxisLabel of the chart.
     * The method accepts both positive and negative values.
     * @param  {Number} _x=-40          Desired offset for the label
     * @return {Number | module}        Current xAxisLabelOffset or Chart module to chain calls
     * @public
     * @example scatterPlot.xAxisLabelOffset(-55)
     */
    exports.xAxisLabelOffset = function (_x) {
        if (!arguments.length) {
            return xAxisLabelOffset;
        }
        xAxisLabelOffset = _x;

        return this;
    };

    /**
     * Exposes ability to set the format of x-axis values
     * @param  {String} _x        Desired xAxisFormat for the chart
     * @return {String | module}  Current xAxisFormat or Chart module to chain calls
     * @public
     */
    exports.xAxisFormat = function (_x) {
        if (!arguments.length) {
            return xAxisFormat;
        }
        xAxisFormat = _x;

        return this;
    };

    /**
     * Exposes ability to set the formatter of x-axis values
     * @param  {string} _x          type of x-axis formatter
     * @value 'number'
     * @value 'time'
     * @return {string | module}    current xAxisFormatType or Chart module to chain calls
     * @public
     */
    exports.xAxisFormatType = function (_x) {
        if (!arguments.length) {
            return xAxisFormatType;
        }
        xAxisFormatType = _x;

        return this;
    };

    /**
     * Gets or Sets the xTicks of the chart
     * @param  {Number} _x         Desired xTicks for the chart
     * @return {Number | module}   Current xTicks or Chart module to chain calls
     * @public
     */
    exports.xTicks = function (_x) {
        if (!arguments.length) {
            return xTicks;
        }
        xTicks = _x;

        return this;
    };

    /**
     * Exposes ability to set the format of y-axis values
     * @param  {String} _x          Desired yAxisForma for the chart
     * @return {String | module}    Current yAxisFormat or Chart module to chain calls
     * @public
     */
    exports.yAxisFormat = function (_x) {
        if (!arguments.length) {
            return yAxisFormat;
        }
        yAxisFormat = _x;

        return this;
    };

    /**
     * Gets or Sets the y-axis label of the chart
     * @param  {String} _x          Desired label string
     * @return {String | module}    Current yAxisLabel or Chart module to chain calls
     * @public
     * @example scatterPlot.yAxisLabel('Ice Cream Consmuption Growth')
     */
    exports.yAxisLabel = function (_x) {
        if (!arguments.length) {
            return yAxisLabel;
        }
        yAxisLabel = _x;

        return this;
    };

    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     * @param  {Number} _x=-40      Desired offset for the label
     * @return {Number | module}    Current yAxisLabelOffset or Chart module to chain calls
     * @public
     * @example scatterPlot.yAxisLabelOffset(-55)
     */
    exports.yAxisLabelOffset = function (_x) {
        if (!arguments.length) {
            return yAxisLabelOffset;
        }
        yAxisLabelOffset = _x;

        return this;
    };

    /**
     * Gets or Sets the xTicks of the chart
     * @param  {Number} _x          Desired height for the chart
     * @return {Number | module}    Current yTicks or Chart module to chain calls
     * @public
     */
    exports.yTicks = function (_x) {
        if (!arguments.length) {
            return yTicks;
        }
        yTicks = _x;

        return this;
    };

    return exports;
}
