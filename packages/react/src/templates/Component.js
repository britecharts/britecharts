/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {{camelCase componentName}} from './{{camelCase componentName}}Chart';

class {{pascalCase componentName}} extends React.Component {

    static propTypes = {
        /**
         * Internally used, do not overwrite.
         */
        data: PropTypes.arrayOf(PropTypes.any),

        /**
         * TODO: Add your propTypes here!
         */
        /**
         *
         */
        : PropTypes.,

        customMouseOver: PropTypes.func,
        customMouseMove: PropTypes.func,
        customMouseOut: PropTypes.func,

        /**
         * Internally used, do not overwrite.
         *
         * @ignore
         */
        chart: PropTypes.object,
    }

    static defaultProps = {
        chart: {{camelCase componentName}},
        createTooltip: () => null,
    }

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
            this.props.createTooltip();
        }
    }

    componentWillUnmount() {
        chart.destroy(this.rootNode);
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

    /**
     * We want to remove the chart and data from the props in order to have a configuration object
     * @return {Object} Configuration object for the chart
     */
    getChartConfiguration() {
        let configuration = {...this.props};

        delete configuration.data;
        delete configuration.chart;
        delete configuration.createTooltip;

        return configuration;
    }

    setRef(componentNode) {
        this.rootNode = componentNode;
    }

    render() {
        return <div className="{{dashCase componentName}}-container" ref={this.setRef} />;
    }
}

export default {{pascalCase componentName}};
