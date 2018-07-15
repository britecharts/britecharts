define(function (require) {
    'use strict';

    const d3Selection = require('d3-selection');

    /**
     * @typedef HeatmapData
     * @type {Array[]}
     * @property {Number} week
     * @property {Number} day
     * @property {Number} value
     *
     * @example
     * [
     *     [
     *         0, 0, 7
     *     ],
     *     [
     *         0, 1, 0
     *     ],
     * ]
     */

    /**
     * Reusable Heatmap API module that renders a
     * simple and configurable heatmap chart.
     *
     * @module Heatmap
     * @tutorial heatmap
     * @requires *TOFILL
     *
     * @example
     * let heatmap = heatmap();
     *
     * heatmap
     *     .width(500);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset)
     *     .call(heatmap);
     */
    return function module() {

        let margin = {
                top: 30,
                right: 10,
                bottom: 10,
                left: 30
            },
            width = 960,
            height = 500,
            svg,
            data,
            chartWidth,
            chartHeight;

        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {HeatmapData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function (_data) {
                data = cleanData(_data);

                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;

                // buildScales();
                buildSVG(this);
                // buildAxis();
                // drawAxis();
            });
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @return {void}
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                    .append('svg')
                    .classed('britechart heatmap', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * Also applies the Margin convention
         * @return {void}
         * @private
         */
        function buildContainerGroups() {
            let container = svg
                .append('g')
                .classed('container-group', true)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            container
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('axis-group', true);
            container
                .append('g').classed('metadata-group', true);
        }

        /**
         * Cleaning data casting the values to the proper
         * type while keeping the rest of properties on the data. It
         * also creates a set of zeroed data (for animation purposes)
         * @param   {HeatmapData} originalData  Raw data as passed to the container
         * @return  {HeatmapData}               Clean data
         * @private
         */
        function cleanData(originalData) {
            return originalData;
        }

        return exports;
    };
});
