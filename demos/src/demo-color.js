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

function createGradients() {
    const { colorGradients } = colors;

    Object.keys(colorGradients).forEach(colorGradient => {
        const gradientDiv = document.getElementById(`js-gradient-${colorGradient}`);

        gradientDiv.style.display = 'flex';

        let [gradientStartColor, gradientEndColor] = colorGradients[colorGradient];
        const div = document.createElement('div');

        div.style.width = '900px';
        div.style.height = '100px';
        div.style.background = `linear-gradient(to right, ${gradientStartColor} 0%, ${gradientEndColor} 100%)`;

        gradientDiv.appendChild(div);
    });
}

function createSingleColors() {
    const { singleColors } = colors;
    const colorsDiv = document.getElementsByClassName('js-single-color-container')[0];

    colorsDiv.style.display = 'flex';

    Object.keys(singleColors).forEach(singleColor => {
        const div = document.createElement('div');

        div.style.width = '100px';
        div.style.height = '100px';
        div.style.background = singleColors[singleColor];

        colorsDiv.appendChild(div);
    });
}

if (d3Selection.select('.js-color-container').node()) {
    createColors();
    createGradients();
    createSingleColors();
}
