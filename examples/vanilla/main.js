import { select } from 'd3-selection';
import { bar, line, miniTooltip, tooltip } from '@britecharts/core';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

const words = ['Shiny', 'Blazing', 'Glittering', 'Radiant', 'Sunny'];

const barData = words.map((name, i) => ({
    name,
    value: [12, 31, 18, 24, 15][i],
}));

// The line chart takes one row per point: `name` identifies the line and
// `topicName` labels it
const days = [
    '2026-10-19',
    '2026-10-20',
    '2026-10-21',
    '2026-10-22',
    '2026-10-23',
];
const lineData = {
    data: ['Blazing', 'Radiant'].flatMap((topicName, line) =>
        days.map((date, i) => ({
            date,
            name: line + 1,
            topicName,
            value: [
                [4, 7, 6, 9, 8],
                [3, 4, 6, 5, 7],
            ][line][i],
        }))
    ),
};

function drawBar(container) {
    const chart = bar()
        .width(container.getBoundingClientRect().width)
        .height(300)
        .a11yTitle('Uses of each word');
    const chartTooltip = miniTooltip().title('Uses').numberFormat('d');

    chart
        .on('customMouseOver', chartTooltip.show)
        .on('customMouseMove', chartTooltip.update)
        .on('customMouseOut', chartTooltip.hide);

    select(container).datum(barData).call(chart);
    select(container).select('.metadata-group').datum([]).call(chartTooltip);
}

function drawLine(container) {
    const chart = line()
        .width(container.getBoundingClientRect().width)
        .height(300)
        .grid('horizontal')
        .a11yTitle('Uses over a week');
    // The line chart sends the hovered date's values under `topics`
    const chartTooltip = tooltip().title('Uses').topicLabel('topics');

    chart
        .on('customMouseOver', chartTooltip.show)
        .on('customMouseMove', chartTooltip.update)
        .on('customMouseOut', chartTooltip.hide);

    select(container).datum(lineData).call(chart);
    select(container)
        .select('.metadata-group .hover-marker')
        .datum([])
        .call(chartTooltip);
}

drawBar(document.getElementById('bar'));
drawLine(document.getElementById('line'));

// The charts take their colours from the page's color-scheme
const themeButton = document.getElementById('theme');

themeButton.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');

    themeButton.textContent = isDark ? 'Light mode' : 'Dark mode';
});
