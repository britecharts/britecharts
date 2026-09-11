// R4 · one component's UMD build, through the bundler's CommonJS interop.
import Donut from '@britecharts/react/dist/umd/charts/Donut.js';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';
import { donutData } from './data.js';
import { mount } from './mount.jsx';

mount(
    <div className="donut-container">
        <Donut data={donutData} width={300} height={300} />
    </div>
);
