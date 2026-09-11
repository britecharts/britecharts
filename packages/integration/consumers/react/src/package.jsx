// R1/R2 · the package entry. With the exports map every bundler condition
// resolves to the UMD bundle, so named imports go through CommonJS interop.
import { Donut, Line, axisTimeCombinations } from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';
import { donutData, lineData } from './data.js';
import { mount } from './mount.jsx';

mount(
    <>
        <div className="donut-container">
            <Donut data={donutData} width={300} height={300} />
        </div>
        <div className="line-container">
            <Line
                data={lineData}
                xAxisFormat={axisTimeCombinations.HOUR_DAY}
                margin={{ bottom: 60 }}
                width={600}
                height={300}
            />
        </div>
    </>
);
