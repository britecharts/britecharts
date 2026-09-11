// R3 · one component's CommonJS build (module.exports.default is the class).
import Donut from '@britecharts/react/dist/cjs/charts/Donut.js';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';
import { donutData } from './data.js';
import { mount } from './mount.jsx';

mount(
    <div className="donut-container">
        <Donut data={donutData} width={300} height={300} />
    </div>
);
