import colors from './color';

import { getCleanContainer } from '../../../.storybook/helpers';

export const ColorSchemas = () => {
    const container = getCleanContainer();
    const { colorSchemas } = colors;

    Object.keys(colorSchemas).forEach((colorPalette) => {
        const className = `js-palette-${colorPalette}`;
        const wrapper = document.createElement('div');
        wrapper.classList = className;
        container.appendChild(wrapper);
        const paletteDiv = document.getElementsByClassName(className)[0];
        paletteDiv.style.display = 'flex';
        paletteDiv.style['margin-bottom'] = '20px';

        colorSchemas[colorPalette].forEach((color) => {
            const div = document.createElement('div');

            div.style.width = '100px';
            div.style.height = '100px';
            div.style.background = color;
            paletteDiv.appendChild(div);
        });
    });

    return container;
};

export const ColorGradients = () => {
    const container = getCleanContainer();
    const { colorGradients } = colors;

    Object.keys(colorGradients).forEach((colorGradient) => {
        const className = `js-gradient-${colorGradient}`;
        const wrapper = document.createElement('div');
        wrapper.classList = className;
        container.appendChild(wrapper);
        const gradientDiv = document.getElementsByClassName(className)[0];
        gradientDiv.style.display = 'flex';
        gradientDiv.style['margin-bottom'] = '20px';

        const [gradientStartColor, gradientEndColor] =
            colorGradients[colorGradient];

        const div = document.createElement('div');

        div.style.width = '900px';
        div.style.height = '100px';
        div.style.background = `linear-gradient(to right, ${gradientStartColor} 0%, ${gradientEndColor} 100%)`;

        gradientDiv.appendChild(div);
    });

    return container;
};

export const SingleColors = () => {
    const container = getCleanContainer();
    const { singleColors } = colors;
    const className = `js-single-color-container`;
    const wrapper = document.createElement('div');
    wrapper.classList = className;
    container.appendChild(wrapper);

    const colorsDiv = document.getElementsByClassName(
        'js-single-color-container'
    )[0];
    colorsDiv.style.display = 'flex';

    Object.keys(singleColors).forEach((singleColor) => {
        const div = document.createElement('div');

        div.style.width = '100px';
        div.style.height = '100px';
        div.style.background = singleColors[singleColor];

        colorsDiv.appendChild(div);
    });

    return container;
};

export default { title: 'Charts/Colors' };
