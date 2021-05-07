import { select } from 'd3-selection';
import colors from './../../../src/charts/helpers/color';

const selectClass = 'form-control';

/**
 * Creates a color schema selector
 * @param  {String}   selectContainerSelector   CSS DOM selector for the select box root
 * @param  {String}   chartSelector             CSS DOM selector of the chart to render
 * @param  {Function} callback                  Optional callback to execute after color change
 * @return {void}
 */
function createColorSelector(selectContainerSelector, chartSelector, callback) {
    const colorKeys = Object.keys(colors.colorSchemas);
    const containerSelector = document.querySelector(selectContainerSelector);

    if (!containerSelector) {
        return;
    }

    // Create Select
    let sel = document.createElement('select');

    sel.className += ' ' + selectClass;

    // And fill with options
    colorKeys.forEach(function (key) {
        let opt = document.createElement('option');

        opt.value = key;
        opt.text = colors.colorSchemasHuman[key];
        sel.add(opt);
    });

    // Add it to the DOM
    containerSelector.appendChild(sel);

    // Listen for changes
    select(sel).on('change', function () {
        // Get new color schema
        let newSchema = colors.colorSchemas[this.value];

        select(chartSelector).remove();

        // Draw
        if (callback) {
            callback(newSchema);
        }
    });
}

export default {
    createColorSelector,
};
