import {
    ChartBaseAPI,
    InteractiveChartAPI,
    ExportableChartAPI,
    ThemableChartAPI,
    AnimatedChartAPI,
    TimeSeriesChartAPI,
} from '../common/base';
import { GridTypes } from '../common/grid';
import { ColorGradientType } from '../helpers/colors';
import { ChartModuleSelection } from '../common/selection';

export enum LineChartKeys {
    Date = 'date',
    Name = 'name',
    TopicName = 'topicName',
    Value = 'value',
}

export type LineChartDataShape = {
    [LineChartKeys.Date]: string;
    /**
     * The topic identifier, not a label -- `topicName` is the label. The chart
     * reads this as `topic` (`line.js`'s `topic: values[0]['name']`) and uses
     * it to group the flat data and to key the colour map, which is why core's
     * own JSDoc documents it as `@property {number} topic`.
     *
     * Declared `string` until now, which contradicted core's runtime and
     * JSDoc, react's `Line.d.ts` (already `number`) and wrappers' own
     * fixtures. It blocked typing the line wrapper at all: its fixture data
     * did not satisfy this type.
     */
    [LineChartKeys.Name]: number;
    [LineChartKeys.TopicName]: string;
    [LineChartKeys.Value]: number;
};

export type LineChartData = {
    data: LineChartDataShape[];
};

export interface LineChartEmptyDataConfig {
    minDate: Date;
    maxDate: Date;
    maxY: number;
}

export interface CustomLine {
    y: number;
    name: string;
    color: string;
}

/**
 * Whether the x axis carries dates or plain numbers.
 *
 * `'number'`, not `'numeric'`: the chart compares this against `'number'` in
 * four places, so `'numeric'` -- which the declaration used to accept -- type
 * checked and did nothing, while the value that actually switches the axis was
 * rejected. The accessor's own `@example` is `line.xAxisValueType('number')`.
 * Shares its shape with the stacked area chart, which had the same defect.
 */
export type LineChartXAxisValueType = 'date' | 'number';

/** Whether a numeric x axis is scaled linearly or logarithmically. */
export type LineChartXAxisScale = 'linear' | 'logarithmic';

// The thirteen accessors below were setter-only -- a single signature
// returning the chart -- so reading one reported the chart rather than its
// value. Each is a getter/setter overload pair now, getter first and setter
// last, with the getter typed from the implementation's own default.
//
// Five getters are wider than their setter: `grid`, `xAxisLabel`, `yAxisLabel`
// and `xTicks` are `null` by default, and `xTicks` hands that straight to d3
// to mean "use the scale's own count". Unlike the grouped and stacked bars,
// this chart initialises its axis labels to `null` rather than leaving them
// undefined -- the same split the bar chart has.
export interface LineChartAPI
    extends ChartBaseAPI<LineChartModule>,
        InteractiveChartAPI<LineChartModule>,
        ExportableChartAPI,
        AnimatedChartAPI<LineChartModule>,
        TimeSeriesChartAPI<LineChartModule>,
        ThemableChartAPI<LineChartModule> {
    /**
     * Gets or Sets the grid mode.
     *
     * The getter is `null` until one is set, and the setter takes `null` to
     * put the default back, as on the other grid-drawing charts.
     */
    grid(): GridTypes | null;
    grid(gridType: GridTypes | null): LineChartModule;
    /** Gets or Sets the curve of the line chart */
    lineCurve(): string;
    lineCurve(curveType: string): LineChartModule;
    /** Gets or Sets the gradient colors of the line chart when there is only one line */
    lineGradient(): ColorGradientType;
    lineGradient(gradient: ColorGradientType): LineChartModule;
    /**
     * Add custom horizontal lines to the Chart - this way you are able to plot arbitrary horizontal lines
     * onto the chart with a specific color and a text annotation over the line.
     */
    lines(): CustomLine[];
    lines(customLines: CustomLine[]): LineChartModule;
    /** Gets or Sets the topicLabel of the chart */
    shouldShowAllDataPoints(): boolean;
    shouldShowAllDataPoints(
        showAllDataPoints: boolean
    ): LineChartModule;
    /**
     * Gets or Sets the minimum width of the graph in order to show the tooltip
     * NOTE: This could also depend on the aspect ratio
     */
    tooltipThreshold(): number;
    tooltipThreshold(threshold: number): LineChartModule;
    /**
     * Gets or Sets the label of the X axis of the chart
     *
     * The getter is `null` until one is set: the chart appends no label
     * element until then.
     */
    xAxisLabel(): string | null;
    xAxisLabel(label: string): LineChartModule;
    /**
     * Gets or Sets the `xAxisScale`.
     * Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
     * 'number' as well, otherwise it won't influence the visualization.
     */
    xAxisScale(): LineChartXAxisScale;
    xAxisScale(scale: LineChartXAxisScale): LineChartModule;
    /**
     * Gets or Sets the `xAxisValueType`.
     * Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
     * be dates anymore, but can be arbitrary numbers.
     */
    xAxisValueType(): LineChartXAxisValueType;
    xAxisValueType(valueType: LineChartXAxisValueType): LineChartModule;
    /**
     * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
     * how many and where the ticks will appear.
     */
    xTicks(): number | null;
    xTicks(ticks: number): LineChartModule;
    /**
     * Gets or Sets the label of the Y axis of the chart
     *
     * The getter is `null` until one is set, as `xAxisLabel`'s is.
     */
    yAxisLabel(): string | null;
    yAxisLabel(label: string): LineChartModule;
    /** Gets or Sets the yAxisLabelPadding of the chart. */
    yAxisLabelPadding(): number;
    yAxisLabelPadding(padding: number): LineChartModule;
    /** Gets or Sets the number of ticks of the y axis on the chart */
    yTicks(): number;
    yTicks(ticks: number): LineChartModule;
    /** Gets or Sets the `date` key of the data */
    dateLabel(): string;
    dateLabel(value: string): LineChartModule;
    /** Gets or Sets whether the y axis starts at the lowest value rather than zero */
    hasMinimumValueScale(): boolean;
    hasMinimumValueScale(value: boolean): LineChartModule;
    /** Gets or Sets the `topic` key of the data */
    topicLabel(): string;
    topicLabel(value: string): LineChartModule;
    /** Gets or Sets the `value` key of the data */
    valueLabel(): string;
    valueLabel(value: string): LineChartModule;
}

export type LineChartModule = ChartModuleSelection<LineChartData> &
    LineChartAPI;

/**
 * import {line} from 'britecharts;
 *
 * const lineChart = line();
 *
 * lineChart()
 *    .width(100)
 *    .height(100)
 *    .xAxisFormat(lineChart.axisTimeCombinations.HOUR_DAY)
 */
export function line(): LineChartModule;
