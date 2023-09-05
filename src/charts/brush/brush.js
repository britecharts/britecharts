import { extent, max } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { brushX } from 'd3-brush';
import { scaleLinear, scaleTime } from 'd3-scale';
import { area } from 'd3-shape';
import { dispatch } from 'd3-dispatch';
import { select } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import 'd3-transition';

import colorHelper from '../helpers/color';
import timeAxisHelper from '../helpers/axis';
import {
    axisTimeCombinations,
    timeIntervals,
    motion,
    curveMap,
} from '../helpers/constants';
import { uniqueId } from '../helpers/number';
import { brushLoadingMarkup } from '../helpers/load';

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

export default function module() {
    let margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 20,
        },
        width = 960,
        height = 500,
        isLoading = false,
        data,
        dataZeroed,
        svg,
        isAnimated = false,
        animationDuration = motion.duration,
        dateLabel = 'date',
        valueLabel = 'value',
        dateRange = [null, null],
        isLocked = false,
        chartWidth,
        chartHeight,
        xScale,
        yScale,
        xAxis,
        xSubAxis,
        xAxisFormat = null,
        xTicks = null,
        monthAxisPadding = 30,
        xAxisCustomFormat = null,
        locale,
        brush,
        chartBrush,
        brushArea,
        areaCurve = 'monotoneX',
        handle,
        tickPadding = 5,
        chartGradientEl,
        gradient = colorHelper.colorGradients.greenBlue,
        gradientId = uniqueId('brush-area-gradient'),
        roundingTimeInterval = 'timeDay',
        // Dispatcher object to broadcast the mouse events
        // @see {@link https://github.com/d3/d3/blob/master/API.md#dispatches-d3-dispatch}
        dispatcher = dispatch('customBrushStart', 'customBrushEnd'),
        // extractors
        getValue = ({ value }) => value,
        getDate = ({ date }) => date;

    const acceptNullValue = (value) => (value === null ? null : +value);

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {BrushChartData} _data The data to attach and generate the chart
     */
    function exports(_selection) {
        _selection.each(function (_data) {
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;
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
    function buildAxis() {
        let minor, major;

        if (xAxisFormat === 'custom' && typeof xAxisCustomFormat === 'string') {
            minor = {
                tick: xTicks,
                format: timeFormat(xAxisCustomFormat),
            };
            major = null;
        } else {
            ({ minor, major } = timeAxisHelper.getTimeSeriesAxis(
                data,
                width,
                xAxisFormat,
            ));

            xSubAxis = axisBottom(xScale)
                .ticks(major.tick)
                .tickSize(0, 0)
                .tickFormat(major.format);
        }

        xAxis = axisBottom(xScale)
            .ticks(minor.tick)
            .tickSize(10, 0)
            .tickPadding([tickPadding])
            .tickFormat(minor.format);

        drawHorizontalExtendedLine();
    }

    /**
     * Creates the brush element and attaches a listener
     * @return {void}
     */
    function buildBrush() {
        brush = brushX()
            .extent([
                [0, 0],
                [chartWidth, chartHeight],
            ])
            .on('brush', (event) => handleBrushStart(event))
            .on('end', (event) => handleBrushEnd(event));
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
    function buildGradient() {
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
    function buildScales() {
        xScale = scaleTime()
            .domain(extent(data, getDate))
            .range([0, chartWidth]);

        yScale = scaleLinear()
            .domain([0, max(data, getValue)])
            .range([chartHeight, 0]);
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container) {
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
    function cleanData(originalData) {
        const cleanData = originalData.reduce((acc, d) => {
            d.date = new Date(d[dateLabel]);
            d.value = acceptNullValue(d[valueLabel]);

            return [...acc, d];
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
    function cleanLoadingState() {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Clones the passed array of data
     * @param  {Object[]} dataToClone Data to clone
     * @return {Object[]}             Cloned data
     */
    function cloneData(dataToClone) {
        return JSON.parse(JSON.stringify(dataToClone));
    }

    /**
     * Draws the x axis on the svg object within its group
     *
     * @private
     */
    function drawAxis() {
        svg.select('.x-axis-group .axis.x')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis);

        if (xAxisFormat !== 'custom') {
            svg.select('.x-axis-group .axis.sub-x')
                .attr(
                    'transform',
                    `translate(0, ${chartHeight + monthAxisPadding})`,
                )
                .call(xSubAxis);
        }
    }

    /**
     * Draws the area that is going to represent the data
     *
     * @return {void}
     */
    function drawArea() {
        if (brushArea) {
            svg.selectAll('.brush-area').remove();
            svg.selectAll('.missing-brush-area').remove();
        }

        // Create and configure the area generator
        brushArea = area()
            .defined(({ value }) => !isNaN(parseInt(value, 10)))
            .x(({ date }) => xScale(date))
            .y0(chartHeight)
            .y1(({ value }) => yScale(value))
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
    function drawBrush() {
        chartBrush = svg.select('.brush-group').call(brush);

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
    function drawHandles() {
        let handleFillColor = colorHelper.colorSchemasHuman.grey[1];

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
    function drawHorizontalExtendedLine() {
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
    function drawLoadingState() {
        svg.select('.loading-state-group').html(brushLoadingMarkup);
    }

    /**
     * When a brush event starts, we can extract info from the extension
     * of the brush.
     *
     * @return {void}
     */
    function handleBrushStart(event) {
        const selection = event.selection;
        let newSelection;

        if (!selection) {
            return;
        }

        if (isLocked) {
            const lockedSelectionSize = Math.floor(
                xScale(new Date(dateRange[1])) - xScale(new Date(dateRange[0])),
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
            newSelection.map(xScale.invert),
        );
    }

    /**
     * Processes the end brush event, snapping the boundaries to days
     * as showed on the example on https://bl.ocks.org/mbostock/6232537
     * @return {void}
     * @private
     */
    function handleBrushEnd(event) {
        if (!event.sourceEvent) {
            return; // Only transition after input.
        }

        let dateExtentRounded = [null, null];
        const selection = event.selection;

        if (selection) {
            let dateExtent = selection.map(xScale.invert);

            dateExtentRounded = dateExtent.map(
                timeIntervals[roundingTimeInterval].round,
            );

            // If empty when rounded, use floor & ceil instead.
            if (dateExtentRounded[0] >= dateExtentRounded[1]) {
                dateExtentRounded[0] = timeIntervals[
                    roundingTimeInterval
                ].floor(dateExtent[0]);
                dateExtentRounded[1] = timeIntervals[
                    roundingTimeInterval
                ].offset(dateExtentRounded[0]);
            }

            select(this)
                .transition()
                .call(event.target.move, dateExtentRounded.map(xScale));
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
    function setBrushByDates(dateA, dateB) {
        let selection = null;

        if (dateA !== null) {
            if (new Date(dateA) < new Date(dateB)) {
                selection = [xScale(new Date(dateA)), xScale(new Date(dateB))];
            } else {
                // eslint-disable-next-line no-console
                console.error(
                    'dateRange Error: End date should be posterior to startDate!',
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
    exports.animationDuration = function (_x) {
        if (!arguments.length) {
            return animationDuration;
        }
        animationDuration = _x;

        return this;
    };

    /**
     * Gets or Sets the area curve of the stacked area.
     * @param {String} [_x='basis']     Desired curve for the area. Other options are:
     * monotoneX, natural, linear, monotoneY, step, stepAfter, stepBefore, cardinal, and
     * catmullRom. Visit https://github.com/d3/d3-shape#curves for more information.
     * @return {String | module}            Current area curve setting or Chart module to chain calls
     * @public
     * @example brushChart.areaCurve('step')
     */
    exports.areaCurve = function (_x) {
        if (!arguments.length) {
            return areaCurve;
        }
        areaCurve = _x;

        return this;
    };

    /**
     * Exposes the constants to be used to force the x axis to respect a certain granularity
     * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     * @example
     *     brush.xAxisCustomFormat(brush.axisTimeCombinations.HOUR_DAY)
     */
    exports.axisTimeCombinations = axisTimeCombinations;

    /**
     * Gets or Sets the dateRange for the selected part of the brush
     * @param  {String[]} [_x=[null, null]]     Desired dateRange for the graph
     * @return { dateRange | module}            Current dateRange or Chart module to chain calls
     * @public
     */
    exports.dateRange = function (_x) {
        if (!arguments.length) {
            return dateRange;
        }
        dateRange = _x;

        if (Array.isArray(dateRange)) {
            setBrushByDates(...dateRange);
        }

        return this;
    };

    /**
     * Gets or Sets the gradient of the chart
     * @param  {String[]} [_x=colorHelper.colorGradients.greenBlue]    Desired gradient for the graph
     * @return {String | Module}    Current gradient or Chart module to chain calls
     * @public
     */
    exports.gradient = function (_x) {
        if (!arguments.length) {
            return gradient;
        }
        gradient = _x;

        return this;
    };

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x          Desired width for the graph
     * @return {Number | Module}    Current height or Chart module to chain calls
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
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * @param  {Boolean} _x = false     Desired animation flag
     * @return {Boolean | module}       Current isAnimated flag or Chart module
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
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls
     * @public
     */
    exports.isLoading = function (_flag) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    };

    /**
     * Gets or Sets the isLocked property of the brush, enforcing the initial brush size set with dateRange
     * @param  {Boolean} _x = false     Whether the brush window is locked, requires a value set with '.dateRange` when true
     * @return {Boolean | module}       Current isLocked flag or Chart module
     * @public
     */
    exports.isLocked = function (_x) {
        if (!arguments.length) {
            return isLocked;
        }
        isLocked = _x;

        return this;
    };

    /**
     * Pass language tag for the tooltip to localize the date.
     * Feature uses Intl.DateTimeFormat, for compatability and support, refer to
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param  {String} _x              Must be a language tag (BCP 47) like 'en-US' or 'fr-FR'
     * @return { (String|Module) }      Current locale or module to chain calls
     */
    exports.locale = function (_x) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    };

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return {Object | Module}    Current margin or Chart module to chain calls
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
    exports.on = function () {
        let value = dispatcher.on.apply(dispatcher, arguments);

        return value === dispatcher ? exports : value;
    };

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x          Desired width for the graph
     * @return {Number | Module}    Current width or Chart module to chain calls
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
     * Exposes the ability to force the chart to show a certain x format
     * It requires a `xAxisFormat` of 'custom' in order to work.
     * @param  {String} _x              Desired format for x axis, one of the d3.js date formats [here]{@link https://github.com/d3/d3-time-format#locale_format}
     * @return {String | Module}        Current format or module to chain calls
     * @public
     */
    exports.xAxisCustomFormat = function (_x) {
        if (!arguments.length) {
            return xAxisCustomFormat;
        }
        xAxisCustomFormat = _x;

        return this;
    };

    /**
     * Exposes the ability to force the chart to show a certain x axis grouping
     * @param  {String} _x          Desired format, a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR)
     * Set it to 'custom' to make use of specific formats with xAxisCustomFormat
     * @return { String|Module }      Current format or module to chain calls
     * @public
     * @example
     *     brushChart.xAxisCustomFormat(brushChart.axisTimeCombinations.HOUR_DAY)
     */
    exports.xAxisFormat = function (_x) {
        if (!arguments.length) {
            return xAxisFormat;
        }
        xAxisFormat = _x;

        return this;
    };

    /**
     * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisCustomFormat` of 'custom' in order to work.
     * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
     * how many and where the ticks will appear.
     *
     * @param  {Number} [_x=null]       Desired number of x axis ticks (multiple of 2, 5 or 10)
     * @return {Number | Module}        Current number or ticks or module to chain calls
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
    exports.roundingTimeInterval = function (_x) {
        if (!arguments.length) {
            return roundingTimeInterval;
        }
        roundingTimeInterval = _x;

        return this;
    };

    return exports;
}
