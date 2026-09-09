// C4 · one chart's UMD build, plus the per-chart stylesheets.
import { select } from 'd3-selection';
import bar from '@britecharts/core/dist/umd/charts/bar.min.js';
import '@britecharts/core/dist/styles/charts/common.css';
import '@britecharts/core/dist/styles/charts/bar.css';
import { drawBar } from './draw.js';

drawBar(bar, select('.bar-container'));
