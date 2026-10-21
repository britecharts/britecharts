import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Brush from './Brush';
import brushData from './brushChart.fixtures';

export default {
    title: 'Charts/Brush',
    component: Brush,
} satisfies Meta<typeof Brush>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart.
 */
export const Playground: StoryFn<typeof Brush> = (args) => (
    <Brush {...args} data={brushData.withSimpleData()} />
);

Playground.args = { isAnimated: false, height: 200 };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithInitialDateRange = () => (
    <Brush
        data={brushData.withSimpleData()}
        dateRange={['2015-06-27T07:00:00.000Z', '2015-07-10T07:00:00.000Z']}
        height={200}
    />
);

export const WithLockedSelection = () => (
    <Brush
        data={brushData.withSimpleData()}
        dateRange={['2015-06-27T07:00:00.000Z', '2015-07-03T07:00:00.000Z']}
        isLocked={true}
        height={200}
    />
);

/**
 * `customBrushEnd` gets the selection as one `[start, end]` array of dates,
 * rounded to `roundingTimeInterval`.
 */
export const WithSelectionEvents = () => {
    const [selection, setSelection] = useState('Drag across the chart');

    const handleBrushEnd = (...args: never[]) => {
        // One argument: the selection's [start, end]
        const [[start, end]] = args as unknown as [[Date | null, Date | null]];

        setSelection(
            start && end
                ? `${start.toDateString()} to ${end.toDateString()}`
                : 'No selection'
        );
    };

    return (
        <div>
            <Brush
                data={brushData.withSimpleData()}
                customBrushEnd={handleBrushEnd}
                roundingTimeInterval="timeDay"
                height={200}
            />
            <p>{selection}</p>
        </div>
    );
};

export const WithMissingData = () => (
    <Brush data={brushData.withMissingData()} height={200} />
);

export const WithLoadingState = () => {
    const data: [] = [];

    return <Brush data={data} isLoading={true} />;
};
