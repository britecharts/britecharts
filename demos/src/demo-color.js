'use strict';

const d3Selection = require('d3-selection');
const colors = require('./../../src/charts/helpers/color');

function createColors() {
    const { colorSchemas } = colors;

    Object.keys(colorSchemas).forEach(colorPalette => {
        const paletteDiv = document.getElementById(`js-palette-${colorPalette}`);

        paletteDiv.style.display = 'flex';

        colorSchemas[colorPalette].forEach(color => {
            const div = document.createElement('div');

            div.style.width = '100px';
            div.style.height = '100px';
            div.style.background = color;
            paletteDiv.appendChild(div);
        });
    });
}

if (d3Selection.select('.js-color-container').node()) {
    createColors();
}
