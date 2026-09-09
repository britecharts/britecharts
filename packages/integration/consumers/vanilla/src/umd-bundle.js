// C3 · the package's `main`: the UMD bundle, d3 externalised and resolved
// from the package's own dependencies. CSS bundle imported from dist/.
import { select } from 'd3-selection';
import britecharts from '@britecharts/core/dist/umd/bundle/core.bundled.min.js';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';
import { drawBar } from './draw.js';

drawBar(britecharts.bar, select('.bar-container'));
