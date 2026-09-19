// The charts every package-entry page draws, so the production page, the
// development-mode StrictMode page and the lifecycle page all check the same
// blocks. Named imports go through CommonJS interop: with the exports map
// every bundler condition resolves to the UMD bundle.
import {
    Donut,
    Line,
    ResponsiveContainer,
    Tooltip,
    axisTimeCombinations,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';
import { donutData, lineData } from './data.js';

const renderTooltipLine = (props) => (
    <Line
        margin={{ bottom: 60 }}
        xAxisFormat={axisTimeCombinations.HOUR_DAY}
        height={300}
        width={600}
        {...props}
    />
);

// The three blocks below exercise what the plain charts do not: a chart
// composed inside a Tooltip (the child is created through a render prop and
// the tooltip is re-injected after every update) and a chart sized by a
// ResponsiveContainer (which hands the chart its width after mount).

export const Blocks = () => (
    <>
        <div className="donut-container">
            <Donut data={donutData} width={300} height={300} />
        </div>
        <div className="line-container plain-line">
            <Line
                data={lineData}
                xAxisFormat={axisTimeCombinations.HOUR_DAY}
                margin={{ bottom: 60 }}
                width={600}
                height={300}
            />
        </div>
        <div className="tooltip-line">
            <Tooltip
                data={lineData}
                render={renderTooltipLine}
                title="Tooltip"
            />
        </div>
        <div className="responsive-line">
            <ResponsiveContainer
                render={({ width }) => (
                    <Line
                        data={lineData}
                        xAxisFormat={axisTimeCombinations.HOUR_DAY}
                        margin={{ bottom: 60 }}
                        width={width}
                        height={300}
                    />
                )}
            />
        </div>
    </>
);
