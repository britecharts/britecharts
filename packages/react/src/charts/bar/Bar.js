import React, { Component } from 'react';
import PropTypes from 'prop-types';

import bar from './barChart';

class Bar extends Component {
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
         * Gets or Sets the padding of the chart
         */
        betweenBarsPadding: PropTypes.number,

        /**
         * Gets or Sets the gradient colors of a bar in the chart
         */
        chartGradient: PropTypes.arrayOf(PropTypes.string),

        /**
         * Current colorMap or Chart module to chain calls
         */
        colorMap: PropTypes.object,

        /**
         * Gets or Sets the colorSchema of the chart
         */
        colorSchema: PropTypes.arrayOf(PropTypes.string),

        /**
         * If true, adds labels at the end of the bars
         */
        enableLabels: PropTypes.bool,

        /**
         * Gets or Sets the hasPercentage status
         */
        hasPercentage: PropTypes.bool,

        /**
         * Gets or Sets the hasSingleBarHighlight status. If the value is true (default), only the hovered bar is considered to be highlighted and will be darkened by default. If the value is false, all the bars but the hovered bar are considered to be highlighted and will be darkened (by default). To customize the bar highlight or remove it completely, use highlightBarFunction instead.
         */
        hasSingleBarHighlight: PropTypes.bool,

        /**
         * Gets or Sets the height of the chart
         */
        height: PropTypes.number,

        /**
         * Gets or Sets the highlightBarFunction function. The callback passed to this function returns a bar selection from the bar chart. Use this function if you want to apply a custom behavior to the highlighted bar on hover. When hasSingleBarHighlight is true the highlighted bar will be the one that was hovered by the user. When hasSingleBarHighlight is false the highlighted bars are all the bars but the hovered one. The default highlight effect on a bar is darkening the highlighted bar(s) color.
         */
        highlightBarFunction: PropTypes.func,

        /**
         * Gets or Sets the isAnimated property of the chart, making it to animate
         * when render. By default this is 'false'
         */
        isAnimated: PropTypes.bool,

        /**
         * Gets or Sets the horizontal direction of the chart
         */
        isHorizontal: PropTypes.bool,

        /**
         * Current loading state flag or Chart module to chain calls
         */
        isLoading: PropTypes.bool,

        /**
         * Offset between end of bar and start of the percentage bars
         */
        labelsMargin: PropTypes.number,

        /**
         * Gets or Sets the labels number format
         */
        labelsNumberFormat: PropTypes.string,

        /**
         * Get or Sets the labels text size
         */
        labelsSize: PropTypes.number,

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
         * Gets or Sets the nameLabel of the chart
         */
        nameLabel: PropTypes.number,

        /**
         * Gets or Sets the number format of the bar chart
         */
        numberFormat: PropTypes.string,

        /**
         * Changes the order of items given the custom function
         */
        orderingFunction: PropTypes.func,

        /**
         * Configurable extension of the x axis if your max point was 50%
         * you might want to show x axis to 60%, pass 1.2
         */
        percentageAxisToMaxRatio: PropTypes.number,

        /**
         * Gets or Sets whether the color list should be reversed or not
         */
        shouldReverseColorList: PropTypes.bool,

        /**
         * Gets or Sets the valueLabel of the chart
         */
        valueLabel: PropTypes.number,

        /**
         * Current locale object or Chart module to chain calls
         */
        valueLocale: PropTypes.object,

        /**
         * Gets or Sets the width of the chart
         */
        width: PropTypes.number,

        /**
         * Label or Chart module to chain calls
         */
        xAxisLabel: PropTypes.string,

        /**
         * Gets or Sets the offset of the xAxisLabel on the chart
         */
        xAxisLabelOffset: PropTypes.number,

        /**
         * Gets or Sets the number of ticks of the x axis on the chart (Default is 5)
         */
        xTicks: PropTypes.number,

        /**
         * Label or Chart module to chain calls
         */
        yAxisLabel: PropTypes.string,

        /**
         * Gets or Sets the offset of the xAxisLabel on the chart
         */
        yAxisLabelOffset: PropTypes.number,

        /**
         * Space between y axis and chart (Default 10)
         */
        yAxisPaddingBetweenChart: PropTypes.number,

        /**
         * Gets or Sets the number of vertical ticks on the chart (Default is 6)
         */
        yTicks: PropTypes.number,

        customMouseOver: PropTypes.func,
        customMouseMove: PropTypes.func,
        customMouseOut: PropTypes.func,

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
        chart: bar,
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
        return <div className="bar-container" ref={this.setRef} />;
    }
}

export default Bar;
