import { bar, line, tooltip } from '@britecharts/core';
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
    bar()
        .width(container.getBoundingClientRect().width)
        .height(300)
        .a11yTitle('Uses of each word')
        .tooltip(tooltip().title('Uses').numberFormat('d'))
        .render(container, barData);
}

function drawLine(container) {
    // The chart connects its tooltip and draws it on the hovered date
    line()
        .width(container.getBoundingClientRect().width)
        .height(300)
        .grid('horizontal')
        .a11yTitle('Uses over a week')
        .tooltip(tooltip().title('Uses'))
        .render(container, lineData);
}

drawBar(document.getElementById('bar'));
drawLine(document.getElementById('line'));

// The charts take their colours from the page's color-scheme
const themeButton = document.getElementById('theme');

themeButton.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');

    themeButton.textContent = isDark ? 'Light mode' : 'Dark mode';
});
