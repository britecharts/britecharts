// B · a brush drawn from the package's ES module entry. tests/brush.spec.js
// drags windows across it, and reads how many times it reported a selection.
import { select } from 'd3-selection';
import { brush } from '@britecharts/core';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

// Thirty days, one value each
const data = Array.from({ length: 30 }, (_, day) => ({
    date: new Date(Date.UTC(2020, 0, day + 1)).toISOString(),
    value: 10 + ((day * 7) % 13),
}));

window.brushEnds = [];

const chart = brush()
    .width(600)
    .height(150)
    .on('customBrushEnd', (range) => window.brushEnds.push(range));

select('.brush-chart').datum(data).call(chart);
