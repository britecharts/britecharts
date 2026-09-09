// C6 · one chart's ES module, imported by its source path.
import { select } from 'd3-selection';
import bar from '@britecharts/core/src/charts/bar/bar.js';
import '@britecharts/core/dist/styles/charts/common.css';
import '@britecharts/core/dist/styles/charts/bar.css';
import { drawBar } from './draw.js';

drawBar(bar, select('.bar-container'));
