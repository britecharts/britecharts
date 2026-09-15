import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ScatterPlotWrapper } from '@britecharts/wrappers';

class ScatterPlot extends Component {
    static propTypes = {
        /**
         * Internally used, do not overwrite.
         */
        data: PropTypes.arrayOf(PropTypes.any),

        /**
         * Gets or Sets the duration of the animation
         */
        animationDuration: PropTypes.number,

        /**
         * Gets or Sets each circle's border opacity value of the chart.
         * It makes each circle border transparent if it's less than 1.
         */
        circleStrokeOpacity: PropTypes.number,

        /**
         * Gets or Sets each circle's border width value of the chart.
         */
        circleStrokeWidth: PropTypes.number,

        /**
         * Gets or Sets the circles opacity value of the chart.
         * It makes the area of each data point more transparent if it's less than 1.
         */
        circleOpacity: PropTypes.number,

        /**
         * Current colorMap or Chart module to chain calls
         */
        colorMap: PropTypes.object,

        /**
         * Gets or Sets the colorSchema of the chart
         */
        colorSchema: PropTypes.arrayOf(PropTypes.string),

        /**
         * Gets or Sets whether the chart supports zoom controls. `false` by default.
         * If `true`, zoom event handling will be added to the chart.
         */
        enableZoom: PropTypes.bool,

        /**
         * Gets or Sets the grid mode: 'vertical', 'horizontal' or 'full'
         */
        grid: PropTypes.string,

        /**
         * Gets or Sets the hasCrossHairs status. If true, the hovered data point
         * will be highlighted with lines and legend from both x and y axis.
         */
        hasCrossHairs: PropTypes.bool,

        /**
         * Gets or Sets the hasHollowCircles value of the chart area
         */
        hasHollowCircles: PropTypes.bool,

        /**
         * Gets or Sets the hasTrendline value of the chart area. If true, the
         * trendline calculated based off the linear regression formula will be drawn
         */
        hasTrendline: PropTypes.bool,

        /**
         * Gets or Sets the height of the chart
         */
        height: PropTypes.number,

        /**
         * Sets a custom distance between the legend values and both axes.
         * The legends show up when hasCrossHairs is true.
         */
        highlightTextLegendOffset: PropTypes.number,

        /**
         * Gets or Sets the isAnimated property of the chart, making it to animate
         * when render. By default this is 'false'
         */
        isAnimated: PropTypes.bool,

        /**
         * Current loading state flag or Chart module to chain calls
         */
        isLoading: PropTypes.bool,

        /**
         * Gets or Sets the margin of the chart
         */
        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
        }),

        /**
         * Gets or Sets the maximum area of a circle in the chart
         */
        maxCircleArea: PropTypes.number,

        /**
         * Current locale object or Chart module to chain calls
         */
        valueLocale: PropTypes.object,

        /**
         * Gets or Sets the width of the chart
         */
        width: PropTypes.number,

        /**
         * Exposes the ability to set the format of the x-axis values
         */
        xAxisFormat: PropTypes.string,

        /**
         * Exposes the ability to set the formatter of the x-axis values.
         * The `timeFormat` formatter function is applied if a custom `xAxisFormatType`
         * that is not equal to 'number' is provided
         */
        xAxisFormatType: PropTypes.string,

        /**
         * Gets or Sets the xAxisLabel of the chart
         */
        xAxisLabel: PropTypes.string,

        /**
         * Gets or Sets the offset of the xAxisLabel of the chart
         */
        xAxisLabelOffset: PropTypes.number,

        /**
         * Gets or Sets the number of ticks of the x axis on the chart
         */
        xTicks: PropTypes.number,

        /**
         * Exposes the ability to set the format of the y-axis values
         */
        yAxisFormat: PropTypes.string,

        /**
         * Gets or Sets the yAxisLabel of the chart
         */
        yAxisLabel: PropTypes.string,

        /**
         * Gets or Sets the offset of the yAxisLabel of the chart
         */
        yAxisLabelOffset: PropTypes.number,

        /**
         * Gets or Sets the number of ticks of the y axis on the chart
         */
        yTicks: PropTypes.number,

        customMouseOver: PropTypes.func,
        customMouseMove: PropTypes.func,
        customMouseOut: PropTypes.func,
        customClick: PropTypes.func,

        /**
         * Internally used, do not overwrite.
         *
         * @ignore
         */
        chart: PropTypes.object,

        /**
         * Internally used, do not overwrite.
         *
         * @ignore
         */
        createTooltip: PropTypes.func,
    };

    static defaultProps = {
        chart: ScatterPlotWrapper,
        createTooltip: () => null,
    };

    constructor(props) {
        super(props);

        this.setRef = this.setRef.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;

        if (data !== null) {
            this.createChart();
        }
    }

    componentDidUpdate() {
        const { createTooltip } = this.props;

        if (!this.chart) {
            this.createChart();
        } else {
            this.updateChart();
            createTooltip();
        }
    }

    componentWillUnmount() {
        const { chart } = this.props;

        chart.destroy(this.rootNode);
    }

    /**
     * We want to remove the chart and data from the props in order to have a configuration object
     * @return {Object} Configuration object for the chart
     */
    getChartConfiguration() {
        const configuration = { ...this.props };

        delete configuration.data;
        delete configuration.chart;
        delete configuration.createTooltip;

        return configuration;
    }

    setRef(componentNode) {
        this.rootNode = componentNode;
    }

    createChart() {
        const { chart, data } = this.props;

        this.chart = chart.create(
            this.rootNode,
            data,
            this.getChartConfiguration()
        );
    }

    updateChart() {
        const { chart, data } = this.props;

        chart.update(
            this.rootNode,
            data,
            this.getChartConfiguration(),
            this.chart
        );
    }

    render() {
        return <div className="scatter-plot-container" ref={this.setRef} />;
    }
}

export default ScatterPlot;
