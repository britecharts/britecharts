// C5 · the package's `module` entry: ES modules, tree-shakeable.
import { select } from 'd3-selection';
import { bar } from '@britecharts/core';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';
import { drawBar } from './draw.js';

drawBar(bar, select('.bar-container'));
