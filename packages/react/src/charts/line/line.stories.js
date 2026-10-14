import React from 'react';

import Line from './Line';
import Tooltip from '../tooltip/Tooltip';
import lineData from './lineChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/Line',
    component: Line,
};

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart,
 * with its tooltip.
 */
export const Playground = (args) => {
    const data = lineData.oneSet();

    const renderLine = (props) => <Line {...args} {...props} />;

    return (
        <Tooltip
            data={data}
            render={renderLine}
            topicLabel="topics"
            title="Tooltip Title"
        />
    );
};

Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithOneLineAndTooltipAndBasisCurve = () => {
    const data = lineData.oneSet();

    const renderLine = (props) => (
        <Line
            margin={{
                top: 60,
                right: 30,
                bottom: 60,
                left: 70,
            }}
            lineCurve="basis"
            {...props}
        />
    );

    return (
        <Tooltip
            data={data}
            render={renderLine}
            topicLabel="topics"
            title="Tooltip Title"
        />
    );
};

export const WithMultipleLinesAndTooltip = () => {
    const data = lineData.fiveTopics();

    const renderLine = (props) => (
        <Line
            margin={{
                top: 60,
                right: 30,
                bottom: 60,
                left: 70,
            }}
            tooltipThreshold={0}
            {...props}
        />
    );

    return (
        <Tooltip data={data} render={renderLine} topicLabel="topics" title="" />
    );
};

export const WithAnimation = () => {
    const data = lineData.oneSet();

    const renderLine = (props) => <Line isAnimated={true} {...props} />;

    return (
        <Tooltip
            data={data}
            render={renderLine}
            topicLabel="topics"
            title="Tooltip Title"
        />
    );
};

export const WithMultipleLinesAndStepBeforeCurveAndTealColorSchema = () => {
    const data = lineData.fiveTopics();

    return (
        <Line
            data={data}
            margin={{
                top: 60,
                right: 30,
                bottom: 60,
                left: 70,
            }}
            lineCurve="stepBefore"
            tooltipThreshold={200}
            colorSchema={colors.colorSchemas.teal}
        />
    );
};

export const WithLoadingState = () => {
    const data = { data: [] };

    return <Line data={data} isLoading={true} />;
};
