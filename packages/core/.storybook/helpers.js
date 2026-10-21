export const getCleanContainer = () => {
    const result = document.querySelector('.container');
    const wrapper = document.createElement('div');
    wrapper.classList = 'chart-container';

    result.innerHTML = '';
    result.appendChild(wrapper);

    return wrapper;
};

/**
 * Adds two buttons under the story's chart, inside its card, that download
 * it through the chart's `exportChart`: as a png, and as an svg. Call it after
 * the chart has drawn, so the export has an svg to read.
 *
 * @param container The element getCleanContainer returned, holding the chart
 * @param chart     The chart instance the story drew
 * @param filename  The downloaded file's name, without its extension
 */
export const addExportButtons = (container, chart, filename) => {
    const toolbar = document.createElement('div');

    toolbar.className = 'export-buttons';

    [
        ['png', 'Export as PNG'],
        ['svg', 'Export as SVG'],
    ].forEach(([extension, label]) => {
        const button = document.createElement('button');

        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', () =>
            chart.exportChart(`${filename}.${extension}`)
        );
        toolbar.appendChild(button);
    });

    container.appendChild(toolbar);
};
