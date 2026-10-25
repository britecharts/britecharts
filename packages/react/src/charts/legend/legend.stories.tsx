import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Legend from './Legend';
import legendData from './legendChart.fixtures';
import donutData from '../donut/donutChart.fixtures';
import Donut from '../donut/Donut';

export default {
    title: 'Charts/Legend',
    component: Legend,
} satisfies Meta<typeof Legend>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart.
 */
export const Playground: StoryFn<typeof Legend> = (args) => {
    const data = legendData.with6Points();

    return <Legend height={250} width={400} {...args} data={data} />;
};

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithStackDirection = () => {
    const data = legendData.with6Points();

    return <Legend data={data} width={400} height={200} />;
};

export const WithInlineDirection = () => {
    const data = legendData.with6Points();

    return (
        <Legend
            data={data}
            isHorizontal={true}
            marginRatio={1.8}
            height={100}
        />
    );
};

export const WithInlineDirectionAndSmallerMarkers = () => {
    const data = legendData.with6Points();

    return (
        <Legend
            data={data}
            isHorizontal={true}
            markerSize={8}
            marginRatio={1.8}
            width={500}
            height={100}
        />
    );
};

/**
 * The legend bounds a donut: hovering a slice highlights its entry, and
 * leaving returns to the fixed slice. The legend draws names only, no
 * quantity.
 */
export const WithDonutBounded = () => {
    const data = donutData.with4Slices();
    const dataNoQuantity = data.map(({ name, id }) => ({ name, id }));
    const fixedSlice = 2;
    const width = 500;
    const [highlightedEntry, setHighlightedEntry] = React.useState(fixedSlice);

    return (
        <div>
            <Legend
                data={dataNoQuantity}
                height={(data.length + 1) * 40}
                width={300}
                highlightEntryById={highlightedEntry}
            />
            <Donut
                data={data}
                height={width / 1.8}
                width={width}
                externalRadius={width / 5}
                internalRadius={width / 10}
                isAnimated={false}
                highlightSliceById={fixedSlice}
                hasFixedHighlightedSlice={true}
                customMouseOver={(slice: { data: { id: number } }) =>
                    setHighlightedEntry(slice.data.id)
                }
                customMouseOut={() => setHighlightedEntry(fixedSlice)}
            />
        </div>
    );
};

/**
 * With `data={null}` the legend waits like every other chart: nothing is
 * drawn until the data arrives, rather than throwing ("Cannot read properties
 * of undefined (reading 'filter')") on data it does not have yet.
 */
export const WithNoData = () => <Legend data={null} height={250} width={400} />;
