import {
    ChartBaseAPI,
    InteractiveChartAPI,
    ExportableChartAPI,
    ThemableChartAPI,
    AnimatedChartAPI,
    TimeSeriesChartAPI,
} from '../common/base';
import { GridTypes } from '../common/grid';
import { ChartModuleSelection } from '../common/selection';

export enum StackedAreaChartKeys {
    Date = 'date',
    Name = 'name',
    Value = 'value',
}

export type StackedAreaChartDataShape = {
    [StackedAreaChartKeys.Date]: string;
    [StackedAreaChartKeys.Name]: string;
    [StackedAreaChartKeys.Value]: number;
};

/**
 * The window the chart draws over when it has no data of its own.
 *
 * `minY` was missing. The chart's own default carries it and `getMinValue`
 * reads it, so a config without one compiled and then gave the value scale an
 * undefined lower bound -- a NaN domain, and nothing drawn.
 */
export interface StackedAreaEmptyDataConfig {
    minDate: Date;
    maxDate: Date;
    minY: number;
    maxY: number;
}

/**
 * Whether the x axis carries dates or plain numbers.
 *
 * `'number'`, not `'numeric'`: the chart compares this against `'number'` in
 * three places, so `'numeric'` -- which the declaration used to accept -- type
 * checked and did nothing, while the value that actually switches the axis was
 * rejected. The JSDoc below has said `'number'` all along.
 */
export type StackedAreaXAxisValueType = 'date' | 'number';

/** Whether a numeric x axis is scaled linearly or logarithmically. */
export type StackedAreaXAxisScale = 'linear' | 'logarithmic';

// The seventeen accessors below were setter-only -- a single signature
// returning the chart -- so reading one reported the chart rather than its
// value. Each is a getter/setter overload pair now, getter first and setter
// last, with the getter typed from the implementation's own default.
//
// `InteractiveChartAPI` was also parameterised with `StackedBarChartModule`:
// the wrong chart, not merely the wrong one of this chart's two types. So
// `stackedArea().on(...)` reported the stacked *bar*'s API, and a chain
// crossing back to anything of this chart's own -- `.on(...).areaCurve(...)`
// -- did not compile, nor could the result be handed to `selection.call()` as
// a stacked area. Same class as the three brush generics corrected in
// 0e959aee, one step further out.
export interface StackedAreaChartAPI
    extends ChartBaseAPI<StackedAreaChartModule>,
        InteractiveChartAPI<StackedAreaChartModule>,
        ExportableChartAPI,
        AnimatedChartAPI<StackedAreaChartModule>,
        TimeSeriesChartAPI<StackedAreaChartModule>,
        ThemableChartAPI<StackedAreaChartModule> {
    /** Gets or Sets the area curve of the stacked area. */
    areaCurve(): string;
    areaCurve(curveType: string): StackedAreaChartModule;
    /** Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity) */
    areaOpacity(): number;
    areaOpacity(opacity: number): StackedAreaChartModule;
    /** Gets or Sets the emptyDataConfig of the chart */
    emptyDataConfig(): StackedAreaEmptyDataConfig;
    emptyDataConfig(
        config: StackedAreaEmptyDataConfig
    ): StackedAreaChartModule;
    /**
     * Gets or Sets the grid mode
     *
     * The getter is `null` until one is set, and the setter takes `null` to
     * put the default back, as on the other grid-drawing charts.
     */
    grid(): GridTypes | null;
    grid(gridType: GridTypes | null): StackedAreaChartModule;
    /** Enables or disables the outline at the top of the areas */
    hasOutline(): boolean;
    hasOutline(hasOutline: boolean): StackedAreaChartModule;
    /** Gets or Sets the keyLabel of the chart */
    keyLabel(): string;
    keyLabel(label: string): StackedAreaChartModule;
    /** Gets or Sets the minimum width of the graph in order to show the tooltip */
    tooltipThreshold(): number;
    tooltipThreshold(threshold: number): StackedAreaChartModule;
    /**
     * Pass an override for the ordering of the topics
     *
     * The getter is `undefined` until one is set: the chart orders by each
     * topic's total until then. The elements are this chart's own topic names,
     * which are strings.
     */
    topicsOrder(): string[] | undefined;
    topicsOrder(orderList: string[]): StackedAreaChartModule;
    /**
     * Gets or Sets the `xAxisScale`.
     * Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
     * 'number' as well, otherwise it won't influence the visualization.
     */
    xAxisScale(): StackedAreaXAxisScale;
    xAxisScale(scale: StackedAreaXAxisScale): StackedAreaChartModule;
    /**
     * Gets or Sets the `xAxisValueType`.
     * Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
     * be dates anymore, but can be arbitrary numbers.
     */
    xAxisValueType(): StackedAreaXAxisValueType;
    xAxisValueType(
        valueType: StackedAreaXAxisValueType
    ): StackedAreaChartModule;
    /**
     * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
     * how many and where the ticks will appear.
     */
    xTicks(): number | null;
    xTicks(ticks: number): StackedAreaChartModule;
    /**
     * Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction
     * (default is 0). Change this value if you don't want to start your area from y=0.
     */
    yAxisBaseline(): number;
    yAxisBaseline(baseLine: number): StackedAreaChartModule;
    /**
     * Gets or Sets the y-axis label of the chart
     *
     * The getter is `undefined` until one is set: the chart appends no label
     * element until then.
     */
    yAxisLabel(): string | undefined;
    yAxisLabel(label: string): StackedAreaChartModule;
    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     */
    yAxisLabelOffset(): number;
    yAxisLabelOffset(offset: number): StackedAreaChartModule;
    /** Gets or Sets the number of ticks of the y axis on the chart */
    yTicks(): number;
    yTicks(ticks: number): StackedAreaChartModule;
    /** Gets or Sets the `date` key of the data */
    dateLabel(): string;
    dateLabel(value: string): StackedAreaChartModule;
    /** Gets or Sets the `value` key of the data */
    valueLabel(): string;
    valueLabel(value: string): StackedAreaChartModule;
}

export type StackedAreaChartModule = ChartModuleSelection<
    StackedAreaChartDataShape[]
> &
    StackedAreaChartAPI;

/**
 * import {stackedArea} from 'britecharts;
 * const areaChart = stackedArea();
 * areaChart().width(100).height(100);
 * areaChart.xAxisFormat(areaChart.axisTimeCombinations.HOUR_DAY)
 */
export function stackedArea(): StackedAreaChartModule;
