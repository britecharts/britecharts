import React from 'react';
import PropTypes from 'prop-types';
import stackedBar from './stackedBarChart';

class StackedBar extends React.Component {
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
         * Gets or Sets the padding of the stacked bar chart
         */
        betweenBarsPadding: PropTypes.number,

        /**
         * Current colorMap or Chart module to chain calls
         */
        colorMap: PropTypes.object,

        /**
         * Gets or Sets the colorSchema of the chart
         */
        colorSchema: PropTypes.arrayOf(PropTypes.string),

        /**
         * Chart exported to png and a download action is fired
         */
        exportChart: PropTypes.func,

        /**
         * Gets or Sets the grid mode.
         */
        grid: PropTypes.string,

        /**
         * Gets or Sets the hasPercentage status
         */
        hasPercentage: PropTypes.bool,

        /**
         * Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks.
         */
        hasReversedStacks: PropTypes.bool,

        /**
         * Gets or Sets the height of the chart
         */
        height: PropTypes.number,

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
         * Gets or Sets the nameLabelFormat of the chart
         */
        nameLabelFormat: PropTypes.arrayOf(PropTypes.string),

        /**
         * Configurable extension of the x axis
         * If your max point was 50% you might want to show x axis to 60%, pass 1.2
         */
        percentageAxisToMaxRatio: PropTypes.number,

        /**
         * Gets or Sets the stackLabel of the chart
         */
        stackLabel: PropTypes.string,

        /**
         * Gets or Sets the minimum width of the graph in order
         * to show the tooltip NOTE: This could also depend on the aspect ratio
         */
        tooltipThreshold: PropTypes.number,

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
         * Exposes the ability to force the chart to show a certain x ticks. It
         * requires a `xAxisFormat` of 'custom' in order to work. NOTE: This
         * value needs to be a multiple of 2, 5 or 10. They won't always work
         * as expected, as D3 decides at the end how many and where the ticks will appear.
         */
        xTicks: PropTypes.number,

        /**
         * Gets or Sets the y-axis label of the chart
         */
        yAxisLabel: PropTypes.string,

        /**
         * Gets or Sets the offset of the yAxisLabel of the chart. The method accepts both positive and negative values. The default value is -60
         */
        yAxisLabelOffset: PropTypes.number,

        /**
         * Gets or Sets the number of ticks of the y axis on the chart (Default is 5)
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
        chart: stackedBar,
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
        return <div className="stacked-bar-container" ref={this.setRef} />;
    }
}

export default StackedBar;
