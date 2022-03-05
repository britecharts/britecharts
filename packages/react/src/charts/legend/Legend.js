import React from 'react';
import PropTypes from 'prop-types';
import legendChart from './legendChart';

export default class Legend extends React.Component {
    static propTypes = {
        /**
         * The data to be used by the chart
         */
        data: PropTypes.arrayOf(PropTypes.any).isRequired,

        /**
         * Clears all highlighted entries
         */
        clearHighlight: PropTypes.func,

        /**
         * Current colorMap or Chart module to chain calls
         */
        colorMap: PropTypes.object,

        /**
         * Gets or Sets the colorSchema of the chart
         */
        colorSchema: PropTypes.arrayOf(PropTypes.string),

        /**
         * Gets or Sets the height of the legend chart
         */
        height: PropTypes.number,

        /**
         * Command that highlights a line entry by fading the rest of lines
         */
        highlight: PropTypes.number,

        /**
         * Highlights a line entry by fading the rest of lines
         */
        highlightEntryById: PropTypes.number,

        /**
         * Gets or Sets the horizontal mode on the legend
         */
        isHorizontal: PropTypes.bool,

        /**
         * Gets or Sets the margin of the legend chart
         */
        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
        }),

        /**
         * Gets or Sets the margin ratio of the legend chart. Used to determine spacing between legend elements.
         */
        marginRatio: PropTypes.number,

        /**
         * Gets or Sets the markerSize of the legend chart. This markerSize will determine
         * the horizontal and vertical size of the colored marks added as color
         * identifiers for the chart's categories.
         */
        markerSize: PropTypes.number,

        /**
         * Gets or Sets the number format of the legend chart
         */
        numberFormat: PropTypes.string,

        /**
         * Gets or Sets the unit of the value
         */
        unit: PropTypes.string,

        /**
         * Gets or Sets the width of the chart
         */
        width: PropTypes.number,

        /**
         * Internally used, do not overwrite.
         *
         * @ignore
         */
        chart: PropTypes.object,
    };

    static defaultProps = {
        chart: legendChart,
    };

    constructor(props) {
        super(props);

        this.setRef = this.setRef.bind(this);
    }

    componentDidMount() {
        const { chart, data } = this.props;

        this.chart = chart.create(
            this.rootNode,
            data,
            this.getChartConfiguration()
        );
    }

    componentDidUpdate() {
        const { chart, data } = this.props;

        chart.update(
            this.rootNode,
            data,
            this.getChartConfiguration(),
            this.chart
        );
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

    render() {
        return <div className="legend-container" ref={this.setRef} />;
    }
}
