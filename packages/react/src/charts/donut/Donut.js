import React, { Component } from 'react';
import PropTypes from 'prop-types';

import donut from './donutChart';

export default class Donut extends Component {
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
         * Gets or Sets the centeredTextFunction of the chart. If function is provided the format will be changed by the custom function's value format. The default format function value is "${d.percentage}% ${d.name}". The callback will provide the data object with id, name, percentage, and quantity. Also provides the component added by the user in each data entry
         */
        centeredTextFunction: PropTypes.func,

        /**
         * Current colorMap or Chart module to chain calls
         */
        colorMap: PropTypes.object,

        /**
         * Gets or Sets the colorSchema of the chart
         */
        colorSchema: PropTypes.arrayOf(PropTypes.string),

        /**
         * Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity adds up to zero or there are no entries), the chart will render an empty slice with a given color (light gray by default)
         */
        emptyDataConfig: PropTypes.object,

        /**
         * Gets or Sets the externalRadius of the chart
         */
        externalRadius: PropTypes.number,

        /**
         * Gets or Sets the hasFixedHighlightedSlice property of the chart, making it
         * to highlight the selected slice id set with `highlightSliceById` all the time.
         */
        hasFixedHighlightedSlice: PropTypes.bool,

        /**
         * Gets or Sets the hasHoverAnimation property of the chart. By default, donut chart highlights the hovered slice. This property explicitly disables this hover behavior.
         */
        hasHoverAnimation: PropTypes.bool,

        /**
         * Gets or sets the hasLastHoverSliceHighlighted property.
         * If property is true, the last hovered slice will be highlighted after 'mouseout` event is triggered.
         * The last hovered slice will remain in highlight state. Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted are true, the latter property will override the former.
         */
        hasLastHoverSliceHighlighted: PropTypes.bool,

        /**
         * Gets or Sets the height of the chart
         */
        height: PropTypes.number,

        /**
         * Gets or Sets the id of the slice to highlight
         */
        highlightSliceById: PropTypes.number,

        /**
         * Gets or Sets the internalRadius of the chart
         */
        internalRadius: PropTypes.number,

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
         * Gets or Sets the number format of the donut chart
         */
        numberFormat: PropTypes.string,

        /**
         * Changes the order of items given custom function
         */
        orderingFunction: PropTypes.func,

        /**
         * Gets or Sets the percentage format for the percentage label
         */
        percentageFormat: PropTypes.string,

        /**
         * Gets or Sets the radiusHoverOffset of the chart
         */
        radiusHoverOffset: PropTypes.number,

        /**
         * Gets or Sets the width of the chart
         */
        width: PropTypes.number,

        customMouseOver: PropTypes.func,
        customMouseOut: PropTypes.func,
        customMouseMove: PropTypes.func,
        customClick: PropTypes.func,

        /**
         * Internally used, do not overwrite.
         */
        chart: PropTypes.object,
    };

    static defaultProps = {
        chart: donut,
        isAnimated: true,
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
        if (!this.chart) {
            this.createChart();
        } else {
            this.updateChart();
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
        return (
            <div
                className="donut-container"
                style={{ textAlign: 'center' }}
                ref={this.setRef}
            />
        );
    }
}
