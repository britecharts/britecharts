define(function(require) {

    var d3 = require('d3'),
        colors = require('./../../src/charts/helpers/colors'),

        selectClass = 'form-control';

    /**
     * Creates a color schema selector
     * @param  {String}   selectContainerSelector   CSS DOM selector for the select box root
     * @param  {String}   chartSelector             CSS DOM selector of the chart to render
     * @param  {Function} callback                  Optional callback to execute after color change
     * @return {void}
     */
    function createColorSelector(selectContainerSelector, chartSelector, callback) {
        var colorKeys = Object.keys(colors.colorSchemas);
        var containerSelector = document.querySelector(selectContainerSelector);

        if (!containerSelector) { return; }

        // Create Select
        var sel = document.createElement("select")
            sel.className += ' ' + selectClass;

        // And fill with options
        colorKeys.forEach(function(key, i) {
                var opt = document.createElement("option");

                opt.value = key;
                opt.text = colors.colorSchemasHuman[key];
                sel.add(opt);
            });

        // Add it to the DOM
        containerSelector.append(sel);

        // Listen for changes
        d3.select(sel)
            .on('change', function() {
                // Get new color schema
                var newSchema = colors.colorSchemas[this.value];

                d3.select(chartSelector).remove();

                // Draw
                if (callback) {
                    callback(newSchema);
                }
            });
    }

    return {
        createColorSelector: createColorSelector
    };
});
