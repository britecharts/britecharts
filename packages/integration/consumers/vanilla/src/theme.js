// T · one bar chart per colour scheme, drawn from the package's ES module
// entry. tests/theme.spec.js reads the colours each resolves to.
import { selectAll } from 'd3-selection';
import { bar } from '@britecharts/core';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

const data = [
    { name: 'Luminous', value: 2 },
    { name: 'Glittering', value: 5 },
];

selectAll('.theme-chart').each(function () {
    selectAll([this]).datum(data).call(bar().width(400).height(200));
});
