import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Donut from './Donut';
import Legend from '../legend/Legend';
import donutData from './donutChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/Donut',
    component: Donut,
} satisfies Meta<typeof Donut>;

// An id no slice has, which highlights none: an unset prop keeps the last one
const NO_SLICE = -1;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart.
 */
export const Playground: StoryFn<typeof Donut> = (args) => {
    const data = donutData.with6Slices();

    return <Donut {...args} data={data} />;
};

Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithAnimationAndLegend = () => {
    const data = donutData.with6Slices();
    const legendMargin = {
        top: 10,
        bottom: 10,
        left: 0,
        right: 30,
    };
    const width = 500;
    const [highlightedSlice, setHighlightedSlice] = React.useState<number>();

    const handleMouseOver = (data: { data: { id: number } }) => {
        setHighlightedSlice(data.data.id);
    };
    const handleMouseOut = () => {
        setHighlightedSlice(99999);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Donut
                data={data}
                height={width}
                width={width}
                externalRadius={width / 2.5}
                internalRadius={width / 5}
                isAnimated={true}
                highlightSliceById={highlightedSlice}
                customMouseOver={handleMouseOver.bind(this)}
                customMouseOut={handleMouseOut.bind(this)}
            />
            <Legend
                data={donutData.with6Slices()}
                height={(data.length + 1) * 40}
                width={300}
                margin={legendMargin}
                highlightEntryById={highlightedSlice}
            />
        </div>
    );
};

export const WithInlineLegend = () => {
    const data = donutData.with3Slices();
    const width = 500;
    const [highlightedSlice, setHighlightedSlice] = React.useState(NO_SLICE);

    return (
        <div style={{ width }}>
            <Donut
                data={data}
                height={width / 1.8}
                width={width}
                externalRadius={width / 5}
                internalRadius={width / 10}
                isAnimated={false}
                customMouseOver={(slice: { data: { id: number } }) =>
                    setHighlightedSlice(slice.data.id)
                }
                customMouseOut={() => setHighlightedSlice(NO_SLICE)}
            />
            <Legend
                data={data}
                isHorizontal={true}
                height={40}
                width={width}
                markerSize={8}
                highlightEntryById={highlightedSlice}
            />
        </div>
    );
};

export const WithAnimation = () => {
    const data = donutData.with6Slices();

    return <Donut data={data} isAnimated={true} />;
};

/**
 * One slice stays highlighted, `highlightSliceById` with
 * `hasFixedHighlightedSlice`, and the legend follows it: hovering another
 * slice highlights that one, and leaving returns to the fixed slice.
 */
export const WithHighlightedSlice = () => {
    const data = donutData.with4Slices();
    const fixedSlice = 2;
    const width = 500;
    const [highlightedEntry, setHighlightedEntry] = React.useState(fixedSlice);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Donut
                data={data}
                height={width * 0.8}
                width={width}
                externalRadius={width / 3.5}
                internalRadius={width / 7}
                isAnimated={false}
                highlightSliceById={fixedSlice}
                hasFixedHighlightedSlice={true}
                customMouseOver={(slice: { data: { id: number } }) =>
                    setHighlightedEntry(slice.data.id)
                }
                customMouseOut={() => setHighlightedEntry(fixedSlice)}
            />
            <Legend
                data={data}
                height={(data.length + 1) * 40}
                width={300}
                highlightEntryById={highlightedEntry}
            />
        </div>
    );
};

/**
 * Hovering a slice reports it through `customMouseOver`: here, in the line
 * under the chart.
 */
export const WithHoverEvent = () => {
    const data = donutData.with6Slices();
    const [message, setMessage] = React.useState('Hover a slice');

    return (
        <div>
            <Donut
                data={data}
                customMouseOver={(slice: { data: { name: string } }) =>
                    setMessage(`Mouse over: ${slice.data.name}`)
                }
                externalRadius={100}
                internalRadius={47}
                highlightSliceById={1}
                isAnimated={false}
            />
            <p>{message}</p>
        </div>
    );
};

/**
 * A pie chart is a donut without a hole: `internalRadius={0}`. With no hole,
 * there is no room for the centred text, so `hasCenterLegend={false}` turns
 * it off and the legend on its right names each slice, highlighting the one
 * under the pointer.
 */
export const WithPieChartFormat = () => {
    const data = donutData.with6Slices();
    const width = 500;
    const [highlightedSlice, setHighlightedSlice] = React.useState(NO_SLICE);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Donut
                data={data}
                height={width * 0.8}
                width={width}
                externalRadius={width / 3.5}
                internalRadius={0}
                hasCenterLegend={false}
                a11yTitle="Visits by source"
                isAnimated={false}
                customMouseOver={(slice: { data: { id: number } }) =>
                    setHighlightedSlice(slice.data.id)
                }
                customMouseOut={() => setHighlightedSlice(NO_SLICE)}
            />
            <Legend
                data={data}
                height={(data.length + 1) * 40}
                width={300}
                highlightEntryById={highlightedSlice}
            />
        </div>
    );
};

export const WithLoadingState = () => {
    const data = donutData.with6Slices();

    return <Donut data={data} isLoading={true} />;
};
