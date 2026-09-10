// Every @britecharts/react component built with its required props, plus its
// props type imported by name. Compiled, never rendered.
import {
    Bar,
    Bullet,
    Donut,
    GroupedBar,
    Legend,
    Line,
    Sparkline,
    StackedArea,
    StackedBar,
    Tooltip,
} from '@britecharts/react';
import type {
    BarChartProps,
    BulletChartProps,
    DonutChartProps,
    GroupedBarProps,
    LegendProps,
    LineProps,
    SparklineProps,
    StackedAreaProps,
    StackedBarProps,
    TooltipProps,
} from '@britecharts/react';

export const barProps: BarChartProps = {
    data: [{ name: 'Luminous', value: 2 }],
    isHorizontal: true,
    width: 400,
};
export const bar = <Bar {...barProps} />;

export const bulletProps: BulletChartProps = {
    data: [{ ranges: [130, 160, 250], measures: [150], markers: [220] }],
};
export const bullet = <Bullet {...bulletProps} />;

export const donutProps: DonutChartProps = {
    data: [{ quantity: 1, name: 'Shiny' }],
};
export const donut = <Donut {...donutProps} />;

export const groupedBarProps: GroupedBarProps = {
    data: [{ name: 'Jan', group: 'A', value: 1 }],
};
export const groupedBar = <GroupedBar {...groupedBarProps} />;

export const legendProps: LegendProps = {
    data: [{ id: 1, quantity: 2, name: 'Shiny' }],
};
export const legend = <Legend {...legendProps} />;

export const lineProps: LineProps = {
    data: {
        data: [{ topicName: 'Sales', name: 1, date: '2020-01-01', value: 1 }],
    },
};
export const line = <Line {...lineProps} />;

export const sparklineProps: SparklineProps = {
    data: [{ value: 1, date: '2020-01-01' }],
};
export const sparkline = <Sparkline {...sparklineProps} />;

export const stackedAreaProps: StackedAreaProps = {
    data: [{ date: '2020-01-01', name: 'Direct', value: 1 }],
};
export const stackedArea = <StackedArea {...stackedAreaProps} />;

export const stackedBarProps: StackedBarProps = {
    data: [{ name: 'Jan', stack: 'A', value: 1 }],
};
export const stackedBar = <StackedBar {...stackedBarProps} />;

export const tooltipProps: TooltipProps = {
    data: [],
    xAxisValueType: 'date',
};
export const tooltip = <Tooltip {...tooltipProps} />;

// The props are typed, not `any`.
// @ts-expect-error width takes a number
export const wrongWidth = <Bar data={[]} width="wide" />;
// @ts-expect-error data is required
export const missingData = <Donut />;
